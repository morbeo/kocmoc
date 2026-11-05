import { Matrix4, Quaternion, Vector3 } from 'three';
import { rng } from '../core/rng';
import type { Track } from './track';

/**
 * Scenery around a race track: props that never reach into the flyable corridor (main loop or any
 * branch), and optional floor and ceiling planes above and below it.
 *
 * - spires: crystal needles, rooted in the floor or ceiling when there is one, else floating
 * - monoliths: tall slabs standing off the track
 * - peaks: upside-down mountains hanging from the ceiling, or floating islands
 * - orbs: spheres of every size
 * - ribs: arches over the track in runs, like the ribcage of something enormous
 * - halos: glowing rings the track threads through
 * - lattice: long beams on a grid, crossing above, below and beside the track
 * - shards: a cloud of tumbling splinters close to the track
 * - columns: pillars from floor to ceiling (or up out of the floor)
 */
export const SCENERY_KINDS = ['spires', 'monoliths', 'peaks', 'orbs', 'ribs', 'halos', 'lattice', 'shards', 'columns'] as const;
export type SceneryKind = (typeof SCENERY_KINDS)[number];
export const GROUND_MODES = ['none', 'floor', 'ceiling', 'both'] as const;
export type GroundMode = (typeof GROUND_MODES)[number];

export interface SceneryParams {
  seed: number;
  kinds: SceneryKind[];
  /** props per kind (ribs and halos place a tenth as many) */
  count: number;
  /** typical prop size, m */
  size: number;
  /** how far from the corridor props spread, m */
  spread: number;
  ground: GroundMode;
  /** gap between the track's lowest / highest point and the floor / ceiling, m */
  gap: number;
  /** props keep this many tube radii from the centreline */
  clearance: number;
}

/** One prop: a unit mesh of its kind, placed by `pos` / `quat` / `scale`. */
export interface Prop {
  kind: SceneryKind;
  pos: Vector3;
  quat: Quaternion;
  scale: Vector3;
  /** 0..1, picks between the two scenery colours */
  tint: number;
}

export interface Scenery {
  props: Prop[];
  floorY: number | null;
  ceilY: number | null;
  /** centre and horizontal half-size of the track's bounding box */
  centre: Vector3;
  extent: number;
  /** candidates dropped because they reached into the corridor */
  rejected: number;
}

/** Unit meshes the renderer uses per kind; placement and clearance checks assume these. */
export const UNIT = {
  /** ribs: arc of a unit torus, opening downward */
  ribArc: Math.PI * 1.3,
  /** ribs and halos: torus tube radius as a share of the ring radius */
  ribTube: 0.05,
  haloTube: 0.025,
} as const;

interface Ball {
  c: Vector3;
  r: number;
}

/** Centreline samples with their tube radius, hashed on a grid for fast "is this sphere clear?" checks. */
export class Corridor {
  private cells = new Map<string, { p: Vector3; rad: number }[]>();
  private cell: number;
  readonly maxRad: number;

  constructor(track: Track) {
    const all: { p: Vector3; rad: number }[] = [];
    const add = (pos: Vector3[], rad: (i: number) => number) => {
      // keep samples about a quarter tube apart: dense enough that a sphere can't slip between them
      let last: Vector3 | null = null;
      pos.forEach((p, i) => {
        const r = rad(i);
        if (!last || last.distanceTo(p) >= r * 0.25 || i === pos.length - 1) {
          all.push({ p, rad: r });
          last = p;
        }
      });
    };
    add(track.pos, () => track.radius);
    for (const b of track.branches ?? []) add(b.pos, (i) => b.rad[i]);
    this.maxRad = all.reduce((m, x) => Math.max(m, x.rad), 0);
    this.cell = Math.max(50, this.maxRad * 4);
    for (const x of all) {
      const k = this.key(x.p.x, x.p.y, x.p.z);
      const list = this.cells.get(k);
      if (list) list.push(x);
      else this.cells.set(k, [x]);
    }
  }

  private key(x: number, y: number, z: number): string {
    const c = this.cell;
    return `${Math.floor(x / c)},${Math.floor(y / c)},${Math.floor(z / c)}`;
  }

  /** Does a ball of radius `r` at `c` keep `clear` tube radii from every centreline sample? */
  isClear(c: Vector3, r: number, clear: number): boolean {
    const reach = r + this.maxRad * clear;
    const span = Math.ceil(reach / this.cell);
    const cx = Math.floor(c.x / this.cell);
    const cy = Math.floor(c.y / this.cell);
    const cz = Math.floor(c.z / this.cell);
    for (let i = -span; i <= span; i++)
      for (let j = -span; j <= span; j++)
        for (let k = -span; k <= span; k++) {
          const list = this.cells.get(`${cx + i},${cy + j},${cz + k}`);
          if (!list) continue;
          for (const s of list) if (s.p.distanceTo(c) < r + s.rad * clear) return false;
        }
    return true;
  }
}

