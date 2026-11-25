import { Vector3, type Quaternion } from 'three';
import { vars } from '../core/vars';
import { keyLabel } from '../input/bindings';
import { bridge, canClose, closeLoop, describeProblem, PathRecorder, recordingToDoc, trackProblems, type Problem } from '../gen/record';
import { compileTrack, serializeTrackDoc, type CompiledTrack, type TrackDoc } from '../gen/trackDoc';
import type { ShipState } from '../sim/ship';
import type { Track } from '../gen/track';
import { gameMode, trackText } from '../world/race';
import { loadTrackDoc } from '../world/trackFile';
import { saveTrack } from '../world/library';
import type { RecordScene } from '../world/recording';
import './record.css';

const tags = ['record'];
const rv = {
  step: vars.num('record.step', 4, { min: 1, max: 20, hardMin: 0.5, unit: 'm', tags, desc: 'a sample every this far along the flown path' }),
  radius: vars.num('record.radius', 40, { min: 10, max: 120, hardMin: 3, hardMax: 1000, unit: 'm', tags, desc: 'tube radius while recording ([ and ] change it as you fly)' }),
  radiusStep: vars.num('record.radiusStep', 5, { min: 1, max: 40, hardMin: 0.1, unit: 'm', tags, desc: 'how much [ and ] change the radius' }),
  undo: vars.num('record.undo', 200, { min: 20, max: 2000, hardMin: 1, unit: 'm', tags, desc: 'how much of the path undo takes back' }),
  tolerance: vars.num('record.tolerance', 0.25, { min: 0.05, max: 1, hardMin: 0.01, tags, desc: 'fit: how far the track may stray from the flown path, as a share of the tube radius' }),
  closeNear: vars.num('record.closeNear', 3, { min: 1, max: 10, hardMin: 0.5, tags, desc: 'offer to close the loop within this many tube radii of the start' }),
  minLength: vars.num('record.minLength', 200, { min: 50, max: 2000, hardMin: 10, unit: 'm', tags, desc: 'shortest path that can be finished' }),
};

type Keys = Record<'record' | 'wider' | 'narrower' | 'pause' | 'undo', { value: string }>;
export interface RecordHost {
  scene: RecordScene;
  /** the ship as simulated now */
  ship(): ShipState;
  /** start the ship over (free flight: at the origin) */
  respawn(): void;
  /** the track flown now (null in free flight), to mark a recorded track's failing stretches on */
  track(): Track | null;
  keys: Keys;
  /** the editor's fly cam, to record from instead of the ship */
  camera?(): { pos: Vector3; quat: Quaternion };
  /** open a recorded track in the editor (offers "Edit it") */
  edit?(doc: TrackDoc): void;
  /** about to fly a recorded track (the editor closes) */
  leaving?(): void;
}
type Finish = 'close' | 'bridge' | 'open';
type State = 'idle' | 'recording' | 'finishing' | 'review';
/** what lays the path: the ship (in open space) or the editor's fly cam */
export type RecordSource = 'ship' | 'camera';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const km = (m: number) => (m >= 1000 ? `${(m / 1000).toFixed(2)} km` : `${m.toFixed(0)} m`);
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * Record a track by flying it (M8c). Start from the track list or J: the ship goes to open space
 * and a ghost tube grows behind it. J again finishes: close the loop (offered when you come back
 * to the start heading the same way), bridge back to the start, or keep it a point-to-point run.
 * The path is fitted to control points and checked, then flown, saved to My tracks or downloaded.
 */
