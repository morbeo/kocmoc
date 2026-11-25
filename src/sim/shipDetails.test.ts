// Edge cases of the flight model and the state helpers (ship.test.ts covers the flight feel).
import { describe, expect, it } from 'vitest';
import { Quaternion, Vector3 } from 'three';
import { copyShip, lerpShip, newShip, noControls, stepShip, type ShipParams } from './ship';

const p: ShipParams = {
  thrust: 60, reverse: 40, strafe: 35, turnRate: [1.8, 1.4, 3], turnResponse: 8, maxSpeed: 120, overspeedDecay: 1.5,
  boostThrust: 160, boostSpeed: 240, boostDrain: 0.5, boostRegen: 0.25, assist: true, assistDamp: 2.5,
};
const dt = 1 / 120;

describe('newShip, copyShip and lerpShip', () => {
  const a = () => {
    const s = newShip();
    s.pos.set(1, 2, 3);
    s.vel.set(4, 5, 6);
    s.quat.setFromAxisAngle(new Vector3(0, 1, 0), 0.5);
    s.angVel.set(0.1, 0.2, 0.3);
    s.energy = 0.25;
    s.boosting = true;
    s.boostLocked = true;
    return s;
  };

  it('starts at rest, full of boost and not boosting', () => {
    expect(newShip()).toMatchObject({ energy: 1, boosting: false, boostLocked: false });
  });

  it('copies every field', () => {
    const from = a();
    const to = copyShip(newShip(), from);
    expect(to).toEqual(from);
    expect(to.vel).not.toBe(from.vel);
  });

  it('interpolates every field between two states', () => {
    const from = newShip();
    const to = a();
    const out = lerpShip(newShip(), from, to, 0.5);
    expect(out.pos.toArray()).toEqual([0.5, 1, 1.5]);
    expect(out.vel.toArray()).toEqual([2, 2.5, 3]);
    expect(out.angVel.toArray()).toEqual([0.05, 0.1, 0.15]);
    expect(out.energy).toBe(0.625);
    expect(out.quat.angleTo(new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), 0.25))).toBeLessThan(1e-6);
    expect(out).toMatchObject({ boosting: true, boostLocked: true });
  });
});

describe('stepShip', () => {
  it('holds still with no input and no spin', () => {
    const s = newShip();
    stepShip(s, noControls(), p, dt);
    expect(s.quat.toArray()).toEqual([0, 0, 0, 1]);
    expect(s.vel.toArray()).toEqual([0, 0, 0]);
  });

  it('locks the boost when the tank runs dry, until the button is let go', () => {
    const s = newShip();
    s.energy = 0.002;
    const c = { ...noControls(), boost: true };
    stepShip(s, c, p, dt);
    expect(s.boosting).toBe(true);
    expect(s.energy).toBe(0);
    expect(s.boostLocked).toBe(true);
    // still held: no boost while it refills
    stepShip(s, c, p, dt);
    expect(s.boosting).toBe(false);
    expect(s.energy).toBeCloseTo(p.boostRegen * dt);
    expect(s.boostLocked).toBe(true);
    // let go and press again: boosts
    stepShip(s, noControls(), p, dt);
    expect(s.boostLocked).toBe(false);
    stepShip(s, c, p, dt);
    expect(s.boosting).toBe(true);
  });

  it('will not boost on an empty tank', () => {
    const s = newShip();
    s.energy = 0;
    stepShip(s, { ...noControls(), boost: true }, p, dt);
    expect(s.boosting).toBe(false);
    expect(s.boostLocked).toBe(false);
  });

  it('with no thrust, flight assist stops a backwards drift but keeps forward speed', () => {
    const back = newShip();
    back.vel.set(0, 0, 10); // forward is -z
    stepShip(back, noControls(), p, dt);
    expect(back.vel.z).toBeCloseTo(10 * Math.exp(-p.assistDamp * dt));
    const fwd = newShip();
    fwd.vel.set(0, 0, -10);
    stepShip(fwd, noControls(), p, dt);
    expect(fwd.vel.z).toBe(-10);
    // reversing on purpose: not damped
    const rev = newShip();
    rev.vel.set(0, 0, 10);
    stepShip(rev, { ...noControls(), thrust: -1 }, p, dt);
    expect(rev.vel.z).toBeCloseTo(10 + p.reverse * dt);
    // boosting: not damped either (the boost pushes forward)
    const boost = newShip();
    boost.vel.set(0, 0, 10);
    stepShip(boost, { ...noControls(), boost: true }, p, dt);
    expect(boost.vel.z).toBeCloseTo(10 - p.boostThrust * dt);
  });

  it('full forward thrust adds thrust × dt', () => {
    const s = newShip();
    stepShip(s, { ...noControls(), thrust: 1 }, p, dt);
    expect(s.vel.z).toBeCloseTo(-p.thrust * dt);
  });

  it('leaves speed exactly at the cap alone and bleeds off speed above it', () => {
    const at = newShip();
    at.vel.set(0, 0, -p.maxSpeed);
    stepShip(at, noControls(), p, dt);
    expect(at.vel.z).toBe(-p.maxSpeed);
    const over = newShip();
    over.vel.set(0, 0, -200);
    stepShip(over, noControls(), p, dt);
    expect(-over.vel.z).toBeCloseTo(p.maxSpeed + 80 * Math.exp(-p.overspeedDecay * dt));
  });
});
