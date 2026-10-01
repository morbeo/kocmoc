import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars } from './core/vars';
import { initPersistence } from './core/persist';
import { isTyping } from './core/dom';

initPersistence(vars);

// --- vars ------------------------------------------------------------------
const background = vars.color('render.background', '#05010f', { tags: ['render'] });
const toonSteps = vars.enum('render.toon.steps', 3, [2, 3, 4, 5], { tags: ['render', 'toon'], desc: 'shading bands' });
const lightColor = vars.color('render.light.color', '#ffffff', { tags: ['render'] });
const lightIntensity = vars.num('render.light.intensity', 3, { min: 0, max: 10, tags: ['render'] });
const lightDir = vars.vec3('render.light.dir', [1, 1.5, 1], { tags: ['render'], desc: 'direction towards the light' });
const ambient = vars.num('render.ambient', 0.25, { min: 0, max: 2, tags: ['render'] });
const fov = vars.num('cam.fov', 60, { min: 20, max: 120, unit: '°', tags: ['cam'] });
const camDistance = vars.num('cam.distance', 6, { min: 2, max: 30, unit: 'm', tags: ['cam'] });
const shape = vars.enum('demo.shape', 'torusKnot', ['torusKnot', 'icosahedron', 'box'], { tags: ['demo'] });
const color = vars.color('demo.color', '#ff2fa8', { tags: ['demo'] });
const spin = vars.num('demo.spin.speed', 0.6, { min: -5, max: 5, unit: 'rad/s', tags: ['demo'] });
const wireframe = vars.bool('demo.wireframe', false, { tags: ['demo', 'render'] });

// --- scene -----------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const bgColor = new THREE.Color();
scene.background = bgColor;
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
const sun = new THREE.DirectionalLight();
const amb = new THREE.AmbientLight(0x8899ff);
scene.add(sun, amb);

const material = new THREE.MeshToonMaterial();
const mesh = new THREE.Mesh(new THREE.BufferGeometry(), material);
scene.add(mesh);

function makeRamp(steps: number): THREE.DataTexture {
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) data[i] = Math.round((i / (steps - 1)) * 255);
  const tex = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

const geometries = {
  torusKnot: () => new THREE.TorusKnotGeometry(1.2, 0.4, 160, 24),
  icosahedron: () => new THREE.IcosahedronGeometry(1.6, 0),
  box: () => new THREE.BoxGeometry(2, 2, 2),
};

// rebuild resources only when their vars change; per-frame values are read in the loop
effect(() => {
  material.gradientMap?.dispose();
  material.gradientMap = makeRamp(toonSteps.value);
  material.needsUpdate = true;
});
effect(() => {
  mesh.geometry.dispose();
  mesh.geometry = geometries[shape.value]();
});

function resize(): void {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

// --- perf watches ----------------------------------------------------------
let fps = 0;
let frameMs = 0;
vars.watch('perf.fps', () => Math.round(fps), { tags: ['perf'] });
vars.watch('perf.frameMs', () => frameMs.toFixed(2), { tags: ['perf'], unit: 'ms' });
vars.watch('perf.drawCalls', () => renderer.info.render.calls, { tags: ['perf'] });
vars.watch('perf.triangles', () => renderer.info.render.triangles, { tags: ['perf'] });

// --- loop ------------------------------------------------------------------
let last = performance.now();
renderer.setAnimationLoop((now) => {
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  fps += (1 / Math.max(dt, 1e-4) - fps) * 0.05;

  const t0 = performance.now();
  bgColor.set(background.value);
  sun.color.set(lightColor.value);
  sun.intensity = lightIntensity.value;
  sun.position.fromArray(lightDir.value);
  amb.intensity = ambient.value;
  material.color.set(color.value);
  material.wireframe = wireframe.value;

  mesh.rotation.y += spin.value * dt;
  mesh.rotation.x += spin.value * 0.37 * dt;

  if (camera.fov !== fov.value) {
    camera.fov = fov.value;
    camera.updateProjectionMatrix();
  }
  camera.position.set(0, 0, camDistance.value);
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  frameMs = performance.now() - t0;
});

// --- debug tools (lazy-loaded) ---------------------------------------------
let debug: Promise<typeof import('./debug')> | undefined;
const openDebug = (force?: boolean) => (debug ??= import('./debug')).then((m) => m.toggle(force));

addEventListener('keydown', (e) => {
  if (e.code === 'Backquote' && !(isTyping(e) && (e.target as HTMLElement).closest('#kocmoc-debug') === null)) {
    e.preventDefault();
    void openDebug();
  }
});
if (new URLSearchParams(location.search).has('debug')) void openDebug(true);
