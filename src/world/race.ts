import * as THREE from 'three';
import { computed, effect } from '@preact/signals-core';
import { vars } from '../core/vars';
import { toon } from '../render/toon';
import { generateTrack, nearestOnTrack, TRACK_SHAPES, type Nearest, type RaceGenParams, type Track } from '../gen/track';
import { addRoutes, nearestOnPath, radAt, routeS, type Branch, type RouteKind, type RouteParams } from '../gen/routes';
import { botJudge } from '../sim/forks';
import { GAME_MODES } from '../core/scenarios';

export const gameMode = vars.enum('game.mode', 'race', GAME_MODES, { tags: ['game'], desc: 'race: generated track; gauntlet: the track filled with obstacles; proving: gates against the clock; free: open rock field' });
/** Race and gauntlet both fly the generated track. */
export const onTrack = () => gameMode.value !== 'free';

const g = ['gen', 'race'];
const gen = {
  seed: vars.int('gen.race.seed', 1, { min: 0, max: 99999, hardMin: 0, tags: g, regen: true, desc: 'also in the URL as ?seed=' }),
  points: vars.int('gen.race.points', 12, { min: 5, max: 40, hardMin: 4, hardMax: 200, tags: g, regen: true, desc: 'control points around the loop' }),
  radius: vars.num('gen.race.radius', 1000, { min: 250, max: 4000, hardMin: 50, unit: 'm', tags: g, regen: true }),
  wobble: vars.num('gen.race.wobble', 0.35, { min: 0, max: 0.8, hardMin: 0, hardMax: 0.95, tags: g, regen: true, desc: 'radial randomness' }),
  height: vars.num('gen.race.height', 250, { min: 0, max: 1200, hardMin: 0, unit: 'm', tags: g, regen: true, desc: 'vertical randomness' }),
  twist: vars.num('gen.race.twist', 0, { min: -4, max: 4, step: 1, tags: g, regen: true, desc: 'whole barrel rolls per lap (rounded)' }),
  twistNoise: vars.num('gen.race.twistNoise', 0.5, { min: 0, max: 3, hardMin: 0, unit: 'rad', tags: g, regen: true, desc: 'random banking per control point' }),
  tube: vars.num('gen.race.tubeRadius', 40, { min: 10, max: 120, hardMin: 3, unit: 'm', tags: g, regen: true, desc: 'corridor radius; keep the loop radius ~25× this for varied layouts' }),
  spacing: vars.num('gen.race.spacing', 4, { min: 1, max: 20, hardMin: 0.5, unit: 'm', tags: g, regen: true, desc: 'centreline sample spacing' }),
  shape: vars.enum('gen.race.shape', 'loop', TRACK_SHAPES, { tags: g, regen: true, desc: 'layout: loop (wobbly ring), figure8, trefoil / star / coil (knots), upright (a loop on its edge), clover' }),
  checkpoints: vars.int('gen.race.checkpoints', 8, { min: 2, max: 32, hardMin: 1, hardMax: 200, tags: g, regen: true }),
};
const routes = {
  forks: vars.int('gen.race.forks', 3, { min: 0, max: 6, hardMin: 0, hardMax: 12, tags: [...g, 'route'], regen: true, desc: 'race mode: alternate routes to try to fit (shortcut, long way, split, hidden in turn)' }),
  pitLane: vars.bool('gen.race.pitLane', true, { tags: [...g, 'route'], regen: true, desc: 'race mode: a slow lane before the start line that refills boost' }),
  saveMin: vars.num('gen.race.route.saveMin', 0.03, { min: 0, max: 0.3, hardMin: 0, hardMax: 1, tags: [...g, 'route'], regen: true, desc: 'a shortcut must save at least this share of the main line\'s time (the autopilot flies both)' }),
  saveMax: vars.num('gen.race.route.saveMax', 0.2, { min: 0.05, max: 0.6, hardMin: 0, hardMax: 1, tags: [...g, 'route'], regen: true, desc: 'and at most this share' }),
  costMax: vars.num('gen.race.route.costMax', 0.3, { min: 0.05, max: 1, hardMin: 0, tags: [...g, 'route'], regen: true, desc: 'the long way may cost at most this share more' }),
};
const rtags = ['render', 'track'];
const routeTags = ['race', 'render', 'route'];
/** Sign and stripe colour per route kind (hidden routes are unmarked). */
export const routeColors: Record<Exclude<RouteKind, 'hidden'>, ReturnType<typeof vars.color>> = {
  shortcut: vars.color('race.route.shortcut', '#ff5d73', { tags: routeTags, desc: 'shortcut sign and stripes' }),
  long: vars.color('race.route.long', '#7cff6b', { tags: routeTags, desc: 'long way sign and stripes' }),
  split: vars.color('race.route.split', '#ff9f1c', { tags: routeTags, desc: 'split sign and stripes' }),
  pit: vars.color('race.route.pit', '#4da3ff', { tags: routeTags, desc: 'pit lane sign and stripes' }),
};
export const ROUTE_NAMES: Record<RouteKind, string> = { shortcut: 'SHORTCUT', long: 'LONG WAY', split: 'SPLIT', hidden: 'HIDDEN ROUTE', pit: 'PIT LANE' };
export const profile = vars.enum('gen.race.profile', 'tube', ['tube', 'halfpipe', 'rails', 'gates', 'open'], { tags: rtags, desc: 'look of the corridor; walls collide for all but open (open space: faint guide rings, out-of-bounds timer)' });
/** Open space: no wall collision, leaving the corridor starts the out-of-bounds timer. */
export const openSpace = () => profile.value === 'open';
export const oobTime = vars.num('race.oob.time', 3, { min: 0.5, max: 15, hardMin: 0.05, unit: 's', tags: ['race'], desc: 'open space: seconds outside the corridor before you are put back' });
const trackColor = vars.color('render.track.color', '#3b2a6b', { tags: rtags });
const stripeColor = vars.color('render.track.stripe', '#5a3fa0', { tags: rtags });
const stripeEvery = vars.num('render.track.stripeEvery', 40, { min: 4, max: 200, hardMin: 1, unit: 'm', tags: rtags, desc: 'stripe length, for a sense of speed' });
const gateEvery = vars.num('render.track.gateEvery', 60, { min: 10, max: 400, hardMin: 2, unit: 'm', tags: rtags });
const cpColor = vars.color('race.checkpoint.color', '#40e0ff', { tags: ['race', 'render'] });
const startColor = vars.color('race.start.color', '#ffd23f', { tags: ['race', 'render'] });
const cpGlow = vars.num('race.checkpoint.glow', 1.4, { min: 0, max: 6, hardMin: 0, tags: ['race', 'render'], desc: 'above the bloom threshold checkpoints glow' });

