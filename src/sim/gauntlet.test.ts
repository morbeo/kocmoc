import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams } from '../gen/track';
import { pointOnTrack, type Gauntlet } from '../gen/gauntlet';
import { newShip } from './ship';
import { arcDelta, collideObstacles, newObstacleResult, type ObstacleParams } from './gauntlet';
import { newRace, spawnOnTrack, stepRace, type WallParams } from './race';

const gen: RaceGenParams = {
  seed: 3,
  points: 10,
  radius: 300,
  wobble: 0.3,
  height: 60,
  twist: 0,
  twistNoise: 0,
  tubeRadius: 20,
  spacing: 4,
  checkpoints: 4,
};
const track = generateTrack(gen);
const op: ObstacleParams = { shipRadius: 1.5, bounce: 0.3, nearMiss: 2 };
const S = 300;
/** one static ring at s = 300 with its 5 m hole centred 10 m to the right */
const ring: Gauntlet = {
  chunks: [],
  planes: [{ kind: 'ring', s: S, thickness: 1.5, shape: { k: 'hole', r: 10, a0: 0, omega: 0, gap: 5 } }],
  rocks: [],
};

/** Move the ship from (s0, x, y) to (s1, x, y) in one step and collide. */
function pass(g: Gauntlet, s0: number, s1: number, x: number, y: number) {
  const ship = newShip();
  spawnOnTrack(ship, track, s1, 50);
  pointOnTrack(track, s1, x, y, ship.pos);
  const near = nearestOnTrack(track, ship.pos);
  const res = collideObstacles(g, ship, track, near, s0, 0, op, newObstacleResult());
  const after = nearestOnTrack(track, ship.pos);
  return { ship, res, s: after.s };
}

describe('arcDelta', () => {
  it('wraps across the seam', () => {
    expect(arcDelta(10, 990, 1000)).toBeCloseTo(20);
    expect(arcDelta(990, 10, 1000)).toBeCloseTo(-20);
    expect(arcDelta(300, 200, 1000)).toBeCloseTo(100);
  });
});

describe('collideObstacles', () => {
  it('lets the ship through the hole', () => {
    const { res, s } = pass(ring, S - 1, S + 1, 10, 0);
    expect(res.contact).toBe(false);
    expect(res.impact).toBe(0);
    expect(s).toBeGreaterThan(S);
  });

  it('bounces the ship off the solid part, back on the side it came from', () => {
    const { ship, res, s } = pass(ring, S - 1, S + 0.5, -10, 0);
    expect(res.contact).toBe(true);
    expect(res.impact).toBeGreaterThan(40);
    expect(s).toBeLessThan(S - 0.75);
    const i = Math.floor((S / track.length) * track.pos.length);
    expect(ship.vel.dot(track.tan[i])).toBeLessThan(0);
  });

  it('does not let a fast ship tunnel through a thin plane', () => {
    const { res, s } = pass(ring, S - 4, S + 4, -10, 0);
    expect(res.contact).toBe(true);
    expect(s).toBeLessThan(S);
  });

  it('reports a near miss at the edge of the hole', () => {
    expect(pass(ring, S - 1, S + 1, 10 + 2.5, 0).res.nearMiss).toBe(true);
    expect(pass(ring, S - 1, S + 1, 10, 0).res.nearMiss).toBe(false);
  });

  it('pushes the ship out of a debris rock', () => {
    const rocks: Gauntlet = { chunks: [], planes: [], rocks: [{ s: S, x: 0, y: 0, r: 3 }] };
    const { ship, res } = pass(rocks, S - 5, S - 3, 0, 0);
    expect(res.contact).toBe(true);
    expect(res.impact).toBeGreaterThan(0);
    const c = pointOnTrack(track, S, 0, 0, new Vector3());
    expect(ship.pos.distanceTo(c)).toBeCloseTo(3 + op.shipRadius, 3);
  });
});

describe('race events', () => {
  const walls: WallParams = { shipRadius: 1.5, bounce: 0.3, scrape: 1 };
  const dt = 1 / 120;

  it('emits start, checkpoint and lap events in order', () => {
    const ship = newShip();
    let s = -20;
    spawnOnTrack(ship, track, s, 100);
    const r = newRace(track, ship);
    while (s < track.length + 10) {
      s += 100 * dt;
      spawnOnTrack(ship, track, s, 100);
      stepRace(r, ship, track, walls, dt);
    }
    expect(r.events.map((e) => e.type)).toEqual(['start', 'checkpoint', 'checkpoint', 'checkpoint', 'lap']);
    expect(r.time).toBeGreaterThan(track.length / 100);
  });

  it('emits a hit when the ship touches the wall and one for a gauntlet obstacle', () => {
    const ship = newShip();
    spawnOnTrack(ship, track, S - 2, 50);
    pointOnTrack(track, S - 2, -10, 0, ship.pos);
    const r = newRace(track, ship);
    pointOnTrack(track, S + 0.5, -10, 0, ship.pos);
    stepRace(r, ship, track, walls, dt, { gauntlet: ring, nearMiss: 2 });
    expect(r.events).toContainEqual(expect.objectContaining({ type: 'hit', what: 'obstacle' }));
    expect(r.obstacleHits).toBe(1);

    const i = 10;
    ship.pos.copy(track.pos[i]).addScaledVector(track.right[i], 25);
    ship.vel.copy(track.right[i]).multiplyScalar(10);
    const r2 = newRace(track, ship);
    stepRace(r2, ship, track, walls, dt);
    expect(r2.events).toEqual([{ type: 'hit', what: 'wall', impact: expect.closeTo(10, 0) }]);
  });
});
