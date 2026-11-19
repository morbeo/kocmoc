import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { generateTrack, nearestOnTrack, radiusAt, radiusAtS, type RaceGenParams } from './track';
import { addRoutes, locate, newRouteState } from './routes';
import { addSections, wallAt } from './sections';
import { generateHazards } from './gauntlet';
import { generatePads } from './pads';
import { anchorS, bakeTrack, compileTrack, hashText, LIMITS, parseTrackDoc, parseTrackText, sAnchor, serializeTrackDoc, TRACK_KIND, type TrackDoc } from './trackDoc';

const gen: RaceGenParams = { seed: 9, points: 12, radius: 1200, wobble: 0.3, height: 200, twist: 1, twistNoise: 0.4, tubeRadius: 40, spacing: 4, checkpoints: 8 };

/** A generated race course the way race mode builds it (forks estimated, not flown, to keep it quick). */
function course(p: RaceGenParams) {
  const track = addSections(addRoutes(generateTrack(p), { seed: p.seed, forks: 2, pitLane: true, saveMin: 0, saveMax: 1, costMax: 1 }), {
    seed: p.seed,
    count: 3,
    kinds: ['cavern', 'hex', 'open'],
    minLength: 300,
    maxLength: 600,
  });
  const hazards = generateHazards(track, { seed: p.seed, count: 4, kinds: ['iris', 'shutter', 'turbine', 'laser'], difficulty: 0.5, minClearance: 1.8, shipRadius: 1.5 }).planes;
  const pads = generatePads(track, { seed: p.seed, boosts: 3, slows: 2, boostLength: 60, slowLength: 160, avoid: hazards.map((q) => q.s) });
  return { track, hazards, pads };
}

const maxGap = (a: Vector3[], b: Vector3[]) => Math.max(...a.map((v, i) => v.distanceTo(b[i])));

describe('bake and compile', () => {
  for (const shape of ['loop', 'stunt', 'trefoil'] as const) {
    it(`a baked ${shape} compiles back to the generator's centreline and frames`, () => {
      const t = generateTrack({ ...gen, shape });
      const c = compileTrack(bakeTrack({ track: t, seed: 9 })).track;
      expect(c.pos.length).toBe(t.pos.length);
      expect(Math.abs(c.length - t.length)).toBeLessThan(0.5);
      // positions are rounded to 0.1 m in the file
      expect(maxGap(c.pos, t.pos)).toBeLessThan(0.15);
      for (let i = 0; i < t.pos.length; i++) expect(c.up[i].dot(t.up[i])).toBeGreaterThan(0.9999);
      expect(c.checkpoints.map(Math.round)).toEqual(t.checkpoints.map(Math.round));
      expect(c.rad).toBeUndefined();
    });
  }

  it('keeps forks, sections, hazards and pads where the generator put them', () => {
    const g = course(gen);
    expect(g.track.branches?.length).toBeGreaterThanOrEqual(2);
    expect(g.track.sections?.length).toBeGreaterThanOrEqual(2);
    const doc = bakeTrack({ track: g.track, hazards: g.hazards, pads: g.pads, seed: 9 });
    const c = compileTrack(doc);
    const bs = c.track.branches!;
    expect(bs.map((b) => b.kind)).toEqual(g.track.branches!.map((b) => b.kind));
    bs.forEach((b, k) => {
      const want = g.track.branches![k];
      expect(Math.abs(b.s0 - want.s0)).toBeLessThan(0.5);
      expect(Math.abs(b.s1 - want.s1)).toBeLessThan(0.5);
      expect(b.pos.length).toBe(want.pos.length);
      expect(maxGap(b.pos, want.pos)).toBeLessThan(0.5);
      expect(b.radius).toBeCloseTo(want.radius, 1);
      expect(Math.abs(b.open0 - want.open0)).toBeLessThan(8);
    });
    expect(c.track.checkpoints.map(Math.round)).toEqual(g.track.checkpoints.map(Math.round));
    c.track.sections!.forEach((x, k) => {
      const want = g.track.sections![k];
      expect(x.kind).toBe(want.kind);
      expect(Math.abs(x.s0 - want.s0)).toBeLessThan(0.5);
      expect(x.seed).toBe(want.seed);
    });
    const planes = c.hazards!.planes;
    expect(planes.map((p) => p.kind)).toEqual(g.hazards.map((p) => p.kind));
    planes.forEach((p, k) => expect(Math.abs(p.s - g.hazards[k].s)).toBeLessThan(0.5));
    expect(c.hazards!.chunks.length).toBeGreaterThan(0);
    expect(c.pads.map((p) => p.kind)).toEqual(g.pads.map((p) => p.kind));
    c.pads.forEach((p, k) => expect(Math.abs(p.s0 - g.pads[k].s0)).toBeLessThan(0.5));
    // gauntlet and proving fly the bare line
    expect(c.base.branches).toBeUndefined();
    expect(c.base.sections).toBeUndefined();
  });

  it('bakes to the same text twice, and a compiled file bakes back to itself', () => {
    const g = course(gen);
    const doc = bakeTrack({ track: g.track, hazards: g.hazards, pads: g.pads, seed: 9, title: 'Test' });
    expect(serializeTrackDoc(bakeTrack({ track: g.track, hazards: g.hazards, pads: g.pads, seed: 9, title: 'Test' }))).toBe(serializeTrackDoc(doc));
    const c = compileTrack(doc);
    const again = bakeTrack({ track: c.track, hazards: c.hazards!.planes, pads: c.pads, seed: 9, title: 'Test' });
    expect(again.points).toEqual(doc.points);
    expect(again.sections).toEqual(doc.sections);
    expect(again.branches?.map((b) => b.kind)).toEqual(doc.branches?.map((b) => b.kind));
  });

  it('refuses a track with no control points', () => {
    const t = generateTrack(gen);
    expect(() => bakeTrack({ track: { ...t, source: undefined }, seed: 1 })).toThrow();
  });
});

