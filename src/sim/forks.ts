import type { Branch, RouteJudge } from '../gen/routes';
import type { Track } from '../gen/track';
import { botControls, defaultBot, type BotRoute } from './bot';
import { noControls, type ShipParams } from './ship';
import { newSim, spawnSim, stepSim, type SimConfig } from './world';

/** The ship forks are balanced with: the default (balanced) tuning, so a track doesn't change with yours. */
export const referenceShip: ShipParams = {
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

export interface ForkRun {
  /** seconds from `lead` metres before the fork to `lead` metres past the merge; null if it didn't get there */
  time: number | null;
  wallHits: number;
  /** the branch was flown */
  took: boolean;
}

const LEAD = 100;

/**
 * Fly the autopilot through one fork, from a cruise start before it to just past the merge, on the
 * main line or the branch. Deterministic.
 */
export function flyFork(track: Track, b: Branch, route: BotRoute, ship: ShipParams = referenceShip, step = 1 / 120): ForkRun {
  const k = track.branches?.indexOf(b) ?? -1;
  const cfg: SimConfig = { ship, walls: { shipRadius: 1.5, bounce: 0.3, scrape: 0.8 }, track, course: { nearMiss: 0 } };
  const sim = newSim();
  const run = 250;
  spawnSim(sim, track, { s: b.s0 - LEAD - run, speed: defaultBot.speed });
  const r = sim.race!;
  const c = noControls();
  const bot = { ...defaultBot, route };
  const from = b.s0 - LEAD;
  const to = b.s1 + LEAD;
  let t0: number | null = null;
  let took = false;
  let hits = 0;
  const limit = ((to - from + run) / 20) / step;
  for (let i = 0; i < limit; i++) {
    botControls(sim.curr, track, r.near, r.time, c, null, bot, r.loc.route);
    const before = r.wallHits;
    stepSim(sim, c, cfg, step);
    r.events.length = 0;
    if (r.loc.route === k) took = true;
    const s = r.near.s;
    if (t0 === null && s >= from && s < to) t0 = r.time;
    if (t0 !== null) {
      hits += r.wallHits - before;
      if (s >= to) return { time: r.time - t0, wallHits: hits, took };
    }
  }
  return { time: null, wallHits: hits, took };
}

/**
 * Judge a fork by flying it both ways with the reference ship: the share of time the branch saves,
 * or null if the autopilot can't fly the branch clean (a wall hit, or it never gets through).
 */
export const botJudge: RouteJudge = (track, b) => {
  const main = flyFork(track, b, 'main');
  const alt = flyFork(track, b, 'any');
  if (main.time === null || alt.time === null || !alt.took || alt.wallHits > 0) return null;
  return 1 - alt.time / main.time;
};
