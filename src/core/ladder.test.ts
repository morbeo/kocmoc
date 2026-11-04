import { describe, it, expect } from 'vitest';
import { LADDER_SIZE, hasBadge, levelName, levelScenario, parseLadder, recordRun, unlockedLevel } from './ladder';
import { scenarios } from './scenarios';
import { presets } from './presets';
import { generateTrack } from '../gen/track';
import { generateProving, GATE_PATTERNS, type GatePattern } from '../gen/proving';
import { newSim, spawnSim, stepSim, type SimConfig } from '../sim/world';
import { botControls, botTargets } from '../sim/bot';
import { noControls, type ShipParams } from '../sim/ship';
import { defaultRules } from '../sim/proving';

const levels = Array.from({ length: LADDER_SIZE }, (_, i) => scenarios.find((s) => s.name === levelName(i + 1))!);
const num = (sc: (typeof levels)[number], k: string) => sc.vars![k] as number;

describe('bundled levels', () => {
  it('are all there, in proving mode, each naming its level', () => {
    levels.forEach((sc, i) => {
      expect(sc, levelName(i + 1)).toBeDefined();
      expect(sc.mode).toBe('proving');
      expect(sc.vars!['proving.level']).toBe(i + 1);
    });
  });

  it('tighten level by level: smaller gates, further off the centre', () => {
    for (let i = 1; i < levels.length; i++) {
      expect(num(levels[i], 'gen.proving.gateRadiusMin')).toBeLessThanOrEqual(num(levels[i - 1], 'gen.proving.gateRadiusMin'));
      expect(num(levels[i], 'gen.proving.offsetMax')).toBeGreaterThanOrEqual(num(levels[i - 1], 'gen.proving.offsetMax'));
    }
    expect(num(levels[7], 'gen.proving.gateRadiusMin')).toBeLessThan(num(levels[0], 'gen.proving.gateRadiusMin'));
  });

  it('the autopilot clears every level with the balanced ship, with less time to spare each level', () => {
    const ship = presets.find((p) => p.id === 'feel/balanced')!.vars;
    const sp: ShipParams = {
      thrust: ship['ship.thrust.forward'] as number,
      reverse: ship['ship.thrust.reverse'] as number,
      strafe: ship['ship.thrust.strafe'] as number,
      turnRate: ship['ship.turn.rate'] as [number, number, number],
      turnResponse: 8,
      maxSpeed: ship['ship.speed.max'] as number,
      overspeedDecay: 1.5,
      boostThrust: ship['ship.boost.thrust'] as number,
      boostSpeed: ship['ship.boost.speed'] as number,
      boostDrain: 0.35,
      boostRegen: 0.15,
      assist: true,
      assistDamp: ship['ship.assist.damp'] as number,
    };
    const radius = ship['ship.radius'] as number;
    const spare: number[] = [];
    for (const sc of levels) {
      const v = sc.vars!;
      const track = generateTrack({ seed: sc.seed!, points: num(sc, 'gen.race.points'), radius: num(sc, 'gen.race.radius'), wobble: 0.35, height: num(sc, 'gen.race.height'), twist: 0, twistNoise: 0.5, tubeRadius: num(sc, 'gen.race.tubeRadius'), spacing: 4, checkpoints: num(sc, 'gen.race.checkpoints') });
      const course = generateProving(track, {
        seed: sc.seed!,
        lead: 250,
        groupLength: 320,
        gates: num(sc, 'gen.proving.gates'),
        gateRadius: num(sc, 'gen.proving.gateRadius'),
        gateRadiusMin: num(sc, 'gen.proving.gateRadiusMin'),
        offsetMin: num(sc, 'gen.proving.offsetMin'),
        offsetMax: num(sc, 'gen.proving.offsetMax'),
        rampStart: num(sc, 'gen.proving.rampStart'),
        rampEnd: num(sc, 'gen.proving.rampEnd'),
        beacons: num(sc, 'gen.proving.beacons'),
        beaconRadius: 3,
        shipRadius: radius,
        patterns: GATE_PATTERNS.filter((p) => v[`gen.proving.patterns.${p}`]) as GatePattern[],
      });
      const rules = { ...defaultRules, budget: num(sc, 'proving.budget') };
      const cfg: SimConfig = { ship: sp, walls: { shipRadius: radius, bounce: 0.3, scrape: 0.8, open: v['gen.race.profile'] === 'open', oobTime: 3 }, track, course: { proving: { course, rules }, nearMiss: 2.5 } };
      const sim = newSim();
      spawnSim(sim, track, { s: -30, speed: sc.spawn?.speed ?? 0 });
      const c = noControls();
      const targets = botTargets(cfg.course);
      const r = sim.race!;
      for (let i = 0; i < 300 * 120 && !r.finished; i++) {
        botControls(sim.curr, track, r.near, r.time, c, targets);
        stepSim(sim, c, cfg, 1 / 120);
        r.events.length = 0;
      }
      expect(r.proving!.result, sc.name).toBe('clear');
      spare.push(r.proving!.timeLeft / r.finishTime!);
    }
    for (let i = 1; i < spare.length; i++) expect(spare[i], levels[i].name).toBeLessThan(spare[i - 1]);
  }, 60_000);

  it('generates levels past 8 from level 8: new seed, shorter clock, tighter gates', () => {
    const l8 = levelScenario(8, scenarios)!;
    const l9 = levelScenario(9, scenarios)!;
    const l12 = levelScenario(12, scenarios)!;
    expect(l8).toBe(levels[7]);
    expect(l9.name).toBe('proving-9');
    expect(l9.vars!['proving.level']).toBe(9);
    expect(l9.seed).not.toBe(l8.seed);
    expect(num(l9, 'proving.budget')).toBeLessThan(num(l8, 'proving.budget'));
    expect(num(l12, 'proving.budget')).toBeLessThan(num(l9, 'proving.budget'));
    expect(num(l12, 'gen.proving.gateRadiusMin')).toBeLessThan(num(l8, 'gen.proving.gateRadiusMin'));
    expect(num(levelScenario(200, scenarios)!, 'gen.proving.gateRadiusMin')).toBeGreaterThanOrEqual(2.5);
    expect(levelScenario(0, scenarios)).toBe(levels[0]);
  });
});

