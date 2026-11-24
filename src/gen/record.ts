import { CatmullRomCurve3, Vector3 } from 'three';
import { radiusAt, sampleTrack, type Track } from './track';
import { parseTrackDoc, TRACK_KIND, TRACK_VERSION, LIMITS, type TrackDoc } from './trackDoc';

/**
 * Record a track by flying it: the ship's path is sampled every few metres, then smoothed and
 * reduced to the control points of a track file (M8c). Pure maths, no scene.
 */

/** One recorded sample: where the ship was, which way its top faced, and the tube radius asked for. */
export interface RecSample {
  p: Vector3;
  up: Vector3;
  r: number;
}

/** Samples a path as it is flown: one sample every `step` m, with pause and undo. */
export class PathRecorder {
  readonly samples: RecSample[] = [];
  /** path length at each sample, m */
  readonly s: number[] = [];
  paused = false;

  constructor(
    public step = 4,
    public max = 8000,
  ) {}

  get length(): number {
    return this.s.length ? this.s[this.s.length - 1] : 0;
  }

  get full(): boolean {
    return this.samples.length >= this.max;
  }

  /** Offer the ship's position; adds a sample once it is `step` m from the last. True if it did. */
  push(p: Vector3, up: Vector3, r: number): boolean {
    if (this.paused || this.full) return false;
    const last = this.samples[this.samples.length - 1];
    const d = last ? last.p.distanceTo(p) : 0;
    if (last && d < this.step) return false;
    this.samples.push({ p: p.clone(), up: up.clone().normalize(), r });
    this.s.push(this.length + d);
    return true;
  }

  /** Drop the last `dist` m (the first sample stays). Returns how many samples went. */
  undo(dist: number): number {
    const keep = this.length - dist;
    let n = 0;
    while (this.samples.length > 1 && this.s[this.s.length - 1] > keep) {
      this.samples.pop();
      this.s.pop();
      n++;
    }
    return n;
  }
}

// --- closing -------------------------------------------------------------------

/** Unit heading over the first or last `span` m of a path. */
function heading(samples: readonly RecSample[], end: boolean, span: number): Vector3 {
  const n = samples.length;
  const a = end ? samples[n - 1].p : samples[0].p;
  let b = a;
  for (let k = 1; k < n; k++) {
    const q = samples[end ? n - 1 - k : k].p;
    b = q;
    if (q.distanceTo(a) >= span) break;
  }
  return end ? new Vector3().subVectors(a, b).normalize() : new Vector3().subVectors(b, a).normalize();
}

/**
 * Can the path close into a loop here? It must be long enough (20 tube radii), end within
 * `near` radii of the start and head the same way (within about 60°).
 */
export function canClose(samples: readonly RecSample[], radius: number, near = 3): boolean {
  const n = samples.length;
  if (n < 8) return false;
  let len = 0;
  for (let i = 1; i < n; i++) len += samples[i].p.distanceTo(samples[i - 1].p);
  if (len < radius * 20) return false;
  if (samples[n - 1].p.distanceTo(samples[0].p) > radius * near) return false;
  return heading(samples, true, radius).dot(heading(samples, false, radius)) > 0.5;
}

/** Close the loop: cut the end where it comes nearest the start, so the last sample leads into the first. */
export function closeLoop(samples: readonly RecSample[], radius: number): RecSample[] {
  const n = samples.length;
  const p0 = samples[0].p;
  // look only at the tail (the last 6 radii of path): the start is near itself too
  let best = n - 1;
  let bestD = Infinity;
  let back = 0;
  for (let i = n - 1; i > 0 && back < radius * 6; i--) {
    const d = samples[i].p.distanceTo(p0);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
    back += samples[i].p.distanceTo(samples[i - 1].p);
  }
  // a sample on top of the start would be a duplicate control point
  const step = n > 1 ? samples[1].p.distanceTo(p0) : 1;
  return samples.slice(0, bestD < step * 0.5 ? best : best + 1);
}

/**
 * Bridge the end back to the start with a cubic Hermite curve (tangents along the path at both
 * ends, as long as the gap), sampled every `step` m, so the path becomes a loop.
 */
