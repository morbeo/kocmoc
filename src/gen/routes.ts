import { Vector3 } from 'three';
import { rng } from '../core/rng';
import { nearestOnTrack, rotateAbout, transportFrame, type Nearest, type Track } from './track';

/**
 * Route graph: branches that leave the main loop and rejoin it further on. The main loop stays the
 * track everything measures against; a point on a branch maps back to main-track `s` by fraction.
 */
export const ROUTE_KINDS = ['shortcut', 'long', 'split', 'hidden', 'pit'] as const;
export type RouteKind = (typeof ROUTE_KINDS)[number];

export interface Branch {
  kind: RouteKind;
  /** main-track arc length where the branch leaves and rejoins the loop (s0 < s1; never across the start line) */
  s0: number;
  s1: number;
  /** samples along the branch, from the fork to the merge */
  pos: Vector3[];
  tan: Vector3[];
  up: Vector3[];
  right: Vector3[];
  /** arc length along the branch at each sample, m */
  s: number[];
  length: number;
  /** tube radius at each sample: the main radius at both mouths, the branch's own in the middle */
  rad: number[];
  /** the branch's own tube radius, m */
  radius: number;
  /** branch arc length where its tube is first clear of the main tube, and last */
  open0: number;
  open1: number;
  /** share of the main line's time saved over [s0, s1] (negative = slower), as judged or estimated */
  save: number;
}

export interface RouteParams {
  seed: number;
  /** forks to try to place (shortcut, long way, split, hidden in turn) */
  forks: number;
  /** a slow lane just before the start line that refills boost */
  pitLane: boolean;
  /** a shortcut must save at least this share of the main line's time over its section... */
  saveMin: number;
  /** ...and at most this */
  saveMax: number;
  /** the long way may cost at most this share more */
  costMax: number;
}

export const defaultRoutes: RouteParams = { seed: 1, forks: 3, pitLane: true, saveMin: 0.03, saveMax: 0.2, costMax: 0.3 };

/** Order forks are tried in; a seed picks where in the cycle to start. */
const CYCLE: RouteKind[] = ['shortcut', 'long', 'split', 'hidden', 'shortcut', 'long'];
/** Branch tube radius as a share of the main tube's. */
const RADIUS: Record<RouteKind, number> = { shortcut: 0.75, long: 1.1, split: 0.8, hidden: 0.6, pit: 0.8 };
/** Cruise speed the time estimate assumes (the autopilot's), m/s. */
const EST_SPEED = 110;

const smooth = (x: number) => {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
};
/** 0 at both ends, 1 in the middle, smooth (zero slope) at the ends. */
const bulge = (u: number) => Math.sin(Math.PI * u) ** 2;
/** 0 at both ends, ramps over `e` of the length to a flat 1. */
const plateau = (u: number, e: number) => smooth(u / e) * smooth((1 - u) / e);

const wrapS = (s: number, L: number) => ((s % L) + L) % L;
const sampleIndex = (t: Track, s: number) => Math.min(t.pos.length - 1, Math.floor((wrapS(s, t.length) / t.length) * t.pos.length));

/** Main-track position at arc length `s` (interpolated). */
function mainPoint(t: Track, s: number, out: Vector3): Vector3 {
  const n = t.pos.length;
  const i = sampleIndex(t, s);
  const j = (i + 1) % n;
  const span = (j === 0 ? t.length : t.s[j]) - t.s[i];
  const f = span > 0 ? (wrapS(s, t.length) - t.s[i]) / span : 0;
  return out.lerpVectors(t.pos[i], t.pos[j], f);
}

