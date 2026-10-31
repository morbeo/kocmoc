import { describe, it, expect } from 'vitest';
import { generateTrack, type RaceGenParams } from '../gen/track';
import { newShip, type ShipParams } from './ship';
import { newRace, raceDistance, spawnOnTrack, stepRace, type RaceState } from './race';
import { GhostRecorder, type Ghost } from './ghost';
import { makeRival, recordBotLap, rivalDistance, rivalTimeAt, standings } from './rivals';

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
const L = track.length;
const walls = { shipRadius: 1.5, bounce: 0.3, scrape: 1 };
const dt = 1 / 120;

/** Fly the centreline at `speed`, racing `laps`; returns the race and the first lap as a ghost. */
function cruise(speed: number, seconds: number, laps = 0): { r: RaceState; ghost: Ghost | null } {
  const ship = newShip();
  let s = -10;
  spawnOnTrack(ship, track, s, speed);
  const r = newRace(track, ship, laps);
  const rec = new GhostRecorder();
  let ghost: Ghost | null = null;
  for (let i = 0; i < Math.round(seconds / dt); i++) {
    s += speed * dt;
    spawnOnTrack(ship, track, s, speed);
    stepRace(r, ship, track, walls, dt);
    ghost ??= rec.update(r, ship);
  }
  return { r, ghost };
}

describe('race length', () => {
  it('finishes after the last lap and stops the clock', () => {
    const speed = 100;
    const lap = L / speed;
    const { r } = cruise(speed, lap * 2 + 3, 2);
    expect(r.finished).toBe(true);
    expect(r.lapTimes).toHaveLength(2);
    expect(r.finishTime!).toBeCloseTo(lap * 2, 0);
    expect(r.raceTime).toBe(r.finishTime);
    expect(raceDistance(r, L)).toBeGreaterThan(L * 2);
  });

  it('0 laps is endless practice', () => {
    const { r } = cruise(100, (L / 100) * 3 + 1, 0);
    expect(r.finished).toBe(false);
    expect(r.lap).toBe(4);
  });

  it('race distance is negative before the line and grows across laps', () => {
    const ship = newShip();
    spawnOnTrack(ship, track, -10, 0);
    const r = newRace(track, ship, 3);
    expect(raceDistance(r, L)).toBeLessThan(0);
    const { r: r2 } = cruise(100, L / 100 + 2, 3);
    expect(raceDistance(r2, L)).toBeCloseTo(L + 100 * 2 - 10, -1);
  });
});

describe('rivals', () => {
  const speed = 80;
  const { ghost } = cruise(speed, L / speed + 1);
  const rival = makeRival('steady', ghost!, track);

  it('profiles a ghost lap as distance from the line, never decreasing', () => {
    const p = rival.profile;
    expect(p[0]).toBeGreaterThanOrEqual(-2);
    expect(p[0]).toBeLessThan(speed * ghost!.every + 2);
    expect(p[p.length - 1]).toBeGreaterThan(L - speed * 0.1);
    for (let i = 1; i < p.length; i++) expect(p[i]).toBeGreaterThanOrEqual(p[i - 1]);
  });

  it('flies its lap over and over and stops at the finish', () => {
    const lap = ghost!.lap;
    expect(rivalDistance(rival, lap * 0.5, L, 3)).toBeCloseTo(L * 0.5, -1);
    expect(rivalDistance(rival, lap * 1.5, L, 3)).toBeCloseTo(L * 1.5, -1);
    expect(rivalDistance(rival, lap * 10, L, 3)).toBe(L * 3);
  });

  it('time at a distance inverts distance at a time', () => {
    for (const t of [3, 10, 25, ghost!.lap + 4]) {
      const d = rivalDistance(rival, t, L, 3);
      expect(rivalTimeAt(rival, d, L, 3)).toBeCloseTo(t, 1);
    }
    expect(rivalTimeAt(rival, L * 3, L, 3)).toBeCloseTo(ghost!.lap * 3, 5);
  });

  it('places you by the time gap at your distance', () => {
    const slow = makeRival('slow', cruise(60, L / 60 + 1).ghost!, track);
    const fast = makeRival('fast', cruise(100, L / 100 + 1).ghost!, track);
    // you at the steady pace, halfway round
    const t = ghost!.lap / 2;
    const st = standings([slow, fast], L / 2, t, L, 3);
    expect(st.position).toBe(2);
    expect(st.of).toBe(3);
    expect(st.rivals.map((s) => s.name)).toEqual(['fast', 'slow']);
    expect(st.rivals[0].gap).toBeCloseTo(L / 2 / 100 - t, 0);
    expect(st.rivals[1].gap).toBeGreaterThan(0);
  });

  it('at the finish, compares finish times', () => {
    const fast = makeRival('fast', cruise(100, L / 100 + 1).ghost!, track);
    const st = standings([fast], 2 * L, 2 * (L / 90), L, 2);
    expect(st.position).toBe(2);
    expect(st.rivals[0].gap).toBeCloseTo(2 * (L / 100) - 2 * (L / 90), 1);
  });
});

describe('autopilot rival', () => {
  const ship: ShipParams = {
    thrust: 60, reverse: 40, strafe: 35, turnRate: [1.8, 1.4, 3], turnResponse: 8, maxSpeed: 120,
    overspeedDecay: 1.5, boostThrust: 160, boostSpeed: 240, boostDrain: 0.35, boostRegen: 0.15, assist: true, assistDamp: 2.5,
  };

  it('records a whole lap, the same every time', () => {
    const cfg = { ship, walls, track };
    const a = recordBotLap(cfg, null, dt);
    const b = recordBotLap(cfg, null, dt);
    expect(a).not.toBeNull();
    expect(a!.lap).toBeGreaterThan(L / 130);
    expect(a!.samples).toEqual(b!.samples);
    expect(makeRival('bot', a!, track).profile.at(-1)).toBeGreaterThan(L - 10);
  });
});
