import { describe, it, expect } from 'vitest';
import { applyDeadzone, bindingValue, detectPress, mergePads, padLabel, padLabels, parseSource, radialDeadzone, sourceValue } from './pad';

const pad = (axes: number[] = [], buttons: number[] = []) => ({ axes, buttons });

describe('gamepad sources', () => {
  it('parses buttons and axis halves, rejects junk', () => {
    expect(parseSource('b7')).toEqual({ kind: 'b', index: 7 });
    expect(parseSource(' -a1 ')).toEqual({ kind: 'a', index: 1, sign: -1 });
    expect(parseSource('+a3')).toEqual({ kind: 'a', index: 3, sign: 1 });
    expect(parseSource('a1')).toBeNull();
    expect(parseSource('KeyW')).toBeNull();
  });

  it('reads each axis half as 0..1', () => {
    const p = pad([-0.8, 0.4], [0, 0.6]);
    expect(sourceValue(p, { kind: 'a', index: 0, sign: -1 })).toBeCloseTo(0.8);
    expect(sourceValue(p, { kind: 'a', index: 0, sign: 1 })).toBe(0);
    expect(sourceValue(p, { kind: 'b', index: 1 })).toBeCloseTo(0.6);
    expect(sourceValue(p, { kind: 'b', index: 9 })).toBe(0);
  });

  it('takes the strongest source of a binding', () => {
    expect(bindingValue(pad([0.3], [0, 0.9]), '+a0,b1')).toBeCloseTo(0.9);
    expect(bindingValue(pad([0.3]), '')).toBe(0);
  });
});

describe('deadzone', () => {
  it('is radial and rescaled', () => {
    expect(radialDeadzone(0.1, 0.1, 0.2)).toEqual([0, 0]);
    const [x, y] = radialDeadzone(0.6, 0, 0.2);
    expect(x).toBeCloseTo(0.5);
    expect(y).toBe(0);
    // full deflection stays full, direction kept
    const [dx, dy] = radialDeadzone(Math.SQRT1_2, Math.SQRT1_2, 0.2);
    expect(Math.hypot(dx, dy)).toBeCloseTo(1);
    expect(dx).toBeCloseTo(dy);
  });

  it('pairs sticks and treats extra axes alone', () => {
    const out = applyDeadzone([0.1, 0.1, 1, 0, 0.1], 0.2);
    expect(out.slice(0, 2)).toEqual([0, 0]);
    expect(out[2]).toBeCloseTo(1);
    expect(out[4]).toBe(0);
  });
});

describe('pads', () => {
  it('merge by furthest push', () => {
    const m = mergePads([pad([0.2, -0.9], [1, 0]), pad([-0.5, 0.1], [0, 0.4])]);
    expect(m.axes).toEqual([-0.5, -0.9]);
    expect(m.buttons).toEqual([1, 0.4]);
  });

  it('detect a fresh press for rebinding, ignoring what was already held', () => {
    expect(detectPress(pad([0, 0], [1]), pad([0, 0], [1]))).toBeNull();
    expect(detectPress(pad([0, 0], [0, 0]), pad([0, 0], [0, 1]))).toBe('b1');
    expect(detectPress(pad([0, 0]), pad([0, -0.7]))).toBe('-a1');
    // a trigger resting at -1 on a non-standard pad does not count
    expect(detectPress(pad([0, 0, -1]), pad([0, 0, -1]))).toBeNull();
  });

  it('labels standard buttons and stick directions', () => {
    expect(padLabel('b0')).toBe('A');
    expect(padLabel('b7')).toBe('RT');
    expect(padLabel('-a1')).toBe('LS ↑');
    expect(padLabel('+a2')).toBe('RS →');
    expect(padLabel('b20')).toBe('B20');
    expect(padLabel('+a5')).toBe('Axis 5+');
    expect(padLabels('b0,b10')).toBe('A / L3');
  });
});
