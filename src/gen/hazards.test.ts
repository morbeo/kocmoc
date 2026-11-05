import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams } from './track';
import { addRoutes } from './routes';
import { addSections } from './sections';
import { generateHazards, irisRadius, openness, passable, HAZARD_KINDS, type HazardParams } from './gauntlet';
import { placeScreens, screenBalls } from './screens';
import { Corridor } from './scenery';

const gen: RaceGenParams = { seed: 5, points: 12, radius: 1000, wobble: 0.3, height: 200, twist: 0, twistNoise: 0.4, tubeRadius: 40, spacing: 4, checkpoints: 8 };
const track = addSections(addRoutes(generateTrack(gen), { seed: 5, forks: 1, pitLane: true, saveMin: 0, saveMax: 1, costMax: 1 }), { seed: 5, count: 3, kinds: ['hex', 'cavern', 'open'], minLength: 300, maxLength: 600 });
const hp: HazardParams = { seed: 5, count: 6, kinds: [...HAZARD_KINDS], difficulty: 1, minClearance: 1.8, shipRadius: 1.5 };

describe('openness', () => {
  it('a dwelling cycle rests fully open and fully shut', () => {
    const at = (t: number) => openness(t, 4, 0, 0.5);
    expect(at(0)).toBe(1);
    expect(at(0.3)).toBe(1);
    expect(at(2)).toBe(0);
    expect(at(2.3)).toBe(0);
    expect(at(1)).toBeGreaterThan(0);
    expect(at(1)).toBeLessThan(1);
    // without dwell it is the plain cosine
    expect(openness(1, 4, 0)).toBeCloseTo(0.5);
  });
});

describe('generateHazards', () => {
  const h = generateHazards(track, hp);

  it('places one of each kind asked for, deterministic', () => {
    const kinds = new Set(h.planes.map((p) => p.kind));
    expect(kinds.size).toBeGreaterThanOrEqual(5);
    expect(generateHazards(track, hp)).toEqual(h);
  });

  it('keeps off the start line, forks and shaped sections', () => {
    for (const p of h.planes) {
      expect(p.s).toBeGreaterThan(300);
      for (const b of track.branches ?? []) expect(p.s < b.s0 || p.s > b.s1, p.kind).toBe(true);
      for (const x of track.sections ?? []) expect(p.s < x.s0 || p.s > x.s1, p.kind).toBe(true);
    }
  });

  it('shut, an iris or shutter still leaves the ship a way through the middle', () => {
    for (const p of h.planes.filter((q) => q.kind === 'iris' || q.kind === 'shutter')) {
      for (let t = 0; t < 10; t += 0.1) expect(passable(p.shape, 0, 0, t, hp.shipRadius * 1.05), p.kind).toBe(true);
    }
  });

  it('open, an iris clears most of the tube; shut, it is tight', () => {
    const iris = h.planes.find((q) => q.kind === 'iris')!;
    const sh = iris.shape as Extract<typeof iris.shape, { k: 'iris' }>;
    let lo = Infinity;
    let hi = 0;
    for (let t = 0; t < 10; t += 0.05) {
      lo = Math.min(lo, irisRadius(sh, t));
      hi = Math.max(hi, irisRadius(sh, t));
    }
    expect(hi).toBeGreaterThan(track.radius * 0.85);
    expect(lo).toBeLessThan(track.radius * 0.3);
  });

  it('none without a count or kinds', () => {
    expect(generateHazards(track, { ...hp, count: 0 }).planes).toEqual([]);
    expect(generateHazards(track, { ...hp, kinds: [] }).planes).toEqual([]);
  });
});

describe('placeScreens', () => {
  const screens = placeScreens(track, { seed: 5, count: 5, width: 160, clearance: 1.6 });
  const corridor = new Corridor(track);

  it('places them clear of the corridor and every branch', () => {
    expect(screens.length).toBeGreaterThanOrEqual(4);
    for (const sc of screens) for (const b of screenBalls(sc)) expect(corridor.isClear(b.c, b.r, 1.6)).toBe(true);
  });

  it('each faces back down the track towards where it is seen from', () => {
    for (const sc of screens) {
      const face = new Vector3(0, 0, 1).applyQuaternion(sc.quat);
      const from = track.pos[nearestOnTrack(track, track.pos[Math.floor((sc.s / track.length) * track.pos.length)]).index];
      const to = from.clone().sub(sc.pos).normalize();
      expect(face.dot(to)).toBeGreaterThan(0.99);
      expect(sc.height).toBeCloseTo((sc.width * 9) / 16);
    }
  });

  it('none when the count is 0', () => {
    expect(placeScreens(track, { seed: 5, count: 0, width: 160, clearance: 1.6 })).toEqual([]);
  });
});
