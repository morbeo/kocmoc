import { Vector3 } from 'three';
import type { ShipState } from './ship';
import type { Nearest, Track } from '../gen/track';
import { passable, pointOnTrack, type Gauntlet } from '../gen/gauntlet';

export interface ObstacleParams {
  shipRadius: number;
  /** share of the into-obstacle speed bounced back */
  bounce: number;
  /** extra clearance that still counts as a near miss, m */
  nearMiss: number;
}

export interface ObstacleResult {
  /** into-obstacle speed of a new hit this step, m/s (0 = none) */
  impact: number;
  /** touching an obstacle this step */
  contact: boolean;
  /** passed an obstacle within `nearMiss` without touching it */
  nearMiss: boolean;
  /** where the hit happened (valid when impact > 0) */
  point: Vector3;
}

/** Signed arc-length difference a − b, wrapped to (−L/2, L/2]. */
export function arcDelta(a: number, b: number, length: number): number {
  let d = (a - b) % length;
  if (d > length / 2) d -= length;
  else if (d <= -length / 2) d += length;
  return d;
}

const rockCache = new WeakMap<Gauntlet, Vector3[]>();
/** World centres of the debris rocks (cached per gauntlet). */
export function rockCentres(g: Gauntlet, track: Track): Vector3[] {
  let c = rockCache.get(g);
  if (!c) {
    c = g.rocks.map((r) => pointOnTrack(track, r.s, r.x, r.y, new Vector3()));
    rockCache.set(g, c);
  }
  return c;
}

const _off = new Vector3();
const _n = new Vector3();

/**
 * Collide the ship with gauntlet obstacles after it moved from arc length `prevS` to `near.s`.
 * Planes are tested in the cross-section at the moment the ship is inside (or passes through)
 * their slab, so fast ships can't tunnel through thin ones.
 */
export function collideObstacles(
  g: Gauntlet,
  ship: ShipState,
  track: Track,
  near: Nearest,
  prevS: number,
  time: number,
  p: ObstacleParams,
  out: ObstacleResult,
): ObstacleResult {
  out.impact = 0;
  out.contact = false;
  out.nearMiss = false;
  const L = track.length;
  const i = near.index;
  const tan = track.tan[i];
  _off.subVectors(ship.pos, near.point);
  const x = _off.dot(track.right[i]);
  const y = _off.dot(track.up[i]);

  for (const pl of g.planes) {
    const d1 = arcDelta(near.s, pl.s, L);
    if (Math.abs(d1) > 60) continue;
    const d0 = arcDelta(prevS, pl.s, L);
    const band = pl.thickness / 2 + p.shipRadius;
    const crossed = (d0 < 0) !== (d1 < 0) && Math.abs(d0 - d1) < 60;
    if (!crossed && Math.abs(d1) >= band) continue;
    if (passable(pl.shape, x, y, time, p.shipRadius)) {
      if (crossed && !passable(pl.shape, x, y, time, p.shipRadius + p.nearMiss)) out.nearMiss = true;
      continue;
    }
    // blocked: put the ship back on the side it came from, bounce the along-track speed
    const side = d0 !== 0 ? Math.sign(d0) : -Math.sign(ship.vel.dot(tan)) || -1;
    ship.pos.addScaledVector(tan, side * band - d1);
    const vt = ship.vel.dot(tan);
    if (vt * side < 0) {
      out.impact = Math.max(out.impact, Math.abs(vt));
      ship.vel.addScaledVector(tan, -(1 + p.bounce) * vt);
    }
    out.contact = true;
    out.point.copy(ship.pos).addScaledVector(tan, -side * p.shipRadius);
  }

  const centres = rockCentres(g, track);
  for (let k = 0; k < g.rocks.length; k++) {
    const rock = g.rocks[k];
    const d1 = arcDelta(near.s, rock.s, L);
    if (Math.abs(d1) > rock.r + p.shipRadius + p.nearMiss + 2) continue;
    const c = centres[k];
    const dist = ship.pos.distanceTo(c);
    const limit = rock.r + p.shipRadius;
    if (dist < limit && dist > 1e-6) {
      _n.subVectors(ship.pos, c).divideScalar(dist);
      ship.pos.copy(c).addScaledVector(_n, limit);
      const vn = ship.vel.dot(_n);
      if (vn < 0) {
        out.impact = Math.max(out.impact, -vn);
        ship.vel.addScaledVector(_n, -(1 + p.bounce) * vn);
      }
      out.contact = true;
      out.point.copy(c).addScaledVector(_n, rock.r);
    } else if (dist < limit + p.nearMiss) {
      const d0 = arcDelta(prevS, rock.s, L);
      if ((d0 < 0) !== (d1 < 0)) out.nearMiss = true;
    }
  }
  return out;
}

export const newObstacleResult = (): ObstacleResult => ({ impact: 0, contact: false, nearMiss: false, point: new Vector3() });
