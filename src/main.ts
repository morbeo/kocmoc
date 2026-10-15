import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars } from './core/vars';
import { initPersistence } from './core/persist';
import { isTyping } from './core/dom';
import { FixedLoop } from './core/loop';
import { newShip, copyShip, lerpShip, stepShip, noControls, type ShipParams } from './sim/ship';
import { attachInput, sampleInput, onKey, assistKey, cameraKey, controlsKey, respawnKey, zoom, debug as inputDebug, pointerMode } from './input/input';
import { keyLabel } from './input/bindings';
import { camMode, cycleCamera, updateCamera } from './cam/rigs';
import { createShipModel } from './render/shipModel';
import { createField } from './world/field';
import { createHud } from './ui/hud';
import { createSky } from './render/sky';
import { createPipeline } from './render/pipeline';
import { detectTouch, touchUi } from './input/touch';
import { createRaceScene, gameMode, genParams, seedVar, track } from './world/race';
import { newRace, spawnOnTrack, stepRace, splitDelta, type RaceState, type WallParams } from './sim/race';
import { scenarios, applyScenario, parseScenario, setSpawnHandler, setSpawnSource } from './core/scenarios';
import './ui/hud.css';

// --- vars ------------------------------------------------------------------
const lightColor = vars.color('render.light.color', '#ffffff', { tags: ['render'] });
const lightIntensity = vars.num('render.light.intensity', 3, { min: 0, max: 10, hardMin: 0, tags: ['render'] });
const lightDir = vars.vec3('render.light.dir', [1, 1.5, 1], { tags: ['render'], desc: 'direction towards the light' });
const ambient = vars.num('render.ambient', 0.25, { min: 0, max: 2, hardMin: 0, tags: ['render'] });
// phones have 3× screens and small GPUs: render touch devices at a lower ratio by default
const coarse = matchMedia('(pointer: coarse)').matches;
const pixelRatio = vars.num('render.pixelRatio', coarse ? 1.5 : 2, { min: 0.5, max: 3, hardMin: 0.25, hardMax: 4, tags: ['render', 'perf'], desc: 'max render resolution per CSS pixel (capped by the screen)' });

const simRate = vars.int('sim.rate', 120, { min: 30, max: 240, hardMin: 10, hardMax: 1000, unit: 'Hz', tags: ['sim'], desc: 'fixed physics steps per second' });
const timeScale = vars.num('time.scale', 1, { min: 0.05, max: 4, hardMin: 0, hardMax: 16, unit: '×', tags: ['sim', 'debug'] });
const paused = vars.bool('time.paused', false, { tags: ['sim', 'debug'] });
const inputViz = vars.bool('debug.inputViz', false, { tags: ['debug', 'input'], desc: 'input visualizer (F3)' });
const vizKey = vars.str('input.key.inputViz', 'F3', { tags: ['input', 'keys'], desc: 'KeyboardEvent.code, comma-separated' });

const feel = ['ship', 'feel'];
const assist = vars.bool('ship.flightAssist', true, { tags: feel, desc: 'on: velocity follows the nose; off: Newtonian drift (F)' });
const p = {
  thrust: vars.num('ship.thrust.forward', 60, { min: 0, max: 300, hardMin: 0, unit: 'm/s²', tags: feel }),
  reverse: vars.num('ship.thrust.reverse', 40, { min: 0, max: 300, hardMin: 0, unit: 'm/s²', tags: feel }),
  strafe: vars.num('ship.thrust.strafe', 35, { min: 0, max: 300, hardMin: 0, unit: 'm/s²', tags: feel }),
  turnRate: vars.vec3('ship.turn.rate', [1.8, 1.4, 3], { tags: feel, unit: 'rad/s', desc: 'pitch, yaw, roll' }),
  turnResponse: vars.num('ship.turn.response', 8, { min: 0.5, max: 40, hardMin: 0.01, unit: '/s', tags: feel, desc: 'how fast turn rate follows input' }),
  maxSpeed: vars.num('ship.speed.max', 120, { min: 10, max: 600, hardMin: 1, unit: 'm/s', tags: feel }),
  overspeedDecay: vars.num('ship.speed.overspeedDecay', 1.5, { min: 0.1, max: 10, hardMin: 0, unit: '/s', tags: feel, desc: 'how fast speed above the cap bleeds off' }),
  boostThrust: vars.num('ship.boost.thrust', 160, { min: 0, max: 600, hardMin: 0, unit: 'm/s²', tags: feel }),
  boostSpeed: vars.num('ship.boost.speed', 240, { min: 10, max: 1200, hardMin: 1, unit: 'm/s', tags: feel }),
  boostDrain: vars.num('ship.boost.drain', 0.35, { min: 0, max: 2, hardMin: 0, unit: '/s', tags: feel, desc: 'energy used per second (1 = full tank)' }),
  boostRegen: vars.num('ship.boost.regen', 0.15, { min: 0, max: 2, hardMin: 0, unit: '/s', tags: feel }),
  assistDamp: vars.num('ship.assist.damp', 2.5, { min: 0.1, max: 20, hardMin: 0, unit: '/s', tags: feel, desc: 'how fast flight assist kills drift' }),
};
const params = (): ShipParams => ({
  thrust: p.thrust.value,
  reverse: p.reverse.value,
  strafe: p.strafe.value,
  turnRate: p.turnRate.value,
  turnResponse: p.turnResponse.value,
  maxSpeed: p.maxSpeed.value,
  overspeedDecay: p.overspeedDecay.value,
  boostThrust: p.boostThrust.value,
  boostSpeed: p.boostSpeed.value,
  boostDrain: p.boostDrain.value,
  boostRegen: p.boostRegen.value,
  assist: assist.value,
  assistDamp: p.assistDamp.value,
});

