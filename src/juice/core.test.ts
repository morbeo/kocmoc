import { describe, it, expect } from 'vitest';
import { Particles, TimeWarp, Trauma, bankAngle, fovKick, shakeNoise, springStep } from './core';

describe('Trauma', () => {
  it('adds up to 1, decays linearly and shakes with its square', () => {
    const t = new Trauma();
    t.add(0.5);
    t.add(0.8);
    expect(t.value).toBe(1);
    t.step(0.25, 2);
    expect(t.value).toBeCloseTo(0.5);
    expect(t.shake).toBeCloseTo(0.25);
    t.step(10, 2);
    expect(t.value).toBe(0);
  });
});

describe('shakeNoise', () => {
  it('stays in [-1, 1], is continuous and repeatable', () => {
    let prev = shakeNoise(0, 10, 3);
    for (let t = 0.001; t < 2; t += 0.001) {
      const v = shakeNoise(t, 10, 3);
      expect(Math.abs(v)).toBeLessThanOrEqual(1);
      expect(Math.abs(v - prev)).toBeLessThan(0.5);
      prev = v;
    }
    expect(shakeNoise(0.3, 10, 3)).toBe(shakeNoise(0.3, 10, 3));
    expect(shakeNoise(0.3, 10, 3)).not.toBe(shakeNoise(0.3, 10, 4));
  });
});

describe('springStep', () => {
  const run = (damping: number) => {
    const s = { x: 0, v: 0 };
    let peak = 0;
    for (let i = 0; i < 600; i++) {
      springStep(s, 1, 2, damping, 1 / 120);
      peak = Math.max(peak, s.x);
    }
    return { s, peak };
  };
  it('settles on the target', () => {
    expect(run(1).s.x).toBeCloseTo(1, 3);
  });
  it('overshoots when under-damped, not when critical', () => {
    expect(run(0.3).peak).toBeGreaterThan(1.2);
    expect(run(1).peak).toBeLessThanOrEqual(1.0001);
  });
  it('is stable with a long frame', () => {
    const s = { x: 0, v: 0 };
    springStep(s, 1, 8, 0.5, 0.25);
    expect(Number.isFinite(s.x)).toBe(true);
    expect(Math.abs(s.x)).toBeLessThan(3);
  });
});

describe('TimeWarp', () => {
  it('freezes for the hit-stop, then runs normally', () => {
    const w = new TimeWarp();
    w.hitStop(0.05);
    expect(w.step(0.03)).toBe(0);
    expect(w.step(0.03)).toBe(0);
    expect(w.step(0.03)).toBe(1);
  });
  it('slow-mo starts at the given scale and eases back to 1', () => {
    const w = new TimeWarp();
    w.slowMo(0.25, 1);
    expect(w.step(0.1)).toBeCloseTo(0.25);
    let last = 0.25;
    for (let i = 0; i < 9; i++) {
      const s = w.step(0.1);
      expect(s).toBeGreaterThanOrEqual(last);
      last = s;
    }
    expect(w.step(0.1)).toBe(1);
  });
});

describe('fovKick', () => {
  const p = { speed: 10, boost: 6, from: 0.5 };
  it('is zero below the threshold and grows with speed', () => {
    expect(fovKick(40, 100, 0, p)).toBe(0);
    expect(fovKick(75, 100, 0, p)).toBeCloseTo(5);
    expect(fovKick(100, 100, 0, p)).toBeCloseTo(10);
  });
  it('adds the boost kick', () => {
    expect(fovKick(0, 100, 1, p)).toBeCloseTo(6);
  });
});

describe('bankAngle', () => {
  it('rolls into the turn and clamps', () => {
    expect(bankAngle(1, 0.3, 1)).toBeCloseTo(-0.3);
    expect(bankAngle(-10, 0.3, 0.5)).toBeCloseTo(0.5);
  });
});

describe('Particles', () => {
  it('moves, ages, and recycles the oldest slot', () => {
    const p = new Particles(2);
    p.emit(0, 0, 0, 10, 0, 0, 0.5);
    p.step(0.1, 0);
    expect(p.pos[0]).toBeCloseTo(1);
    expect(p.life[0]).toBeCloseTo(0.4);
    p.emit(0, 0, 0, 0, 0, 0, 1);
    p.emit(5, 0, 0, 0, 0, 0, 1); // overwrites slot 0
    expect(p.pos[0]).toBe(5);
    expect(p.alive).toBe(2);
    p.step(2, 0);
    expect(p.alive).toBe(0);
  });
});
