import { Matrix4, Vector3 } from 'three';
import type { ShipState } from './ship';
import { nearestOnTrack, type Nearest, type Track } from '../gen/track';

export interface WallParams {
  /** collision radius of the ship, m */
  shipRadius: number;
  /** fraction of the into-wall speed kept, bounced back out (0 = dead stop, 1 = perfect bounce) */
  bounce: number;
  /** how fast scraping along the wall bleeds speed, 1/s */
  scrape: number;
}

export interface RaceState {
  /** track position from last step (also the search hint) */
  near: Nearest;
  /** distance travelled since the start line, unwrapped; negative before the first crossing */
  along: number;
  /** lap timer running (starts on the first start-line crossing) */
  started: boolean;
  lap: number;
  lapTime: number;
  /** index of the next checkpoint to pass (0 = finish line) */
  nextCp: number;
  /** split times for checkpoints passed this lap */
  splits: number[];
  lastLap: number | null;
  bestLap: number | null;
  /** best lap's splits, for deltas */
  bestSplits: number[] | null;
  /** touching the wall this step */
  contact: boolean;
  wallHits: number;
}

export function newRace(track: Track, ship: ShipState): RaceState {
  const near = nearestOnTrack(track, ship.pos);
  return {
    near,
    along: wrapAlong(near.s, track.length),
    started: false,
    lap: 0,
    lapTime: 0,
    nextCp: 1 % track.checkpoints.length,
    splits: [],
    lastLap: null,
    bestLap: null,
    bestSplits: null,
    contact: false,
    wallHits: 0,
  };
}

/** Arc length → distance from the start line in (-L/2, L/2], so a spawn just behind the line reads negative. */
const wrapAlong = (s: number, length: number) => (s > length / 2 ? s - length : s);

/** Place the ship on the centreline at arc length `s`, facing along the track, moving at `speed`. */
export function spawnOnTrack(ship: ShipState, track: Track, s: number, speed: number): void {
  const n = track.pos.length;
  const ss = ((s % track.length) + track.length) % track.length;
  const i = Math.min(n - 1, Math.floor((ss / track.length) * n));
  const j = (i + 1) % n;
  const t = (ss - track.s[i]) / ((j === 0 ? track.length : track.s[j]) - track.s[i]);
  ship.pos.lerpVectors(track.pos[i], track.pos[j], t);
  const fwd = track.tan[i];
  const up = track.up[i];
  // ship looks down -Z: build a basis with -Z = forward, +Y = up
  const z = _z.copy(fwd).negate();
  const x = _x.crossVectors(up, z).normalize();
  const y = _y.crossVectors(z, x);
  ship.quat.setFromRotationMatrix(_m.makeBasis(x, y, z));
  ship.vel.copy(fwd).multiplyScalar(speed);
  ship.angVel.set(0, 0, 0);
  ship.energy = 1;
  ship.boosting = false;
  ship.boostLocked = false;
}

const _z = new Vector3();
const _x = new Vector3();
const _y = new Vector3();
const _m = new Matrix4();
const _n = new Vector3();

/** Keep the ship inside the corridor: push back to the wall, bounce the into-wall velocity, scrape speed. */
export function collideWalls(ship: ShipState, near: Nearest, radius: number, p: WallParams, dt: number): boolean {
  const limit = Math.max(0, radius - p.shipRadius);
  if (near.dist <= limit) return false;
  _n.subVectors(ship.pos, near.point);
  if (_n.lengthSq() < 1e-12) return false;
  _n.normalize();
  ship.pos.copy(near.point).addScaledVector(_n, limit);
  const vn = ship.vel.dot(_n);
  if (vn > 0) ship.vel.addScaledVector(_n, -(1 + p.bounce) * vn);
  ship.vel.multiplyScalar(Math.exp(-p.scrape * dt));
  return true;
}

/** One fixed step of race rules after the ship has moved: walls, progress, checkpoints, laps. */
export function stepRace(r: RaceState, ship: ShipState, track: Track, p: WallParams, dt: number): void {
  const prevS = r.near.s;
  nearestOnTrack(track, ship.pos, r.near.index, 24, r.near);
  const hit = collideWalls(ship, r.near, track.radius, p, dt);
  if (hit && !r.contact) r.wallHits++;
  r.contact = hit;

  // progress along the track, unwrapped across the seam
  let ds = r.near.s - prevS;
  if (ds > track.length / 2) ds -= track.length;
  else if (ds < -track.length / 2) ds += track.length;
  const before = r.along;
  r.along += ds;
  if (r.started) r.lapTime += dt;

  // start line: first forward crossing starts the clock
  if (!r.started) {
    if (before < 0 && r.along >= 0) {
      r.started = true;
      r.lap = 1;
      r.lapTime = 0;
      r.nextCp = 1 % track.checkpoints.length;
    }
    return;
  }

  // checkpoints must be passed in order; the finish line is checkpoint 0 at one full lap
  const cps = track.checkpoints;
  const target = r.nextCp === 0 ? track.length : cps[r.nextCp];
  if (r.along >= target) {
    if (r.nextCp === 0) {
      r.lastLap = r.lapTime;
      r.splits.push(r.lapTime);
      if (r.bestLap === null || r.lapTime < r.bestLap) {
        r.bestLap = r.lapTime;
        r.bestSplits = [...r.splits];
      }
      r.lap++;
      r.lapTime = 0;
      r.splits = [];
      r.along -= track.length;
    } else {
      r.splits.push(r.lapTime);
    }
    r.nextCp = (r.nextCp + 1) % cps.length;
  }
}

/** Difference between the latest split and the best lap's split at the same checkpoint (negative = ahead). */
export function splitDelta(r: RaceState): number | null {
  const i = r.splits.length - 1;
  if (i < 0 || !r.bestSplits || r.bestSplits[i] === undefined) return null;
  return r.splits[i] - r.bestSplits[i];
}
