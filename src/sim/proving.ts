import { Vector3 } from 'three';
import type { ShipState } from './ship';
import type { Nearest, Track } from '../gen/track';
import { pointOnTrack } from '../gen/gauntlet';
import type { ProvingCourse } from '../gen/proving';
import { arcDelta } from './gauntlet';

/** Countdown rules: the clock is a resource that gates and beacons refill and misses drain. */
export interface ProvingRules {
  /** time on the clock at the start line, s */
  budget: number;
  /** added for flying through a gate, s */
  gateBonus: number;
  /** taken for passing a gate outside it, s */
  missPenalty: number;
  /** added for a beacon, s */
  beaconBonus: number;
  /** taken when out of bounds puts the ship back, s */
  oobPenalty: number;
  /** a reverse gate counts as missed once you are this far past it, m */
  reverseWindow: number;
  /** score per second left, per gate and per beacon */
  scoreTime: number;
  scoreGate: number;
  scoreBeacon: number;
}

export const defaultRules: ProvingRules = {
  budget: 120,
  gateBonus: 1,
  missPenalty: 10,
  beaconBonus: 5,
  oobPenalty: 5,
  reverseWindow: 120,
  scoreTime: 10,
  scoreGate: 50,
  scoreBeacon: 25,
};

export interface ProvingSetup {
  course: ProvingCourse;
  rules: ProvingRules;
}

/** Gate states: 0 pending, 1 credited, −1 missed. */
export interface ProvingState {
  timeLeft: number;
  gates: Int8Array;
  beacons: Uint8Array;
  hits: number;
  misses: number;
  collected: number;
  /** null while flying */
  result: 'clear' | 'timeout' | null;
  score: number;
}

export type ProvingEvent = { type: 'gate'; ok: boolean; index: number } | { type: 'beacon'; index: number } | { type: 'timeout' };

export function newProving(setup: ProvingSetup): ProvingState {
  return {
    timeLeft: setup.rules.budget,
    gates: new Int8Array(setup.course.gates.length),
    beacons: new Uint8Array(setup.course.beacons.length),
    hits: 0,
    misses: 0,
    collected: 0,
    result: null,
    score: 0,
  };
}

/** Score: seconds left, gates and beacons, each with its weight. */
export function provingScore(ps: ProvingState, rules: ProvingRules): number {
  const time = ps.result === 'clear' ? ps.timeLeft : 0;
  return Math.round(time * rules.scoreTime + ps.hits * rules.scoreGate + ps.collected * rules.scoreBeacon);
}

const _off = new Vector3();
const _b = new Vector3();

/**
 * One step of gates and beacons after the ship moved from `prevS` to `near.s`; `along` is the
 * distance flown from the start line (unwrapped, negative before it). `running` is
 * whether the clock runs (after the start line, before the finish). Pushes what happened to `events`.
 */
export function stepProving(
  ps: ProvingState,
  setup: ProvingSetup,
  ship: ShipState,
  track: Track,
  near: Nearest,
  prevS: number,
  shipRadius: number,
  along: number,
  dt: number,
  running: boolean,
  events: ProvingEvent[],
): void {
  if (ps.result) return;
  const { course, rules } = setup;
  const L = track.length;
  const i = near.index;
  _off.subVectors(ship.pos, near.point);
  const x = _off.dot(track.right[i]);
  const y = _off.dot(track.up[i]);

  for (let k = 0; k < course.gates.length; k++) {
    if (ps.gates[k] !== 0) continue;
    const g = course.gates[k];
    const d1 = arcDelta(near.s, g.s, L);
    const d0 = arcDelta(prevS, g.s, L);
    if (Math.abs(d0 - d1) >= 60) continue; // the seam, not a crossing
    const forward = d0 < 0 && d1 >= 0;
    const backward = d0 >= 0 && d1 < 0;
    let resolve = g.reverse ? backward : forward;
    let ok = resolve && Math.hypot(x - g.x, y - g.y) <= g.r;
    // a reverse gate left behind is a miss
    if (g.reverse && !resolve && along - g.s > rules.reverseWindow) {
      resolve = true;
      ok = false;
    }
    if (!resolve) continue;
    ps.gates[k] = ok ? 1 : -1;
    if (ok) {
      ps.hits++;
      if (running) ps.timeLeft += rules.gateBonus;
    } else {
      ps.misses++;
      if (running) ps.timeLeft -= rules.missPenalty;
    }
    events.push({ type: 'gate', ok, index: k });
  }

  for (let k = 0; k < course.beacons.length; k++) {
    if (ps.beacons[k]) continue;
    const b = course.beacons[k];
    if (Math.abs(arcDelta(near.s, b.s, L)) > b.r + shipRadius + 4) continue;
    if (ship.pos.distanceTo(pointOnTrack(track, b.s, b.x, b.y, _b)) > b.r + shipRadius) continue;
    ps.beacons[k] = 1;
    ps.collected++;
    if (running) ps.timeLeft += rules.beaconBonus;
    events.push({ type: 'beacon', index: k });
  }

  if (running) {
    ps.timeLeft -= dt;
    if (ps.timeLeft <= 0) {
      ps.timeLeft = 0;
      ps.result = 'timeout';
      ps.score = provingScore(ps, rules);
      events.push({ type: 'timeout' });
    }
  }
}

/** Crossing the finish: pending gates count as missed, then the run is scored. */
export function finishProving(ps: ProvingState, rules: ProvingRules): void {
  if (ps.result) return;
  for (let k = 0; k < ps.gates.length; k++) {
    if (ps.gates[k] === 0) {
      ps.gates[k] = -1;
      ps.misses++;
    }
  }
  ps.result = 'clear';
  ps.score = provingScore(ps, rules);
}

