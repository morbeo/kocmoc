import { copyShip, newShip, stepShip, type Controls, type ShipParams, type ShipState } from './ship';
import { newRace, spawnOnTrack, stepRace, type Course, type RaceState, type WallParams } from './race';
import type { Track } from '../gen/track';

/** Everything one fixed step needs besides the controls. Same config + same controls = same result. */
export interface SimConfig {
  ship: ShipParams;
  walls: WallParams;
  /** null in free flight */
  track: Track | null;
  course?: Course;
}

export interface SimState {
  prev: ShipState;
  curr: ShipState;
  race: RaceState | null;
  tick: number;
}

/** Where a run starts: arc length on the track (null track = free flight at the origin) and speed. */
export interface Spawn {
  s: number;
  speed: number;
}

export function newSim(): SimState {
  return { prev: newShip(), curr: newShip(), race: null, tick: 0 };
}

/** `laps` sets the race length on a track (0 = endless practice). */
export function spawnSim(sim: SimState, track: Track | null, spawn: Spawn, laps = 0): void {
  const c = sim.curr;
  if (track) {
    spawnOnTrack(c, track, spawn.s, spawn.speed);
    sim.race = newRace(track, c, laps);
  } else {
    c.pos.set(0, 0, 0);
    c.quat.identity();
    c.vel.set(0, 0, -spawn.speed);
    c.angVel.set(0, 0, 0);
    c.energy = 1;
    c.boosting = false;
    c.boostLocked = false;
    sim.race = null;
  }
  copyShip(sim.prev, c);
  sim.tick = 0;
}

export function stepSim(sim: SimState, controls: Controls, cfg: SimConfig, dt: number): void {
  copyShip(sim.prev, sim.curr);
  stepShip(sim.curr, controls, cfg.ship, dt);
  if (sim.race && cfg.track) stepRace(sim.race, sim.curr, cfg.track, cfg.walls, dt, cfg.course);
  sim.tick++;
}
