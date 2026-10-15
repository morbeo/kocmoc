import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { generateTrack, nearestOnTrack, minSeparation, minCurvatureRadius, type RaceGenParams } from './track';

const base: RaceGenParams = {
  seed: 1,
  points: 12,
  radius: 500,
  wobble: 0.35,
  height: 120,
  twist: 0,
  twistNoise: 0.6,
  tubeRadius: 20,
  spacing: 5,
  checkpoints: 8,
};

describe('generateTrack', () => {
  it('is deterministic per seed and differs between seeds', () => {
    const a = generateTrack(base);
    const b = generateTrack(base);
    const c = generateTrack({ ...base, seed: 2 });
    expect(a.pos.map((v) => v.toArray())).toEqual(b.pos.map((v) => v.toArray()));
    expect(a.length).not.toBeCloseTo(c.length, 3);
  });

  it('samples are evenly spaced and the loop closes', () => {
    const t = generateTrack(base);
    const n = t.pos.length;
    const gaps = t.pos.map((p, i) => p.distanceTo(t.pos[(i + 1) % n]));
    const mean = gaps.reduce((x, y) => x + y) / n;
    expect(mean).toBeCloseTo(t.length / n, 0);
    for (const g of gaps) expect(Math.abs(g - mean)).toBeLessThan(mean * 0.1);
  });

  it('frames are orthonormal', () => {
    const t = generateTrack({ ...base, twist: 1.5 });
    t.pos.forEach((_, i) => {
      expect(t.tan[i].length()).toBeCloseTo(1, 5);
      expect(t.up[i].length()).toBeCloseTo(1, 5);
      expect(Math.abs(t.tan[i].dot(t.up[i]))).toBeLessThan(1e-4);
      expect(Math.abs(t.right[i].dot(t.up[i]))).toBeLessThan(1e-4);
    });
  });

  it('frames are continuous everywhere, including across the seam', () => {
    for (const twist of [0, 1, 2.5]) {
      const t = generateTrack({ ...base, twist });
      const n = t.pos.length;
      let worst = 0;
      for (let i = 0; i < n; i++) worst = Math.max(worst, t.up[i].angleTo(t.up[(i + 1) % n]));
      expect(worst).toBeLessThan(0.15);
    }
  });

  it('authored twist adds whole turns of roll over a lap', () => {
    const flat = generateTrack({ ...base, twistNoise: 0 });
    const twisted = generateTrack({ ...base, twistNoise: 0, twist: 1 });
    // a quarter of the way round, the twisted frame has rolled a quarter turn from the flat one
    const q = Math.round(flat.pos.length / 4);
    expect(Math.abs(twisted.up[q].dot(flat.up[q]))).toBeLessThan(0.1);
  });

  it('generated tracks keep invariants: no self-intersection, curvature wider than the tube', () => {
    for (let seed = 1; seed <= 30; seed++) {
      const t = generateTrack({ ...base, seed, wobble: 0.6, height: 300 });
      expect(minSeparation(t.pos, t.s, t.length, t.radius * 4)).toBeGreaterThan(t.radius * 2.4);
      expect(minCurvatureRadius(t.tan, t.s, t.length)).toBeGreaterThan(t.radius * 1.2);
    }
  });

  it('checkpoints are evenly spread with the start line at 0', () => {
    const t = generateTrack(base);
    expect(t.checkpoints).toHaveLength(8);
    expect(t.checkpoints[0]).toBe(0);
    expect(t.checkpoints[4]).toBeCloseTo(t.length / 2);
  });
});

describe('nearestOnTrack', () => {
  const t = generateTrack(base);

  it('finds the centreline point and distance', () => {
    const i = 37;
    const p = t.pos[i].clone().addScaledVector(t.up[i], 7);
    const n = nearestOnTrack(t, p);
    expect(n.dist).toBeCloseTo(7, 0);
    expect(Math.abs(n.s - t.s[i])).toBeLessThan(base.spacing);
  });

  it('windowed search with a hint agrees with the full search', () => {
    const i = 200;
    const p = t.pos[i].clone().addScaledVector(t.right[i], 5).add(new Vector3(0, 1, 0));
    const full = nearestOnTrack(t, p);
    const near = nearestOnTrack(t, p, i - 3);
    expect(near.index).toBe(full.index);
    expect(near.dist).toBeCloseTo(full.dist, 6);
  });

  it('wraps around the seam', () => {
    const p = t.pos[0].clone().lerp(t.pos[t.pos.length - 1], 0.5);
    const n = nearestOnTrack(t, p, 1);
    expect(n.dist).toBeLessThan(0.5);
    expect(n.index).toBe(t.pos.length - 1);
  });
});
