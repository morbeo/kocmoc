import { describe, it, expect } from 'vitest';
import { generateTrack, type RaceGenParams, type Track } from '../gen/track';
import { addRoutes, defaultRoutes, inBand } from '../gen/routes';
import { botControls, botBranch, defaultBot, takesBranch, type BotRoute } from './bot';
import { botJudge, flyFork, referenceShip } from './forks';
import { noControls } from './ship';
import { newSim, spawnSim, stepSim, type SimConfig } from './world';
import { makeRival, recordBotLap } from './rivals';
import type { RaceEvent } from './race';

const gen = (seed: number): RaceGenParams => ({ seed, points: 12, radius: 1000, wobble: 0.35, height: 250, twist: 0, twistNoise: 0.5, tubeRadius: 40, spacing: 4, checkpoints: 8 });
const SEEDS = [1, 2, 3, 4];
const tracks: Track[] = SEEDS.map((seed) => addRoutes(generateTrack(gen(seed)), { ...defaultRoutes, seed }, botJudge));
const dt = 1 / 120;
const cfg = (track: Track): SimConfig => ({
  ship: referenceShip,
  walls: { shipRadius: 1.5, bounce: 0.3, scrape: 0.8 },
  track,
  course: { nearMiss: 0, pit: { refill: 0.5, speed: 60 } },
});

/** One lap by the autopilot on `route`, from a standing start behind the line. */
function lap(track: Track, route: BotRoute) {
  const sim = newSim();
  spawnSim(sim, track, { s: -30, speed: 0 }, 1);
  const r = sim.race!;
  const c = noControls();
  const routes: (string | null)[] = [];
  const config = cfg(track);
  for (let i = 0; i < 200 / dt && !r.finished; i++) {
    botControls(sim.curr, track, r.near, r.time, c, null, { ...defaultBot, route }, r.loc.route);
    stepSim(sim, c, config, dt);
    for (const e of r.events as RaceEvent[]) if (e.type === 'route') routes.push(e.kind);
    r.events.length = 0;
  }
  return { time: r.finishTime, hits: r.wallHits, cps: r.lapTimes.length, routes };
}

describe('forks balanced by the autopilot', () => {
  it('every kept fork was flown clean, and its time is in its band', () => {
    for (const t of tracks) {
      for (const b of t.branches!) {
        const main = flyFork(t, b, 'main');
        const alt = flyFork(t, b, 'any');
        expect(main.took).toBe(false);
        expect(alt.took).toBe(true);
        expect(alt.wallHits).toBe(0);
        expect(inBand(b.kind, 1 - alt.time! / main.time!, defaultRoutes)).toBe(true);
      }
    }
  });

  it('the autopilot finishes a lap on every route; shortcuts win it and the long way loses it', () => {
    for (const t of tracks) {
      const main = lap(t, 'main');
      const short = lap(t, 'shortcut');
      const long = lap(t, 'long');
      for (const run of [main, short, long]) {
        expect(run.time).not.toBeNull();
        expect(run.cps).toBe(1);
      }
      expect(main.routes).toEqual([]);
      expect(main.hits).toBe(0);
      const cuts = t.branches!.filter((b) => b.kind === 'shortcut' || b.kind === 'hidden').length;
      expect(short.routes.filter((k) => k === 'shortcut' || k === 'hidden').length).toBe(cuts);
      expect(short.time!).toBeLessThan(main.time!);
      if (t.branches!.some((b) => b.kind === 'long')) expect(long.time!).toBeGreaterThan(main.time!);
    }
  });
});

describe('route choice', () => {
  const t = tracks[0];
  const bs = t.branches!;

  it('takesBranch: each route takes its kinds; random is fixed per fork', () => {
    for (const [k, b] of bs.entries()) {
      expect(takesBranch('main', b, k)).toBe(false);
      expect(takesBranch('any', b, k)).toBe(true);
      expect(takesBranch('shortcut', b, k)).toBe(b.kind === 'shortcut' || b.kind === 'hidden');
      expect(takesBranch('long', b, k)).toBe(b.kind === 'long' || b.kind === 'split' || b.kind === 'pit');
      expect(takesBranch('random', b, k)).toBe(takesBranch('random', b, k));
    }
  });

  it('botBranch aims down a chosen branch only until it is too late to turn in', () => {
    const b = bs[0];
    expect(botBranch(t, b.s0 - 40, b.s0 + 10, -1, 'any')).toBe(0);
    expect(botBranch(t, b.s0 - 40, b.s0 + 10, -1, 'main')).toBe(-1);
    expect(botBranch(t, b.s1 - 10, b.s1 - 5, -1, 'any')).toBe(-1); // through the mouth on the loop: stay
    expect(botBranch(t, b.s1 - 10, b.s1 - 5, 0, 'main')).toBe(0); // on it: follow it out
    expect(botBranch(t, b.s1 - 10, b.s1 + 30, 0, 'any')).toBe(-1); // past the merge: the loop again
  });
});

describe('pit lane', () => {
  const t = tracks.find((x) => x.branches!.some((b) => b.kind === 'pit'))!;
  const b = t.branches!.find((x) => x.kind === 'pit')!;

  it('refills boost and holds the speed down in the lane', () => {
    const fly = (refill: number) => {
      const sim = newSim();
      spawnSim(sim, t, { s: b.s0 - 200, speed: 100 });
      sim.curr.energy = 0;
      const r = sim.race!;
      const c = noControls();
      // no regen of its own, so only the lane can refill it
      const config = { ...cfg(t), ship: { ...referenceShip, boostRegen: 0 }, course: { nearMiss: 0, pit: { refill, speed: 60 } } };
      let top = 0;
      for (let i = 0; i < 40 / dt && r.near.s < b.s1 + 50; i++) {
        botControls(sim.curr, t, r.near, r.time, c, null, { ...defaultBot, route: 'long' }, r.loc.route);
        stepSim(sim, c, config, dt);
        const sb = r.loc.route >= 0 ? r.loc.branch[r.loc.route].s : -1;
        if (sb > b.open0 + 150 && sb < b.open1) top = Math.max(top, sim.curr.vel.length());
      }
      return { energy: sim.curr.energy, top };
    };
    const pit = fly(0.5);
    const none = fly(0);
    expect(pit.energy).toBe(1);
    expect(none.energy).toBe(0);
    expect(pit.top).toBeLessThan(62);
  });
});

describe('ghost rivals on forks', () => {
  it("a ghost that took shortcuts is profiled along the loop's distance all the way round", () => {
    const t = tracks[1];
    const ghost = recordBotLap(cfg(t), null, dt, 300, { ...defaultBot, route: 'shortcut' })!;
    expect(ghost).not.toBeNull();
    const rival = makeRival('BOT', ghost, t);
    const p = rival.profile;
    for (let i = 1; i < p.length; i++) expect(p[i]).toBeGreaterThanOrEqual(p[i - 1]);
    expect(p[p.length - 1]).toBeGreaterThan(t.length - 50);
  });
});
