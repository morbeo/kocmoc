import * as THREE from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { vars } from '../core/vars';
import { SKY_LAYER } from './sky';

export const VIEWS = ['final', 'color', 'edges', 'normals', 'depth'] as const;
const view = vars.enum('render.debug.view', 'final', VIEWS, { tags: ['render', 'debug'], desc: 'final | color (no outline) | edges | normals | depth' });

const otags = ['render', 'outline'];
const outlineOn = vars.bool('render.outline.enabled', true, { tags: otags });
const outlineColor = vars.color('render.outline.color', '#000000', { tags: otags });
const thickness = vars.num('render.outline.thickness', 1.5, { min: 0.5, max: 5, hardMin: 0, hardMax: 20, unit: 'px', tags: otags });
const depthThreshold = vars.num('render.outline.depth', 0.15, {
  min: 0.005,
  max: 1,
  hardMin: 0,
  tags: otags,
  desc: 'relative depth jump that draws a line (silhouettes)',
});
const creaseFade = vars.num('render.outline.creaseFade', 250, {
  min: 10,
  max: 2000,
  hardMin: 1,
  unit: 'm',
  tags: otags,
  desc: 'crease lines fade out by this distance so far objects don’t turn into ink blots',
});
const normalThreshold = vars.num('render.outline.normal', 0.25, {
  min: 0.02,
  max: 1.5,
  hardMin: 0,
  tags: otags,
  desc: 'normal change that draws a line (creases)',
});

const btags = ['render', 'bloom'];
const bloomOn = vars.bool('render.bloom.enabled', true, { tags: btags });
const bloomStrength = vars.num('render.bloom.strength', 0.8, { min: 0, max: 3, hardMin: 0, tags: btags });
const bloomRadius = vars.num('render.bloom.radius', 0.4, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: btags });
const bloomThreshold = vars.num('render.bloom.threshold', 1.1, {
  min: 0,
  max: 3,
  hardMin: 0,
  tags: btags,
  desc: 'only pixels brighter than this glow; lit toon surfaces stay under ~1, emissives go over',
});

