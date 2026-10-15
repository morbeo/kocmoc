import { describe, it, expect } from 'vitest';
import { FixedLoop } from './loop';

describe('FixedLoop', () => {
  it('runs whole steps and keeps the remainder as alpha', () => {
    const loop = new FixedLoop(0.01);
    let n = 0;
    const alpha = loop.advance(0.035, () => n++);
    expect(n).toBe(3);
    expect(alpha).toBeCloseTo(0.5);
    expect(loop.ticks).toBe(3);
    expect(loop.time).toBeCloseTo(0.03);
  });

  it('accumulates small frames until a step is due', () => {
    const loop = new FixedLoop(0.01);
    let n = 0;
    loop.advance(0.004, () => n++);
    loop.advance(0.004, () => n++);
    expect(n).toBe(0);
    loop.advance(0.004, () => n++);
    expect(n).toBe(1);
  });

  it('same total time gives the same number of ticks regardless of frame pattern', () => {
    const a = new FixedLoop(1 / 120);
    const b = new FixedLoop(1 / 120);
    let na = 0;
    let nb = 0;
    for (let i = 0; i < 60; i++) a.advance(1 / 60, () => na++);
    for (let i = 0; i < 144; i++) b.advance(1 / 144, () => nb++);
    expect(Math.abs(na - nb)).toBeLessThanOrEqual(1);
    expect(na).toBeGreaterThanOrEqual(119);
  });

  it('caps steps per frame and drops the backlog', () => {
    const loop = new FixedLoop(0.01, 4);
    let n = 0;
    const alpha = loop.advance(1, () => n++);
    expect(n).toBe(4);
    expect(alpha).toBeLessThan(1);
    n = 0;
    loop.advance(0, () => n++);
    expect(n).toBe(0);
  });

  it('ignores negative dt', () => {
    const loop = new FixedLoop(0.01);
    let n = 0;
    loop.advance(-1, () => n++);
    loop.advance(0.01, () => n++);
    expect(n).toBe(1);
  });
});
