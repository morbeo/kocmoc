import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { vars } from '../core/vars';
import { isTyping } from '../core/dom';
import { keyLabel } from '../input/bindings';
import { canvasInput, invert, sampleInput } from '../input/input';
import { touchUi } from '../input/touch';
import { noControls } from '../sim/ship';
import { compileBase, deletePoints, docSections, removeSection, sectionOver, sectionSpan, setSection, updateSection, EditHistory, flyStep, insertPoint, movePoints, radiusPoints, rollPoints, sampleSegment, smoothPoints, turnView, type TurnAxis, type Vec3 } from '../gen/edit';
import { trackProblems, type Problem } from '../gen/record';
import { parseTrackText, serializeTrackDoc, type TrackDoc } from '../gen/trackDoc';
import { radiusAt, type Track } from '../gen/track';
import { SECTION_KINDS, type SectionKind } from '../gen/sections';
import { gameMode, trackDoc, trackText } from '../world/race';
import { bakeCurrent, loadTrackDoc } from '../world/trackFile';
import { saveTrack } from '../world/library';
import { createEditScene, type Pick } from '../world/editScene';
import { EDIT_CAMS, helpText, orbitLimits, panelHtml, VIEW_STEP_OPTIONS, type EditCam } from './editorPanel';
import './editor.css';

const tags = ['edit'];
const ev = {
  cam: vars.enum<EditCam>('edit.cam', 'orbit', EDIT_CAMS, { tags, desc: 'editor camera: orbit around a point, fly (6DOF, no physics), top or side (flat, no perspective); V cycles' }),
  view: vars.enum('edit.view', 'ghost', ['ghost', 'solid'], { tags, desc: 'ghost: a see-through tube, red where it fails the checks; solid: the track as raced' }),
  flySpeed: vars.num('edit.fly.speed', 150, { min: 5, max: 2000, hardMin: 0.5, hardMax: 20000, unit: 'm/s', tags, desc: 'fly cam speed (the wheel changes it while flying)' }),
  flyBoost: vars.num('edit.fly.boost', 4, { min: 1, max: 20, hardMin: 1, tags, desc: 'fly cam speed while boosting' }),
  flyTurn: vars.num('edit.fly.turn', 1.4, { min: 0.1, max: 6, hardMin: 0.01, unit: 'rad/s', tags, desc: 'fly cam turn rate' }),
  look: vars.num('edit.look', 0.003, { min: 0.0005, max: 0.02, hardMin: 0, unit: 'rad/px', tags, desc: 'mouse look while the right button is held (fly cam)' }),
  rollStep: vars.num('edit.rollStep', 5, { min: 0.5, max: 45, hardMin: 0.01, unit: '°', tags, desc: 'roll added per key press' }),
  viewStep: vars.enum('edit.viewStep', '45', VIEW_STEP_OPTIONS, { tags, desc: 'degrees the view turns per press of the turn keys or buttons' }),
  radiusStep: vars.num('edit.radiusStep', 5, { min: 0.5, max: 50, hardMin: 0.1, unit: 'm', tags, desc: 'tube radius change per key press' }),
};

/** The game's field of view, for the orbit and fly cams. */
const normalFov = () => (vars.get('cam.fov')?.value as number | undefined) ?? 70;

