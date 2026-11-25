// What the HUD and minimap show about the race, built from the run state each frame.
import { currentShip } from '../core/selection';
import { keyLabel } from '../input/bindings';
import { levelsKey, nextLevelKey, respawnKey } from '../input/input';
import { touchUi } from '../input/touch';
import { forkAhead } from '../gen/routes';
import { raceDistance, splitDelta, type RaceState } from '../sim/race';
import { standings } from '../sim/rivals';
import { oobTime, routeColors, ROUTE_NAMES, seedVar, track } from '../world/race';
import { provingCourse, provingLevel, provingRules } from '../world/proving';
import { bestKey } from '../world/records';
import type { ProvingHud } from '../ui/hud';
import type { Game } from './game';

export function provingHud(g: Game, r: RaceState): ProvingHud | null {
  const ps = r.proving;
  const pc = provingCourse.value;
  if (!ps || !pc) return null;
  const rules = provingRules();
  const ship = currentShip();
  return {
    level: provingLevel.value,
    timeLeft: ps.timeLeft,
    gates: pc.gates.length,
    hits: ps.hits,
    misses: ps.misses,
    beacons: pc.beacons.length,
    collected: ps.collected,
    result: ps.result,
    score: ps.score,
    weights: { time: rules.scoreTime, gate: rules.scoreGate, beacon: rules.scoreBeacon },
    best: ship ? (g.ladder[ship]?.best[provingLevel.value] ?? null) : null,
    newBest: !!g.outcome?.newBest,
    badge: !!g.outcome?.badge,
    ship,
  };
}

/** Minimap colour per branch; hidden routes stay hidden until flown this session. */
export function branchColors(g: Game): (string | null)[] {
  const bs = track.value.branches ?? [];
  const key = bs.some((b) => b.kind === 'hidden') ? bestKey() : '';
  return bs.map((b, k) => (b.kind === 'hidden' ? (g.foundRoutes.has(`${key}#${k}`) ? '#8a7fb0' : null) : routeColors[b.kind].value));
}

/** The route you're on, or the marked fork coming up. */
export function routeHud(r: RaceState): { text: string; color: string } | null {
  const bs = track.value.branches;
  if (!bs?.length) return null;
  const color = (k: keyof typeof ROUTE_NAMES) => (k === 'hidden' ? '#ffffff' : routeColors[k].value);
  if (r.loc.route >= 0) {
    const k = bs[r.loc.route].kind;
    return { text: ROUTE_NAMES[k], color: color(k) };
  }
  const next = forkAhead(track.value, r.near.s, 450);
  return next && next.kind !== 'hidden' ? { text: `FORK · ${ROUTE_NAMES[next.kind]}`, color: color(next.kind) } : null;
}

/** The race panel: laps, splits, standings against the rivals, route and proving. `L` is one lap (or the run). */
export function raceHud(g: Game, race: RaceState, L: number) {
  const racing = race.laps > 0;
  const rivals = g.rivals.list;
  return {
    lap: race.lap,
    started: race.started,
    lapTime: race.lapTime,
    lastLap: race.lastLap,
    bestLap: race.bestLap,
    delta: splitDelta(race),
    checkpoint: race.splits.length,
    checkpoints: track.value.checkpoints.length,
    seed: seedVar.value,
    laps: race.laps,
    run: track.value.closed === false,
    raceTime: race.raceTime,
    finished: race.finished,
    finishTime: race.finishTime,
    lapTimes: race.lapTimes,
    standings: race.started && rivals.length
      ? racing
        ? race.finished
          ? standings(rivals.map((x) => x.rival), race.laps * L, race.finishTime!, L, race.laps)
          : standings(rivals.map((x) => x.rival), Math.min(raceDistance(race, L), race.laps * L), race.raceTime, L, race.laps)
        : standings(rivals.map((x) => x.rival), race.along, race.lapTime, L, 1)
      : null,
    rivalTimes: racing && !race.proving ? rivals.map((x) => ({ name: x.rival.name, time: x.rival.ghost.lap * race.laps })) : [],
    oob: race.oob > 0 ? Math.max(0, oobTime.value - race.oob) : null,
    route: routeHud(race),
    proving: provingHud(g, race),
  };
}

/** How to go again once a race or proving run is over. */
export function againText(race: RaceState | null): string {
  const keyOf = (k: { value: string }) => keyLabel(k.value.split(',')[0]?.trim() ?? '');
  return race?.proving
    ? touchUi.value
      ? 'tap respawn to fly again · LEVELS for the ladder'
      : `${keyOf(respawnKey)} retry${race.proving.result === 'clear' ? ` · ${keyOf(nextLevelKey)} next level` : ''} · ${keyOf(levelsKey)} levels`
    : touchUi.value
      ? 'tap respawn to race again'
      : `${keyOf(respawnKey)} to race again`;
}