export const genParams = computed<RaceGenParams>(() => ({
  seed: gen.seed.value,
  points: gen.points.value,
  radius: gen.radius.value,
  wobble: gen.wobble.value,
  height: gen.height.value,
  twist: gen.twist.value,
  twistNoise: gen.twistNoise.value,
  tubeRadius: gen.tube.value,
  spacing: gen.spacing.value,
  checkpoints: gen.checkpoints.value,
  // left out for the classic loop so its saved best laps and ghosts keep their keys
  ...(gen.shape.value !== 'loop' ? { shape: gen.shape.value } : {}),
}));
/** Forks only in race mode: gauntlet obstacles, proving gates and their calibrated ladder stay on one line. */
export const routeParams = computed<RouteParams>(() => {
  const race = gameMode.value === 'race';
  return {
    seed: gen.seed.value,
    forks: race ? routes.forks.value : 0,
    pitLane: race && routes.pitLane.value,
    saveMin: routes.saveMin.value,
    saveMax: routes.saveMax.value,
    costMax: routes.costMax.value,
  };
});
/** Routes are on (the track has or may have forks); part of the best-lap key when they are. */
export const routesOn = () => routeParams.value.forks > 0 || routeParams.value.pitLane;
const loop = computed<Track>(() => generateTrack(genParams.value));
/** Regenerates when any `gen.race.*` var changes. Forks are balanced by flying the autopilot through them. */
export const track = computed<Track>(() => addRoutes(loop.value, routeParams.value, botJudge));
export const seedVar = gen.seed;

