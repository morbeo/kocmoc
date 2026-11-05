import { Vector3 } from 'three';
import { rng } from '../core/rng';
import type { Track } from './track';

/**
 * Stretches of the main loop with their own cross-section, so not every track is a round tube:
 *
 * - polygons: hex, square, octagon, triangle, a wide or tall rectangle (letterbox / slot), a
 *   diamond, and a five-pointed star, all with flat faces at least one tube radius out
 * - ellipse: an oval bore, wide or tall
 * - irregular: a lumpy, rock-like bore whose shape drifts as you fly through it
 * - cavern: a wide irregular chamber, two to three and a half tube radii out
 * - open: no walls at all, a stretch of open air with an out-of-bounds limit well outside the tube
 *
 * Each bound is never inside the tube (radius ≥ R everywhere), so the autopilot, ghosts and the
 * fork balance are unaffected. Sections keep clear of forks, the pit lane and the start line, and of
 * any other part of the loop their widest point could reach. The shape eases in from the round tube
 * over `ramp` metres at each end.
 */
export const SECTION_KINDS = ['hex', 'square', 'rect', 'diamond', 'ellipse', 'triangle', 'octagon', 'star', 'irregular', 'cavern', 'open'] as const;
export type SectionKind = (typeof SECTION_KINDS)[number];

export interface Section {
  kind: SectionKind;
  /** main-track arc length where it starts and ends (s0 < s1, never across the start line) */
  s0: number;
  s1: number;
  /** metres over which the shape eases in and out */
  ramp: number;
  /** seeds the lumps of irregular and cavern sections */
  seed: number;
  /** roll of the polygon's corners, radians */
  roll: number;
}

export interface SectionParams {
  seed: number;
  /** sections to try to place */
  count: number;
  kinds: SectionKind[];
  /** length range of a section, m */
  minLength: number;
  maxLength: number;
}

/** Widest a section's wall gets, in tube radii (open: the out-of-bounds limit). */
const TAU = Math.PI * 2;

export const SECTION_REACH: Record<SectionKind, number> = {
  hex: 1.16,
  square: 1.42,
  rect: 2.06,
  diamond: 1.9,
  ellipse: 1.8,
  triangle: 2,
  octagon: 1.09,
  star: 1.8,
  irregular: 1.55,
  cavern: 3.3,
  open: 3.5,
};

/** Polygon corners in tube radii, before the section's roll; every face keeps at least 1 from the centre. */
const ring = (n: number, r: number, start: number) => Array.from({ length: n }, (_, k) => polarXY(r, start + (k * TAU) / n));
const polarXY = (r: number, a: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)];
export const POLYGONS: Partial<Record<SectionKind, [number, number][]>> = {
  hex: ring(6, 1 / Math.cos(Math.PI / 6), 0),
  square: ring(4, Math.SQRT2, Math.PI / 4),
  octagon: ring(8, 1 / Math.cos(Math.PI / 8), Math.PI / 8),
  triangle: ring(3, 2, Math.PI / 2),
  rect: [[1.8, 1], [-1.8, 1], [-1.8, -1], [1.8, -1]],
  diamond: [[1.9, 0], [0, 1.3], [-1.9, 0], [0, -1.3]],
  star: Array.from({ length: 10 }, (_, k) => polarXY(k % 2 ? 1.15 : 1.8, Math.PI / 2 + (k * TAU) / 10)),
};

/** Distance from the centre to polygon `poly`'s edge along angle `theta` (the polygon is star-shaped about the centre). */
function polygonRho(poly: [number, number][], theta: number): number {
  const dx = Math.cos(theta);
  const dy = Math.sin(theta);
  let best = Infinity;
  for (let k = 0; k < poly.length; k++) {
    const [px, py] = poly[k];
    const [qx, qy] = poly[(k + 1) % poly.length];
    const ex = qx - px;
    const ey = qy - py;
    const den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-12) continue;
    const lambda = (px * ey - py * ex) / den;
    const t = (px * dy - py * dx) / den;
    if (lambda > 0 && t >= -1e-9 && t <= 1 + 1e-9 && lambda < best) best = lambda;
  }
  return best;
}