const rtags = ['race', 'feel'];
const shipRadius = vars.num('ship.radius', 1.5, { min: 0.2, max: 6, hardMin: 0.05, unit: 'm', tags: ['ship', 'race'], desc: 'collision sphere' });
const wallBounce = vars.num('race.wall.bounce', 0.3, { min: 0, max: 1, hardMin: 0, hardMax: 2, tags: rtags, desc: 'share of into-wall speed bounced back' });
const wallScrape = vars.num('race.wall.scrape', 0.8, { min: 0, max: 10, hardMin: 0, unit: '/s', tags: rtags, desc: 'speed lost while touching the wall' });
const spawnT = vars.num('race.spawn.t', 0, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: ['race'], desc: 'spawn position as a fraction of the lap (0 = just behind the start line)' });
const spawnSpeed = vars.num('race.spawn.speed', 0, { min: 0, max: 400, hardMin: 0, unit: 'm/s', tags: ['race'] });
const gizmoNames = ['velocity', 'accel', 'collision', 'frames', 'checkpoints', 'nearest'] as const;
const gizmos = gizmoNames.map((n) => vars.bool(`debug.gizmo.${n}`, false, { tags: ['debug', 'gizmo'] }));

// restore saved/shared tuning only after every var above has registered
initPersistence(vars);

// ?seed=N wins over the saved seed; it's written to the user layer (not undoable) so the two agree
const urlParams = new URLSearchParams(location.search);
const urlSeed = Number(urlParams.get('seed'));
if (urlParams.has('seed') && Number.isFinite(urlSeed)) {
  vars.change([{ layer: 'user', path: 'gen.race.seed', before: vars.layerValue('user', 'gen.race.seed'), after: Math.round(urlSeed) }], false);
}

// --- scene -----------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.appendChild(renderer.domElement);

renderer.info.autoReset = false; // several passes per frame: count them all
const pipeline = createPipeline(renderer);

const scene = new THREE.Scene();
const sky = createSky(scene);
const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 5000);
const sun = new THREE.DirectionalLight();
const amb = new THREE.AmbientLight(0x8899ff);
scene.add(sun, amb);

const shipModel = createShipModel();
scene.add(shipModel.object);
const field = createField(scene);
const raceScene = createRaceScene(scene);
const hud = createHud();

