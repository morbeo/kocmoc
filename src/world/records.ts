import { gameMode, genParams, routeParams, routesOn, sectionParams } from './race';
import { gauntletParams, hazardParams } from './gauntlet';
import { provingParams } from './proving';
import { moverParams, movers, padEffect, padParams, pads } from './pads';
import { parseLadder, type Ladder } from '../core/ladder';

/**
 * localStorage key of the best lap for what is flown now: the mode and everything that shapes the
 * course (track, gauntlet or proving parameters; routes, sections, hazards, pads and movers when they're on).
 */
export const bestKey = () =>
  gameMode.value === 'gauntlet'
    ? `kocmoc.best.gauntlet.${JSON.stringify([genParams.value, gauntletParams.value])}`
    : gameMode.value === 'proving'
      ? `kocmoc.best.proving.${JSON.stringify([genParams.value, provingParams.value])}`
      : `kocmoc.best.${JSON.stringify(genParams.value)}${routesOn() ? `|routes${JSON.stringify(routeParams.value)}` : ''}${sectionParams.value.count > 0 ? `|sections${JSON.stringify(sectionParams.value)}` : ''}${hazardParams.value.count > 0 ? `|hazards${JSON.stringify(hazardParams.value)}` : ''}${pads.value.length ? `|pads${JSON.stringify([padParams.value, padEffect()])}` : ''}${movers.value.length ? `|movers${JSON.stringify(moverParams.value)}` : ''}`;
/** localStorage key of the best lap's ghost */
export const ghostKey = () => bestKey().replace('kocmoc.best.', 'kocmoc.ghost.');

export const LADDER_KEY = 'kocmoc.proving.ladder';
export function loadLadder(): Ladder {
  try {
    return parseLadder(JSON.parse(localStorage.getItem(LADDER_KEY) ?? 'null'));
  } catch {
    return {};
  }
}
