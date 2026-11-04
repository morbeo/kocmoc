import * as THREE from 'three';
import { computed, effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { GATE_PATTERNS, generateProving, type ProvingCourse, type ProvingGenParams } from '../gen/proving';
import { pointOnTrack, sampleAt } from '../gen/gauntlet';
import type { ProvingRules, ProvingState } from '../sim/proving';
import { gameMode, seedVar, track } from './race';
import { shipRadius } from './gauntlet';

const g = ['gen', 'proving'];
const gp = {
  lead: vars.num('gen.proving.lead', 250, { min: 0, max: 1000, hardMin: 0, unit: 'm', tags: g, regen: true, desc: 'clear run-up after the start line' }),
  groupLength: vars.num('gen.proving.groupLength', 320, { min: 100, max: 1000, hardMin: 60, unit: 'm', tags: g, regen: true, desc: 'track length per gate group' }),
  gates: vars.int('gen.proving.gates', 4, { min: 1, max: 8, hardMin: 1, hardMax: 32, tags: g, regen: true, desc: 'gates per group' }),
  gateRadius: vars.num('gen.proving.gateRadius', 10, { min: 3, max: 25, hardMin: 1, unit: 'm', tags: g, regen: true, desc: 'gate opening at the easy end of the ramp' }),
  gateRadiusMin: vars.num('gen.proving.gateRadiusMin', 5, { min: 2.5, max: 25, hardMin: 1, unit: 'm', tags: g, regen: true, desc: 'gate opening at the hard end (never below 1.6 ship radii)' }),
  offsetMin: vars.num('gen.proving.offsetMin', 0.2, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: g, regen: true, desc: 'how far gates sit off the centre at the easy end, share of the room' }),
  offsetMax: vars.num('gen.proving.offsetMax', 0.7, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: g, regen: true, desc: 'how far gates sit off the centre at the hard end' }),
  rampStart: vars.num('gen.proving.rampStart', 0, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: g, regen: true, desc: 'difficulty of the first group' }),
  rampEnd: vars.num('gen.proving.rampEnd', 0.6, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: g, regen: true, desc: 'difficulty of the last group' }),
  beacons: vars.int('gen.proving.beacons', 1, { min: 0, max: 4, hardMin: 0, hardMax: 16, tags: g, regen: true, desc: 'time beacons per group, off the racing line' }),
  beaconRadius: vars.num('gen.proving.beaconRadius', 3, { min: 0.5, max: 10, hardMin: 0.2, unit: 'm', tags: g, regen: true, desc: 'pickup radius of a beacon' }),
};
const patterns = GATE_PATTERNS.map((k) => [k, vars.bool(`gen.proving.patterns.${k}`, k !== 'reverse', { tags: g, regen: true, desc: k === 'reverse' ? 'last gate of the group flown backwards' : undefined })] as const);

const rt = ['proving'];
const rules = {
  budget: vars.num('proving.budget', 120, { min: 10, max: 600, hardMin: 1, unit: 's', tags: rt, desc: 'time on the clock at the start line' }),
  gateBonus: vars.num('proving.gateBonus', 1, { min: 0, max: 20, hardMin: 0, unit: 's', tags: rt, desc: 'added for each gate flown through' }),
  missPenalty: vars.num('proving.missPenalty', 10, { min: 0, max: 30, hardMin: 0, unit: 's', tags: rt, desc: 'taken for passing a gate outside it' }),
  beaconBonus: vars.num('proving.beaconBonus', 5, { min: 0, max: 30, hardMin: 0, unit: 's', tags: rt, desc: 'added for each time beacon' }),
  oobPenalty: vars.num('proving.oobPenalty', 5, { min: 0, max: 30, hardMin: 0, unit: 's', tags: rt, desc: 'taken when out of bounds puts you back (open space)' }),
  reverseWindow: vars.num('proving.reverseWindow', 120, { min: 20, max: 500, hardMin: 1, unit: 'm', tags: rt, desc: 'a reverse gate is missed once you are this far past it' }),
  scoreTime: vars.num('proving.score.time', 10, { min: 0, max: 100, hardMin: 0, tags: rt, desc: 'points per second left' }),
  scoreGate: vars.num('proving.score.gate', 50, { min: 0, max: 500, hardMin: 0, tags: rt, desc: 'points per gate' }),
  scoreBeacon: vars.num('proving.score.beacon', 25, { min: 0, max: 500, hardMin: 0, tags: rt, desc: 'points per beacon' }),
};
/** The ladder level the current setup is (set by the level scenarios). */
export const provingLevel = vars.int('proving.level', 1, { min: 1, max: 20, hardMin: 1, hardMax: 999, tags: rt, desc: 'ladder level; 1–8 are bundled, beyond that they are generated' });

const vt = ['render', 'proving'];
const gateColor = vars.color('render.proving.gate', '#40e0ff', { tags: vt });
const reverseColor = vars.color('render.proving.reverse', '#ffb02e', { tags: vt, desc: 'gates to fly through backwards' });
const hitColor = vars.color('render.proving.hit', '#5dff9a', { tags: vt });
const missColor = vars.color('render.proving.miss', '#ff4060', { tags: vt });
const beaconColor = vars.color('render.proving.beacon', '#ffe14d', { tags: vt });
const glow = vars.num('render.proving.glow', 1.6, { min: 0, max: 6, hardMin: 0, tags: vt, desc: 'above the bloom threshold gates glow' });

