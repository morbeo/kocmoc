import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars } from '../core/vars';

const tags = ['render', 'toon'];
const toonSteps = vars.int('render.toon.steps', 3, { min: 2, max: 8, hardMin: 2, hardMax: 64, tags, desc: 'shading bands' });
const toonFloor = vars.num('render.toon.floor', 0.15, { min: 0, max: 0.8, hardMin: 0, hardMax: 1, tags, desc: 'brightness of the darkest band' });
const rimColor = vars.color('render.rim.color', '#9fd8ff', { tags: ['render', 'rim'] });
const rimStrength = vars.num('render.rim.strength', 0.5, { min: 0, max: 2, hardMin: 0, tags: ['render', 'rim'] });
const rimWidth = vars.num('render.rim.width', 0.3, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: ['render', 'rim'], desc: 'fraction of the silhouette that gets the rim band' });
const wireframe = vars.bool('render.wireframe', false, { tags: ['render', 'debug'] });

/** Stepped lighting ramp: `steps` flat bands from `floor` to full brightness. */
export function rampValues(steps: number, floor: number): Uint8Array {
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) data[i] = Math.round((floor + (1 - floor) * (i / (steps - 1))) * 255);
  return data;
}

function makeRamp(steps: number, floor: number): THREE.DataTexture {
  const tex = new THREE.DataTexture(rampValues(steps, floor), steps, 1, THREE.RedFormat);
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

// shared by every toon material, so a var change is one uniform write
const rim = {
  rimColor: { value: new THREE.Color() },
  rimStrength: { value: 0 },
  rimEdge: { value: 0 },
};

const materials = new Set<THREE.MeshToonMaterial>();
let ramp: THREE.DataTexture | undefined;
effect(() => {
  const next = makeRamp(toonSteps.value, toonFloor.value);
  for (const m of materials) {
    m.gradientMap = next;
    m.needsUpdate = true;
  }
  ramp?.dispose();
  ramp = next;
});
effect(() => {
  rim.rimColor.value.set(rimColor.value);
  rim.rimStrength.value = rimStrength.value;
  rim.rimEdge.value = 1 - rimWidth.value;
});
effect(() => {
  for (const m of materials) m.wireframe = wireframe.value;
});

/** Toon material sharing the global banding ramp, with a hard-edged Fresnel rim band. */
export function toon(params: THREE.MeshToonMaterialParameters = {}): THREE.MeshToonMaterial {
  const m = new THREE.MeshToonMaterial({ ...params, gradientMap: ramp, wireframe: wireframe.value });
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, rim);
    shader.fragmentShader = shader.fragmentShader
      .replace('void main() {', 'uniform vec3 rimColor;\nuniform float rimStrength;\nuniform float rimEdge;\nvoid main() {')
      .replace(
        '#include <opaque_fragment>',
        `float fres = 1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0);
        outgoingLight += rimColor * rimStrength * step(rimEdge, fres);
        #include <opaque_fragment>`,
      );
  };
  materials.add(m);
  return m;
}
