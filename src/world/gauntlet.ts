import * as THREE from 'three';
import { computed, effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { toon } from '../render/toon';
import { CHUNK_KINDS, generateGauntlet, pointOnTrack, sampleAt, slotWidth, type Gauntlet, type GauntletParams, type Plane } from '../gen/gauntlet';
import { gameMode, seedVar, track } from './race';

export const shipRadius = vars.num('ship.radius', 1.5, { min: 0.2, max: 6, hardMin: 0.05, unit: 'm', tags: ['ship', 'race'], desc: 'collision sphere' });
export const nearMissDistance = vars.num('race.nearMiss', 2.5, {
  min: 0,
  max: 10,
  hardMin: 0,
  unit: 'm',
  tags: ['race', 'juice'],
  desc: 'passing an obstacle with less than this to spare counts as a near miss',
});

const g = ['gen', 'gauntlet'];
const gp = {
  chunkLength: vars.num('gen.gauntlet.chunkLength', 140, { min: 40, max: 400, hardMin: 20, unit: 'm', tags: g, regen: true, desc: 'track length per obstacle chunk' }),
  lead: vars.num('gen.gauntlet.lead', 200, { min: 0, max: 1000, hardMin: 0, unit: 'm', tags: g, regen: true, desc: 'clear run-up after the start line' }),
  rampStart: vars.num('gen.gauntlet.rampStart', 0.1, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: g, regen: true, desc: 'difficulty of the first chunk' }),
  rampEnd: vars.num('gen.gauntlet.rampEnd', 1, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: g, regen: true, desc: 'difficulty of the last chunk' }),
  minClearance: vars.num('gen.gauntlet.minClearance', 1.8, { min: 1.1, max: 6, hardMin: 1.05, unit: '× ship', tags: g, regen: true, desc: 'tightest gap at full difficulty, in ship radii' }),
};
const kinds = CHUNK_KINDS.map((k) => [k, vars.bool(`gen.gauntlet.kinds.${k}`, true, { tags: g, regen: true })] as const);

const rt = ['render', 'gauntlet'];
const solidColor = vars.color('render.gauntlet.color', '#ff7a3d', { tags: rt });
const trimColor = vars.color('render.gauntlet.trim', '#2a2440', { tags: rt });
const laserColor = vars.color('render.gauntlet.laser', '#ff2f5a', { tags: rt });
const laserGlow = vars.num('render.gauntlet.laserGlow', 2.5, { min: 0, max: 8, hardMin: 0, tags: rt, desc: 'above the bloom threshold lasers glow' });
const rockColor = vars.color('render.gauntlet.rock', '#8b86a8', { tags: rt });

export const gauntletParams = computed<GauntletParams>(() => ({
  seed: seedVar.value,
  chunkLength: gp.chunkLength.value,
  lead: gp.lead.value,
  rampStart: gp.rampStart.value,
  rampEnd: gp.rampEnd.value,
  minClearance: gp.minClearance.value,
  shipRadius: shipRadius.value,
  kinds: kinds.filter(([, v]) => v.value).map(([k]) => k),
}));
/** The obstacle layout in gauntlet mode, null otherwise. */
export const gauntlet = computed<Gauntlet | null>(() => (gameMode.value === 'gauntlet' ? generateGauntlet(track.value, gauntletParams.value) : null));

const TAU = Math.PI * 2;

