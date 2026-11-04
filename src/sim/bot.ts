import { Quaternion, Vector3 } from 'three';
import type { Controls, ShipState } from './ship';
import type { Nearest, Track } from '../gen/track';
import { openPoint, passable, pointOnTrack, sampleAt, type Gauntlet, type Plane } from '../gen/gauntlet';
import { arcDelta } from './gauntlet';
import type { ProvingCourse } from '../gen/proving';
import { courseFrame, type Branch } from '../gen/routes';

/** What the autopilot threads: gaps to fly through and clear lanes through debris. */
export type BotCourse = Pick<Gauntlet, 'planes' | 'lanes'>;

const targetCache = new WeakMap<object, BotCourse>();
/**
 * Gauntlet obstacles and proving gates as one list of gaps. A gate is a still hole the size of its
 * opening; reverse gates are left out (the autopilot doesn't turn round for them).
 */
export function botTargets(course: { gauntlet?: Gauntlet; proving?: { course: ProvingCourse } } | undefined): BotCourse | null {
  if (!course) return null;
  const g = course.gauntlet;
  const pc = course.proving?.course;
  if (!pc) return g ?? null;
  const key = pc as object;
  let out = targetCache.get(key);
  if (!out || (g && out.lanes !== g.lanes)) {
    const gates: Plane[] = pc.gates
      .filter((x) => !x.reverse)
      .map((x) => ({ kind: 'ring', s: x.s, thickness: 0.2, shape: { k: 'hole', r: Math.hypot(x.x, x.y), a0: Math.atan2(x.y, x.x), omega: 0, gap: x.r } }));
    out = { planes: [...(g?.planes ?? []), ...gates].sort((a, b) => a.s - b.s), lanes: g?.lanes ?? [] };
    targetCache.set(key, out);
  }
  return out;
}

export interface BotParams {
  /** cruise speed, m/s */
  speed: number;
  /** speed through gauntlet obstacles, m/s */
  obstacleSpeed: number;
  /** look-ahead time, s (clamped to a distance range) */
  lookAhead: number;
  /** which branches to take at forks (default: stay on the main loop) */
  route?: BotRoute;
}

/**
 * Route choice at forks: main never leaves the loop; shortcut takes shortcuts and hidden routes;
 * long takes the long way, splits and the pit lane; random picks per fork (the same every lap).
 */
export const BOT_ROUTES = ['main', 'shortcut', 'long', 'random'] as const;
/** `any` takes every branch (used to measure forks) */
export type BotRoute = (typeof BOT_ROUTES)[number] | 'any';

export const defaultBot: BotParams = { speed: 110, obstacleSpeed: 55, lookAhead: 0.5 };

/** Whether a bot flying `route` takes fork `k`. */
export function takesBranch(route: BotRoute, b: Branch, k: number): boolean {
  switch (route) {
    case 'main':
      return false;
    case 'shortcut':
      return b.kind === 'shortcut' || b.kind === 'hidden';
    case 'long':
      return b.kind === 'long' || b.kind === 'split' || b.kind === 'pit';
    case 'random':
      return ((Math.imul(k + 1, 0x9e3779b1) >>> 16) & 1) === 1;
    case 'any':
      return true;
  }
}

/**
 * The branch to steer along for a target at main progress `ts`: the one the ship is on, or one it
 * chose and can still turn into (not yet through the mouth), else -1 (main loop).
 */
export function botBranch(track: Track, s: number, ts: number, on: number, route: BotRoute): number {
  const bs = track.branches;
  if (!bs?.length) return -1;
  if (on >= 0) return ts <= bs[on].s1 ? on : -1;
  for (let k = 0; k < bs.length; k++) {
    const b = bs[k];
    if (ts < b.s0 || ts > b.s1 || !takesBranch(route, b, k)) continue;
    if (s <= b.s0 + (b.open0 / b.length) * (b.s1 - b.s0) * 0.9) return k;
  }
  return -1;
}

const clamp1 = (x: number) => Math.max(-1, Math.min(1, x));
const _inv = new Quaternion();
const _target = new Vector3();
const _local = new Vector3();
const _up = new Vector3();
const _want = new Vector3();
const _aim = new Vector3();
const _off = new Vector3();
const _vel = new Vector3();
const _gap = new Vector3();
const _tan = new Vector3();
const _tan2 = new Vector3();

/**
 * Autopilot: steer the nose at a point ahead on the centreline (or through the next obstacle's
 * gap, timed for arrival), roll to the track's up, and hold a speed that drops for bends.
 */
