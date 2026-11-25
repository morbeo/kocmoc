// Ghosts to race against: your best and last laps, and an autopilot lap flown in the background.
import { botTargets } from '../sim/bot';
import { flyBotLap, makeRival, type Rival } from '../sim/rivals';
import type { Ghost } from '../sim/ghost';
import { gameMode, onTrack, track } from '../world/race';
import { bestKey } from '../world/records';
import { RIVAL_NAMES, type RivalKind } from '../render/rivals';
import { botParams, ghostOn, params, rivalBot, rivalBotRoute, rivalLast, simConfig } from './tuning';
import type { Game } from './game';

export interface Rivals {
  /** ghosts raced against, rebuilt when one of them changes */
  list: { kind: RivalKind; rival: Rival }[];
  /** Rebuild the rival list if the ghosts or the toggles behind it changed. */
  refresh(g: Game): void;
  /** Fly the autopilot rival for this track in the background, once, a few ms per frame. */
  queueBotLap(g: Game): void;
}

export function createRivals(): Rivals {
  /** autopilot laps, per track and ship tuning (deterministic, so computed once) */
  const botLaps = new Map<string, Ghost | null>();
  const botKey = () => `${bestKey()}|${JSON.stringify(params())}${track.value.branches?.length ? `|${rivalBotRoute.value}` : ''}`;
  let botPending: ReturnType<typeof setTimeout> | undefined;
  let botFlying = '';
  let rivalsFor = '';

  const self: Rivals = {
    /** ghosts raced against, rebuilt when one of them changes */
    list: [] as { kind: RivalKind; rival: Rival }[],

    /** Rebuild the rival list if the ghosts or the toggles behind it changed. */
    refresh(g: Game): void {
      const race = g.race;
      // proving is scored on time left, gates and beacons: no rivals to race
      if (!race || !onTrack() || gameMode.value === 'proving') {
        self.list = [];
        rivalsFor = '';
        return;
      }
      const live = race.laps === 0;
      const last = rivalLast.value ? (live ? (g.lastLaps.get(bestKey()) ?? null) : g.startGhosts.last) : null;
      const bot = rivalBot.value ? (botLaps.get(botKey()) ?? null) : null;
      const best = ghostOn.value ? (live ? g.ghost : g.startGhosts.best) : null;
      const want: [RivalKind, Ghost | null][] = [['best', best], ['last', last], ['bot', bot]];
      const key = want.map(([k, gh]) => (gh ? `${k}${gh.lap}` : '')).join(',') + track.value.length;
      if (key === rivalsFor) return;
      rivalsFor = key;
      self.list = want.filter((w): w is [RivalKind, Ghost] => !!w[1]).map(([kind, gh]) => ({ kind, rival: makeRival(RIVAL_NAMES[kind], gh, track.value) }));
    },

    /** Fly the autopilot rival for this track in the background, once, a few ms per frame. */
    queueBotLap(g: Game): void {
      const key = botKey();
      // not while editing: every edit is a new track (closing the editor respawns and asks again)
      if (g.editor?.active) return;
      if (!rivalBot.value || !onTrack() || gameMode.value === 'proving' || botLaps.has(key) || botFlying === key) return;
      clearTimeout(botPending);
      botFlying = key;
      const cfg = simConfig();
      const fly = flyBotLap(cfg, botTargets(cfg.course), g.loop.step, 600, botParams(rivalBotRoute.value));
      const slice = () => {
        if (key !== botKey()) {
          botFlying = '';
          return;
        }
        const t0 = performance.now();
        while (performance.now() - t0 < 4) {
          const r = fly.next();
          if (r.done) {
            botLaps.set(key, r.value);
            botFlying = '';
            return;
          }
        }
        botPending = setTimeout(slice, 0);
      };
      botPending = setTimeout(slice, 200);
    },
  };
  return self;
}
