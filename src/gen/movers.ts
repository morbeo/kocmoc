import { rng } from '../core/rng';
import type { Track } from './track';

/**
 * Moving objects in cavern sections, in track space (s, x along `right`, y along `up`), on a fixed
 * clock so every lap and every ghost sees them in the same place:
 *
 * - slab: a flat platform drifting to and fro across the chamber along direction `a`
 * - rock: hangs from the ceiling, drops to the floor, then is gone until it hangs again
 *
 * Neither ever comes within `core` tube radii of the centreline, so the middle of a cavern is always
 * a safe line; cutting wide through the chamber is where they get in the way.
 */
export const MOVER_KINDS = ['slab', 'rock'] as const;
export type MoverKind = (typeof MOVER_KINDS)[number];

export type Mover =
  | {
      kind: 'slab';
      s: number;
      /** direction it drifts along, radians from `right` towards `up` */
      a: number;
      /** offset of its path from the centreline, across `a`, m */
      off: number;
      /** drift amplitude along `a`, m */
      amp: number;
      period: number;
      phase: number;
      /** half extents: along `a`, across it, along the track */
      hw: number;
      ht: number;
      hl: number;
    }
  | {
      kind: 'rock';
      s: number;
      /** where across the chamber it falls, m along `right` */
      x: number;
      /** ceiling and floor heights, m along `up` */
      top: number;
      bottom: number;
      r: number;
      period: number;
      /** 0..1 of the period */
      phase: number;
      /** seconds it hangs before dropping, and the drop */
      hang: number;
      fall: number;
    };

export interface MoverParams {
  seed: number;
  /** objects per cavern */
  perCavern: number;
  /** clear core round the centreline, in tube radii */
  core: number;
}

/** Where a mover is at time t: cross-section centre, velocity across it, and whether it is there at all. */
export interface MoverPose {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
}

const TAU = Math.PI * 2;

export function moverPose(m: Mover, t: number, out: MoverPose = { x: 0, y: 0, vx: 0, vy: 0, active: true }): MoverPose {
  if (m.kind === 'slab') {
    const w = TAU / m.period;
    const u = m.amp * Math.sin(w * t + m.phase);
    const du = m.amp * w * Math.cos(w * t + m.phase);
    const c = Math.cos(m.a);
    const s = Math.sin(m.a);
    // along a: (c, s); across: (-s, c)
    out.x = u * c - m.off * s;
    out.y = u * s + m.off * c;
    out.vx = du * c;
    out.vy = du * s;
    out.active = true;
    return out;
  }
  const tau = (((t / m.period + m.phase) % 1) + 1) % 1 * m.period;
  out.x = m.x;
  out.vx = 0;
  if (tau < m.hang) {
    out.y = m.top;
    out.vy = 0;
    out.active = true;
  } else if (tau < m.hang + m.fall) {
    const f = (tau - m.hang) / m.fall;
    const drop = m.top - m.bottom;
    out.y = m.top - drop * f * f;
    out.vy = (-2 * drop * f) / m.fall;
    out.active = true;
  } else {
    out.y = m.bottom;
    out.vy = 0;
    out.active = false;
  }
  return out;
}

/**
 * Movers for every cavern section, spread through its fully-open middle and kept inside its
 * narrowest wall (1.9 tube radii) and outside the clear core.
 */
export function generateMovers(track: Track, p: MoverParams): Mover[] {
  const out: Mover[] = [];
  if (p.perCavern <= 0) return out;
  const R = track.radius;
  const inner = R * Math.max(0.3, p.core);
  const wall = R * 1.85;
  (track.sections ?? []).forEach((sec, si) => {
    if (sec.kind !== 'cavern') return;
    const rand = rng((p.seed * 977 + si * 131 + 17) >>> 0);
    const a0 = sec.s0 + sec.ramp + R;
    const a1 = sec.s1 - sec.ramp - R;
    if (a1 <= a0) return;
    for (let k = 0; k < p.perCavern; k++) {
      const s = a0 + ((k + 0.25 + 0.5 * rand()) / p.perCavern) * (a1 - a0);
      const side = rand() < 0.5 ? -1 : 1;
      if (k % 2 === 0) {
        const ht = 1.5 + rand();
        const hw = R * (0.35 + 0.2 * rand());
        const off = side * (inner + ht + (wall - inner - ht) * 0.35 * rand());
        const reach = Math.sqrt(Math.max(0, wall * wall - off * off)) - hw;
        out.push({ kind: 'slab', s, a: rand() * TAU, off, amp: Math.max(0, reach), period: 5 + 4 * rand(), phase: rand() * TAU, hw, ht, hl: R * (0.3 + 0.2 * rand()) });
      } else {
        const r = 2.5 + 3 * rand();
        const x = side * (inner + r + (wall * 0.7 - inner - r) * rand());
        const h = Math.sqrt(Math.max(0, wall * wall - x * x)) - r;
        out.push({ kind: 'rock', s, x, top: h, bottom: -h, r, period: 6 + 4 * rand(), phase: rand(), hang: 1.2, fall: 1.4 });
      }
    }
  });
  return out.sort((a, b) => a.s - b.s);
}
