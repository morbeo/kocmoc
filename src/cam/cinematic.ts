import { PerspectiveCamera, Quaternion, Vector3 } from 'three';
import { vars } from '../core/vars';
import { rng } from '../core/rng';
import type { ShipState } from '../sim/ship';
import type { Nearest, Track } from '../gen/track';
import type { RaceEvent } from '../sim/race';

/**
 * Cinematic auto-director: cuts (or blends) between broadcast-style shots on a timer.
 * Static shots (trackside, flyby) stand on the track ahead and pan to follow; moving shots
 * (hero, drone, orbit, tail) ride a lagged arm around the ship.
 */
export const SHOTS = ['trackside', 'flyby', 'hero', 'drone', 'orbit', 'tail'] as const;
export type Shot = (typeof SHOTS)[number];

const tags = ['cam', 'cine'];
const shotMin = vars.num('cam.cine.shotMin', 4, { min: 0.5, max: 30, hardMin: 0.1, unit: 's', tags, desc: 'shortest time before the director cuts' });
const shotMax = vars.num('cam.cine.shotMax', 8, { min: 0.5, max: 60, hardMin: 0.1, unit: 's', tags, desc: 'longest time before the director cuts' });
const blend = vars.num('cam.cine.blend', 0, { min: 0, max: 4, hardMin: 0, unit: 's', tags, desc: 'glide between shots; 0 = hard cut' });
const shotList = vars.str('cam.cine.shots', SHOTS.join(','), { tags, desc: `shots the director picks from: ${SHOTS.join(', ')}` });
const aimLag = vars.num('cam.cine.aim', 5, { min: 0.5, max: 30, hardMin: 0.01, unit: '/s', tags, desc: 'how fast static cameras pan after the ship; lower = lazier operator' });
const frameSize = vars.num('cam.cine.frame', 14, { min: 2, max: 100, hardMin: 0.1, unit: 'm', tags, desc: 'width kept in frame by the telephoto trackside lens' });
export const cineReplay = vars.bool('cam.cine.replay', true, { tags, desc: 'replays use the cinematic camera' });
export const letterbox = vars.num('cam.cine.letterbox', 0.1, { min: 0, max: 0.25, hardMin: 0, hardMax: 0.45, tags, desc: 'black bars, as a share of the screen height (0 = off)' });

/** Track the static shots stand on; set each frame by the game (null in free flight). */
export const cineScene: { track: Track | null; near: Nearest | null } = { track: null, near: null };

export interface CineState {
  shot: Shot;
  /** time in the current shot, s */
  t: number;
  /** planned length of the current shot, s */
  len: number;
  rand: () => number;
  /** which side of the track / ship this shot favours, ±1 */
  side: number;
  spot: Vector3;
  aim: Vector3;
  arm: Quaternion;
  orbit: number;
  /** pose at the moment of the cut, to glide from; null when not blending */
  from: { pos: Vector3; quat: Quaternion; fov: number } | null;
  started: boolean;
  /** shot an event asked for, taken once the current one has been held long enough */
  want: Shot | null;
}

export const newCineState = (seed = 5000): CineState => ({
  shot: 'drone',
  t: 0,
  len: 0,
  rand: rng(seed),
  side: 1,
  spot: new Vector3(),
  aim: new Vector3(),
  arm: new Quaternion(),
  orbit: 0,
  from: null,
  started: false,
  want: null,
});

/** Shots that show off each race moment; the director cuts to one when it happens. */
const REACT: Partial<Record<RaceEvent['type'], Shot[]>> = { nearMiss: ['tail', 'flyby'], hit: ['tail', 'drone'], lap: ['trackside', 'hero'] };
/** shortest hold before an event may cut away, s */
export const REACT_HOLD = 1.5;

/** Tell the director what just happened; it may cut to a shot that shows it. */
export function cineEvent(st: CineState, type: RaceEvent['type']): void {
  const pool = REACT[type]?.filter((s) => s !== st.shot && parseShots(shotList.value).includes(s));
  if (pool?.length && !st.want) st.want = pool[Math.floor(st.rand() * pool.length)];
}

