import { describe, expect, it } from 'vitest';
import { generateTrack, type RaceGenParams } from '../gen/track';
import { referenceShip } from './forks';
import { noControls } from './ship';
import { newSim, spawnSim, stepSim, type SimConfig } from './world';

const gen: RaceGenParams = { seed: 3, points: 10, radius: 600, wobble: 0.3, height: 100, twist: 0, twistNoise: 0.3, tubeRadius: 40, spacing: 4, checkpoints: 6 };
const track = generateTrack(gen);
const walls = { shipRadius: 1.5, bounce: 0.3, scrape: 0.8 };

describe('free flight', () => {
  it('spawns at the origin facing -Z at the spawn speed, with full energy and no race', () => {
    const sim = newSim();
    sim.curr.pos.set(5, 5, 5);
    sim.curr.angVel.set(1, 2, 3);
    sim.curr.energy = 0.2;
    sim.curr.boosting = sim.curr.boostLocked = true;
    sim.tick = 99;
    spawnSim(sim, null, { s: 0, speed: 30 });
    expect(sim.curr.pos.toArray()).toEqual([0, 0, 0]);
    expect(sim.curr.vel.toArray()).toEqual([0, 0, -30]);
    expect(sim.curr.angVel.length()).toBe(0);
    expect(sim.curr.quat.toArray()).toEqual([0, 0, 0, 1]);
    expect(sim.curr.energy).toBe(1);
    expect(sim.curr.boosting || sim.curr.boostLocked).toBe(false);
    expect(sim.race).toBeNull();
    expect(sim.tick).toBe(0);
    expect(sim.prev.pos.equals(sim.curr.pos)).toBe(true);
  });

  it('steps the ship without a race', () => {
    const sim = newSim();
    spawnSim(sim, null, { s: 0, speed: 30 });
    stepSim(sim, noControls(), { ship: referenceShip, walls, track: null }, 1 / 120);
    expect(sim.tick).toBe(1);
    expect(sim.curr.pos.z).toBeLessThan(0);
    expect(sim.prev.pos.z).toBe(0);
  });
});

describe('on a track', () => {
  it('spawns on the track with a race of the given laps', () => {
    const sim = newSim();
    spawnSim(sim, track, { s: 10, speed: 20 }, 3);
    expect(sim.race).not.toBeNull();
    expect(sim.race!.laps).toBe(3);
    expect(sim.curr.vel.length()).toBeCloseTo(20);
  });

  it('keeps prev one step behind curr', () => {
    const sim = newSim();
    spawnSim(sim, track, { s: 0, speed: 50 });
    const cfg: SimConfig = { ship: referenceShip, walls, track };
    stepSim(sim, noControls(), cfg, 1 / 120);
    const after1 = sim.curr.pos.clone();
    stepSim(sim, noControls(), cfg, 1 / 120);
    expect(sim.prev.pos.equals(after1)).toBe(true);
    expect(sim.race!.time).toBeCloseTo(2 / 120);
  });

  it('is deterministic: same config and controls give the same state', () => {
    const run = () => {
      const sim = newSim();
      spawnSim(sim, track, { s: 0, speed: 40 });
      const c = { ...noControls(), thrust: 1, yaw: 0.3, pitch: -0.2 };
      for (let i = 0; i < 600; i++) stepSim(sim, c, { ship: referenceShip, walls, track }, 1 / 120);
      return [...sim.curr.pos.toArray(), ...sim.curr.quat.toArray(), sim.race!.time];
    };
    expect(run()).toEqual(run());
  });
});
