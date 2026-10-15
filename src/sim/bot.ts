import { Quaternion, Vector3 } from 'three';
import type { Controls, ShipState } from './ship';
import type { Nearest, Track } from '../gen/track';
import { openPoint, passable, pointOnTrack, sampleAt, type Gauntlet, type Plane } from '../gen/gauntlet';
import { arcDelta } from './gauntlet';

export interface BotParams {
  /** cruise speed, m/s */
  speed: number;
  /** speed through gauntlet obstacles, m/s */
  obstacleSpeed: number;
  /** look-ahead time, s (clamped to a distance range) */
  lookAhead: number;
}

export const defaultBot: BotParams = { speed: 110, obstacleSpeed: 55, lookAhead: 0.5 };

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
  gauntlet: Gauntlet | null = null,
  p: BotParams = defaultBot,
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
  pointOnTrack(track, ts, precise ? sx : tx, precise ? sy : ty, _target);
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
  _up.copy(track.up[i]).applyQuaternion(_inv);
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
  const bend = track.tan[i].angleTo(track.tan[j]);
  wantSpeed *= Math.max(0.4, 1 - bend * 0.8);
  // moving backwards counts as negative speed
  const along = speed > 1e-6 ? -_vel.copy(ship.vel).applyQuaternion(_inv).z : 0;
  out.thrust = backOff ? clamp1((-8 - along) * 0.3) : clamp1((wantSpeed - along) * 0.2);
  out.boost = false;
  return out;
}
