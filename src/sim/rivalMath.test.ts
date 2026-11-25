// Rival distance, time and standings on hand-made profiles (rivals.test.ts flies real laps).
import { describe, expect, it } from 'vitest';
import { generateTrack, type RaceGenParams } from '../gen/track';
import { flyBotLap, ghostProfile, rivalDistance, rivalTimeAt, standings, type Rival } from './rivals';
import type { Ghost } from './ghost';
import type { SimConfig } from './world';
import { referenceShip } from './forks';

const L = 100;
/** A rival one sample a second, slow off the line and slowing to the end. */
const rival = (name: string, profile: number[], lap = profile.length - 1): Rival => ({
  name,
  ghost: { lap, every: 1, samples: new Array(profile.length * 7).fill(0) },
  profile: Float64Array.from(profile),
});
const r = rival('r', [0, 5, 20, 40, 60, 80, 90, 95, 98, 99, 100]);

describe('rivalDistance', () => {
  it('interpolates its lap profile, lap after lap, and stops at the finish', () => {
    expect(rivalDistance(r, 0, L, 3)).toBe(0);
    expect(rivalDistance(r, -1, L, 3)).toBe(0);
    expect(rivalDistance(r, 2.5, L, 3)).toBe(30);
    expect(rivalDistance(r, 9.5, L, 3)).toBe(99.5);
    expect(rivalDistance(r, 10, L, 3)).toBe(100);
    expect(rivalDistance(r, 12.5, L, 3)).toBe(130);
    expect(rivalDistance(r, 29.9, L, 3)).toBeCloseTo(299.9);
    expect(rivalDistance(r, 30, L, 3)).toBe(300);
    expect(rivalDistance(r, 45, L, 3)).toBe(300);
  });

  it('holds at the last sample when the lap ran on past it', () => {
    const late = rival('late', [0, 30, 60, 90], 3.5);
    expect(rivalDistance(late, 3.2, L, 2)).toBe(90);
    // and the next lap starts from the line
    expect(rivalDistance(late, 3.5, L, 2)).toBe(100);
    expect(rivalDistance(late, 4.5, L, 2)).toBe(130);
  });
});

describe('rivalTimeAt', () => {
  it('inverts the profile, lap after lap', () => {
    expect(rivalTimeAt(r, 0, L, 3)).toBe(0);
    expect(rivalTimeAt(r, 5, L, 3)).toBe(1);
    expect(rivalTimeAt(r, 30, L, 3)).toBe(2.5);
    expect(rivalTimeAt(r, 99.5, L, 3)).toBe(9.5);
    expect(rivalTimeAt(r, 100, L, 3)).toBe(10);
    expect(rivalTimeAt(r, 150, L, 3)).toBe(13.5);
    expect(rivalTimeAt(r, 300, L, 3)).toBe(30);
    // past the finish: the finish time
    expect(rivalTimeAt(r, 350, L, 3)).toBe(30);
  });

  it('takes the first time it reached a distance it held for a while', () => {
    const stall = rival('stall', [0, 10, 10, 10, 20]);
    expect(rivalTimeAt(stall, 10, L, 1)).toBe(1);
    expect(rivalTimeAt(stall, 15, L, 1)).toBe(3.5);
  });

  it('gives the lap time for a profile that never reaches the line', () => {
    const short = rival('short', [0, 40, 80], 4);
    expect(rivalTimeAt(short, 90, L, 1)).toBe(4);
    expect(rivalTimeAt(rival('empty', [], 4), 50, L, 1)).toBe(4);
  });
});

describe('standings', () => {
  const quick = rival('quick', [0, 20, 40, 60, 80, 100]);
  const slow = rival('slow', [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]);

  it('orders the rivals by gap and places you among them', () => {
    // 50 m in after 5 s: quick got there at 2.5 s, slow at 10 s
    const s = standings([slow, quick], 50, 5, L, 1);
    expect(s).toEqual({ position: 2, of: 3, rivals: [{ name: 'quick', gap: -2.5 }, { name: 'slow', gap: 5 }] });
  });

  it('a dead heat is not a place lost', () => {
    expect(standings([quick], 50, 2.5, L, 1).position).toBe(1);
  });

  it('before the line, compares from the line', () => {
    expect(standings([quick], -20, 0, L, 1).rivals[0].gap).toBe(0);
  });
});

describe('ghostProfile', () => {
  const gen: RaceGenParams = { seed: 3, points: 10, radius: 300, wobble: 0.3, height: 60, twist: 0, twistNoise: 0, tubeRadius: 30, spacing: 4, checkpoints: 6 };
  const track = generateTrack(gen);
  const n = track.pos.length;
  const ghost = (idx: number[]): Ghost => ({ lap: idx.length, every: 1, samples: idx.flatMap((i) => [...track.pos[((i % n) + n) % n].toArray(), 0, 0, 0, 1]) });

  const prof = (idx: number[]) => ghostProfile(ghost(idx), track);

  it('measures from the line, unwrapping a start just behind it', () => {
    const p = prof([-2, 0, 5, 10, 4]);
    expect(p[0]).toBeCloseTo(track.s[n - 2] - track.length, 0);
    expect(p[1]).toBeCloseTo(0, 0);
    expect(p[2]).toBeCloseTo(track.s[5], 0);
    expect(p[3]).toBeCloseTo(track.s[10], 0);
    // a wobble backwards never loses ground already taken
    expect(p[4]).toBe(p[3]);
  });

  it('follows a lap all the way round and caps it at one lap', () => {
    const idx = Array.from({ length: Math.ceil(n / 10) + 2 }, (_, k) => k * 10);
    const p = prof(idx);
    for (let k = 1; k < p.length; k++) expect(p[k]).toBeGreaterThanOrEqual(p[k - 1]);
    expect(p[Math.floor(n / 20)]).toBeGreaterThan(track.length / 3);
    expect(p[p.length - 1]).toBe(track.length);
  });

  it('starts just past the line at its distance, not a lap back', () => {
    expect(prof([3])[0]).toBeCloseTo(track.s[3], 0);
    expect(prof([Math.floor(n / 2) + 3])[0]).toBeLessThan(0);
  });

  it('is empty for an empty ghost', () => {
    expect(ghostProfile({ lap: 1, every: 1, samples: [] }, track).length).toBe(0);
  });
});

describe('flyBotLap', () => {
  it('gives null without a track', () => {
    expect(flyBotLap({ track: null } as unknown as SimConfig, null, 1 / 60).next()).toEqual({ done: true, value: null });
  });

  it('yields every `every` steps up to the time limit, then gives up', () => {
    const gen: RaceGenParams = { seed: 3, points: 10, radius: 300, wobble: 0.3, height: 60, twist: 0, twistNoise: 0, tubeRadius: 30, spacing: 4, checkpoints: 6 };
    const cfg: SimConfig = { ship: referenceShip, walls: { shipRadius: 1.5, bounce: 0.3, scrape: 0.8 }, track: generateTrack(gen) };
    // one second at 60 Hz is 60 steps: nowhere near a lap
    const fly = flyBotLap(cfg, null, 1 / 60, 1, undefined, 10);
    let yields = 0;
    let r = fly.next();
    while (!r.done) {
      yields++;
      r = fly.next();
    }
    expect(yields).toBe(6);
    expect(r.value).toBeNull();
  });
});
