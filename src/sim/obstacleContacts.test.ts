// Direct checks of gauntlet plane and rock contacts on a straight stretch of track
// (gauntlet.test.ts covers them through generated gauntlets and autopilot laps).
import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import type { Nearest, Track } from '../gen/track';
import type { Gauntlet, Plane } from '../gen/gauntlet';
import { newShip, type ShipState } from './ship';
import { arcDelta, collideObstacles, newObstacleResult, rockCentres, type ObstacleParams } from './gauntlet';

/** A closed 1 km tube along +z sampled every 10 m: right = +x, up = +y. */
const n = 100;
const track = {
  closed: true,
  length: 1000,
  radius: 40,
  pos: Array.from({ length: n }, (_, i) => new Vector3(0, 0, i * 10)),
  s: Array.from({ length: n }, (_, i) => i * 10),
  tan: Array.from({ length: n }, () => new Vector3(0, 0, 1)),
  up: Array.from({ length: n }, () => new Vector3(0, 1, 0)),
  right: Array.from({ length: n }, () => new Vector3(1, 0, 0)),
} as unknown as Track;
const nearAt = (s: number): Nearest => {
  const index = Math.floor(s / 10);
  return { index, t: (s - index * 10) / 10, s, point: new Vector3(0, 0, s), dist: 0 };
};
const shipAt = (x: number, y: number, z: number, vz = 0, vy = 0): ShipState => {
  const ship = newShip();
  ship.pos.set(x, y, z);
  ship.vel.set(0, vy, vz);
  return ship;
};
const p: ObstacleParams = { shipRadius: 1.5, bounce: 0.3, nearMiss: 1 };

describe('arcDelta', () => {
  it('wraps to (-L/2, L/2]', () => {
    expect(arcDelta(10, 990, 1000)).toBe(20);
    expect(arcDelta(990, 10, 1000)).toBe(-20);
    expect(arcDelta(500, 0, 1000)).toBe(500);
    expect(arcDelta(0, 500, 1000)).toBe(500);
    expect(arcDelta(499, 0, 1000)).toBe(499);
    expect(arcDelta(0, 499, 1000)).toBe(-499);
  });
});

describe('collideObstacles: planes', () => {
  // a 2 m thick wall at s = 500 with a fixed round hole 5 m across the middle (passable within 3.5 m)
  const wall: Plane = { kind: 'ring', s: 500, thickness: 2, shape: { k: 'hole', r: 0, a0: 0, omega: 0, gap: 5 } } as Plane;
  const g: Gauntlet = { chunks: [], planes: [wall], rocks: [], lanes: [] };
  const hit = (ship: ShipState, prevS: number, s: number) => collideObstacles(g, ship, track, nearAt(s), prevS, 0, p, newObstacleResult());

  it('lets the ship through the hole', () => {
    const ship = shipAt(1, 1, 500, 20);
    const r = hit(ship, 499, 500);
    expect(r).toMatchObject({ impact: 0, contact: false, nearMiss: false });
    expect(ship.pos.z).toBe(500);
  });

  it('puts a blocked ship back on its side of the wall and bounces it', () => {
    const ship = shipAt(4, 0, 499, 20);
    const r = hit(ship, 497, 499);
    expect(r.contact).toBe(true);
    expect(r.impact).toBe(20);
    expect(ship.pos.z).toBeCloseTo(497.5);
    expect(ship.vel.z).toBeCloseTo(20 - 1.3 * 20);
    expect(r.point.toArray()).toEqual([4, 0, 499]);
    // from the far side, it goes back out the far side
    const back = shipAt(4, 0, 501, -10);
    expect(hit(back, 503, 501).impact).toBe(10);
    expect(back.pos.z).toBeCloseTo(502.5);
    expect(back.vel.z).toBeCloseTo(-10 + 1.3 * 10);
  });

  it('catches a fast ship that went right through in one step', () => {
    const ship = shipAt(4, 0, 510, 2000);
    expect(hit(ship, 490, 510).impact).toBe(2000);
    expect(ship.pos.z).toBeCloseTo(497.5);
  });

  it('pushes but does not bounce a ship already moving away', () => {
    const ship = shipAt(4, 0, 499, -5);
    const r = hit(ship, 497, 499);
    expect(r.contact).toBe(true);
    expect(r.impact).toBe(0);
    expect(ship.vel.z).toBe(-5);
  });

  it('starting inside the wall, goes back the way it came from', () => {
    const fwd = shipAt(4, 0, 500.5, 10);
    hit(fwd, 500, 500.5);
    expect(fwd.pos.z).toBeCloseTo(497.5);
    const rev = shipAt(4, 0, 500.5, -10);
    hit(rev, 500, 500.5);
    expect(rev.pos.z).toBeCloseTo(502.5);
    const still = shipAt(4, 0, 500.5, 0);
    hit(still, 500, 500.5);
    expect(still.pos.z).toBeCloseTo(497.5);
  });

  it('ignores the wall until the ship is within its thickness plus the ship radius', () => {
    for (const [prevS, s] of [[490, 495], [496, 497.5], [503, 502.5]]) {
      const ship = shipAt(4, 0, s, 20);
      expect(hit(ship, prevS, s).contact).toBe(false);
      expect(ship.pos.z).toBe(s);
    }
    // a jump across it (a respawn), not a step through it
    const jump = shipAt(4, 0, 520, 20);
    expect(hit(jump, 450, 520).contact).toBe(false);
    const wrap = shipAt(4, 0, 540, 20);
    expect(hit(wrap, 470, 540).contact).toBe(false);
  });

  it('flags a near miss through the hole edge when crossing the wall', () => {
    expect(hit(shipAt(3, 0, 501, 20), 499, 501).nearMiss).toBe(true);
    expect(hit(shipAt(0, -3, 501, 20), 499, 501).nearMiss).toBe(true);
    // not crossing yet, or comfortably clear
    expect(hit(shipAt(3, 0, 499.5, 20), 499, 499.5).nearMiss).toBe(false);
    expect(hit(shipAt(2, 0, 501, 20), 499, 501).nearMiss).toBe(false);
  });
});

