import { describe, it, expect } from 'vitest';
import { generateTrack, nearestOnTrack, type RaceGenParams } from '../gen/track';
import { pointOnTrack } from '../gen/gauntlet';
import type { ProvingCourse } from '../gen/proving';
import { newShip } from './ship';
import { newRace, spawnOnTrack, stepRace, type Course, type WallParams } from './race';
import { defaultRules, finishProving, newProving, provingScore, stepProving, type ProvingEvent, type ProvingRules, type ProvingSetup } from './proving';

const gen: RaceGenParams = { seed: 3, points: 10, radius: 300, wobble: 0.3, height: 60, twist: 0, twistNoise: 0, tubeRadius: 20, spacing: 4, checkpoints: 4 };
const track = generateTrack(gen);
const rules: ProvingRules = { ...defaultRules, budget: 60 };
/** gate 0 at s=300, 6 m right, opening 4 m; gate 1 reverse at s=500, centred; a beacon at s=400 near the wall */
const course: ProvingCourse = {
  gates: [
    { s: 300, x: 6, y: 0, r: 4, reverse: false, pattern: 'slalom', group: 0 },
    { s: 500, x: 0, y: 0, r: 5, reverse: true, pattern: 'reverse', group: 0 },
  ],
  beacons: [{ s: 400, x: -15, y: 0, r: 3 }],
};
const setup: ProvingSetup = { course, rules };
const dt = 1 / 120;

/** Move the ship from s0 to s1 at cross-section offset (x, y) in one step. */
function move(ps = newProving(setup), s0: number, s1: number, x: number, y: number, running = true, along = s1) {
  const ship = newShip();
  spawnOnTrack(ship, track, s1, 50);
  pointOnTrack(track, s1, x, y, ship.pos);
  const near = nearestOnTrack(track, ship.pos);
  const events: ProvingEvent[] = [];
  stepProving(ps, setup, ship, track, near, s0, 1.5, along, dt, running, events);
  return { ps, events };
}

describe('gates', () => {
  it('credits a gate flown through inside its opening, and adds time', () => {
    const { ps, events } = move(undefined, 299, 301, 7, 1);
    expect(ps.gates[0]).toBe(1);
    expect(ps.hits).toBe(1);
    expect(ps.timeLeft).toBeCloseTo(rules.budget + rules.gateBonus - dt);
    expect(events).toEqual([{ type: 'gate', ok: true, index: 0 }]);
  });

  it('misses a gate passed outside it: time penalty, no bounce', () => {
    const { ps, events } = move(undefined, 299, 301, -6, 0);
    expect(ps.gates[0]).toBe(-1);
    expect(ps.misses).toBe(1);
    expect(ps.timeLeft).toBeCloseTo(rules.budget - rules.missPenalty - dt);
    expect(events).toEqual([{ type: 'gate', ok: false, index: 0 }]);
  });

  it('resolves a gate once; crossing it again does nothing', () => {
    const { ps } = move(undefined, 299, 301, 6, 0);
    const again = move(ps, 301, 299, -6, 0);
    expect(again.events).toEqual([]);
    expect(move(ps, 299, 301, -6, 0).events).toEqual([]);
    expect(ps.hits).toBe(1);
  });

  it('gives no time before the clock runs, but still counts', () => {
    const { ps } = move(undefined, 299, 301, 6, 0, false);
    expect(ps.hits).toBe(1);
    expect(ps.timeLeft).toBe(rules.budget);
  });

  it('credits a reverse gate only when it is crossed backwards', () => {
    const fwd = move(undefined, 499, 501, 0, 0);
    expect(fwd.events).toEqual([]);
    const back = move(fwd.ps, 501, 499, 1, 1);
    expect(back.ps.gates[1]).toBe(1);
    expect(back.events).toEqual([{ type: 'gate', ok: true, index: 1 }]);
  });

  it('misses a reverse gate left behind past the window', () => {
    const s = 500 + rules.reverseWindow + 5;
    const { ps, events } = move(undefined, s - 1, s, 0, 0, true, s);
    expect(ps.gates[1]).toBe(-1);
    expect(events).toEqual([{ type: 'gate', ok: false, index: 1 }]);
    // before the start line (along < 0) nothing is missed, whatever the arc length says
    expect(move(undefined, s - 1, s, 0, 0, false, -20).events).toEqual([]);
  });
});