export function createRecording(host: RecordHost) {
  const keyOf = (k: { value: string }) => keyLabel(k.value.split(',')[0]?.trim() ?? '');
  const hud = document.createElement('div');
  hud.id = 'rec-hud';
  hud.hidden = true;
  const panel = document.createElement('div');
  panel.id = 'rec-panel';
  panel.hidden = true;
  document.body.append(hud, panel);

  let state: State = 'idle';
  let source: RecordSource = 'ship';
  let rec = new PathRecorder();
  let closable = false;
  let modeBefore: unknown;
  let notice = '';
  let noticeUntil = 0;
  let title = '';
  let result: { doc: TrackDoc; compiled: CompiledTrack; problems: Problem[]; how: Finish } | null = null;
  /** the flown recording whose failing stretches are marked, by its text */
  let markedText = '';
  let markedProblems: Problem[] = [];
  const up = new Vector3();

  const setMode = (after: unknown) => vars.change([{ layer: 'user', path: 'game.mode', before: vars.layerValue('user', 'game.mode'), after }], false);

  function start(from: RecordSource = 'ship'): void {
    if (state !== 'idle' || (from === 'camera' && !host.camera)) return;
    if (document.pointerLockElement) document.exitPointerLock();
    source = from;
    modeBefore = vars.layerValue('user', 'game.mode');
    rec = new PathRecorder(rv.step.value);
    host.scene.reset();
    closable = false;
    state = 'recording';
    title = `Flown ${new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
    // open space: no walls, no track; the mode change respawns the ship at the origin
    if (from === 'camera') {
      /* the fly cam goes where it likes: the game under the editor stays as it is */
    } else if (gameMode.value !== 'free') setMode('free');
    else host.respawn();
    hud.hidden = false;
    drawHud();
  }

  function say(text: string): void {
    notice = text;
    noticeUntil = performance.now() + 2500;
    drawHud();
  }

  function drawHud(): void {
    if (state !== 'recording') return;
    const k = host.keys;
    const status = rec.paused ? '<b class="paused">❚❚ PAUSED</b>' : '<b class="rec">● REC</b>';
    const msg = performance.now() < noticeUntil ? notice : closable ? `Back at the start: ${keyOf(k.record)} to close the loop` : '';
    hud.innerHTML = `
      <div class="row">${status}<span>${km(rec.length)}</span><span>tube ${rv.radius.value.toFixed(0)} m</span></div>
      <div class="row btns">
        <button data-a="narrower" title="narrower tube">${esc(keyOf(k.narrower))} −</button>
        <button data-a="wider" title="wider tube">${esc(keyOf(k.wider))} +</button>
        <button data-a="pause">${esc(keyOf(k.pause))} ${rec.paused ? 'resume' : 'pause'}</button>
        <button data-a="undo">${esc(keyOf(k.undo))} undo</button>
        <button data-a="finish" class="go">${esc(keyOf(k.record))} finish</button>
      </div>
      <div class="msg${closable ? ' ok' : ''}">${esc(msg)}</div>`;
  }
  let hudKey = '';

  function finish(): void {
    if (state !== 'recording') return;
    if (rec.length < rv.minLength.value) return say(`Fly at least ${km(rv.minLength.value)} first`);
    if (document.pointerLockElement) document.exitPointerLock();
    state = 'finishing';
    rec.paused = true;
    closable = canClose(rec.samples, rv.radius.value, rv.closeNear.value);
    hud.hidden = true;
    drawPanel();
  }

  function fit(how: Finish): void {
    const R = rv.radius.value;
    const samples = how === 'close' ? closeLoop(rec.samples, R) : how === 'bridge' ? bridge(rec.samples, rec.step, R) : rec.samples;
    const doc = recordingToDoc(samples, { closed: how !== 'open', seed: 1 + Math.floor(Math.random() * 99998), title: title.trim() || undefined, step: rec.step, tolerance: rv.tolerance.value });
    const compiled = compileTrack(doc);
    const problems = trackProblems(compiled.base);
    result = { doc, compiled, problems, how };
    host.scene.showTrack(compiled.base, problems);
    state = 'review';
    drawPanel();
  }

  function drawPanel(): void {
    panel.hidden = state !== 'finishing' && state !== 'review';
    if (panel.hidden) return;
    let body: string;
    if (state === 'finishing') {
      body = `
        <p class="rp-help">${km(rec.length)} recorded, ${rec.samples.length} samples. How should it end?</p>
        <label class="rp-title">Name <input type="text" maxlength="80" value="${esc(title)}" data-f="title"></label>
        <div class="rp-btns">
          ${closable ? '<button data-a="close" class="go">Close the loop</button>' : ''}
          <button data-a="bridge"${closable ? '' : ' class="go"'}>Bridge back to the start</button>
          <button data-a="open">Keep it open: a point-to-point run</button>
        </div>
        <div class="rp-btns">
          <button data-a="resume">Keep recording</button>
          <button data-a="discard" class="bad">Discard</button>
        </div>`;
    } else {
      const r = result!;
      const t = r.compiled.base;
      const problems = r.problems.length
        ? `<ul class="rp-problems">${r.problems.map((p) => `<li>${esc(describeProblem(p))}</li>`).join('')}</ul><p class="rp-note">Failing stretches are red on the track. You can still fly it.</p>`
        : '<p class="rp-ok">Passes the checks: no tight bends, the tube never touches itself.</p>';
      body = `
        <p class="rp-help"><b>${esc(r.doc.title ?? 'Untitled track')}</b>: ${r.doc.closed ? 'a loop' : 'a point-to-point run'}, ${km(t.length)}, ${r.doc.points.length} control points, tube ${r.doc.radius} m${r.doc.twist ? `, ${Math.abs(r.doc.twist)} roll${Math.abs(r.doc.twist) > 1 ? 's' : ''} a lap` : ''}.</p>
        ${problems}
        <div class="rp-btns">
          <button data-a="fly" class="go">Fly it</button>
          ${host.edit ? '<button data-a="edit">Edit it</button>' : ''}
          <button data-a="save">Save to My tracks</button>
          <button data-a="download">Download file</button>
        </div>
        <div class="rp-btns">
          <button data-a="back">Back</button>
          <button data-a="discard" class="bad">Discard</button>
        </div>
        <p class="rp-msg" aria-live="polite"></p>`;
    }
    panel.innerHTML = `<div class="rp-panel" role="dialog" aria-label="Recorded track"><header><h2>${state === 'finishing' ? 'Finish recording' : 'Recorded track'}</h2></header>${body}</div>`;
  }

  function restoreMode(after: unknown = modeBefore): void {
    const was = gameMode.value;
    setMode(after);
    if (gameMode.value === was) host.respawn();
  }

  function close(): void {
    state = 'idle';
    result = null;
    hud.hidden = true;
    panel.hidden = true;
    host.scene.hide();
  }

  function discard(): void {
    close();
    if (source === 'ship') restoreMode();
  }

  function back(): void {
    if (state === 'review') {
      // the recorded path again, in place of the fitted track
      host.scene.reset();
      for (const q of rec.samples) host.scene.append(q.p, q.r);
      host.scene.closable(closable);
      state = 'finishing';
      drawPanel();
    } else if (state === 'finishing') {
      state = 'recording';
      rec.paused = false;
      panel.hidden = true;
      hud.hidden = false;
      drawHud();
    }
  }

  function fly(): void {
    const r = result;
    if (!r) return;
    host.leaving?.();
    close();
    // race it: the track file's scenario says race, so no mode is left in the user layer
    setMode(undefined);
    loadTrackDoc(r.doc);
    markedText = serializeTrackDoc(r.doc);
    markedProblems = r.problems;
  }

  function download(doc: TrackDoc): void {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(doc, null, 1)], { type: 'application/json' }));
    a.download = `${slug(doc.title ?? '') || 'track'}.kocmoc-track.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  const msg = (text: string) => {
    const el = panel.querySelector('.rp-msg');
    if (el) el.textContent = text;
  };

  panel.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.dataset.f === 'title') title = el.value;
  });
  panel.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>('[data-a]')?.dataset.a;
    if (!a) return;
    (e.target as HTMLElement).blur();
    if (a === 'close' || a === 'bridge' || a === 'open') fit(a);
    else if (a === 'resume' || a === 'back') back();
    else if (a === 'discard') discard();
    else if (a === 'fly') fly();
    else if (a === 'edit' && result && host.edit) {
      const doc = result.doc;
      close();
      host.edit(doc);
    }
    else if (a === 'download' && result) download(result.doc);
    else if (a === 'save' && result) {
      saveTrack(result.doc).then(
        () => msg('Saved. It is under My tracks in the track list.'),
        () => msg('Could not save here (storage blocked?). Download the file instead.'),
      );
    }
  });
  hud.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-a]');
    if (!b) return;
    b.blur();
    act(b.dataset.a as 'wider' | 'narrower' | 'pause' | 'undo' | 'finish');
  });
  addEventListener('keydown', (e) => {
    if (e.code !== 'Escape' || panel.hidden) return;
    back();
  });

  function act(a: 'wider' | 'narrower' | 'pause' | 'undo' | 'finish'): void {
    if (state !== 'recording') return;
    const R = rv.radius;
    // not an undo step: undo while recording takes back path, not settings
    const setR = (v: number) => vars.change([{ layer: 'user', path: R.path, before: vars.layerValue('user', R.path), after: v }], false);
    if (a === 'wider') setR(Math.min(R.meta.hardMax ?? 1000, R.value + rv.radiusStep.value));
    else if (a === 'narrower') setR(Math.max(R.meta.hardMin ?? 3, R.value - rv.radiusStep.value));
    else if (a === 'pause') rec.paused = !rec.paused;
    else if (a === 'undo') {
      if (rec.undo(rv.undo.value)) host.scene.truncate(rec.samples.length);
      say(`Took back ${km(rv.undo.value)}`);
    } else if (a === 'finish') return finish();
    drawHud();
  }

  return {
    /** J: start recording, or finish it */
    recordKey(): void {
      if (state === 'idle') start();
      else if (state === 'recording') finish();
    },
    start,
    act,
    /** sim stops while the finish and review panels are up */
    get frozen(): boolean {
      return state === 'finishing' || state === 'review';
    },
    get state(): State {
      return state;
    },
    get source(): RecordSource {
      return source;
    },
    /** Once per frame, after the sim steps. */
    frame(): void {
      if (state === 'recording') {
        const s = source === 'camera' && host.camera ? host.camera() : host.ship();
        up.set(0, 1, 0).applyQuaternion(s.quat);
        if (rec.push(s.pos, up, rv.radius.value)) {
          host.scene.append(s.pos, rv.radius.value);
          const c = canClose(rec.samples, rv.radius.value, rv.closeNear.value);
          if (c !== closable) host.scene.closable((closable = c));
        }
        if (rec.full) {
          say('Recording is full');
          finish();
        }
        // redraw the HUD only when what it shows changed
        const key = `${Math.round(rec.length)}|${rec.paused}|${closable}|${rv.radius.value}|${performance.now() < noticeUntil}`;
        if (key !== hudKey) {
          hudKey = key;
          drawHud();
        }
      }
      // failing stretches stay marked while the recorded track is flown
      const want = markedText && trackText.value.trim() === markedText ? markedText : '';
      if (!want && markedText) {
        markedText = '';
        markedProblems = [];
        host.scene.mark(null, []);
      } else if (want && host.scene.marked !== markedProblems.length && result === null) {
        host.scene.mark(host.track(), markedProblems);
      }
    },
  };
}
