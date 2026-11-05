import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams, type Track } from './track';
import { addRoutes, courseFrame, defaultRoutes, forkAhead, inBand, locate, nearestOnPath, newRouteState, routeS, type RouteParams } from './routes';

const gen = (seed: number): RaceGenParams => ({ seed, points: 12, radius: 1000, wobble: 0.35, height: 250, twist: 0, twistNoise: 0.5, tubeRadius: 40, spacing: 4, checkpoints: 8 });
const routes = (seed: number, more: Partial<RouteParams> = {}): RouteParams => ({ ...defaultRoutes, seed, ...more });
const SEEDS = [1, 2, 3, 4, 5, 6, 7, 8];
const tracks: Track[] = SEEDS.map((seed) => addRoutes(generateTrack(gen(seed)), routes(seed)));

describe('addRoutes', () => {
  it('leaves the track alone with no forks and no pit lane', () => {
    const t = generateTrack(gen(1));
    expect(addRoutes(t, routes(1, { forks: 0, pitLane: false }))).toBe(t);
  });

  it('is deterministic per seed', () => {
    const again = addRoutes(generateTrack(gen(3)), routes(3));
    const t = tracks[2];
    expect(again.branches!.map((b) => [b.kind, b.s0, b.s1])).toEqual(t.branches!.map((b) => [b.kind, b.s0, b.s1]));
  });

  it('fits forks on every track, always with a way to cut a corner', () => {
    for (const t of tracks) {
      const kinds = t.branches!.map((b) => b.kind);
      expect(kinds.filter((k) => k !== 'pit').length).toBeGreaterThanOrEqual(2);
      expect(kinds.some((k) => k === 'shortcut' || k === 'hidden')).toBe(true);
    }
    // across seeds every kind shows up
    const all = new Set(tracks.flatMap((t) => t.branches!.map((b) => b.kind)));
    expect([...all].sort()).toEqual(['hidden', 'long', 'pit', 'shortcut', 'split']);
  });

  it('branches leave and rejoin the loop seamlessly: same point, heading and up at both ends', () => {
    const p = new Vector3();
    const f = new Vector3();
    const u = new Vector3();
    for (const t of tracks) {
      for (const b of t.branches!) {
        const n = b.pos.length - 1;
        courseFrame(t, b.s0, -1, 0, 0, p, f, u);
        expect(b.pos[0].distanceTo(p)).toBeLessThan(0.5);
        expect(b.tan[0].dot(f)).toBeGreaterThan(0.999);
        expect(b.up[0].dot(u)).toBeGreaterThan(0.99);
        courseFrame(t, b.s1, -1, 0, 0, p, f, u);
        expect(b.pos[n].distanceTo(p)).toBeLessThan(4);
        expect(b.tan[n].dot(f)).toBeGreaterThan(0.99);
        expect(b.up[n].dot(u)).toBeGreaterThan(0.99);
        // the tube is the loop's size at the mouths and its own in the middle
        expect(b.rad[0]).toBeCloseTo(t.radius);
        expect(b.rad[Math.floor(n / 2)]).toBeCloseTo(b.radius);
        expect(b.s1).toBeGreaterThan(b.s0);
        expect(b.s0).toBeGreaterThan(0);
        expect(b.s1).toBeLessThan(t.length);
      }
    }
  });

  it('shortcuts are shorter than the loop they cut, long ways longer, and the pit lane ends before the line', () => {
    for (const t of tracks) {
      for (const b of t.branches!) {
        if (b.kind === 'shortcut' || b.kind === 'hidden') expect(b.length).toBeLessThan(b.s1 - b.s0);
        if (b.kind === 'long') expect(b.length).toBeGreaterThan(b.s1 - b.s0);
        if (b.kind === 'pit') expect(t.length - b.s1).toBeLessThan(t.radius * 8);
        if (b.kind !== 'pit') expect(inBand(b.kind, b.save, defaultRoutes)).toBe(true);
      }
    }
  });

  it('once clear of the loop a branch stays clear until it merges, and keeps away from the rest of the loop', () => {
    for (const t of tracks) {
      const R = t.radius;
      for (const b of t.branches!) {
        expect(b.open0).toBeGreaterThan(0);
        expect(b.open1).toBeLessThan(b.length);
        expect(b.open1 - b.open0).toBeGreaterThan(b.length * 0.3);
        for (let k = 0; k < b.pos.length; k += 3) {
          const near = nearestOnTrack(t, b.pos[k]);
          if (b.s[k] > b.open0 && b.s[k] < b.open1) expect(near.dist).toBeGreaterThan(R + b.rad[k]);
        }
      }
    }
  });

  it('forks do not overlap, and checkpoints sit only where every route runs together', () => {
    for (const t of tracks) {
      const bs = t.branches!;
      for (let k = 1; k < bs.length; k++) expect(bs[k].s0).toBeGreaterThan(bs[k - 1].s1);
      expect(t.checkpoints[0]).toBe(0);
      for (let k = 1; k < t.checkpoints.length; k++) {
        const s = t.checkpoints[k];
        expect(s).toBeGreaterThan(t.checkpoints[k - 1]);
        for (const b of bs) expect(s < b.s0 || s > b.s1).toBe(true);
      }
      expect(t.checkpoints.length).toBeGreaterThanOrEqual(5);
    }
  });

  it('a generous band keeps more forks than a strict one', () => {
    const count = (p: Partial<RouteParams>) => SEEDS.reduce((x, seed) => x + (addRoutes(generateTrack(gen(seed)), routes(seed, p)).branches?.length ?? 0), 0);
    expect(count({ saveMin: 0.5, saveMax: 0.6, costMax: 0.01, pitLane: false })).toBeLessThan(count({ pitLane: false }));
  });
});

