// The renderer, scene, camera and everything drawn in it, sized to the window.
import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { createShipModel } from '../render/shipModel';
import { createRivalModels } from '../render/rivals';
import { createSky } from '../render/sky';
import { createPipeline } from '../render/pipeline';
import { createViewports } from '../render/viewports';
import { createField } from '../world/field';
import { createScenery } from '../world/scenery';
import { createScreens } from '../world/screens';
import { createPadScene } from '../world/pads';
import { createRaceScene } from '../world/race';
import { createProvingScene } from '../world/proving';
import { createGauntletScene } from '../world/gauntlet';
import { createJuice } from '../juice';
import { createHud } from '../ui/hud';
import { createHudLayout } from '../ui/hudLayout';
import { createLetterbox } from '../ui/letterbox';
import { pixelRatio } from './tuning';

export type Stage = ReturnType<typeof createStage>;

export function createStage() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  document.body.appendChild(renderer.domElement);

  renderer.info.autoReset = false; // several passes per frame: count them all
  const pipeline = createPipeline(renderer);

  const scene = new THREE.Scene();
  const sky = createSky(scene);
  // far enough for venue floors and scenery a few kilometres off
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 12000);
  const sun = new THREE.DirectionalLight();
  const amb = new THREE.AmbientLight(0x8899ff);
  scene.add(sun, amb);

  const shipModel = createShipModel();
  scene.add(shipModel.object);
  const rivalModels = createRivalModels(scene, shipModel.object);
  const field = createField(scene);
  const raceScene = createRaceScene(scene);
  const sceneryScene = createScenery(scene);
  const screensScene = createScreens(scene);
  const gauntletScene = createGauntletScene(scene);
  const padScene = createPadScene(scene);
  const provingScene = createProvingScene(scene);
  const juice = createJuice(scene, () => vars.get('ship.glow')?.value as string ?? '#7fe7ff');
  const hud = createHud();
  const viewports = createViewports(renderer, scene, sky);
  const hudLayout = createHudLayout(hud.elements);
  const letterboxUi = createLetterbox();

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

  return {
    renderer, pipeline, scene, sky, camera, sun, amb,
    shipModel, rivalModels, field, raceScene, sceneryScene, screensScene, gauntletScene, padScene, provingScene,
    juice, hud, viewports, hudLayout, letterboxUi,
  };
}
