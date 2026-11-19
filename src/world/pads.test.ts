import { afterEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { vars } from '../core/vars';
import { GAME_MODES } from '../core/scenarios';
import { generatePads, padLane } from '../gen/pads';
import { moverPose } from '../gen/movers';
import { pointOnTrack } from '../gen/gauntlet';
import { track } from './race';
import { gauntlet } from './gauntlet';
import { createPadScene, moverParams, movers, padEffect, padLanes, padParams, pads } from './pads';

// the scene's effect lives as long as the page; a test stops each one it started, or every later var change would rebuild all the old scenes
const effects = vi.hoisted(() => ({ stop: [] as (() => void)[] }));
vi.mock('@preact/signals-core', async (original) => {
  const signals = await original<typeof import('@preact/signals-core')>();
  return { ...signals, effect: (fn: () => void) => { const stop = signals.effect(fn); effects.stop.push(stop); return stop; } };
});

const touched = new Set<string>();
const set = (path: string, value: unknown) => {
  touched.add(path);
  vars.set(path, value);
};
afterEach(() => {
  for (const stop of effects.stop.splice(0)) stop();
  for (const p of touched) vars.unset(p);
  touched.clear();
});

/** A quick race track (a loop about 25 tube radii wide, like the var's description advises) with caverns, boost strips and slow fields. */
const course = (over: Record<string, unknown> = {}) => {
  const vals: Record<string, unknown> = {
    'game.mode': 'race', 'gen.race.points': 10, 'gen.race.radius': 1000, 'gen.race.tubeRadius': 40, 'gen.race.spacing': 8, 'gen.race.forks': 0, 'gen.race.pitLane': false,
    'gen.race.sections': 3, 'gen.race.sectionKinds': 'cavern,hex', 'gen.race.sectionMin': 300, 'gen.race.sectionMax': 500,
    'gen.race.boostPads': 4, 'gen.race.slowFields': 3, 'gen.race.cavernMovers': 4, ...over,
  };
  for (const [k, v] of Object.entries(vals)) set(k, v);
};
const meshes = (g: THREE.Group) => g.children as THREE.Object3D[];
const colorOf = (m: THREE.Mesh | THREE.LineSegments) => (m.material as THREE.MeshBasicMaterial).color;

describe('padParams', () => {
  it('follows the vars and the seed, in race mode', () => {
    set('game.mode', 'race');
    set('gen.race.seed', 5);
    set('gen.race.boostPads', 4);
    set('gen.race.slowFields', 2);
    set('gen.race.boostLength', 70);
    set('gen.race.slowLength', 180);
    expect(padParams.value).toEqual({ seed: 5, boosts: 4, slows: 2, boostLength: 70, slowLength: 180 });
  });

  it('has no pads in any other mode', () => {
    set('gen.race.boostPads', 4);
    set('gen.race.slowFields', 2);
    for (const mode of GAME_MODES.filter((m) => m !== 'race')) {
      set('game.mode', mode);
      expect(padParams.value.boosts).toBe(0);
      expect(padParams.value.slows).toBe(0);
    }
  });

  it('feeds the effects the race.pad vars', () => {
    expect(padEffect()).toEqual({ accel: 140, speed: 230, drag: 1.1 });
    set('race.pad.accel', 10);
    set('race.pad.speed', 20);
    set('race.pad.drag', 3);
    expect(padEffect()).toEqual({ accel: 10, speed: 20, drag: 3 });
  });
});

describe('pads', () => {
  it('is empty without boost strips or slow fields', () => {
    course({ 'gen.race.boostPads': 0, 'gen.race.slowFields': 0 });
    expect(pads.value).toEqual([]);
    expect(padLanes.value).toEqual([]);
  });

  it('places both kinds on the generated track', () => {
    course();
    const list = pads.value;
    expect(list.some((p) => p.kind === 'boost')).toBe(true);
    expect(list.some((p) => p.kind === 'slow')).toBe(true);
    expect(list).toEqual(generatePads(track.value, { ...padParams.value, avoid: undefined }));
  });

  it('keeps clear of the race hazards', () => {
    course();
    const free = pads.value;
    set('gen.race.hazards', 6);
    const planes = gauntlet.value!.planes;
    expect(planes.length).toBeGreaterThan(0);
    const R = track.value.radius;
    for (const p of pads.value) for (const q of planes) expect(p.s1 < q.s - R * 2 || p.s0 > q.s + R * 2).toBe(true);
    expect(pads.value).toEqual(generatePads(track.value, { ...padParams.value, avoid: planes.map((q) => q.s) }));
    expect(free.length).toBeGreaterThan(0);
  });

  it('gives the autopilot a lane through each pad: over the strip, along the clear lane', () => {
    course();
    const R = track.value.radius;
    expect(padLanes.value).toHaveLength(pads.value.length);
    padLanes.value.forEach((l, k) => {
      const p = pads.value[k];
      const [x, y] = padLane(p, R);
      expect(l).toEqual({ s0: p.s0, s1: p.s1, x, y, fast: true });
    });
  });
});

describe('movers', () => {
  it('are drifting slabs and falling rocks in the caverns, in race mode only', () => {
    course({ 'gen.race.sectionKinds': 'cavern' });
    expect(moverParams.value).toMatchObject({ perCavern: 4, core: 0.6 });
    expect(movers.value.length).toBeGreaterThan(0);
    set('gen.race.cavernCore', 1);
    expect(moverParams.value.core).toBe(1);
    set('game.mode', 'gauntlet');
    expect(moverParams.value.perCavern).toBe(0);
    expect(movers.value).toEqual([]);
  });
});

describe('createPadScene', () => {
  it('builds a ribbon and chevrons per boost strip and a murk and outline per slow field', () => {
    course({ 'gen.race.sectionKinds': 'hex' });
    const scene = new THREE.Scene();
    const ps = createPadScene(scene);
    expect(scene.children).toEqual([ps.group]);
    const boosts = pads.value.filter((p) => p.kind === 'boost').length;
    const slows = pads.value.filter((p) => p.kind === 'slow').length;
    expect(boosts).toBeGreaterThan(0);
    expect(slows).toBeGreaterThan(0);
    expect(ps.group.children).toHaveLength(boosts * 2 + slows * 2);
    const murk = meshes(ps.group).filter((o) => (o as THREE.Mesh).isMesh && o.renderOrder === 2);
    expect(murk).toHaveLength(slows);
    expect(meshes(ps.group).filter((o) => (o as THREE.LineSegments).isLineSegments)).toHaveLength(slows);
    for (const o of meshes(ps.group)) expect((o as THREE.Mesh).geometry.getAttribute('position').count).toBeGreaterThan(0);
  });

  it('puts the strip along the wall, between the lane edges of the pad', () => {
    course({ 'gen.race.sectionKinds': 'hex', 'gen.race.slowFields': 0 });
    const ps = createPadScene(new THREE.Scene());
    const pad = pads.value.find((p) => p.kind === 'boost')!;
    const t = track.value;
    const strip = (meshes(ps.group)[0] as THREE.Mesh).geometry.getAttribute('position');
    const v = new THREE.Vector3(strip.getX(0), strip.getY(0), strip.getZ(0));
    const a = pad.theta - pad.half;
    const expected = pointOnTrack(t, pad.s0, t.radius * 0.985 * Math.cos(a), t.radius * 0.985 * Math.sin(a), new THREE.Vector3());
    expect(v.distanceTo(expected)).toBeLessThan(1e-3);
    // a ribbon of two triangles per 4 m step, then the chevrons: two Vs per 12 m
    const steps = Math.ceil((pad.s1 - pad.s0) / 4);
    expect(strip.count).toBe(steps * 6);
  });

  it('adds an instanced mesh each for slabs and rocks in the caverns', () => {
    course({ 'gen.race.sectionKinds': 'cavern', 'gen.race.boostPads': 0, 'gen.race.slowFields': 0 });
    const ps = createPadScene(new THREE.Scene());
    const inst = meshes(ps.group) as THREE.InstancedMesh[];
    const slabs = movers.value.filter((m) => m.kind === 'slab').length;
    const rocks = movers.value.filter((m) => m.kind === 'rock').length;
    expect(inst.map((m) => m.count).sort()).toEqual([slabs, rocks].filter(Boolean).sort());
    for (const m of inst) expect(m.frustumCulled).toBe(false);
    // only one kind in the world? then there is one mesh
    expect(inst).toHaveLength(Number(slabs > 0) + Number(rocks > 0));
  });

  it('frees the old geometry and rebuilds when the pads change', () => {
    course();
    const ps = createPadScene(new THREE.Scene());
    const first = meshes(ps.group)[0] as THREE.Mesh;
    let disposed = 0;
    first.geometry.addEventListener('dispose', () => disposed++);
    set('gen.race.seed', 12);
    expect(disposed).toBe(1);
    expect(meshes(ps.group)[0]).not.toBe(first);
    set('gen.race.boostPads', 0);
    set('gen.race.slowFields', 0);
    set('gen.race.cavernMovers', 0);
    expect(ps.group.children).toHaveLength(0);
  });

  it('is hidden outside race mode and when empty, and shows otherwise', () => {
    course();
    const ps = createPadScene(new THREE.Scene());
    ps.update(0);
    expect(ps.group.visible).toBe(true);
    set('game.mode', 'free');
    ps.update(0);
    expect(ps.group.visible).toBe(false);
    course({ 'gen.race.boostPads': 0, 'gen.race.slowFields': 0, 'gen.race.cavernMovers': 0 });
    ps.update(0);
    expect(ps.group.visible).toBe(false);
  });

  it('pulses the arrows over time and colours the strips, murk and movers from the render vars', () => {
    course({ 'gen.race.sectionKinds': 'hex' });
    const ps = createPadScene(new THREE.Scene());
    set('render.pad.boost', '#ff0000');
    set('render.pad.glow', 2);
    set('render.pad.slow', '#0000ff');
    set('render.pad.slowOpacity', 0.25);
    const [strip, arrows] = meshes(ps.group) as THREE.Mesh[];
    ps.update(0); // sin 0 = 0: the pulse is at its low, 0.75
    expect(colorOf(arrows).r).toBeCloseTo(2 * 0.75);
    expect(colorOf(strip).r).toBeCloseTo(1);
    const t = Math.PI / 12; // sin(6t) = 1: the pulse is at its peak
    ps.update(t);
    expect(colorOf(arrows).r).toBeCloseTo(2);
    expect(colorOf(arrows).g).toBeCloseTo(0);
    const murk = meshes(ps.group).find((o) => (o as THREE.Mesh).isMesh && o.renderOrder === 2) as THREE.Mesh;
    expect(colorOf(murk).b).toBeCloseTo(1);
    expect((murk.material as THREE.MeshBasicMaterial).opacity).toBeCloseTo(0.25);
    const edges = meshes(ps.group).find((o) => (o as THREE.LineSegments).isLineSegments) as THREE.LineSegments;
    const lighter = new THREE.Color('#0000ff').offsetHSL(0, 0, 0.25);
    expect(colorOf(edges).r).toBeCloseTo(lighter.r);
    expect(colorOf(edges).g).toBeCloseTo(lighter.g);
  });

  it('places each mover from its pose at the sim time, and shrinks a rock that is not there', () => {
    course({ 'gen.race.sectionKinds': 'cavern', 'gen.race.boostPads': 0, 'gen.race.slowFields': 0 });
    const ps = createPadScene(new THREE.Scene());
    const t = track.value;
    const list = movers.value;
    const inst = meshes(ps.group) as THREE.InstancedMesh[];
    const slabMesh = inst.find((m) => m.geometry.type === 'BoxGeometry');
    const rockMesh = inst.find((m) => m.geometry.type === 'DodecahedronGeometry');
    expect(slabMesh && rockMesh).toBeTruthy();
    const slabs = list.filter((m) => m.kind === 'slab');
    const rocks = list.filter((m) => m.kind === 'rock');
    // a time at which some rock is out of the picture (between falling and hanging again)
    let gone = 0;
    while (gone < 40 && !rocks.some((r) => !moverPose(r, gone).active)) gone += 0.05;
    expect(rocks.some((r) => !moverPose(r, gone).active)).toBe(true);
    for (const time of [0, 1.7, gone]) {
      ps.update(time);
      const m4 = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      const quat = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      slabs.forEach((m, k) => {
        slabMesh!.getMatrixAt(k, m4);
        m4.decompose(pos, quat, scale);
        const pose = moverPose(m, time);
        expect(pos.distanceTo(pointOnTrack(t, m.s, pose.x, pose.y, new THREE.Vector3()))).toBeLessThan(1e-3);
      });
      rocks.forEach((m, k) => {
        rockMesh!.getMatrixAt(k, m4);
        m4.decompose(pos, quat, scale);
        const pose = moverPose(m, time);
        expect(pos.distanceTo(pointOnTrack(t, m.s, pose.x, pose.y, new THREE.Vector3()))).toBeLessThan(1e-3);
        // a rock that is not there collapses to nothing; one that is there has a size
        const size = new THREE.Vector3().setFromMatrixColumn(m4, 0).length();
        if (pose.active) expect(size).toBeGreaterThan(0);
        else expect(size).toBe(0);
      });
    }
    expect(slabMesh!.instanceMatrix.version).toBeGreaterThan(0); // marked for upload to the GPU
  });
});
