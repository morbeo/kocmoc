import { describe, it, expect } from 'vitest';
import { applyCurve } from './curve';

const linear = { deadzone: 0, expo: 1, sensitivity: 1 };

describe('applyCurve', () => {
  it('linear passes through', () => {
    expect(applyCurve(0.3, linear)).toBeCloseTo(0.3);
    expect(applyCurve(-0.7, linear)).toBeCloseTo(-0.7);
  });

  it('deadzone zeroes small inputs and rescales the rest', () => {
    const c = { ...linear, deadzone: 0.2 };
    expect(applyCurve(0.1, c)).toBe(0);
    expect(applyCurve(-0.2, c)).toBe(0);
    expect(applyCurve(0.6, c)).toBeCloseTo(0.5);
    expect(applyCurve(1, c)).toBeCloseTo(1);
  });

  it('expo softens the centre and keeps full deflection and sign', () => {
    const c = { ...linear, expo: 2 };
    expect(applyCurve(0.5, c)).toBeCloseTo(0.25);
    expect(applyCurve(-0.5, c)).toBeCloseTo(-0.25);
    expect(applyCurve(1, c)).toBeCloseTo(1);
  });

  it('sensitivity scales and the output is clamped', () => {
    expect(applyCurve(0.25, { ...linear, sensitivity: 2 })).toBeCloseTo(0.5);
    expect(applyCurve(0.9, { ...linear, sensitivity: 2 })).toBe(1);
    expect(applyCurve(5, linear)).toBe(1);
  });
});
