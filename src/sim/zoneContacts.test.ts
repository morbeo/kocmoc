// Direct checks of pad effects and mover collisions on a straight stretch of track
// (zones.test.ts covers them through whole autopilot laps).
import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import type { Nearest, Track } from '../gen/track';
import type { Pad } from '../gen/pads';
import type { Mover } from '../gen/movers';
import { newShip, type ShipState } from './ship';
import { collideMovers, stepPads, type PadEffect } from './zones';

/** A straight tube along +z: right = +x, up = +y. */
const track = {
  length: 1000,
  radius: 40,
  tan: [new Vector3(0, 0, 1)],
  up: [new Vector3(0, 1, 0)],
  right: [new Vector3(1, 0, 0)],
} as unknown as Track;
const nearAt = (s: number): Nearest => ({ index: 0, t: 0, s, point: new Vector3(0, 0, s), dist: 0 });
const shipAt = (x: number, y: number, z: number, vel = new Vector3()): ShipState => {
  const ship = newShip();
  ship.pos.set(x, y, z);
  ship.vel.copy(vel);
  return ship;
};
const R = 1.5;
const bounce = 0.3;

describe('stepPads', () => {
  const fx: PadEffect = { accel: 100, speed: 230, drag: 2 };
  // a boost strip on the floor (theta -90°) and a slow field with its clear lane up top
  const boost: Pad = { kind: 'boost', s0: 100, s1: 200, theta: -Math.PI / 2, half: 0.3, depth: 5, w: 0 };
  const slow: Pad = { kind: 'slow', s0: 300, s1: 400, theta: Math.PI / 2, half: 0, depth: 0, w: 20 };
  const pads = [boost, slow];
  const floor = (s: number, vz: number) => shipAt(0, -38, s, new Vector3(0, 0, vz));

  it('pushes forward over a boost strip up to the pad speed, and reports entering it once', () => {
    const st = { pad: -1 };
    const ship = floor(150, 0);
    expect(stepPads(pads, ship, track, nearAt(150), fx, 0.1, st)).toBe('boost');
    expect(ship.vel.z).toBeCloseTo(10);
    expect(st.pad).toBe(0);
    expect(stepPads(pads, ship, track, nearAt(150), fx, 0.1, st)).toBeNull();
    expect(ship.vel.z).toBeCloseTo(20);
    // close to the pad speed: only the rest of the way
    const fast = floor(150, 225);
    stepPads(pads, fast, track, nearAt(150), fx, 0.1, st);
    expect(fast.vel.z).toBeCloseTo(230);
    // at or above it: nothing
    const faster = floor(150, 230);
    stepPads(pads, faster, track, nearAt(150), fx, 0.1, st);
    expect(faster.vel.z).toBe(230);
  });

  it('covers its ends, and nothing outside them or off the strip', () => {
    for (const s of [100, 200]) expect(stepPads(pads, floor(s, 0), track, nearAt(s), fx, 0.1, { pad: -1 })).toBe('boost');
    for (const s of [99.9, 200.1]) {
      const st = { pad: 0 };
      const ship = floor(s, 0);
      expect(stepPads(pads, ship, track, nearAt(s), fx, 0.1, st)).toBeNull();
      expect(st.pad).toBe(-1);
      expect(ship.vel.z).toBe(0);
    }
    // the ceiling is not the strip
    const up = shipAt(0, 38, 150);
    stepPads(pads, up, track, nearAt(150), fx, 0.1, { pad: -1 });
    expect(up.vel.z).toBe(0);
  });

  it('drags the ship down in a slow field, but not in its clear lane', () => {
    const st = { pad: -1 };
    const murk = shipAt(0, -10, 350, new Vector3(3, 0, 100));
    expect(stepPads(pads, murk, track, nearAt(350), fx, 0.5, st)).toBe('slow');
    expect(murk.vel.z).toBeCloseTo(100 * Math.exp(-1));
    expect(murk.vel.x).toBeCloseTo(3 * Math.exp(-1));
    const lane = shipAt(0, 30, 350, new Vector3(0, 0, 100));
    expect(stepPads(pads, lane, track, nearAt(350), fx, 0.5, { pad: -1 })).toBeNull();
    expect(lane.vel.z).toBe(100);
  });
});

