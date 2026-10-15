import { describe, it, expect } from 'vitest';
import { Quaternion, Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams } from '../gen/track';
import { CHUNK_KINDS, generateGauntlet } from '../gen/gauntlet';
import { noControls, type ShipParams } from './ship';
import { newSim, spawnSim, stepSim, type SimConfig } from './world';
import { Player, Recorder, parseRecording, quantize } from './replay';
import { GhostRecorder, parseGhost, sampleGhost } from './ghost';
import { botControls } from './bot';
import { rng } from '../core/rng';

const ship: ShipParams = {
  thrust: 60,
  reverse: 40,
  strafe: 35,
  turnRate: [1.8, 1.4, 3],
  turnResponse: 8,
  maxSpeed: 120,
  overspeedDecay: 1.5,
  boostThrust: 160,
  boostSpeed: 240,
  boostDrain: 0.35,
  boostRegen: 0.15,
  assist: true,
  assistDamp: 2.5,
};
const genP = (seed: number): RaceGenParams => ({
  seed,
  points: 12,
  radius: 600,
  wobble: 0.35,
  height: 150,
  twist: 0,
  twistNoise: 0.5,
  tubeRadius: 22,
  spacing: 4,
  checkpoints: 8,
});
const dt = 1 / 120;
const walls = { shipRadius: 1.5, bounce: 0.3, scrape: 0.8 };

describe('replay', () => {
  const track = generateTrack(genP(1));
  const cfg: SimConfig = { ship, walls, track };

  /** fly a wobbly random path for `ticks`, recording; returns final sim and recording */
  function liveRun(ticks: number) {
    const sim = newSim();
    spawnSim(sim, track, { s: -20, speed: 40 });
    const rec = new Recorder({ user: { 'a.b': 1 } }, { s: -20, speed: 40 }, dt);
    const rand = rng(9);
    const c = noControls();
    for (let i = 0; i < ticks; i++) {
      if (i % 30 === 0) {
        c.pitch = rand() * 2 - 1;
        c.yaw = rand() * 2 - 1;
        c.roll = rand() * 2 - 1;
        c.thrust = rand();
        c.boost = rand() < 0.2;
      }
      quantize(c);
      rec.push(c);
      stepSim(sim, c, cfg, dt);
    }
    return { sim, rec: rec.finish({ note: 'test' }) };
  }

  it('replays a run bit for bit, through JSON', () => {
    const { sim, rec } = liveRun(1200);
    const back = parseRecording(JSON.parse(JSON.stringify(rec)))!;
    expect(back).toBeDefined();
    const again = newSim();
    spawnSim(again, track, back.spawn);
    const player = new Player(back);
    const c = noControls();
    while (player.next(c)) stepSim(again, c, cfg, back.step);
    expect(player.tick).toBe(1200);
    expect(again.curr.pos.toArray()).toEqual(sim.curr.pos.toArray());
    expect(again.curr.quat.toArray()).toEqual(sim.curr.quat.toArray());
    expect(again.race!.wallHits).toBe(sim.race!.wallHits);
  });

  it('run-length encodes held controls', () => {
    const { rec } = liveRun(1200);
    expect(rec.inputs.length).toBeLessThanOrEqual(1200 / 30 + 1);
    expect(rec.inputs.reduce((n, r) => n + r[0], 0)).toBe(1200);
  });

  it('rejects malformed bundles', () => {
    expect(parseRecording(null)).toBeUndefined();
    expect(parseRecording({ version: 2 })).toBeUndefined();
    expect(parseRecording({ version: 1, step: dt, ticks: 1, inputs: [[1, 0]], spawn: { s: 0, speed: 0 }, layers: {} })).toBeUndefined();
  });
});

describe('ghost', () => {
  it('records a lap and plays it back by lap time', () => {
    const track = generateTrack(genP(2));
    const sim = newSim();
    spawnSim(sim, track, { s: -10, speed: 100 });
    const rec = new GhostRecorder();
    let ghost = null;
    // let the autopilot fly a lap
    spawnSim(sim, track, { s: -10, speed: 60 });
    const c = noControls();
    for (let i = 0; i < 120 * 120 && !ghost; i++) {
      botControls(sim.curr, track, sim.race!.near, i * dt, c);
      stepSim(sim, c, { ship, walls, track }, dt);
      ghost = rec.update(sim.race!, sim.curr);
    }
    expect(ghost).not.toBeNull();
    expect(ghost!.lap).toBe(sim.race!.lastLap);
    const g = parseGhost(JSON.parse(JSON.stringify(ghost)))!;
    const pos = new Vector3();
    const q = new Quaternion();
    expect(sampleGhost(g, 0, pos, q)).toBe(true);
    expect(nearestOnTrack(track, pos).s).toBeLessThan(10);
    expect(sampleGhost(g, g.lap / 2, pos, q)).toBe(true);
    expect(Math.abs(nearestOnTrack(track, pos).s - track.length / 2)).toBeLessThan(track.length * 0.25);
    expect(sampleGhost(g, g.lap + 1, pos, q)).toBe(false);
    expect(q.length()).toBeCloseTo(1);
  });
});

/** Fly the bot until it completes a lap or runs out of time. */
function botLap(seed: number, gauntlet: boolean, limit = 240) {
  const track = generateTrack(genP(seed));
  const g = gauntlet
    ? generateGauntlet(track, { seed, chunkLength: 140, lead: 200, rampStart: 0.1, rampEnd: 1, minClearance: 1.8, shipRadius: 1.5, kinds: [...CHUNK_KINDS] })
    : null;
  const cfg: SimConfig = { ship, walls, track, course: g ? { gauntlet: g, nearMiss: 2 } : undefined };
  const sim = newSim();
  spawnSim(sim, track, { s: -20, speed: 40 });
  const c = noControls();
  for (let i = 0; i < limit / dt; i++) {
    botControls(sim.curr, track, sim.race!.near, sim.race!.time, c, g);
    stepSim(sim, c, cfg, dt);
    if (sim.race!.lastLap !== null) break;
  }
  return sim.race!;
}

describe('autopilot completability sweep', () => {
  for (const seed of [1, 2, 3, 4, 5]) {
    it(`race seed ${seed}: the bot finishes a lap`, () => {
      const r = botLap(seed, false);
      expect(r.lastLap).not.toBeNull();
      expect(r.wallHits).toBeLessThan(15);
    });
  }
  for (const seed of [1, 2, 3, 4, 5]) {
    it(`gauntlet seed ${seed}: the bot finishes a lap`, () => {
      const r = botLap(seed, true);
      expect(r.lastLap).not.toBeNull();
    });
  }
});
