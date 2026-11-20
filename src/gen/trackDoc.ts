import { Vector3 } from 'three';
import { sampleTrack, type Track } from './track';
import { branchFrom, branchOpenings, estimateSave, withBranches, ROUTE_KINDS, type Branch, type RouteKind } from './routes';
import { SECTION_KINDS, type Section, type SectionKind } from './sections';
import { HAZARD_KINDS, CHUNK_KINDS, type Gauntlet, type Plane, type PlaneKind, type Shape } from './gauntlet';
import { PAD_KINDS, type Pad, type PadKind } from './pads';

/**
 * Track files: a hand-made or baked track as plain JSON. Control points (position, roll, tube
 * radius) give the centreline, sampled the way the generator samples its own (`sampleTrack`), and
 * everything placed on it is anchored to the control polygon as `[segment, t]`, so it stays near the
 * same points when they move. `compileTrack` turns a file into the `Track`, hazards and pads the
 * game already flies.
 */

export const TRACK_KIND = 'kocmoc.track';
export const TRACK_VERSION = 1;

/** `[segment, t]`: `t` (0..1) of the way from control point `segment` to the next. */
export type Anchor = [number, number];

export interface DocPoint {
  p: [number, number, number];
  /** roll here, radians (default 0) */
  roll?: number;
  /** tube radius here, m (default the track's `radius`) */
  r?: number;
}

export interface DocBranch {
  kind: RouteKind;
  from: Anchor;
  to: Anchor;
  /** which way it bulges off the loop (angle from right towards up), and how far, m */
  theta: number;
  amp: number;
  /** its own tube radius, m (default its kind's share of the track's) */
  radius?: number;
}

export interface DocSection {
  kind: SectionKind;
  from: Anchor;
  to: Anchor;
  ramp: number;
  seed: number;
  roll: number;
}

export interface DocHazard {
  kind: PlaneKind;
  at: Anchor;
  thickness: number;
  shape: Shape;
}

export interface DocPad {
  kind: PadKind;
  from: Anchor;
  to: Anchor;
  theta: number;
  half: number;
  depth: number;
  w: number;
}

export interface TrackDoc {
  kind: typeof TRACK_KIND;
  version: number;
  title?: string;
  author?: string;
  /** false: point to point, from the first control point to the last */
  closed: boolean;
  /** seeds what the file leaves to the generators: scenery, screens, cavern movers */
  seed: number;
  /** nominal tube radius, m */
  radius: number;
  /** centreline sample spacing, m */
  spacing: number;
  checkpoints: number;
  /** whole turns of roll over the track (closed loops round it) */
  twist: number;
  points: DocPoint[];
  branches?: DocBranch[];
  sections?: DocSection[];
  hazards?: DocHazard[];
  pads?: DocPad[];
  /** the venue's look and anything else to set while flying it (palette, profile, scenery...) */
  vars?: Record<string, string | number | boolean>;
}

/** Most control points and placed items a file may hold. */
export const LIMITS = { points: 2000, items: 500, coord: 1e6, title: 200, vars: 400 } as const;

// --- parsing -----------------------------------------------------------------

const r1 = (x: number) => Math.round(x * 10) / 10;
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const r4 = (x: number) => Math.round(x * 1e4) / 1e4;
const num = (x: unknown, lo = -Infinity, hi = Infinity): number | undefined =>
  typeof x === 'number' && Number.isFinite(x) && x >= lo && x <= hi ? x : undefined;
const obj = (x: unknown): Record<string, unknown> | undefined => (x && typeof x === 'object' && !Array.isArray(x) ? (x as Record<string, unknown>) : undefined);
const oneOf = <T extends string>(list: readonly T[], x: unknown): T | undefined => (list.includes(x as T) ? (x as T) : undefined);

/** Numeric fields each obstacle shape needs, with their lowest allowed value. */
const SHAPE_FIELDS: Record<Shape['k'], Record<string, number>> = {
  hole: { r: 0, a0: -Infinity, omega: -Infinity, gap: 0.1 },
  slot: { angle: -Infinity, u0: -Infinity, min: 0, max: 0, period: 0.05, phase: -Infinity },
  iris: { min: 0, max: 0, period: 0.05, phase: -Infinity, dwell: 0, petals: 1 },
  beams: { a0: -Infinity, omega: -Infinity, spacing: 0.1, width: 0, ox: -Infinity, oy: -Infinity, count: 1 },
  blades: { n: 1, hub: 0, reach: 0, width: 0, a0: -Infinity, omega: -Infinity },
};