/** Resample a dense polyline evenly by arc length. */
function resample(fine: Vector3[], spacing: number): { pos: Vector3[]; s: number[]; length: number } {
  const cum = [0];
  for (let i = 1; i < fine.length; i++) cum.push(cum[i - 1] + fine[i].distanceTo(fine[i - 1]));
  const length = cum[cum.length - 1];
  const count = Math.max(4, Math.round(length / spacing));
  const pos: Vector3[] = [];
  const s: number[] = [];
  let k = 0;
  for (let i = 0; i <= count; i++) {
    const d = (i / count) * length;
    while (k < fine.length - 2 && cum[k + 1] < d) k++;
    const seg = cum[k + 1] - cum[k];
    const f = seg > 0 ? (d - cum[k]) / seg : 0;
    pos.push(new Vector3().lerpVectors(fine[k], fine[k + 1], Math.min(1, Math.max(0, f))));
    s.push(d);
  }
  return { pos, s, length };
}

/** Dense centreline of a branch of `kind` over main [s0, s0 + span]. */
function shape(kind: RouteKind, t: Track, s0: number, span: number, rand: () => number): Vector3[] {
  const R = t.radius;
  const steps = Math.max(16, Math.ceil(span / 2));
  const theta = kind === 'pit' ? (rand() < 0.5 ? 0 : Math.PI) : rand() * Math.PI * 2;
  const rb = R * RADIUS[kind];
  const amp =
    kind === 'long' ? R * (3.5 + 1.5 * rand()) : kind === 'split' ? (R + rb) * 1.2 : kind === 'pit' ? R * 2.3 : R * 1.5 * rand();
  const P0 = mainPoint(t, s0, new Vector3());
  const P1 = mainPoint(t, s0 + span, new Vector3());
  const T0 = t.tan[sampleIndex(t, s0)];
  const T1 = t.tan[sampleIndex(t, s0 + span)];
  const chord = P0.distanceTo(P1);
  const out: Vector3[] = [];
  const m = new Vector3();
  for (let k = 0; k <= steps; k++) {
    const u = k / steps;
    const i = sampleIndex(t, s0 + u * span);
    const dir = m.copy(t.right[i]).multiplyScalar(Math.cos(theta)).addScaledVector(t.up[i], Math.sin(theta));
    const p = new Vector3();
    if (kind === 'shortcut' || kind === 'hidden') {
      // cut the corner: a Hermite curve from fork to merge that leaves and arrives along the track
      const u2 = u * u;
      const u3 = u2 * u;
      p.copy(P0)
        .multiplyScalar(2 * u3 - 3 * u2 + 1)
        .addScaledVector(T0, (u3 - 2 * u2 + u) * chord)
        .addScaledVector(P1, -2 * u3 + 3 * u2)
        .addScaledVector(T1, (u3 - u2) * chord)
        .addScaledVector(dir, bulge(u) * amp);
    } else {
      const w = kind === 'long' ? bulge(u) : plateau(u, kind === 'pit' ? 0.3 : 0.4);
      mainPoint(t, s0 + u * span, p).addScaledVector(dir, w * amp);
    }
    out.push(p);
  }
  return out;
}

/** Sampled branch with frames that start and end matching the main track's. */
function buildBranch(kind: RouteKind, t: Track, s0: number, span: number, rand: () => number): Branch {
  const spacing = t.length / t.pos.length;
  const { pos, s, length } = resample(shape(kind, t, s0, span, rand), spacing);
  const n = pos.length;
  const i0 = sampleIndex(t, s0);
  const i1 = sampleIndex(t, s0 + span);
  const tan = pos.map((_, k) => {
    if (k === 0) return t.tan[i0].clone();
    if (k === n - 1) return t.tan[i1].clone();
    return new Vector3().subVectors(pos[k + 1], pos[k - 1]).normalize();
  });
  // carry the start frame along without twisting, then spread the roll needed to meet the main frame at the merge
  const up: Vector3[] = [t.up[i0].clone().addScaledVector(tan[0], -t.up[i0].dot(tan[0])).normalize()];
  for (let k = 1; k < n; k++) up.push(transportFrame(pos, tan, up[k - 1], k - 1, k).normalize());
  const want = t.up[i1].clone().addScaledVector(tan[n - 1], -t.up[i1].dot(tan[n - 1])).normalize();
  const side = new Vector3().crossVectors(tan[n - 1], up[n - 1]);
  const mismatch = Math.atan2(want.dot(side), want.dot(up[n - 1]));
  for (let k = 1; k < n; k++) rotateAbout(up[k], tan[k], (mismatch * k) / (n - 1)).normalize();
  const right = tan.map((f, k) => new Vector3().crossVectors(f, up[k]).normalize());
  const R = t.radius;
  const radius = R * RADIUS[kind];
  const rad = s.map((d) => R + (radius - R) * plateau(d / length, 0.25));
  return { kind, s0, s1: s0 + span, pos, tan, up, right, s, length, rad, radius, open0: 0, open1: length, save: 0 };
}

