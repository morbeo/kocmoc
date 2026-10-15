import { CatmullRomCurve3, Vector3 } from 'three';
import { rng } from '../core/rng';

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
}

const WORLD_UP = new Vector3(0, 1, 0);
const _a = new Vector3();
const _b = new Vector3();

/** Rotate `v` about unit `axis` by `angle` (Rodrigues). */
function rotateAbout(v: Vector3, axis: Vector3, angle: number): Vector3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  _a.crossVectors(axis, v);
  const d = axis.dot(v) * (1 - c);
  return v.multiplyScalar(c).addScaledVector(_a, s).addScaledVector(axis, d);
}

/**
 * Rotation-minimising frames along a closed polyline (double reflection, Wang et al. 2008),
 * with the closure mismatch spread evenly so the frame is continuous across the seam.
 */
export function parallelTransport(pos: Vector3[], tan: Vector3[]): Vector3[] {
  const n = pos.length;
  const up: Vector3[] = new Array(n);
  // start with world up projected onto the plane across the track
  up[0] = WORLD_UP.clone().addScaledVector(tan[0], -WORLD_UP.dot(tan[0]));
  if (up[0].lengthSq() < 1e-6) up[0].set(1, 0, 0).addScaledVector(tan[0], -tan[0].x);
  up[0].normalize();

  const transport = (r: Vector3, i: number, j: number) => {
    const v1 = _a.subVectors(pos[j], pos[i]);
    const c1 = v1.dot(v1);
    if (c1 < 1e-12) return r.clone();
    const rL = r.clone().addScaledVector(v1, (-2 / c1) * v1.dot(r));
    const tL = tan[i].clone().addScaledVector(v1, (-2 / c1) * v1.dot(tan[i]));
    const v2 = _b.subVectors(tan[j], tL);
    const c2 = v2.dot(v2);
    return c2 < 1e-12 ? rL : rL.addScaledVector(v2, (-2 / c2) * v2.dot(rL));
  };
  for (let i = 1; i < n; i++) up[i] = transport(up[i - 1], i - 1, i).normalize();

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

const MAX_ATTEMPTS = 24;

/** Deterministic closed race track from a seed. Retries (and calms the layout) until it is flyable. */
export function generateTrack(p: RaceGenParams): Track {
  const rand = rng(p.seed);
  let wobble = p.wobble;
  let height = p.height;
  let last: Track | undefined;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const n = Math.max(4, Math.round(p.points));
    const ctrl: Vector3[] = [];
    const rolls: number[] = [];
    for (let i = 0; i < n; i++) {
      const a = ((i + (rand() - 0.5) * 0.6) / n) * Math.PI * 2;
      const r = p.radius * (1 + wobble * (rand() * 2 - 1));
      ctrl.push(new Vector3(Math.cos(a) * r, height * (rand() * 2 - 1), Math.sin(a) * r));
      rolls.push((rand() * 2 - 1) * p.twistNoise);
    }
    const curve = new CatmullRomCurve3(ctrl, true, 'centripetal');
    curve.arcLengthDivisions = 4000; // the default (200) is too coarse for even spacing on a long loop
    const length = curve.getLength();
    const count = Math.max(16, Math.round(length / Math.max(p.spacing, 0.5)));
    const pos: Vector3[] = [];
    const tan: Vector3[] = [];
    const s: number[] = [];
    for (let i = 0; i < count; i++) {
      const u = i / count;
      pos.push(curve.getPointAt(u));
      tan.push(curve.getTangentAt(u).normalize());
      s.push(u * length);
    }
    const up = parallelTransport(pos, tan);
    // authored twist: whole turns over the lap, plus smooth per-control-point roll
    const right: Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const u = i / count;
      const k = u * n;
      const i0 = Math.floor(k) % n;
      const f = k - Math.floor(k);
      const smooth = f * f * (3 - 2 * f);
      const roll = Math.round(p.twist) * Math.PI * 2 * u + rolls[i0] + (rolls[(i0 + 1) % n] - rolls[i0]) * smooth;
      rotateAbout(up[i], tan[i], roll).normalize();
      right.push(new Vector3().crossVectors(tan[i], up[i]).normalize());
    }
    const cps = Math.max(1, Math.round(p.checkpoints));
    last = {
      pos,
      tan,
      up,
      right,
      s,
      length,
      radius: p.tubeRadius,
      checkpoints: Array.from({ length: cps }, (_, k) => (k * length) / cps),
      attempts: attempt,
    };
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
  if (hint < 0) for (let i = 0; i < n; i++) projectOnSegment(track, i, p, res);
  else for (let k = -window; k <= window; k++) projectOnSegment(track, (((hint + k) % n) + n) % n, p, res);
  return res;
}
