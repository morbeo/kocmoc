import { CatmullRomCurve3, Quaternion, Vector3 } from 'three';
import { anchorS, parseTrackDoc, sAnchor, type Anchor, type TrackDoc } from './trackDoc';
import { nearestOnTrack, sampleTrack, segmentAt, type Nearest, type Track } from './track';

/**
 * Editing a track file (M8d): pure operations on a `TrackDoc` that return a new, canonical doc (or
 * undefined when the edit is not allowed), and an undo stack of doc texts. Moving a point keeps
 * anchors (`[segment, t]`) as they are, so placed things ride along with their segment; inserting
 * and deleting points re-anchors them to where they were on the centreline.
 */

export type Vec3 = [number, number, number];

/** Fewest control points a track can have. */
export const minPoints = (closed: boolean) => (closed ? 4 : 2);
/** Tube radius range a point may have, m (what `parseTrackDoc` accepts). */
export const RADIUS = { min: 3, max: 1000 } as const;

const segments = (doc: TrackDoc) => (doc.closed ? doc.points.length : doc.points.length - 1);
const clone = (doc: TrackDoc): TrackDoc => JSON.parse(JSON.stringify(doc)) as TrackDoc;
/** Round-trip through the parser: rounded, validated, items that no longer fit dropped. */
const canon = (doc: TrackDoc): TrackDoc | undefined => parseTrackDoc(JSON.parse(JSON.stringify(doc)));

/** The spline through a doc's control points, as `sampleTrack` builds it. */
export function docCurve(doc: TrackDoc): CatmullRomCurve3 {
  return new CatmullRomCurve3(
    doc.points.map((q) => new Vector3(...q.p)),
    doc.closed,
    'centripetal',
  );
}

/** Just the centreline of a doc (no branches, sections or items): quick enough to redo while dragging. */
export const compileBase = (doc: TrackDoc): Track => ({
  ...sampleTrack(
    doc.points.map((q) => new Vector3(...q.p)),
    doc.points.map((q) => q.roll ?? 0),
    { closed: doc.closed, spacing: doc.spacing, radius: doc.radius, checkpoints: doc.checkpoints, twist: doc.twist, radii: doc.points.map((q) => q.r ?? doc.radius) },
  ),
  attempts: 0,
});

/**
 * After points were added or removed, move every anchor of `next` (still holding `prev`'s anchors)
 * to the place on the new centreline nearest where it was on the old one. Away from the edit the two
 * curves are the same, so this is exact there; a part of a track that passes within a few radii of
 * itself already fails the checks.
 */
function reanchor(prev: TrackDoc, next: TrackDoc): void {
  const a = compileBase(prev);
  const b = compileBase(next);
  const na = prev.points.length;
  const nb = next.points.length;
  const near: Nearest = { index: 0, t: 0, s: 0, point: new Vector3(), dist: Infinity };
  const p = new Vector3();
  const to = (x: Anchor): Anchor => {
    const s = anchorS(x, na, a.length, prev.closed);
    const [i, j, f] = segmentAt(a, s);
    p.lerpVectors(a.pos[i], a.pos[j], f);
    nearestOnTrack(b, p, -1, 0, near);
    // the very end of an open track (nearest reports s = 0 past the last sample)
    const ns = prev.closed || s < a.length - 1e-6 ? near.s : b.length;
    return sAnchor(ns, nb, b.length, next.closed);
  };
  for (const x of next.branches ?? []) [x.from, x.to] = [to(x.from), to(x.to)];
  for (const x of next.sections ?? []) [x.from, x.to] = [to(x.from), to(x.to)];
  for (const x of next.hazards ?? []) x.at = to(x.at);
  for (const x of next.pads ?? []) [x.from, x.to] = [to(x.from), to(x.to)];
}

/** Set some points' positions. */
export function movePoints(doc: TrackDoc, moves: ReadonlyMap<number, Vec3>): TrackDoc | undefined {
  const out = clone(doc);
  for (const [i, p] of moves) {
    if (!out.points[i]) return undefined;
    out.points[i].p = [...p];
  }
  return canon(out);
}

/** Shift some points by `delta`. */
export function nudgePoints(doc: TrackDoc, idx: readonly number[], delta: Vec3): TrackDoc | undefined {
  const moves = new Map<number, Vec3>();
  for (const i of idx) {
    const q = doc.points[i];
    if (!q) return undefined;
    moves.set(i, [q.p[0] + delta[0], q.p[1] + delta[1], q.p[2] + delta[2]]);
  }
  return movePoints(doc, moves);
}

