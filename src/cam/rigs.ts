import { PerspectiveCamera, Quaternion, Vector3 } from 'three';
import { vars } from '../core/vars';
import type { ShipState } from '../sim/ship';
import { cineEvent, newCineState, placeCinematic, type CineState } from './cinematic';
import type { RaceEvent } from '../sim/race';

/** Every camera rig. `V` cycles the ones in CAM_MODES; viewports can use any. */
export const RIGS = ['chase', 'cockpit', 'far', 'lookback', 'top', 'orbit', 'side', 'cinematic'] as const;
export type Rig = (typeof RIGS)[number];
export const CAM_MODES = ['chase', 'cockpit', 'far', 'lookback', 'cinematic'] as const;
export const camMode = vars.enum<Rig>('cam.mode', 'chase', RIGS, { tags: ['cam'], desc: 'V cycles chase, cockpit, far, look-back and cinematic; X toggles cinematic' });
const tags = ['cam'];
const fov = vars.num('cam.fov', 70, { min: 20, max: 120, hardMin: 1, hardMax: 179, unit: '°', tags });
const chaseDistance = vars.num('cam.chase.distance', 9, { min: 2, max: 40, hardMin: 0.5, hardMax: 900, unit: 'm', tags });
const chaseHeight = vars.num('cam.chase.height', 2.2, { min: -5, max: 10, unit: 'm', tags });
const chaseLookAhead = vars.num('cam.chase.lookAhead', 25, { min: 0, max: 200, hardMin: 0, unit: 'm', tags, desc: 'aim point in front of the ship' });
const chaseLag = vars.num('cam.chase.lag', 7, {
  min: 0.5,
  max: 30,
  hardMin: 0.01,
  unit: '/s',
  tags: ['cam', 'feel'],
  desc: 'how fast the spring arm catches up with the ship’s rotation; higher = stiffer',
});
const cockpitOffset = vars.vec3('cam.cockpit.offset', [0, 0.35, -0.6], { tags, desc: 'eye position in ship space' });
const farDistance = vars.num('cam.far.distance', 30, { min: 5, max: 200, hardMin: 1, unit: 'm', tags });
const farHeight = vars.num('cam.far.height', 8, { min: -20, max: 60, unit: 'm', tags });
const topHeight = vars.num('cam.top.height', 150, { min: 10, max: 2000, hardMin: 1, unit: 'm', tags, desc: 'tactical view above the ship' });
const orbitDistance = vars.num('cam.orbit.distance', 20, { min: 3, max: 200, hardMin: 1, unit: 'm', tags });
const orbitSpeed = vars.num('cam.orbit.speed', 0.3, { min: -3, max: 3, unit: 'rad/s', tags });
const sideDistance = vars.num('cam.side.distance', 40, { min: 5, max: 400, hardMin: 1, unit: 'm', tags, desc: 'track-side cinematic: fixed spot the ship flies past' });

/** Per-camera memory (spring arm, orbit angle, track-side spot, cinematic director). */
export interface RigState {
  arm: Quaternion;
  armInit: boolean;
  orbit: number;
  spot: Vector3;
  spotInit: boolean;
  cine: CineState;
}
export const newRigState = (): RigState => ({ arm: new Quaternion(), armInit: false, orbit: 0, spot: new Vector3(), spotInit: false, cine: newCineState() });

const _offset = new Vector3();
const _aim = new Vector3();
const _up = new Vector3();
const _fwd = new Vector3();
const main = newRigState();

export function cycleCamera(): void {
  const i = CAM_MODES.indexOf(camMode.value as (typeof CAM_MODES)[number]);
  camMode.set(CAM_MODES[(i + 1) % CAM_MODES.length]);
}

let beforeCine: Rig = 'chase';
/** Switch to the cinematic camera, or back to the rig used before it. */
export function toggleCinematic(): void {
  if (camMode.value === 'cinematic') camMode.set(beforeCine);
  else {
    beforeCine = camMode.value;
    camMode.set('cinematic');
  }
}