type Key = { value: string };
export interface EditorKeys {
  edit: Key;
  focus: Key;
  frame: Key;
  insert: Key;
  remove: Key;
  rollLeft: Key;
  rollRight: Key;
  smooth: Key;
  camera: Key;
  record: Key;
  wider: Key;
  narrower: Key;
  center: Key;
  yawLeft: Key;
  yawRight: Key;
  pitchUp: Key;
  pitchDown: Key;
  viewRollLeft: Key;
  viewRollRight: Key;
  step: Key;
}
export interface EditorHost {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  canvas: HTMLCanvasElement;
  keys: EditorKeys;
  /** start the ship over (the editor closed, or the track changed) */
  respawn(): void;
  /** start recording a track from the fly cam */
  record(): void;
  /** the main view's size, CSS px */
  view(): { w: number; h: number };
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const deg = (r: number) => (r * 180) / Math.PI;
const rad = (d: number) => (d * Math.PI) / 180;
const PATH = 'gen.race.track';

/**
 * The track editor (M8d, desktop only). Opens on the track flown now (a generated venue is baked
 * into a track file first), with the sim stopped and the ship hidden. Orbit, fly, top and side
 * cameras; click points to select them, drag the arrows to move them; insert, delete, roll, radius
 * and smooth; its own undo; the generator's checks shown live, red in 3D and listed. Every edit is
 * written to `gen.race.track`, so closing the editor races the edited track.
 */
export function createEditor(host: EditorHost) {
  const { camera, canvas } = host;
  const keyOf = (k: Key) => keyLabel(k.value.split(',')[0]?.trim() ?? '');
  const overlay = createEditScene(host.scene);
  const panel = document.createElement('div');
  panel.id = 'edit-panel';
  panel.hidden = true;
  const help = document.createElement('div');
  help.id = 'edit-help';
  help.hidden = true;
  document.body.append(panel, help);

  const orbit = new OrbitControls(camera, canvas);
  orbit.enabled = false;
  orbit.enableDamping = false;
  orbit.zoomToCursor = true;
  orbit.screenSpacePanning = true;
  const gizmo = new TransformControls(camera, canvas);
  gizmo.enabled = false;
  gizmo.setSpace('world');
  const gizmoHelper = gizmo.getHelper();
  gizmoHelper.visible = false;
  host.scene.add(gizmoHelper);
  const pivot = new THREE.Object3D();
  host.scene.add(pivot);

  let active = false;
  let doc: TrackDoc | null = null;
  let base: Track | null = null;
  let problems: Problem[] = [];
  let history = new EditHistory('');
  let original = '';
  let layer: 'scenario' | 'user' = 'scenario';
  let selection = new Set<number>();
  /** a doc shown while dragging, compiled on the next frame */
  let pending: TrackDoc | null = null;
  let drag: { start: THREE.Vector3; from: Map<number, Vec3>; base: TrackDoc; doc: TrackDoc | null } | null = null;
  let gizmoGrabbed = false;
  /** flat views: half the view's height, m */
  let flatHalf = 500;
  /** the view was turned by steps: top and side no longer hold their angle */
  let turned = false;
  let extent = 1000;
  const centre = new THREE.Vector3();
  let notice = '';
  let saved = { near: camera.near, far: camera.far };
  const controls = noControls();
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const v = new THREE.Vector3();
  const fwd = new THREE.Vector3();
  const bg = new THREE.Color();

  // --- the doc -----------------------------------------------------------------

  function write(text: string): void {
    vars.change([{ layer, path: PATH, before: vars.layerValue(layer, PATH), after: text }], false);
  }

  /** Show `d`: overlay, checks, panel. */
  function show(d: TrackDoc, check = true): void {
    doc = d;
    base = compileBase(d);
    if (check) problems = trackProblems(base);
    for (const i of selection) if (i >= d.points.length) selection.delete(i);
    overlay.set(d, base, check ? problems : [], selection);
    const b = new THREE.Box3().setFromPoints(base.pos);
    extent = Math.max(100, b.getBoundingSphere(new THREE.Sphere()).radius);
    placeGizmo();
    draw();
  }

  /** An edit: the new doc becomes the track (one undo step per `key` burst). */
  function commit(next: TrackDoc | undefined, key = '', say?: string): boolean {
    if (!next) {
      if (say) tell(say);
      return false;
    }
    const text = serializeTrackDoc(next);
    history.push(text, key);
    write(text);
    show(next);
    return true;
  }

  function restore(text: string | undefined): void {
    const d = text && parseTrackText(text);
    if (!d) return;
    write(text);
    show(d);
  }

  function tell(text: string): void {
    notice = text;
    draw();
    setTimeout(() => {
      if (notice === text) {
        notice = '';
        draw();
      }
    }, 2500);
  }

  // --- selection and gizmo ---------------------------------------------------------

  const selected = () => [...selection].sort((a, b) => a - b);

  function placeGizmo(): void {
    if (!doc || !selection.size || !active) {
      gizmo.detach();
      gizmoHelper.visible = false;
      return;
    }
    if (drag) return;
    v.set(0, 0, 0);
    for (const i of selection) v.add(fwd.fromArray(doc.points[i].p));
    pivot.position.copy(v.divideScalar(selection.size));
    pivot.updateMatrixWorld();
    if (gizmo.object !== pivot) gizmo.attach(pivot);
    gizmoHelper.visible = true;
  }

  function select(next: Set<number>): void {
    selection = next;
    overlay.select(selection);
    placeGizmo();
    draw();
  }

  gizmo.addEventListener('mouseDown', () => {
    gizmoGrabbed = true;
    if (!doc) return;
    drag = { start: pivot.position.clone(), from: new Map(selected().map((i) => [i, [...doc!.points[i].p] as Vec3])), base: doc, doc: null };
  });
  gizmo.addEventListener('dragging-changed', (e) => {
    orbit.enabled = active && !(e as unknown as { value: boolean }).value && ev.cam.value !== 'fly';
  });
  gizmo.addEventListener('objectChange', () => {
    if (!drag || !doc) return;
    const d = v.subVectors(pivot.position, drag.start);
    const moves = new Map<number, Vec3>();
    for (const [i, p] of drag.from) moves.set(i, [p[0] + d.x, p[1] + d.y, p[2] + d.z]);
    // the latest drag preview; committed on release
    pending = drag.doc = movePoints(drag.base, moves) ?? null;
  });
  gizmo.addEventListener('mouseUp', () => {
    const d = drag?.doc;
    pending = null;
    drag = null;
    if (d) commit(d);
    else placeGizmo();
  });

  // --- picking -----------------------------------------------------------------------

  /** World size of one CSS pixel at distance `d` from the camera. */
  const pixel = (d: number) => (2 * d * Math.tan(rad(camera.fov) / 2)) / Math.max(1, host.view().h);

  function pickAt(e: PointerEvent | MouseEvent): Pick | null {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    camera.updateMatrixWorld();
    ray.setFromCamera(ndc, camera);
    const d = ev.cam.value === 'fly' ? 300 : camera.position.distanceTo(orbit.target);
    return overlay.pick(ray, pixel(d) * 8);
  }

  let down: { x: number; y: number; button: number } | null = null;
  let looking = false;
  canvas.addEventListener('pointerdown', (e) => {
    if (!active) return;
    down = { x: e.clientX, y: e.clientY, button: e.button };
    if (e.button === 2 && ev.cam.value === 'fly') {
      looking = true;
      canvas.setPointerCapture(e.pointerId);
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!active || !looking) return;
    const k = ev.look.value;
    const pitch = (invert.pointer.value ? 1 : -1) * e.movementY * k;
    camera.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(v.set(0, 1, 0), -e.movementX * k));
    camera.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(v.set(1, 0, 0), pitch)).normalize();
  });
  canvas.addEventListener('pointerup', (e) => {
    if (!active) return;
    looking = false;
    const d = down;
    down = null;
    const grabbed = gizmoGrabbed;
    gizmoGrabbed = false;
    if (!d || d.button !== 0 || grabbed || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5) return;
    const hit = pickAt(e);
    const add = e.shiftKey || e.ctrlKey || e.metaKey;
    if (hit?.kind === 'point') {
      const next = new Set(add ? selection : []);
      if (add && next.has(hit.index)) next.delete(hit.index);
      else next.add(hit.index);
      select(next);
    } else if (!add) select(new Set());
  });
  canvas.addEventListener('dblclick', (e) => {
    if (!active || !doc || !base) return;
    const hit = pickAt(e);
    if (hit?.kind !== 'line') return;
    const [seg, t] = sampleSegment(doc, base, hit.sample);
    const r = insertPoint(doc, seg, t);
    if (r && commit(r.doc)) select(new Set([r.index]));
  });
  canvas.addEventListener(
    'wheel',
    (e) => {
      if (!active) return;
      const cam = ev.cam.value;
      if (cam === 'fly') {
        const s = ev.flySpeed;
        const next = Math.min(s.meta.hardMax ?? 20000, Math.max(s.meta.hardMin ?? 0.5, s.value * Math.exp(-e.deltaY * 0.002)));
        vars.change([{ layer: 'user', path: s.path, before: vars.layerValue('user', s.path), after: Math.round(next * 10) / 10 }], false);
        tell(`Fly speed ${s.value.toFixed(0)} m/s`);
      } else if (cam === 'top' || cam === 'side') {
        flatHalf = Math.min(extent * 4, Math.max(10, flatHalf * Math.exp(e.deltaY * 0.0015)));
      }
    },
    { passive: true },
  );

  // --- cameras -------------------------------------------------------------------------

  /** Distance a flat view sits back: far enough that the track has no perspective to speak of. */
  const flatDistance = () => Math.max(4000, extent * 24);

  function setCam(next: EditCam): void {
    const was = ev.cam.value;
    camera.getWorldDirection(fwd);
    let dist = camera.position.distanceTo(orbit.target);
    if (was === 'fly') {
      dist = Math.max(80, Math.min(extent, 300));
      orbit.target.copy(camera.position).addScaledVector(fwd, dist);
    } else if (was === 'top' || was === 'side') dist = flatHalf / Math.tan(rad(normalFov()) / 2);
    if (next !== was) setCamVar(next);
    if (next === 'top' || next === 'side') {
      if (was !== 'top' && was !== 'side') flatHalf = Math.max(20, dist * Math.tan(rad(camera.fov) / 2));
      const D = flatDistance();
      if (next === 'top') camera.position.copy(orbit.target).add(v.set(0, D, D * 1e-4));
      else {
        // side on, from where the camera was looking (level)
        fwd.y = 0;
        if (fwd.lengthSq() < 1e-6) fwd.set(0, 0, -1);
        camera.position.copy(orbit.target).addScaledVector(fwd.normalize(), -D);
      }
    } else if (next !== was && (was === 'top' || was === 'side')) {
      // back from far away to the same view up close
      camera.position.copy(orbit.target).addScaledVector(fwd, -dist);
    }
    camera.up.set(0, 1, 0);
    turned = false;
    syncOrbitUp();
    if (next !== 'fly') camera.lookAt(orbit.target);
    configure();
    draw();
  }

  function setCamVar(c: EditCam): void {
    vars.change([{ layer: 'user', path: ev.cam.path, before: vars.layerValue('user', ev.cam.path), after: c === 'orbit' ? undefined : c }], false);
  }

  /** OrbitControls orbits about `camera.up` as it was when made: tell it the up changed. */
  function syncOrbitUp(): void {
    const o = orbit as unknown as { _quat: THREE.Quaternion; _quatInverse: THREE.Quaternion };
    o._quat.setFromUnitVectors(camera.up, v.set(0, 1, 0));
    o._quatInverse.copy(o._quat).invert();
  }

  /**
   * Turn the view a step about one of its own axes, round the point it orbits (the fly cam turns in
   * place). Orbiting then goes round the view's new up, and top and side stop holding their angle.
   */
  function turn(axis: TurnAxis, sign: number): void {
    const cam = ev.cam.value;
    const pivot = cam === 'fly' ? camera.position.clone() : orbit.target;
    turnView(camera.position, camera.quaternion, pivot, axis, sign * rad(Number(ev.viewStep.value)));
    if (cam !== 'fly') {
      camera.up.set(0, 1, 0).applyQuaternion(camera.quaternion);
      syncOrbitUp();
      turned = true;
      configure();
    }
  }

  /** Put the selection's middle (or the whole track's) in the middle of the view, without zooming. */
  function center(): void {
    if (!doc || !base) return;
    const p = new THREE.Vector3();
    if (selection.size) {
      for (const i of selection) p.add(v.fromArray(doc.points[i].p));
      p.divideScalar(selection.size);
    } else p.copy(new THREE.Box3().setFromPoints(base.pos).getCenter(v));
    if (ev.cam.value === 'fly') {
      // face it, keeping the roll
      camera.up.set(0, 1, 0).applyQuaternion(camera.quaternion);
      camera.lookAt(p);
      camera.up.set(0, 1, 0);
      return;
    }
    camera.position.add(v.subVectors(p, orbit.target));
    orbit.target.copy(p);
    orbit.update();
  }

  function configure(): void {
    const cam = ev.cam.value;
    orbit.enabled = active && cam !== 'fly' && !gizmo.dragging;
    const l = orbitLimits(cam, turned, extent);
    orbit.enableZoom = l.zoom;
    orbit.enableRotate = true;
    orbit.minPolarAngle = l.minPolar;
    orbit.maxPolarAngle = l.maxPolar;
    orbit.minDistance = l.minDistance;
    orbit.maxDistance = l.maxDistance;
    const [left, right] = l.leftDrag === 'rotate' ? [THREE.MOUSE.ROTATE, THREE.MOUSE.PAN] : [THREE.MOUSE.PAN, THREE.MOUSE.ROTATE];
    orbit.mouseButtons = { LEFT: left, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: right };
  }

  /** Look at a point, `size` m across, from where the camera is looking now. */
  function lookAt(p: THREE.Vector3, size: number): void {
    const cam = ev.cam.value;
    camera.getWorldDirection(fwd);
    const dist = Math.max(20, size / Math.tan(rad(normalFov()) / 2));
    if (cam === 'fly') {
      camera.position.copy(p).addScaledVector(fwd, -dist);
      return;
    }
    orbit.target.copy(p);
    if (cam === 'orbit') camera.position.copy(p).addScaledVector(fwd, -dist);
    else {
      flatHalf = Math.max(20, size * 1.2);
      camera.position.copy(p).addScaledVector(fwd, -flatDistance());
    }
    orbit.update();
  }

  function focus(): void {
    if (!doc || !base) return;
    if (!selection.size) return frameAll();
    const box = new THREE.Box3();
    for (const i of selection) box.expandByPoint(v.fromArray(doc.points[i].p));
    const r = Math.max(...selected().map((i) => doc!.points[i].r ?? doc!.radius));
    lookAt(box.getCenter(new THREE.Vector3()), Math.max(r * 4, box.getSize(v).length() * 0.6));
  }

  function frameAll(): void {
    if (!base) return;
    const sphere = new THREE.Box3().setFromPoints(base.pos).getBoundingSphere(new THREE.Sphere());
    centre.copy(sphere.center);
    lookAt(sphere.center, sphere.radius * 1.1);
  }

  /** Look at the stretch of track from `s0` to `s1`. */
  function focusStretch(s0: number, s1: number): void {
    if (!base) return;
    const i = Math.min(base.pos.length - 1, Math.round(((s0 + s1) / 2 / base.length) * base.pos.length));
    lookAt(base.pos[i], Math.max(radiusAt(base, i) * 5, (s1 - s0) * 0.7));
  }

  function focusProblem(p: Problem): void {
    if (!base) return;
    const i = Math.round((p.i0 + p.i1) / 2);
    lookAt(base.pos[i], Math.max(radiusAt(base, i) * 5, (p.s1 - p.s0) * 0.7));
  }

  // --- the panel -------------------------------------------------------------------------

  function draw(): void {
    if (!active || !doc || !base) return;
    const sel = selected();
    const span = sel.length ? sectionSpan(doc, sel[0], sel[sel.length - 1]) : null;
    const over = span ? sectionOver(doc, span[0], span[1]) : -1;
    const view = {
      doc,
      length: base.length,
      selection: sel,
      problems,
      cam: ev.cam.value,
      view: ev.view.value,
      canUndo: history.canUndo,
      canRedo: history.canRedo,
      changed: history.current !== original,
      notice,
      step: ev.viewStep.value,
      sections: docSections(doc, base),
      shape: over >= 0 ? doc.sections![over].kind : '',
      span: span && ([span[0] + 1, span[1] + 1] as [number, number]),
    };
    const keys = Object.fromEntries(Object.entries(host.keys).map(([n, k]) => [n, keyOf(k)])) as Record<keyof EditorKeys, string>;
    panel.innerHTML = panelHtml(view, keys);
    help.innerHTML = helpText(view.cam);
  }

  panel.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    const b = el.closest<HTMLElement>('button');
    if (!b) return;
    b.blur();
    if (b.dataset.cam) return setCam(b.dataset.cam as EditCam);
    if (b.dataset.step) {
      vars.change([{ layer: 'user', path: ev.viewStep.path, before: vars.layerValue('user', ev.viewStep.path), after: b.dataset.step === '45' ? undefined : b.dataset.step }], false);
      return draw();
    }
    if (b.dataset.view) {
      vars.change([{ layer: 'user', path: ev.view.path, before: vars.layerValue('user', ev.view.path), after: b.dataset.view }], false);
      return draw();
    }
    if (b.dataset.problem) return focusProblem(problems[Number(b.dataset.problem)]);
    if (b.dataset.secRm && doc) return void commit(removeSection(doc, Number(b.dataset.secRm)));
    if (b.dataset.secGo && doc && base) {
      const sec = docSections(doc, base)[Number(b.dataset.secGo)];
      if (sec) focusStretch(sec.s0, sec.s1);
      return;
    }
    act(b.dataset.a as Action);
  });
  panel.addEventListener('change', (e) => {
    const el = e.target as HTMLInputElement;
    if (!doc) return;
    const sel = selected();
    const x = Number(el.value);
    if (el.dataset.f === 'title') {
      const title = el.value.trim().slice(0, 80);
      const next = { ...doc };
      if (title) next.title = title;
      else delete next.title;
      commit(next, 'title');
    } else if (el.dataset.f === 'roll' && Number.isFinite(x) && sel.length) {
      const next = structuredClone(doc);
      for (const i of sel) next.points[i].roll = rad(x);
      commit(parseTrackText(JSON.stringify(next)));
    } else if (el.dataset.f === 'radius' && Number.isFinite(x) && sel.length) commit(radiusPoints(doc, sel, x, true));
    else if (el.dataset.f === 'shape' && sel.length) {
      const kind = (SECTION_KINDS as readonly string[]).includes(el.value) ? (el.value as SectionKind) : null;
      commit(setSection(doc, sel[0], sel[sel.length - 1], kind));
    } else if (el.dataset.secKind) commit(updateSection(doc, Number(el.dataset.secKind), { kind: el.value as SectionKind }));
    else if (el.dataset.secRoll && Number.isFinite(x)) commit(updateSection(doc, Number(el.dataset.secRoll), { roll: rad(x) }));
    else if (el.dataset.secRamp && Number.isFinite(x)) commit(updateSection(doc, Number(el.dataset.secRamp), { ramp: x }));
  });

  // --- actions -----------------------------------------------------------------------------

  type Action = 'close' | 'insert' | 'delete' | 'smooth' | 'focus' | 'frame' | 'undo' | 'redo' | 'revert' | 'save' | 'download' | 'record' | 'rollLeft' | 'rollRight' | 'wider' | 'narrower' | 'camera' | 'all' | 'none' | 'center' | 'step' | 'yawLeft' | 'yawRight' | 'pitchUp' | 'pitchDown' | 'viewRollLeft' | 'viewRollRight';

  function act(a: Action): void {
    // not while a recording from the fly cam has the screen
    if (!active || !doc || panel.hidden) return;
    const sel = selected();
    switch (a) {
      case 'close':
        return close();
      case 'insert': {
        if (sel.length !== 1) return tell('Select one point to insert after it');
        const n = doc.points.length;
        const seg = !doc.closed && sel[0] === n - 1 ? n - 2 : sel[0];
        const r = insertPoint(doc, seg);
        if (r && commit(r.doc)) select(new Set([r.index]));
        return;
      }
      case 'delete':
        if (!sel.length) return;
        if (commit(deletePoints(doc, sel), '', `A ${doc.closed ? 'loop' : 'run'} needs at least ${doc.closed ? 4 : 2} points`)) select(new Set());
        return;
      case 'smooth':
        if (sel.length) commit(smoothPoints(doc, sel), 'smooth');
        return;
      case 'rollLeft':
      case 'rollRight':
        if (sel.length) commit(rollPoints(doc, sel, rad(ev.rollStep.value) * (a === 'rollLeft' ? -1 : 1)), a);
        return;
      case 'wider':
      case 'narrower':
        if (sel.length) commit(radiusPoints(doc, sel, ev.radiusStep.value * (a === 'narrower' ? -1 : 1)), a);
        return;
      case 'focus':
        return focus();
      case 'frame':
        return frameAll();
      case 'undo':
        return restore(history.undo());
      case 'redo':
        return restore(history.redo());
      case 'revert':
        if (history.current !== original) {
          history.push(original);
          restore(original);
        }
        return;
      case 'save':
        saveTrack(doc).then(
          () => tell('Saved. It is under My tracks in the track list.'),
          () => tell('Could not save here (storage blocked?). Download the file instead.'),
        );
        return;
      case 'download': {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(doc, null, 1)], { type: 'application/json' }));
        a.download = `${slug(doc.title ?? '') || 'track'}.kocmoc-track.json`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        return;
      }
      case 'record':
        if (ev.cam.value !== 'fly') setCam('fly');
        panel.hidden = help.hidden = true;
        gizmo.detach();
        gizmoHelper.visible = false;
        overlay.show(false);
        return host.record();
      case 'center':
        return center();
      case 'step': {
        const i = VIEW_STEP_OPTIONS.indexOf(ev.viewStep.value as (typeof VIEW_STEP_OPTIONS)[number]);
        const next = VIEW_STEP_OPTIONS[(i + 1) % VIEW_STEP_OPTIONS.length];
        vars.change([{ layer: 'user', path: ev.viewStep.path, before: vars.layerValue('user', ev.viewStep.path), after: next === '45' ? undefined : next }], false);
        tell(`Turns ${next}°`);
        return;
      }
      case 'yawLeft':
      case 'yawRight':
        return turn('yaw', a === 'yawRight' ? 1 : -1);
      case 'pitchUp':
      case 'pitchDown':
        return turn('pitch', a === 'pitchUp' ? 1 : -1);
      case 'viewRollLeft':
      case 'viewRollRight':
        return turn('roll', a === 'viewRollRight' ? 1 : -1);
      case 'camera':
        return setCam(EDIT_CAMS[(EDIT_CAMS.indexOf(ev.cam.value) + 1) % EDIT_CAMS.length]);
      case 'all':
        return select(new Set(doc.points.map((_, i) => i)));
      case 'none':
        return select(new Set());
    }
  }

  // undo, redo, select all: Ctrl/Cmd combos, ahead of the vars undo in the debug panel
  addEventListener(
    'keydown',
    (e) => {
      if (!active || isTyping(e) || panel.hidden) return;
      const mod = e.ctrlKey || e.metaKey;
      let a: Action | null = null;
      if (mod && e.code === 'KeyZ') a = e.shiftKey ? 'redo' : 'undo';
      else if (mod && e.code === 'KeyY') a = 'redo';
      else if (mod && e.code === 'KeyA') a = 'all';
      else if (e.code === 'Escape' && selection.size) a = 'none';
      if (!a) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      act(a);
    },
    { capture: true },
  );

  // --- open / close ----------------------------------------------------------------------------

  function open(start?: TrackDoc): void {
    if (active) {
      if (start) {
        loadTrackDoc(start);
        begin();
      }
      return;
    }
    if (touchUi.value) return; // desktop only: mouse and keyboard
    if (document.pointerLockElement) document.exitPointerLock();
    if (start) loadTrackDoc(start);
    else if (trackDoc.value) {
      if (gameMode.value !== 'race') vars.change([{ layer: 'user', path: 'game.mode', before: vars.layerValue('user', 'game.mode'), after: 'race' }], false);
    } else loadTrackDoc(bakeCurrent());
    active = true;
    canvasInput.on = false;
    saved = { near: camera.near, far: camera.far };
    document.body.classList.add('editing');
    begin();
    gizmo.enabled = true;
    // start on the whole track, seen from above and behind where the camera was looking
    const want = ev.cam.value;
    setCamVar('orbit');
    camera.getWorldDirection(fwd);
    fwd.y = Math.min(fwd.y, -0.6);
    orbit.target.copy(centre);
    camera.position.copy(centre).addScaledVector(fwd.normalize(), -1);
    configure();
    frameAll();
    if (want !== 'orbit') setCam(want);
  }

  /** Start on the track file in use now. */
  function begin(): void {
    const text = trackText.value.trim();
    const d = parseTrackText(text);
    if (!d) return;
    layer = vars.layerValue('user', PATH) !== undefined ? 'user' : 'scenario';
    original = text;
    history = new EditHistory(text);
    selection = new Set();
    panel.hidden = help.hidden = false;
    overlay.show(true);
    show(d);
    const sphere = new THREE.Box3().setFromPoints(base!.pos).getBoundingSphere(new THREE.Sphere());
    centre.copy(sphere.center);
  }

  function close(): void {
    if (!active) return;
    active = false;
    pending = null;
    drag = null;
    looking = false;
    orbit.enabled = false;
    gizmo.enabled = false;
    gizmo.detach();
    gizmoHelper.visible = false;
    overlay.show(false);
    panel.hidden = help.hidden = true;
    canvasInput.on = true;
    camera.near = saved.near;
    camera.far = saved.far;
    camera.up.set(0, 1, 0);
    camera.updateProjectionMatrix();
    host.scene.background = null;
    document.body.classList.remove('editing');
    host.respawn();
  }

  // dev server only: where things are on screen, for the e2e test
  if (import.meta.env.DEV) {
    const screen = (p: THREE.Vector3) => {
      const r = canvas.getBoundingClientRect();
      v.copy(p).project(camera);
      return { x: r.left + ((v.x + 1) / 2) * r.width, y: r.top + ((1 - v.y) / 2) * r.height };
    };
    (window as unknown as { __editor: unknown }).__editor = {
      point: (i: number) => doc?.points[i]?.p ?? null,
      screen: (i: number) => (doc?.points[i] ? screen(new THREE.Vector3(...doc.points[i].p)) : null),
      line: (i: number) => (base?.pos[i] ? screen(base.pos[i]) : null),
      samples: () => base?.pos.length ?? 0,
      /** the camera's line of sight and up, and the point it orbits */
      view: () => ({ fwd: camera.getWorldDirection(new THREE.Vector3()).toArray(), up: new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).toArray(), target: orbit.target.toArray() }),
      /** a spot `px` along the gizmo's arrow for `axis`, and the pivot */
      arrow: (axis: 'x' | 'y' | 'z', px: number) => {
        const c = screen(pivot.position);
        const d = camera.position.distanceTo(pivot.position) * 0.05;
        const e = screen(pivot.position.clone().add(new THREE.Vector3(axis === 'x' ? d : 0, axis === 'y' ? d : 0, axis === 'z' ? d : 0)));
        const len = Math.hypot(e.x - c.x, e.y - c.y) || 1;
        return { from: { x: c.x + ((e.x - c.x) / len) * px, y: c.y + ((e.y - c.y) / len) * px }, dir: { x: (e.x - c.x) / len, y: (e.y - c.y) / len } };
      },
    };
  }

  // keys (registered by the game with onKey, routed here while open)
  const on = (a: Action) => () => act(a);

  return {
    open,
    close,
    toggle(): void {
      if (active) close();
      else open();
    },
    get active(): boolean {
      return active;
    },
    /** The ghost tube is up: hide the solid track. */
    get ghost(): boolean {
      return active && ev.view.value === 'ghost';
    },
    act,
    keys: {
      focus: on('focus'),
      frame: on('frame'),
      insert: on('insert'),
      remove: on('delete'),
      rollLeft: on('rollLeft'),
      rollRight: on('rollRight'),
      smooth: on('smooth'),
      camera: on('camera'),
      center: on('center'),
      step: on('step'),
      yawLeft: on('yawLeft'),
      yawRight: on('yawRight'),
      pitchUp: on('pitchUp'),
      pitchDown: on('pitchDown'),
      viewRollLeft: on('viewRollLeft'),
      viewRollRight: on('viewRollRight'),
    },
    /** A recording from the fly cam ended (or was discarded): show the editor again. */
    resume(): void {
      if (!active) return;
      panel.hidden = help.hidden = false;
      overlay.show(true);
      placeGizmo();
      draw();
    },
    /** The fly cam's pose, to record from. */
    pose(): { pos: THREE.Vector3; quat: THREE.Quaternion } {
      return { pos: camera.position, quat: camera.quaternion };
    },
    /** Once per frame instead of the game camera. `dt` is real frame time. */
    frame(dt: number): void {
      if (!active) return;
      if (pending) {
        show(pending, false);
        pending = null;
      }
      const cam = ev.cam.value;
      const view = host.view();
      if (cam === 'fly') {
        if (!isTypingNow()) {
          sampleInput(controls, dt);
          const t = ev.flyTurn.value;
          flyStep(camera.position, camera.quaternion, controls, { speed: ev.flySpeed.value, boost: ev.flyBoost.value, turn: [t, t, t * 1.5] }, dt);
        }
        setLens(normalFov(), 0.5, Math.max(12000, extent * 6));
        host.scene.background = null;
      } else if (cam === 'orbit') {
        orbit.update();
        const d = camera.position.distanceTo(orbit.target);
        setLens(normalFov(), Math.max(0.1, d / 2000), Math.max(12000, d + extent * 3));
        host.scene.background = null;
      } else {
        const D = flatDistance();
        // keep the camera far back along its view direction; the lens sets the zoom
        camera.getWorldDirection(fwd);
        camera.position.copy(orbit.target).addScaledVector(fwd, -D);
        orbit.update();
        setLens(2 * deg(Math.atan(flatHalf / D)), Math.max(1, D - extent * 3), D + extent * 3);
        // the sky dome is too close to show through a long lens: a flat backdrop instead
        host.scene.background = bg.set((vars.get('render.background')?.value as string) ?? '#05010f');
      }
      overlay.ghost(ev.view.value === 'ghost');
      overlay.frame(camera, view.h);
    },
  };

  function setLens(fov: number, near: number, far: number): void {
    if (camera.fov !== fov || camera.near !== near || camera.far !== far) {
      camera.fov = fov;
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    }
  }

  function isTypingNow(): boolean {
    const a = document.activeElement;
    return !!a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA');
  }
}

export type Editor = ReturnType<typeof createEditor>;