const _m = new Matrix4();
const _v = new Vector3();
const _back = new Vector3();
const X = new Vector3(1, 0, 0);
const Y = new Vector3(0, 1, 0);
const Z = new Vector3(0, 0, 1);

/** Check balls along a prop's local axis `axis` from -half to +half, radius `r`. */
function along(p: Prop, axis: Vector3, half: number, r: number): Ball[] {
  const dir = axis.clone().applyQuaternion(p.quat);
  const n = Math.max(1, Math.ceil(half / Math.max(r, 1)));
  const out: Ball[] = [];
  for (let k = -n; k <= n; k++) out.push({ c: p.pos.clone().addScaledVector(dir, (half * k) / n), r });
  return out;
}

/** Check balls along a ring of radius `A` (local XY plane) from angle a0 over `arc`. */
function ring(p: Prop, A: number, tube: number, a0: number, arc: number): Ball[] {
  _m.compose(p.pos, p.quat, _v.set(1, 1, 1));
  const n = Math.max(8, Math.ceil((A * arc) / Math.max(tube * 2, 1)));
  const out: Ball[] = [];
  for (let k = 0; k <= n; k++) {
    const a = a0 + (arc * k) / n;
    out.push({ c: new Vector3(Math.cos(a) * A, Math.sin(a) * A, 0).applyMatrix4(_m), r: tube });
  }
  return out;
}

/** The balls a prop occupies, for the clearance check. */
export function propBalls(p: Prop): Ball[] {
  const s = p.scale;
  switch (p.kind) {
    case 'spires':
    case 'columns':
    case 'peaks':
      // octahedron / cylinder / cone stretched along local Y
      return along(p, Y, s.y, Math.max(s.x, s.z));
    case 'monoliths':
      return along(p, Y, s.y / 2, Math.hypot(s.x, s.z) / 2);
    case 'lattice':
      return along(p, X, s.x / 2, Math.hypot(s.y, s.z) / 2);
    case 'ribs':
      return ring(p, s.x, s.x * UNIT.ribTube, -(UNIT.ribArc - Math.PI) / 2, UNIT.ribArc);
    case 'halos':
      return ring(p, s.x, s.x * UNIT.haloTube, 0, Math.PI * 2);
    default:
      // orbs, shards: a unit sphere / tetrahedron
      return [{ c: p.pos.clone(), r: Math.max(s.x, s.y, s.z) }];
  }
}