describe('collideObstacles: rocks', () => {
  const g: Gauntlet = { chunks: [], planes: [], rocks: [{ s: 300, x: 0, y: 0, r: 3 }], lanes: [] };
  const hit = (ship: ShipState, prevS: number, s: number) => collideObstacles(g, ship, track, nearAt(s), prevS, 0, p, newObstacleResult());

  it('caches the rock centres per gauntlet', () => {
    const c = rockCentres(g, track);
    expect(c.map((v) => v.toArray())).toEqual([[0, 0, 300]]);
    expect(rockCentres(g, track)).toBe(c);
  });

  it('pushes the ship out of a rock and bounces it', () => {
    const ship = shipAt(0, 4, 300, 0, -10);
    const r = hit(ship, 299, 300);
    expect(r.contact).toBe(true);
    expect(r.impact).toBeCloseTo(10);
    expect(ship.pos.toArray()).toEqual([0, 4.5, 300]);
    expect(ship.vel.y).toBeCloseTo(-10 + 1.3 * 10);
    expect(r.point.toArray()).toEqual([0, 3, 300]);
    // overlapping but leaving: pushed out, not bounced
    const away = shipAt(0, -4, 300, 0, -10);
    expect(hit(away, 299, 300).impact).toBe(0);
    expect(away.pos.y).toBeCloseTo(-4.5);
    expect(away.vel.y).toBe(-10);
  });

  it('counts a close pass as a near miss only as it goes by', () => {
    const touching = shipAt(0, 4.5, 300.5, 20);
    expect(hit(touching, 299.5, 300.5)).toMatchObject({ contact: false, nearMiss: true });
    expect(touching.pos.y).toBe(4.5);
    expect(hit(shipAt(0, 5.4, 300.5, 20), 299.5, 300.5).nearMiss).toBe(true);
    expect(hit(shipAt(0, 5.6, 300.5, 20), 299.5, 300.5).nearMiss).toBe(false);
    expect(hit(shipAt(0, 5, 299.8, 20), 299.5, 299.8).nearMiss).toBe(false);
    expect(hit(shipAt(0, 5, 300.8, 20), 300.5, 300.8).nearMiss).toBe(false);
  });

  it('leaves a ship dead on the centre where it is', () => {
    const ship = shipAt(0, 0, 300, 20);
    expect(hit(ship, 300, 300).contact).toBe(false);
    expect(ship.pos.toArray()).toEqual([0, 0, 300]);
  });
});
