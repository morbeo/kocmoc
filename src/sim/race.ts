import { Matrix4, Vector3 } from 'three';
import type { ShipState } from './ship';
import { nearestOnTrack, type Nearest, type Track } from '../gen/track';
import { locate, newRouteState, resetRoute, type RouteKind, type RouteState } from '../gen/routes';
import type { Gauntlet } from '../gen/gauntlet';
import { polar, sectionAt, wallAt, wallNormal, type Wall } from '../gen/sections';
import { collideObstacles, newObstacleResult, type ObstacleResult } from './gauntlet';
import { finishProving, newProving, stepProving, type ProvingEvent, type ProvingSetup, type ProvingState } from './proving';

export interface WallParams {
  /** collision radius of the ship, m */
  shipRadius: number;
  /** fraction of the into-wall speed kept, bounced back out (0 = dead stop, 1 = perfect bounce) */
  bounce: number;
  /** how fast scraping along the wall bleeds speed, 1/s */
  scrape: number;
  /** open space: no wall collision; leaving the corridor starts an out-of-bounds timer */
  open?: boolean;
  /** seconds out of bounds before the ship is put back on the centreline */
  oobTime?: number;
}

/** Things that happened during a step, for effects and sound; drained by the game each frame. */
export type RaceEvent =
  | { type: 'start' | 'checkpoint' | 'lap' | 'finish' }
  | { type: 'hit'; what: 'wall' | 'obstacle'; impact: number }
  | { type: 'nearMiss' }
  | { type: 'oob' | 'oobReset' }
  /** entered branch `branch` of kind `kind`, or came back to the main loop (`kind` null, `branch` -1) */
  | { type: 'route'; kind: RouteKind | null; branch: number }
  | ProvingEvent;

export interface Course {
  gauntlet?: Gauntlet;
  /** gates, beacons and countdown rules (proving mode) */
  proving?: ProvingSetup;
  /** extra clearance that still counts as a near miss, m */
  nearMiss: number;
  /** pit lane: boost refill while in it, and the speed it holds you to */
  pit?: PitParams;
}

export interface PitParams {
  /** boost energy refilled per second, share of full */
  refill: number;
  /** speed limit in the lane, m/s (faster bleeds off) */
  speed: number;
}

export interface RaceState {
  /** track position from last step (also the search hint); on a branch, `s` is main-track progress */
  near: Nearest;
  /** which route the ship is on, and the corridor radius there */
  loc: RouteState;
  /** distance travelled since the start line, unwrapped; negative before the first crossing */
  along: number;
  /** lap timer running (starts on the first start-line crossing) */
  started: boolean;
  lap: number;
  lapTime: number;
  /** time since the start-line crossing, s; stops at the finish */
  raceTime: number;
  /** laps in the race; 0 = endless practice */
  laps: number;
  /** set on crossing the line after the last lap */
  finished: boolean;
  /** race time at the finish */
  finishTime: number | null;
  /** every completed lap's time, in order */
  lapTimes: number[];
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
  /** touching a gauntlet obstacle this step */
  obstacleContact: boolean;
  obstacleHits: number;
  /** sim time since spawn, s (drives moving obstacles) */
  time: number;
  events: RaceEvent[];
  /** last obstacle collision, reused */
  obstacle: ObstacleResult;
  /** countdown, gates and beacons in proving mode (set up on the first step) */
  proving: ProvingState | null;
  /** seconds outside the corridor in open space (0 = inside) */
  oob: number;
  oobResets: number;
}

