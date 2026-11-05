import * as THREE from 'three';
import { computed, effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { toon } from '../render/toon';
import { placeScreens, type Screen } from '../gen/screens';
import { newCineState, placeCinematic } from '../cam/cinematic';
import { SKY_LAYER } from '../render/sky';
import type { ShipState } from '../sim/ship';
import { gameMode, onTrack, seedVar, track } from './race';

const g = ['world', 'screens'];
const sv = {
  count: vars.int('world.screens.count', 0, { min: 0, max: 16, hardMin: 0, hardMax: 64, tags: g, regen: true, desc: 'race mode: giant screens beside the track showing a broadcast view of your ship' }),
  width: vars.num('world.screens.width', 160, { min: 20, max: 600, hardMin: 1, unit: 'm', tags: g, regen: true }),
};
const res = vars.int('world.screens.res', 320, { min: 64, max: 1024, hardMin: 16, hardMax: 2048, unit: 'px', tags: [...g, 'perf'], desc: 'width of the picture they show' });
const fps = vars.num('world.screens.fps', 15, { min: 1, max: 60, hardMin: 0.5, unit: 'Hz', tags: [...g, 'perf'], desc: 'how often the picture updates' });
const bright = vars.num('world.screens.brightness', 1.15, { min: 0, max: 3, hardMin: 0, tags: g, desc: 'above the bloom threshold the screens glow' });
const frameColor = vars.color('world.screens.frame', '#1d1b26', { tags: [...g, 'render'] });

/** Screens only in race mode, where there is a race to show. */
export const screens = computed<Screen[]>(() =>
  gameMode.value === 'race'
    ? placeScreens(track.value, { seed: seedVar.value, count: sv.count.value, width: sv.width.value, clearance: 1.6 })
    : [],
);

/**
 * The screens and the camera that films for them: its own cinematic director (separate shot state
 * from the main view), rendered into a texture a few times a second.
 */
export function createScreens(scene: THREE.Scene) {
  const group = new THREE.Group();
  scene.add(group);
  const frameMat = toon();
  const picMat = new THREE.MeshBasicMaterial({ toneMapped: false });
  let rt: THREE.WebGLRenderTarget | null = null;
  const cam = new THREE.PerspectiveCamera(50, 16 / 9, 0.5, 12000);
  cam.layers.enable(SKY_LAYER);
  const cine = newCineState(7331);
  const disposables: { dispose(): void }[] = [];
  let since = Infinity;

  effect(() => {
    const list = screens.value;
    for (const d of disposables.splice(0)) d.dispose();
    group.clear();
    if (!list.length) return;
    const pic = new THREE.PlaneGeometry(1, 1);
    const box = new THREE.BoxGeometry(1, 1, 1);
    const pics = new THREE.InstancedMesh(pic, picMat, list.length);
    const frames = new THREE.InstancedMesh(box, frameMat, list.length);
    const m = new THREE.Matrix4();
    const back = new THREE.Vector3();
    list.forEach((sc, i) => {
      pics.setMatrixAt(i, m.compose(sc.pos, sc.quat, new THREE.Vector3(sc.width, sc.height, 1)));
      // a slab behind the picture with a border round it
      back.set(0, 0, -sc.height * 0.04).applyQuaternion(sc.quat).add(sc.pos);
      frames.setMatrixAt(i, m.compose(back, sc.quat, new THREE.Vector3(sc.width * 1.06, sc.height * 1.1, sc.height * 0.06)));
    });
    group.add(pics, frames);
    disposables.push(pic, box, pics, frames);
  });

  return {
    group,
    /**
     * Film the ship for the screens (call before the main render). `sky.update` re-centres the sky
     * on whichever camera renders next.
     */
    update(renderer: THREE.WebGLRenderer, ship: ShipState, dt: number, sky: { update(c: THREE.Camera, pr: number): void }, main: THREE.Camera) {
      const on = onTrack() && screens.value.length > 0;
      group.visible = on;
      frameMat.color.set(frameColor.value);
      picMat.color.setScalar(bright.value);
      since += dt;
      // the director keeps cutting even between pictures
      if (!on) return;
      placeCinematic(cam, ship, dt, cine, 50);
      if (since < 1 / fps.value) return;
      since = 0;
      const w = Math.max(16, Math.round(res.value));
      const h = Math.round((w * 9) / 16);
      if (!rt || rt.width !== w) {
        rt?.dispose();
        rt = new THREE.WebGLRenderTarget(w, h, { colorSpace: THREE.SRGBColorSpace });
        picMat.map = rt.texture;
        picMat.needsUpdate = true;
      }
      cam.aspect = 16 / 9;
      cam.updateProjectionMatrix();
      const prev = renderer.getRenderTarget();
      sky.update(cam, 1);
      renderer.setRenderTarget(rt);
      renderer.render(group.parent as THREE.Scene, cam);
      renderer.setRenderTarget(prev);
      sky.update(main, renderer.getPixelRatio());
    },
  };
}
