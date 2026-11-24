import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { openLines, raceSpan, RUN_OFF, RUN_UP, sampleTrack, segmentAt, startLine, type Track } from '../gen/track';
import { pointOnTrack, sampleAt } from '../gen/gauntlet';
import { compileTrack } from '../gen/trackDoc';
import { bundledTracks } from '../core/scenarios';
import { newShip } from './ship';
import { collideEnds, newRace, raceDistance, RUN_OFF_STOP, spawnOnTrack, startSpawnS, stepRace, type RaceEvent, type WallParams } from './race';
import { GhostRecorder, type Ghost } from './ghost';
import { ghostProfile, makeRival, recordBotLap, standings } from './rivals';
import { referenceShip } from './forks';
import type { SimConfig } from './world';

/** A gentle S, about 1.6 km, point to point. */
const ctrl = [new Vector3(0, 0, 0), new Vector3(0, 0, -400), new Vector3(200, 0, -800), new Vector3(0, 0, -1200), new Vector3(0, 0, -1600)];
const track: Track = { ...sampleTrack(ctrl, ctrl.map(() => 0), { closed: false, spacing: 4, radius: 30, checkpoints: 4, twist: 0 }), attempts: 0 };
const L = track.length;
const walls: WallParams = { shipRadius: 1.5, bounce: 0.3, scrape: 1 };
const dt = 1 / 120;

/** Fly the centreline at `speed` from `s0` (no ship physics), running race rules each step. */
function cruise(speed: number, seconds: number, s0 = startSpawnS(track)) {
  const ship = newShip();
  let s = s0;
  spawnOnTrack(ship, track, s, speed);
  const r = newRace(track, ship, 3);
  const rec = new GhostRecorder();
  const events: RaceEvent['type'][] = [];
  let ghost: Ghost | null = null;
  for (let i = 0; i < Math.round(seconds / dt); i++) {
    s += speed * dt;
    // on the line until the finish, then coasting on whatever speed the run-off leaves
    if (!r.finished) spawnOnTrack(ship, track, s, speed);
    else ship.pos.addScaledVector(ship.vel, dt);
    stepRace(r, ship, track, walls, dt);
    for (const e of r.events) events.push(e.type);
    r.events.length = 0;
    ghost ??= rec.update(r, ship);
  }
  return { r, ship, events, ghost };
}

describe('open track lines', () => {
  it('has a run-up before the start line and a run-off after the finish gate', () => {
    expect(track.closed).toBe(false);
    expect(track.start).toBeCloseTo(RUN_UP);
    expect(track.finish).toBeCloseTo(L - RUN_OFF);
    expect(startLine(track)).toBe(track.start);
    expect(raceSpan(track)).toBeCloseTo(L - RUN_UP - RUN_OFF);
    // checkpoint 0 is the start line; the rest split the run evenly
    expect(track.checkpoints[0]).toBeCloseTo(RUN_UP);
    const step = raceSpan(track) / 4;
    track.checkpoints.forEach((c, k) => expect(c).toBeCloseTo(RUN_UP + k * step));
  });

  it('keeps the run-up and run-off in proportion on a short track', () => {
    expect(openLines(300)).toEqual({ start: 30, finish: 240 });
    expect(openLines(5000)).toEqual({ start: RUN_UP, finish: 5000 - RUN_OFF });
  });

  it('a loop races its whole length from s = 0', () => {
    const loop = sampleTrack([new Vector3(0, 0, 0), new Vector3(300, 0, 0), new Vector3(300, 0, 300), new Vector3(0, 0, 300)], [0, 0, 0, 0], { closed: true, spacing: 4, radius: 30, checkpoints: 4, twist: 0 });
    expect(loop.start).toBeUndefined();
    expect(startLine(loop)).toBe(0);
    expect(raceSpan(loop)).toBe(loop.length);
    expect(loop.checkpoints[0]).toBe(0);
  });

  it('segmentAt clamps to the ends of an open track instead of wrapping', () => {
    const n = track.pos.length;
    expect(segmentAt(track, -50)).toEqual([0, 1, 0]);
    expect(segmentAt(track, L + 50)).toEqual([n - 2, n - 1, 1]);
    const [i, j, f] = segmentAt(track, L / 2);
    expect(j).toBe(i + 1);
    expect(track.s[i] + f * (track.s[j] - track.s[i])).toBeCloseTo(L / 2, 6);
    expect(sampleAt(track, L + 10)).toBe(n - 2);
    expect(pointOnTrack(track, L + 100, 0, 0, new Vector3()).distanceTo(track.pos[n - 1])).toBeLessThan(1e-6);
  });

  it('spawns halfway down the run-up, facing along the track', () => {
    const ship = newShip();
    spawnOnTrack(ship, track, startSpawnS(track), 0);
    expect(startSpawnS(track)).toBeCloseTo(RUN_UP / 2);
    expect(ship.pos.distanceTo(track.pos[0])).toBeCloseTo(RUN_UP / 2, 0);
    expect(new Vector3(0, 0, -1).applyQuaternion(ship.quat).dot(track.tan[0])).toBeGreaterThan(0.99);
    // past either end: held at the end, not wrapped round
    spawnOnTrack(ship, track, L + 200, 0);
    expect(ship.pos.distanceTo(track.pos[track.pos.length - 1])).toBeLessThan(1e-6);
  });
});

