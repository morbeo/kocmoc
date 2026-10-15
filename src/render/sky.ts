import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { rng } from '../core/rng';

/** Layer for things that sit at infinity: drawn in the colour pass, left out of the normals pass. */
export const SKY_LAYER = 1;

const tags = ['render', 'sky'];
const horizon = vars.color('render.background', '#05010f', { tags, desc: 'sky colour at the horizon' });
const zenith = vars.color('render.sky.zenith', '#1a0b3d', { tags });
const bands = vars.int('render.sky.bands', 5, { min: 1, max: 16, hardMin: 1, hardMax: 64, tags, desc: 'flat colour bands between horizon and zenith' });
const starsOn = vars.bool('render.stars.enabled', true, { tags: ['render', 'stars'] });
const starCount = vars.int('render.stars.count', 2500, { min: 0, max: 20000, hardMin: 0, hardMax: 200000, tags: ['render', 'stars'], regen: true });
const starSize = vars.num('render.stars.size', 2, { min: 0.5, max: 8, hardMin: 0.1, unit: 'px', tags: ['render', 'stars'] });
const starBright = vars.num('render.stars.brightness', 1.6, { min: 0, max: 4, hardMin: 0, tags: ['render', 'stars'], desc: 'above ~1.2 the brightest stars bloom' });
const starSeed = vars.int('render.stars.seed', 7, { min: 0, max: 99999, hardMin: 0, tags: ['render', 'stars'], regen: true });

/** Banded gradient dome plus a point starfield; both follow the camera so they read as infinitely far. */
export function createSky(scene: THREE.Scene) {
  const group = new THREE.Group();
  group.layers.set(SKY_LAYER);
  scene.add(group);

  const domeMat = new THREE.ShaderMaterial({
    uniforms: { horizon: { value: new THREE.Color() }, zenith: { value: new THREE.Color() }, bands: { value: 5 } },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w; // pin to the far plane
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 horizon;
      uniform vec3 zenith;
      uniform float bands;
      varying vec3 vDir;
      void main() {
        float t = abs(normalize(vDir).y);
        t = floor(t * bands) / max(bands - 1.0, 1.0);
        gl_FragColor = vec4(mix(horizon, zenith, clamp(t, 0.0, 1.0)), 1.0);
        #include <colorspace_fragment>
      }`,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), domeMat);
  dome.layers.set(SKY_LAYER);
  dome.renderOrder = -2;
  dome.frustumCulled = false;
  group.add(dome);

  const starMat = new THREE.ShaderMaterial({
    uniforms: { size: { value: 2 }, bright: { value: 1 }, pixelRatio: { value: 1 } },
    vertexShader: /* glsl */ `
      attribute float mag;
      attribute vec3 tint;
      uniform float size;
      uniform float pixelRatio;
      uniform float bright;
      varying vec3 vColor;
      void main() {
        vColor = tint * bright * mag;
        gl_PointSize = size * pixelRatio * (0.5 + mag);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      void main() {
        // hard-edged disc: toon stars, no soft falloff
        if (length(gl_PointCoord - 0.5) > 0.5) discard;
        gl_FragColor = vec4(vColor, 1.0);
      }`,
    depthWrite: false,
  });
  let stars: THREE.Points | undefined;
  effect(() => {
    const n = starCount.value;
    const rand = rng(starSeed.value);
    const pos = new Float32Array(n * 3);
    const mag = new Float32Array(n);
    const tint = new Float32Array(n * 3);
    const v = new THREE.Vector3();
    const c = new THREE.Color();
    for (let i = 0; i < n; i++) {
      do v.set(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
      while (v.lengthSq() > 1 || v.lengthSq() < 1e-4);
      v.setLength(9).toArray(pos, i * 3);
      mag[i] = rand() ** 3; // mostly faint, a few bright
      c.setHSL(0.55 + rand() * 0.15, 0.6, 0.85).toArray(tint, i * 3);
    }
    if (stars) {
      group.remove(stars);
      stars.geometry.dispose();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('mag', new THREE.BufferAttribute(mag, 1));
    geo.setAttribute('tint', new THREE.BufferAttribute(tint, 3));
    stars = new THREE.Points(geo, starMat);
    stars.layers.set(SKY_LAYER);
    stars.renderOrder = -1;
    stars.frustumCulled = false;
    group.add(stars);
  });

  return {
    update(camera: THREE.Camera, pixelRatio: number) {
      group.position.copy(camera.position);
      domeMat.uniforms.horizon.value.set(horizon.value);
      domeMat.uniforms.zenith.value.set(zenith.value);
      domeMat.uniforms.bands.value = bands.value;
      starMat.uniforms.size.value = starSize.value;
      starMat.uniforms.bright.value = starBright.value;
      starMat.uniforms.pixelRatio.value = pixelRatio;
      if (stars) stars.visible = starsOn.value;
    },
  };
}