/** Deterministic scenery for a track. */
export function generateScenery(track: Track, p: SceneryParams): Scenery {
  const rand = rng(p.seed * 7919 + 13);
  const corridor = new Corridor(track);
  const R = track.radius;
  const min = new Vector3(Infinity, Infinity, Infinity);
  const max = new Vector3(-Infinity, -Infinity, -Infinity);
  for (const q of track.pos) {
    min.min(q);
    max.max(q);
  }
  for (const b of track.branches ?? [])
    for (const q of b.pos) {
      min.min(q);
      max.max(q);
    }
  const centre = min.clone().add(max).multiplyScalar(0.5);
  const extent = Math.max(max.x - min.x, max.z - min.z) / 2;
  const floorY = p.ground === 'floor' || p.ground === 'both' ? min.y - R - p.gap : null;
  const ceilY = p.ground === 'ceiling' || p.ground === 'both' ? max.y + R + p.gap : null;

  const props: Prop[] = [];
  let rejected = 0;
  const S = p.size;
  const range = (a: number, b: number) => a + (b - a) * rand();
  const randQuat = () => new Quaternion().setFromAxisAngle(_v.set(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize(), rand() * Math.PI * 2);
  const tilt = (amount: number) =>
    new Quaternion().setFromAxisAngle(_v.set(rand() * 2 - 1, 0, rand() * 2 - 1).normalize(), (rand() * 2 - 1) * amount);
  /** a point off the track: a random sample, pushed out sideways */
  const nearTrack = (minOut: number, spread = p.spread) => {
    const i = Math.floor(rand() * track.pos.length);
    const dir = _v.set(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
    dir.addScaledVector(track.tan[i], -dir.dot(track.tan[i]));
    if (dir.lengthSq() < 1e-6) dir.copy(track.up[i]);
    dir.normalize();
    return track.pos[i].clone().addScaledVector(dir, R * p.clearance + minOut + rand() ** 1.5 * spread);
  };
  const ground = () => new Vector3(centre.x + (rand() * 2 - 1) * (extent + p.spread), 0, centre.z + (rand() * 2 - 1) * (extent + p.spread));
  const keep = (prop: Prop): boolean => {
    const ok = propBalls(prop).every((b) => corridor.isClear(b.c, b.r, p.clearance));
    if (ok) props.push(prop);
    else rejected++;
    return ok;
  };

  for (const kind of p.kinds) {
    const n = kind === 'ribs' || kind === 'halos' ? Math.max(1, Math.round(p.count / 10)) : Math.max(0, Math.round(p.count));
    // a prop that reaches into the corridor is tried again somewhere else (rings fit less often)
    const tries = kind === 'halos' ? 16 : kind === 'ribs' ? 1 : 4;
    for (let k = 0; k < n; k++) for (let attempt = 0, before = props.length; attempt < tries && props.length === before; attempt++) {
      const tint = rand();
      switch (kind) {
        case 'spires': {
          const w = S * range(0.3, 1);
          const h = w * range(4, 10);
          const anchored = floorY !== null || ceilY !== null;
          if (anchored) {
            const up = floorY !== null && (ceilY === null || rand() < 0.6);
            const pos = ground().setY(up ? floorY! : ceilY!);
            keep({ kind, pos, quat: tilt(0.25), scale: new Vector3(w, h, w), tint });
          } else keep({ kind, pos: nearTrack(h), quat: randQuat(), scale: new Vector3(w, h, w), tint });
          break;
        }
        case 'monoliths': {
          const w = S * range(0.5, 1.2);
          keep({ kind, pos: nearTrack(w * 4), quat: tilt(0.35), scale: new Vector3(w, w * 9, w * 4), tint });
          break;
        }
        case 'peaks': {
          const w = S * range(1.5, 4);
          const h = w * range(1.2, 2.4);
          if (ceilY !== null) keep({ kind, pos: ground().setY(ceilY), quat: new Quaternion().setFromAxisAngle(X, Math.PI), scale: new Vector3(w, h, w), tint });
          else keep({ kind, pos: nearTrack(h), quat: new Quaternion().setFromAxisAngle(X, Math.PI).premultiply(tilt(0.2)), scale: new Vector3(w, h * 0.5, w), tint });
          break;
        }
        case 'orbs': {
          const r = S * range(0.3, 2.5) * (rand() < 0.1 ? 4 : 1);
          keep({ kind, pos: nearTrack(r), quat: new Quaternion(), scale: new Vector3(r, r, r), tint });
          break;
        }
        case 'shards': {
          const r = S * range(0.15, 0.7);
          keep({ kind, pos: nearTrack(r, p.spread * 0.4), quat: randQuat(), scale: new Vector3(r * range(0.5, 1), r * range(1, 3), r * range(0.5, 1)), tint });
          break;
        }
        case 'lattice': {
          const pitch = S * 12;
          const L = S * range(20, 60);
          const pos = nearTrack(0);
          pos.set(Math.round(pos.x / pitch) * pitch, Math.round(pos.y / pitch) * pitch, Math.round(pos.z / pitch) * pitch);
          const axis = Math.floor(rand() * 3);
          const quat = new Quaternion().setFromUnitVectors(X, axis === 0 ? X : axis === 1 ? Y : Z);
          const w = S * range(0.4, 0.9);
          keep({ kind, pos, quat, scale: new Vector3(L, w, w), tint });
          break;
        }
        case 'columns': {
          const r = S * range(0.6, 1.6);
          const bottom = floorY ?? min.y - R - p.gap;
          const top = ceilY ?? max.y + R + p.gap + S * 20;
          const h = (top - bottom) / 2;
          keep({ kind, pos: ground().setY(bottom + h), quat: new Quaternion(), scale: new Vector3(r, h, r), tint });
          break;
        }
        case 'ribs': {
          // a run of arches spaced down the track, growing then shrinking like a ribcage
          const run = 5 + Math.floor(rand() * 6);
          const gapS = R * range(2.5, 4);
          const s0 = rand() * track.length;
          const A0 = R * range(2.2, 3);
          for (let j = 0; j < run; j++) {
            const A = A0 * (0.8 + 0.4 * Math.sin((Math.PI * (j + 0.5)) / run));
            // nudged along the track if it would cut through a bend or a branch
            for (const shift of [0, 0.7, -0.7, 1.4]) {
              const at = (((s0 + (j + shift) * gapS) % track.length) + track.length) % track.length;
              const i = Math.floor((at / track.length) * track.pos.length) % track.pos.length;
              _m.makeBasis(track.right[i], track.up[i], _back.copy(track.tan[i]).negate()); // right-handed, so a rotation
              const quat = new Quaternion().setFromRotationMatrix(_m);
              if (keep({ kind, pos: track.pos[i].clone(), quat, scale: new Vector3(A, A, A), tint })) break;
            }
          }
          break;
        }
        case 'halos': {
          const i = Math.floor(rand() * track.pos.length);
          const A = R * range(2.5, 6);
          _m.makeBasis(track.right[i], track.up[i], _back.copy(track.tan[i]).negate()); // right-handed, so a rotation
          const quat = new Quaternion().setFromRotationMatrix(_m).multiply(new Quaternion().setFromAxisAngle(X, (rand() * 2 - 1) * 0.5));
          keep({ kind, pos: track.pos[i].clone(), quat, scale: new Vector3(A, A, A), tint });
          break;
        }
      }
    }
  }
  return { props, floorY, ceilY, centre, extent, rejected };
}
