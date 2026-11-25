// What starts a run over, and what opens one from outside: ?seed=, ?scenario=, #t= track
// files and files dropped on the page.
import { effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { scenarios, applyScenario, parseScenario, setSpawnHandler, setSpawnSource } from '../core/scenarios';
import { parseRecording } from '../sim/replay';
import { parseTrackDoc } from '../gen/trackDoc';
import { gameMode, onTrack, seedVar, track } from '../world/race';
import { gauntlet } from '../world/gauntlet';
import { movers, pads } from '../world/pads';
import { provingCourse } from '../world/proving';
import { loadTrackDoc, trackFromHash, TRACK_HASH } from '../world/trackFile';
import { respawn, type Game } from './game';
import type { Replays } from './replay';
import { raceLaps, rivalBot } from './tuning';

/** ?seed=N wins over the saved seed; it's written to the user layer (not undoable) so the two agree. */
export function applySeedParam(): void {
  const urlParams = new URLSearchParams(location.search);
  const urlSeed = Number(urlParams.get('seed'));
  if (urlParams.has('seed') && Number.isFinite(urlSeed)) {
    vars.change([{ layer: 'user', path: 'gen.race.seed', before: vars.layerValue('user', 'gen.race.seed'), after: Math.round(urlSeed) }], false);
  }
}

/** New track or mode → start over; keep the bot rival and the address bar in step. */
export function watchRestarts(g: Game): void {
  effect(() => {
    void track.value;
    void gameMode.value;
    void gauntlet.value;
    void pads.value;
    void movers.value;
    void provingCourse.value;
    void raceLaps.value;
    if (!g.replay) respawn(g);
  });
  effect(() => {
    if (rivalBot.value) g.rivals.queueBotLap(g);
  });
  // keep ?seed= in the address bar on a track, so the URL names it
  effect(() => {
    const url = new URL(location.href);
    if (onTrack()) url.searchParams.set('seed', String(seedVar.value));
    else url.searchParams.delete('seed');
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  });

  setSpawnHandler(({ trackT, speed }) => respawn(g, trackT, speed));
  setSpawnSource(() => ({
    trackT: g.race ? (g.race.near.s / track.value.length) : 0,
    speed: g.curr.vel.length(),
  }));
}

/** Open a scenario or track file named in the URL, and whatever is dropped on the page. */
export function openFromOutside(replays: Replays): void {
  const urlScenario = new URLSearchParams(location.search).get('scenario');
  if (urlScenario) {
    const sc = scenarios.find((x) => x.name === urlScenario);
    if (sc) applyScenario(vars, sc);
    else console.warn(`kocmoc: no scenario named ${urlScenario}`);
  }
  // #t=<lz-string> opens a shared track file; the hash goes once it's loaded
  if (location.hash.startsWith(TRACK_HASH)) {
    const doc = trackFromHash(location.hash);
    if (doc) loadTrackDoc(doc);
    else console.warn('kocmoc: invalid track file in URL');
    history.replaceState(null, '', location.pathname + location.search);
  }
  // drop a scenario JSON on the page to load it
  addEventListener('dragover', (e) => e.preventDefault());
  addEventListener('drop', async (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (!file) return;
    try {
      const raw = JSON.parse(await file.text());
      const rec = parseRecording(raw);
      if (rec) {
        replays.play(rec);
        return;
      }
      const doc = parseTrackDoc(raw);
      if (doc) {
        loadTrackDoc(doc);
        return;
      }
      const sc = parseScenario(raw);
      if (sc) applyScenario(vars, sc);
      else console.warn('kocmoc: dropped file is not a scenario or a track file');
    } catch {
      console.warn('kocmoc: dropped file is not valid JSON');
    }
  });
}
