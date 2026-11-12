import * as THREE from 'three';
import { computed, effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { toon } from '../render/toon';
import { generatePads, padLane, type Pad, type PadParams } from '../gen/pads';
import { generateMovers, moverPose, type Mover, type MoverParams, type MoverPose } from '../gen/movers';
import { pointOnTrack, sampleAt } from '../gen/gauntlet';
import type { PadEffect } from '../sim/zones';
import { gameMode, seedVar, track } from './race';
import { gauntlet } from './gauntlet';

const g = ['gen', 'race', 'pad'];
const pv = {
  boosts: vars.int('gen.race.boostPads', 0, { min: 0, max: 16, hardMin: 0, hardMax: 64, tags: g, regen: true, desc: 'race mode: glowing strips along the wall that push you forward' }),
  slows: vars.int('gen.race.slowFields', 0, { min: 0, max: 12, hardMin: 0, hardMax: 64, tags: g, regen: true, desc: 'race mode: murky stretches that drag you down, with a clear lane along one wall' }),
  boostLength: vars.num('gen.race.boostLength', 60, { min: 10, max: 300, hardMin: 5, unit: 'm', tags: g, regen: true }),
  slowLength: vars.num('gen.race.slowLength', 160, { min: 20, max: 800, hardMin: 5, unit: 'm', tags: g, regen: true }),
};
const fxTags = ['race', 'pad'];
const fx = {
  accel: vars.num('race.pad.accel', 140, { min: 0, max: 600, hardMin: 0, unit: 'm/s²', tags: fxTags, desc: 'forward push over a boost strip' }),
  speed: vars.num('race.pad.speed', 230, { min: 10, max: 1200, hardMin: 1, unit: 'm/s', tags: fxTags, desc: 'boost strips push up to this speed' }),
  drag: vars.num('race.pad.drag', 1.1, { min: 0, max: 6, hardMin: 0, unit: '/s', tags: fxTags, desc: 'drag inside a slow field' }),
};
const mv = {
  perCavern: vars.int('gen.race.cavernMovers', 4, { min: 0, max: 12, hardMin: 0, hardMax: 40, tags: ['gen', 'race', 'section'], regen: true, desc: 'drifting slabs and falling rocks per cavern section' }),
  core: vars.num('gen.race.cavernCore', 0.6, { min: 0.3, max: 1.5, hardMin: 0.3, unit: '× tube', tags: ['gen', 'race', 'section'], regen: true, desc: 'cavern movers never come closer to the centreline than this' }),
};
const rt = ['render', 'pad'];
const boostColor = vars.color('render.pad.boost', '#3dffb0', { tags: rt });
const boostGlow = vars.num('render.pad.glow', 2.2, { min: 0, max: 6, hardMin: 0, tags: rt, desc: 'above the bloom threshold boost strips glow' });
const slowColor = vars.color('render.pad.slow', '#6a4a8c', { tags: rt });
const slowOpacity = vars.num('render.pad.slowOpacity', 0.45, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: rt });
const slabColor = vars.color('render.mover.slab', '#8a7a68', { tags: ['render', 'mover'] });
const rockColor = vars.color('render.mover.rock', '#6b5a4a', { tags: ['render', 'mover'] });

export const padParams = computed<PadParams>(() => ({
  seed: seedVar.value,
  boosts: gameMode.value === 'race' ? pv.boosts.value : 0,
  slows: gameMode.value === 'race' ? pv.slows.value : 0,
  boostLength: pv.boostLength.value,
  slowLength: pv.slowLength.value,
}));
export const pads = computed<Pad[]>(() => {
  const p = padParams.value;
  if (!p.boosts && !p.slows) return [];
  return generatePads(track.value, { ...p, avoid: gauntlet.value?.planes.map((q) => q.s) });
});
/** Where the autopilot flies through each pad: over the strip, down the clear lane. */
export const padLanes = computed(() => {
  const R = track.value.radius;
  return pads.value.map((p) => {
    const [x, y] = padLane(p, R);
    return { s0: p.s0, s1: p.s1, x, y, fast: true };
  });
});
export const padEffect = (): PadEffect => ({ accel: fx.accel.value, speed: fx.speed.value, drag: fx.drag.value });

export const moverParams = computed<MoverParams>(() => ({ seed: seedVar.value, perCavern: gameMode.value === 'race' ? mv.perCavern.value : 0, core: mv.core.value }));
export const movers = computed<Mover[]>(() => generateMovers(track.value, moverParams.value));