export function bridge(samples: readonly RecSample[], step: number, radius: number): RecSample[] {
  const n = samples.length;
  const a = samples[n - 1];
  const b = samples[0];
  const gap = a.p.distanceTo(b.p);
  const t0 = heading(samples, true, radius).multiplyScalar(gap);
  const t1 = heading(samples, false, radius).multiplyScalar(gap);
  const point = (t: number) => {
    const t2 = t * t;
    const t3 = t2 * t;
    return new Vector3()
      .addScaledVector(a.p, 2 * t3 - 3 * t2 + 1)
      .addScaledVector(t0, t3 - 2 * t2 + t)
      .addScaledVector(b.p, -2 * t3 + 3 * t2)
      .addScaledVector(t1, t3 - t2);
  };
  // arc length of the bridge, roughly, to space its samples like the rest
  let arc = 0;
  let prev = a.p;
  for (let k = 1; k <= 64; k++) {
    const q = point(k / 64);
    arc += q.distanceTo(prev);
    prev = q;
  }
  const count = Math.max(1, Math.round(arc / step));
  const out = samples.slice();
  for (let k = 1; k < count; k++) {
    const t = k / count;
    const up = a.up.clone().lerp(b.up, t);
    if (up.lengthSq() < 1e-6) up.copy(a.up);
    out.push({ p: point(t), up: up.normalize(), r: a.r + (b.r - a.r) * t });
  }
  return out;
}

// --- fitting -------------------------------------------------------------------

/** Moving average over about `window` m each side (ends of an open path stay put). */
export function smoothPath(samples: readonly RecSample[], closed: boolean, window: number, step: number): RecSample[] {
  const n = samples.length;
  const k = Math.max(0, Math.round(window / Math.max(step, 1e-3)));
  if (k === 0 || n < 3) return samples.map((q) => ({ p: q.p.clone(), up: q.up.clone(), r: q.r }));
  return samples.map((q, i) => {
    const w = closed ? Math.min(k, Math.floor((n - 1) / 2)) : Math.min(k, i, n - 1 - i);
    const p = new Vector3();
    const up = new Vector3();
    for (let d = -w; d <= w; d++) {
      const s = samples[(((i + d) % n) + n) % n];
      p.add(s.p);
      up.add(s.up);
    }
    p.divideScalar(2 * w + 1);
    if (up.lengthSq() < 1e-6) up.copy(q.up);
    return { p, up: up.normalize(), r: q.r };
  });
}

const _ab = new Vector3();
const _ap = new Vector3();
function segDist(p: Vector3, a: Vector3, b: Vector3): number {
  _ab.subVectors(b, a);
  const l2 = _ab.lengthSq();
  const t = l2 > 0 ? Math.min(1, Math.max(0, _ap.subVectors(p, a).dot(_ab) / l2)) : 0;
  return _ap.copy(a).addScaledVector(_ab, t).distanceTo(p);
}

/**
 * Pick control points from a dense path: start with one every `spacing` m, then keep adding the
 * sample that strays furthest from the spline wherever it strays more than `tol` m. Tight turns get
 * more points that way. Returns sample indices, in order.
 */