describe('beacons and the clock', () => {
  it('picks up a beacon once when the ship touches it', () => {
    const { ps, events } = move(undefined, 399, 400, -14, 1);
    expect(ps.collected).toBe(1);
    expect(ps.timeLeft).toBeCloseTo(rules.budget + rules.beaconBonus - dt);
    expect(events).toEqual([{ type: 'beacon', index: 0 }]);
    expect(move(ps, 399, 400, -14, 1).events).toEqual([]);
    expect(move(undefined, 399, 400, 0, 0).ps.collected).toBe(0);
  });

  it('runs out: result timeout, clock held at zero, nothing more counts', () => {
    const ps = newProving({ course, rules: { ...rules, budget: dt / 2 } });
    const { events } = move(ps, 100, 101, 0, 0);
    expect(ps.result).toBe('timeout');
    expect(ps.timeLeft).toBe(0);
    expect(events).toEqual([{ type: 'timeout' }]);
    expect(move(ps, 299, 301, 6, 0).events).toEqual([]);
  });

  it('scores time left, gates and beacons; time only counts on a clear', () => {
    const ps = newProving(setup);
    ps.hits = 3;
    ps.collected = 2;
    ps.timeLeft = 12.34;
    expect(provingScore(ps, rules)).toBe(Math.round(3 * rules.scoreGate + 2 * rules.scoreBeacon));
    finishProving(ps, rules);
    expect(ps.result).toBe('clear');
    // pending gates are missed at the finish
    expect(Array.from(ps.gates)).toEqual([-1, -1]);
    expect(ps.score).toBe(Math.round(12.34 * rules.scoreTime + 3 * rules.scoreGate + 2 * rules.scoreBeacon));
  });
});

describe('proving in the race rules', () => {
  const walls: WallParams = { shipRadius: 1.5, bounce: 0.3, scrape: 1 };
  /** fly the centreline at constant speed (no physics) */
  function cruise(c: Course, w: WallParams, seconds: number, speed = 60, offset = (_s: number): [number, number] => [0, 0]) {
    const ship = newShip();
    let s = -20;
    spawnOnTrack(ship, track, s, speed);
    const r = newRace(track, ship, 3);
    for (let i = 0; i < Math.round(seconds / dt) && !r.finished; i++) {
      s += speed * dt;
      spawnOnTrack(ship, track, s, speed);
      const [x, y] = offset(s);
      pointOnTrack(track, s, x, y, ship.pos);
      stepRace(r, ship, track, w, dt, c);
    }
    return r;
  }

  it('is one lap: crossing the line clears the level and scores it', () => {
    const r = cruise({ proving: setup, nearMiss: 2 }, walls, (track.length + 40) / 60, 60, (s) => (Math.abs(s - 300) < 5 ? [6, 0] : [0, 0]));
    expect(r.laps).toBe(1);
    expect(r.finished).toBe(true);
    expect(r.proving!.result).toBe('clear');
    expect(r.proving!.hits).toBe(1); // the slalom gate; the reverse one was flown forwards only
    expect(r.proving!.misses).toBe(1);
    expect(r.proving!.score).toBeGreaterThan(0);
  });

  it('ends the run when the clock runs out', () => {
    const r = cruise({ proving: { course, rules: { ...rules, budget: 1 } }, nearMiss: 2 }, walls, 10);
    expect(r.finished).toBe(true);
    expect(r.proving!.result).toBe('timeout');
    expect(r.finishTime).toBeCloseTo(1, 1);
  });
});

describe('open space', () => {
  const open: WallParams = { shipRadius: 1.5, bounce: 0.3, scrape: 1, open: true, oobTime: 0.5 };

  it('has no walls: the ship may leave the tube', () => {
    const ship = newShip();
    spawnOnTrack(ship, track, 100, 0);
    const r = newRace(track, ship);
    pointOnTrack(track, 100, track.radius + 5, 0, ship.pos);
    const before = ship.pos.clone();
    stepRace(r, ship, track, open, dt);
    expect(ship.pos.distanceTo(before)).toBe(0);
    expect(r.contact).toBe(false);
    expect(r.oob).toBeCloseTo(dt);
    expect(r.events).toEqual([{ type: 'oob' }]);
  });

  it('puts the ship back on the centreline after the out-of-bounds time, at a time cost', () => {
    const ship = newShip();
    spawnOnTrack(ship, track, 100, 0);
    const r = newRace(track, ship);
    r.started = true;
    const c: Course = { proving: setup, nearMiss: 2 };
    stepRace(r, ship, track, open, dt, c);
    const t0 = r.proving!.timeLeft;
    for (let i = 0; i < 0.5 / dt + 2 && r.oobResets === 0; i++) {
      pointOnTrack(track, 100, track.radius + 5, 0, ship.pos);
      stepRace(r, ship, track, open, dt, c);
    }
    expect(r.oobResets).toBe(1);
    expect(r.oob).toBe(0);
    expect(r.near.dist).toBeLessThan(0.5);
    expect(r.events.some((e) => e.type === 'oobReset')).toBe(true);
    expect(t0 - r.proving!.timeLeft).toBeGreaterThan(rules.oobPenalty);
  });

  it('collides with the walls when not open', () => {
    const ship = newShip();
    spawnOnTrack(ship, track, 100, 0);
    const r = newRace(track, ship);
    pointOnTrack(track, 100, track.radius + 5, 0, ship.pos);
    stepRace(r, ship, track, { ...open, open: false }, dt);
    expect(r.contact).toBe(true);
    expect(r.oob).toBe(0);
  });
});
