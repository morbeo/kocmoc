import * as THREE from 'three';
import { vars } from '../core/vars';
import { toon } from './toon';

const color = vars.color('ship.color', '#ff2fa8', { tags: ['ship', 'render'] });
const trim = vars.color('ship.trim', '#2a2440', { tags: ['ship', 'render'] });
const glow = vars.color('ship.glow', '#7fe7ff', { tags: ['ship', 'render'] });
const glowIntensity = vars.num('ship.glow.intensity', 3, { min: 0, max: 10, hardMin: 0, tags: ['ship', 'render'], desc: 'above the bloom threshold the engine glows' });

/** Low-poly ship pointing down -Z. `update` tints it and drives the engine glow (0..1). */
export function createShipModel() {
  const hull = toon();
  const dark = toon();
  const engine = new THREE.MeshBasicMaterial();

  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.55, 3.2, 6), hull);
  body.rotation.x = -Math.PI / 2; // cone tip → -Z
  const wings = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.1, 1.1), dark);
  wings.position.set(0, -0.1, 0.7);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.9), hull);
  fin.position.set(0, 0.45, 1.05);
  const tips = [-2.1, 2.1].map((x) => {
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 1.3), hull);
    tip.position.set(x, 0, 0.75);
    return tip;
  });
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.4, 0.3, 10), engine);
  nozzle.rotation.x = Math.PI / 2;
  nozzle.position.z = 1.65;
  g.add(body, wings, fin, ...tips, nozzle);

  const base = new THREE.Color();
  const hot = new THREE.Color();
  return {
    object: g,
    update(thrust: number) {
      hull.color.set(color.value);
      dark.color.set(trim.value);
      engine.color
        .copy(base.set(trim.value).lerp(hot.set(glow.value), 0.25 + 0.75 * thrust))
        .multiplyScalar(1 + (glowIntensity.value - 1) * thrust);
      nozzle.scale.set(1, 1 + thrust, 1);
    },
  };
}
