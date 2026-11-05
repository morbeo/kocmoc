import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams } from './track';
import { addRoutes } from './routes';
import { addSections, sectionAngles, sectionAt, sectionShape, wallAt, reachAt, POLYGONS, SECTION_KINDS, SECTION_REACH, type Section } from './sections';
import { newShip } from '../sim/ship';
import { collideSection, newRace, type WallParams } from '../sim/race';
import { recordBotLap } from '../sim/rivals';
import { referenceShip } from '../sim/forks';

const gen: RaceGenParams = { seed: 2, points: 12, radius: 1000, wobble: 0.3, height: 200, twist: 0, twistNoise: 0.4, tubeRadius: 40, spacing: 4, checkpoints: 8 };
const loop = generateTrack(gen);
const params = { seed: 2, count: 5, kinds: [...SECTION_KINDS], minLength: 300, maxLength: 700 };
const walls: WallParams = { shipRadius: 1.5, bounce: 0.3, scrape: 1 };
const sec = (kind: Section['kind']): Section => ({ kind, s0: 0, s1: 1000, ramp: 100, seed: 9, roll: 0 });

describe('section shapes', () => {
  it('a hexagon has flat faces one tube radius out and corners every 60°', () => {
    const h = sec('hex');
    expect(sectionShape(h, Math.PI / 6, 500)).toBeCloseTo(1);
    expect(sectionShape(h, 0, 500)).toBeCloseTo(1 / Math.cos(Math.PI / 6));
    expect(sectionShape(h, Math.PI / 3, 500)).toBeCloseTo(1 / Math.cos(Math.PI / 6));
    // straight between corners: the wall point's distance along the face normal is constant
    for (const a of [0.05, 0.3, 0.6, 0.9]) expect(sectionShape(h, a, 500) * Math.cos(a - Math.PI / 6)).toBeCloseTo(1);
  });

  it('a square has faces at 0° and 90° and corners at 45°', () => {
    const q = sec('square');
    expect(sectionShape(q, 0, 0)).toBeCloseTo(1);
    expect(sectionShape(q, Math.PI / 2, 0)).toBeCloseTo(1);
    expect(sectionShape(q, Math.PI / 4, 0)).toBeCloseTo(Math.SQRT2);
  });

  it('no wall is ever inside the tube, nor wider than its reach', () => {
    for (const kind of SECTION_KINDS) {
      if (kind === 'open') continue;
      for (let s = 0; s < 1000; s += 37)
        for (let a = 0; a < Math.PI * 2; a += 0.05) {
          const r = sectionShape(sec(kind), a, s);
          expect(r, kind).toBeGreaterThanOrEqual(1 - 1e-9);
          expect(r, kind).toBeLessThanOrEqual(SECTION_REACH[kind] + 1e-9);
        }
    }
  });

  it('a rectangle is a letterbox 1.8 tube radii to the side and 1 up', () => {
    const r = sec('rect');
    expect(sectionShape(r, 0, 0)).toBeCloseTo(1.8);
    expect(sectionShape(r, Math.PI / 2, 0)).toBeCloseTo(1);
    expect(sectionShape(r, Math.atan2(1, 1.8), 0)).toBeCloseTo(Math.hypot(1.8, 1));
    // turned a quarter, it's a tall slot
    expect(sectionShape({ ...r, roll: Math.PI / 2 }, Math.PI / 2, 0)).toBeCloseTo(1.8);
  });

  it('a diamond has its points on the axes, an ellipse its axes there', () => {
    expect(sectionShape(sec('diamond'), 0, 0)).toBeCloseTo(1.9);
    expect(sectionShape(sec('diamond'), Math.PI / 2, 0)).toBeCloseTo(1.3);
    expect(sectionShape(sec('ellipse'), 0, 0)).toBeCloseTo(1.8);
    expect(sectionShape(sec('ellipse'), Math.PI / 2, 0)).toBeCloseTo(1);
    expect(sectionShape(sec('ellipse'), Math.PI, 0)).toBeCloseTo(1.8);
  });

  it('a star points up and keeps its notches outside the tube', () => {
    const st = sec('star');
    expect(sectionShape(st, Math.PI / 2, 0)).toBeCloseTo(1.8);
    expect(sectionShape(st, Math.PI / 2 + Math.PI / 5, 0)).toBeCloseTo(1.15);
  });

  it('polygon meshes put a vertex on every corner', () => {
    for (const [kind, poly] of Object.entries(POLYGONS)) {
      const s = { ...sec(kind as Section['kind']), roll: 0.3 };
      const angles = sectionAngles(s);
      for (const [x, y] of poly!) {
        const a = Math.atan2(y, x) + 0.3;
        expect(angles.some((b) => Math.abs(Math.cos(a - b) - 1) < 1e-9), kind).toBe(true);
      }
    }
  });

  it('irregular bores drift along the section', () => {
    const b = sec('irregular');
    expect(sectionShape(b, 1, 100)).not.toBeCloseTo(sectionShape(b, 1, 400), 2);
  });
});

