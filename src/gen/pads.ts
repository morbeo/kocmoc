import { rng } from '../core/rng';
import type { Track } from './track';

/**
 * Speed zones on the main loop, in track space (arc length `s`, cross-section x along `right`,
 * y along `up`):
 *
 * - boost: a glowing strip laid along the wall at angle `theta`; flying over it, within `depth` of
 *   the wall, pushes you forward up to the pad speed
 * - slow: murk filling the tube except a clear lane along the wall at `theta`; inside it the ship
 *   is dragged down. Points whose projection on the lane direction is below `w` are murky.
 *
 * Both keep clear of the start line, forks, shaped sections and hazards, so they are always in a
 * round tube and their lanes are simple to aim at.
 */
export const PAD_KINDS = ['boost', 'slow'] as const;
export type PadKind = (typeof PAD_KINDS)[number];

export interface Pad {
  kind: PadKind;
  s0: number;
  s1: number;
  /** direction of the strip (boost) or the clear lane (slow) in the cross-section, radians */
  theta: number;
  /** boost: half the strip's angular width, radians */
  half: number;
  /** boost: how far off the wall the push still reaches, m */
  depth: number;
  /** slow: murk where x·cos θ + y·sin θ < w, m */
  w: number;
}

export interface PadParams {
  seed: number;
  boosts: number;
  slows: number;
  /** boost strip length, m */
  boostLength: number;
  /** slow field length, m */
  slowLength: number;
  /** arc lengths to keep clear of (hazards), m */
  avoid?: number[];
}

/** Where to fly to use a pad: over the strip, or down the clear lane. */
export function padLane(p: Pad, R: number): [number, number] {
  const r = p.kind === 'boost' ? R - p.depth * 0.5 : (R + Math.max(p.w, 0)) / 2 + R * 0.1;
  return [r * Math.cos(p.theta), r * Math.sin(p.theta)];
}

/** Is cross-section point (x, y) inside the pad's zone (ignoring s)? */
export function inPad(p: Pad, x: number, y: number, R: number): boolean {
  if (p.kind === 'slow') return x * Math.cos(p.theta) + y * Math.sin(p.theta) < p.w;
  const r = Math.hypot(x, y);
  if (r < R - p.depth) return false;
  let d = Math.atan2(y, x) - p.theta;
  d -= Math.round(d / (2 * Math.PI)) * 2 * Math.PI;
  return Math.abs(d) <= p.half;
}

/** Pads sorted by s0; every slow field leaves a clear lane at least a third of the tube wide. */
export function generatePads(track: Track, p: PadParams): Pad[] {
  const out: Pad[] = [];
  const total = Math.max(0, p.boosts) + Math.max(0, p.slows);
  if (!total) return out;
  const rand = rng((p.seed * 0x85ebca6b + 0x1234) >>> 0);
  const R = track.radius;
  const L = track.length;
  const busy = (a: number, b: number) =>
    a < 300 ||
    b > L - 150 ||
    (track.branches ?? []).some((x) => b > x.s0 - R * 3 && a < x.s1 + R * 3) ||
    (track.sections ?? []).some((x) => b > x.s0 - R && a < x.s1 + R) ||
    (p.avoid ?? []).some((s) => s > a - R * 2 && s < b + R * 2) ||
    out.some((q) => b > q.s0 - R * 2 && a < q.s1 + R * 2);
  // interleave the kinds so boosts and slows alternate round the lap
  const order: PadKind[] = [];
  for (let b = p.boosts, sl = p.slows; b > 0 || sl > 0; ) {
    if (b > 0) (order.push('boost'), b--);
    if (sl > 0) (order.push('slow'), sl--);
  }
  order.forEach((kind, k) => {
    const len = Math.max(10, kind === 'boost' ? p.boostLength : p.slowLength) * (0.8 + 0.4 * rand());
    let s0 = -1;
    for (let attempt = 0; attempt < 48 && s0 < 0; attempt++) {
      const c = attempt < 24 ? ((k + 0.2 + rand() * 0.6) / order.length) * L : rand() * L;
      if (!busy(c, c + len)) s0 = c;
    }
    if (s0 < 0) return;
    const theta = rand() * Math.PI * 2;
    out.push({
      kind,
      s0,
      s1: s0 + len,
      theta,
      half: kind === 'boost' ? 0.3 + 0.1 * rand() : 0,
      depth: kind === 'boost' ? R * 0.45 : 0,
      w: kind === 'slow' ? R * (0.2 + 0.15 * rand()) : 0,
    });
  });
  return out.sort((a, b) => a.s0 - b.s0);
}