const outlineShader = {
  uniforms: {
    tColor: { value: null as THREE.Texture | null },
    tDepth: { value: null as THREE.Texture | null },
    tNormal: { value: null as THREE.Texture | null },
    texel: { value: new THREE.Vector2() },
    thickness: { value: 1 },
    depthThreshold: { value: 0.1 },
    normalThreshold: { value: 0.5 },
    creaseFade: { value: 250 },
    outlineColor: { value: new THREE.Color() },
    outlineOn: { value: 1 },
    cameraNear: { value: 0.1 },
    cameraFar: { value: 1000 },
    view: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    #include <packing>
    uniform sampler2D tColor;
    uniform sampler2D tDepth;
    uniform sampler2D tNormal;
    uniform vec2 texel;
    uniform float thickness;
    uniform float depthThreshold;
    uniform float normalThreshold;
    uniform float creaseFade;
    uniform vec3 outlineColor;
    uniform float outlineOn;
    uniform float cameraNear;
    uniform float cameraFar;
    uniform int view;
    varying vec2 vUv;

    float viewDepth(vec2 uv) {
      return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, cameraNear, cameraFar);
    }

    void main() {
      vec2 o = texel * thickness;
      // Sobel over a 3x3 neighbourhood
      float d[9];
      vec3 n[9];
      int k = 0;
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec2 uv = vUv + vec2(float(x), float(y)) * o;
          d[k] = viewDepth(uv);
          n[k] = texture2D(tNormal, uv).rgb;
          k++;
        }
      }
      // silhouettes: one-sided, drawn only on the far side of a depth jump, so lines sit
      // outside an object and small/distant objects keep their fill
      float nearest = d[4];
      for (int i = 0; i < 9; i++) nearest = min(nearest, d[i]);
      float depthEdge = (d[4] - nearest) / max(d[4], 1e-3);
      // creases: largest normal change to a direct neighbour. Unlike Sobel this ignores smooth
      // curvature (tubes, spheres) and only fires on real corners; faded with distance.
      float dn = 0.0;
      dn = max(dn, length(n[1] - n[4]));
      dn = max(dn, length(n[3] - n[4]));
      dn = max(dn, length(n[5] - n[4]));
      dn = max(dn, length(n[7] - n[4]));
      float normalEdge = dn * (1.0 - smoothstep(creaseFade * 0.5, creaseFade, d[4]));
      float edge = max(step(depthThreshold, depthEdge), step(normalThreshold, normalEdge)) * outlineOn;

      vec4 color = texture2D(tColor, vUv);
      if (view == 1) gl_FragColor = color;
      else if (view == 2) gl_FragColor = vec4(vec3(1.0 - edge), 1.0);
      else if (view == 3) gl_FragColor = vec4(texture2D(tNormal, vUv).rgb, 1.0);
      else if (view == 4) gl_FragColor = vec4(vec3(1.0 - clamp(log2(d[4]) / log2(cameraFar), 0.0, 1.0)), 1.0);
      else gl_FragColor = vec4(mix(color.rgb, outlineColor, edge), 1.0);
    }`,
};

/** Chromatic aberration (radial RGB split) and vignette; driven by the juice system. */
const lensShader = {
  uniforms: {
    tColor: { value: null as THREE.Texture | null },
    aberration: { value: 0 },
    vignette: { value: 0 },
  },
  vertexShader: outlineShader.vertexShader,
  fragmentShader: /* glsl */ `
    uniform sampler2D tColor;
    uniform float aberration;
    uniform float vignette;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - 0.5;
      vec2 off = d * aberration;
      vec4 c = texture2D(tColor, vUv);
      c.r = texture2D(tColor, vUv + off).r;
      c.b = texture2D(tColor, vUv - off).b;
      float v = 1.0 - vignette * smoothstep(0.25, 0.75, length(d) * 1.2);
      gl_FragColor = vec4(c.rgb * v, 1.0);
    }`,
};

/** Set each frame by the juice system; zero means the lens pass is skipped. */
export const lens = { aberration: 0, vignette: 0 };

/**
 * Colour pass (with depth) → normals pass → Sobel outline composite → bloom → output.
 * Debug views swap the composite output for an intermediate buffer.
 */
export function createPipeline(renderer: THREE.WebGLRenderer) {
  const opts = { type: THREE.HalfFloatType, samples: 4 };
  const colorRT = new THREE.WebGLRenderTarget(1, 1, { ...opts, depthTexture: new THREE.DepthTexture(1, 1) });
  const normalRT = new THREE.WebGLRenderTarget(1, 1, opts);
  const compositeRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
  const lensRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
  const lensMat = new THREE.ShaderMaterial(lensShader);
  const lensQuad = new FullScreenQuad(lensMat);

  const normalMat = new THREE.MeshNormalMaterial();
  const outline = new THREE.ShaderMaterial(outlineShader);
  const quad = new FullScreenQuad(outline);
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1, 0.4, 1);
  const output = new OutputPass();
  output.renderToScreen = true;
  const black = new THREE.Color(0, 0, 0);
  const prevClear = new THREE.Color();

  return {
    setSize(w: number, h: number) {
      const pr = renderer.getPixelRatio();
      const W = Math.floor(w * pr);
      const H = Math.floor(h * pr);
      colorRT.setSize(W, H);
      normalRT.setSize(W, H);
      compositeRT.setSize(W, H);
      lensRT.setSize(W, H);
      bloom.setSize(W, H);
      outline.uniforms.texel.value.set(1 / W, 1 / H);
    },

    render(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
      const u = outline.uniforms;
      const v = VIEWS.indexOf(view.value);

      // 1. colour + depth, sky included
      camera.layers.enable(SKY_LAYER);
      renderer.setRenderTarget(colorRT);
      renderer.render(scene, camera);

      // 2. view-space normals of solid geometry only (sky stays clear → silhouettes)
      const needNormals = (outlineOn.value && v !== 1) || v === 3;
      if (needNormals) {
        camera.layers.disable(SKY_LAYER);
        const bg = scene.background;
        scene.background = null;
        scene.overrideMaterial = normalMat;
        renderer.getClearColor(prevClear);
        const prevAlpha = renderer.getClearAlpha();
        renderer.setClearColor(black, 1);
        renderer.setRenderTarget(normalRT);
        renderer.clear();
        renderer.render(scene, camera);
        renderer.setClearColor(prevClear, prevAlpha);
        scene.overrideMaterial = null;
        scene.background = bg;
        camera.layers.enable(SKY_LAYER);
      }

      // 3. outline composite / debug view
      u.tColor.value = colorRT.texture;
      u.tDepth.value = colorRT.depthTexture;
      u.tNormal.value = normalRT.texture;
      u.thickness.value = thickness.value;
      u.depthThreshold.value = depthThreshold.value;
      u.normalThreshold.value = normalThreshold.value;
      u.creaseFade.value = creaseFade.value;
      u.outlineColor.value.set(outlineColor.value);
      u.outlineOn.value = outlineOn.value && needNormals ? 1 : 0;
      u.cameraNear.value = camera.near;
      u.cameraFar.value = camera.far;
      u.view.value = v;
      renderer.setRenderTarget(compositeRT);
      quad.render(renderer);

      // 4. bloom on what's left above the threshold (emissives, bright stars)
      if (bloomOn.value && v <= 1) {
        bloom.strength = bloomStrength.value;
        bloom.radius = bloomRadius.value;
        bloom.threshold = bloomThreshold.value;
        bloom.render(renderer, compositeRT, compositeRT, 0, false);
      }

      // 5. lens effects (juice), then linear → sRGB to screen
      let out = compositeRT;
      if (v === 0 && (lens.aberration > 0 || lens.vignette > 0)) {
        lensMat.uniforms.tColor.value = compositeRT.texture;
        lensMat.uniforms.aberration.value = lens.aberration;
        lensMat.uniforms.vignette.value = lens.vignette;
        renderer.setRenderTarget(lensRT);
        lensQuad.render(renderer);
        out = lensRT;
      }
      output.render(renderer, null as unknown as THREE.WebGLRenderTarget, out, 0, false);
    },
  };
}