function resize(): void {
  renderer.setPixelRatio(Math.min(devicePixelRatio, pixelRatio.value));
  renderer.setSize(innerWidth, innerHeight);
  pipeline.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
screen.orientation?.addEventListener('change', resize);
effect(resize); // also re-runs when render.pixelRatio changes

// --- sim -------------------------------------------------------------------
const prev = newShip();
const curr = newShip();
const view = newShip();
const controls = noControls();
const loop = new FixedLoop(1 / simRate.value);
effect(() => void (loop.step = 1 / simRate.value));

// --- race ------------------------------------------------------------------
let race: RaceState | null = null;
const walls = (): WallParams => ({ shipRadius: shipRadius.value, bounce: wallBounce.value, scrape: wallScrape.value });
const bestKey = () => `kocmoc.best.${JSON.stringify(genParams.value)}`;
let savedBest: number | null = null;

/** Put the ship at a spawn point (fraction of the lap in race mode; origin in free mode). */
function respawn(t = spawnT.value, speed = spawnSpeed.value): void {
  if (gameMode.value === 'race') {
    const tr = track.value;
    // t = 0 spawns a little behind the line so crossing it starts the clock
    spawnOnTrack(curr, tr, t === 0 ? -Math.min(30, tr.length * 0.05) : t * tr.length, speed);
    race = newRace(tr, curr);
    try {
      const best = JSON.parse(localStorage.getItem(bestKey()) ?? 'null');
      if (best && typeof best.lap === 'number' && Array.isArray(best.splits)) {
        race.bestLap = best.lap;
        race.bestSplits = best.splits;
      }
    } catch {
      /* ignore a corrupt record */
    }
    savedBest = race.bestLap;
  } else {
    curr.pos.set(0, 0, 0);
    curr.quat.identity();
    curr.vel.set(0, 0, -speed);
    curr.angVel.set(0, 0, 0);
    curr.energy = 1;
    race = null;
  }
  copyShip(prev, curr);
}
// new track or mode → start over
effect(() => {
  void track.value;
  void gameMode.value;
  respawn();
});
// keep ?seed= in the address bar in race mode, so the URL names the track
effect(() => {
  const url = new URL(location.href);
  if (gameMode.value === 'race') url.searchParams.set('seed', String(seedVar.value));
  else url.searchParams.delete('seed');
  history.replaceState(null, '', url.pathname + url.search + url.hash);
});

setSpawnHandler(({ trackT, speed }) => respawn(trackT, speed));
setSpawnSource(() => ({
  trackT: race ? (race.near.s / track.value.length) : 0,
  speed: curr.vel.length(),
}));
const urlScenario = urlParams.get('scenario');
if (urlScenario) {
  const sc = scenarios.find((x) => x.name === urlScenario);
  if (sc) applyScenario(vars, sc);
  else console.warn(`kocmoc: no scenario named ${urlScenario}`);
}
// drop a scenario JSON on the page to load it
addEventListener('dragover', (e) => e.preventDefault());
addEventListener('drop', async (e) => {
  e.preventDefault();
  const file = e.dataTransfer?.files[0];
  if (!file) return;
  try {
    const sc = parseScenario(JSON.parse(await file.text()));
    if (sc) applyScenario(vars, sc);
    else console.warn('kocmoc: dropped file is not a scenario');
  } catch {
    console.warn('kocmoc: dropped file is not valid JSON');
  }
});

attachInput(renderer.domElement);
onKey(respawnKey, () => respawn());
onKey(assistKey, () => assist.set(!assist.value));
onKey(cameraKey, cycleCamera);
onKey(vizKey, () => inputViz.set(!inputViz.value));

// controls panel (rebinding, invert pitch), lazy-loaded
let controlsUi: Promise<typeof import('./ui/controls')> | undefined;
const toggleControls = () => void (controlsUi ??= import('./ui/controls')).then((m) => m.toggle());
onKey(controlsKey, toggleControls);
const controlsBtn = document.createElement('button');
controlsBtn.id = 'controls-btn';
controlsBtn.addEventListener('click', () => {
  controlsBtn.blur(); // keep Space from re-clicking it
  toggleControls();
});
document.body.appendChild(controlsBtn);
effect(() => {
  const codes = controlsKey.value.split(',').filter(Boolean);
  controlsBtn.textContent = codes.length ? `Controls (${keyLabel(codes[0].trim())})` : 'Controls';
});

// on-screen sticks and buttons on touch screens, lazy-loaded
detectTouch();
let touchMod: Promise<typeof import('./ui/touch')> | undefined;
effect(() => {
  const on = touchUi.value;
  if (!on && !touchMod) return;
  void (touchMod ??= import('./ui/touch')).then((m) => {
    m.mount({
      respawn: () => respawn(),
      camera: cycleCamera,
      assist: () => assist.set(!assist.value),
      debug: () => void openDebug(),
    });
    m.show(on);
  });
});

let gizmoUi: ReturnType<typeof import('./debug/gizmos').createGizmos> | undefined;
let gizmoLoading = false;
effect(() => {
  if (gizmoLoading || !gizmos.some((g) => g.value)) return;
  gizmoLoading = true;
  void import('./debug/gizmos').then((m) => {
    gizmoUi = m.createGizmos({
      scene,
      ship: () => view,
      prevShip: () => prev,
      step: () => loop.step,
      track: () => (gameMode.value === 'race' ? track.value : null),
      near: () => race?.near ?? null,
      shipRadius: () => shipRadius.value,
    });
  });
});

let viz: Promise<typeof import('./debug/inputViz')> | undefined;
effect(() => {
  const on = inputViz.value;
  if (on || viz) void (viz ??= import('./debug/inputViz')).then((m) => m.show(on));
});

// --- watches ---------------------------------------------------------------
let fps = 0;
let frameMs = 0;
vars.watch('perf.fps', () => Math.round(fps), { tags: ['perf'] });
vars.watch('perf.frameMs', () => frameMs.toFixed(2), { tags: ['perf'], unit: 'ms' });
vars.watch('perf.drawCalls', () => renderer.info.render.calls, { tags: ['perf'] });
vars.watch('perf.triangles', () => renderer.info.render.triangles, { tags: ['perf'] });
vars.watch('sim.ticks', () => loop.ticks, { tags: ['sim'] });
vars.watch('ship.speed', () => curr.vel.length().toFixed(1), { tags: ['ship'], unit: 'm/s' });
vars.watch('ship.energy', () => curr.energy.toFixed(2), { tags: ['ship'] });
vars.watch('ship.pos', () => curr.pos.toArray().map((v) => v.toFixed(0)).join(', '), { tags: ['ship'] });
vars.watch('race.track.length', () => track.value.length.toFixed(0), { tags: ['race'], unit: 'm' });
vars.watch('race.track.attempts', () => track.value.attempts, { tags: ['race'], desc: 'layouts tried before one passed the checks' });
vars.watch('race.progress', () => (race ? (race.near.s / track.value.length).toFixed(3) : '–'), { tags: ['race'] });
vars.watch('race.wallDist', () => (race ? (track.value.radius - race.near.dist).toFixed(1) : '–'), { tags: ['race'], unit: 'm', desc: 'distance to the wall' });
vars.watch('race.wallHits', () => race?.wallHits ?? 0, { tags: ['race'] });

// --- frame -----------------------------------------------------------------
let last = performance.now();
renderer.setAnimationLoop((now) => {
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  fps += (1 / Math.max(dt, 1e-4) - fps) * 0.05;
  const t0 = performance.now();

  const ship = params();
  const wallParams = walls();
  const alpha = loop.advance(paused.value ? 0 : dt * timeScale.value, (step) => {
    copyShip(prev, curr);
    stepShip(curr, sampleInput(controls, step), ship, step);
    if (race) stepRace(race, curr, track.value, wallParams, step);
  });
  if (race && race.bestLap !== null && race.bestLap !== savedBest) {
    savedBest = race.bestLap;
    localStorage.setItem(bestKey(), JSON.stringify({ lap: race.bestLap, splits: race.bestSplits }));
  }
  lerpShip(view, prev, curr, alpha);

  sun.color.set(lightColor.value);
  sun.intensity = lightIntensity.value;
  sun.position.fromArray(lightDir.value);
  amb.intensity = ambient.value;
  field.update(gameMode.value === 'free');
  raceScene.update();
  gizmoUi?.update();

  shipModel.object.position.copy(view.pos);
  shipModel.object.quaternion.copy(view.quat);
  shipModel.object.visible = camMode.value !== 'cockpit';
  shipModel.update(view.boosting ? 1 : Math.max(0, controls.thrust));
  updateCamera(camera, view, dt, zoom.value);

  const hint =
    pointerMode.value === 'stick' && !inputDebug.captured && !touchUi.value
      ? 'Click to steer with the touchpad · arrows/WASD to fly'
      : '';
  const raceHud = race && {
    lap: race.lap,
    started: race.started,
    lapTime: race.lapTime,
    lastLap: race.lastLap,
    bestLap: race.bestLap,
    delta: splitDelta(race),
    checkpoint: race.splits.length,
    checkpoints: track.value.checkpoints.length,
    seed: seedVar.value,
  };
  hud.update(view, { assist: assist.value, cam: camMode.value, cruise: inputDebug.cruise, hint, race: raceHud });

  sky.update(camera, renderer.getPixelRatio());
  renderer.info.reset();
  pipeline.render(scene, camera);
  frameMs = performance.now() - t0;
});

// --- debug tools (lazy-loaded) ---------------------------------------------
let debug: Promise<typeof import('./debug')> | undefined;
const openDebug = (force?: boolean) => (debug ??= import('./debug')).then((m) => m.toggle(force));

addEventListener('keydown', (e) => {
  if (e.code === 'Backquote' && !(isTyping(e) && (e.target as HTMLElement).closest('#kocmoc-debug') === null)) {
    e.preventDefault();
    if (document.pointerLockElement) document.exitPointerLock();
    void openDebug();
  }
});
if (new URLSearchParams(location.search).has('debug')) void openDebug(true);