export function fitControlPoints(pts: readonly Vector3[], closed: boolean, tol: number, spacing: number, maxPoints = LIMITS.points): number[] {
  const m = pts.length;
  const s = [0];
  for (let i = 1; i < m; i++) s.push(s[i - 1] + pts[i].distanceTo(pts[i - 1]));
  const total = s[m - 1];
  let idx: number[] = [0];
  for (let i = 1; i < m; i++) if (s[i] - s[idx[idx.length - 1]] >= spacing) idx.push(i);
  if (closed) {
    // the last point must not crowd the first round the seam
    while (idx.length > 1 && total - s[idx[idx.length - 1]] < spacing * 0.5) idx.pop();
    // short loops: four points evenly
    if (idx.length < 4) idx = [0, 1, 2, 3].map((k) => Math.round((k * m) / 4));
  } else if (idx[idx.length - 1] !== m - 1) {
    if (total - s[idx[idx.length - 1]] < spacing * 0.5 && idx.length > 1) idx.pop();
    idx.push(m - 1);
  }
  for (let iter = 0; iter < 40; iter++) {
    const n = idx.length;
    const segs = closed ? n : n - 1;
    const curve = new CatmullRomCurve3(idx.map((i) => pts[i]), closed, 'centripetal');
    const add: number[] = [];
    for (let k = 0; k < segs; k++) {
      const i0 = idx[k];
      const i1 = k + 1 < n ? idx[k + 1] : idx[0] + m;
      if (i1 - i0 < 3) continue;
      const len = (k + 1 < n ? s[i1] : total + s[idx[0]]) - s[i0];
      const steps = Math.min(64, Math.max(8, Math.ceil(len / Math.max(tol, 1))));
      const poly: Vector3[] = [];
      for (let j = 0; j <= steps; j++) poly.push(curve.getPoint((k + j / steps) / segs));
      let worst = 0;
      let at = -1;
      for (let i = i0 + 1; i < i1; i++) {
        const p = pts[i % m];
        let d = Infinity;
        for (let j = 0; j < steps; j++) d = Math.min(d, segDist(p, poly[j], poly[j + 1]));
        // keep new points away from their neighbours so the spline doesn't kink
        if (d > worst && i - i0 >= 2 && i1 - i >= 2) {
          worst = d;
          at = i % m;
        }
      }
      if (worst > tol && at >= 0) add.push(at);
    }
    if (!add.length || n + add.length > maxPoints) break;
    idx = [...idx, ...add].sort((a, b) => a - b);
  }
  return idx;
}

// --- roll ----------------------------------------------------------------------

/** Wrap an angle into (-π, π]. */
const wrap = (a: number) => a - Math.PI * 2 * Math.round(a / (Math.PI * 2));

/**
 * Roll at each control point: the ship's up against the rotation-minimising frame of the spline
 * (sampled with no roll), unwrapped so it turns smoothly. On a loop, whole turns become `twist`.
 */
export function fitRolls(ctrl: readonly Vector3[], ups: readonly Vector3[], closed: boolean, spacing: number): { rolls: number[]; twist: number } {
  const n = ctrl.length;
  const flat = sampleTrack(ctrl.map((v) => v.clone()), new Array(n).fill(0), { closed, spacing, radius: 10, checkpoints: 1, twist: 0 });
  const segs = closed ? n : n - 1;
  const count = closed ? flat.pos.length : flat.pos.length - 1;
  const raw: number[] = [];
  for (let i = 0; i < n; i++) {
    // roll is eased by arc length share, so control point i acts at sample i/segs of the way
    const k = Math.min(flat.pos.length - 1, Math.round((i / segs) * count)) % flat.pos.length;
    const u = ups[i];
    raw.push(Math.atan2(u.dot(flat.right[k]), u.dot(flat.up[k])));
  }
  const rolls = [raw[0]];
  for (let i = 1; i < n; i++) rolls.push(rolls[i - 1] + wrap(raw[i] - raw[i - 1]));
  if (!closed) return { rolls, twist: 0 };
  // going round: back at the start, the roll should be raw[0] again plus whole turns
  const end = rolls[n - 1] + wrap(raw[0] - raw[n - 1]);
  const twist = Math.round((end - rolls[0]) / (Math.PI * 2));
  return { rolls: rolls.map((r, i) => r - twist * Math.PI * 2 * (i / n)), twist };
}

// --- track file ----------------------------------------------------------------

export interface FitOptions {
  closed: boolean;
  seed: number;
  title?: string;
  /** allowed distance from the flown path, as a share of the tube radius */
  tolerance?: number;
  /** starting distance between control points, in tube radii */
  spacing?: number;
  /** smoothing window each side, in tube radii */
  smooth?: number;
  /** sample spacing the path was recorded at, m */
  step?: number;
  vars?: TrackDoc['vars'];
}