/** Angles round a section's ring for its mesh: each polygon corner exactly, edges split evenly; 48 for curves. */
export function sectionAngles(sec: Section): number[] {
  const poly = POLYGONS[sec.kind];
  if (!poly) return Array.from({ length: 48 }, (_, k) => sec.roll + (k * TAU) / 48);
  const corners = poly.map(([x, y]) => Math.atan2(y, x));
  const out: number[] = [];
  const per = Math.max(2, Math.round(48 / poly.length));
  corners.forEach((a, k) => {
    let b = corners[(k + 1) % corners.length];
    while (b <= a) b += TAU;
    for (let j = 0; j < per; j++) out.push(sec.roll + a + ((b - a) * j) / per);
  });
  return out;
}


/** Lumps: a few harmonics whose phases drift along the section, so the bore twists and swells. */
const harmonics = new Map<number, { amp: number; phase: number; drift: number }[]>();
function lumps(seed: number, theta: number, s: number): number {
  let hs = harmonics.get(seed);
  if (!hs) {
    const rand = rng(seed);
    hs = [];
    for (let k = 2; k <= 5; k++) hs.push({ amp: (0.5 + rand()) / k, phase: rand() * TAU, drift: (rand() * 2 - 1) / 60 });
    const total = hs.reduce((x, h) => x + h.amp, 0);
    for (const h of hs) h.amp /= total; // so the sum stays within -1..1
    if (harmonics.size > 256) harmonics.clear();
    harmonics.set(seed, hs);
  }
  let v = 0;
  hs.forEach((h, j) => (v += h.amp * Math.sin((j + 2) * theta + h.phase + s * h.drift)));
  return v;
}

/**
 * Wall distance from the centreline at angle `theta` (from `right` towards `up`), at arc length `s`
 * inside section `sec`, in tube radii, before easing. Infinity for open sections.
 */
export function sectionShape(sec: Section, theta: number, s: number): number {
  switch (sec.kind) {
    case 'ellipse': {
      // 1.8 by 1 across (roll turns it tall)
      const a = 1.8;
      const t = theta - sec.roll;
      return a / Math.hypot(Math.cos(t), a * Math.sin(t));
    }
    case 'irregular':
      return 1.3 + 0.25 * lumps(sec.seed, theta, s - sec.s0);
    case 'cavern':
      return 2.6 + 0.7 * lumps(sec.seed, theta, s - sec.s0);
    case 'open':
      return Infinity;
    default:
      return polygonRho(POLYGONS[sec.kind]!, theta - sec.roll);
  }
}

/** How far into a section `s` is: 0 outside, easing to 1 past the ramp. */
export function sectionWeight(sec: Section, s: number): number {
  if (s <= sec.s0 || s >= sec.s1) return 0;
  const d = Math.min(s - sec.s0, sec.s1 - s);
  const x = Math.min(1, d / Math.max(sec.ramp, 1e-6));
  return x * x * (3 - 2 * x);
}

/** The section at main-track arc length `s`, if any. */
export function sectionAt(track: Track, s: number): Section | null {
  for (const sec of track.sections ?? []) if (s > sec.s0 && s < sec.s1) return sec;
  return null;
}

export interface Wall {
  /** wall distance from the centreline at that angle, m (Infinity = no wall) */
  rho: number;
  /** open-air section: no walls, out of bounds past `oob` m */
  open: boolean;
  oob: number;
}

/** Main-loop wall at arc length `s` and angle `theta`, eased from the round tube. */
export function wallAt(track: Track, s: number, theta: number, out: Wall = { rho: 0, open: false, oob: 0 }): Wall {
  const R = track.radius;
  out.rho = R;
  out.open = false;
  out.oob = R;
  const sec = sectionAt(track, s);
  if (!sec) return out;
  const w = sectionWeight(sec, s);
  if (sec.kind === 'open') {
    out.open = w > 0.5;
    out.rho = out.open ? Infinity : R;
    out.oob = R * (1 + (SECTION_REACH.open - 1) * w);
    return out;
  }
  out.rho = R * (1 + (sectionShape(sec, theta, s) - 1) * w);
  out.oob = out.rho;
  return out;
}

/** Widest the main loop's corridor gets at `s`, m (for keeping scenery clear). */
export function reachAt(track: Track, s: number): number {
  const sec = sectionAt(track, s);
  return track.radius * (sec ? 1 + (SECTION_REACH[sec.kind] - 1) * sectionWeight(sec, s) : 1);
}

/** Hex, square, octagon, triangle, star: any roll. Rectangles, diamonds and ellipses: wide or tall. */
function rollFor(kind: SectionKind, r: number): number {
  if (kind === 'rect' || kind === 'diamond' || kind === 'ellipse') return r < 0.5 ? 0 : Math.PI / 2;
  return POLYGONS[kind] ? r * TAU : 0;
}

