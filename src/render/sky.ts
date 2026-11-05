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
const ptags = ['render', 'sky', 'planet'];
const planet = {
  size: vars.num('render.sky.planet.size', 0, { min: 0, max: 60, hardMin: 0, hardMax: 85, unit: '°', tags: ptags, desc: 'angular radius of a planet in the sky; 0 = none' }),
  dir: vars.vec3('render.sky.planet.dir', [-0.6, 0.35, -0.7], { tags: ptags, desc: 'direction towards the planet' }),
  color: vars.color('render.sky.planet.color', '#ff9f6b', { tags: ptags }),
  color2: vars.color('render.sky.planet.color2', '#c2577a', { tags: ptags, desc: 'its stripes' }),
  stripes: vars.int('render.sky.planet.stripes', 7, { min: 0, max: 30, hardMin: 0, hardMax: 200, tags: ptags, desc: 'latitude bands' }),
  tilt: vars.num('render.sky.planet.tilt', 0.35, { min: -1.6, max: 1.6, unit: 'rad', tags: ptags, desc: 'axial tilt of the bands and ring' }),
  ring: vars.num('render.sky.planet.ring', 2.2, { min: 0, max: 4, hardMin: 0, tags: ptags, desc: 'outer ring radius in planet radii; 0 (or below 1.2) = no ring' }),
  ringColor: vars.color('render.sky.planet.ringColor', '#ffe0b0', { tags: ptags }),
  moons: vars.int('render.sky.moons', 0, { min: 0, max: 8, hardMin: 0, hardMax: 40, tags: ptags, desc: 'small moons scattered across the sky' }),
  moonColor: vars.color('render.sky.moonColor', '#e8e4ff', { tags: ptags }),
};
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

  // a banded, toon-lit planet with a ring, and a few moons; drawn after the stars so they're hidden behind it
  const bodyMat = new THREE.ShaderMaterial({
    uniforms: {
      colorA: { value: new THREE.Color() },
      colorB: { value: new THREE.Color() },
      stripes: { value: 7 },
      sun: { value: new THREE.Vector3(1, 1, 1) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vLocal;
      void main() {
        vLocal = position;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform float stripes;
      uniform vec3 sun;
      varying vec3 vNormal;
      varying vec3 vLocal;
      void main() {
        float band = stripes > 0.0 ? step(0.5, fract((vLocal.y * 0.5 + 0.5) * stripes + 0.15 * sin(vLocal.x * 6.0))) : 0.0;
        vec3 c = mix(colorA, colorB, band);
        float lit = dot(normalize(vNormal), normalize(sun));
        c *= lit > 0.35 ? 1.0 : lit > -0.15 ? 0.62 : 0.3; // three flat bands, like the toon ramp
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
    depthWrite: false,
    depthTest: false,
  });
  const ringMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, depthWrite: false, depthTest: false, transparent: true, opacity: 0.85 });
  const moonMat = bodyMat.clone();
  const bodies = new THREE.Group();
  bodies.layers.set(SKY_LAYER);
  group.add(bodies);
  effect(() => {
    for (const o of bodies.children.splice(0)) (o as THREE.Mesh).geometry.dispose();
    const size = planet.size.value;
    const rand = rng(starSeed.value + 1);
    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, order: number) => {
      const m = new THREE.Mesh(geo, mat);
      m.layers.set(SKY_LAYER);
      m.renderOrder = order;
      m.frustumCulled = false;
      bodies.add(m);
      return m;
    };
    if (size > 0) {
      const D = 8; // inside the dome (10) and stars (9)
      const dir = new THREE.Vector3().fromArray(planet.dir.value).normalize();
      if (dir.lengthSq() < 0.5) dir.set(0, 1, 0);
      const r = D * Math.tan((Math.min(size, 85) * Math.PI) / 180);
      const centre = dir.clone().multiplyScalar(D);
      // pole: world up, tipped towards the viewer so the ring opens out, then rolled by the tilt
      const side = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0));
      if (side.lengthSq() < 1e-6) side.set(1, 0, 0);
      side.normalize();
      const look = new THREE.Quaternion().setFromAxisAngle(dir, planet.tilt.value).multiply(new THREE.Quaternion().setFromAxisAngle(side, -0.35));
      const ringOut = planet.ring.value;
      if (ringOut >= 1.2) {
        // the viewer seen from the planet, in its frame; the ring half facing it is drawn over the planet
        const v = dir.clone().negate().applyQuaternion(look.clone().invert());
        const psi = Math.atan2(-v.z, v.x); // the ring angle nearest the viewer
        for (const near of [false, true]) {
          // RingGeometry's angle θ lands at (cos θ, 0, -sin θ) once laid flat
          const start = psi + (near ? -Math.PI / 2 : Math.PI / 2);
          const geo = new THREE.RingGeometry(r * 1.25, r * ringOut, 64, 3, start, Math.PI).rotateX(-Math.PI / 2);
          const m = add(geo, ringMat, near ? -0.7 : -0.9);
          m.position.copy(centre);
          m.quaternion.copy(look);
        }
      }
      const ball = add(new THREE.SphereGeometry(r, 48, 32), bodyMat, -0.8);
      ball.position.copy(centre);
      ball.quaternion.copy(look);
    }
    for (let i = 0; i < planet.moons.value; i++) {
      const dir = new THREE.Vector3(rand() * 2 - 1, rand() * 0.9 + 0.05, rand() * 2 - 1).normalize();
      const moon = add(new THREE.SphereGeometry(8 * Math.tan((0.6 + rand() * 2.4) * (Math.PI / 180)), 20, 14), moonMat, -0.85);
      moon.position.copy(dir.multiplyScalar(8.2));
    }
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
      bodyMat.uniforms.colorA.value.set(planet.color.value);
      bodyMat.uniforms.colorB.value.set(planet.color2.value);
      bodyMat.uniforms.stripes.value = planet.stripes.value;
      const sunDir = vars.get('render.light.dir')?.value;
      if (Array.isArray(sunDir)) {
        bodyMat.uniforms.sun.value.fromArray(sunDir);
        moonMat.uniforms.sun.value.fromArray(sunDir);
      }
      moonMat.uniforms.colorA.value.set(planet.moonColor.value);
      moonMat.uniforms.colorB.value.set(planet.moonColor.value);
      moonMat.uniforms.stripes.value = 0;
      ringMat.color.set(planet.ringColor.value);
    },
  };
}
