import { describe, it, expect } from 'vitest';
import { generateTrack, type RaceGenParams } from './track';
import { CHUNK_KINDS, generateGauntlet, openPoint, passable, slotWidth, type GauntletParams, type Shape } from './gauntlet';

const gen: RaceGenParams = {
  seed: 5,
  points: 12,
  radius: 600,
  wobble: 0.3,
  height: 100,
  twist: 0,
  twistNoise: 0.4,
  tubeRadius: 22,
  spacing: 4,
  checkpoints: 8,
};
const track = generateTrack(gen);
const params: GauntletParams = {
  seed: 5,
  chunkLength: 140,
  lead: 200,
  rampStart: 0.1,
  rampEnd: 1,
  minClearance: 1.8,
  shipRadius: 1.5,
  kinds: [...CHUNK_KINDS],
};

describe('passable', () => {
  it('hole: open inside the orbiting hole only', () => {
    const sh: Shape = { k: 'hole', r: 10, a0: 0, omega: Math.PI / 2, gap: 4 };
    expect(passable(sh, 10, 0, 0, 1)).toBe(true);
    expect(passable(sh, 0, 0, 0, 1)).toBe(false);
    // a quarter turn later the hole is at the top
    expect(passable(sh, 0, 10, 1, 1)).toBe(true);
    expect(passable(sh, 10, 0, 1, 1)).toBe(false);
    // margin shrinks the hole
    expect(passable(sh, 13, 0, 0, 0)).toBe(true);
    expect(passable(sh, 13, 0, 0, 1.5)).toBe(false);
  });

  it('slot: opening breathes between min and max', () => {
    const sh: Shape = { k: 'slot', angle: 0, u0: 0, min: 4, max: 30, period: 2, phase: 0 };
    expect(slotWidth(sh, 0)).toBeCloseTo(30);
    expect(slotWidth(sh, 1)).toBeCloseTo(4);
    expect(passable(sh, 10, 0, 0, 1)).toBe(true);
    expect(passable(sh, 10, 0, 1, 1)).toBe(false);
    expect(passable(sh, 0, 15, 1, 1)).toBe(true); // along the slot is open
  });

  it('beams: blocked on a line, open between lines', () => {
    const sh: Shape = { k: 'beams', a0: 0, omega: 0, spacing: 10, width: 0.5, ox: 0, oy: 0, crossed: false, count: 4 };
    // lines at x = ±5, ±15
    expect(passable(sh, 5, 0, 0, 0.5)).toBe(false);
    expect(passable(sh, -15, 3, 0, 0.5)).toBe(false);
    expect(passable(sh, 0, 7, 0, 0.5)).toBe(true);
    expect(passable(sh, 10, -7, 0, 0.5)).toBe(true);
    const crossed: Shape = { ...sh, crossed: true };
    expect(passable(crossed, 0, 5, 0, 0.5)).toBe(false);
    expect(passable(crossed, 0, 0, 0, 0.5)).toBe(true);
  });

  it('blades: hub and blades are solid, between blades is open', () => {
    const sh: Shape = { k: 'blades', n: 2, hub: 3, reach: 20, width: 2, a0: 0, omega: 0 };
    expect(passable(sh, 1, 0, 0, 0)).toBe(false); // hub
    expect(passable(sh, 10, 0, 0, 0.5)).toBe(false); // blade along +x
    expect(passable(sh, -10, 0, 0, 0.5)).toBe(false); // blade along -x
    expect(passable(sh, 0, 10, 0, 0.5)).toBe(true);
  });
});

describe('generateGauntlet', () => {
  const g = generateGauntlet(track, params);

  it('is deterministic for a seed', () => {
    expect(generateGauntlet(track, params)).toEqual(g);
    expect(generateGauntlet(track, { ...params, seed: 6 })).not.toEqual(g);
  });

  it('fills the track after the run-up with chunks of ramping difficulty', () => {
    expect(g.chunks.length).toBeGreaterThan(10);
    expect(g.chunks[0].s0).toBe(params.lead);
    expect(g.chunks.at(-1)!.s1).toBeLessThan(track.length);
    expect(g.chunks[0].difficulty).toBeCloseTo(params.rampStart);
    expect(g.chunks.at(-1)!.difficulty).toBeCloseTo(params.rampEnd);
    for (let i = 1; i < g.chunks.length; i++) {
      expect(g.chunks[i].difficulty).toBeGreaterThanOrEqual(g.chunks[i - 1].difficulty);
      expect(g.chunks[i].kind).not.toBe(g.chunks[i - 1].kind);
    }
    for (const p of g.planes) expect(p.s).toBeGreaterThanOrEqual(params.lead);
  });

  it('uses only the enabled kinds', () => {
    const only = generateGauntlet(track, { ...params, kinds: ['laser'] });
    expect(new Set(only.chunks.map((c) => c.kind))).toEqual(new Set(['laser']));
  });

  it('every plane always has a gap wider than the ship, inside the corridor', () => {
    for (const seed of [1, 2, 3, 4, 5]) {
      const gg = generateGauntlet(track, { ...params, seed, rampStart: 1, rampEnd: 1 });
      for (const p of gg.planes) {
        for (let t = 0; t < 8; t += 0.37) {
          const [x, y] = openPoint(p.shape, t);
          expect(passable(p.shape, x, y, t, params.shipRadius), `${p.kind} @${p.s.toFixed(0)} t=${t}`).toBe(true);
          expect(Math.hypot(x, y)).toBeLessThan(track.radius - params.shipRadius);
        }
      }
    }
  });

  it('debris leaves a straight lane wider than the ship', () => {
    const gg = generateGauntlet(track, { ...params, kinds: ['debris'], rampStart: 1, rampEnd: 1 });
    for (const c of gg.chunks) {
      const rocks = gg.rocks.filter((r) => r.s >= c.s0 && r.s <= c.s1);
      expect(rocks.length).toBeGreaterThan(5);
      // some sampled lane point clears every rock by the ship radius
      let found = false;
      for (let x = -11; x <= 11 && !found; x += 0.5) {
        for (let y = -11; y <= 11 && !found; y += 0.5) {
          found = rocks.every((r) => Math.hypot(x - r.x, y - r.y) > r.r + params.shipRadius);
        }
      }
      expect(found).toBe(true);
      for (const r of rocks) expect(Math.hypot(r.x, r.y) + r.r).toBeLessThanOrEqual(track.radius + 1e-9);
    }
  });

  it('debris keeps its density when the tube grows', () => {
    const wide = generateTrack({ ...gen, radius: 1000, tubeRadius: 44 });
    const opts = { ...params, kinds: ['debris' as const], rampStart: 1, rampEnd: 1 };
    const perChunk = (t: typeof track) => {
      const gg = generateGauntlet(t, opts);
      return gg.rocks.length / gg.chunks.length;
    };
    // twice the radius, four times the cross-section: roughly four times the rocks
    const ratio = perChunk(wide) / perChunk(track);
    expect(ratio).toBeGreaterThan(3);
    expect(ratio).toBeLessThan(5);
  });
});
