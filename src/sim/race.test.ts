import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { generateTrack, type RaceGenParams } from '../gen/track';
import { newShip } from './ship';
import { newRace, spawnOnTrack, stepRace, collideWalls, splitDelta, type WallParams } from './race';

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
const walls: WallParams = { shipRadius: 1.5, bounce: 0.3, scrape: 1 };
const dt = 1 / 120;

/** Fly along the centreline at constant speed (no ship physics), running race rules each step. */
function cruise(seconds: number, speed: number, startS: number) {
  const ship = newShip();
  spawnOnTrack(ship, track, startS, speed);
  const r = newRace(track, ship);
  let s = startS;
  for (let i = 0; i < Math.round(seconds / dt); i++) {
    s += speed * dt;
    spawnOnTrack(ship, track, s, speed);
    stepRace(r, ship, track, walls, dt);
  }
  return r;
}

describe('spawnOnTrack', () => {
  it('places the ship on the centreline facing along the track', () => {
    const ship = newShip();
    spawnOnTrack(ship, track, 100, 50);
    const i = Math.floor((100 / track.length) * track.pos.length);
    expect(ship.pos.distanceTo(track.pos[i])).toBeLessThan(gen.spacing * 1.1);
    const fwd = new Vector3(0, 0, -1).applyQuaternion(ship.quat);
    expect(fwd.dot(track.tan[i])).toBeGreaterThan(0.99);
    const up = new Vector3(0, 1, 0).applyQuaternion(ship.quat);
    expect(up.dot(track.up[i])).toBeGreaterThan(0.99);
    expect(ship.vel.length()).toBeCloseTo(50);
  });
});

describe('walls', () => {
  it('pushes the ship back inside and bounces the into-wall velocity', () => {
    const ship = newShip();
    const i = 10;
    ship.pos.copy(track.pos[i]).addScaledVector(track.right[i], 25);
    ship.vel.copy(track.right[i]).multiplyScalar(10).addScaledVector(track.tan[i], 50);
    const r = newRace(track, ship);
    expect(collideWalls(ship, r.near, track.radius, walls, dt)).toBe(true);
    expect(ship.pos.distanceTo(r.near.point)).toBeCloseTo(track.radius - walls.shipRadius, 3);
    expect(ship.vel.dot(track.right[i])).toBeLessThan(0); // now moving away from the wall
    expect(ship.vel.dot(track.tan[i])).toBeGreaterThan(49); // along-track speed mostly kept
  });

  it('does nothing inside the corridor', () => {
    const ship = newShip();
    ship.pos.copy(track.pos[5]).addScaledVector(track.up[5], 5);
    ship.vel.set(1, 2, 3);
    const r = newRace(track, ship);
    expect(collideWalls(ship, r.near, track.radius, walls, dt)).toBe(false);
    expect(ship.vel.toArray()).toEqual([1, 2, 3]);
  });

  it('a ship flying straight off the track never leaves the tube', () => {
    const ship = newShip();
    spawnOnTrack(ship, track, 0, 0);
    ship.vel.copy(track.right[0]).multiplyScalar(400);
    const r = newRace(track, ship);
    for (let k = 0; k < 240; k++) {
      ship.pos.addScaledVector(ship.vel, dt);
      stepRace(r, ship, track, walls, dt);
      expect(ship.pos.distanceTo(r.near.point)).toBeLessThanOrEqual(track.radius - walls.shipRadius + 1e-6);
    }
    expect(r.wallHits).toBeGreaterThan(0);
  });
});

describe('laps and checkpoints', () => {
  const speed = 100;
  const lapSeconds = track.length / speed;

  it('the clock starts when crossing the start line', () => {
    const r = cruise(0.25, speed, -20);
    expect(r.started).toBe(true);
    expect(r.lapTime).toBeCloseTo(0.05, 1);
    const before = cruise(0.1, speed, -20);
    expect(before.started).toBe(false);
  });

  it('records splits at each checkpoint and a lap time at the finish', () => {
    const r = cruise(lapSeconds + 0.5, speed, -10);
    expect(r.lap).toBe(2);
    expect(r.lastLap).toBeCloseTo(lapSeconds, 0);
    expect(r.bestLap).toBe(r.lastLap);
    expect(r.bestSplits).toHaveLength(4);
    expect(r.bestSplits![0]).toBeCloseTo(lapSeconds / 4, 0);
  });

  it('a faster second lap becomes the best and deltas go negative', () => {
    const ship = newShip();
    const r = newRace(track, (spawnOnTrack(ship, track, -10, 0), ship));
    let s = -10;
    const fly = (seconds: number, v: number) => {
      for (let i = 0; i < Math.round(seconds / dt); i++) {
        s += v * dt;
        spawnOnTrack(ship, track, s, v);
        stepRace(r, ship, track, walls, dt);
      }
    };
    fly(track.length / 80 + 0.2, 80);
    const first = r.lastLap!;
    fly(track.length / 4 / 120 + 0.1, 120);
    expect(splitDelta(r)!).toBeLessThan(0);
    fly(((track.length * 3) / 4) / 120 + 0.2, 120);
    expect(r.bestLap!).toBeLessThan(first);
  });

  it('flying backwards over the line does not count a lap', () => {
    const r = cruise(2, -speed, 50);
    expect(r.started).toBe(false);
    expect(r.lap).toBe(0);
  });

  it('skipping checkpoints by reversing does not finish the lap', () => {
    const ship = newShip();
    const r = newRace(track, (spawnOnTrack(ship, track, -10, 0), ship));
    let s = -10;
    const go = (dist: number) => {
      const steps = Math.ceil(Math.abs(dist) / 2);
      for (let i = 0; i < steps; i++) {
        s += dist / steps;
        spawnOnTrack(ship, track, s, 0);
        stepRace(r, ship, track, walls, dt);
      }
    };
    go(30); // started
    go(-60); // back over the start line
    go(60);
    expect(r.lap).toBe(1);
    expect(r.lastLap).toBeNull();
  });
});
