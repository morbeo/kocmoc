import { describe, it, expect } from 'vitest';
import { generateTrack, type RaceGenParams } from '../gen/track';
import { addSections } from '../gen/sections';
import { generatePads, padLane } from '../gen/pads';
import { generateMovers } from '../gen/movers';
import { referenceShip } from './forks';
import { newSim, spawnSim, stepSim, type SimConfig } from './world';
import { botControls, botTargets, defaultBot } from './bot';
import { noControls } from './ship';
import type { Course } from './race';

const gen: RaceGenParams = { seed: 4, points: 12, radius: 900, wobble: 0.3, height: 150, twist: 0, twistNoise: 0.3, tubeRadius: 40, spacing: 4, checkpoints: 8 };
const track = addSections(generateTrack(gen), { seed: 4, count: 2, kinds: ['cavern'], minLength: 500, maxLength: 700 });
const fx = { accel: 140, speed: 230, drag: 1.1 };

/** The autopilot's lap on `course`: time, and what it ran into. */
function botLap(course: Course) {
  const cfg: SimConfig = { ship: referenceShip, walls: { shipRadius: 1.5, bounce: 0.3, scrape: 0.8 }, track, course };
  const sim = newSim();
  spawnSim(sim, track, { s: -30, speed: 0 });
  const r = sim.race!;
  const c = noControls();
  const pads = { boost: 0, slow: 0 };
  let hits = 0;
  for (let i = 0; i < 600 * 120 && r.lap < 2; i++) {
    botControls(sim.curr, track, r.near, r.time, c, botTargets(course), defaultBot, r.loc.route);
    stepSim(sim, c, cfg, 1 / 120);
    for (const e of r.events) {
      if (e.type === 'pad') pads[e.kind]++;
      if (e.type === 'hit' && e.what === 'obstacle') hits++;
    }
    r.events.length = 0;
  }
  return { lap: r.lastLap, pads, hits };
}
const lanes = (list: ReturnType<typeof generatePads>) => list.map((p) => ({ s0: p.s0, s1: p.s1, ...xy(padLane(p, track.radius)), fast: true }));
const xy = ([x, y]: [number, number]) => ({ x, y });

describe('the autopilot and speed zones', () => {
  const base = botLap({ nearMiss: 0 });

  it('rides the boost strips and laps faster', () => {
    const list = generatePads(track, { seed: 4, boosts: 4, slows: 0, boostLength: 60, slowLength: 160 });
    expect(list.length).toBe(4);
    const run = botLap({ nearMiss: 0, pads: { list, fx, lanes: lanes(list) } });
    expect(run.pads.boost).toBe(4);
    expect(run.lap!).toBeLessThan(base.lap! - 0.5);
  });

  it('keeps to the clear lane through slow fields', () => {
    const list = generatePads(track, { seed: 4, boosts: 0, slows: 3, boostLength: 60, slowLength: 160 });
    expect(list.length).toBe(3);
    const run = botLap({ nearMiss: 0, pads: { list, fx, lanes: lanes(list) } });
    expect(run.pads.slow).toBe(0);
    expect(run.lap!).toBeLessThan(base.lap! * 1.05);
    // and a ship that ignores the lane is dragged down
    const blind = botLap({ nearMiss: 0, pads: { list, fx, lanes: [] } });
    expect(blind.pads.slow).toBe(3);
    expect(blind.lap!).toBeGreaterThan(run.lap!);
  });

  it('flies the middle of a cavern clear of its movers', () => {
    const movers = generateMovers(track, { seed: 4, perCavern: 6, core: 0.6 });
    expect(movers.length).toBeGreaterThan(0);
    const run = botLap({ nearMiss: 0, movers });
    expect(run.hits).toBe(0);
    expect(run.lap!).toBeCloseTo(base.lap!, 1);
  });
});
