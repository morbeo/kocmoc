import { afterEach, describe, expect, it } from 'vitest';
import { PerspectiveCamera, Vector3 } from 'three';
import { vars } from '../core/vars';
import { newShip } from '../sim/ship';
import { CAM_MODES, camMode, cycleCamera, newRigState, placeRig, toggleCinematic } from './rigs';

const touched = new Set<string>();
const set = (path: string, value: unknown) => {
  touched.add(path);
  vars.set(path, value);
};
afterEach(() => {
  for (const p of touched) vars.unset(p);
  touched.clear();
  vars.unset('cam.mode');
});

/** a ship at `pos`, flying down -Z (its forward) unless turned by `yaw` radians */
function ship(pos = new Vector3(10, 20, 30), yaw = 0) {
  const s = newShip();
  s.pos.copy(pos);
  s.quat.setFromAxisAngle(new Vector3(0, 1, 0), yaw);
  s.vel.set(0, 0, -50).applyQuaternion(s.quat);
  return s;
}
const forward = (cam: PerspectiveCamera) => new Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
const place = (rig: Parameters<typeof placeRig>[0], s = ship(), st = newRigState(), dt = 1 / 60, zoom = 1) => {
  const cam = new PerspectiveCamera();
  placeRig(rig, cam, s, dt, st, zoom);
  return cam;
};

describe('placeRig', () => {
  it('applies cam.fov to the camera', () => {
    set('cam.fov', 55);
    expect(place('chase').fov).toBe(55);
  });

  it('cockpit sits at the eye offset and faces where the ship faces', () => {
    set('cam.cockpit.offset', [0, 1, -2]);
    const s = ship(new Vector3(0, 0, 0), Math.PI / 2);
    const cam = place('cockpit', s);
    // yawed 90° left: ship-space -Z (ahead) is world -X
    expect(cam.position.x).toBeCloseTo(-2);
    expect(cam.position.y).toBeCloseTo(1);
    expect(cam.quaternion.angleTo(s.quat)).toBeCloseTo(0);
  });

  it('chase sits behind and above the ship and aims ahead of it', () => {
    const s = ship();
    const cam = place('chase', s);
    expect(cam.position.z).toBeGreaterThan(s.pos.z); // behind: ship flies -Z
    expect(cam.position.y).toBeGreaterThan(s.pos.y);
    expect(cam.position.distanceTo(s.pos)).toBeCloseTo(Math.hypot(9, 2.2));
    expect(forward(cam).z).toBeLessThan(-0.9);
  });

  it('far sits further back than chase, and zoom scales the arm', () => {
    const s = ship();
    const chase = place('chase', s).position.distanceTo(s.pos);
    expect(place('far', s).position.distanceTo(s.pos)).toBeGreaterThan(chase);
    expect(place('chase', s, newRigState(), 1 / 60, 2).position.distanceTo(s.pos)).toBeCloseTo(chase * 2);
  });

  it('the chase arm lags a sudden turn and catches up over time', () => {
    const st = newRigState();
    const s = ship(new Vector3(), 0);
    place('chase', s, st);
    s.quat.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
    place('chase', s, st, 1 / 60);
    const lag = st.arm.angleTo(s.quat);
    expect(lag).toBeGreaterThan(1);
    for (let i = 0; i < 300; i++) place('chase', s, st, 1 / 60);
    expect(st.arm.angleTo(s.quat)).toBeLessThan(0.01);
  });

  it('lookback sits just ahead of the ship and looks back down its tail', () => {
    const s = ship();
    const cam = place('lookback', s);
    expect(cam.position.z).toBeLessThan(s.pos.z); // ship-space -Z is ahead
    expect(forward(cam).z).toBeGreaterThan(0.9);
  });

  it('top looks straight down with the heading up the screen', () => {
    set('cam.top.height', 100);
    const s = ship(new Vector3(0, 0, 0), Math.PI / 2);
    const cam = place('top', s);
    expect(cam.position.y).toBeCloseTo(100);
    expect(forward(cam).y).toBeCloseTo(-1);
    // screen up = the ship's ground heading (world -X after a 90° left yaw)
    const up = new Vector3(0, 1, 0).applyQuaternion(cam.quaternion);
    expect(up.x).toBeCloseTo(-1);
  });

  it('top still works with the ship pointing straight down', () => {
    const s = ship(new Vector3());
    s.quat.setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
    const cam = place('top', s);
    expect(Number.isFinite(cam.quaternion.x)).toBe(true);
    expect(forward(cam).y).toBeCloseTo(-1);
  });

  it('orbit circles the ship at its distance', () => {
    set('cam.orbit.distance', 20);
    set('cam.orbit.speed', 1);
    const st = newRigState();
    const s = ship();
    const a = place('orbit', s, st, 0.5).position.clone();
    const b = place('orbit', s, st, 0.5).position.clone();
    expect(st.orbit).toBeCloseTo(1);
    expect(a.distanceTo(s.pos)).toBeCloseTo(b.distanceTo(s.pos));
    expect(a.distanceTo(b)).toBeGreaterThan(1);
  });

  it('side holds a fixed spot until the ship is well past, then moves on', () => {
    const st = newRigState();
    const s = ship(new Vector3());
    const first = place('side', s, st).position.clone();
    expect(first.z).toBeLessThan(0); // ahead of the ship
    // approaching at speed: the spot starts more than 3 x cam.side.distance away but is still ahead
    expect(first.distanceTo(s.pos)).toBeGreaterThan(120);
    s.pos.set(0, 0, -10);
    expect(place('side', s, st).position.distanceTo(first)).toBe(0);
    s.pos.set(0, 0, -150); // alongside: not yet past
    expect(place('side', s, st).position.distanceTo(first)).toBe(0);
    s.pos.set(0, 0, -1000);
    expect(place('side', s, st).position.distanceTo(first)).toBeGreaterThan(100);
  });

  it('switching rig resets the memory of the others', () => {
    const st = newRigState();
    place('chase', ship(), st);
    place('side', ship(), st);
    expect(st.armInit).toBe(false);
    expect(st.spotInit).toBe(true);
    place('chase', ship(), st);
    expect(st.spotInit).toBe(false);
    place('cinematic', ship(), st);
    expect(st.armInit || st.spotInit).toBe(false);
    expect(st.cine.started).toBe(true);
    place('cockpit', ship(), st);
    expect(st.cine.started).toBe(false);
  });
});

describe('camera mode', () => {
  it('V cycles every mode and wraps', () => {
    const seen: string[] = [];
    for (let i = 0; i < CAM_MODES.length; i++) {
      seen.push(camMode.value);
      cycleCamera();
    }
    expect(seen).toEqual([...CAM_MODES]);
    expect(camMode.value).toBe(CAM_MODES[0]);
  });

  it('a viewport-only rig cycles back to the first mode', () => {
    camMode.set('top');
    cycleCamera();
    expect(camMode.value).toBe(CAM_MODES[0]);
  });

  it('X toggles cinematic and returns to the rig used before', () => {
    camMode.set('cockpit');
    toggleCinematic();
    expect(camMode.value).toBe('cinematic');
    toggleCinematic();
    expect(camMode.value).toBe('cockpit');
  });
});