/** Smallest radius of curvature along an open polyline. */
function minBend(b: Branch): number {
  let best = Infinity;
  for (let k = 0; k + 1 < b.pos.length; k++) {
    const a = b.tan[k].angleTo(b.tan[k + 1]);
    if (a > 1e-9) best = Math.min(best, (b.s[k + 1] - b.s[k]) / a);
  }
  return best;
}

/**
 * Time to fly a path at the autopilot's cruise speed, slowing for bends the way it does (by the
 * angle to the tangent ~80 m ahead). `tanAt(d)` gives the tangent `d` metres in, past the end too.
 */
function estimateTime(length: number, tanAt: (d: number, out: Vector3) => Vector3): number {
  const a = new Vector3();
  const b = new Vector3();
  let time = 0;
  const step = 4;
  for (let d = 0; d < length; d += step) {
    const bend = tanAt(d, a).angleTo(tanAt(d + 82, b));
    time += Math.min(step, length - d) / (EST_SPEED * Math.max(0.4, 1 - bend * 0.8));
  }
  return time;
}

function mainTan(t: Track, s: number, out: Vector3): Vector3 {
  return out.copy(t.tan[sampleIndex(t, s)]);
}

function branchTan(t: Track, b: Branch, d: number, out: Vector3): Vector3 {
  if (d >= b.length) return mainTan(t, b.s1 + (d - b.length), out);
  const k = Math.min(b.pos.length - 1, Math.round((d / b.length) * (b.pos.length - 1)));
  return out.copy(b.tan[k]);
}

/** Estimated share of time a branch saves over the main line between its fork and merge. */
export function estimateSave(t: Track, b: Branch): number {
  const main = estimateTime(b.s1 - b.s0, (d, o) => mainTan(t, b.s0 + d, o));
  const alt = estimateTime(b.length, (d, o) => branchTan(t, b, d, o));
  return 1 - alt / main;
}

/**
 * Check a candidate against the main loop and the branches already placed: once its tube is clear
 * of the main tube it stays clear until the merge, it keeps away from other parts of the loop and
 * from other branches, and it bends gently enough to fly. Sets `open0`/`open1`.
 */
function fits(t: Track, b: Branch, others: Branch[]): boolean {
  const R = t.radius;
  if (minBend(b) < t.radius * 3) return false;
  const margin = R * 4;
  const n = b.pos.length;
  const clearAt: boolean[] = [];
  for (let k = 0; k < n; k++) {
    const p = b.pos[k];
    const rb = b.rad[k];
    let near = Infinity;
    let far = Infinity;
    for (let i = 0; i < t.pos.length; i++) {
      const d = t.pos[i].distanceToSquared(p);
      if (t.s[i] >= b.s0 - margin && t.s[i] <= b.s1 + margin) near = Math.min(near, d);
      else far = Math.min(far, d);
    }
    if (Math.sqrt(far) < (R + rb) * 1.3) return false;
    clearAt.push(Math.sqrt(near) > (R + rb) * 1.06);
  }
  const a = clearAt.indexOf(true);
  const z = clearAt.lastIndexOf(true);
  if (a < 0) return false;
  for (let k = a; k <= z; k++) if (!clearAt[k]) return false;
  if (b.s[z] - b.s[a] < b.length * 0.3) return false;
  for (const o of others) {
    for (let k = 0; k < n; k += 2) {
      for (let j = 0; j < o.pos.length; j += 2) {
        if (o.pos[j].distanceTo(b.pos[k]) < (o.rad[j] + b.rad[k]) * 1.3) return false;
      }
    }
  }
  b.open0 = b.s[a];
  b.open1 = b.s[z];
  return true;
}

