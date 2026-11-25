import { describe, expect, it } from 'vitest';
import { Quaternion, Vector3 } from 'three';
import { GhostRecorder, parseGhost, sampleGhost, type Ghost } from './ghost';
import type { RaceState } from './race';
import type { ShipState } from './ship';

/** Just the race fields the recorder reads. */
const raceAt = (lap: number, lapTime: number, lastLap: number | null = null, started = true) =>
  ({ started, lap, lapTime, lastLap }) as RaceState;
const shipAt = (x: number, y = 0, z = 0, quat = new Quaternion()) => ({ pos: new Vector3(x, y, z), quat }) as ShipState;

describe('GhostRecorder', () => {
  it('samples every `every` seconds of lap time and hands back the lap when the line is crossed', () => {
    const rec = new GhostRecorder(0.5);
    expect(rec.update(raceAt(1, 0), shipAt(1))).toBeNull();
    expect(rec.update(raceAt(1, 0.25), shipAt(2))).toBeNull(); // before the next sample time
    expect(rec.update(raceAt(1, 0.5), shipAt(3))).toBeNull(); // exactly on it
    const lap = rec.update(raceAt(2, 0, 0.9), shipAt(9));
    expect(lap).toEqual({ lap: 0.9, every: 0.5, samples: [1, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 1] });
  });

  it('rounds positions to cm and quaternions to 4 places', () => {
    const rec = new GhostRecorder(1);
    const q = new Quaternion(0.123456, 0.654321, -0.000049, 0.5);
    rec.update(raceAt(1, 0), shipAt(1.23456, -7.891, 1234.5678, q));
    expect(rec.update(raceAt(2, 0, 3), shipAt(0))!.samples).toEqual([1.23, -7.89, 1234.57, 0.1235, 0.6543, -0, 0.5]);
  });

  it('hands back nothing for the lap it joined part-way or without a lap time', () => {
    const rec = new GhostRecorder(0.5);
    // lap 0 is the run-up to the line
    rec.update(raceAt(0, 0), shipAt(0));
    expect(rec.update(raceAt(1, 0, 5), shipAt(1))).toBeNull();
    // no last lap time: nothing to name the ghost by
    expect(rec.update(raceAt(2, 0, null), shipAt(2))).toBeNull();
    expect(rec.update(raceAt(3, 0, 4), shipAt(3))).toEqual({ lap: 4, every: 0.5, samples: [2, 0, 0, 0, 0, 0, 1] });
  });

  it('drops the lap so far while the race is not started, and on reset', () => {
    const rec = new GhostRecorder(0.5);
    rec.update(raceAt(1, 0), shipAt(1));
    expect(rec.update(raceAt(1, 0.5, null, false), shipAt(2))).toBeNull();
    // restarted on lap 1 again: the old samples are gone, so this crossing is not a lap
    expect(rec.update(raceAt(2, 0, 3), shipAt(3))).toBeNull();
    rec.update(raceAt(3, 0, 3), shipAt(4));
    rec.reset();
    rec.update(raceAt(3, 0, 3), shipAt(5));
    expect(rec.update(raceAt(4, 0, 2), shipAt(6))).toEqual({ lap: 2, every: 0.5, samples: [5, 0, 0, 0, 0, 0, 1] });
  });
});

describe('sampleGhost', () => {
  const turn = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
  const ghost: Ghost = {
    lap: 1,
    every: 0.5,
    samples: [0, 10, 20, 0, 0, 0, 1, 4, 16, 28, turn.x, turn.y, turn.z, turn.w, 8, 22, 36, 0, 0, 0, 1],
  };

  it('interpolates position and slerps orientation between samples', () => {
    const pos = new Vector3();
    const quat = new Quaternion();
    expect(sampleGhost(ghost, 0.125, pos, quat)).toBe(true);
    expect(pos.toArray()).toEqual([1, 11.5, 22]);
    const want = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 8);
    expect(quat.angleTo(want)).toBeLessThan(1e-6);
    expect(sampleGhost(ghost, 0.75, pos, quat)).toBe(true);
    expect(pos.toArray()).toEqual([6, 19, 32]);
  });

  it('normalises the stored quaternions before blending', () => {
    const g: Ghost = { lap: 1, every: 1, samples: [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2] };
    const quat = new Quaternion();
    sampleGhost(g, 0.5, new Vector3(), quat);
    expect(quat.toArray()).toEqual([0, 0, 0, 1]);
  });

  it('is false before the start, after the last sample, and with no samples', () => {
    const pos = new Vector3(7, 7, 7);
    const quat = new Quaternion();
    expect(sampleGhost(ghost, -0.01, pos, quat)).toBe(false);
    expect(sampleGhost(ghost, 1, pos, quat)).toBe(false);
    expect(sampleGhost(ghost, 1.5, pos, quat)).toBe(false);
    expect(sampleGhost({ lap: 1, every: 0.5, samples: [] }, 0, pos, quat)).toBe(false);
    expect(pos.toArray()).toEqual([7, 7, 7]);
    expect(sampleGhost(ghost, 0, pos, quat)).toBe(true);
    expect(sampleGhost(ghost, 0.99, pos, quat)).toBe(true);
  });
});

describe('parseGhost', () => {
  const ok = { lap: 30, every: 0.1, samples: [1, 2, 3, 0, 0, 0, 1] };

  it('keeps a valid ghost', () => {
    expect(parseGhost(ok)).toEqual(ok);
    expect(parseGhost(JSON.parse(JSON.stringify(ok)))).toEqual(ok);
  });

  it.each([
    ['null', null],
    ['a number', 3],
    ['a string', 'ghost'],
    ['no lap', { ...ok, lap: undefined }],
    ['a string lap', { ...ok, lap: '30' }],
    ['no sample rate', { ...ok, every: undefined }],
    ['samples not a list', { ...ok, samples: '1,2,3' }],
    ['a partial sample', { ...ok, samples: [1, 2, 3, 0, 0, 0] }],
    ['a non-finite sample', { ...ok, samples: [1, 2, NaN, 0, 0, 0, 1] }],
    ['a string sample', { ...ok, samples: [1, 2, '3', 0, 0, 0, 1] }],
  ])('rejects %s', (_, raw) => {
    expect(parseGhost(raw)).toBeNull();
  });
});