// --- meshes ------------------------------------------------------------------

/** A sampled centreline with frames: the main loop (closed) or a branch (open). */
type Path = Pick<Track, 'pos' | 'tan' | 'up' | 'right' | 's'>;
/** Keep a wall quad of sample `i` whose centre is `c`? (false = cut, for a hole where a branch leaves) */
type Keep = (i: number, c: THREE.Vector3) => boolean;

interface Sweep {
  position: Float32Array;
  stripe: Float32Array;
  index: number[];
  colors?: [THREE.Color, THREE.Color];
}

/** Ring offsets around the centreline: angle a → cos(a)·right + sin(a)·up. */
function sweep(
  t: Path,
  angles: number[],
  radius: number | number[],
  closedRing: boolean,
  centre?: (i: number, out: THREE.Vector3) => void,
  closedPath = true,
  keep?: Keep,
): Sweep {
  const n = t.pos.length;
  const m = angles.length;
  const position = new Float32Array(n * m * 3);
  const stripe = new Float32Array(n * m);
  const c = new THREE.Vector3();
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    if (centre) centre(i, c);
    else c.copy(t.pos[i]);
    const band = Math.floor(t.s[i] / stripeEvery.value) % 2;
    const r = typeof radius === 'number' ? radius : radius[i];
    for (let k = 0; k < m; k++) {
      v.copy(c)
        .addScaledVector(t.right[i], Math.cos(angles[k]) * r)
        .addScaledVector(t.up[i], Math.sin(angles[k]) * r);
      v.toArray(position, (i * m + k) * 3);
      stripe[i * m + k] = band;
    }
  }
  const index: number[] = [];
  const segs = closedRing ? m : m - 1;
  const mid = new THREE.Vector3();
  const corner = new THREE.Vector3();
  for (let i = 0; i < (closedPath ? n : n - 1); i++) {
    const i2 = (i + 1) % n;
    for (let k = 0; k < segs; k++) {
      const k2 = (k + 1) % m;
      const a = i * m + k;
      const b = i2 * m + k;
      const cc = i2 * m + k2;
      const d = i * m + k2;
      if (keep) {
        mid.set(0, 0, 0);
        for (const q of [a, b, cc, d]) mid.add(corner.fromArray(position, q * 3));
        if (!keep(i, mid.multiplyScalar(0.25))) continue;
      }
      index.push(a, b, d, b, cc, d);
    }
  }
  return { position, stripe, index };
}

function mergeSweeps(parts: Sweep[], colorA: THREE.Color, colorB: THREE.Color): THREE.BufferGeometry {
  const total = parts.reduce((x, p) => x + p.stripe.length, 0);
  const position = new Float32Array(total * 3);
  const color = new Float32Array(total * 3);
  const index: number[] = [];
  let off = 0;
  for (const p of parts) {
    const [ca, cb] = p.colors ?? [colorA, colorB];
    position.set(p.position, off * 3);
    for (let i = 0; i < p.stripe.length; i++) (p.stripe[i] ? cb : ca).toArray(color, (off + i) * 3);
    for (const ix of p.index) index.push(ix + off);
    off += p.stripe.length;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(color, 3));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}

const range = (count: number, from: number, to: number, inclusive: boolean) =>
  Array.from({ length: count }, (_, k) => from + ((to - from) * k) / (inclusive ? count - 1 : count));

