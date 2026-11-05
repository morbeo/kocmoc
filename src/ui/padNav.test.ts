import { describe, it, expect } from 'vitest';
import { nearestInDir } from './padNav';

const b = (x: number, y: number) => ({ x, y, w: 10, h: 10 });

describe('pad menu navigation', () => {
  // a 3x2 grid
  const grid = [b(0, 0), b(20, 0), b(40, 0), b(0, 20), b(20, 20), b(40, 20)];

  it('moves to the neighbour in each direction', () => {
    expect(nearestInDir(b(20, 0), grid, 'right')).toBe(2);
    expect(nearestInDir(b(20, 0), grid, 'left')).toBe(0);
    expect(nearestInDir(b(20, 0), grid, 'down')).toBe(4);
    expect(nearestInDir(b(20, 20), grid, 'up')).toBe(1);
  });

  it('returns -1 at an edge', () => {
    expect(nearestInDir(b(40, 0), grid, 'right')).toBe(-1);
    expect(nearestInDir(b(0, 0), grid, 'up')).toBe(-1);
  });

  it('prefers the item in line over a closer diagonal one', () => {
    expect(nearestInDir(b(0, 0), [b(12, 12), b(0, 30)], 'down')).toBe(1);
  });
});