describe('locate', () => {
  const t = tracks[0];
  const bs = t.branches!;
  const k = bs.findIndex((b) => b.kind === 'shortcut' || b.kind === 'hidden');
  const b = bs[k];

  it('finds the branch in the middle of a fork, with progress mapped back to the loop', () => {
    const mid = Math.floor(b.pos.length / 2);
    const p = b.pos[mid].clone();
    const st = newRouteState(t, p);
    st.route = k; // flying it already
    const out = { index: 0, t: 0, s: 0, point: new Vector3(), dist: 0 };
    locate(t, p, st, out);
    expect(st.route).toBe(k);
    expect(out.dist).toBeLessThan(0.5);
    expect(out.s).toBeCloseTo(routeS(b, b.s[mid]), 0);
    expect(st.radius).toBeCloseTo(b.rad[mid], 0);
  });

  it('switches into the branch only once the ship is out of the loop\'s tube, and back after the merge', () => {
    const st = newRouteState(t, b.pos[0]);
    const out = { index: 0, t: 0, s: 0, point: new Vector3(), dist: 0 };
    const seen: number[] = [];
    let prev = -Infinity;
    let back = false;
    for (let i = 0; i < b.pos.length; i++) {
      locate(t, b.pos[i], st, out, 1.5);
      if (seen[seen.length - 1] !== st.route) seen.push(st.route);
      // progress never runs backwards by more than a hair
      expect(out.s).toBeGreaterThan(prev - 1);
      prev = out.s;
    }
    // past the merge, along the loop
    for (let s = b.s1; s < b.s1 + 200; s += 4) {
      const p = courseFrame(t, s, -1, 0, 0, new Vector3());
      locate(t, p, st, out, 1.5);
      back ||= st.route === -1;
    }
    expect(seen).toEqual([-1, k]);
    expect(back).toBe(true);
  });

  it('staying on the main line through a fork never switches route', () => {
    const st = newRouteState(t, courseFrame(t, b.s0 - 50, -1, 0, 0, new Vector3()));
    const out = { index: 0, t: 0, s: 0, point: new Vector3(), dist: 0 };
    for (let s = b.s0 - 50; s < b.s1 + 50; s += 4) {
      locate(t, courseFrame(t, s, -1, 0, 0, new Vector3()), st, out, 1.5);
      expect(st.route).toBe(-1);
      expect(out.s).toBeCloseTo(s, -1);
    }
  });

  it('outside every tube, the nearest wall wins', () => {
    const mid = Math.floor(b.pos.length / 2);
    // just outside the branch wall, far from the loop
    const p = b.pos[mid].clone().addScaledVector(b.right[mid], b.rad[mid] + 3);
    const st = newRouteState(t, p);
    const out = { index: 0, t: 0, s: 0, point: new Vector3(), dist: 0 };
    locate(t, p, st, out);
    expect(st.route).toBe(k);
    expect(out.dist).toBeGreaterThan(b.rad[mid]);
  });
});

describe('helpers', () => {
  const t = tracks[0];
  const b = t.branches![0];
  it('routeS maps the ends of a branch to its fork and merge', () => {
    expect(routeS(b, 0)).toBe(b.s0);
    expect(routeS(b, b.length)).toBeCloseTo(b.s1);
    expect(routeS(b, -5)).toBe(b.s0);
  });
  it('nearestOnPath finds a branch sample', () => {
    const n = nearestOnPath(b, b.pos[10]);
    expect(n.dist).toBeLessThan(1e-6);
    expect(n.s).toBeCloseTo(b.s[10]);
  });
  it('courseFrame follows the branch inside the fork and the loop outside it', () => {
    const p = new Vector3();
    courseFrame(t, (b.s0 + b.s1) / 2, 0, 0, 0, p);
    expect(nearestOnPath(b, p).dist).toBeLessThan(1);
    courseFrame(t, b.s1 + 100, 0, 0, 0, p);
    expect(nearestOnTrack(t, p).dist).toBeLessThan(1);
  });
  it('forkAhead names the marked fork coming up', () => {
    expect(forkAhead(t, b.s0 - 100, 450)).toBe(b);
    expect(forkAhead(t, b.s0 - 1000, 450)).not.toBe(b);
    expect(forkAhead(t, b.s1, 450)).not.toBe(b);
  });
});
