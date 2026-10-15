import { Quaternion, Vector3 } from 'three';

/** Pilot intent, each axis in [-1, 1]. Positive = nose up, nose right, roll right, right, up, forward. */
export interface Controls {
  pitch: number;
  yaw: number;
  roll: number;
  strafe: number;
  lift: number;
  thrust: number;
  boost: boolean;
}

export const noControls = (): Controls => ({ pitch: 0, yaw: 0, roll: 0, strafe: 0, lift: 0, thrust: 0, boost: false });

export interface ShipParams {
  /** forward / reverse / lateral acceleration, m/s² */
  thrust: number;
  reverse: number;
  strafe: number;
  /** max turn rates (pitch, yaw, roll), rad/s */
  turnRate: [number, number, number];
  /** how fast angular velocity reaches the commanded rate, 1/s */
  turnResponse: number;
  maxSpeed: number;
  /** speed above the cap bleeds off at this rate, 1/s */
  overspeedDecay: number;
  boostThrust: number;
  boostSpeed: number;
  /** boost energy per second, as a fraction of full */
  boostDrain: number;
  boostRegen: number;
  /** flight assist: kill sideways drift so velocity follows the nose */
  assist: boolean;
  /** how fast assist removes drift, 1/s */
  assistDamp: number;
}

export interface ShipState {
  pos: Vector3;
  vel: Vector3;
  quat: Quaternion;
  /** body-frame angular velocity, rad/s */
  angVel: Vector3;
  /** boost energy, 0..1 */
  energy: number;
  boosting: boolean;
  /** set when energy runs out; boost stays off until the button is released */
  boostLocked: boolean;
}

export const newShip = (): ShipState => ({
  pos: new Vector3(),
  vel: new Vector3(),
  quat: new Quaternion(),
  angVel: new Vector3(),
  energy: 1,
  boosting: false,
  boostLocked: false,
});

export function copyShip(to: ShipState, from: ShipState): ShipState {
  to.pos.copy(from.pos);
  to.vel.copy(from.vel);
  to.quat.copy(from.quat);
  to.angVel.copy(from.angVel);
  to.energy = from.energy;
  to.boosting = from.boosting;
  to.boostLocked = from.boostLocked;
  return to;
}

const clamp1 = (x: number) => Math.min(Math.max(x, -1), 1);
// exponential approach factor for rate k over dt (frame-rate independent smoothing)
const approach = (k: number, dt: number) => 1 - Math.exp(-Math.max(k, 0) * dt);

const _target = new Vector3();
const _dq = new Quaternion();
const _axis = new Vector3();
const _accel = new Vector3();
const _invQ = new Quaternion();
const _local = new Vector3();

/** Advance one fixed step. Mutates `s`. */
export function stepShip(s: ShipState, c: Controls, p: ShipParams, dt: number): void {
  // --- rotation: rate control in the body frame ----------------------------
  // three.js: forward is -Z, so nose-right is -Y and roll-right is -Z
  _target.set(clamp1(c.pitch) * p.turnRate[0], -clamp1(c.yaw) * p.turnRate[1], -clamp1(c.roll) * p.turnRate[2]);
  s.angVel.lerp(_target, approach(p.turnResponse, dt));
  const angle = s.angVel.length() * dt;
  if (angle > 0) {
    _dq.setFromAxisAngle(_axis.copy(s.angVel).normalize(), angle);
    s.quat.multiply(_dq).normalize();
  }

  // --- boost ---------------------------------------------------------------
  if (!c.boost) s.boostLocked = false;
  s.boosting = c.boost && !s.boostLocked && s.energy > 0;
  s.energy = Math.min(1, Math.max(0, s.energy + (s.boosting ? -p.boostDrain : p.boostRegen) * dt));
  if (s.boosting && s.energy === 0) s.boostLocked = true;

  // --- translation ---------------------------------------------------------
  const fwd = clamp1(c.thrust);
  const forwardAccel = s.boosting ? p.boostThrust : fwd >= 0 ? fwd * p.thrust : fwd * p.reverse;
  const prevSpeed = s.vel.length();
  _accel.set(clamp1(c.strafe) * p.strafe, clamp1(c.lift) * p.strafe, -forwardAccel).applyQuaternion(s.quat);
  s.vel.addScaledVector(_accel, dt);

  if (p.assist) {
    // damp body-frame sideways/vertical velocity unless the pilot is commanding it
    _local.copy(s.vel).applyQuaternion(_invQ.copy(s.quat).invert());
    const k = approach(p.assistDamp, dt);
    if (c.strafe === 0) _local.x -= _local.x * k;
    if (c.lift === 0) _local.y -= _local.y * k;
    // drifting backwards with no input: bring it to rest too
    if (fwd === 0 && !s.boosting && _local.z > 0) _local.z -= _local.z * k;
    s.vel.copy(_local.applyQuaternion(s.quat));
  }

  // thrust can't push past the cap; speed already above it (boost ended) bleeds off smoothly
  const cap = s.boosting ? p.boostSpeed : p.maxSpeed;
  const speed = s.vel.length();
  const limit = Math.max(cap, cap + (prevSpeed - cap) * (1 - approach(p.overspeedDecay, dt)));
  if (speed > limit) s.vel.multiplyScalar(limit / speed);

  s.pos.addScaledVector(s.vel, dt);
}

/** Interpolate between two sim states for rendering. */
export function lerpShip(out: ShipState, a: ShipState, b: ShipState, t: number): ShipState {
  out.pos.lerpVectors(a.pos, b.pos, t);
  out.vel.lerpVectors(a.vel, b.vel, t);
  out.quat.slerpQuaternions(a.quat, b.quat, t);
  out.angVel.lerpVectors(a.angVel, b.angVel, t);
  out.energy = a.energy + (b.energy - a.energy) * t;
  out.boosting = b.boosting;
  out.boostLocked = b.boostLocked;
  return out;
}