/** Whether a branch's time `save` (share of the main line's) is in its kind's band. */
export function inBand(kind: RouteKind, save: number, p: Pick<RouteParams, 'saveMin' | 'saveMax' | 'costMax'>): boolean {
  switch (kind) {
    case 'shortcut':
    case 'hidden':
      return save >= p.saveMin && save <= p.saveMax;
    case 'long':
      return -save >= 0.02 && -save <= p.costMax;
    case 'split':
      return Math.abs(save) <= 0.1;
    case 'pit':
      return true;
  }
}

/**
 * Measures a candidate branch on the track (with the branches placed so far): the share of the
 * main line's time it saves, flown for real, or null if it can't be flown clean. The sim's
 * autopilot provides one (`botJudge`); without it the generator trusts its estimate.
 */
export type RouteJudge = (track: Track, b: Branch) => number | null;

const TRIES = 40;

/**
 * The track with alternate routes added: a pit lane just before the start line (if asked for), then
 * up to `forks` forks, each kept only if it fits and its time (estimated, then flown by `judge`)
 * is in its band. Checkpoints
 * inside a fork are dropped, so they sit only where every route runs together.
 */
export function addRoutes(track: Track, p: RouteParams, judge?: RouteJudge): Track {
  const forks = Math.max(0, Math.round(p.forks));
  if (forks === 0 && !p.pitLane) return track;
  const rand = rng((p.seed * 7919 + 104729) >>> 0);
  const R = track.radius;
  const L = track.length;
  const branches: Branch[] = [];
  /** main-track intervals taken by forks (plus clearance) */
  const taken: [number, number][] = [];
  const free = (a: number, b: number) => a >= R * 6 && b <= L - R * 6 && taken.every(([x, y]) => b < x || a > y);
  const place = (kind: RouteKind, pick: () => [number, number]): boolean => {
    for (let k = 0; k < TRIES; k++) {
      const [s0, span] = pick();
      if (!free(s0 - R * 3, s0 + span + R * 3) && kind !== 'pit') continue;
      const b = buildBranch(kind, track, s0, span, rand);
      if (!fits(track, b, branches)) continue;
      b.save = estimateSave(track, b);
      // the estimate is a cheap first cut; a judge flies the fork for the final word
      if (!inBand(kind, b.save, judge ? { saveMin: p.saveMin * 0.5, saveMax: p.saveMax * 1.5, costMax: p.costMax * 1.5 } : p)) continue;
      if (judge) {
        const save = judge({ ...track, branches: [...branches, b] }, b);
        if (save === null || !inBand(kind, save, p)) continue;
        b.save = save;
      }
      branches.push(b);
      taken.push([s0 - R * 3, s0 + span + R * 3]);
      return true;
    }
    return false;
  };
  if (p.pitLane) {
    place('pit', () => {
      const span = R * (22 + 8 * rand());
      return [L - R * 5 - span, span];
    });
  }
  // start the cycle on a shortcut or a hidden route, so every track with forks has a way to cut a corner
  const start = rand() < 0.5 ? 0 : 3;
  for (let f = 0; f < forks; f++) {
    // this fork's kind, or the next ones in the cycle if it doesn't fit anywhere
    for (let c = 0; c < 3; c++) {
      const kind = CYCLE[(start + f + c) % CYCLE.length];
      const ok = place(kind, () => {
        const span =
          kind === 'shortcut' || kind === 'hidden' ? L * (0.07 + 0.13 * rand()) : kind === 'long' ? L * (0.08 + 0.06 * rand()) : R * (16 + 6 * rand());
        return [R * 6 + rand() * Math.max(0, L - R * 12 - span), span];
      });
      if (ok) break;
    }
  }
  if (!branches.length) return track;
  branches.sort((a, b) => a.s0 - b.s0);
  // a checkpoint inside a fork moves to the nearer end of it (dropped if that crowds another)
  const checkpoints: number[] = [];
  for (const [k, s] of track.checkpoints.entries()) {
    const b = branches.find((x) => s >= x.s0 - R * 2 && s <= x.s1 + R * 2);
    const at = k === 0 || !b ? s : s - (b.s0 - R * 2) < b.s1 + R * 2 - s ? b.s0 - R * 2 : b.s1 + R * 2;
    if (checkpoints.every((c) => Math.abs(c - at) > R * 4)) checkpoints.push(at);
  }
  checkpoints.sort((a, b) => a - b);
  return { ...track, branches, checkpoints };
}

