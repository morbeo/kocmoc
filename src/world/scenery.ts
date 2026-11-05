import * as THREE from 'three';
import { computed, effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { toon } from '../render/toon';
import { generateScenery, GROUND_MODES, SCENERY_KINDS, UNIT, type Scenery, type SceneryKind, type SceneryParams } from '../gen/scenery';
import { onTrack, seedVar, track } from './race';

const g = ['world', 'scenery'];
const sp = {
  kinds: vars.str('world.scenery.kinds', '', { tags: g, regen: true, desc: `comma-separated: ${SCENERY_KINDS.join(', ')}` }),
  count: vars.int('world.scenery.count', 120, { min: 0, max: 600, hardMin: 0, hardMax: 5000, tags: g, regen: true, desc: 'props per kind (ribs and halos a tenth)' }),
  size: vars.num('world.scenery.size', 60, { min: 5, max: 300, hardMin: 1, unit: 'm', tags: g, regen: true, desc: 'typical prop size' }),
  spread: vars.num('world.scenery.spread', 700, { min: 0, max: 3000, hardMin: 0, unit: 'm', tags: g, regen: true, desc: 'how far props spread from the corridor' }),
  clearance: vars.num('world.scenery.clearance', 1.6, { min: 1.1, max: 4, hardMin: 1.01, unit: '× tube', tags: g, regen: true, desc: 'props keep this far from the centreline' }),
  ground: vars.enum('world.ground', 'none', GROUND_MODES, { tags: g, regen: true, desc: 'a floor below the track, a ceiling above it, or both' }),
  gap: vars.num('world.ground.gap', 200, { min: 0, max: 2000, hardMin: 0, unit: 'm', tags: g, regen: true, desc: 'space between the track and the floor / ceiling' }),
};
const rt = ['world', 'scenery', 'render'];
const colorA = vars.color('world.scenery.color', '#6f5fa8', { tags: rt });
const colorB = vars.color('world.scenery.color2', '#c9b8e8', { tags: rt, desc: 'props mix between the two colours' });
const glowColor = vars.color('world.scenery.glow', '#7fe7ff', { tags: rt, desc: 'halos' });
const glow = vars.num('world.scenery.glowStrength', 1.6, { min: 0, max: 6, hardMin: 0, tags: rt, desc: 'above the bloom threshold halos glow' });
const floorColor = vars.color('world.ground.color', '#2b2050', { tags: rt });
const floorColor2 = vars.color('world.ground.color2', '#3b2d6b', { tags: rt, desc: 'alternate bands of the floor and ceiling' });
const bandWidth = vars.num('world.ground.band', 400, { min: 20, max: 4000, hardMin: 1, unit: 'm', tags: rt, regen: true, desc: 'width of the concentric floor bands' });

export const sceneryParams = computed<SceneryParams>(() => ({
  seed: seedVar.value,
  kinds: sp.kinds.value
    .split(',')
    .map((k) => k.trim())
    .filter((k): k is SceneryKind => (SCENERY_KINDS as readonly string[]).includes(k)),
  count: sp.count.value,
  size: sp.size.value,
  spread: sp.spread.value,
  ground: sp.ground.value,
  gap: sp.gap.value,
  clearance: sp.clearance.value,
}));
export const scenery = computed<Scenery>(() => generateScenery(track.value, sceneryParams.value));

/** Unit mesh per kind (see `propBalls` for the sizes placement assumes). */
function unitGeometry(kind: SceneryKind): THREE.BufferGeometry {
  switch (kind) {
    case 'spires':
      return new THREE.OctahedronGeometry(1, 0);
    case 'monoliths':
    case 'lattice':
      return new THREE.BoxGeometry(1, 1, 1);
    case 'peaks':
      // apex at -1, flat top at +1 once flipped: a cone of height 2 so scale.y is the half-height
      return new THREE.ConeGeometry(1, 2, 7, 1);
    case 'orbs':
      return new THREE.IcosahedronGeometry(1, 2);
    case 'shards':
      return new THREE.TetrahedronGeometry(1, 0);
    case 'columns':
      return new THREE.CylinderGeometry(1, 1, 2, 10, 1);
    case 'ribs':
      return new THREE.TorusGeometry(1, UNIT.ribTube, 6, 40, UNIT.ribArc).rotateZ(-(UNIT.ribArc - Math.PI) / 2);
    case 'halos':
      return new THREE.TorusGeometry(1, UNIT.haloTube, 6, 64);
  }
}

/** A flat disc of concentric colour bands at height `y`, `radius` across. */
function groundGeometry(centre: THREE.Vector3, y: number, radius: number, band: number, a: THREE.Color, b: THREE.Color): THREE.BufferGeometry {
  const rings = Math.min(200, Math.max(2, Math.ceil(radius / band)));
  const geo = new THREE.RingGeometry(0, radius, 64, rings).rotateX(-Math.PI / 2).translate(centre.x, y, centre.z);
  // flat-coloured bands: un-index so each band's quads own their colour
  const flat = geo.toNonIndexed();
  geo.dispose();
  const pos = flat.getAttribute('position');
  const color = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i += 3) {
    // colour a triangle by the ring its centre lies in
    let r = 0;
    for (let k = 0; k < 3; k++) r += Math.hypot(pos.getX(i + k) - centre.x, pos.getZ(i + k) - centre.z) / 3;
    const c = Math.floor(r / band) % 2 ? b : a;
    for (let k = 0; k < 3; k++) c.toArray(color, (i + k) * 3);
  }
  flat.setAttribute('color', new THREE.BufferAttribute(color, 3));
  flat.computeVertexNormals();
  return flat;
}

/** Scenery meshes for the race track; rebuilt when the track or the scenery vars change. */
export function createScenery(parent: THREE.Scene) {
  const group = new THREE.Group();
  parent.add(group);
  const solid = toon();
  const groundMat = toon({ vertexColors: true, side: THREE.DoubleSide });
  const glowMat = new THREE.MeshBasicMaterial();
  const disposables: { dispose(): void }[] = [];
  const ca = new THREE.Color();
  const cb = new THREE.Color();
  const tmp = new THREE.Color();
  const m = new THREE.Matrix4();

  effect(() => {
    const sc = scenery.value;
    ca.set(colorA.value);
    cb.set(colorB.value);
    const fa = new THREE.Color(floorColor.value);
    const fb = new THREE.Color(floorColor2.value);
    const band = bandWidth.value;
    for (const d of disposables.splice(0)) d.dispose();
    group.clear();

    for (const kind of SCENERY_KINDS) {
      const props = sc.props.filter((p) => p.kind === kind);
      if (!props.length) continue;
      const geo = unitGeometry(kind);
      const mesh = new THREE.InstancedMesh(geo, kind === 'halos' ? glowMat : solid, props.length);
      props.forEach((p, i) => {
        mesh.setMatrixAt(i, m.compose(p.pos, p.quat, p.scale));
        if (kind !== 'halos') mesh.setColorAt(i, tmp.copy(ca).lerp(cb, p.tint));
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
      group.add(mesh);
      disposables.push(geo, mesh);
    }
    // floor and ceiling reach well past the track so their edge sits near the far plane
    const radius = sc.extent + 6000;
    for (const y of [sc.floorY, sc.ceilY]) {
      if (y === null) continue;
      const geo = groundGeometry(sc.centre, y, radius, band, fa, fb);
      group.add(new THREE.Mesh(geo, groundMat));
      disposables.push(geo);
    }
  });

  return {
    group,
    update() {
      group.visible = onTrack();
      glowMat.color.set(glowColor.value).multiplyScalar(glow.value);
    },
  };
}