/**
 * Add a control point on segment `seg`, `t` (0..1, spline parameter) of the way along it, with roll
 * and radius eased from its neighbours. Returns the doc and the new point's index.
 */
export function insertPoint(doc: TrackDoc, seg: number, t = 0.5): { doc: TrackDoc; index: number } | undefined {
  const n = doc.points.length;
  const segs = segments(doc);
  if (seg < 0 || seg >= segs || n >= 2000) return undefined;
  const f = Math.min(0.95, Math.max(0.05, t));
  const p = docCurve(doc).getPoint((seg + f) / segs);
  const a = doc.points[seg];
  const b = doc.points[(seg + 1) % n];
  const lerp = (x: number, y: number) => x + (y - x) * f;
  const out = clone(doc);
  const pt: TrackDoc['points'][number] = { p: [p.x, p.y, p.z], roll: lerp(a.roll ?? 0, b.roll ?? 0) };
  const ra = a.r ?? doc.radius;
  const rb = b.r ?? doc.radius;
  if (ra !== doc.radius || rb !== doc.radius) pt.r = lerp(ra, rb);
  out.points.splice(seg + 1, 0, pt);
  reanchor(doc, out);
  const res = canon(out);
  return res && { doc: res, index: seg + 1 };
}

/** Remove control points (refused if fewer than `minPoints` would be left). */
export function deletePoints(doc: TrackDoc, idx: readonly number[]): TrackDoc | undefined {
  const list = [...new Set(idx)].filter((i) => i >= 0 && i < doc.points.length).sort((a, b) => b - a);
  if (!list.length || doc.points.length - list.length < minPoints(doc.closed)) return undefined;
  const out = clone(doc);
  for (const k of list) out.points.splice(k, 1);
  reanchor(doc, out);
  return canon(out);
}

/** Add `delta` radians of roll at some points. */
export function rollPoints(doc: TrackDoc, idx: readonly number[], delta: number): TrackDoc | undefined {
  const out = clone(doc);
  for (const i of idx) {
    const q = out.points[i];
    if (!q) return undefined;
    q.roll = (q.roll ?? 0) + delta;
  }
  return canon(out);
}

/** Change some points' tube radius by `delta` m (or set it, with `set`), within `RADIUS`. */
export function radiusPoints(doc: TrackDoc, idx: readonly number[], delta: number, set = false): TrackDoc | undefined {
  const out = clone(doc);
  for (const i of idx) {
    const q = out.points[i];
    if (!q) return undefined;
    q.r = Math.min(RADIUS.max, Math.max(RADIUS.min, (set ? 0 : (q.r ?? doc.radius)) + delta));
  }
  return canon(out);
}

/**
 * Pull some points half way towards the midpoint of their neighbours (positions, roll and radius),
 * which evens out kinks. The ends of an open track stay put.
 */
export function smoothPoints(doc: TrackDoc, idx: readonly number[], amount = 0.5): TrackDoc | undefined {
  const n = doc.points.length;
  const out = clone(doc);
  for (const i of idx) {
    if (!doc.closed && (i === 0 || i === n - 1)) continue;
    const q = doc.points[i];
    if (!q) return undefined;
    const a = doc.points[(i - 1 + n) % n];
    const b = doc.points[(i + 1) % n];
    const mid = (x: number, y: number, z: number) => z + amount * ((x + y) / 2 - z);
    out.points[i].p = [0, 1, 2].map((k) => mid(a.p[k], b.p[k], q.p[k])) as Vec3;
    const roll = mid(a.roll ?? 0, b.roll ?? 0, q.roll ?? 0);
    if (roll) out.points[i].roll = roll;
    else delete out.points[i].roll;
    const r = mid(a.r ?? doc.radius, b.r ?? doc.radius, q.r ?? doc.radius);
    out.points[i].r = r;
  }
  return canon(out);
}

/** Sample index of the track nearest control point `k` in the anchor parameter (where its roll and radius apply). */
export function pointSample(track: Pick<Track, 'pos' | 'closed'>, k: number, n: number): number {
  const closed = track.closed !== false;
  const count = closed ? track.pos.length : track.pos.length - 1;
  const segs = closed ? n : n - 1;
  return Math.min(track.pos.length - 1, Math.round((k / segs) * count)) % track.pos.length;
}

/**
 * Where a sample of the track lies on the control polygon, as a spline segment and `t`: for
 * inserting a point at a clicked place on the centreline.
 */
