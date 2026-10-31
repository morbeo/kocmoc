import { Vector3 } from 'three';
import { nearestOnTrack, type Track } from '../gen/track';
import type { Gauntlet } from '../gen/gauntlet';
import { GhostRecorder, type Ghost } from './ghost';
import { botControls, type BotParams } from './bot';
import { noControls } from './ship';
import { newSim, spawnSim, stepSim, type SimConfig } from './world';

/**
 * A ghost raced as an opponent. It flies its one recorded lap over and over, so its progress and
 * the time it reaches any distance are known in advance: that gives positions and gaps without AI.
 */
export interface Rival {
  name: string;
  ghost: Ghost;
  /** distance from the start line at each ghost sample, m (never decreasing) */
  profile: Float64Array;
}

const STRIDE = 7;
const _p = new Vector3();

/** Distance along the track at every ghost sample, unwrapped from the start line. */
export function ghostProfile(g: Ghost, track: Track): Float64Array {
  const n = g.samples.length / STRIDE;
  const out = new Float64Array(n);
  const L = track.length;
  let hint = -1;
  let prevS = 0;
  let along = 0;
  for (let i = 0; i < n; i++) {
    _p.fromArray(g.samples, i * STRIDE);
    const near = nearestOnTrack(track, _p, hint);
    hint = near.index;
    if (i === 0) along = near.s > L / 2 ? near.s - L : near.s;
    else {
      let ds = near.s - prevS;
      if (ds > L / 2) ds -= L;
      else if (ds < -L / 2) ds += L;
      along += ds;
    }
    prevS = near.s;
    // a wobble backwards (wall bounce) shouldn't make the rival "lose" places it already took
    out[i] = Math.min(L, i > 0 ? Math.max(out[i - 1], along) : along);
  }
  return out;
}

export function makeRival(name: string, ghost: Ghost, track: Track): Rival {
  return { name, ghost, profile: ghostProfile(ghost, track) };
}

/** Distance into its lap at lap time `u`. */
function lapDistance(r: Rival, u: number, L: number): number {
  const n = r.profile.length;
  if (n === 0) return 0;
  if (u >= r.ghost.lap) return L;
  const f = Math.max(0, u / r.ghost.every);
  const i = Math.floor(f);
  if (i >= n - 1) return r.profile[n - 1];
  return r.profile[i] + (r.profile[i + 1] - r.profile[i]) * (f - i);
}

/** Lap time at which the rival is `d` metres into its lap. */
function lapTimeAt(r: Rival, d: number): number {
  const p = r.profile;
  const n = p.length;
  if (n === 0 || d >= p[n - 1]) return r.ghost.lap;
  if (d <= p[0]) return 0;
  let lo = 0;
  let hi = n - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (p[mid] < d) lo = mid;
    else hi = mid;
  }
  const k = p[hi] > p[lo] ? (d - p[lo]) / (p[hi] - p[lo]) : 0;
  return Math.min(r.ghost.lap, (lo + k) * r.ghost.every);
}

/** The rival's distance from the start line at race time `t` over `laps` laps (it stops at the finish). */
export function rivalDistance(r: Rival, t: number, L: number, laps: number): number {
  const total = laps * r.ghost.lap;
  if (t >= total) return laps * L;
  const k = Math.floor(Math.max(0, t) / r.ghost.lap);
  return k * L + lapDistance(r, t - k * r.ghost.lap, L);
}

/** Race time at which the rival had flown `d` metres from the start line. */
export function rivalTimeAt(r: Rival, d: number, L: number, laps: number): number {
  const k = Math.min(laps - 1, Math.max(0, Math.floor(d / L)));
  return k * r.ghost.lap + lapTimeAt(r, Math.min(d - k * L, L));
}

export interface Standing {
  name: string;
  /** seconds; negative = ahead of you, positive = behind */
  gap: number;
}

export interface Standings {
  /** your place, 1-based */
  position: number;
  /** you plus the rivals */
  of: number;
  /** rivals sorted by gap, front first */
  rivals: Standing[];
}

/**
 * Where you stand against the rivals. `dist`/`time` are your race distance and race time
 * (at the finish: the full distance and the finish time). Gaps compare times at your distance.
 */
export function standings(rivals: readonly Rival[], dist: number, time: number, L: number, laps: number): Standings {
  const out: Standing[] = rivals.map((r) => ({ name: r.name, gap: rivalTimeAt(r, Math.max(0, dist), L, laps) - time }));
  out.sort((a, b) => a.gap - b.gap);
  const ahead = out.filter((s) => s.gap < 0).length;
  return { position: ahead + 1, of: rivals.length + 1, rivals: out };
}

/**
 * Let the autopilot fly one lap from a standing start just behind the line, and keep it as a ghost.
 * Deterministic, so the same track always gives the same rival. Null if it doesn't finish in `limit` s.
 * Yields every `every` steps so a caller can spread the work over frames.
 */
export function* flyBotLap(cfg: SimConfig, gauntlet: Gauntlet | null, step: number, limit = 600, bot?: BotParams, every = 120): Generator<void, Ghost | null> {
  const track = cfg.track;
  if (!track) return null;
  const sim = newSim();
  spawnSim(sim, track, { s: -Math.min(30, track.length * 0.05), speed: 0 });
  const rec = new GhostRecorder();
  const c = noControls();
  const race = sim.race!;
  for (let i = 1; i <= limit / step; i++) {
    botControls(sim.curr, track, race.near, race.time, c, gauntlet, bot);
    stepSim(sim, c, cfg, step);
    race.events.length = 0;
    const lap = rec.update(race, sim.curr);
    if (lap) return lap;
    if (i % every === 0) yield;
  }
  return null;
}

/** `flyBotLap` in one go. */
export function recordBotLap(cfg: SimConfig, gauntlet: Gauntlet | null, step: number, limit = 600, bot?: BotParams): Ghost | null {
  const it = flyBotLap(cfg, gauntlet, step, limit, bot);
  for (;;) {
    const r = it.next();
    if (r.done) return r.value;
  }
}