const square = (closed = true, extra: Partial<TrackDoc> = {}): TrackDoc =>
  parseTrackDoc({
    kind: TRACK_KIND,
    version: 1,
    closed,
    seed: 3,
    radius: 30,
    spacing: 4,
    checkpoints: 4,
    twist: 0,
    points: [
      { p: [0, 0, 0] },
      { p: [800, 0, 0] },
      { p: [800, 0, 800] },
      { p: [0, 0, 800] },
    ],
    ...extra,
  })!;

describe('per-point tube radius', () => {
  const doc = square(true, { points: [{ p: [0, 0, 0], r: 30 }, { p: [800, 0, 0], r: 60 }, { p: [800, 0, 800], r: 30 }, { p: [0, 0, 800], r: 30 }] });
  const t = compileTrack(doc).track;

  it('eases between control points', () => {
    expect(t.rad).toHaveLength(t.pos.length);
    expect(Math.min(...t.rad!)).toBeCloseTo(30);
    expect(Math.max(...t.rad!)).toBeCloseTo(60);
    expect(radiusAtS(t, t.length / 4)).toBeCloseTo(60, 0);
    expect(radiusAtS(t, (t.length * 3) / 4)).toBeCloseTo(30);
    // smooth: neighbouring samples never jump
    for (let i = 1; i < t.rad!.length; i++) expect(Math.abs(t.rad![i] - t.rad![i - 1])).toBeLessThan(1);
  });

  it('moves the walls: sections and collision read it', () => {
    expect(wallAt(t, t.length / 4, 0).rho).toBeCloseTo(60, 0);
    expect(wallAt(t, (t.length * 3) / 4, 0).rho).toBeCloseTo(30);
    const i = Math.round(t.pos.length / 4);
    const st = newRouteState(t, t.pos[i]);
    expect(st.radius).toBeCloseTo(radiusAt(t, i), 3);
    const out = { index: 0, t: 0, s: 0, point: new Vector3(), dist: Infinity };
    locate(t, t.pos[i].clone().addScaledVector(t.right[i], 45), st, out);
    expect(out.dist).toBeCloseTo(45, 0);
    expect(st.radius).toBeGreaterThan(55);
  });

  it('a uniform radius leaves no per-sample list', () => {
    expect(compileTrack(square()).track.rad).toBeUndefined();
    expect(radiusAtS(compileTrack(square()).track, 100)).toBe(30);
  });
});

describe('open (point-to-point) tracks', () => {
  const t = compileTrack(square(false)).track;

  it('runs from the first control point to the last, with no wrap', () => {
    expect(t.closed).toBe(false);
    expect(t.pos[0].length()).toBeLessThan(1e-6);
    expect(t.pos[t.pos.length - 1].distanceTo(new Vector3(0, 0, 800))).toBeLessThan(1e-6);
    expect(t.s[t.s.length - 1]).toBeCloseTo(t.length);
    // the frame stays smooth to the end, with no closure twist spread into it
    for (let i = 1; i < t.pos.length; i++) expect(t.up[i].dot(t.up[i - 1])).toBeGreaterThan(0.99);
    expect(t.up[0].y).toBeCloseTo(1);
  });

  it('nearest-point search never snaps across the gap between the ends', () => {
    const mid = new Vector3(0, 0, 400); // on the missing side, between the two ends
    const n = nearestOnTrack(t, mid);
    expect(n.dist).toBeGreaterThan(300);
    const end = nearestOnTrack(t, t.pos[t.pos.length - 1], t.pos.length - 2);
    expect(end.index).toBe(t.pos.length - 2);
    expect(end.dist).toBeLessThan(1e-6);
  });

  it('anchors reach both ends', () => {
    expect(anchorS([0, 0], 4, t.length, false)).toBe(0);
    expect(anchorS([2, 1], 4, t.length, false)).toBeCloseTo(t.length);
    expect(sAnchor(t.length, 4, t.length, false)).toEqual([2, 1]);
  });
});

