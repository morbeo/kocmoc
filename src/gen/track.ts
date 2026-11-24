import { CatmullRomCurve3, Vector3 } from 'three';
import { rng } from '../core/rng';
import type { Branch } from './routes';
import type { Section } from './sections';

export interface RaceGenParams {
  seed: number;
  /** control points around the loop */
  points: number;
  /** mean loop radius, m */
  radius: number;
  /** radial wobble as a fraction of the radius, 0..1 */
  wobble: number;
  /** vertical amplitude, m */
  height: number;
  /** full turns of roll the track makes over one lap; rounded, since a closed loop must end the way it started */
  twist: number;
  /** random roll added per control point, radians */
  twistNoise: number;
  /** tube radius (the flyable corridor), m */
  tubeRadius: number;
  /** distance between samples, m */
  spacing: number;
  checkpoints: number;
  /** overall layout; omitted (or 'loop') is the classic wobbly ring */
  shape?: TrackShape;
}

/**
 * Track layouts. `loop` is a wobbly ring; the rest are closed curves the wobble and height
 * noise are laid over: a figure eight crossing over itself, torus knots (trefoil, a five-lobed
 * star, a coil that winds round a ring), an upright loop you fly over the top of, a
 * three-lobed clover that rises and falls, a tangle that climbs and dives steeply all the way
 * round, and a stunt ring with two loop-the-loops and two corkscrews.
 */
export const TRACK_SHAPES = ['loop', 'figure8', 'trefoil', 'star', 'coil', 'upright', 'clover', 'tangle', 'stunt'] as const;
export type TrackShape = (typeof TRACK_SHAPES)[number];

/** Fewest control points that still trace each shape. */
const MIN_POINTS: Record<TrackShape, number> = { loop: 4, figure8: 12, trefoil: 24, star: 30, coil: 40, upright: 10, clover: 18, tangle: 30, stunt: 180 };

/**
 * Point on a shape's base curve at `t` in [0, 2π), radius `R`; `sep` is the height that keeps
 * crossings apart (figure eight).
 */
export function shapePoint(shape: TrackShape, t: number, R: number, sep: number, out = new Vector3()): Vector3 {
  const knot = (p: number, q: number, minor: number) => {
    const r = R * minor;
    const w = R * (1 - minor) + r * Math.cos(q * t);
    return out.set(w * Math.cos(p * t), r * Math.sin(q * t), w * Math.sin(p * t));
  };
  switch (shape) {
    case 'figure8':
      // lemniscate of Gerono, the two lobes passing over and under each other at the middle
      return out.set(R * Math.cos(t), sep * Math.sin(t), R * 0.75 * Math.sin(2 * t));
    case 'trefoil':
      return knot(2, 3, 0.42);
    case 'star':
      return knot(2, 5, 0.36);
    case 'coil':
      return knot(1, 5, 0.3);
    case 'upright':
      // stood on its edge, drifting sideways twice a lap so it isn't a flat wheel
      return out.set(R * Math.cos(t), R * 0.75 * Math.sin(t), sep * Math.sin(2 * t));
    case 'clover': {
      const r = R * (0.62 + 0.38 * Math.cos(3 * t));
      return out.set(r * Math.cos(t), sep * Math.sin(3 * t + 0.6), r * Math.sin(t));
    }
    case 'tangle': {
      const r = R * (1 + 0.22 * Math.sin(3 * t + 0.4));
      return out.set(r * Math.cos(t), sep * 1.4 * (0.7 * Math.sin(2 * t + 1) + 0.5 * Math.sin(5 * t)), r * Math.sin(t));
    }
    case 'stunt':
      return stuntPoint(t / (Math.PI * 2), R, sep, out);
    default:
      return out.set(R * Math.cos(t), 0, R * Math.sin(t));
  }
}

const STUNTS = 4;
const STUNT_SPAN = 0.1;

/**
 * A ring with four stunts spaced round it: loop-the-loop, corkscrew, loop-the-loop, corkscrew.
 * `u` in [0, 1) is reparametrised so each stunt gets a tenth of it (they are short on the ring but
 * long to fly). The first loop steps the track sideways by `w` so its exit passes beside its entry;
 * the second steps it back.
 */