// --- where the ship is -------------------------------------------------------

/** Main-track arc length for arc length `sb` along branch `b`. */
export const routeS = (b: Branch, sb: number): number => b.s0 + (Math.max(0, Math.min(b.length, sb)) / b.length) * (b.s1 - b.s0);

const newNearest = (): Nearest => ({ index: 0, t: 0, s: 0, point: new Vector3(), dist: Infinity });
const _seg = new Vector3();
const _rel = new Vector3();

/** Closest point to `p` on an open polyline (a branch); with a `hint`, only a window around it. */
export function nearestOnPath(b: Branch, p: Vector3, hint = -1, window = 16, out: Nearest = newNearest()): Nearest {
  out.dist = Infinity;
  const last = b.pos.length - 2;
  const from = hint < 0 ? 0 : Math.max(0, hint - window);
  const to = hint < 0 ? last : Math.min(last, hint + window);
  for (let i = from; i <= to; i++) {
    const a = b.pos[i];
    _seg.subVectors(b.pos[i + 1], a);
    const len2 = _seg.lengthSq();
    const f = len2 > 0 ? Math.min(1, Math.max(0, _rel.subVectors(p, a).dot(_seg) / len2)) : 0;
    const q = _rel.copy(a).addScaledVector(_seg, f);
    const d = q.distanceTo(p);
    if (d < out.dist) {
      out.dist = d;
      out.index = i;
      out.t = f;
      out.point.copy(q);
      out.s = b.s[i] + f * (b.s[i + 1] - b.s[i]);
    }
  }
  return out;
}

/** Tube radius on a branch at a nearest point. */
export const radAt = (b: Branch, n: Nearest) => b.rad[n.index] + (b.rad[Math.min(b.rad.length - 1, n.index + 1)] - b.rad[n.index]) * n.t;

export interface RouteState {
  /** branch the ship is flying, -1 = the main loop */
  route: number;
  /** nearest point on the main loop (kept even on a branch, as the search hint) */
  main: Nearest;
  /** nearest point on each branch that is close; `index` -1 = not tracked */
  branch: Nearest[];
  /** tube radius at the ship's corridor, m */
  radius: number;
  /** main-track progress last found */
  s: number;
}

export function newRouteState(track: Track, p: Vector3): RouteState {
  const main = nearestOnTrack(track, p);
  return { route: -1, main, branch: (track.branches ?? []).map(() => ({ ...newNearest(), index: -1 })), radius: track.radius, s: main.s };
}

/** Forget the branch (after the ship is put back on the main line). */
export function resetRoute(st: RouteState, track: Track, p: Vector3): void {
  st.route = -1;
  nearestOnTrack(track, p, -1, 24, st.main);
  for (const b of st.branch) b.index = -1;
  st.radius = track.radius;
  st.s = st.main.s;
}

/**
 * Find the corridor the ship is in and write its nearest centreline point to `out`, with `out.s`
 * as main-track progress (mapped back by fraction on a branch) and `out.index` a main-track sample.
 * The ship stays on its route while inside that tube; where tubes overlap, inside either counts,
 * so a fork mouth has no lip. Outside every tube, the nearest wall wins (that is the one it hits).
 * `margin` (the ship's radius) shrinks each tube, so the ship changes tube before it touches a wall.
 */