/**
 * Place up to `count` sections on stretches of the loop clear of forks, the pit lane and the start
 * line, where the section's widest point stays well away from every other part of the track.
 */
export function addSections(track: Track, p: SectionParams): Track {
  const kinds = p.kinds.filter((k) => (SECTION_KINDS as readonly string[]).includes(k));
  if (p.count <= 0 || !kinds.length) return track;
  const rand = rng(p.seed * 31 + 7);
  const R = track.radius;
  const L = track.length;
  const n = track.pos.length;
  // stretches that are taken: the start line and each fork (with room to see it coming)
  const taken: [number, number][] = [[L - 400, L], [0, 300]];
  for (const b of track.branches ?? []) taken.push([b.s0 - 2 * R - 100, b.s1 + 2 * R + 100]);
  const free = (a: number, b: number) => a >= 0 && b <= L && taken.every(([x, y]) => b < x || a > y);
  const idx = (s: number) => Math.min(n - 1, Math.floor((s / L) * n));
  /** every sample of [a, b] keeps `reach` + a tube from samples of the loop far from it along the track */
  const roomy = (a: number, b: number, reach: number) => {
    const need = reach + R * 1.2;
    const step = Math.max(1, Math.round(R / 2 / (L / n)));
    /** arc distance from `x` to [a, b] round the loop */
    const arcTo = (x: number) => (x >= a && x <= b ? 0 : Math.min(Math.abs(x - a), Math.abs(x - b), L - Math.abs(x - a), L - Math.abs(x - b)));
    for (let i = idx(a); i <= idx(b); i += step) {
      for (let j = 0; j < n; j += 2) {
        if (arcTo(track.s[j]) < need * 2) continue; // its own neighbourhood
        if (track.pos[i].distanceToSquared(track.pos[j]) < need * need) return false;
      }
    }
    return true;
  };
  const sections: Section[] = [];
  let turn = 0;
  for (let k = 0; k < p.count; k++) {
    // kinds in turn; one that fits nowhere hands its slot to the next
    placing: for (let tryKind = 0; tryKind < kinds.length; tryKind++) {
      const kind = kinds[(turn + tryKind) % kinds.length];
      const reach = R * SECTION_REACH[kind];
      for (let attempt = 0; attempt < 24; attempt++) {
        const len = p.minLength + rand() * Math.max(0, p.maxLength - p.minLength);
        const s0 = rand() * (L - len);
        const s1 = s0 + len;
        if (!free(s0, s1) || !roomy(s0, s1, reach)) continue;
        sections.push({ kind, s0, s1, ramp: Math.min(len / 3, kind === 'cavern' || kind === 'open' ? R * 4 : R * 1.5), seed: Math.floor(rand() * 1e9), roll: rollFor(kind, rand()) });
        taken.push([s0 - R * 2, s1 + R * 2]);
        turn += tryKind + 1;
        break placing;
      }
    }
  }
  if (!sections.length) return track;
  sections.sort((a, b) => a.s0 - b.s0);
  return { ...track, sections };
}

const _off = new Vector3();
const _tmp = { rho: 0, open: false, oob: 0 };

/**
 * Where `p` sits across the main loop at sample `i` (centreline point `c`): its angle from `right`
 * towards `up`, and its distance from the centreline.
 */
export function polar(track: Track, i: number, c: Vector3, p: Vector3): { theta: number; dist: number } {
  _off.subVectors(p, c);
  const x = _off.dot(track.right[i]);
  const y = _off.dot(track.up[i]);
  return { theta: Math.atan2(y, x), dist: Math.hypot(x, y) };
}

/**
 * Outward wall normal across the track at angle `theta`, as (along right, along up): the radial
 * direction tilted by the wall's slope, so polygon faces push straight out of the face.
 */
export function wallNormal(track: Track, s: number, theta: number): [number, number] {
  const h = 0.01;
  const r0 = wallAt(track, s, theta, _tmp).rho;
  const r1 = wallAt(track, s, theta + h, _tmp).rho;
  const rm = wallAt(track, s, theta - h, _tmp).rho;
  const dr = (r1 - rm) / (2 * h);
  // n ∝ ρ·r̂ − ρ'·θ̂
  const c = Math.cos(theta);
  const sn = Math.sin(theta);
  const nx = r0 * c + dr * sn;
  const ny = r0 * sn - dr * c;
  const len = Math.hypot(nx, ny) || 1;
  return [nx / len, ny / len];
}
