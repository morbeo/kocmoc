// The levels ladder, the track picker and recording a track by flying it.
import { vars } from '../core/vars';
import { applyScenario, venues } from '../core/scenarios';
import { currentShip, currentVenue, playLevel } from '../core/selection';
import { recordKeys } from '../input/input';
import { parseTrackText } from '../gen/trackDoc';
import { onTrack, track } from '../world/race';
import { loadTrackDoc } from '../world/trackFile';
import { createRecordScene } from '../world/recording';
import { listTracks, removeTrack } from '../world/library';
import { createLevels } from '../ui/levels';
import { createTracks } from '../ui/tracks';
import { createRecording } from '../ui/record';
import { respawn, type Game } from './game';

export type Menus = ReturnType<typeof createMenus>;

export function createMenus(g: Game) {
  const levels = createLevels({ ladder: () => g.ladder, ship: currentShip, play: playLevel });
  const recordScene = createRecordScene(g.stage.scene);
  const recording = createRecording({ scene: recordScene, ship: () => g.curr, respawn: () => respawn(g), track: () => (onTrack() ? track.value : null), keys: recordKeys });
  const tracks = createTracks({
    venues: () => venues(),
    current: currentVenue,
    play: (sc) => applyScenario(vars, sc),
    record: () => recording.start(),
    recordKey: recordKeys.record,
    mine: listTracks,
    playMine: (text) => {
      const doc = parseTrackText(text);
      if (doc) loadTrackDoc(doc);
    },
    removeMine: removeTrack,
  });
  return { levels, recording, tracks };
}
