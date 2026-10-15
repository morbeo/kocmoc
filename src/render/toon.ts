import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars } from '../core/vars';

const toonSteps = vars.int('render.toon.steps', 3, { min: 2, max: 8, hardMin: 2, hardMax: 64, tags: ['render', 'toon'], desc: 'shading bands' });

function makeRamp(steps: number): THREE.DataTexture {
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) data[i] = Math.round((i / (steps - 1)) * 255);
  const tex = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

const materials = new Set<THREE.MeshToonMaterial>();
let ramp: THREE.DataTexture | undefined;
effect(() => {
  const next = makeRamp(toonSteps.value);
  for (const m of materials) {
    m.gradientMap = next;
    m.needsUpdate = true;
  }
  ramp?.dispose();
  ramp = next;
});

/** Toon material sharing the global banding ramp. */
export function toon(params: THREE.MeshToonMaterialParameters = {}): THREE.MeshToonMaterial {
  const m = new THREE.MeshToonMaterial({ ...params, gradientMap: ramp });
  materials.add(m);
  return m;
}
