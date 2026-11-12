import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams } from './track';
import { addRoutes } from './routes';
import { addSections } from './sections';
import { generatePads, inPad, padLane, type PadParams } from './pads';
import { generateMovers, moverPose } from './movers';
import { pointOnTrack } from './gauntlet';
import { newShip } from '../sim/ship';
import { collideMovers, stepPads } from '../sim/zones';

const gen: RaceGenParams = { seed: 9, points: 12, radius: 1200, wobble: 0.3, height: 200, twist: 0, twistNoise: 0.4, tubeRadius: 40, spacing: 4, checkpoints: 8 };
const track = addSections(addRoutes(generateTrack(gen), { seed: 9, forks: 1, pitLane: false, saveMin: 0, saveMax: 1, costMax: 1 }), {
  seed: 9,
  count: 3,
  kinds: ['cavern', 'hex'],
  minLength: 400,
  maxLength: 700,
});
const R = track.radius;
const pp: PadParams = { seed: 9, boosts: 4, slows: 3, boostLength: 60, slowLength: 160 };

describe('generatePads', () => {
  const pads = generatePads(track, pp);

  it('places both kinds, sorted and deterministic', () => {
    expect(pads.filter((p) => p.kind === 'boost').length).toBeGreaterThanOrEqual(3);
    expect(pads.filter((p) => p.kind === 'slow').length).toBeGreaterThanOrEqual(2);
    for (let k = 1; k < pads.length; k++) expect(pads[k].s0).toBeGreaterThan(pads[k - 1].s1);
    expect(generatePads(track, pp)).toEqual(pads);
  });

  it('keeps off the start line, forks, sections and hazards', () => {
    const avoid = [pads[0].s0 + 10];
    const moved = generatePads(track, { ...pp, avoid });
    for (const p of moved) expect(p.s1 < avoid[0] - R * 2 || p.s0 > avoid[0] + R * 2).toBe(true);
    for (const p of pads) {
      expect(p.s0).toBeGreaterThan(300);
      for (const b of track.branches ?? []) expect(p.s1 < b.s0 || p.s0 > b.s1).toBe(true);
      for (const x of track.sections ?? []) expect(p.s1 < x.s0 || p.s0 > x.s1).toBe(true);
    }
  });

  it('every lane point is in the zone for a boost and out of the murk for a slow field', () => {
    for (const p of pads) {
      const [x, y] = padLane(p, R);
      expect(Math.hypot(x, y)).toBeLessThan(R - 2);
      expect(inPad(p, x, y, R)).toBe(p.kind === 'boost');
      // the centreline is murky in a slow field, and not over a boost strip
      expect(inPad(p, 0, 0, R)).toBe(p.kind === 'slow');
    }
  });

  it('boost strips push forward up to the pad speed; slow fields drag', () => {
    const fx = { accel: 140, speed: 230, drag: 1.1 };
    for (const kind of ['boost', 'slow'] as const) {
      const p = pads.find((q) => q.kind === kind)!;
      const s = (p.s0 + p.s1) / 2;
      const [x, y] = kind === 'boost' ? padLane(p, R) : [0, 0];
      const ship = newShip();
      pointOnTrack(track, s, x, y, ship.pos);
      const near = nearestOnTrack(track, ship.pos);
      ship.vel.copy(track.tan[near.index]).multiplyScalar(100);
      const st = { pad: -1 };
      expect(stepPads([p], ship, track, near, fx, 0.1, st)).toBe(kind);
      expect(stepPads([p], ship, track, near, fx, 0.1, st)).toBe(null);
      const v = ship.vel.length();
      if (kind === 'boost') expect(v).toBeCloseTo(128, 0);
      else expect(v).toBeLessThan(100);
    }
  });
});

describe('generateMovers', () => {
  const ms = generateMovers(track, { seed: 9, perCavern: 4, core: 0.6 });
  const caverns = (track.sections ?? []).filter((s) => s.kind === 'cavern');

  it('fills each cavern with slabs and rocks', () => {
    expect(caverns.length).toBeGreaterThan(0);
    expect(ms.length).toBe(caverns.length * 4);
    expect(new Set(ms.map((m) => m.kind))).toEqual(new Set(['slab', 'rock']));
    for (const m of ms) expect(caverns.some((c) => m.s > c.s0 + c.ramp && m.s < c.s1 - c.ramp)).toBe(true);
  });

  it('never comes inside the clear core, and stays inside the chamber', () => {
    for (const m of ms) {
      for (let t = 0; t < 20; t += 0.05) {
        const p = moverPose(m, t);
        if (!p.active) continue;
        if (m.kind === 'slab') {
          // nearest point of the slab to the axis is its offset less its half thickness
          expect(Math.abs(m.off) - m.ht).toBeGreaterThanOrEqual(R * 0.6 - 1e-6);
          expect(Math.hypot(p.x, p.y)).toBeLessThan(R * 1.9);
        } else {
          expect(Math.hypot(p.x, p.y) - m.r).toBeGreaterThanOrEqual(R * 0.6 - 1e-6);
          expect(Math.hypot(p.x, p.y) + m.r).toBeLessThan(R * 1.9);
        }
      }
    }
  });

  it('rocks hang, fall, then are gone until the next drop', () => {
    const rock = ms.find((m) => m.kind === 'rock')!;
    if (rock.kind !== 'rock') throw new Error();
    const t0 = (1 - rock.phase) * rock.period; // start of a cycle
    expect(moverPose(rock, t0 + 0.5).y).toBeCloseTo(rock.top);
    const mid = moverPose(rock, t0 + rock.hang + rock.fall / 2);
    expect(mid.y).toBeLessThan(rock.top);
    expect(mid.vy).toBeLessThan(0);
    expect(moverPose(rock, t0 + rock.hang + rock.fall + 0.5).active).toBe(false);
  });

  it('a ship flying into a mover is pushed out and bounced', () => {
    const m = ms[0];
    const p = moverPose(m, 0);
    const ship = newShip();
    pointOnTrack(track, m.s, p.x, p.y, ship.pos);
    const near = nearestOnTrack(track, ship.pos);
    // come in from the centreline side
    const toward = new Vector3().subVectors(ship.pos, near.point).normalize();
    ship.pos.addScaledVector(toward, -(m.kind === 'slab' ? m.ht : m.r));
    ship.vel.copy(toward).multiplyScalar(30);
    const before = ship.pos.clone();
    const impact = collideMovers([m], ship, track, nearestOnTrack(track, ship.pos), 0, 1.5, 0.3);
    expect(impact).toBeGreaterThan(20);
    // the into-surface part is turned back (the surface need not face the centreline square on)
    expect(ship.vel.dot(toward)).toBeLessThan(20);
    expect(ship.pos.distanceTo(before)).toBeGreaterThan(0.5);
  });
});
