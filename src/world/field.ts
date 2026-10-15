import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { rng } from '../core/rng';
import { toon } from '../render/toon';

const tags = ['world'];
const seed = vars.int('world.seed', 1, { min: 0, max: 99999, hardMin: 0, tags, regen: true });
const count = vars.int('world.rocks.count', 400, { min: 0, max: 3000, hardMin: 0, hardMax: 20000, tags, regen: true });
const radius = vars.num('world.rocks.radius', 900, { min: 100, max: 5000, hardMin: 10, unit: 'm', tags, regen: true });
const size = vars.num('world.rocks.size', 12, { min: 1, max: 60, hardMin: 0.1, unit: 'm', tags, regen: true, desc: 'max rock radius' });
const rings = vars.int('world.rings.count', 14, { min: 0, max: 60, hardMin: 0, hardMax: 500, tags, regen: true, desc: 'gates to fly through' });
const rockColor = vars.color('world.rocks.color', '#8b86a8', { tags: ['world', 'render'] });
const ringColor = vars.color('world.rings.color', '#ffd23f', { tags: ['world', 'render'] });

/** Seeded scenery so there's something to fly around: a rock field and a winding line of gates. */
export function createField(scene: THREE.Scene) {
  const rockMat = toon();
  const ringMat = toon();
  const rockGeo = new THREE.IcosahedronGeometry(1, 0);
  const ringGeo = new THREE.TorusGeometry(14, 1.2, 8, 32);
  let rocks: THREE.InstancedMesh | undefined;
  let gates: THREE.InstancedMesh | undefined;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const p = new THREE.Vector3();
  const s = new THREE.Vector3();

  effect(() => {
    const rand = rng(seed.value);
    const n = count.value;
    const r = radius.value;
    const max = size.value;
    if (rocks) {
      scene.remove(rocks);
      rocks.dispose();
    }
    rocks = new THREE.InstancedMesh(rockGeo, rockMat, n);
    for (let i = 0; i < n; i++) {
      // uniform in a sphere, keeping the spawn area clear
      do p.set(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
      while (p.lengthSq() > 1);
      p.multiplyScalar(r);
      if (p.length() < 60) p.setLength(60 + rand() * 40);
      const k = max * (0.15 + 0.85 * rand() ** 2);
      s.set(k * (0.7 + rand() * 0.6), k * (0.7 + rand() * 0.6), k * (0.7 + rand() * 0.6));
      q.setFromEuler(e.set(rand() * 6.3, rand() * 6.3, rand() * 6.3));
      rocks.setMatrixAt(i, m.compose(p, q, s));
    }
    scene.add(rocks);

    if (gates) {
      scene.remove(gates);
      gates.dispose();
    }
    gates = new THREE.InstancedMesh(ringGeo, ringMat, rings.value);
    // a gently wandering line of gates straight ahead of the spawn point
    const pos = new THREE.Vector3(0, 0, -80);
    const dir = new THREE.Vector3(0, 0, -1);
    s.set(1, 1, 1);
    for (let i = 0; i < rings.value; i++) {
      q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
      gates.setMatrixAt(i, m.compose(pos, q, s));
      dir.add(p.set(rand() - 0.5, (rand() - 0.5) * 0.6, 0).multiplyScalar(0.7)).normalize();
      if (dir.z > -0.6) dir.setZ(-0.6).normalize(); // keep heading away from spawn
      pos.addScaledVector(dir, 110 + rand() * 60);
    }
    scene.add(gates);
  });

  return {
    update() {
      rockMat.color.set(rockColor.value);
      ringMat.color.set(ringColor.value);
    },
  };
}