/** Place one ring per arc length `at` on a path, facing along it. */
function ringMatrices(mesh: THREE.InstancedMesh, t: Path, at: number[], length: number, scale?: (i: number) => number, from = 0): void {
  const n = t.pos.length;
  const m = new THREE.Matrix4();
  const sc = new THREE.Matrix4();
  at.forEach((s, k) => {
    const i = Math.min(n - 1, Math.round((s / length) * n)) % n;
    // torus lies in its XY plane: map X → right, Y → up, Z → forward
    m.makeBasis(t.right[i], t.up[i], t.tan[i]).setPosition(t.pos[i]);
    if (scale) m.multiply(sc.makeScale(scale(i), scale(i), 1));
    mesh.setMatrixAt(from + k, m);
  });
  mesh.instanceMatrix.needsUpdate = true;
}

const sampleOf = (t: Track, s: number) => Math.min(t.pos.length - 1, Math.floor((((s % t.length) + t.length) % t.length / t.length) * t.pos.length));

/** Main-loop wall quads inside a branch's tube are cut, so the branch opens off the loop. */
function mainKeep(t: Track): Keep | undefined {
  const bs = t.branches ?? [];
  if (!bs.length) return undefined;
  const R = t.radius;
  const n: Nearest = { index: 0, t: 0, s: 0, point: new THREE.Vector3(), dist: Infinity };
  return (i, c) => {
    const s = t.s[i];
    for (const b of bs) {
      if (s < b.s0 - R || s > b.s1 + R) continue;
      // near the mouths the branch runs alongside the loop, so its fraction is a good search hint
      const hint = Math.round((Math.max(0, Math.min(1, (s - b.s0) / (b.s1 - b.s0))) * (b.pos.length - 2)));
      nearestOnPath(b, c, hint, 40, n);
      if (n.dist < radAt(b, n) * 0.995) return false;
    }
    return true;
  };
}

/** Branch wall quads inside the main tube are cut (the mouths). */
function branchKeep(t: Track, b: Branch): Keep {
  const n: Nearest = { index: 0, t: 0, s: 0, point: new THREE.Vector3(), dist: Infinity };
  return (i, c) => {
    nearestOnTrack(t, c, sampleOf(t, routeS(b, b.s[i])), 40, n);
    return n.dist >= t.radius * 0.995;
  };
}

/** True inside a fork's mouths on the main loop, where its rings would block the way in. */
const inMouth = (t: Track, s: number) =>
  (t.branches ?? []).some((b) => {
    const k = (b.s1 - b.s0) / b.length;
    return (s >= b.s0 && s <= b.s0 + b.open0 * k) || (s >= b.s0 + b.open1 * k && s <= b.s1);
  });

