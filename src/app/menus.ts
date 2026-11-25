// The levels ladder, the track picker and recording a track by flying it.
import { vars } from '../core/vars';
import { applyScenario, venues } from '../core/scenarios';
import { currentShip, currentVenue, playLevel } from '../core/selection';
import { cameraKey, editKeys, recordKeys } from '../input/input';
import { touchUi } from '../input/touch';
import { parseTrackText } from '../gen/trackDoc';
import { onTrack, track } from '../world/race';
import { loadTrackDoc } from '../world/trackFile';
import { createRecordScene } from '../world/recording';
import { listTracks, removeTrack } from '../world/library';
import { createLevels } from '../ui/levels';
import { createTracks } from '../ui/tracks';
import { createRecording } from '../ui/record';
import { createEditor } from '../ui/editor';
import { respawn, type Game } from './game';

export type Menus = ReturnType<typeof createMenus>;
export type Editor = ReturnType<typeof createEditor>;

export function createMenus(g: Game) {
  const { scene, camera, renderer, viewports } = g.stage;
  const levels = createLevels({ ladder: () => g.ladder, ship: currentShip, play: playLevel });
  const recordScene = createRecordScene(scene);
  const recording = createRecording({
    scene: recordScene,
    ship: () => g.curr,
    respawn: () => respawn(g),
    track: () => (onTrack() ? track.value : null),
    keys: recordKeys,
    camera: () => editor.pose(),
    edit: (doc) => editor.open(doc),
    leaving: () => editor.close(),
  });
  const editor = createEditor({
    scene,
    camera,
    canvas: renderer.domElement,
    keys: { ...editKeys, camera: cameraKey, record: recordKeys.record, wider: recordKeys.wider, narrower: recordKeys.narrower },
    respawn: () => respawn(g),
    record: () => {
      menus.recordingFromEditor = true;
      recording.start('camera');
    },
    view: () => viewports.mainRect(),
  });
  g.editor = editor;
  const tracks = createTracks({
    venues: () => venues(),
    current: currentVenue,
    play: (sc) => applyScenario(vars, sc),
    record: () => recording.start(),
    recordKey: recordKeys.record,
    edit: (text) => editor.open(text ? parseTrackText(text) : undefined),
    editKey: editKeys.edit,
    canEdit: () => !touchUi.value,
    mine: listTracks,
    playMine: (text) => {
      const doc = parseTrackText(text);
      if (doc) loadTrackDoc(doc);
    },
    removeMine: removeTrack,
  });
  const menus = {
    levels,
    recording,
    editor,
    tracks,
    /** a recording from the editor's fly cam is up: the editor comes back when it ends */
    recordingFromEditor: false,
  };
  return menus;
}