/** Place `camera` for any rig. `dt` is real frame time (cameras are presentation, not sim). */
export function placeRig(rig: Rig, camera: PerspectiveCamera, ship: ShipState, dt: number, st: RigState, zoom = 1): void {
  if (rig !== 'cinematic') st.cine.started = false;
  else {
    st.armInit = st.spotInit = false;
    placeCinematic(camera, ship, dt, st.cine, fov.value);
    return;
  }
  if (camera.fov !== fov.value) {
    camera.fov = fov.value;
    camera.updateProjectionMatrix();
  }
  if (rig !== 'chase' && rig !== 'far') st.armInit = false;
  if (rig !== 'side') st.spotInit = false;

  switch (rig) {
    case 'cockpit':
      camera.position.copy(_offset.fromArray(cockpitOffset.value).applyQuaternion(ship.quat).add(ship.pos));
      camera.quaternion.copy(ship.quat);
      return;
    case 'lookback':
      camera.position.copy(_offset.set(0, 1.2, -3).applyQuaternion(ship.quat).add(ship.pos));
      camera.up.copy(_up.set(0, 1, 0).applyQuaternion(ship.quat));
      camera.lookAt(_aim.set(0, 0, 40).applyQuaternion(ship.quat).add(ship.pos));
      return;
    case 'top':
      camera.position.copy(ship.pos).add(_offset.set(0, topHeight.value * zoom, 0));
      // keep the ship's heading pointing up the screen
      _fwd.set(0, 0, -1).applyQuaternion(ship.quat).setY(0);
      if (_fwd.lengthSq() < 1e-6) _fwd.set(0, 0, -1);
      camera.up.copy(_fwd.normalize());
      camera.lookAt(ship.pos);
      return;
    case 'orbit':
      st.orbit += orbitSpeed.value * dt;
      camera.position.copy(ship.pos).add(_offset.set(Math.sin(st.orbit), 0.35, Math.cos(st.orbit)).multiplyScalar(orbitDistance.value * zoom));
      camera.up.set(0, 1, 0);
      camera.lookAt(ship.pos);
      return;
    case 'side': {
      // a fixed spot ahead and to the side; jump to a new one once the ship is well past
      _fwd.set(0, 0, -1).applyQuaternion(ship.quat);
      const d = sideDistance.value;
      if (!st.spotInit || st.spot.distanceTo(ship.pos) > d * 3) {
        _up.set(0, 1, 0).applyQuaternion(ship.quat);
        st.spot.copy(ship.pos).addScaledVector(_fwd, d * 2 + ship.vel.length() * 1.5).add(_offset.crossVectors(_fwd, _up).multiplyScalar(d * 0.5));
        st.spotInit = true;
      }
      camera.position.copy(st.spot);
      camera.up.set(0, 1, 0);
      camera.lookAt(ship.pos);
      return;
    }
    default: {
      // chase / far: a spring arm whose orientation lags the ship's, so turns read on screen
      const far = rig === 'far';
      if (!st.armInit) st.arm.copy(ship.quat);
      st.armInit = true;
      st.arm.slerp(ship.quat, 1 - Math.exp(-chaseLag.value * (far ? 0.5 : 1) * dt));
      _offset
        .set(0, far ? farHeight.value : chaseHeight.value, far ? farDistance.value : chaseDistance.value)
        .multiplyScalar(zoom)
        .applyQuaternion(st.arm);
      camera.position.copy(ship.pos).add(_offset);
      _aim.set(0, 0, -chaseLookAhead.value).applyQuaternion(ship.quat).add(ship.pos);
      camera.up.copy(_up.set(0, 1, 0).applyQuaternion(st.arm));
      camera.lookAt(_aim);
    }
  }
}

/** Pass a race event to the main camera's director. */
export const cameraEvent = (type: RaceEvent['type']): void => cineEvent(main.cine, type);

/** The main camera, following `cam.mode` unless given another rig. */
export function updateCamera(camera: PerspectiveCamera, ship: ShipState, dt: number, zoom = 1, rig: Rig = camMode.value): void {
  placeRig(rig, camera, ship, dt, main, zoom);
}