function parseShape(raw: unknown): Shape | undefined {
  const r = obj(raw);
  const k = r && oneOf(Object.keys(SHAPE_FIELDS) as Shape['k'][], r.k);
  if (!r || !k) return undefined;
  const out: Record<string, unknown> = { k };
  for (const [f, lo] of Object.entries(SHAPE_FIELDS[k])) {
    const v = num(r[f], lo, LIMITS.coord);
    if (v === undefined) return undefined;
    out[f] = f === 'count' || f === 'n' || f === 'petals' ? Math.min(200, Math.round(v)) : r3(v);
  }
  if (k === 'slot' && r.dwell !== undefined) {
    const d = num(r.dwell, 0, 1);
    if (d === undefined) return undefined;
    out.dwell = r3(d);
  }
  if (k === 'iris') out.dwell = Math.min(1, out.dwell as number);
  if (k === 'beams') out.crossed = r.crossed === true;
  return out as unknown as Shape;
}

/** Validate untrusted JSON (file, URL, scenario) into a track file, rounded so it stays small; undefined if it isn't one. */
export function parseTrackDoc(raw: unknown): TrackDoc | undefined {
  const r = obj(raw);
  if (!r || r.kind !== TRACK_KIND) return undefined;
  if (num(r.version, 1, TRACK_VERSION) === undefined) {
    console.warn(`kocmoc: track file version ${String(r.version)} is not supported`);
    return undefined;
  }
  const closed = r.closed !== false;
  if (!Array.isArray(r.points) || r.points.length > LIMITS.points) return undefined;
  const radius = num(r.radius, 3, 1000) ?? 40;
  const points: DocPoint[] = [];
  for (const raw of r.points) {
    const q = obj(raw);
    const p = q && Array.isArray(q.p) && q.p.length === 3 ? q.p.map((x) => num(x, -LIMITS.coord, LIMITS.coord)) : undefined;
    if (!q || !p || p.some((x) => x === undefined)) return undefined;
    const pt: DocPoint = { p: (p as number[]).map(r1) as [number, number, number] };
    const roll = num(q.roll, -1e3, 1e3);
    if (roll) pt.roll = r3(roll);
    const rad = num(q.r, 3, 1000);
    if (rad !== undefined && r1(rad) !== r1(radius)) pt.r = r1(rad);
    points.push(pt);
  }
  if (points.length < (closed ? 4 : 2)) return undefined;
  const segs = closed ? points.length : points.length - 1;
  const anchor = (x: unknown): Anchor | undefined => {
    if (!Array.isArray(x) || x.length !== 2) return undefined;
    const seg = num(x[0], 0, segs);
    const t = num(x[1], 0, 1);
    if (seg === undefined || t === undefined) return undefined;
    // the very end of an open track is the last segment's far end
    const k = Math.min(segs - 1, Math.floor(seg));
    return [k, r4(Math.min(1, seg - k + t))];
  };
  const pos = (a: Anchor) => a[0] + a[1];
  /** a list of items, each parsed or dropped */
  const list = <T>(x: unknown, parse: (o: Record<string, unknown>) => T | undefined): T[] | undefined => {
    if (!Array.isArray(x)) return undefined;
    const out: T[] = [];
    for (const it of x.slice(0, LIMITS.items)) {
      const o = obj(it);
      const v = o && parse(o);
      if (v !== undefined) out.push(v);
    }
    return out.length ? out : undefined;
  };
  const span = (o: Record<string, unknown>): [Anchor, Anchor] | undefined => {
    const from = anchor(o.from);
    const to = anchor(o.to);
    return from && to && pos(to) > pos(from) ? [from, to] : undefined;
  };
  const doc: TrackDoc = {
    kind: TRACK_KIND,
    version: TRACK_VERSION,
    closed,
    seed: Math.round(num(r.seed, 0, 1e9) ?? 1),
    radius: r1(radius),
    spacing: r3(num(r.spacing, 0.5, 50) ?? 4),
    checkpoints: Math.round(num(r.checkpoints, 1, 200) ?? 8),
    twist: r3(num(r.twist, -16, 16) ?? 0),
    points,
  };
  if (typeof r.title === 'string') doc.title = r.title.slice(0, LIMITS.title);
  if (typeof r.author === 'string') doc.author = r.author.slice(0, LIMITS.title);
  const branches = list(r.branches, (o) => {
    const kind = oneOf(ROUTE_KINDS, o.kind);
    const sp = span(o);
    const theta = num(o.theta);
    const amp = num(o.amp, 0, LIMITS.coord);
    if (!kind || !sp || theta === undefined || amp === undefined) return undefined;
    const b: DocBranch = { kind, from: sp[0], to: sp[1], theta: r3(theta), amp: r1(amp) };
    const rad = num(o.radius, 3, 1000);
    if (rad !== undefined) b.radius = r1(rad);
    return b;
  });
  const sections = list(r.sections, (o) => {
    const kind = oneOf(SECTION_KINDS, o.kind);
    const sp = span(o);
    if (!kind || !sp) return undefined;
    return { kind, from: sp[0], to: sp[1], ramp: r1(num(o.ramp, 0, LIMITS.coord) ?? radius * 1.5), seed: Math.round(num(o.seed, 0, 1e10) ?? 1), roll: r3(num(o.roll) ?? 0) };
  });
  const hazards = list(r.hazards, (o) => {
    const kind = oneOf<PlaneKind>([...HAZARD_KINDS, ...CHUNK_KINDS], o.kind);
    const at = anchor(o.at);
    const shape = parseShape(o.shape);
    if (!kind || !at || !shape) return undefined;
    return { kind, at, thickness: r3(num(o.thickness, 0.1, 100) ?? 2), shape };
  });
  const pads = list(r.pads, (o) => {
    const kind = oneOf(PAD_KINDS, o.kind);
    const sp = span(o);
    const theta = num(o.theta);
    if (!kind || !sp || theta === undefined) return undefined;
    return { kind, from: sp[0], to: sp[1], theta: r3(theta), half: r3(num(o.half, 0, Math.PI) ?? 0.4), depth: r3(num(o.depth, 0, 1000) ?? 6), w: r3(num(o.w, -1000, 1000) ?? 0) };
  });
  if (branches) doc.branches = branches;
  if (sections) doc.sections = sections;
  if (hazards) doc.hazards = hazards;
  if (pads) doc.pads = pads;
  const v = obj(r.vars);
  if (v) {
    const out: Record<string, string | number | boolean> = {};
    for (const [k, x] of Object.entries(v).slice(0, LIMITS.vars)) {
      if (typeof x === 'string' || typeof x === 'boolean' || (typeof x === 'number' && Number.isFinite(x))) out[k] = x;
    }
    doc.vars = out;
  }
  return doc;
}