const TAU = Math.PI * 2;

/** A ribbon along the wall at angle `theta`, between angles ±half, with chevrons pointing along the track. */
function boostGeometry(p: Pad, R: number): { strip: THREE.BufferGeometry; arrows: THREE.BufferGeometry } {
  const t = track.value;
  const strip: number[] = [];
  const arrows: number[] = [];
  const v = new THREE.Vector3();
  const at = (s: number, a: number, r: number, out: number[]) => {
    pointOnTrack(t, s, r * Math.cos(a), r * Math.sin(a), v);
    out.push(v.x, v.y, v.z);
  };
  const r0 = R * 0.985;
  const r1 = R * 0.975;
  const step = 4;
  for (let s = p.s0; s < p.s1; s += step) {
    const s2 = Math.min(p.s1, s + step);
    const [a, b] = [p.theta - p.half, p.theta + p.half];
    at(s, a, r0, strip); at(s2, a, r0, strip); at(s, b, r0, strip);
    at(s2, a, r0, strip); at(s2, b, r0, strip); at(s, b, r0, strip);
  }
  // chevrons: a V every 12 m, tip forward
  const h = p.half * 0.8;
  for (let s = p.s0 + 4; s + 8 < p.s1; s += 12) {
    for (const side of [-1, 1]) {
      const outer = p.theta + side * h;
      at(s, outer, r1, arrows); at(s + 5, p.theta, r1, arrows); at(s + 2.5, outer, r1, arrows);
      at(s + 2.5, outer, r1, arrows); at(s + 5, p.theta, r1, arrows); at(s + 7.5, p.theta, r1, arrows);
    }
  }
  const mk = (a: number[]) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(a, 3));
    return geo;
  };
  return { strip: mk(strip), arrows: mk(arrows) };
}

/** The murk of a slow field: the tube's cross-section cut by the lane's chord, swept along, capped at both ends. */
function slowGeometry(p: Pad, R: number): { murk: THREE.BufferGeometry; edges: THREE.BufferGeometry } {
  const t = track.value;
  const n = 32;
  const c = Math.cos(p.theta);
  const sn = Math.sin(p.theta);
  const rr = R * 0.97;
  const prof: [number, number][] = [];
  for (let k = 0; k < n; k++) {
    let x = rr * Math.cos((k / n) * TAU);
    let y = rr * Math.sin((k / n) * TAU);
    const d = x * c + y * sn - p.w;
    if (d > 0) {
      x -= d * c;
      y -= d * sn;
    }
    prof.push([x, y]);
  }
  const pos: number[] = [];
  const v = new THREE.Vector3();
  const ring = (s: number) =>
    prof.map(([x, y]) => {
      pointOnTrack(t, s, x, y, v);
      return [v.x, v.y, v.z] as const;
    });
  const step = 6;
  // outlines of the murk's cross-section at both ends and every 40 m, so its shape reads at speed
  const lines: number[] = [];
  const outline = (r: (readonly [number, number, number])[]) => {
    for (let k = 0; k < n; k++) lines.push(...r[k], ...r[(k + 1) % n]);
  };
  for (let s = p.s0; s < p.s1; s += 40) outline(ring(s));
  outline(ring(p.s1));
  let prev = ring(p.s0);
  const push = (...ps: (readonly [number, number, number])[]) => ps.forEach((q) => pos.push(...q));
  const cap = (r: (readonly [number, number, number])[], s: number) => {
    // the profile is convex: a fan from its middle
    const cx = prof.reduce((a, q) => a + q[0], 0) / n;
    const cy = prof.reduce((a, q) => a + q[1], 0) / n;
    pointOnTrack(t, s, cx, cy, v);
    const mid = [v.x, v.y, v.z] as const;
    for (let k = 0; k < n; k++) push(mid, r[k], r[(k + 1) % n]);
  };
  cap(prev, p.s0);
  for (let s = p.s0 + step; ; s += step) {
    const ss = Math.min(p.s1, s);
    const cur = ring(ss);
    for (let k = 0; k < n; k++) {
      const k2 = (k + 1) % n;
      push(prev[k], cur[k], prev[k2], prev[k2], cur[k], cur[k2]);
    }
    prev = cur;
    if (ss >= p.s1) break;
  }
  cap(prev, p.s1);
  const murk = new THREE.BufferGeometry();
  murk.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const edges = new THREE.BufferGeometry();
  edges.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
  return { murk, edges };
}