describe('collideMovers', () => {
  // a rock above the line at x = 5: hangs at y = 10 for 5 s, falls to -10 over 2 s, then is gone for 3 s
  const rock: Mover = { kind: 'rock', s: 100, x: 5, top: 10, bottom: -10, r: 3, period: 10, phase: 0, hang: 5, fall: 2 };

  it('pushes the ship out of a hanging rock and bounces it off', () => {
    const ship = shipAt(5, 6, 100, new Vector3(0, 10, 0));
    const impact = collideMovers([rock], ship, track, nearAt(100), 0, R, bounce);
    expect(impact).toBeCloseTo(10);
    expect(ship.pos.toArray()).toEqual([5, 5.5, 100]);
    expect(ship.vel.y).toBeCloseTo(10 - 1.3 * 10);
  });

  it('pushes out along the track when the rock is ahead', () => {
    const ship = shipAt(5, 10, 104, new Vector3(0, 0, -2));
    expect(collideMovers([rock], ship, track, nearAt(104), 0, R, bounce)).toBeCloseTo(2);
    expect(ship.pos.z).toBeCloseTo(104.5);
    expect(ship.vel.z).toBeCloseTo(-2 + 1.3 * 2);
  });

  it('pushes straight down out of a rock centred on the ship', () => {
    const ship = shipAt(5, 10, 100);
    expect(collideMovers([rock], ship, track, nearAt(100), 0, R, bounce)).toBe(0);
    expect(ship.pos.toArray()).toEqual([5, 10 - 4.5, 100]);
  });

  it('hits a falling rock by its own speed, and misses it once it has gone', () => {
    // t = 6: halfway down the fall, at y = 5, falling at 10 m/s
    const ship = shipAt(5, 1, 100);
    expect(collideMovers([rock], ship, track, nearAt(100), 6, R, bounce)).toBeCloseTo(10);
    expect(ship.pos.y).toBeCloseTo(0.5);
    expect(ship.vel.y).toBeCloseTo(-1.3 * 10);
    const gone = shipAt(5, -10, 100, new Vector3(0, -5, 0));
    expect(collideMovers([rock], gone, track, nearAt(100), 8, R, bounce)).toBe(0);
    expect(gone.pos.y).toBe(-10);
    expect(gone.vel.y).toBe(-5);
  });

  it('leaves a ship just touching, or moving away, alone', () => {
    const touching = shipAt(5, 10 - 4.5, 100, new Vector3(0, 10, 0));
    expect(collideMovers([rock], touching, track, nearAt(100), 0, R, bounce)).toBe(0);
    expect(touching.pos.y).toBe(5.5);
    expect(touching.vel.y).toBe(10);
    // overlapping but already leaving: pushed out, not bounced
    const leaving = shipAt(5, 6, 100, new Vector3(0, -10, 0));
    expect(collideMovers([rock], leaving, track, nearAt(100), 0, R, bounce)).toBe(0);
    expect(leaving.pos.y).toBeCloseTo(5.5);
    expect(leaving.vel.y).toBe(-10);
    // too far along the track to reach
    const far = shipAt(5, 10, 104.6);
    expect(collideMovers([rock], far, track, nearAt(104.6), 0, R, bounce)).toBe(0);
    expect(far.pos.z).toBe(104.6);
  });

  // a still platform 12 m wide, 2 m thick, 10 m long, flat across the tube
  const slab = (over: Partial<Extract<Mover, { kind: 'slab' }>> = {}): Mover => ({ kind: 'slab', s: 200, a: 0, off: 0, amp: 0, period: 4, phase: 0, hw: 6, ht: 1, hl: 5, ...over });

  it('pushes the ship off a slab face', () => {
    const above = shipAt(2, 2, 200, new Vector3(0, -4, 0));
    expect(collideMovers([slab()], above, track, nearAt(200), 0, R, bounce)).toBeCloseTo(4);
    expect(above.pos.toArray()).toEqual([2, 2.5, 200]);
    expect(above.vel.y).toBeCloseTo(-4 + 1.3 * 4);
    const below = shipAt(-3, -2, 200);
    collideMovers([slab()], below, track, nearAt(200), 0, R, bounce);
    expect(below.pos.toArray()).toEqual([-3, -2.5, 200]);
    const side = shipAt(7, 0, 200);
    collideMovers([slab()], side, track, nearAt(200), 0, R, bounce);
    expect(side.pos.toArray()).toEqual([7.5, 0, 200]);
    const behind = shipAt(0, 0, 194);
    collideMovers([slab()], behind, track, nearAt(194), 0, R, bounce);
    expect(behind.pos.z).toBeCloseTo(193.5);
  });

  it('pushes off a corner along the diagonal', () => {
    const ship = shipAt(6.6, 1.8, 200);
    collideMovers([slab()], ship, track, nearAt(200), 0, R, bounce);
    // 1 m from the corner, pushed out to 1.5 m
    expect(ship.pos.x).toBeCloseTo(6 + 0.6 * 1.5);
    expect(ship.pos.y).toBeCloseTo(1 + 0.8 * 1.5);
  });

  it('turns with the slab and sits at its offset', () => {
    // standing on edge: `a` along up, so its thin side faces right; its path is 3 m off, towards -x
    const ship = shipAt(-3 + 2, 4, 200);
    collideMovers([slab({ a: Math.PI / 2, off: 3 })], ship, track, nearAt(200), 0, R, bounce);
    expect(ship.pos.x).toBeCloseTo(-3 + 2.5);
    expect(ship.pos.y).toBeCloseTo(4);
    const other = shipAt(-3 - 2, -4, 200);
    collideMovers([slab({ a: Math.PI / 2, off: 3 })], other, track, nearAt(200), 0, R, bounce);
    expect(other.pos.x).toBeCloseTo(-3 - 2.5);
    expect(other.pos.y).toBeCloseTo(-4);
  });

  it('pushes a ship inside a slab out through the nearest face', () => {
    const cases: [Partial<Extract<Mover, { kind: 'slab' }>>, [number, number, number], [number, number, number]][] = [
      [{}, [0, 0.2, 200], [0, 0.2 + 0.8 + R, 200]],
      [{}, [1, -0.4, 200], [1, -0.4 - 0.6 - R, 200]],
      [{}, [0, 0, 200], [0, 1 + R, 200]],
      [{ hw: 1, ht: 6 }, [0.7, 0, 200], [0.7 + 0.3 + R, 0, 200]],
      [{ hw: 1, ht: 6 }, [-0.5, 0, 200], [-0.5 - 0.5 - R, 0, 200]],
      [{ hw: 1, ht: 6 }, [0, 0, 200], [1 + R, 0, 200]],
      [{ hw: 6, ht: 6, hl: 1 }, [0, 0, 200.4], [0, 0, 200.4 + 0.6 + R]],
      [{ hw: 6, ht: 6, hl: 1 }, [0, 0, 199.8], [0, 0, 199.8 - 0.8 - R]],
    ];
    for (const [over, from, to] of cases) {
      const ship = shipAt(...from);
      collideMovers([slab(over)], ship, track, nearAt(from[2]), 0, R, bounce);
      expect(ship.pos.x).toBeCloseTo(to[0]);
      expect(ship.pos.y).toBeCloseTo(to[1]);
      expect(ship.pos.z).toBeCloseTo(to[2]);
    }
  });

  it('bounces off a moving slab by the speed it hits you with', () => {
    // drifting along +x at 2π m/s at t = 0; the ship sits still against its right end
    const ship = shipAt(7, 0, 200);
    expect(collideMovers([slab({ amp: 4 })], ship, track, nearAt(200), 0, R, bounce)).toBeCloseTo(2 * Math.PI);
    expect(ship.vel.x).toBeCloseTo(1.3 * 2 * Math.PI);
    // its far end moves away from a ship there: pushed out, no bounce
    const behind = shipAt(-7, 0, 200);
    expect(collideMovers([slab({ amp: 4 })], behind, track, nearAt(200), 0, R, bounce)).toBe(0);
    expect(behind.vel.x).toBe(0);
  });

  it('reports the hardest of several contacts', () => {
    const ship = shipAt(5, 6, 100, new Vector3(0, 10, 0));
    const softer: Mover = { ...rock, s: 101 };
    expect(collideMovers([softer, rock], ship, track, nearAt(100), 0, R, bounce)).toBeGreaterThan(0);
    const one = shipAt(5, 6, 100, new Vector3(0, 10, 0));
    const first = collideMovers([rock], one, track, nearAt(100), 0, R, bounce);
    const two = shipAt(5, 6, 100, new Vector3(0, 10, 0));
    expect(collideMovers([rock, { ...rock, x: 40 }], two, track, nearAt(100), 0, R, bounce)).toBe(first);
  });
});