export function botControls(
  ship: ShipState,
  track: Track,
  near: Nearest,
  time: number,
  out: Controls,
  gauntlet: BotCourse | null = null,
  p: BotParams = defaultBot,
  /** branch the ship is on (race state `loc.route`), -1 = main loop */
  on = -1,
): Controls {
  const L = track.length;
  const speed = ship.vel.length();
  const look = Math.max(25, Math.min(90, speed * p.lookAhead));
  let ts = near.s + look;
  let tx = 0;
  let ty = 0;
  let wantSpeed = p.speed;

  // precise approach to a gap: strafe/lift onto it (PD) and hold back until lined up
  let precise = false;
  let sx = 0;
  let gvx = 0;
  let gvy = 0;
  let sy = 0;
  let backOff = false;
  if (gauntlet) {
    let next: Plane | null = null;
    let best = Infinity;
    for (const pl of gauntlet.planes) {
      const d = arcDelta(pl.s, near.s, L);
      if (d > -0.5 && d < look + 60 && d < best) {
        best = d;
        next = pl;
      }
    }
    if (next) {
      const eta = Math.max(best, 0) / Math.max(speed, 10);
      [tx, ty] = openPoint(next.shape, time + eta);
      // how fast the gap moves across the track (feed-forward for the strafe)
      const [nx, ny] = openPoint(next.shape, time + eta + 0.1);
      gvx = (nx - tx) / 0.1;
      gvy = (ny - ty) / 0.1;
      ts = next.s + 3;
      // where the ship is in the cross-section, vs the gap
      const i = sampleAt(track, near.s);
      _off.subVectors(ship.pos, near.point);
      sx = _off.dot(track.right[i]);
      sy = _off.dot(track.up[i]);
      const side = Math.hypot(tx - sx, ty - sy);
      wantSpeed = Math.min(wantSpeed, p.obstacleSpeed * Math.max(0.3, 1 - side / Math.max(best, 1)));
      precise = best < 30;
      if (best < 8 && !passable(next.shape, sx, sy, time + eta, 1.6)) backOff = true;
    } else {
      const lane = gauntlet.lanes.find((l) => arcDelta(near.s, l.s0, L) > -80 && arcDelta(near.s, l.s1, L) < 0);
      if (lane) {
        tx = lane.x;
        ty = lane.y;
        wantSpeed = Math.min(wantSpeed, p.obstacleSpeed);
      }
    }
  }

  // near a gap the nose looks straight down the track (strafe/lift do the lining up)
  const route = p.route ?? 'main';
  const via = botBranch(track, near.s, ts, on, route);
  if (via >= 0) courseFrame(track, ts, via, 0, 0, _target);
  else pointOnTrack(track, ts, precise ? sx : tx, precise ? sy : ty, _target);
  _inv.copy(ship.quat).invert();
  // steer the *velocity* at the target: lead the nose by the drift between where we're going
  // and where we want to go (flight assist only slowly pulls velocity onto the nose)
  const dist = _target.distanceTo(ship.pos);
  _want.subVectors(_target, ship.pos).normalize();
  if (speed > 5 && !precise) _aim.copy(ship.vel).divideScalar(speed);
  else _aim.copy(_want);
  _aim.subVectors(_want, _aim).multiplyScalar(1.5).add(_want).normalize().multiplyScalar(dist);
  _local.copy(_aim).applyQuaternion(_inv);
  const fwd = Math.max(-_local.z, 1e-3);
  out.pitch = clamp1(Math.atan2(_local.y, fwd) * 3);
  out.yaw = clamp1(Math.atan2(_local.x, fwd) * 3);

  const i = sampleAt(track, near.s);
  if (on >= 0) courseFrame(track, near.s, on, 0, 0, _off, _tan, _up);
  else _up.copy(track.up[i]);
  _up.applyQuaternion(_inv);
  out.roll = clamp1(Math.atan2(_up.x, _up.y) * 2);

  // no strafe/lift in cruise: any non-zero value switches off flight assist's damping on that axis.
  // Near a gap, strafe/lift onto it directly (PD on the target's offset and our sideways speed).
  if (precise) {
    _local.subVectors(pointOnTrack(track, ts, tx, ty, _target), ship.pos).applyQuaternion(_inv);
    const i = sampleAt(track, near.s);
    _gap.copy(track.right[i]).multiplyScalar(gvx).addScaledVector(track.up[i], gvy).applyQuaternion(_inv);
    _vel.copy(ship.vel).applyQuaternion(_inv);
    out.strafe = clamp1(_local.x * 0.4 + (_gap.x - _vel.x) * 0.4);
    out.lift = clamp1(_local.y * 0.4 + (_gap.y - _vel.y) * 0.4);
  } else {
    out.strafe = 0;
    out.lift = 0;
  }

  // slow for bends: angle between the tangent here and ahead
  const j = sampleAt(track, near.s + look * 1.5);
  const ahead = botBranch(track, near.s, near.s + look * 1.5, on, route);
  if (ahead >= 0) courseFrame(track, near.s + look * 1.5, ahead, 0, 0, _off, _tan2);
  else _tan2.copy(track.tan[j]);
  if (on >= 0) courseFrame(track, near.s, on, 0, 0, _off, _tan);
  else _tan.copy(track.tan[i]);
  const bend = _tan.angleTo(_tan2);
  wantSpeed *= Math.max(0.4, 1 - bend * 0.8);
  // moving backwards counts as negative speed
  const along = speed > 1e-6 ? -_vel.copy(ship.vel).applyQuaternion(_inv).z : 0;
  out.thrust = backOff ? clamp1((-8 - along) * 0.3) : clamp1((wantSpeed - along) * 0.2);
  out.boost = false;
  return out;
}