/** Boost strips, slow fields and cavern movers; strips pulse, movers follow the sim clock. */
export function createPadScene(scene: THREE.Scene) {
  const group = new THREE.Group();
  scene.add(group);
  const stripMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
  const arrowMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const murkMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, depthWrite: false });
  const edgeMat = new THREE.LineBasicMaterial();
  const slabMat = toon();
  const rockMat = toon();
  const own: { dispose(): void }[] = [];
  let slabs: { mesh: THREE.InstancedMesh; list: Mover[] } | null = null;
  let rocks: { mesh: THREE.InstancedMesh; list: Mover[] } | null = null;
  const m4 = new THREE.Matrix4();
  const basis = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const qa = new THREE.Quaternion();
  const p = new THREE.Vector3();
  const sc = new THREE.Vector3();
  const Z = new THREE.Vector3(0, 0, 1);
  const fwd = new THREE.Vector3();
  const pose: MoverPose = { x: 0, y: 0, vx: 0, vy: 0, active: true };

  effect(() => {
    const list = pads.value;
    const ms = movers.value;
    const t = track.value;
    for (const d of own.splice(0)) d.dispose();
    group.clear();
    slabs = rocks = null;
    for (const pad of list) {
      if (pad.kind === 'boost') {
        const { strip, arrows } = boostGeometry(pad, t.radius);
        group.add(new THREE.Mesh(strip, stripMat), new THREE.Mesh(arrows, arrowMat));
        own.push(strip, arrows);
      } else {
        const { murk, edges } = slowGeometry(pad, t.radius);
        const mesh = new THREE.Mesh(murk, murkMat);
        mesh.renderOrder = 2;
        group.add(mesh, new THREE.LineSegments(edges, edgeMat));
        own.push(murk, edges);
      }
    }
    const sl = ms.filter((m) => m.kind === 'slab');
    const rk = ms.filter((m) => m.kind === 'rock');
    if (sl.length) {
      const geo = new THREE.BoxGeometry(2, 2, 2);
      slabs = { mesh: new THREE.InstancedMesh(geo, slabMat, sl.length), list: sl };
      slabs.mesh.frustumCulled = false;
      group.add(slabs.mesh);
      own.push(geo, slabs.mesh);
    }
    if (rk.length) {
      const geo = new THREE.DodecahedronGeometry(1, 0);
      rocks = { mesh: new THREE.InstancedMesh(geo, rockMat, rk.length), list: rk };
      rocks.mesh.frustumCulled = false;
      group.add(rocks.mesh);
      own.push(geo, rocks.mesh);
    }
  });

  return {
    group,
    /** `time`: sim seconds since spawn, interpolated */
    update(time: number) {
      group.visible = gameMode.value === 'race' && group.children.length > 0;
      if (!group.visible) return;
      const t = track.value;
      // strips pulse so they read as live
      const pulse = 0.75 + 0.25 * Math.sin(time * 6);
      arrowMat.color.set(boostColor.value).multiplyScalar(boostGlow.value * pulse);
      stripMat.color.set(boostColor.value);
      murkMat.color.set(slowColor.value);
      murkMat.opacity = slowOpacity.value;
      edgeMat.color.set(slowColor.value).offsetHSL(0, 0, 0.25);
      slabMat.color.set(slabColor.value);
      rockMat.color.set(rockColor.value);
      for (const set of [slabs, rocks]) {
        if (!set) continue;
        set.list.forEach((m, k) => {
          moverPose(m, time, pose);
          const i = sampleAt(t, m.s);
          // a right-handed basis for the quaternion (flip the tangent if the frame is left-handed)
          fwd.crossVectors(t.right[i], t.up[i]);
          if (fwd.dot(t.tan[i]) < 0) fwd.negate();
          basis.makeBasis(t.right[i], t.up[i], fwd);
          q.setFromRotationMatrix(basis);
          pointOnTrack(t, m.s, pose.x, pose.y, p);
          if (m.kind === 'slab') {
            q.multiply(qa.setFromAxisAngle(Z, m.a));
            sc.set(m.hw, m.ht, m.hl);
          } else {
            q.multiply(qa.setFromAxisAngle(Z, m.s));
            sc.setScalar(pose.active ? m.r : 0);
          }
          set.mesh.setMatrixAt(k, m4.compose(p, q, sc));
        });
        set.mesh.instanceMatrix.needsUpdate = true;
      }
    },
  };
}