/** Canonical text of a (parsed) file: what the game stores, shares and hashes. */
export const serializeTrackDoc = (doc: TrackDoc): string => JSON.stringify(doc);

/** Parse file text, or undefined if it isn't a track file. */
export function parseTrackText(text: string): TrackDoc | undefined {
  try {
    return parseTrackDoc(JSON.parse(text));
  } catch {
    return undefined;
  }
}

/** 32-bit FNV-1a of a string, as hex: names a track file in saved bests. */
export function hashText(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

// --- anchors -----------------------------------------------------------------

/** Control-polygon segments on a track of `n` points. */
const segments = (n: number, closed: boolean) => (closed ? n : n - 1);

/** Arc length of an anchor: its share of the control polygon's parameter, of the length. */
export function anchorS(a: Anchor, n: number, length: number, closed: boolean): number {
  const u = (a[0] + a[1]) / segments(n, closed);
  return Math.min(1, Math.max(0, u)) * length;
}

/** The anchor at arc length `s`. */
export function sAnchor(s: number, n: number, length: number, closed: boolean): Anchor {
  const segs = segments(n, closed);
  const u = (Math.min(length, Math.max(0, s)) / length) * segs;
  const k = Math.min(segs - 1, Math.floor(u));
  return [k, r4(u - k)];
}

// --- compiling ---------------------------------------------------------------

export interface CompiledTrack {
  /** the centreline alone: what gauntlet and proving modes fly (they keep to one line) */
  base: Track;
  /** with branches and sections: what race mode flies */
  track: Track;
  /** race hazards, or null */
  hazards: Gauntlet | null;
  pads: Pad[];
}

/** Build the track a file describes. */
export function compileTrack(doc: TrackDoc): CompiledTrack {
  const n = doc.points.length;
  const ctrl = doc.points.map((q) => new Vector3(...q.p));
  const rolls = doc.points.map((q) => q.roll ?? 0);
  const radii = doc.points.map((q) => q.r ?? doc.radius);
  const base: Track = {
    ...sampleTrack(ctrl, rolls, { closed: doc.closed, spacing: doc.spacing, radius: doc.radius, checkpoints: doc.checkpoints, twist: doc.twist, radii }),
    attempts: 0,
  };
  const L = base.length;
  const at = (a: Anchor) => anchorS(a, n, L, doc.closed);
  const branches: Branch[] = (doc.branches ?? []).map((d) => {
    const s0 = at(d.from);
    const b = branchOpenings(base, branchFrom(d.kind, base, s0, at(d.to) - s0, d.theta, d.amp, d.radius));
    b.save = estimateSave(base, b);
    return b;
  });
  let track = withBranches(base, branches);
  const sections: Section[] = (doc.sections ?? []).map((d) => ({ kind: d.kind, s0: at(d.from), s1: at(d.to), ramp: d.ramp, seed: d.seed, roll: d.roll }));
  if (sections.length) track = { ...track, sections: sections.sort((a, b) => a.s0 - b.s0) };
  const planes: Plane[] = (doc.hazards ?? []).map((d) => ({ kind: d.kind, s: at(d.at), thickness: d.thickness, shape: d.shape })).sort((a, b) => a.s - b.s);
  // one chunk per obstacle (planes a few metres apart, like a four-door shutter, are one)
  const chunks: Gauntlet['chunks'] = [];
  for (const p of planes) {
    const last = chunks[chunks.length - 1];
    if (last && p.s <= last.s1 - 10) continue;
    chunks.push({ kind: 'ring', s0: p.s - 20, s1: p.s + 20, difficulty: 0.5 });
  }
  const pads: Pad[] = (doc.pads ?? []).map((d) => ({ kind: d.kind, s0: at(d.from), s1: at(d.to), theta: d.theta, half: d.half, depth: d.depth, w: d.w })).sort((a, b) => a.s0 - b.s0);
  return { base, track, hazards: planes.length ? { chunks, planes, rocks: [], lanes: [] } : null, pads };
}

// --- baking ------------------------------------------------------------------

export interface BakeInput {
  track: Track;
  hazards?: readonly Plane[];
  pads?: readonly Pad[];
  seed: number;
  title?: string;
  vars?: Record<string, string | number | boolean>;
}

/** Write a track (one the generator made, or a compiled file) out as a track file. */
export function bakeTrack(input: BakeInput): TrackDoc {
  const t = input.track;
  const src = t.source;
  if (!src) throw new Error('kocmoc: this track has no control points to bake');
  const closed = t.closed !== false;
  const n = src.points.length;
  const anc = (s: number) => sAnchor(s, n, t.length, closed);
  const raw = {
    kind: TRACK_KIND,
    version: TRACK_VERSION,
    title: input.title,
    closed,
    seed: input.seed,
    radius: t.radius,
    spacing: src.spacing,
    checkpoints: src.checkpoints,
    twist: src.twist,
    points: src.points.map((p, i) => ({ p: [p.x, p.y, p.z], roll: src.rolls[i], r: src.radii?.[i] })),
    branches: (t.branches ?? []).map((b) => ({ kind: b.kind, from: anc(b.s0), to: anc(b.s1), theta: b.theta, amp: b.amp, radius: b.radius })),
    sections: (t.sections ?? []).map((x) => ({ kind: x.kind, from: anc(x.s0), to: anc(x.s1), ramp: x.ramp, seed: x.seed, roll: x.roll })),
    hazards: (input.hazards ?? []).map((p) => ({ kind: p.kind, at: anc(p.s), thickness: p.thickness, shape: p.shape })),
    pads: (input.pads ?? []).map((p) => ({ kind: p.kind, from: anc(p.s0), to: anc(p.s1), theta: p.theta, half: p.half, depth: p.depth, w: p.w })),
    vars: input.vars,
  };
  const doc = parseTrackDoc(JSON.parse(JSON.stringify(raw)));
  if (!doc) throw new Error('kocmoc: baked track did not validate');
  return doc;
}
