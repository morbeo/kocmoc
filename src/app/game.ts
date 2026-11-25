// Run state shared by the frame loop, replays, keys and menus: the sim, the race on it,
// ghosts and records, and what puts the ship back at a spawn point.
import { effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { FixedLoop } from '../core/loop';
import type { Ladder, RunOutcome } from '../core/ladder';
import { newShip, noControls, type Controls, type ShipState } from '../sim/ship';
import { newSim, spawnSim, type SimState, type Spawn } from '../sim/world';
import { Recorder, type Player, type Recording } from '../sim/replay';
import { GhostRecorder, parseGhost, type Ghost } from '../sim/ghost';
import { startSpawnS, type RaceState } from '../sim/race';
import { onTrack, track } from '../world/race';
import { bestKey, ghostKey, loadLadder } from '../world/records';
import { createRivals, type Rivals } from './rivals';
import type { Stage } from './stage';
import { raceLaps, simRate, spawnSpeed, spawnT } from './tuning';

/** a recording being played back */
export interface Replay {
  rec: Recording;
  player: Player;
  playing: boolean;
  speed: number;
}

export interface Game {
  stage: Stage;
  sim: SimState;
  prev: ShipState;
  curr: ShipState;
  /** the ship as drawn: prev and curr interpolated */
  view: ShipState;
  controls: Controls;
  loop: FixedLoop;
  race: RaceState | null;
  /** the best lap last written to storage */
  savedBest: number | null;
  /** your best lap on this track, raced as a ghost */
  ghost: Ghost | null;
  /** the last full lap flown this session, per track */
  lastLaps: Map<string, Ghost>;
  /** in a race, your best and last laps as they were at the start, so laps from this race don't join it */
  startGhosts: { best: Ghost | null; last: Ghost | null };
  rivals: Rivals;
  ghostRec: GhostRecorder;
  /** the run since the last spawn, for replays and bug reports */
  recorder: Recorder | null;
  replay: Replay | null;
  ladder: Ladder;
  /** the finished proving run, folded into the ladder once */
  outcome: RunOutcome | null;
  /** hidden routes flown this session (track key # branch), shown on the minimap from then on */
  foundRoutes: Set<string>;
  perf: { fps: number; frameMs: number };
}

export function createGame(stage: Stage): Game {
  const sim = newSim();
  const loop = new FixedLoop(1 / simRate.value);
  effect(() => void (loop.step = 1 / simRate.value));
  return {
    stage,
    sim,
    prev: sim.prev,
    curr: sim.curr,
    view: newShip(),
    controls: noControls(),
    loop,
    race: null,
    savedBest: null,
    ghost: null,
    lastLaps: new Map<string, Ghost>(),
    startGhosts: { best: null, last: null },
    rivals: createRivals(),
    ghostRec: new GhostRecorder(),
    recorder: null,
    replay: null,
    ladder: loadLadder(),
    outcome: null,
    foundRoutes: new Set<string>(),
    perf: { fps: 0, frameMs: 0 },
  };
}

export function spawnFor(t: number, speed: number): Spawn {
  if (!onTrack()) return { s: 0, speed };
  const L = track.value.length;
  // t = 0 spawns a little behind the line so crossing it starts the clock
  return { s: t === 0 ? startSpawnS(track.value) : t * L, speed };
}

/** Put the ship at a spawn point (fraction of the lap on a track; origin in free mode). */
export function respawn(g: Game, t = spawnT.value, speed = spawnSpeed.value, at?: Spawn): void {
  g.stage.juice.reset();
  g.ghostRec.reset();
  const spawn = at ?? spawnFor(t, speed);
  spawnSim(g.sim, onTrack() ? track.value : null, spawn, raceLaps.value);
  const race = (g.race = g.sim.race);
  g.ghost = null;
  if (race) {
    try {
      const best = JSON.parse(localStorage.getItem(bestKey()) ?? 'null');
      if (best && typeof best.lap === 'number' && Array.isArray(best.splits)) {
        race.bestLap = best.lap;
        race.bestSplits = best.splits;
      }
      g.ghost = parseGhost(JSON.parse(localStorage.getItem(ghostKey()) ?? 'null'));
    } catch {
      /* ignore a corrupt record */
    }
    g.savedBest = race.bestLap;
  }
  g.startGhosts = { best: g.ghost, last: g.lastLaps.get(bestKey()) ?? null };
  g.outcome = null;
  g.recorder = g.replay ? null : new Recorder(vars.snapshot(), spawn, g.loop.step);
  g.rivals.queueBotLap(g.loop.step);
}