/** Parse a shot list, keeping known names only; empty → every shot. */
export function parseShots(s: string): Shot[] {
  const list = s
    .split(',')
    .map((x) => x.trim())
    .filter((x): x is Shot => (SHOTS as readonly string[]).includes(x));
  return list.length ? [...new Set(list)] : [...SHOTS];
}

/** Pick the next shot: never the same one twice in a row (unless it is the only one). */
export function nextShot(prev: Shot | null, allowed: readonly Shot[], r: () => number): Shot {
  const pool = allowed.length > 1 ? allowed.filter((s) => s !== prev) : allowed;
  return pool[Math.min(pool.length - 1, Math.floor(r() * pool.length))];
}

/** Vertical FOV (degrees) that keeps `frame` metres in view at `dist`, clamped to [lo, hi]. */
export function telephotoFov(dist: number, frame: number, lo: number, hi: number): number {
  const f = (2 * Math.atan(frame / 2 / Math.max(dist, 1e-3)) * 180) / Math.PI;
  return Math.min(hi, Math.max(lo, f));
}

/** Smoothstep easing, 0..1 → 0..1. */
export const ease = (x: number): number => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
};

/** A static shot is over once the ship is `pass` metres beyond it, or far away from it. */
export function staticShotDone(spot: Vector3, ship: Vector3, fwd: Vector3, pass: number, far: number): boolean {
  const ahead = _d.subVectors(ship, spot).dot(fwd);
  return ahead > pass || spot.distanceTo(ship) > far;
}

/** Point and frame on the track `s` metres along it (wraps around the lap). */
export function trackFrame(track: Track, s: number, pos: Vector3, right: Vector3, up: Vector3, fwd: Vector3): void {
  const L = track.length;
  const n = track.pos.length;
  const ss = ((s % L) + L) % L;
  let lo = 0;
  let hi = n - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (track.s[mid] <= ss) lo = mid;
    else hi = mid - 1;
  }
  const j = (lo + 1) % n;
  const segLen = (j === 0 ? L : track.s[j]) - track.s[lo];
  const t = segLen > 0 ? (ss - track.s[lo]) / segLen : 0;
  pos.lerpVectors(track.pos[lo], track.pos[j], t);
  right.lerpVectors(track.right[lo], track.right[j], t).normalize();
  up.lerpVectors(track.up[lo], track.up[j], t).normalize();
  fwd.lerpVectors(track.tan[lo], track.tan[j], t).normalize();
}

const _d = new Vector3();
const _p = new Vector3();
const _r = new Vector3();
const _u = new Vector3();
const _f = new Vector3();
const _o = new Vector3();
const _q = new Quaternion();

/** Begin `shot`: place static cameras ahead of the ship. */
function enter(st: CineState, shot: Shot, ship: ShipState): void {
  st.shot = shot;
  st.t = 0;
  st.len = shotMin.value + st.rand() * Math.max(0, shotMax.value - shotMin.value);
  st.side = st.rand() < 0.5 ? -1 : 1;
  st.arm.copy(ship.quat);
  st.orbit = st.rand() * Math.PI * 2;
  st.aim.copy(ship.pos);
  if (shot !== 'trackside' && shot !== 'flyby') return;

  const speed = ship.vel.length();
  const fly = shot === 'flyby';
  const ahead = fly ? Math.max(35, speed * 1.2) : Math.max(70, speed * 2.5);
  const { track, near } = cineScene;
  if (track && near) {
    trackFrame(track, near.s + ahead, _p, _r, _u, _f);
    // inside the corridor: off to one side and a little high (trackside), or skimming the line (flyby)
    const R = track.radius;
    st.spot.copy(_p).addScaledVector(_r, st.side * R * (fly ? 0.25 : 0.65)).addScaledVector(_u, R * (fly ? -0.15 : 0.3));
  } else {
    _f.set(0, 0, -1).applyQuaternion(ship.quat);
    _u.set(0, 1, 0).applyQuaternion(ship.quat);
    _r.crossVectors(_f, _u);
    st.spot.copy(ship.pos).addScaledVector(_f, ahead).addScaledVector(_r, st.side * (fly ? 8 : 30)).addScaledVector(_u, fly ? -2 : 10);
  }
}

