import type { Vector3 } from 'three';
import { rng } from '../core/rng';
import type { Track } from './track';

/**
 * Gauntlet obstacles live in track space: `s` is arc length along the centreline and (x, y) are
 * offsets across it along the track's right and up vectors. That keeps every shape a simple 2D
 * test in the cross-section, whatever the track does in 3D.
 */

export const CHUNK_KINDS = ['ring', 'slalom', 'crusher', 'laser', 'turbine', 'debris'] as const;
export type ChunkKind = (typeof CHUNK_KINDS)[number];

export interface GauntletParams {
  seed: number;
  /** track length taken by one chunk, m */
  chunkLength: number;
  /** obstacle-free run-up after the start line, m */
  lead: number;
  /** difficulty (0..1) of the first and last chunk; it ramps linearly in between */
  rampStart: number;
  rampEnd: number;
  /** tightest gap at full difficulty, in ship radii (must be > 1 to be flyable) */
  minClearance: number;
  shipRadius: number;
  kinds: ChunkKind[];
}

/** Cross-section shape of a plane obstacle; everything outside the open area is solid. */
export type Shape =
  /** solid disc with a round hole of radius `gap` whose centre orbits at `r` */
  | { k: 'hole'; r: number; a0: number; omega: number; gap: number }
  /** two jaws; the opening along direction `angle` breathes between `min` and `max` around `u0` */
  | { k: 'slot'; angle: number; u0: number; min: number; max: number; period: number; phase: number }
  /** laser grid: lines whose normals point along `a0 (+ π/2 for the second set)`, spinning at `omega` */
  | { k: 'beams'; a0: number; omega: number; spacing: number; width: number; ox: number; oy: number; crossed: boolean; count: number }
  /** turbine: `n` blades from a hub, spinning */
  | { k: 'blades'; n: number; hub: number; reach: number; width: number; a0: number; omega: number };

export interface Plane {
  kind: ChunkKind;
  s: number;
  /** thickness along the track, m */
  thickness: number;
  shape: Shape;
}

export interface Rock {
  s: number;
  x: number;
  y: number;
  r: number;
}

export interface Chunk {
  kind: ChunkKind;
  s0: number;
  s1: number;
  difficulty: number;
}

