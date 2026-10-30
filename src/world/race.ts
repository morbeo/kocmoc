import * as THREE from 'three';
import { computed, effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { toon } from '../render/toon';
import { generateTrack, type RaceGenParams, type Track } from '../gen/track';
import { GAME_MODES } from '../core/scenarios';

export const gameMode = vars.enum('game.mode', 'race', GAME_MODES, { tags: ['game'], desc: 'race: generated track; gauntlet: the track filled with obstacles; free: open rock field' });
/** Race and gauntlet both fly the generated track. */
export const onTrack = () => gameMode.value !== 'free';

const g = ['gen', 'race'];
const gen = {
  seed: vars.int('gen.race.seed', 1, { min: 0, max: 99999, hardMin: 0, tags: g, regen: true, desc: 'also in the URL as ?seed=' }),
  points: vars.int('gen.race.points', 12, { min: 5, max: 40, hardMin: 4, hardMax: 200, tags: g, regen: true, desc: 'control points around the loop' }),
  radius: vars.num('gen.race.radius', 1000, { min: 250, max: 4000, hardMin: 50, unit: 'm', tags: g, regen: true }),
  wobble: vars.num('gen.race.wobble', 0.35, { min: 0, max: 0.8, hardMin: 0, hardMax: 0.95, tags: g, regen: true, desc: 'radial randomness' }),
  height: vars.num('gen.race.height', 250, { min: 0, max: 1200, hardMin: 0, unit: 'm', tags: g, regen: true, desc: 'vertical randomness' }),
  twist: vars.num('gen.race.twist', 0, { min: -4, max: 4, step: 1, tags: g, regen: true, desc: 'whole barrel rolls per lap (rounded)' }),
  twistNoise: vars.num('gen.race.twistNoise', 0.5, { min: 0, max: 3, hardMin: 0, unit: 'rad', tags: g, regen: true, desc: 'random banking per control point' }),
  tube: vars.num('gen.race.tubeRadius', 40, { min: 10, max: 120, hardMin: 3, unit: 'm', tags: g, regen: true, desc: 'corridor radius; keep the loop radius ~25× this for varied layouts' }),
  spacing: vars.num('gen.race.spacing', 4, { min: 1, max: 20, hardMin: 0.5, unit: 'm', tags: g, regen: true, desc: 'centreline sample spacing' }),
  checkpoints: vars.int('gen.race.checkpoints', 8, { min: 2, max: 32, hardMin: 1, hardMax: 200, tags: g, regen: true }),
};
const rtags = ['render', 'track'];
export const profile = vars.enum('gen.race.profile', 'tube', ['tube', 'halfpipe', 'rails', 'gates'], { tags: rtags, desc: 'look of the corridor; walls collide the same for all' });
const trackColor = vars.color('render.track.color', '#3b2a6b', { tags: rtags });
const stripeColor = vars.color('render.track.stripe', '#5a3fa0', { tags: rtags });
const stripeEvery = vars.num('render.track.stripeEvery', 40, { min: 4, max: 200, hardMin: 1, unit: 'm', tags: rtags, desc: 'stripe length, for a sense of speed' });
const gateEvery = vars.num('render.track.gateEvery', 60, { min: 10, max: 400, hardMin: 2, unit: 'm', tags: rtags });
const cpColor = vars.color('race.checkpoint.color', '#40e0ff', { tags: ['race', 'render'] });
const startColor = vars.color('race.start.color', '#ffd23f', { tags: ['race', 'render'] });
const cpGlow = vars.num('race.checkpoint.glow', 1.4, { min: 0, max: 6, hardMin: 0, tags: ['race', 'render'], desc: 'above the bloom threshold checkpoints glow' });

export const genParams = computed<RaceGenParams>(() => ({
  seed: gen.seed.value,
  points: gen.points.value,
  radius: gen.radius.value,
  wobble: gen.wobble.value,
  height: gen.height.value,
  twist: gen.twist.value,
  twistNoise: gen.twistNoise.value,
  tubeRadius: gen.tube.value,
  spacing: gen.spacing.value,
  checkpoints: gen.checkpoints.value,
}));
/** Regenerates when any `gen.race.*` var changes. */
export const track = computed<Track>(() => generateTrack(genParams.value));
export const seedVar = gen.seed;

// --- meshes ------------------------------------------------------------------

/** Ring offsets around the centreline: angle a → cos(a)·right + sin(a)·up. */
function sweep(t: Track, angles: number[], radius: number, closedRing: boolean, centre?: (i: number, out: THREE.Vector3) => void) {
  const n = t.pos.length;
  const m = angles.length;
  const position = new Float32Array(n * m * 3);
  const stripe = new Float32Array(n * m);
  const c = new THREE.Vector3();
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    if (centre) centre(i, c);
    else c.copy(t.pos[i]);
    const band = Math.floor(t.s[i] / stripeEvery.value) % 2;
    for (let k = 0; k < m; k++) {
      v.copy(c)
        .addScaledVector(t.right[i], Math.cos(angles[k]) * radius)
        .addScaledVector(t.up[i], Math.sin(angles[k]) * radius);
      v.toArray(position, (i * m + k) * 3);
      stripe[i * m + k] = band;
    }
  }
  const index: number[] = [];
  const segs = closedRing ? m : m - 1;
  for (let i = 0; i < n; i++) {
    const i2 = (i + 1) % n;
    for (let k = 0; k < segs; k++) {
      const k2 = (k + 1) % m;
      const a = i * m + k;
      const b = i2 * m + k;
      const cc = i2 * m + k2;
      const d = i * m + k2;
      index.push(a, b, d, b, cc, d);
    }
  }
  return { position, stripe, index };
}