/** Track meshes; rebuilt when the track or its look changes. */
export function createRaceScene(scene: THREE.Scene) {
  const group = new THREE.Group();
  scene.add(group);
  const wallMat = toon({ vertexColors: true, side: THREE.DoubleSide });
  const gateMat = toon({ side: THREE.DoubleSide });
  const guideMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.35, depthWrite: false });
  const cpMat = new THREE.MeshBasicMaterial({ vertexColors: false });
  const startMat = new THREE.MeshBasicMaterial();
  const colA = new THREE.Color();
  const colB = new THREE.Color();
  const disposables: { dispose(): void }[] = [];

  effect(() => {
    const t = track.value;
    const look = profile.value;
    colA.set(trackColor.value);
    colB.set(stripeColor.value);
    void stripeEvery.value;
    const every = gateEvery.value;
    for (const d of disposables.splice(0)) d.dispose();
    group.clear();

    const R = t.radius;
    const bs = t.branches ?? [];
    const keepMain = look === 'tube' || look === 'halfpipe' || look === 'rails' ? mainKeep(t) : undefined;
    /** each branch's stripe colour: its route's (hidden routes look like the loop) */
    const tint = (b: Branch): [THREE.Color, THREE.Color] => [colA, b.kind === 'hidden' ? colB : new THREE.Color(routeColors[b.kind].value)];
    let geo: THREE.BufferGeometry | undefined;
    if (look === 'tube' || look === 'halfpipe') {
      const angles = look === 'tube' ? range(32, 0, Math.PI * 2, false) : range(17, Math.PI, Math.PI * 2, true);
      const ring = look === 'tube';
      const parts = [sweep(t, angles, R, ring, undefined, true, keepMain)];
      for (const b of bs) parts.push({ ...sweep(b, angles, b.rad, ring, undefined, false, branchKeep(t, b)), colors: tint(b) });
      geo = mergeSweeps(parts, colA, colB);
    } else if (look === 'rails') {
      const parts: Sweep[] = [];
      for (const path of [t, ...bs]) {
        const b = path === t ? null : (path as Branch);
        const rad = b ? b.rad : null;
        for (const q of [0.25, 0.75, 1.25, 1.75]) {
          const a = q * Math.PI;
          const part = sweep(
            path,
            range(8, 0, Math.PI * 2, false),
            0.6,
            true,
            (i, out) => {
              const r = rad ? rad[i] : R;
              out.copy(path.pos[i]).addScaledVector(path.right[i], Math.cos(a) * r).addScaledVector(path.up[i], Math.sin(a) * r);
            },
            !b,
            b ? branchKeep(t, b) : keepMain,
          );
          parts.push(b ? { ...part, colors: tint(b) } : part);
        }
      }
      geo = mergeSweeps(parts, colA, colB);
    }
    if (geo) {
      const mesh = new THREE.Mesh(geo, wallMat);
      group.add(mesh);
      disposables.push(geo);
    }

    if (look === 'gates' || look === 'rails' || look === 'open') {
      // rings down the loop (not in fork mouths, where they would block the way in) and down each branch
      const at = range(Math.max(1, Math.floor(t.length / every)), 0, t.length, false).filter((s) => !inMouth(t, s));
      const along = bs.map((b) => range(Math.max(1, Math.floor(b.length / every)), b.open0, b.open1, true));
      const ringGeo = new THREE.TorusGeometry(R, look === 'open' ? 0.3 : 1, 6, 40);
      const gates = new THREE.InstancedMesh(ringGeo, look === 'open' ? guideMat : gateMat, at.length + along.reduce((x, a) => x + a.length, 0));
      ringMatrices(gates, t, at, t.length);
      let from = at.length;
      bs.forEach((b, k) => {
        ringMatrices(gates, b, along[k], b.length, (i) => b.rad[i] / R, from);
        from += along[k].length;
      });
      group.add(gates);
      disposables.push(ringGeo, gates);
    }

    // a glowing sign ring in the route's colour where each marked branch leaves the loop
    for (const b of bs) {
      if (b.kind === 'hidden') continue;
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(routeColors[b.kind].value).multiplyScalar(cpGlow.value) });
      const signGeo = new THREE.TorusGeometry(b.radius * 0.97, 0.9, 6, 48);
      const sign = new THREE.InstancedMesh(signGeo, mat, 1);
      ringMatrices(sign, b, [b.open0], b.length, (i) => b.rad[i] / b.radius);
      group.add(sign);
      disposables.push(signGeo, sign, mat);
    }

    const cpGeo = new THREE.TorusGeometry(R * 0.98, 0.5, 6, 48);
    const cps = new THREE.InstancedMesh(cpGeo, cpMat, Math.max(1, t.checkpoints.length - 1));
    ringMatrices(cps, t, t.checkpoints.slice(1), t.length);
    cps.count = t.checkpoints.length - 1;
    const start = new THREE.InstancedMesh(new THREE.TorusGeometry(R * 0.98, 0.6, 6, 48), startMat, 1);
    ringMatrices(start, t, [0], t.length);
    group.add(cps, start);
    disposables.push(cpGeo, cps, start.geometry, start);
  });

  return {
    group,
    update() {
      group.visible = onTrack();
      gateMat.color.set(stripeColor.value);
      guideMat.color.set(stripeColor.value);
      cpMat.color.set(cpColor.value).multiplyScalar(cpGlow.value);
      startMat.color.set(startColor.value).multiplyScalar(cpGlow.value);
    },
  };
}
