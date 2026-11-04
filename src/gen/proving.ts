import { rng } from '../core/rng';
import type { Track } from './track';

/**
 * Proving ground course (after the X-Wing Pilot Proving Ground): gate hoops to fly through and
 * time beacons placed off the racing line. Everything is in track space like the gauntlet:
 * `s` along the centreline, (x, y) across it along the track's right and up vectors.
 */

export const GATE_PATTERNS = ['slalom', 'spiral', 'pairs', 'reverse'] as const;
export type GatePattern = (typeof GATE_PATTERNS)[number];

export interface ProvingGenParams {
  seed: number;
  /** clear run-up after the start line, m */
  lead: number;
  /** track length per gate group, m */
  groupLength: number;
  /** gates per group */
  gates: number;
  /** gate opening radius at difficulty 0 and 1, m */
  gateRadius: number;
  gateRadiusMin: number;
  /** how far gates sit off the centreline at difficulty 0 and 1, as a share of the room left */
  offsetMin: number;
  offsetMax: number;
  /** difficulty of the first and last group; it ramps linearly in between */
  rampStart: number;
  rampEnd: number;
  /** time beacons per group */
  beacons: number;
  /** pickup radius of a beacon, m */
  beaconRadius: number;
  shipRadius: number;
  patterns: GatePattern[];
}

export interface Gate {
  s: number;
  x: number;
  y: number;
  /** opening radius, m */
  r: number;
  /** credited only when crossed backwards */
  reverse: boolean;
  pattern: GatePattern;
  group: number;
}

export interface Beacon {
  s: number;
  x: number;
  y: number;
  r: number;
}

export interface ProvingCourse {
  /** sorted by s */
  gates: Gate[];
  beacons: Beacon[];
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;

/** Deterministic gate and beacon layout for a track. Gate openings never get below 1.6 ship radii. */
export function generateProving(track: Track, p: ProvingGenParams): ProvingCourse {
  const rand = rng((p.seed ^ 0x51ed270b) >>> 0);
  const R = track.radius;
  const len = Math.max(60, p.groupLength);
  const first = Math.max(0, p.lead);
  const end = track.length - Math.max(60, len * 0.4);
  const count = Math.max(0, Math.floor((end - first) / len));
  const patterns = p.patterns.length ? p.patterns : (['slalom'] as GatePattern[]);
  const n = Math.max(1, Math.round(p.gates));
  const minR = Math.max(p.shipRadius * 1.6, 0.5);
  const gates: Gate[] = [];
  const beacons: Beacon[] = [];
  const pick = <T>(xs: readonly T[]) => xs[Math.floor(rand() * xs.length) % xs.length];

  let prev: GatePattern | undefined;
  for (let c = 0; c < count; c++) {
    const s0 = first + c * len;
    const d = lerp(p.rampStart, p.rampEnd, count > 1 ? c / (count - 1) : 0);
    const options = patterns.length > 1 ? patterns.filter((k) => k !== prev) : patterns;
    const pattern = pick(options);
    prev = pattern;
    const r = Math.min(R * 0.6, Math.max(minR, lerp(p.gateRadius, p.gateRadiusMin, d)));
    const room = Math.max(0, R - r - 1);
    const off = room * Math.min(1, Math.max(0, lerp(p.offsetMin, p.offsetMax, d)));
    // gates take the first 80% of the group; the rest is room to line up for the next one
    const span = len * 0.8;
    const at = (k: number) => s0 + (span * (k + 0.5)) / n;
    const a = rand() * TAU;
    const turn = (rand() < 0.5 ? -1 : 1) * Math.PI * lerp(0.3, 0.55, d);
    const angles: number[] = [];
    for (let k = 0; k < n; k++) {
      if (pattern === 'slalom') angles.push(a + (k % 2) * Math.PI);
      else if (pattern === 'spiral') angles.push(a + k * turn);
      else if (pattern === 'pairs') angles.push(a + Math.floor(k / 2) * Math.PI);
      else angles.push(a);
    }
    for (let k = 0; k < n; k++) {
      // reverse: the last gate of the group is flown backwards; it is a little bigger, and dead centre
      const reverse = pattern === 'reverse' && k === n - 1;
      const gr = reverse ? Math.min(R * 0.6, r * 1.4) : r;
      const o = reverse ? 0 : off;
      gates.push({ s: at(k), x: o * Math.cos(angles[k]), y: o * Math.sin(angles[k]), r: gr, reverse, pattern, group: c });
    }
    // beacons: off the racing line, near the wall on the far side from the gates around them
    const nb = Math.max(0, Math.round(p.beacons));
    const br = Math.max(0.5, p.beaconRadius);
    for (let k = 0; k < nb; k++) {
      const g = Math.min(n - 1, Math.floor(((k + 0.5) * n) / nb));
      const s = g < n - 1 ? (at(g) + at(g + 1)) / 2 : at(g) + span / n / 2;
      const ba = angles[g] + Math.PI + (rand() - 0.5) * 0.8;
      const rr = Math.max(0, R - br - 2) * lerp(0.7, 0.95, d);
      beacons.push({ s, x: rr * Math.cos(ba), y: rr * Math.sin(ba), r: br });
    }
  }
  gates.sort((x, y) => x.s - y.s);
  beacons.sort((x, y) => x.s - y.s);
  return { gates, beacons };
}
