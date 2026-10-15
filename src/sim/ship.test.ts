import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { newShip, noControls, stepShip, copyShip, lerpShip, type ShipParams, type Controls } from './ship';

const params: ShipParams = {
  thrust: 60,
  reverse: 40,
  strafe: 30,
  turnRate: [2, 2, 3],
  turnResponse: 8,
  maxSpeed: 100,
  overspeedDecay: 2,
  boostThrust: 150,
  boostSpeed: 200,
  boostDrain: 0.5,
  boostRegen: 0.25,
  assist: true,
  assistDamp: 3,
};
const dt = 1 / 120;

function fly(c: Partial<Controls>, seconds: number, p: Partial<ShipParams> = {}, s = newShip()) {
  const ctl = { ...noControls(), ...c };
  for (let i = 0; i < Math.round(seconds / dt); i++) stepShip(s, ctl, { ...params, ...p }, dt);
  return s;
}
const forward = (s: ReturnType<typeof newShip>) => new Vector3(0, 0, -1).applyQuaternion(s.quat);

describe('translation', () => {
  it('thrust accelerates along the nose (-Z)', () => {
    const s = fly({ thrust: 1 }, 1);
    expect(s.vel.z).toBeCloseTo(-60, 0);
    expect(Math.abs(s.vel.x) + Math.abs(s.vel.y)).toBeLessThan(1e-6);
    expect(s.pos.z).toBeLessThan(-25);
  });

  it('speed is capped at maxSpeed', () => {
    expect(fly({ thrust: 1 }, 5).vel.length()).toBeLessThanOrEqual(100.01);
  });

  it('strafe and lift move right and up', () => {
    const s = fly({ strafe: 1, lift: 1 }, 1);
    expect(s.vel.x).toBeCloseTo(30, 0);
    expect(s.vel.y).toBeCloseTo(30, 0);
  });

  it('reverse thrust uses the reverse acceleration', () => {
    expect(fly({ thrust: -1 }, 0.5, { assist: false }).vel.z).toBeCloseTo(20, 0);
  });
});

describe('flight assist', () => {
  it('on: sideways drift dies out after releasing strafe', () => {
    const s = fly({ strafe: 1 }, 1);
    fly({}, 2, {}, s);
    expect(Math.abs(s.vel.x)).toBeLessThan(0.1);
  });

  it('on: velocity follows the nose after turning', () => {
    const s = fly({ thrust: 1 }, 1);
    fly({ yaw: 1 }, 0.6, {}, s);
    fly({}, 2, {}, s);
    expect(s.vel.clone().normalize().dot(forward(s))).toBeGreaterThan(0.99);
  });

  it('on: forward speed is held with no input', () => {
    const s = fly({ thrust: 1 }, 1);
    const v = s.vel.length();
    fly({}, 2, {}, s);
    expect(s.vel.length()).toBeCloseTo(v, 1);
  });

  it('off: momentum is conserved (Newtonian drift)', () => {
    const s = fly({ strafe: 1 }, 1, { assist: false });
    const v = s.vel.clone();
    fly({ yaw: 1 }, 1, { assist: false }, s);
    expect(s.vel.distanceTo(v)).toBeLessThan(1e-6);
  });
});

describe('rotation', () => {
  it('pitch up raises the nose, yaw right turns right, roll right drops the right wing', () => {
    expect(forward(fly({ pitch: 1 }, 0.3)).y).toBeGreaterThan(0.3);
    expect(forward(fly({ yaw: 1 }, 0.3)).x).toBeGreaterThan(0.3);
    const right = new Vector3(1, 0, 0).applyQuaternion(fly({ roll: 1 }, 0.3).quat);
    expect(right.y).toBeLessThan(-0.3);
  });

  it('turn rate converges to the commanded rate and stops after release', () => {
    const s = fly({ yaw: 1 }, 1);
    expect(s.angVel.length()).toBeCloseTo(2, 2);
    fly({}, 1, {}, s);
    expect(s.angVel.length()).toBeLessThan(0.01);
  });

  it('quaternion stays normalized', () => {
    const s = fly({ pitch: 1, yaw: 0.7, roll: -0.4 }, 10);
    expect(s.quat.length()).toBeCloseTo(1, 6);
  });

  it('inputs beyond ±1 are clamped', () => {
    expect(fly({ yaw: 5 }, 1).angVel.length()).toBeCloseTo(2, 2);
  });
});

describe('boost', () => {
  it('drains energy, raises the cap, and stops when empty', () => {
    const s = fly({ boost: true }, 1);
    expect(s.boosting).toBe(true);
    expect(s.energy).toBeCloseTo(0.5, 2);
    expect(s.vel.length()).toBeGreaterThan(100);
    fly({ boost: true }, 1.5, {}, s);
    expect(s.boosting).toBe(false);
  });

  it('after running dry, boost needs a release before it works again', () => {
    const s = fly({ boost: true }, 3);
    expect(s.boosting).toBe(false);
    expect(s.energy).toBeGreaterThan(0); // regenerating while still held
    fly({}, dt, {}, s);
    fly({ boost: true }, dt, {}, s);
    expect(s.boosting).toBe(true);
  });

  it('regenerates when released and decays back under the normal cap', () => {
    const s = fly({ boost: true }, 1.5);
    fly({}, 4, {}, s);
    expect(s.energy).toBe(1);
    expect(s.vel.length()).toBeLessThan(101);
  });
});

describe('determinism and interpolation', () => {
  it('same inputs give bit-identical state', () => {
    const script: Partial<Controls>[] = [{ thrust: 1, yaw: 0.3 }, { pitch: -1, strafe: 0.5 }, { boost: true, roll: 1 }];
    const run = () => {
      const s = newShip();
      for (const c of script) fly(c, 1, {}, s);
      return [...s.pos.toArray(), ...s.quat.toArray(), ...s.vel.toArray(), s.energy];
    };
    expect(run()).toEqual(run());
  });

  it('lerpShip blends position and orientation', () => {
    const a = newShip();
    const b = copyShip(newShip(), fly({ thrust: 1, yaw: 1 }, 0.5));
    const mid = lerpShip(newShip(), a, b, 0.5);
    expect(mid.pos.z).toBeCloseTo(b.pos.z / 2);
    expect(mid.quat.angleTo(a.quat)).toBeCloseTo(b.quat.angleTo(a.quat) / 2, 5);
  });
});