/** Place `camera` for the current shot, cutting to the next when it is over. */
export function placeCinematic(camera: PerspectiveCamera, ship: ShipState, dt: number, st: CineState, baseFov: number): void {
  const allowed = parseShots(shotList.value);
  if (!st.started || !allowed.includes(st.shot)) {
    enter(st, nextShot(null, allowed, st.rand), ship);
    st.started = true;
  }
  st.t += dt;
  _f.set(0, 0, -1).applyQuaternion(ship.quat);
  const isStatic = st.shot === 'trackside' || st.shot === 'flyby';
  const passed = isStatic && staticShotDone(st.spot, ship.pos, _f, st.shot === 'flyby' ? 40 : 60, 1500);
  const react = st.want !== null && st.t >= REACT_HOLD;
  if (st.t >= st.len || passed || react) {
    st.from = blend.value > 0 && !passed ? { pos: camera.position.clone(), quat: camera.quaternion.clone(), fov: camera.fov } : null;
    const next = react && allowed.includes(st.want!) ? st.want! : nextShot(st.shot, allowed, st.rand);
    st.want = null;
    enter(st, next, ship);
  }

  let fovWant = baseFov;
  const k = (rate: number) => 1 - Math.exp(-rate * dt);
  switch (st.shot) {
    case 'trackside':
    case 'flyby': {
      // an operator on a tripod: pans after the ship with a little lag
      st.aim.lerp(ship.pos, k(aimLag.value * (st.shot === 'flyby' ? 3 : 1)));
      camera.position.copy(st.spot);
      const { track, near } = cineScene;
      camera.up.copy(track && near ? track.up[near.index] : _u.set(0, 1, 0));
      camera.lookAt(st.aim);
      fovWant = st.shot === 'trackside' ? telephotoFov(st.spot.distanceTo(ship.pos), frameSize.value, 8, baseFov) : baseFov + 10;
      break;
    }
    default: {
      // moving shots ride an arm that lags the ship's rotation
      const lag = { hero: 3, drone: 1.2, orbit: 2, tail: 8 }[st.shot];
      st.arm.slerp(ship.quat, k(lag));
      if (st.shot === 'orbit') st.orbit += 0.35 * dt * st.side;
      const s = st.side;
      if (st.shot === 'hero') _o.set(s * 3, 1.2, -16);
      else if (st.shot === 'drone') _o.set(s * 6, 12, 32);
      else if (st.shot === 'tail') _o.set(s * 2.2, -0.9, 5.5);
      else _o.set(Math.sin(st.orbit) * 24, 5, Math.cos(st.orbit) * 24);
      camera.position.copy(ship.pos).add(_o.applyQuaternion(st.arm));
      camera.up.copy(_u.set(0, 1, 0).applyQuaternion(st.arm));
      // hero looks back at the ship; the rest look a little ahead of it
      const lead = st.shot === 'hero' ? 0 : st.shot === 'tail' ? 30 : 8;
      camera.lookAt(_p.set(0, 0, -lead).applyQuaternion(ship.quat).add(ship.pos));
      if (st.shot === 'tail') fovWant = baseFov + 15;
      else if (st.shot === 'hero') fovWant = Math.max(20, baseFov - 15);
    }
  }

  // glide from the last shot's pose
  if (st.from) {
    const e = ease(st.t / blend.value);
    camera.position.lerpVectors(st.from.pos, camera.position, e);
    camera.quaternion.copy(_q.slerpQuaternions(st.from.quat, camera.quaternion, e));
    fovWant = st.from.fov + (fovWant - st.from.fov) * e;
    if (e >= 1) st.from = null;
  }
  if (Math.abs(camera.fov - fovWant) > 1e-3) {
    camera.fov = fovWant;
    camera.updateProjectionMatrix();
  }
}
