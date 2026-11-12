import { describe, it, expect } from 'vitest';
import { generateTrack, type RaceGenParams } from './track';
import { generateProving, type ProvingGenParams } from './proving';

const track = generateTrack({ seed: 5, points: 10, radius: 600, wobble: 0.3, height: 100, twist: 0, twistNoise: 0.3, tubeRadius: 30, spacing: 4, checkpoints: 6 } satisfies RaceGenParams);
const base: ProvingGenParams = {
  seed: 9,
  lead: 250,
  groupLength: 320,
  gates: 4,
  gateRadius: 10,
  gateRadiusMin: 5,
  offsetMin: 0.2,
  offsetMax: 0.7,
  rampStart: 0,
  rampEnd: 1,
  beacons: 1,
  beaconRadius: 3,
  shipRadius: 1.5,
  patterns: ['slalom', 'spiral', 'pairs'],
};

describe('generateProving', () => {
  it('is deterministic per seed', () => {
    expect(generateProving(track, base)).toEqual(generateProving(track, base));
    expect(generateProving(track, { ...base, seed: 10 })).not.toEqual(generateProving(track, base));
  });

  it('keeps every gate inside the tube, flyable, after the run-up and sorted', () => {
    const { gates } = generateProving(track, { ...base, gateRadiusMin: 0.1 });
    expect(gates.length).toBeGreaterThan(20);
    for (const g of gates) {
      expect(Math.hypot(g.x, g.y) + g.r).toBeLessThanOrEqual(track.radius);
      expect(g.r).toBeGreaterThanOrEqual(1.6 * base.shipRadius);
      expect(g.s).toBeGreaterThanOrEqual(base.lead);
      expect(g.s).toBeLessThan(track.length);
    }
    expect(gates.map((g) => g.s)).toEqual(gates.map((g) => g.s).sort((a, b) => a - b));
  });

  it('tightens gates and moves them off the centre as difficulty ramps', () => {
    const { gates } = generateProving(track, base);
    const first = gates.filter((g) => g.group === 0);
    const last = gates.filter((g) => g.group === gates[gates.length - 1].group);
    expect(last[0].r).toBeLessThan(first[0].r);
    expect(Math.hypot(last[0].x, last[0].y)).toBeGreaterThan(Math.hypot(first[0].x, first[0].y));
  });

  it('alternates sides in a slalom and turns steadily in a spiral', () => {
    const slalom = generateProving(track, { ...base, patterns: ['slalom'] }).gates.filter((g) => g.group === 1);
    for (let k = 1; k < slalom.length; k++) {
      // opposite sides: the offsets point in opposite directions
      expect(slalom[k].x * slalom[k - 1].x + slalom[k].y * slalom[k - 1].y).toBeLessThan(0);
    }
    const spiral = generateProving(track, { ...base, patterns: ['spiral'] }).gates.filter((g) => g.group === 1);
    const ang = spiral.map((g) => Math.atan2(g.y, g.x));
    const step = (k: number) => Math.atan2(Math.sin(ang[k] - ang[k - 1]), Math.cos(ang[k] - ang[k - 1]));
    for (let k = 2; k < ang.length; k++) expect(step(k)).toBeCloseTo(step(1), 6);
    expect(Math.abs(step(1))).toBeGreaterThan(0.5);
  });

  it('adds reverse gates only when asked: the last of a group, dead centre', () => {
    expect(generateProving(track, base).gates.some((g) => g.reverse)).toBe(false);
    const { gates } = generateProving(track, { ...base, patterns: ['reverse'] });
    const rev = gates.filter((g) => g.reverse);
    expect(rev.length).toBe(new Set(gates.map((g) => g.group)).size);
    for (const g of rev) {
      expect(Math.hypot(g.x, g.y)).toBe(0);
      const group = gates.filter((x) => x.group === g.group);
      expect(group[group.length - 1]).toBe(g);
    }
  });

  it('puts beacons off the racing line, near the wall', () => {
    const { beacons, gates } = generateProving(track, { ...base, beacons: 2 });
    expect(beacons.length).toBe(2 * new Set(gates.map((g) => g.group)).size);
    for (const b of beacons) {
      const r = Math.hypot(b.x, b.y);
      expect(r).toBeGreaterThan(track.radius * 0.5);
      expect(r + b.r).toBeLessThanOrEqual(track.radius);
    }
  });
});