export const provingParams = computed<ProvingGenParams>(() => ({
  seed: seedVar.value,
  lead: gp.lead.value,
  groupLength: gp.groupLength.value,
  gates: gp.gates.value,
  gateRadius: gp.gateRadius.value,
  gateRadiusMin: gp.gateRadiusMin.value,
  offsetMin: gp.offsetMin.value,
  offsetMax: gp.offsetMax.value,
  rampStart: gp.rampStart.value,
  rampEnd: gp.rampEnd.value,
  beacons: gp.beacons.value,
  beaconRadius: gp.beaconRadius.value,
  shipRadius: shipRadius.value,
  patterns: patterns.filter(([, v]) => v.value).map(([k]) => k),
}));

export const provingRules = (): ProvingRules => ({
  budget: rules.budget.value,
  gateBonus: rules.gateBonus.value,
  missPenalty: rules.missPenalty.value,
  beaconBonus: rules.beaconBonus.value,
  oobPenalty: rules.oobPenalty.value,
  reverseWindow: rules.reverseWindow.value,
  scoreTime: rules.scoreTime.value,
  scoreGate: rules.scoreGate.value,
  scoreBeacon: rules.scoreBeacon.value,
});

/** Gates and beacons in proving mode, null otherwise. */
export const provingCourse = computed<ProvingCourse | null>(() => (gameMode.value === 'proving' ? generateProving(track.value, provingParams.value) : null));

const TUBE = 0.45;
const _m = new THREE.Matrix4();
const _p = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _c = new THREE.Color();

/** Gate hoops and spinning beacons; gate colours follow the run (pending, credited, missed). */
export function createProvingScene(scene: THREE.Scene) {
  const group = new THREE.Group();
  scene.add(group);
  const gateMat = new THREE.MeshBasicMaterial();
  const beaconMat = new THREE.MeshBasicMaterial();
  const own: { dispose(): void }[] = [];
  /** one instanced mesh per gate radius; `ids` maps instance → gate index */
  let gateMeshes: { mesh: THREE.InstancedMesh; ids: number[] }[] = [];
  let beacons: THREE.InstancedMesh | null = null;
  let course: ProvingCourse | null = null;
  let colourKey = '';

  effect(() => {
    course = provingCourse.value;
    const t = track.value;
    for (const d of own.splice(0)) d.dispose();
    group.clear();
    gateMeshes = [];
    beacons = null;
    colourKey = '';
    if (!course) return;
    const byR = new Map<number, number[]>();
    course.gates.forEach((gt, k) => {
      const key = Math.round(gt.r * 100) / 100;
      byR.set(key, [...(byR.get(key) ?? []), k]);
    });
    for (const [r, ids] of byR) {
      const geo = new THREE.TorusGeometry(r, TUBE, 8, 40);
      const mesh = new THREE.InstancedMesh(geo, gateMat, ids.length);
      ids.forEach((k, j) => {
        const gt = course!.gates[k];
        const i = sampleAt(t, gt.s);
        _m.makeBasis(t.right[i], t.up[i], t.tan[i]).setPosition(pointOnTrack(t, gt.s, gt.x, gt.y, _p));
        mesh.setMatrixAt(j, _m);
        mesh.setColorAt(j, _c.set('#ffffff'));
      });
      mesh.instanceMatrix.needsUpdate = true;
      group.add(mesh);
      own.push(geo, mesh);
      gateMeshes.push({ mesh, ids });
    }
    if (course.beacons.length) {
      const geo = new THREE.OctahedronGeometry(1, 0);
      beacons = new THREE.InstancedMesh(geo, beaconMat, course.beacons.length);
      group.add(beacons);
      own.push(geo, beacons);
    }
  });

  return {
    group,
    /** `time`: sim seconds, for the beacon spin; `state`: the run, for gate colours and pickups */
    update(time: number, state: ProvingState | null) {
      group.visible = !!course;
      if (!course) return;
      const k = glow.value;
      gateMat.color.setScalar(k);
      beaconMat.color.set(beaconColor.value).multiplyScalar(k);
      const key = (state ? Array.from(state.gates).join('') : '') + gateColor.value + reverseColor.value + hitColor.value + missColor.value;
      if (key !== colourKey) {
        colourKey = key;
        for (const { mesh, ids } of gateMeshes) {
          ids.forEach((gi, j) => {
            const st = state?.gates[gi] ?? 0;
            _c.set(st > 0 ? hitColor.value : st < 0 ? missColor.value : course!.gates[gi].reverse ? reverseColor.value : gateColor.value);
            mesh.setColorAt(j, _c);
          });
          if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        }
      }
      if (beacons) {
        const t = track.value;
        course.beacons.forEach((b, j) => {
          const taken = !!state?.beacons[j];
          pointOnTrack(t, b.s, b.x, b.y, _p);
          _q.setFromAxisAngle(THREE.Object3D.DEFAULT_UP, time * 2 + j);
          const r = taken ? 0 : b.r * 0.6;
          _m.compose(_p, _q, _s.set(r, r * 1.4, r));
          beacons!.setMatrixAt(j, _m);
        });
        beacons.instanceMatrix.needsUpdate = true;
      }
    },
  };
}

/** World position of the next gate to fly, for the HUD arrow. */
export function nextGatePoint(course: ProvingCourse, state: ProvingState, out: THREE.Vector3): THREE.Vector3 | null {
  const k = state.gates.findIndex((x) => x === 0);
  if (k < 0) return null;
  const gt = course.gates[k];
  return pointOnTrack(track.value, gt.s, gt.x, gt.y, out);
}