function mergeSweeps(parts: ReturnType<typeof sweep>[], colorA: THREE.Color, colorB: THREE.Color): THREE.BufferGeometry {
  const total = parts.reduce((x, p) => x + p.stripe.length, 0);
  const position = new Float32Array(total * 3);
  const color = new Float32Array(total * 3);
  const index: number[] = [];
  let off = 0;
  for (const p of parts) {
    position.set(p.position, off * 3);
    for (let i = 0; i < p.stripe.length; i++) (p.stripe[i] ? colorB : colorA).toArray(color, (off + i) * 3);
    for (const ix of p.index) index.push(ix + off);
    off += p.stripe.length;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(color, 3));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}

const range = (count: number, from: number, to: number, inclusive: boolean) =>
  Array.from({ length: count }, (_, k) => from + ((to - from) * k) / (inclusive ? count - 1 : count));

function ringMatrices(mesh: THREE.InstancedMesh, t: Track, at: number[]): void {
  const n = t.pos.length;
  const m = new THREE.Matrix4();
  at.forEach((s, k) => {
    const i = Math.min(n - 1, Math.round((s / t.length) * n)) % n;
    // torus lies in its XY plane: map X → right, Y → up, Z → forward
    m.makeBasis(t.right[i], t.up[i], t.tan[i]).setPosition(t.pos[i]);
    mesh.setMatrixAt(k, m);
  });
  mesh.instanceMatrix.needsUpdate = true;
}

/** Track meshes; rebuilt when the track or its look changes. */
export function createRaceScene(scene: THREE.Scene) {
  const group = new THREE.Group();
  scene.add(group);
  const wallMat = toon({ vertexColors: true, side: THREE.DoubleSide });
  const gateMat = toon({ side: THREE.DoubleSide });
  const cpMat = new THREE.MeshBasicMaterial({ vertexColors: false });
  const startMat = new THREE.MeshBasicMaterial();
  const colA = new THREE.Color();
  const colB = new THREE.Color();
  const disposables: { dispose(): void }[] = [];

  effect(() => {
    const t = track.value;
    const look = profile.value;
    colA.set(trackColor.value);
    colB.set(stripeColor.value);
    void stripeEvery.value;
    const every = gateEvery.value;
    for (const d of disposables.splice(0)) d.dispose();
    group.clear();

    const R = t.radius;
    let geo: THREE.BufferGeometry | undefined;
    if (look === 'tube') geo = mergeSweeps([sweep(t, range(32, 0, Math.PI * 2, false), R, true)], colA, colB);
    else if (look === 'halfpipe') geo = mergeSweeps([sweep(t, range(17, Math.PI, Math.PI * 2, true), R, false)], colA, colB);
    else if (look === 'rails') {
      const rails = [0.25, 0.75, 1.25, 1.75].map((q) => {
        const a = q * Math.PI;
        return sweep(t, range(8, 0, Math.PI * 2, false), 0.6, true, (i, out) =>
          out.copy(t.pos[i]).addScaledVector(t.right[i], Math.cos(a) * R).addScaledVector(t.up[i], Math.sin(a) * R),
        );
      });
      geo = mergeSweeps(rails, colA, colB);
    }
    if (geo) {
      const mesh = new THREE.Mesh(geo, wallMat);
      group.add(mesh);
      disposables.push(geo);
    }

    if (look === 'gates' || look === 'rails') {
      const at = range(Math.max(1, Math.floor(t.length / every)), 0, t.length, false);
      const ringGeo = new THREE.TorusGeometry(R, 1, 6, 40);
      const gates = new THREE.InstancedMesh(ringGeo, gateMat, at.length);
      ringMatrices(gates, t, at);
      group.add(gates);
      disposables.push(ringGeo, gates);
    }

    const cpGeo = new THREE.TorusGeometry(R * 0.98, 0.5, 6, 48);
    const cps = new THREE.InstancedMesh(cpGeo, cpMat, Math.max(1, t.checkpoints.length - 1));
    ringMatrices(cps, t, t.checkpoints.slice(1));
    cps.count = t.checkpoints.length - 1;
    const start = new THREE.InstancedMesh(new THREE.TorusGeometry(R * 0.98, 0.6, 6, 48), startMat, 1);
    ringMatrices(start, t, [0]);
    group.add(cps, start);
    disposables.push(cpGeo, cps, start.geometry, start);
  });

  return {
    group,
    update() {
      group.visible = onTrack();
      gateMat.color.set(stripeColor.value);
      cpMat.color.set(cpColor.value).multiplyScalar(cpGlow.value);
      startMat.color.set(startColor.value).multiplyScalar(cpGlow.value);
    },
  };
}