export function locate(track: Track, p: Vector3, st: RouteState, out: Nearest, margin = 0): void {
  const bs = track.branches ?? [];
  // on a branch the closest point of the loop can be far off; search where the branch maps to instead
  nearestOnTrack(track, p, st.route >= 0 ? sampleIndex(track, st.s) : st.main.index, 24, st.main);
  const R = track.radius;
  let pick = -1;
  let pickRadius = R;
  // current route first: stay on it while inside its tube
  const inside: number[] = [];
  const excess: number[] = [];
  const near = R * 4;
  for (let k = 0; k < bs.length; k++) {
    const b = bs[k];
    const n = st.branch[k];
    const close = k === st.route || (st.main.s >= b.s0 - near && st.main.s <= b.s1 + near);
    if (!close) {
      n.index = -1;
      continue;
    }
    nearestOnPath(b, p, n.index, 16, n);
    const r = radAt(b, n);
    excess[k] = n.dist - r;
    if (n.dist <= r - margin) inside.push(k);
  }
  const mainIn = st.main.dist <= R - margin;
  const curIn = st.route < 0 ? mainIn : inside.includes(st.route);
  if (curIn) pick = st.route;
  else if (mainIn || inside.length) {
    // the tube it is deepest inside
    let best = mainIn ? st.main.dist / R : Infinity;
    for (const k of inside) {
      const d = st.branch[k].dist / radAt(bs[k], st.branch[k]);
      if (d < best) {
        best = d;
        pick = k;
      }
    }
  } else {
    let best = st.main.dist - R;
    for (let k = 0; k < bs.length; k++) {
      if (excess[k] !== undefined && excess[k] < best) {
        best = excess[k];
        pick = k;
      }
    }
  }
  st.route = pick;
  if (pick < 0) {
    out.index = st.main.index;
    out.t = st.main.t;
    out.s = st.main.s;
    out.point.copy(st.main.point);
    out.dist = st.main.dist;
  } else {
    const b = bs[pick];
    const n = st.branch[pick];
    pickRadius = radAt(b, n);
    out.s = routeS(b, n.s);
    out.index = sampleIndex(track, out.s);
    out.t = 0;
    out.point.copy(n.point);
    out.dist = n.dist;
  }
  st.radius = pickRadius;
  st.s = out.s;
}

/**
 * World frame at main-track progress `s` along route `route` (-1 = main loop): the centreline point,
 * plus offsets `x`/`y` across it. On a branch, `s` maps to the branch by fraction.
 */
export function courseFrame(track: Track, s: number, route: number, x: number, y: number, pos: Vector3, tan?: Vector3, up?: Vector3): Vector3 {
  const b = route >= 0 ? track.branches?.[route] : undefined;
  if (b && s >= b.s0 && s <= b.s1) {
    const sb = ((s - b.s0) / (b.s1 - b.s0)) * b.length;
    const n = b.pos.length;
    const f = (sb / b.length) * (n - 1);
    const i = Math.min(n - 2, Math.floor(f));
    const w = f - i;
    pos.lerpVectors(b.pos[i], b.pos[i + 1], w).addScaledVector(b.right[i], x).addScaledVector(b.up[i], y);
    tan?.copy(b.tan[i]);
    up?.copy(b.up[i]);
    return pos;
  }
  const i = sampleIndex(track, s);
  mainPoint(track, s, pos).addScaledVector(track.right[i], x).addScaledVector(track.up[i], y);
  tan?.copy(track.tan[i]);
  up?.copy(track.up[i]);
  return pos;
}

/** Fork whose mouth is within `ahead` metres of `s` on the main loop (or that `s` is in), if any. */
export function forkAhead(track: Track, s: number, ahead: number): Branch | null {
  for (const b of track.branches ?? []) {
    const mouth = b.s0 + (b.open0 / b.length) * (b.s1 - b.s0);
    if (s <= mouth && b.s0 - s <= ahead) return b;
  }
  return null;
}
