// Records kept as you fly: ghost laps, the best lap, and finished proving runs on the ladder.
import { currentShip } from '../core/selection';
import { recordRun } from '../core/ladder';
import { provingLevel } from '../world/proving';
import { bestKey, ghostKey, LADDER_KEY } from '../world/records';
import type { Game } from './game';

/** After a sim step: keep a finished lap as the last lap, and as the ghost if it's the new best. */
export function recordLap(g: Game): void {
  const race = g.race;
  if (!race || g.replay) return;
  const lap = g.ghostRec.update(race, g.curr);
  if (lap) g.lastLaps.set(bestKey(), lap);
  // a new best lap becomes the ghost for this track
  if (lap && race.bestLap === lap.lap) {
    g.ghost = lap;
    try {
      localStorage.setItem(ghostKey(), JSON.stringify(lap));
    } catch {
      /* storage full: keep it for this session only */
    }
  }
}

/** A finished proving run counts once on the ladder (not while watching a replay). */
export function foldProvingRun(g: Game): void {
  const race = g.race;
  if (!race?.proving?.result || g.outcome) return;
  const ship = currentShip();
  g.outcome = { ladder: g.ladder, newBest: false, badge: false };
  if (!g.replay && ship) {
    g.outcome = recordRun(g.ladder, ship, provingLevel.value, race.proving.score, race.proving.result === 'clear');
    if (g.outcome.ladder !== g.ladder) {
      g.ladder = g.outcome.ladder;
      try {
        localStorage.setItem(LADDER_KEY, JSON.stringify(g.ladder));
      } catch {
        /* storage full: progress lasts this session */
      }
    }
  }
}

/** Store a new best lap and its splits for this track. */
export function saveBestLap(g: Game): void {
  const race = g.race;
  if (race && !g.replay && race.bestLap !== null && race.bestLap !== g.savedBest) {
    g.savedBest = race.bestLap;
    localStorage.setItem(bestKey(), JSON.stringify({ lap: race.bestLap, splits: race.bestSplits }));
  }
}