/** Meshes for one plane obstacle; `spin` is rotated about the track tangent over time. */
function planeMesh(pl: Plane, R: number, solid: THREE.Material, trim: THREE.Material, laser: THREE.Material, own: { dispose(): void }[]) {
  const spin = new THREE.Group();
  const sh = pl.shape;
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, rotZ = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, 0);
    m.rotation.z = rotZ;
    spin.add(m);
    own.push(geo);
    return m;
  };
  let update: (t: number) => void = () => {};

  if (sh.k === 'hole') {
    const disc = new THREE.Shape().absarc(0, 0, R, 0, TAU, false);
    disc.holes.push(new THREE.Path().absarc(sh.r, 0, sh.gap, 0, TAU, true));
    const geo = new THREE.ExtrudeGeometry(disc, { depth: pl.thickness, bevelEnabled: false, curveSegments: 40 });
    geo.translate(0, 0, -pl.thickness / 2);
    add(geo, solid);
    // a rim around the hole so it reads at speed
    add(new THREE.TorusGeometry(sh.gap, 0.35, 6, 32), trim, sh.r, 0);
    update = (t) => void (spin.rotation.z = sh.a0 + sh.omega * t);
  } else if (sh.k === 'slot') {
    spin.rotation.z = sh.angle;
    const jaws = [-1, 1].map((side) => add(new THREE.BoxGeometry(R, 2 * R, pl.thickness), side < 0 ? solid : trim));
    update = (t) => {
      const w = slotWidth(sh, t);
      jaws[0].position.x = sh.u0 - w / 2 - R / 2;
      jaws[1].position.x = sh.u0 + w / 2 + R / 2;
    };
  } else if (sh.k === 'beams') {
    for (let set = 0; set < (sh.crossed ? 2 : 1); set++) {
      const off = set ? sh.oy : sh.ox;
      for (let k = -sh.count; k < sh.count; k++) {
        const o = off + (k + 0.5) * sh.spacing;
        if (Math.abs(o) >= R) continue;
        const half = Math.sqrt(R * R - o * o);
        const geo = new THREE.CylinderGeometry(sh.width / 2, sh.width / 2, 2 * half, 6);
        // cylinder runs along Y: set 0 lines are at x = o (along y); set 1 at y = o (along x)
        if (set === 0) add(geo, laser, o, 0);
        else add(geo, laser, 0, o, Math.PI / 2);
      }
    }
    update = (t) => void (spin.rotation.z = sh.a0 + sh.omega * t);
  } else {
    const hub = add(new THREE.CylinderGeometry(sh.hub, sh.hub, pl.thickness * 2, 16), trim);
    hub.rotation.x = Math.PI / 2;
    const len = sh.reach - sh.hub;
    for (let k = 0; k < sh.n; k++) {
      const a = (TAU * k) / sh.n;
      const geo = new THREE.BoxGeometry(len, sh.width, pl.thickness);
      add(geo, solid, Math.cos(a) * (sh.hub + len / 2), Math.sin(a) * (sh.hub + len / 2), a);
    }
    update = (t) => void (spin.rotation.z = sh.a0 + sh.omega * t);
  }
  update(0);
  return { spin, update };
}

/** Obstacle meshes for gauntlet mode; rebuilt when the layout changes, animated by sim time. */
export function createGauntletScene(scene: THREE.Scene) {
  const group = new THREE.Group();
  scene.add(group);
  const solid = toon({ side: THREE.DoubleSide });
  const trim = toon();
  const rockMat = toon();
  const laser = new THREE.MeshBasicMaterial();
  const own: { dispose(): void }[] = [];
  let updaters: ((t: number) => void)[] = [];
  const m4 = new THREE.Matrix4();
  const p = new THREE.Vector3();

  effect(() => {
    const gl = gauntlet.value;
    const t = track.value;
    for (const d of own.splice(0)) d.dispose();
    group.clear();
    updaters = [];
    if (!gl) return;
    for (const pl of gl.planes) {
      const i = sampleAt(t, pl.s);
      const holder = new THREE.Group();
      // local X → right, Y → up, Z → along the track
      m4.makeBasis(t.right[i], t.up[i], t.tan[i]).setPosition(pointOnTrack(t, pl.s, 0, 0, p));
      holder.applyMatrix4(m4);
      const { spin, update } = planeMesh(pl, t.radius, solid, trim, laser, own);
      holder.add(spin);
      group.add(holder);
      updaters.push(update);
    }
    if (gl.rocks.length) {
      const geo = new THREE.IcosahedronGeometry(1, 0);
      const rocks = new THREE.InstancedMesh(geo, rockMat, gl.rocks.length);
      const q = new THREE.Quaternion();
      const e = new THREE.Euler();
      gl.rocks.forEach((r, k) => {
        e.set(r.s * 1.3, r.x * 0.7, r.y * 0.9);
        m4.compose(pointOnTrack(t, r.s, r.x, r.y, p), q.setFromEuler(e), new THREE.Vector3(r.r, r.r, r.r));
        rocks.setMatrixAt(k, m4);
      });
      rocks.instanceMatrix.needsUpdate = true;
      group.add(rocks);
      own.push(geo, rocks);
    }
  });

  return {
    group,
    /** `time`: sim seconds since spawn, interpolated */
    update(time: number) {
      group.visible = gameMode.value === 'gauntlet';
      solid.color.set(solidColor.value);
      trim.color.set(trimColor.value);
      rockMat.color.set(rockColor.value);
      laser.color.set(laserColor.value).multiplyScalar(laserGlow.value);
      if (group.visible) for (const u of updaters) u(time);
    },
  };
}