describe('point-to-point race', () => {
  it('is one run whatever the lap count: start, checkpoints, finish', () => {
    const { r, events } = cruise(100, (raceSpan(track) + RUN_UP) / 100 + 1);
    expect(r.laps).toBe(1);
    expect(r.finished).toBe(true);
    expect(events.filter((e) => e === 'start')).toHaveLength(1);
    expect(events.filter((e) => e === 'checkpoint')).toHaveLength(3);
    expect(events.filter((e) => e === 'finish')).toHaveLength(1);
    expect(r.finishTime).toBeCloseTo(raceSpan(track) / 100, 1);
    expect(r.lapTimes).toEqual([r.finishTime]);
    expect(r.bestLap).toBe(r.finishTime);
    expect(r.splits).toEqual([]);
  });

  it('counts distance from the start line', () => {
    const ship = newShip();
    spawnOnTrack(ship, track, startSpawnS(track), 0);
    const r = newRace(track, ship);
    expect(r.along).toBeCloseTo(-RUN_UP / 2, 0);
    expect(raceDistance(r, raceSpan(track))).toBeCloseTo(-RUN_UP / 2, 0);
    const half = cruise(100, (RUN_UP / 2 + raceSpan(track) / 2) / 100).r;
    expect(raceDistance(half, raceSpan(track))).toBeCloseTo(raceSpan(track) / 2, -1);
    const done = cruise(100, (RUN_UP / 2 + raceSpan(track)) / 100 + 0.2).r;
    expect(done.finished).toBe(true);
    expect(raceDistance(done, raceSpan(track))).toBeGreaterThanOrEqual(raceSpan(track));
  });

  it('run-off brakes a finished ship to a stop before the end of the tube', () => {
    const { r, ship } = cruise(180, 12);
    expect(r.finished).toBe(true);
    expect(ship.vel.length()).toBeLessThan(1);
    expect(r.near.s).toBeLessThan(L);
    expect(r.near.s).toBeGreaterThan(track.finish!);
    expect(L - r.near.s).toBeGreaterThan(RUN_OFF_STOP / 2);
    expect(r.wallHits).toBe(0);
  });

  it('the end walls stop a ship flying out of either end', () => {
    for (const [s, dir] of [[2, -1], [L - 2, 1]] as const) {
      const ship = newShip();
      spawnOnTrack(ship, track, s, 0);
      const i = segmentAt(track, s)[0];
      ship.vel.copy(track.tan[i]).multiplyScalar(dir * 50);
      ship.pos.addScaledVector(track.tan[i], dir * 3);
      expect(collideEnds(ship, track, s, walls)).toBe(true);
      // back inside by the ship's radius, and moving away from the wall
      const e = dir < 0 ? 0 : track.pos.length - 1;
      const inward = track.tan[e].clone().multiplyScalar(-dir);
      expect(ship.pos.clone().sub(track.pos[e]).dot(inward)).toBeCloseTo(walls.shipRadius, 6);
      expect(ship.vel.dot(inward)).toBeGreaterThan(0);
    }
    // nowhere near an end: nothing to hit
    const ship = newShip();
    spawnOnTrack(ship, track, L / 2, 50);
    expect(collideEnds(ship, track, L / 2, walls)).toBe(false);
  });

  it('a ghost of the run starts at the line and ends at the finish gate', () => {
    const { ghost } = cruise(100, (RUN_UP / 2 + raceSpan(track)) / 100 + 1);
    expect(ghost).not.toBeNull();
    expect(ghost!.lap).toBeCloseTo(raceSpan(track) / 100, 1);
    const prof = ghostProfile(ghost!, track);
    expect(prof[0]).toBeLessThan(5);
    expect(prof[prof.length - 1]).toBeLessThanOrEqual(raceSpan(track));
    expect(prof[prof.length - 1]).toBeGreaterThan(raceSpan(track) - 5);
    // racing it: level at the start, and its time is the run
    const rival = makeRival('BEST', ghost!, track);
    const st = standings([rival], raceSpan(track) / 2, raceSpan(track) / 200, raceSpan(track), 1);
    expect(Math.abs(st.rivals[0].gap)).toBeLessThan(0.1);
  });
});

describe('autopilot on an open track', () => {
  it('flies the bundled Canyon Run to the finish gate and stops in the run-off', () => {
    const doc = bundledTracks['canyon-run'];
    expect(doc?.closed).toBe(false);
    const t = compileTrack(doc!).track;
    const cfg: SimConfig = { ship: referenceShip, walls, track: t };
    const ghost = recordBotLap(cfg, null, dt, 120);
    expect(ghost).not.toBeNull();
    expect(ghost!.lap).toBeGreaterThan(raceSpan(t) / 250);
    expect(ghost!.lap).toBeLessThan(raceSpan(t) / 40);
  });
});