function stuntPoint(u: number, R: number, sep: number, out: Vector3): Vector3 {
  const rho = sep * 0.8; // loop radius
  const w = sep * 0.6; // sideways step, so a loop's exit clears its entry
  // ring angle each stunt spans: a loop short enough that it really loops, a corkscrew long enough to roll
  const span = (k: number) => (k % 2 === 0 ? 0.8 * rho : 4 * rho) / R;
  let total = 0;
  for (let k = 0; k < STUNTS; k++) total += span(k);
  const rest = (Math.PI * 2 - total) / (1 - STUNTS * STUNT_SPAN);
  u = ((u % 1) + 1) % 1;
  const smooth = (x: number) => x * x * (3 - 2 * x);
  let theta = 0;
  let fo = 0;
  let yo = 0;
  let so = 0;
  let prevEnd = 0;
  for (let k = 0; k <= STUNTS; k++) {
    const start = k < STUNTS ? (k + 0.5) / STUNTS - STUNT_SPAN / 2 : 1;
    if (u < start) {
      theta += (u - prevEnd) * rest;
      so = k === 1 || k === 2 ? w : 0; // between the first and second loops the track runs stepped out
      break;
    }
    theta += (start - prevEnd) * rest;
    if (k === STUNTS) break;
    const v = Math.min(1, (u - start) / STUNT_SPAN);
    theta += v * span(k);
    if (u < start + STUNT_SPAN) {
      const a = Math.PI * 2 * v;
      if (k % 2 === 0) {
        // loop-the-loop: up and over, stepping sideways on the first and back on the second
        fo = rho * Math.sin(a);
        yo = rho * (1 - Math.cos(a));
        so = k === 0 ? w * smooth(v) : w * (1 - smooth(v));
      } else {
        // corkscrew: one roll round the line, swelling out and back in so it leaves the line smoothly
        const r = rho * 0.7 * Math.sin(Math.PI * v) ** 2;
        so = (k === 1 ? w : 0) + r * Math.sin(a);
        yo = r * (1 - Math.cos(a));
      }
      break;
    }
    prevEnd = start + STUNT_SPAN;
  }
  const c = Math.cos(theta);
  const sn = Math.sin(theta);
  // ring point, forward (-sin, 0, cos), outward (cos, 0, sin), up
  return out.set(R * c - fo * sn + so * c, yo, R * sn + fo * c + so * sn);
}

export interface Track {
  /** sample positions along the centreline; the loop closes from the last back to the first */
  pos: Vector3[];
  /** unit forward */
  tan: Vector3[];
  /** unit "up" across the track (includes twist) */
  up: Vector3[];
  /** unit right = tan × up */
  right: Vector3[];
  /** arc length at each sample, m */
  s: number[];
  length: number;
  radius: number;
  /** arc length of each checkpoint; [0] is the start/finish line */
  checkpoints: number[];
  /** generation attempts used (retries happen when a layout self-intersects) */
  attempts: number;
  /** alternate routes that leave the loop and rejoin it (none unless added by `addRoutes`) */
  branches?: Branch[];
  /** stretches of the loop with their own cross-section (none unless added by `addSections`) */
  sections?: Section[];
  /** false: a point-to-point track from the first sample to the last (default: a closed loop) */
  closed?: boolean;
  /** open tracks: arc length of the start line (after the run-up) and the finish gate (before the run-off) */
  start?: number;
  finish?: number;
  /** tube radius at each sample, when it varies along the track (else `radius` everywhere) */
  rad?: number[];
  /** what the centreline was built from, so it can be baked into a track file */
  source?: TrackSource;
}

/** Control points and roll a track's centreline was sampled from. */
export interface TrackSource {
  points: Vector3[];
  /** roll at each control point, radians */
  rolls: number[];
  /** whole turns of roll over a closed lap */
  twist: number;
  /** tube radius at each control point, when it varies */
  radii?: number[];
  /** sample spacing and checkpoint count asked for */
  spacing: number;
  checkpoints: number;
}

/** How to sample a spline through control points into a `Track`. */
export interface SampleOptions {
  closed: boolean;
  spacing: number;
  /** nominal tube radius, m */
  radius: number;
  checkpoints: number;
  /** whole turns of roll over the track (rounded on a closed loop) */
  twist: number;
  /** tube radius at each control point; omitted = `radius` everywhere */
  radii?: number[];
}

/** Tube radius at sample `i`, `t` of the way to the next. */
export function radiusAt(track: Track, i: number, t = 0): number {
  const r = track.rad;
  if (!r) return track.radius;
  const n = r.length;
  const a = r[Math.min(n - 1, Math.max(0, i))];
  return t > 0 ? a + (r[Math.min(n - 1, i + 1) % n] - a) * t : a;
}

