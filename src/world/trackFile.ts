import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { vars, type Registry } from '../core/vars';
import { applyScenario, trackScenario } from '../core/scenarios';
import { bakeTrack, parseTrackDoc, serializeTrackDoc, type TrackDoc } from '../gen/trackDoc';
import { gameMode, seedVar, track, trackDoc } from './race';
import { gauntlet } from './gauntlet';
import { pads } from './pads';

/** `#t=<lz-string>`: a track file in a link. */
export const TRACK_HASH = '#t=';

/**
 * Vars that only shape the generated course: a track file holds the course itself, so these are
 * left out of a bake (the look, the profile, scenery, screens and cavern movers stay).
 */
const COURSE_VARS = /^gen\.race\.(seed|points|radius|wobble|height|twist|twistNoise|tubeRadius|spacing|shape|checkpoints|forks|pitLane|route\..*|sections|sectionKinds|sectionMin|sectionMax|hazards|hazardKinds|hazardDifficulty|boostPads|slowFields|boostLength|slowLength|track)$/;

/** The scenario and user layers merged, without the course generator's vars or the mode. */
export function lookVars(registry: Registry = vars): Record<string, string | number | boolean> {
  const snap = registry.snapshot();
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries({ ...snap.scenario, ...snap.user })) {
    if (k === 'game.mode' || COURSE_VARS.test(k)) continue;
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') out[k] = v;
  }
  return out;
}

/**
 * The track flown now as a track file: centreline, forks and sections, and in race mode its hazards
 * and pads, plus the look. Bake a venue to edit it by hand.
 */
export function bakeCurrent(title = trackDoc.value?.title): TrackDoc {
  const race = gameMode.value === 'race';
  return bakeTrack({
    track: track.value,
    hazards: race ? gauntlet.value?.planes : undefined,
    pads: race ? pads.value : undefined,
    seed: seedVar.value,
    title,
    vars: lookVars(),
  });
}

/** Fly a track file: it becomes the scenario (race mode, its look, its seed), as one undo step. */
export function loadTrackDoc(doc: TrackDoc, registry: Registry = vars): void {
  applyScenario(registry, trackScenario(doc));
}

/** Back to the generated track: drop the track file from the scenario and user layers, as one undo step. */
export function clearTrackFile(registry: Registry = vars): void {
  const path = 'gen.race.track';
  registry.change(
    (['scenario', 'user'] as const)
      .filter((layer) => registry.layerValue(layer, path) !== undefined)
      .map((layer) => ({ layer, path, before: registry.layerValue(layer, path), after: undefined })),
  );
}

/** A link that opens this track file. */
export function trackShareUrl(doc: TrackDoc, href = location.href): string {
  const url = new URL(href);
  url.search = '';
  url.hash = TRACK_HASH.slice(1) + compressToEncodedURIComponent(serializeTrackDoc(doc));
  return url.toString();
}

/** The track file in a `#t=` hash, if there is a valid one. */
export function trackFromHash(hash: string): TrackDoc | undefined {
  if (!hash.startsWith(TRACK_HASH)) return undefined;
  try {
    return parseTrackDoc(JSON.parse(decompressFromEncodedURIComponent(hash.slice(TRACK_HASH.length)) ?? ''));
  } catch {
    return undefined;
  }
}