describe('addSections', () => {
  const track = addSections(addRoutes(loop, { seed: 2, forks: 2, pitLane: true, saveMin: 0, saveMax: 1, costMax: 1 }), params);
  const secs = track.sections ?? [];

  it('places sections of each kind asked for, without overlaps', () => {
    expect(secs.length).toBeGreaterThanOrEqual(3);
    for (let k = 1; k < secs.length; k++) expect(secs[k].s0).toBeGreaterThan(secs[k - 1].s1);
    for (const s of secs) expect(s.s1 - s.s0).toBeGreaterThanOrEqual(params.minLength - 1e-9);
  });

  it('keeps clear of forks and the start line', () => {
    for (const s of secs) {
      expect(s.s0).toBeGreaterThan(300);
      expect(s.s1).toBeLessThan(track.length - 400);
      for (const b of track.branches ?? []) expect(s.s1 < b.s0 || s.s0 > b.s1).toBe(true);
    }
  });

  it('a section\'s widest wall stays clear of the rest of the loop', () => {
    for (const s of secs)
      for (let x = s.s0; x < s.s1; x += 40) {
        const i = Math.floor((x / track.length) * track.pos.length);
        for (let j = 0; j < track.pos.length; j += 5) {
          const arc = Math.min(Math.abs(track.s[j] - x), track.length - Math.abs(track.s[j] - x));
          if (arc < (s.s1 - s.s0) + reachAt(track, x) * 4) continue;
          expect(track.pos[i].distanceTo(track.pos[j])).toBeGreaterThan(reachAt(track, x) + track.radius);
        }
      }
  });

  it('eases from the round tube at each end', () => {
    const s = secs.find((x) => x.kind !== 'open')!;
    expect(wallAt(track, s.s0 + 0.01, 0.3).rho).toBeCloseTo(track.radius, 0);
    expect(wallAt(track, s.s0 - 1, 0.3).rho).toBe(track.radius);
    expect(sectionAt(track, s.s0 - 1)).toBeNull();
  });

  it('none without a count or kinds, and deterministic', () => {
    expect(addSections(loop, { ...params, count: 0 }).sections).toBeUndefined();
    expect(addSections(loop, { ...params, kinds: [] }).sections).toBeUndefined();
    expect(addSections(loop, params).sections).toEqual(addSections(loop, params).sections);
  });
});

describe('section walls', () => {
  const track = addSections(loop, { ...params, kinds: ['square'], count: 1 });
  const s = track.sections![0];
  const mid = (s.s0 + s.s1) / 2;
  const i = Math.floor((mid / track.length) * track.pos.length);

  it('a square tunnel lets the ship into its corners, past the round tube', () => {
    const ship = newShip();
    const r = newRace(track, ship);
    // diagonally out toward the corner the roll put at 45°
    const a = s.roll + Math.PI / 4;
    ship.pos.copy(track.pos[i]).addScaledVector(track.right[i], Math.cos(a) * track.radius * 1.3).addScaledVector(track.up[i], Math.sin(a) * track.radius * 1.3);
    nearestOnTrack(track, ship.pos, i, 24, r.near);
    expect(collideSection(ship, r.near, track, walls, 1 / 120)).toBe(false);
  });

  it('pushes the ship back out of a face, along its normal', () => {
    const ship = newShip();
    const r = newRace(track, ship);
    const a = s.roll; // a face centre
    const dir = track.right[i].clone().multiplyScalar(Math.cos(a)).addScaledVector(track.up[i], Math.sin(a));
    ship.pos.copy(track.pos[i]).addScaledVector(dir, track.radius + 5);
    ship.vel.copy(dir).multiplyScalar(10).addScaledVector(track.tan[i], 60);
    nearestOnTrack(track, ship.pos, i, 24, r.near);
    expect(collideSection(ship, r.near, track, walls, 1 / 120)).toBe(true);
    const out = new Vector3().subVectors(ship.pos, r.near.point).dot(dir);
    expect(out).toBeCloseTo(track.radius - walls.shipRadius, 0);
    expect(ship.vel.dot(dir)).toBeLessThan(0);
  });
});

describe('the autopilot', () => {
  it('flies a lap with every kind of section clean', () => {
    const small: RaceGenParams = { ...gen, radius: 600, tubeRadius: 30, height: 120 };
    const track = addSections(generateTrack(small), { ...params, count: 5, minLength: 200, maxLength: 400 });
    expect(new Set(track.sections?.map((x) => x.kind)).size).toBeGreaterThanOrEqual(4);
    const ghost = recordBotLap({ ship: referenceShip, walls, track, course: { nearMiss: 0 } }, null, 1 / 60, 300);
    expect(ghost).not.toBeNull();
  });
});