/** Tube radius at arc length `s`. */
export function radiusAtS(track: Track, s: number): number {
  if (!track.rad) return track.radius;
  const n = track.pos.length;
  const L = track.length;
  const ss = track.closed === false ? Math.min(L, Math.max(0, s)) : ((s % L) + L) % L;
  const i = Math.min(n - 1, Math.floor((ss / L) * n));
  const j = Math.min(n - 1, i + 1);
  const span = (j === i ? 0 : j === 0 ? L : track.s[j]) - track.s[i];
  const f = span > 0 ? Math.min(1, Math.max(0, (ss - track.s[i]) / span)) : 0;
  return track.rad[i] + (track.rad[j] - track.rad[i]) * f;
}

/** Open tracks: distance from the first sample to the start line, m (at most a tenth of the track). */
export const RUN_UP = 60;
/** Open tracks: distance from the finish gate to the end of the tube, to brake in, m (at most a fifth). */
export const RUN_OFF = 250;

/** Start and finish lines of an open track, from its length. */
export function openLines(length: number): { start: number; finish: number } {
  return { start: Math.min(RUN_UP, length * 0.1), finish: length - Math.min(RUN_OFF, length * 0.2) };
}

/** Arc length of the start line: 0 on a loop. */
export const startLine = (track: Pick<Track, 'start'>): number => track.start ?? 0;

/** Race distance from the start line to the finish: one lap, or start to finish gate on an open track. */
export function raceSpan(track: Pick<Track, 'length' | 'closed' | 'start' | 'finish'>): number {
  return track.closed === false ? (track.finish ?? track.length) - (track.start ?? 0) : track.length;
}

/** Sample index, next sample and fraction between them at arc length `s` (wrapped on a loop, clamped on an open track). */
export function segmentAt(track: Pick<Track, 'pos' | 's' | 'length' | 'closed'>, s: number): [number, number, number] {
  const n = track.pos.length;
  const L = track.length;
  if (track.closed === false) {
    const ss = Math.min(L, Math.max(0, s));
    const i = Math.min(n - 2, Math.floor((ss / L) * (n - 1)));
    const span = track.s[i + 1] - track.s[i];
    return [i, i + 1, span > 0 ? Math.min(1, Math.max(0, (ss - track.s[i]) / span)) : 0];
  }
  const ss = ((s % L) + L) % L;
  const i = Math.min(n - 1, Math.floor((ss / L) * n));
  const j = (i + 1) % n;
  const span = (j === 0 ? L : track.s[j]) - track.s[i];
  return [i, j, span > 0 ? (ss - track.s[i]) / span : 0];
}

const WORLD_UP = new Vector3(0, 1, 0);
const _a = new Vector3();
const _b = new Vector3();

/** Rotate `v` about unit `axis` by `angle` (Rodrigues). */
export function rotateAbout(v: Vector3, axis: Vector3, angle: number): Vector3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  _a.crossVectors(axis, v);
  const d = axis.dot(v) * (1 - c);
  return v.multiplyScalar(c).addScaledVector(_a, s).addScaledVector(axis, d);
}

/**
 * Carry the across-track vector `r` at sample `i` to sample `j` without twisting it
 * (one double-reflection step, Wang et al. 2008). Returns a new vector.
 */
export function transportFrame(pos: Vector3[], tan: Vector3[], r: Vector3, i: number, j: number): Vector3 {
  const v1 = _a.subVectors(pos[j], pos[i]);
  const c1 = v1.dot(v1);
  if (c1 < 1e-12) return r.clone();
  const rL = r.clone().addScaledVector(v1, (-2 / c1) * v1.dot(r));
  const tL = tan[i].clone().addScaledVector(v1, (-2 / c1) * v1.dot(tan[i]));
  const v2 = _b.subVectors(tan[j], tL);
  const c2 = v2.dot(v2);
  return c2 < 1e-12 ? rL : rL.addScaledVector(v2, (-2 / c2) * v2.dot(rL));
}

/**
 * Rotation-minimising frames along a closed polyline (double reflection, Wang et al. 2008),
 * with the closure mismatch spread evenly so the frame is continuous across the seam.
 */
