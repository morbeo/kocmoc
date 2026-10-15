import { describe, it, expect } from 'vitest';
import { dragAxes, wrapDeg, screenDown, screenTilt, tiltAxes } from './touch';

const tilt = (beta: number, gamma: number, angle = 0) => screenTilt(screenDown(beta, gamma, angle));

describe('dragAxes', () => {
  it('maps drag right → +x and drag up → +y', () => {
    expect(dragAxes(30, -40, 100)).toEqual({ x: 0.3, y: 0.4 });
  });

  it('clamps to the unit circle, keeping direction', () => {
    const a = dragAxes(300, 400, 100);
    expect(Math.hypot(a.x, a.y)).toBeCloseTo(1);
    expect(a.x / a.y).toBeCloseTo(-0.75);
  });

  it('is zero for a non-positive radius', () => {
    expect(dragAxes(10, 10, 0)).toEqual({ x: 0, y: 0 });
  });
});

describe('wrapDeg', () => {
  it('wraps into [-180, 180)', () => {
    expect(wrapDeg(190)).toBe(-170);
    expect(wrapDeg(-190)).toBe(170);
    expect(wrapDeg(540)).toBe(-180);
    expect(wrapDeg(45)).toBe(45);
  });
});

describe('screen tilt', () => {
  it('flat is 0/0, upright portrait is pitch 90', () => {
    expect(tilt(0, 0).side).toBeCloseTo(0);
    expect(tilt(0, 0).pitch).toBeCloseTo(0);
    expect(tilt(90, 0).pitch).toBeCloseTo(90);
  });

  it('portrait: right edge down is +side', () => {
    expect(tilt(45, 20).side).toBeGreaterThan(0);
    expect(tilt(45, -20).side).toBeLessThan(0);
  });

  it('landscape (90°): device bottom on the right; lowering it is +side, raising the top edge is +pitch', () => {
    // device bottom = screen right; tilting the top of the device up lowers the bottom
    expect(tilt(20, -45, 90).side).toBeCloseTo(20);
    // screen top = device right side; gamma -90 = right side straight up = upright landscape
    expect(tilt(0, -90, 90).pitch).toBeCloseTo(90);
    expect(tilt(0, -40, 90).pitch).toBeCloseTo(40);
  });

  it('landscape (270°) mirrors 90°', () => {
    expect(tilt(20, 45, 270).side).toBeCloseTo(-20);
    expect(tilt(0, 40, 270).pitch).toBeCloseTo(40);
  });

  it('stays continuous through upright landscape, where gamma flips', () => {
    // just past upright, browsers report gamma ≈ +89 with beta ≈ ±180 instead of gamma ≈ -91
    const before = tilt(0, -89, 90).pitch;
    const after = tilt(180, 89, 90).pitch;
    expect(before).toBeCloseTo(89);
    expect(after).toBeCloseTo(91);
  });
});

describe('tiltAxes', () => {
  it('scales by range relative to the neutral pitch and clamps', () => {
    expect(tiltAxes({ side: 10, pitch: 50 }, 40, 20)).toEqual({ side: 0.5, pitch: 0.5 });
    expect(tiltAxes({ side: -90, pitch: 0 }, 40, 20)).toEqual({ side: -1, pitch: -1 });
  });

  it('wraps the pitch difference', () => {
    expect(tiltAxes({ side: 0, pitch: -175 }, 175, 20).pitch).toBeCloseTo(0.5);
  });

  it('is zero for a non-positive range', () => {
    expect(tiltAxes({ side: 10, pitch: 10 }, 0, 0)).toEqual({ side: 0, pitch: 0 });
  });
});
