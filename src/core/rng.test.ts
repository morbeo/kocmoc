import { it, expect } from 'vitest';
import { rng } from './rng';

it('is deterministic per seed and in [0, 1)', () => {
  const a = rng(42);
  const b = rng(42);
  const c = rng(43);
  const xs = Array.from({ length: 100 }, a);
  expect(xs).toEqual(Array.from({ length: 100 }, b));
  expect(xs).not.toEqual(Array.from({ length: 100 }, c));
  expect(xs.every((x) => x >= 0 && x < 1)).toBe(true);
});