export function parallelTransport(pos: Vector3[], tan: Vector3[], closed = true): Vector3[] {
  const n = pos.length;
  const up: Vector3[] = new Array(n);
  // start with world up projected onto the plane across the track
  up[0] = WORLD_UP.clone().addScaledVector(tan[0], -WORLD_UP.dot(tan[0]));
  if (up[0].lengthSq() < 1e-6) up[0].set(1, 0, 0).addScaledVector(tan[0], -tan[0].x);
  up[0].normalize();

  const transport = (r: Vector3, i: number, j: number) => transportFrame(pos, tan, r, i, j);
  for (let i = 1; i < n; i++) up[i] = transport(up[i - 1], i - 1, i).normalize();
  if (!closed) return up;

  // closure: angle between where up[0] would be after going round, and up[0] itself
  const back = transport(up[n - 1], n - 1, 0).normalize();
  const right0 = new Vector3().crossVectors(tan[0], up[0]);
  const mismatch = Math.atan2(back.dot(right0), back.dot(up[0]));
  for (let i = 1; i < n; i++) rotateAbout(up[i], tan[i], (-mismatch * i) / n).normalize();
  return up;
}

/** Closest distance between two samples that are far apart along the track (self-intersection test). */
export function minSeparation(pos: Vector3[], s: number[], length: number, minArc: number): number {
  let best = Infinity;
  const n = pos.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const arc = Math.min(s[j] - s[i], length - (s[j] - s[i]));
      if (arc < minArc) continue;
      const d = pos[i].distanceToSquared(pos[j]);
      if (d < best) best = d;
    }
  }
  return Math.sqrt(best);
}

/** Smallest radius of curvature along the centreline, m. */
export function minCurvatureRadius(tan: Vector3[], s: number[], length: number): number {
  let best = Infinity;
  const n = tan.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const ds = j === 0 ? length - s[i] : s[j] - s[i];
    const angle = tan[i].angleTo(tan[j]);
    if (angle > 1e-9) best = Math.min(best, ds / angle);
  }
  return best;
}

const smoothstep = (f: number) => f * f * (3 - 2 * f);

/**
 * Sample a centripetal Catmull-Rom spline through `ctrl` every `spacing` m by arc length, with
 * rotation-minimising frames and roll: whole turns of `twist` over the track plus each control
 * point's roll, eased between points (and the tube radius the same way, when `radii` is given).
 * A closed loop's frame is spread so it meets itself; an open track starts upright and runs free.
 */
export function sampleTrack(ctrl: Vector3[], rolls: number[], o: SampleOptions): Omit<Track, 'attempts'> {
  const n = ctrl.length;
  const closed = o.closed;
  const curve = new CatmullRomCurve3(ctrl, closed, 'centripetal');
  curve.arcLengthDivisions = 4000; // the default (200) is too coarse for even spacing on a long track
  const length = curve.getLength();
  const count = Math.max(16, Math.round(length / Math.max(o.spacing, 0.5)));
  const samples = closed ? count : count + 1;
  const pos: Vector3[] = [];
  const tan: Vector3[] = [];
  const s: number[] = [];
  for (let i = 0; i < samples; i++) {
    const u = i / count;
    pos.push(curve.getPointAt(u));
    tan.push(curve.getTangentAt(u).normalize());
    s.push(u * length);
  }
  const up = parallelTransport(pos, tan, closed);
  // which control points sample i lies between, and how far: closed tracks wrap, open ones stop at the last
  const segs = closed ? n : n - 1;
  const between = (u: number): [number, number, number] => {
    const k = u * segs;
    const i0 = closed ? Math.floor(k) % n : Math.min(n - 2, Math.floor(k));
    return [i0, (i0 + 1) % n, smoothstep(Math.min(1, k - Math.floor(closed ? k : i0)))];
  };
  const turns = closed ? Math.round(o.twist) : o.twist;
  const right: Vector3[] = [];
  const radii = o.radii && o.radii.length === n && o.radii.some((r) => r !== o.radius) ? o.radii : undefined;
  const rad: number[] | undefined = radii ? [] : undefined;
  for (let i = 0; i < samples; i++) {
    const u = i / count;
    const [i0, i1, f] = between(u);
    const roll = turns * Math.PI * 2 * u + rolls[i0] + (rolls[i1] - rolls[i0]) * f;
    rotateAbout(up[i], tan[i], roll).normalize();
    right.push(new Vector3().crossVectors(tan[i], up[i]).normalize());
    if (rad && radii) rad.push(radii[i0] + (radii[i1] - radii[i0]) * f);
  }
  const cps = Math.max(1, Math.round(o.checkpoints));
  // an open track races from the start line (after the run-up) to the finish gate (before the run-off)
  const lines = closed ? { start: 0, finish: length } : openLines(length);
  const track: Omit<Track, 'attempts'> = {
    pos,
    tan,
    up,
    right,
    s,
    length,
    radius: o.radius,
    checkpoints: Array.from({ length: cps }, (_, k) => lines.start + (k * (lines.finish - lines.start)) / cps),
    source: { points: ctrl.map((v) => v.clone()), rolls: [...rolls], twist: turns, spacing: o.spacing, checkpoints: cps, ...(radii ? { radii: [...radii] } : {}) },
  };
  if (!closed) Object.assign(track, { closed: false }, lines);
  if (rad) track.rad = rad;
  return track;
}