export function newRace(track: Track, ship: ShipState, laps = 0): RaceState {
  const loc = newRouteState(track, ship.pos);
  const near = { ...loc.main, point: loc.main.point.clone() };
  return {
    near,
    loc,
    along: wrapAlong(near.s, track.length),
    started: false,
    lap: 0,
    lapTime: 0,
    raceTime: 0,
    laps: Math.max(0, Math.round(laps)),
    finished: false,
    finishTime: null,
    lapTimes: [],
    nextCp: 1 % track.checkpoints.length,
    splits: [],
    lastLap: null,
    bestLap: null,
    bestSplits: null,
    contact: false,
    wallHits: 0,
    obstacleContact: false,
    obstacleHits: 0,
    time: 0,
    events: [],
    obstacle: newObstacleResult(),
    proving: null,
    oob: 0,
    oobResets: 0,
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
const _wall = { impact: 0 };

/** Keep the ship inside the corridor: push back to the wall, bounce the into-wall velocity, scrape speed. */
export function collideWalls(ship: ShipState, near: Nearest, radius: number, p: WallParams, dt: number, out?: { impact: number }): boolean {
  if (out) out.impact = 0;
  const limit = Math.max(0, radius - p.shipRadius);
  if (near.dist <= limit) return false;
  _n.subVectors(ship.pos, near.point);
  if (_n.lengthSq() < 1e-12) return false;
  _n.normalize();
  ship.pos.copy(near.point).addScaledVector(_n, limit);
  const vn = ship.vel.dot(_n);
  if (vn > 0) {
    ship.vel.addScaledVector(_n, -(1 + p.bounce) * vn);
    if (out) out.impact = vn;
  }
  ship.vel.multiplyScalar(Math.exp(-p.scrape * dt));
  return true;
}

const _wl: Wall = { rho: 0, open: false, oob: 0 };
const _p = new Vector3();

/**
 * Walls of a shaped section (hexagonal, square, irregular, cavern): push the ship back out of the
 * face it went through, along that face's normal; bounce and scrape as on the round tube.
 */
export function collideSection(ship: ShipState, near: Nearest, track: Track, p: WallParams, dt: number, out?: { impact: number }): boolean {
  if (out) out.impact = 0;
  const i = near.index;
  const { theta } = polar(track, i, near.point, ship.pos);
  const rho = wallAt(track, near.s, theta, _wl).rho;
  if (!Number.isFinite(rho)) return false;
  const [nx, ny] = wallNormal(track, near.s, theta);
  _n.copy(track.right[i]).multiplyScalar(nx).addScaledVector(track.up[i], ny);
  // the wall point at this angle, and how far past it (towards the wall) the ship's skin reaches
  _p.copy(near.point).addScaledVector(track.right[i], rho * Math.cos(theta)).addScaledVector(track.up[i], rho * Math.sin(theta));
  const pen = _z.subVectors(ship.pos, _p).dot(_n) + p.shipRadius;
  if (pen <= 0) return false;
  ship.pos.addScaledVector(_n, -pen);
  const vn = ship.vel.dot(_n);
  if (vn > 0) {
    ship.vel.addScaledVector(_n, -(1 + p.bounce) * vn);
    if (out) out.impact = vn;
  }
  ship.vel.multiplyScalar(Math.exp(-p.scrape * dt));
  return true;
}

/** One fixed step of race rules after the ship has moved: walls, progress, checkpoints, laps. */
export function stepRace(r: RaceState, ship: ShipState, track: Track, p: WallParams, dt: number, course?: Course): void {
  const prevS = r.near.s;
  r.time += dt;
  const prov = course?.proving;
  if (prov && !r.proving) {
    r.proving = newProving(prov);
    r.laps = 1; // a proving run is one lap against the clock
  }
  const branches = track.branches;
  const routeWas = r.loc.route;
  if (branches?.length) locate(track, ship.pos, r.loc, r.near, p.shipRadius);
  else nearestOnTrack(track, ship.pos, r.near.index, 24, r.near);
  // a shaped section of the main loop: its own walls, or none in open air
  const sec = (!branches?.length || r.loc.route < 0) && track.sections ? sectionAt(track, r.near.s) : null;
  const wall = sec ? wallAt(track, r.near.s, polar(track, r.near.index, r.near.point, ship.pos).theta, _wl) : null;
  const radius = wall ? wall.oob : r.loc.radius;
  if (p.open || wall?.open) {
    // open space: no walls, but leaving the corridor for too long puts you back on the line
    if (r.near.dist > radius) {
      if (r.oob === 0) r.events.push({ type: 'oob' });
      r.oob += dt;
      if (r.oob >= (p.oobTime ?? 3)) {
        const keep = ship.energy;
        spawnOnTrack(ship, track, r.near.s, Math.max(20, ship.vel.dot(track.tan[r.near.index])));
        ship.energy = keep;
        if (branches?.length) {
          resetRoute(r.loc, track, ship.pos);
          locate(track, ship.pos, r.loc, r.near, p.shipRadius);
        } else nearestOnTrack(track, ship.pos, r.near.index, 24, r.near);
        r.oob = 0;
        r.oobResets++;
        if (r.proving && r.started && !r.finished) r.proving.timeLeft -= prov!.rules.oobPenalty;
        r.events.push({ type: 'oobReset' });
      }
    } else r.oob = 0;
    r.contact = false;
  } else {
    const hit = sec ? collideSection(ship, r.near, track, p, dt, _wall) : collideWalls(ship, r.near, radius, p, dt, _wall);
    if (hit && !r.contact) {
      r.wallHits++;
      r.events.push({ type: 'hit', what: 'wall', impact: _wall.impact });
    }
    r.contact = hit;
  }
  if (branches?.length) {
    if (r.loc.route !== routeWas) r.events.push({ type: 'route', kind: r.loc.route < 0 ? null : branches[r.loc.route].kind, branch: r.loc.route });
    const b = r.loc.route >= 0 ? branches[r.loc.route] : null;
    const pit = course?.pit;
    if (b?.kind === 'pit' && pit) {
      // in the lane proper (clear of the mouths): refill boost, hold the speed down
      const sb = r.loc.branch[r.loc.route].s;
      if (sb >= b.open0 && sb <= b.open1) {
        ship.energy = Math.min(1, ship.energy + pit.refill * dt);
        const v = ship.vel.length();
        if (v > pit.speed) ship.vel.multiplyScalar(Math.max(pit.speed / v, Math.exp(-2 * dt)));
      }
    }
  }
  if (course?.gauntlet) {
    const o = collideObstacles(course.gauntlet, ship, track, r.near, prevS, r.time, { ...p, nearMiss: course.nearMiss }, r.obstacle);
    if (o.impact > 0) r.events.push({ type: 'hit', what: 'obstacle', impact: o.impact });
    if (o.contact && !r.obstacleContact) r.obstacleHits++;
    r.obstacleContact = o.contact;
    if (o.nearMiss) r.events.push({ type: 'nearMiss' });
    // the push-back moved the ship; keep the track position in step
    if (o.contact) nearestOnTrack(track, ship.pos, r.near.index, 24, r.near);
  }
  if (prov && r.proving) {
    const running = r.started && !r.finished;
    stepProving(r.proving, prov, ship, track, r.near, prevS, p.shipRadius, r.along, dt, running, r.events as ProvingEvent[]);
    if (r.proving.result === 'timeout' && !r.finished) {
      r.finished = true;
      r.finishTime = r.raceTime + dt;
    }
  }

  // progress along the track, unwrapped across the seam
  let ds = r.near.s - prevS;
  if (ds > track.length / 2) ds -= track.length;
  else if (ds < -track.length / 2) ds += track.length;
  const before = r.along;
  r.along += ds;
  if (r.started && !r.finished) {
    r.lapTime += dt;
    r.raceTime += dt;
  }

  // start line: first forward crossing starts the clock
  if (!r.started) {
    if (before < 0 && r.along >= 0) {
      r.started = true;
      r.lap = 1;
      r.lapTime = 0;
      r.raceTime = 0;
      r.nextCp = 1 % track.checkpoints.length;
      r.events.push({ type: 'start' });
    }
    return;
  }
  if (r.finished) return;

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
      r.lapTimes.push(r.lapTime);
      r.lap++;
      r.lapTime = 0;
      r.splits = [];
      r.along -= track.length;
      r.events.push({ type: 'lap' });
      // past the last lap: the clock stops (lap stays one past the count, so ghost recording sees the change)
      if (r.laps > 0 && r.lap > r.laps) {
        r.finished = true;
        r.finishTime = r.raceTime;
        if (r.proving && prov) finishProving(r.proving, prov.rules);
        r.events.push({ type: 'finish' });
      }
    } else {
      r.splits.push(r.lapTime);
      r.events.push({ type: 'checkpoint' });
    }
    r.nextCp = (r.nextCp + 1) % cps.length;
  }
}

/** Distance flown since the start line over the whole race, m (negative before it). */
export function raceDistance(r: RaceState, length: number): number {
  return r.started ? (r.lap - 1) * length + r.along : r.along;
}

/** Difference between the latest split and the best lap's split at the same checkpoint (negative = ahead). */
export function splitDelta(r: RaceState): number | null {
  const i = r.splits.length - 1;
  if (i < 0 || !r.bestSplits || r.bestSplits[i] === undefined) return null;
  return r.splits[i] - r.bestSplits[i];
}
