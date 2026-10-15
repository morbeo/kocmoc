import { describe, it, expect } from 'vitest';
import { moveStick, recenterStick, stickAxes, ramp } from './stick';

describe('virtual stick', () => {
  it('accumulates movement and clamps to the radius', () => {
    const s = { x: 0, y: 0 };
    moveStick(s, 30, 40, 100);
    expect(s).toEqual({ x: 30, y: 40 });
    moveStick(s, 300, 400, 100);
    expect(Math.hypot(s.x, s.y)).toBeCloseTo(100);
    expect(s.x / s.y).toBeCloseTo(0.75);
  });

  it('maps right → yaw right and up → pitch up', () => {
    expect(stickAxes({ x: 50, y: -100 }, 100)).toEqual({ yaw: 0.5, pitch: 1 });
    expect(stickAxes({ x: 5, y: 5 }, 0)).toEqual({ yaw: 0, pitch: 0 });
  });

  it('recenters exponentially, or not at all at rate 0', () => {
    const s = { x: 100, y: 0 };
    recenterStick(s, Math.LN2, 1);
    expect(s.x).toBeCloseTo(50);
    recenterStick(s, 0, 10);
    expect(s.x).toBeCloseTo(50);
  });
});

describe('ramp', () => {
  it('moves at a fixed rate and lands exactly on the target', () => {
    expect(ramp(0, 1, 4, 0.1)).toBeCloseTo(0.4);
    expect(ramp(0.9, 1, 4, 0.1)).toBe(1);
    expect(ramp(1, -1, 4, 0.1)).toBeCloseTo(0.6);
  });

  it('rate 0 is instant', () => {
    expect(ramp(0, -1, 0, 0.01)).toBe(-1);
  });
});
