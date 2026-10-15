import { PerspectiveCamera, Quaternion, Vector3 } from 'three';
import { vars } from '../core/vars';
import type { ShipState } from '../sim/ship';

export const CAM_MODES = ['chase', 'cockpit'] as const;
export const camMode = vars.enum('cam.mode', 'chase', CAM_MODES, { tags: ['cam'], desc: 'V cycles' });
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

const _arm = new Quaternion();
const _offset = new Vector3();
const _aim = new Vector3();
const _up = new Vector3();
let armInit = false;

export function cycleCamera(): void {
  camMode.set(CAM_MODES[(CAM_MODES.indexOf(camMode.value) + 1) % CAM_MODES.length]);
}

/** Place `camera` for the current rig. `dt` is real frame time (cameras are presentation, not sim). */
export function updateCamera(camera: PerspectiveCamera, ship: ShipState, dt: number, zoom = 1): void {
  if (camera.fov !== fov.value) {
    camera.fov = fov.value;
    camera.updateProjectionMatrix();
  }

  if (camMode.value === 'cockpit') {
    camera.position.copy(_offset.fromArray(cockpitOffset.value).applyQuaternion(ship.quat).add(ship.pos));
    camera.quaternion.copy(ship.quat);
    armInit = false;
    return;
  }

  // chase: a spring arm whose orientation lags the ship's, so turns read on screen
  if (!armInit) _arm.copy(ship.quat);
  armInit = true;
  _arm.slerp(ship.quat, 1 - Math.exp(-chaseLag.value * dt));
  _offset.set(0, chaseHeight.value, chaseDistance.value).multiplyScalar(zoom).applyQuaternion(_arm);
  camera.position.copy(ship.pos).add(_offset);
  _aim.set(0, 0, -chaseLookAhead.value).applyQuaternion(ship.quat).add(ship.pos);
  camera.up.copy(_up.set(0, 1, 0).applyQuaternion(_arm));
  camera.lookAt(_aim);
}