describe('ladder progress', () => {
  it('records clears and bests per ship; failed runs change nothing', () => {
    let l = parseLadder(null);
    expect(unlockedLevel(l, 'light')).toBe(1);
    const fail = recordRun(l, 'light', 1, 500, false);
    expect(fail).toEqual({ ladder: l, newBest: false, badge: false });
    const a = recordRun(l, 'light', 1, 500, true);
    expect(a.newBest).toBe(true);
    l = a.ladder;
    expect(unlockedLevel(l, 'light')).toBe(2);
    expect(unlockedLevel(l, 'heavy')).toBe(1);
    const worse = recordRun(l, 'light', 1, 400, true);
    expect(worse.newBest).toBe(false);
    expect(worse.ladder.light!.best[1]).toBe(500);
    expect(recordRun(l, 'light', 1, 600, true).ladder.light!.best[1]).toBe(600);
  });

  it('earns a badge once, on the first clear of level 8 with that ship', () => {
    let l = parseLadder({ heavy: { cleared: 7, best: {} } });
    expect(hasBadge(l, 'heavy')).toBe(false);
    const run = recordRun(l, 'heavy', 8, 900, true);
    expect(run.badge).toBe(true);
    l = run.ladder;
    expect(hasBadge(l, 'heavy')).toBe(true);
    expect(hasBadge(l, 'light')).toBe(false);
    expect(recordRun(l, 'heavy', 8, 1000, true).badge).toBe(false);
    expect(recordRun(l, 'heavy', 9, 1000, true).ladder.heavy!.cleared).toBe(9);
  });

  it('drops corrupt stored entries', () => {
    expect(parseLadder('nope')).toEqual({});
    expect(parseLadder([1])).toEqual({});
    expect(parseLadder({ a: 3, b: { cleared: 'x', best: { 1: 'y', 2: 50 } } })).toEqual({ b: { cleared: 0, best: { 2: 50 } } });
  });
});