describe('parseTrackDoc', () => {
  it('rejects what is not a track file', () => {
    for (const bad of [null, 3, 'x', [], {}, { kind: 'other' }, { kind: TRACK_KIND, version: 99, points: [] }, { kind: TRACK_KIND, version: 1, points: 'no' }]) {
      expect(parseTrackDoc(bad)).toBeUndefined();
    }
    expect(parseTrackText('{nope')).toBeUndefined();
  });

  it('needs enough finite control points', () => {
    const pts = (k: number) => Array.from({ length: k }, (_, i) => ({ p: [i * 100, 0, (i % 2) * 100] }));
    expect(parseTrackDoc({ kind: TRACK_KIND, version: 1, points: pts(3) })).toBeUndefined();
    expect(parseTrackDoc({ kind: TRACK_KIND, version: 1, closed: false, points: pts(2) })).toBeDefined();
    expect(parseTrackDoc({ kind: TRACK_KIND, version: 1, points: [...pts(4), { p: [0, NaN, 0] }] })).toBeUndefined();
    expect(parseTrackDoc({ kind: TRACK_KIND, version: 1, points: [...pts(4), { p: [0, 2e6, 0] }] })).toBeUndefined();
    expect(parseTrackDoc({ kind: TRACK_KIND, version: 1, points: pts(LIMITS.points + 1) })).toBeUndefined();
  });

  it('fills defaults, rounds, and drops bad items instead of the whole file', () => {
    const doc = parseTrackDoc({
      kind: TRACK_KIND,
      version: 1,
      points: [{ p: [0.123, 0, 0], roll: 0.12345 }, { p: [800, 0, 0], r: 40 }, { p: [800, 0, 800] }, { p: [0, 0, 800] }],
      sections: [{ kind: 'hex', from: [0, 0.2], to: [0, 0.8] }, { kind: 'blob', from: [0, 0], to: [1, 0] }, { kind: 'hex', from: [2, 0.5], to: [1, 0] }],
      hazards: [{ kind: 'iris', at: [1, 0.5], shape: { k: 'iris', min: 3, max: 30, period: 3, phase: 0, dwell: 0.4, petals: 8 } }, { kind: 'iris', at: [1, 0.5], shape: { k: 'iris', min: 3 } }],
      vars: { 'render.track.color': '#ffffff', bad: { x: 1 }, n: 3 },
      title: 'x'.repeat(500),
    })!;
    expect(doc).toBeDefined();
    expect(doc.closed).toBe(true);
    expect(doc.radius).toBe(40);
    expect(doc.points[0]).toEqual({ p: [0.1, 0, 0], roll: 0.123 });
    // the same as the nominal radius: left out
    expect(doc.points[1]).toEqual({ p: [800, 0, 0] });
    expect(doc.sections).toHaveLength(1);
    expect(doc.hazards).toHaveLength(1);
    expect(doc.vars).toEqual({ 'render.track.color': '#ffffff', n: 3 });
    expect(doc.title).toHaveLength(LIMITS.title);
  });

  it('round-trips through its own text', () => {
    const doc = square(false);
    expect(parseTrackText(serializeTrackDoc(doc))).toEqual(doc);
    expect(hashText(serializeTrackDoc(doc))).toBe(hashText(serializeTrackDoc(square(false))));
    expect(hashText(serializeTrackDoc(doc))).not.toBe(hashText(serializeTrackDoc(square(true))));
  });

  it('compiles explicit items at their anchors', () => {
    const doc = square(true, {
      sections: [{ kind: 'hex', from: [1, 0.2], to: [1, 0.8], ramp: 40, seed: 2, roll: 0 }],
      pads: [{ kind: 'boost', from: [2, 0.1], to: [2, 0.3], theta: 1, half: 0.4, depth: 6, w: 0 }],
      hazards: [{ kind: 'iris', at: [3, 0.5], thickness: 2, shape: { k: 'iris', min: 4, max: 27, period: 3, phase: 0, dwell: 0.4, petals: 8 } }],
    });
    const c = compileTrack(doc);
    const L = c.track.length;
    expect(c.track.sections![0].s0).toBeCloseTo(L * 0.3);
    expect(c.track.sections![0].s1).toBeCloseTo(L * 0.45);
    expect(c.pads[0].s0).toBeCloseTo(L * 0.525);
    expect(c.hazards!.planes[0].s).toBeCloseTo(L * 0.875);
  });
});