export interface Gauntlet {
  chunks: Chunk[];
  /** sorted by s */
  planes: Plane[];
  rocks: Rock[];
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;

/** Opening of a crusher at time t. */
export function slotWidth(sh: Extract<Shape, { k: 'slot' }>, t: number): number {
  return sh.min + (sh.max - sh.min) * (0.5 + 0.5 * Math.cos((TAU * t) / sh.period + sh.phase));
}

/** Is (x, y) in the open part of the cross-section at time t, with `margin` to spare? */
export function passable(sh: Shape, x: number, y: number, t: number, margin: number): boolean {
  switch (sh.k) {
    case 'hole': {
      const a = sh.a0 + sh.omega * t;
      return Math.hypot(x - sh.r * Math.cos(a), y - sh.r * Math.sin(a)) <= sh.gap - margin;
    }
    case 'slot': {
      const u = x * Math.cos(sh.angle) + y * Math.sin(sh.angle);
      return Math.abs(u - sh.u0) <= slotWidth(sh, t) / 2 - margin;
    }
    case 'beams': {
      const a = sh.a0 + sh.omega * t;
      const half = sh.width / 2 + margin;
      for (let set = 0; set < (sh.crossed ? 2 : 1); set++) {
        const th = a + (set * Math.PI) / 2;
        const off = set ? sh.oy : sh.ox;
        // distance to the nearest line of this set (lines at off + (k + ½)·spacing)
        const d = x * Math.cos(th) + y * Math.sin(th) - off - sh.spacing / 2;
        const toLine = Math.abs(d - Math.round(d / sh.spacing) * sh.spacing);
        if (toLine < half) return false;
      }
      return true;
    }
    case 'blades': {
      const r = Math.hypot(x, y);
      if (r < sh.hub + margin) return false;
      const a = sh.a0 + sh.omega * t;
      for (let k = 0; k < sh.n; k++) {
        const b = a + (TAU * k) / sh.n;
        const along = x * Math.cos(b) + y * Math.sin(b);
        const across = Math.abs(-x * Math.sin(b) + y * Math.cos(b));
        if (along > 0 && across < sh.width / 2 + margin) return false;
      }
      return true;
    }
  }
}

/** A point that is open at time t (the middle of the way through). */
export function openPoint(sh: Shape, t: number): [number, number] {
  switch (sh.k) {
    case 'hole': {
      const a = sh.a0 + sh.omega * t;
      return [sh.r * Math.cos(a), sh.r * Math.sin(a)];
    }
    case 'slot':
      return [sh.u0 * Math.cos(sh.angle), sh.u0 * Math.sin(sh.angle)];
    case 'beams': {
      const a = sh.a0 + sh.omega * t;
      const b = a + Math.PI / 2;
      const oy = sh.crossed ? sh.oy : 0;
      return [sh.ox * Math.cos(a) + oy * Math.cos(b), sh.ox * Math.sin(a) + oy * Math.sin(b)];
    }
    case 'blades': {
      const a = sh.a0 + sh.omega * t + Math.PI / sh.n;
      const rm = (sh.hub + sh.reach) / 2;
      return [rm * Math.cos(a), rm * Math.sin(a)];
    }
  }
}

/** Deterministic obstacle layout for a track. Every gap is at least `minClearance` ship radii. */
export function generateGauntlet(track: Track, p: GauntletParams): Gauntlet {
  const rand = rng((p.seed ^ 0x9e3779b9) >>> 0);
  const R = track.radius;
  const ship = p.shipRadius;
  const clear = Math.max(1.05, p.minClearance);
  const kinds = p.kinds.length ? p.kinds : [...CHUNK_KINDS];
  const len = Math.max(20, p.chunkLength);
  const first = Math.max(0, p.lead);
  const end = track.length - Math.max(40, len * 0.5);
  const count = Math.max(0, Math.floor((end - first) / len));
  const chunks: Chunk[] = [];
  const planes: Plane[] = [];
  const rocks: Rock[] = [];
  const pick = <T>(xs: readonly T[]) => xs[Math.floor(rand() * xs.length) % xs.length];
  const sign = () => (rand() < 0.5 ? -1 : 1);

  let prev: ChunkKind | undefined;
  for (let c = 0; c < count; c++) {
    const s0 = first + c * len;
    const s1 = s0 + len;
    const mid = (s0 + s1) / 2;
    const d = lerp(p.rampStart, p.rampEnd, count > 1 ? c / (count - 1) : 0);
    const options = kinds.length > 1 ? kinds.filter((k) => k !== prev) : kinds;
    const kind = pick(options);
    prev = kind;
    chunks.push({ kind, s0, s1, difficulty: d });
    // gap radius in metres: generous when easy, `clear` ship radii at full difficulty
    const gapR = ship * lerp(Math.max(6, clear * 2), clear, d);

    switch (kind) {
      case 'ring': {
        const gap = Math.min(gapR, R * 0.6);
        const r = (R - gap - 0.5) * lerp(0.2, 1, rand());
        planes.push({ kind, s: mid, thickness: 1.5, shape: { k: 'hole', r, a0: rand() * TAU, omega: sign() * lerp(0.25, 1.4, d), gap } });
        break;
      }
      case 'slalom': {
        const gap = Math.min(gapR * 1.3, R * 0.6);
        const r = (R - gap - 0.5) * lerp(0.4, 1, d);
        let a = rand() * TAU;
        for (let k = 0; k < 3; k++) {
          planes.push({ kind, s: s0 + (len * (k + 1)) / 4, thickness: 1.2, shape: { k: 'hole', r, a0: a, omega: 0, gap } });
          a += Math.PI * lerp(0.6, 1, rand());
        }
        break;
      }
      case 'crusher': {
        const min = Math.min(2 * gapR, R);
        const angle = rand() * Math.PI;
        for (let k = 0; k < 2; k++) {
          planes.push({
            kind,
            s: s0 + (len * (k + 1)) / 3,
            thickness: 4,
            shape: { k: 'slot', angle, u0: 0, min, max: R * 1.9, period: lerp(4, 1.6, d), phase: rand() * TAU },
          });
        }
        break;
      }
      case 'laser': {
        const width = 0.5;
        const spacing = 2 * gapR + width;
        const crossed = d > 0.35 || rand() < 0.3;
        const shift = () => (rand() * 2 - 1) * Math.min(R * 0.35, Math.max(0, R - gapR - 1));
        planes.push({
          kind,
          s: mid,
          thickness: 0.5,
          shape: { k: 'beams', a0: rand() * TAU, omega: sign() * lerp(0, 0.7, d), spacing, width, ox: shift(), oy: crossed ? shift() : 0, crossed, count: Math.ceil(R / spacing) + 2 },
        });
        break;
      }
      case 'turbine': {
        const hub = R * 0.18;
        const width = lerp(1.5, 3, d);
        const rm = (hub + R) / 2;
        const need = width / 2 + Math.min(gapR, rm * 0.9);
        const maxN = need >= rm ? 2 : Math.floor(Math.PI / Math.asin(Math.min(1, need / rm)));
        const n = Math.max(2, Math.min(maxN, Math.round(lerp(2, 6, d))));
        planes.push({ kind, s: mid, thickness: 1.5, shape: { k: 'blades', n, hub, reach: R, width, a0: rand() * TAU, omega: sign() * lerp(0.4, 1.6, d) } });
        break;
      }
      case 'debris': {
        // keep a straight lane clear through the field so it is always flyable
        const la = rand() * TAU;
        const lr = rand() * R * 0.5;
        const lane = [lr * Math.cos(la), lr * Math.sin(la)];
        const want = Math.round(lerp(6, 30, d));
        for (let k = 0, tries = 0; k < want && tries < want * 20; tries++) {
          const r = lerp(1.5, lerp(3, 6, d), rand());
          const a = rand() * TAU;
          const rr = Math.sqrt(rand()) * Math.max(0, R - r);
          const x = rr * Math.cos(a);
          const y = rr * Math.sin(a);
          if (Math.hypot(x - lane[0], y - lane[1]) < r + gapR) continue;
          rocks.push({ s: lerp(s0 + 10, s1 - 10, rand()), x, y, r });
          k++;
        }
        break;
      }
    }
  }
  planes.sort((a, b) => a.s - b.s);
  rocks.sort((a, b) => a.s - b.s);
  return { chunks, planes, rocks };
}

/** Track index of the sample at or before arc length `s`. */
export function sampleAt(track: Track, s: number): number {
  const n = track.pos.length;
  const ss = ((s % track.length) + track.length) % track.length;
  return Math.min(n - 1, Math.floor((ss / track.length) * n));
}

/** World position of track-space (s, x, y). */
export function pointOnTrack(track: Track, s: number, x: number, y: number, out: Vector3): Vector3 {
  const i = sampleAt(track, s);
  const n = track.pos.length;
  const j = (i + 1) % n;
  const ss = ((s % track.length) + track.length) % track.length;
  const span = (j === 0 ? track.length : track.s[j]) - track.s[i];
  const f = span > 0 ? (ss - track.s[i]) / span : 0;
  return out
    .lerpVectors(track.pos[i], track.pos[j], f)
    .addScaledVector(track.right[i], x)
    .addScaledVector(track.up[i], y);
}