export function sampleSegment(doc: TrackDoc, track: Pick<Track, 's' | 'length'>, i: number): [number, number] {
  const segs = segments(doc);
  const u = Math.min(1, Math.max(0, track.s[i] / track.length));
  const x = docCurve(doc).getUtoTmapping(u, 0) * segs;
  const k = Math.min(segs - 1, Math.floor(x));
  return [k, x - k];
}

/** Undo stack of doc texts. Edits with the same `key` within `merge` ms join into one step (holding a roll key). */
export class EditHistory {
  private done: string[] = [];
  private undone: string[] = [];
  private lastKey = '';
  private lastTime = -Infinity;

  constructor(
    public current: string,
    private limit = 200,
    private merge = 600,
  ) {}

  /** Record that the doc became `text`. */
  push(text: string, key = '', now = Date.now()): void {
    if (text === this.current) return;
    const join = key !== '' && key === this.lastKey && now - this.lastTime < this.merge;
    if (!join) {
      this.done.push(this.current);
      if (this.done.length > this.limit) this.done.shift();
    }
    this.current = text;
    this.undone = [];
    this.lastKey = key;
    this.lastTime = now;
  }

  /** Step back; returns the text to show, or undefined at the start. */
  undo(): string | undefined {
    const t = this.done.pop();
    if (t === undefined) return undefined;
    this.undone.push(this.current);
    this.current = t;
    this.lastKey = '';
    return t;
  }

  redo(): string | undefined {
    const t = this.undone.pop();
    if (t === undefined) return undefined;
    this.done.push(this.current);
    this.current = t;
    this.lastKey = '';
    return t;
  }

  get canUndo(): boolean {
    return this.done.length > 0;
  }
  get canRedo(): boolean {
    return this.undone.length > 0;
  }
}

// --- fly cam -----------------------------------------------------------------

/** Axes in -1..1 (the flight controls) driving the editor's fly cam. */
export interface FlyAxes {
  thrust: number;
  strafe: number;
  lift: number;
  pitch: number;
  yaw: number;
  roll: number;
  boost: boolean;
}

export interface FlyParams {
  /** m/s at full stick */
  speed: number;
  /** speed multiplier while boosting */
  boost: number;
  /** pitch, yaw, roll at full stick, rad/s */
  turn: [number, number, number];
}

const _q = new Quaternion();
const _v = new Vector3();
const _axis = new Vector3();
/**
 * Move a camera pose like a ship without physics: translate along its own axes at `speed`, turn at
 * `turn` rates about its own axes. `pos` and `quat` change in place.
 */
export function flyStep(pos: Vector3, quat: Quaternion, a: FlyAxes, p: FlyParams, dt: number): void {
  const v = p.speed * (a.boost ? p.boost : 1) * dt;
  // the camera looks down -z
  pos.add(_v.set(a.strafe * v, a.lift * v, -a.thrust * v).applyQuaternion(quat));
  // pitch up about +x, yaw right about -y, roll right about -z
  _axis.set(a.pitch * p.turn[0], -a.yaw * p.turn[1], -a.roll * p.turn[2]);
  const rate = _axis.length();
  if (rate < 1e-9) return;
  quat.multiply(_q.setFromAxisAngle(_axis.divideScalar(rate), rate * dt)).normalize();
}

// --- view turns ------------------------------------------------------------------

export type TurnAxis = 'yaw' | 'pitch' | 'roll';

const _turn = new Quaternion();
const _axisW = new Vector3();
const _off = new Vector3();
/**
 * Turn a camera by `angle` radians about one of its own axes, through `pivot` (the point it orbits,
 * or its own position): yaw about its up (positive turns the view right), pitch about its right
 * (positive looks up), roll about its line of sight (positive rolls right). `pos` and `quat` change
 * in place; the camera keeps looking at the pivot if it was.
 */
export function turnView(pos: Vector3, quat: Quaternion, pivot: Vector3, axis: TurnAxis, angle: number): void {
  if (axis === 'yaw') _axisW.set(0, -1, 0);
  else if (axis === 'pitch') _axisW.set(1, 0, 0);
  else _axisW.set(0, 0, -1);
  _axisW.applyQuaternion(quat);
  _turn.setFromAxisAngle(_axisW, angle);
  _off.subVectors(pos, pivot).applyQuaternion(_turn);
  pos.copy(pivot).add(_off);
  quat.premultiply(_turn).normalize();
}