/** Turn a recorded path (closed with `closeLoop` or `bridge` first, for a loop) into a track file. */
export function recordingToDoc(samples: readonly RecSample[], o: FitOptions): TrackDoc {
  const step = o.step ?? 4;
  const radii = samples.map((q) => q.r).sort((a, b) => a - b);
  const radius = radii[Math.floor(radii.length / 2)] ?? 40;
  const sm = smoothPath(samples, o.closed, radius * (o.smooth ?? 0.5), step);
  const idx = fitControlPoints(
    sm.map((q) => q.p),
    o.closed,
    radius * (o.tolerance ?? 0.25),
    radius * (o.spacing ?? 8),
  );
  const ctrl = idx.map((i) => sm[i].p);
  const { rolls, twist } = fitRolls(ctrl, idx.map((i) => sm[i].up), o.closed, 4);
  let length = 0;
  for (let i = 1; i < sm.length; i++) length += sm[i].p.distanceTo(sm[i - 1].p);
  const raw = {
    kind: TRACK_KIND,
    version: TRACK_VERSION,
    title: o.title,
    closed: o.closed,
    seed: o.seed,
    radius,
    spacing: 4,
    checkpoints: Math.max(3, Math.min(16, Math.round(length / 700))),
    twist,
    points: idx.map((i, k) => ({ p: [sm[i].p.x, sm[i].p.y, sm[i].p.z], roll: rolls[k], r: sm[i].r })),
    vars: o.vars,
  };
  const doc = parseTrackDoc(JSON.parse(JSON.stringify(raw)));
  if (!doc) throw new Error('kocmoc: recorded track did not validate');
  return doc;
}

// --- checks --------------------------------------------------------------------

export type ProblemKind = 'close' | 'tight';

/** A stretch of track that fails the generator's acceptance checks. */
export interface Problem {
  kind: ProblemKind;
  /** arc length range, m */
  s0: number;
  s1: number;
  /** sample index range */
  i0: number;
  i1: number;
}

/** Shares of the tube radius the generator accepts: parts of the track this far apart, bends this wide. */
export const CHECKS = { separation: 2.4, curvature: 1.2, arc: 4 } as const;

/**
 * The generator's acceptance tests, per sample: the tube passing within 2.4 radii of another part of
 * itself (more than 4 radii further along), and bends tighter than 1.2 radii. Runs of failing samples
 * come back as stretches, to mark red.
 */
export function trackProblems(track: Pick<Track, 'pos' | 'tan' | 's' | 'length' | 'radius' | 'rad' | 'closed'>): Problem[] {
  const n = track.pos.length;
  const closed = track.closed !== false;
  const L = track.length;
  const rad = (i: number) => radiusAt(track as Track, i);
  const flags: Record<ProblemKind, Uint8Array> = { close: new Uint8Array(n), tight: new Uint8Array(n) };
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const j = (i + 1) % n;
    const ds = j === 0 ? L - track.s[i] : track.s[j] - track.s[i];
    const angle = track.tan[i].angleTo(track.tan[j]);
    if (angle > 1e-9 && ds / angle < rad(i) * CHECKS.curvature) flags.tight[i] = flags.tight[j] = 1;
  }
  for (let i = 0; i < n; i++) {
    const ri = rad(i);
    const pi = track.pos[i];
    for (let j = i + 1; j < n; j++) {
      const d = track.s[j] - track.s[i];
      const arc = closed ? Math.min(d, L - d) : d;
      const r = Math.max(ri, rad(j));
      if (arc < r * CHECKS.arc) continue;
      if (pi.distanceToSquared(track.pos[j]) < (r * CHECKS.separation) ** 2) flags.close[i] = flags.close[j] = 1;
    }
  }
  const out: Problem[] = [];
  for (const kind of ['close', 'tight'] as const) {
    const f = flags[kind];
    for (let i = 0; i < n; i++) {
      if (!f[i]) continue;
      let j = i;
      while (j + 1 < n && f[j + 1]) j++;
      out.push({ kind, i0: i, i1: j, s0: track.s[i], s1: j + 1 < n ? track.s[j + 1] : closed ? L : track.s[j] });
      i = j;
    }
  }
  return out.sort((a, b) => a.s0 - b.s0);
}

/** One line per problem, for the review panel. */
export function describeProblem(p: Problem): string {
  const at = `${(p.s0 / 1000).toFixed(2)}–${(p.s1 / 1000).toFixed(2)} km`;
  return p.kind === 'tight' ? `bend too tight at ${at}` : `tube too close to itself at ${at}`;
}