const MAX_ATTEMPTS = 24;

/** Deterministic closed race track from a seed. Retries (and calms the layout) until it is flyable. */
export function generateTrack(p: RaceGenParams): Track {
  const rand = rng(p.seed);
  let wobble = p.wobble;
  let height = p.height;
  let last: Track | undefined;
  const shape = p.shape ?? 'loop';
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const n = Math.max(MIN_POINTS[shape] ?? 4, Math.round(p.points));
    const ctrl: Vector3[] = [];
    const rolls: number[] = [];
    for (let i = 0; i < n; i++) {
      if (shape === 'loop') {
        const a = ((i + (rand() - 0.5) * 0.6) / n) * Math.PI * 2;
        const r = p.radius * (1 + wobble * (rand() * 2 - 1));
        ctrl.push(new Vector3(Math.cos(a) * r, height * (rand() * 2 - 1), Math.sin(a) * r));
      } else {
        // the shape's own curve with gentler noise on top (its crossings must stay apart)
        const a = ((i + (rand() - 0.5) * 0.3) / n) * Math.PI * 2;
        const sep = Math.max(height, p.tubeRadius * 6);
        const v = shapePoint(shape, a, p.radius, sep);
        // stunts are tight next to the ring: noise would kink them (its seed still varies the banking)
        const calm = shape === 'stunt' ? 0 : 1;
        const k = wobble * p.radius * 0.12 * calm;
        v.x += k * (rand() * 2 - 1);
        v.z += k * (rand() * 2 - 1);
        v.y += height * 0.3 * calm * (rand() * 2 - 1);
        ctrl.push(v);
      }
      rolls.push((rand() * 2 - 1) * p.twistNoise);
    }
    last = { ...sampleTrack(ctrl, rolls, { closed: true, spacing: p.spacing, radius: p.tubeRadius, checkpoints: p.checkpoints, twist: p.twist }), attempts: attempt };
    const { pos, s, length, tan } = last;
    const clear = minSeparation(pos, s, length, p.tubeRadius * 4) > p.tubeRadius * 2.4;
    const bendable = minCurvatureRadius(tan, s, length) > p.tubeRadius * 1.2;
    if (clear && bendable) return last;
    wobble *= 0.8;
    height *= 0.8;
  }
  return last!;
}

export interface Nearest {
  /** segment start sample */
  index: number;
  /** position along the segment, 0..1 */
  t: number;
  /** arc length of the closest centreline point */
  s: number;
  /** closest centreline point */
  point: Vector3;
  /** distance from the centreline */
  dist: number;
}

const _seg = new Vector3();
const _rel = new Vector3();

function projectOnSegment(track: Track, i: number, p: Vector3, out: Nearest): void {
  const n = track.pos.length;
  const a = track.pos[i];
  const b = track.pos[(i + 1) % n];
  _seg.subVectors(b, a);
  const len2 = _seg.lengthSq();
  const t = len2 > 0 ? Math.min(1, Math.max(0, _rel.subVectors(p, a).dot(_seg) / len2)) : 0;
  const point = _rel.copy(a).addScaledVector(_seg, t);
  const dist = point.distanceTo(p);
  if (dist < out.dist) {
    out.index = i;
    out.t = t;
    out.dist = dist;
    out.point.copy(point);
    const segLen = Math.sqrt(len2);
    out.s = (track.s[i] + t * segLen) % track.length;
  }
}

/**
 * Closest centreline point to `p`. With a `hint` (last frame's index) only a window around it is
 * searched, which is fast and can't snap to a different part of the track that passes nearby.
 */
export function nearestOnTrack(track: Track, p: Vector3, hint = -1, window = 24, out?: Nearest): Nearest {
  const res = out ?? { index: 0, t: 0, s: 0, point: new Vector3(), dist: Infinity };
  res.dist = Infinity;
  const n = track.pos.length;
  // an open track has no segment from its last sample back to its first
  const open = track.closed === false;
  if (hint < 0) for (let i = 0; i < (open ? n - 1 : n); i++) projectOnSegment(track, i, p, res);
  else
    for (let k = -window; k <= window; k++) {
      const i = hint + k;
      if (open && (i < 0 || i > n - 2)) continue;
      projectOnSegment(track, ((i % n) + n) % n, p, res);
    }
  return res;
}
