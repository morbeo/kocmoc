import { afterEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { vars } from '../core/vars';
import { GAME_MODES } from '../core/scenarios';
import { SECTION_KINDS } from '../gen/sections';
import {
  createRaceScene,
  gameMode,
  genParams,
  onTrack,
  openSpace,
  profile,
  ROUTE_NAMES,
  routeColors,
  routeParams,
  routesOn,
  sectionParams,
  seedVar,
  track,
} from './race';

// the scene's effect lives as long as the page; a test stops each one it started, or every later var change would rebuild all the old scenes
const effects = vi.hoisted(() => ({ stop: [] as (() => void)[] }));
vi.mock('@preact/signals-core', async (original) => {
  const signals = await original<typeof import('@preact/signals-core')>();
  return { ...signals, effect: (fn: () => void) => { const stop = signals.effect(fn); effects.stop.push(stop); return stop; } };
});

// every var a test sets is put back afterwards, so tests never leak into each other
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

/** A small, quick track with no forks and no sections, unless a test asks for them. */
const small = () => {
  set('game.mode', 'race');
  set('gen.race.points', 10);
  set('gen.race.radius', 600); // about 25 tube radii, as the var's description advises: forks fit
  set('gen.race.tubeRadius', 24);
  set('gen.race.spacing', 8);
  set('gen.race.forks', 0);
  set('gen.race.pitLane', false);
  set('gen.race.sections', 0);
};

const meshes = (g: THREE.Group) => g.children as THREE.Mesh[];
const positions = (m: THREE.Mesh) => m.geometry.getAttribute('position').count;
const rgb = (m: THREE.Mesh) => (m.material as THREE.MeshBasicMaterial).color;

describe('game mode', () => {
  it('flies the generated track in every mode except free', () => {
    for (const mode of GAME_MODES) {
      set('game.mode', mode);
      expect(gameMode.value).toBe(mode);
      expect(onTrack()).toBe(mode !== 'free');
    }
  });

  it('open space is the open corridor profile only', () => {
    for (const p of ['tube', 'halfpipe', 'rails', 'gates', 'open']) {
      set('gen.race.profile', p);
      expect(profile.value).toBe(p);
      expect(openSpace()).toBe(p === 'open');
    }
  });

  it('names every route kind and colours every marked one', () => {
    expect(Object.keys(ROUTE_NAMES).sort()).toEqual(['hidden', 'long', 'pit', 'shortcut', 'split']);
    expect(ROUTE_NAMES.long).toBe('LONG WAY');
    expect(Object.keys(routeColors).sort()).toEqual(['long', 'pit', 'shortcut', 'split']);
    expect(routeColors.pit.value).toBe('#4da3ff');
  });
});

describe('genParams', () => {
  it('follows the gen.race vars', () => {
    set('gen.race.seed', 42);
    set('gen.race.points', 9);
    set('gen.race.radius', 700);
    set('gen.race.tubeRadius', 33);
    set('gen.race.checkpoints', 5);
    expect(seedVar.value).toBe(42);
    expect(genParams.value).toMatchObject({ seed: 42, points: 9, radius: 700, tubeRadius: 33, checkpoints: 5, twist: 0, spacing: 4 });
  });

  it('leaves the shape out for the classic loop so saved best laps keep their keys', () => {
    set('gen.race.shape', 'loop');
    expect('shape' in genParams.value).toBe(false);
    set('gen.race.shape', 'figure8');
    expect(genParams.value.shape).toBe('figure8');
  });
});

describe('routeParams', () => {
  it('lets race mode have forks and a pit lane', () => {
    set('game.mode', 'race');
    set('gen.race.forks', 4);
    set('gen.race.pitLane', true);
    set('gen.race.seed', 7);
    set('gen.race.route.saveMin', 0.1);
    set('gen.race.route.saveMax', 0.4);
    set('gen.race.route.costMax', 0.5);
    expect(routeParams.value).toEqual({ seed: 7, forks: 4, pitLane: true, saveMin: 0.1, saveMax: 0.4, costMax: 0.5 });
  });

  it('keeps every other mode on a single line', () => {
    set('gen.race.forks', 4);
    set('gen.race.pitLane', true);
    for (const mode of GAME_MODES.filter((m) => m !== 'race')) {
      set('game.mode', mode);
      expect(routeParams.value.forks).toBe(0);
      expect(routeParams.value.pitLane).toBe(false);
    }
  });

  it('says routes are on when there are forks or a pit lane, in race mode only', () => {
    set('game.mode', 'race');
    set('gen.race.forks', 0);
    set('gen.race.pitLane', false);
    expect(routesOn()).toBe(false);
    set('gen.race.forks', 2);
    expect(routesOn()).toBe(true);
    set('gen.race.forks', 0);
    set('gen.race.pitLane', true);
    expect(routesOn()).toBe(true);
    set('game.mode', 'gauntlet');
    expect(routesOn()).toBe(false);
  });
});

describe('sectionParams', () => {
  it('has sections in race mode only', () => {
    set('gen.race.sections', 3);
    set('game.mode', 'race');
    expect(sectionParams.value.count).toBe(3);
    set('game.mode', 'proving');
    expect(sectionParams.value.count).toBe(0);
  });

  it('reads the kinds as a trimmed list and drops unknown names', () => {
    set('gen.race.sectionKinds', ' hex , nope,open,, cavern ');
    expect(sectionParams.value.kinds).toEqual(['hex', 'open', 'cavern']);
    set('gen.race.sectionKinds', SECTION_KINDS.join(','));
    expect(sectionParams.value.kinds).toEqual([...SECTION_KINDS]);
  });

  it('never lets the longest section be shorter than the shortest', () => {
    set('gen.race.sectionMin', 500);
    set('gen.race.sectionMax', 200);
    expect(sectionParams.value.minLength).toBe(500);
    expect(sectionParams.value.maxLength).toBe(500);
    set('gen.race.sectionMax', 800);
    expect(sectionParams.value.maxLength).toBe(800);
  });
});

describe('track', () => {
  it('is generated from the vars, and regenerates when one changes', () => {
    small();
    set('gen.race.seed', 1);
    const a = track.value;
    expect(track.value).toBe(a); // cached while nothing changed
    expect(a.radius).toBe(24);
    expect(a.branches ?? []).toHaveLength(0);
    set('gen.race.seed', 2);
    const b = track.value;
    expect(b).not.toBe(a);
    expect(b.pos[3].equals(a.pos[3])).toBe(false);
    set('gen.race.seed', 1);
    expect(track.value.pos[3].equals(a.pos[3])).toBe(true); // the same seed is the same track
  });

  it('adds a pit lane branch when asked and shaped sections when asked', () => {
    small();
    set('gen.race.pitLane', true);
    expect(track.value.branches?.map((b) => b.kind)).toContain('pit');
    set('gen.race.pitLane', false);
    set('gen.race.sections', 2);
    set('gen.race.sectionKinds', 'hex,open');
    expect(track.value.sections?.length).toBeGreaterThan(0);
  });

  it('has none of them outside race mode', () => {
    small();
    set('gen.race.pitLane', true);
    set('gen.race.sections', 2);
    set('game.mode', 'gauntlet');
    expect(track.value.branches ?? []).toHaveLength(0);
    expect(track.value.sections ?? []).toHaveLength(0);
  });
});

describe('createRaceScene', () => {
  it('adds one group to the scene and builds the corridor walls, checkpoints and start line', () => {
    small();
    const scene = new THREE.Scene();
    const race = createRaceScene(scene);
    expect(scene.children).toEqual([race.group]);
    const t = track.value;
    const [walls, cps, start] = meshes(race.group);
    expect(race.group.children).toHaveLength(3);
    expect(positions(walls)).toBe(t.pos.length * 32); // a closed ring of 32 per sample
    expect(walls.geometry.getAttribute('color').count).toBe(positions(walls));
    expect((cps as THREE.InstancedMesh).count).toBe(t.checkpoints.length - 1);
    expect((start as THREE.InstancedMesh).count).toBe(1);
  });

  it('builds an open half-pipe from 17 points per sample', () => {
    small();
    set('gen.race.profile', 'halfpipe');
    const race = createRaceScene(new THREE.Scene());
    expect(positions(meshes(race.group)[0])).toBe(track.value.pos.length * 17);
  });

  it('builds four rails along the loop with gate rings', () => {
    small();
    set('gen.race.profile', 'rails');
    const race = createRaceScene(new THREE.Scene());
    const [rails, gates] = meshes(race.group);
    expect(positions(rails)).toBe(track.value.pos.length * 8 * 4);
    expect(gates).toBeInstanceOf(THREE.InstancedMesh);
    expect((gates as THREE.InstancedMesh).count).toBe(Math.floor(track.value.length / 60));
  });

  it('has only rings for the gates and open profiles, and faint guide rings for open', () => {
    small();
    set('gen.race.profile', 'gates');
    const gates = createRaceScene(new THREE.Scene());
    expect(gates.group.children).toHaveLength(3);
    const ring = meshes(gates.group)[0] as THREE.InstancedMesh;
    expect(ring.count).toBe(Math.floor(track.value.length / 60));
    expect((ring.geometry as THREE.TorusGeometry).parameters.tube).toBe(1);
    set('gen.race.profile', 'open');
    const open = createRaceScene(new THREE.Scene());
    const guide = meshes(open.group)[0] as THREE.InstancedMesh;
    expect((guide.geometry as THREE.TorusGeometry).parameters.tube).toBe(0.3);
    expect((guide.material as THREE.Material).transparent).toBe(true);
  });

  it('spaces the gates by render.track.gateEvery, never fewer than one', () => {
    small();
    set('gen.race.profile', 'gates');
    set('render.track.gateEvery', 400);
    const race = createRaceScene(new THREE.Scene());
    expect((meshes(race.group)[0] as THREE.InstancedMesh).count).toBe(Math.max(1, Math.floor(track.value.length / 400)));
  });

  it('opens a fork off the loop: the branch is built and a sign ring marks the pit lane', () => {
    small();
    set('gen.race.pitLane', true);
    const withBranch = createRaceScene(new THREE.Scene());
    const [walls, sign] = meshes(withBranch.group);
    const branch = track.value.branches![0];
    expect(positions(walls)).toBeGreaterThan(track.value.pos.length * 32); // the loop's rings plus the branch's
    expect(branch.kind).toBe('pit');
    expect(sign).toBeInstanceOf(THREE.InstancedMesh);
    const glow = vars.get('race.checkpoint.glow')!.value as number;
    const pit = new THREE.Color(routeColors.pit.value).multiplyScalar(glow);
    expect(rgb(sign).r).toBeCloseTo(pit.r);
    expect(rgb(sign).b).toBeCloseTo(pit.b);
    const withSign = withBranch.group.children.length;
    set('gen.race.pitLane', false); // the scene follows the var: the sign ring goes with the branch
    expect(withBranch.group.children).toHaveLength(withSign - 1);
  });

  it('draws the rails and gates down a branch too', () => {
    small();
    set('gen.race.pitLane', true);
    set('gen.race.profile', 'rails');
    const race = createRaceScene(new THREE.Scene());
    const [rails, gates] = meshes(race.group);
    expect(positions(rails)).toBeGreaterThan(track.value.pos.length * 8 * 4);
    expect((gates as THREE.InstancedMesh).count).toBeGreaterThan(Math.floor(track.value.length / 60));
  });

  it('draws shaped sections with walls of their own and open air with guide rings', () => {
    small();
    set('gen.race.sections', 2);
    set('gen.race.sectionKinds', 'hex,open');
    const t = track.value;
    expect(t.sections!.map((s) => s.kind)).toEqual(expect.arrayContaining(['hex', 'open']));
    const race = createRaceScene(new THREE.Scene());
    const shaped = t.sections!.filter((s) => s.kind !== 'open').length;
    const open = t.sections!.some((s) => s.kind === 'open');
    // loop walls + one mesh per shaped section + one guide-ring mesh for the open air + checkpoints + start line
    expect(race.group.children).toHaveLength(1 + shaped + (open ? 1 : 0) + 2);
    const sectionMesh = meshes(race.group)[1];
    expect(sectionMesh.geometry.index).toBeNull(); // faceted: not indexed
    // the loop's vertices are all there, but the quads inside the sections are left out of its index
    expect(meshes(race.group)[0].geometry.index!.count).toBeLessThan(t.pos.length * 32 * 6);
  });

  it('rebuilds when the track or its look changes and frees the old geometry', () => {
    small();
    const race = createRaceScene(new THREE.Scene());
    const first = meshes(race.group)[0];
    let disposed = 0;
    first.geometry.addEventListener('dispose', () => disposed++);
    set('gen.race.seed', 9);
    expect(disposed).toBe(1);
    const second = meshes(race.group)[0];
    expect(second).not.toBe(first);
    set('render.track.color', '#112233');
    expect(meshes(race.group)[0]).not.toBe(second);
    set('gen.race.profile', 'gates');
    expect((meshes(race.group)[0] as THREE.InstancedMesh).isInstancedMesh).toBe(true);
  });

  it('colours the wall stripes from the track colours', () => {
    small();
    set('render.track.color', '#ff0000');
    set('render.track.stripe', '#0000ff');
    set('render.track.stripeEvery', 10);
    const race = createRaceScene(new THREE.Scene());
    const color = meshes(race.group)[0].geometry.getAttribute('color');
    const seen = new Set<string>();
    for (let i = 0; i < color.count; i += 32) seen.add([color.getX(i), color.getY(i), color.getZ(i)].map((c) => c.toFixed(2)).join());
    expect(seen.size).toBe(2);
    const a = new THREE.Color('#ff0000');
    const b = new THREE.Color('#0000ff');
    expect(seen).toContain([a.r, a.g, a.b].map((c) => c.toFixed(2)).join());
    expect(seen).toContain([b.r, b.g, b.b].map((c) => c.toFixed(2)).join());
  });

  it('update() shows the track only when flying it and keeps the glow colours current', () => {
    small();
    const race = createRaceScene(new THREE.Scene());
    set('game.mode', 'free');
    race.update();
    expect(race.group.visible).toBe(false);
    set('game.mode', 'gauntlet');
    set('race.checkpoint.color', '#ff0000');
    set('race.start.color', '#00ff00');
    set('race.checkpoint.glow', 2);
    race.update();
    expect(race.group.visible).toBe(true);
    const [, cps, start] = meshes(race.group);
    expect(rgb(cps).r).toBeCloseTo(2);
    expect(rgb(cps).g).toBeCloseTo(0);
    expect(rgb(start).g).toBeCloseTo(2);
    expect(rgb(start).r).toBeCloseTo(0);
  });
});
