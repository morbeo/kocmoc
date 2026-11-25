// Game keys and buttons, and the lazily loaded panels and overlays they open.
import { effect } from '@preact/signals-core';
import { session } from '../core/session';
import { currentShip, playLevel } from '../core/selection';
import { attachInput, onKey, assistKey, cameraKey, cinematicKey, controlsKey, respawnKey, autopilotKey, replayKey, levelsKey, nextLevelKey, tracksKey, recordKeys, editKeys } from '../input/input';
import { detectTouch, touchUi } from '../input/touch';
import { cycleCamera, toggleCinematic } from '../cam/rigs';
import { editKey as hudEditKey, editMode as hudEdit } from '../ui/hudLayout';
import { keyButton } from '../ui/keyButton';
import { onTrack, track } from '../world/race';
import { provingLevel } from '../world/proving';
import { shipRadius } from '../world/gauntlet';
import { respawn, type Game } from './game';
import type { Menus } from './menus';
import type { Replays } from './replay';
import { openDebug } from './debugTools';
import { assist, autopilot, gizmos, inputViz, vizKey } from './tuning';

export function bindKeys(g: Game, replays: Replays, { levels, tracks, recording, editor }: Menus): void {
  attachInput(g.stage.renderer.domElement);
  /** game keys do nothing while the editor is open */
  const game = (fn: () => void) => () => {
    if (!editor.active) fn();
  };
  const recordingNow = () => recording.state === 'recording';
  onKey(respawnKey, game(() => (g.replay ? replays.seek(0) : respawn(g))));
  onKey(hudEditKey, game(() => hudEdit.set(!hudEdit.value)));
  onKey(autopilotKey, game(() => autopilot.set(!autopilot.value)));
  onKey(replayKey, game(() => (g.replay ? (g.replay.playing = !g.replay.playing) : session.replayRun())));
  onKey(assistKey, game(() => assist.set(!assist.value)));
  onKey(cameraKey, () => (editor.active ? editor.keys.camera() : cycleCamera()));
  onKey(cinematicKey, game(toggleCinematic));
  onKey(vizKey, () => inputViz.set(!inputViz.value));
  onKey(levelsKey, game(() => levels.toggle()));
  onKey(tracksKey, game(() => tracks.toggle()));
  onKey(recordKeys.record, () => (editor.active && recording.state === 'idle' ? editor.act('record') : recording.recordKey()));
  // [ ] and Backspace: the recording's while one runs, else the editor's (radius, delete)
  onKey(recordKeys.wider, () => (recordingNow() ? recording.act('wider') : editor.act('wider')));
  onKey(recordKeys.narrower, () => (recordingNow() ? recording.act('narrower') : editor.act('narrower')));
  onKey(recordKeys.pause, () => recording.act('pause'));
  onKey(recordKeys.undo, () => (recordingNow() ? recording.act('undo') : editor.act('delete')));
  onKey(editKeys.edit, () => {
    if (recording.state === 'idle' && !g.replay) editor.toggle();
  });
  onKey(editKeys.focus, editor.keys.focus);
  onKey(editKeys.frame, editor.keys.frame);
  onKey(editKeys.insert, editor.keys.insert);
  onKey(editKeys.remove, editor.keys.remove);
  onKey(editKeys.rollLeft, editor.keys.rollLeft);
  onKey(editKeys.rollRight, editor.keys.rollRight);
  onKey(editKeys.smooth, editor.keys.smooth);
  for (const k of ['center', 'step', 'yawLeft', 'yawRight', 'pitchUp', 'pitchDown', 'viewRollLeft', 'viewRollRight'] as const) onKey(editKeys[k], editor.keys[k]);
  onKey(nextLevelKey, game(() => {
    if (g.race?.proving?.result !== 'clear') return;
    playLevel(provingLevel.value + 1, currentShip() ?? 'balanced');
  }));
  keyButton('levels-btn', 'Levels', levelsKey, () => levels.toggle());
  keyButton('tracks-btn', 'Tracks', tracksKey, () => tracks.toggle());

  // controls panel (rebinding, invert pitch), lazy-loaded
  let controlsUi: Promise<typeof import('../ui/controls')> | undefined;
  const toggleControls = () => void (controlsUi ??= import('../ui/controls')).then((m) => m.toggle());
  onKey(controlsKey, toggleControls);
  keyButton('controls-btn', 'Controls', controlsKey, toggleControls);

  // on-screen sticks and buttons on touch screens, lazy-loaded
  detectTouch();
  let touchMod: Promise<typeof import('../ui/touch')> | undefined;
  effect(() => {
    const on = touchUi.value;
    if (!on && !touchMod) return;
    void (touchMod ??= import('../ui/touch')).then((m) => {
      m.mount({
        respawn: () => respawn(g),
        camera: cycleCamera,
        assist: () => assist.set(!assist.value),
        debug: () => void openDebug(),
        levels: () => levels.toggle(),
        tracks: () => tracks.toggle(),
      });
      m.show(on);
    });
  });
}

/** Debug gizmos and the input visualizer, loaded the first time they're switched on. */
export function lazyOverlays(g: Game) {
  let gizmoUi: ReturnType<typeof import('../debug/gizmos').createGizmos> | undefined;
  let gizmoLoading = false;
  effect(() => {
    if (gizmoLoading || !gizmos.some((x) => x.value)) return;
    gizmoLoading = true;
    void import('../debug/gizmos').then((m) => {
      gizmoUi = m.createGizmos({
        scene: g.stage.scene,
        ship: () => g.view,
        prevShip: () => g.prev,
        step: () => g.loop.step,
        track: () => (onTrack() ? track.value : null),
        near: () => g.race?.near ?? null,
        shipRadius: () => shipRadius.value,
      });
    });
  });

  let viz: Promise<typeof import('../debug/inputViz')> | undefined;
  effect(() => {
    const on = inputViz.value;
    if (on || viz) void (viz ??= import('../debug/inputViz')).then((m) => m.show(on));
  });
  return { gizmos: () => gizmoUi };
}
