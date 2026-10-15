import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars } from './core/vars';
import { initPersistence } from './core/persist';
import { isTyping } from './core/dom';
import { FixedLoop } from './core/loop';
import { newShip, copyShip, lerpShip, stepShip, noControls, type ShipParams } from './sim/ship';
import { attachInput, sampleInput, onKey, assistKey, cameraKey, zoom, debug as inputDebug, pointerMode } from './input/input';
import { camMode, cycleCamera, updateCamera } from './cam/rigs';
import { createShipModel } from './render/shipModel';
import { createField } from './world/field';
import { createHud } from './ui/hud';
import './ui/hud.css';

// --- vars ------------------------------------------------------------------
const background = vars.color('render.background', '#05010f', { tags: ['render'] });
const lightColor = vars.color('render.light.color', '#ffffff', { tags: ['render'] });
const lightIntensity = vars.num('render.light.intensity', 3, { min: 0, max: 10, hardMin: 0, tags: ['render'] });
const lightDir = vars.vec3('render.light.dir', [1, 1.5, 1], { tags: ['render'], desc: 'direction towards the light' });
const ambient = vars.num('render.ambient', 0.25, { min: 0, max: 2, hardMin: 0, tags: ['render'] });

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

// restore saved/shared tuning only after every var above has registered
initPersistence(vars);

// --- scene -----------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const bgColor = new THREE.Color();
scene.background = bgColor;
const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 5000);
const sun = new THREE.DirectionalLight();
const amb = new THREE.AmbientLight(0x8899ff);
scene.add(sun, amb);

const shipModel = createShipModel();
scene.add(shipModel.object);
const field = createField(scene);
const hud = createHud();

function resize(): void {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

// --- sim -------------------------------------------------------------------
const prev = newShip();
const curr = newShip();
const view = newShip();
const controls = noControls();
const loop = new FixedLoop(1 / simRate.value);
effect(() => void (loop.step = 1 / simRate.value));

attachInput(renderer.domElement);
onKey(assistKey, () => assist.set(!assist.value));
onKey(cameraKey, cycleCamera);
onKey(vizKey, () => inputViz.set(!inputViz.value));

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

// --- frame -----------------------------------------------------------------
let last = performance.now();
renderer.setAnimationLoop((now) => {
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  fps += (1 / Math.max(dt, 1e-4) - fps) * 0.05;
  const t0 = performance.now();

  const ship = params();
  const alpha = loop.advance(paused.value ? 0 : dt * timeScale.value, (step) => {
    copyShip(prev, curr);
    stepShip(curr, sampleInput(controls, step), ship, step);
  });
  lerpShip(view, prev, curr, alpha);

  bgColor.set(background.value);
  sun.color.set(lightColor.value);
  sun.intensity = lightIntensity.value;
  sun.position.fromArray(lightDir.value);
  amb.intensity = ambient.value;
  field.update();

  shipModel.object.position.copy(view.pos);
  shipModel.object.quaternion.copy(view.quat);
  shipModel.object.visible = camMode.value !== 'cockpit';
  shipModel.update(view.boosting ? 1 : Math.max(0, controls.thrust));
  updateCamera(camera, view, dt, zoom.value);

  const hint =
    pointerMode.value === 'stick' && !inputDebug.captured
      ? 'Click to steer with the touchpad · arrows/WASD to fly'
      : '';
  hud.update(view, { assist: assist.value, cam: camMode.value, cruise: inputDebug.cruise, hint });

  renderer.render(scene, camera);
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
