import { PerspectiveCamera, Quaternion, Vector3 } from 'three';
import { vars } from '../core/vars';
import { rng } from '../core/rng';
import type { ShipState } from '../sim/ship';
import type { Nearest, Track } from '../gen/track';
import type { RaceEvent } from '../sim/race';
import { courseFrame } from '../gen/routes';

/**
 * Cinematic auto-director: cuts (or blends) between broadcast-style shots.
 * Static shots (flyby, trackside) stand still on the path ahead, pan as the ship rushes past,
 * and cut a beat after it has gone by; they make up most of the edit (`cam.cine.flyby`).
 * Moving shots (hero, drone, orbit, tail) ride a lagged arm around the ship on a timer.
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
const flybyShare = vars.num('cam.cine.flyby', 0.75, { min: 0, max: 1, tags, desc: 'share of shots that stand still on the path and let the ship fly past' });
const leadTime = vars.num('cam.cine.lead', 2.5, { min: 0.5, max: 10, hardMin: 0.1, unit: 's', tags, desc: 'how long until the ship reaches a fly-by camera when the shot starts' });
const afterTime = vars.num('cam.cine.after', 1, { min: 0, max: 5, hardMin: 0, unit: 's', tags, desc: 'how long a fly-by camera watches the ship leave before cutting' });
export const cineReplay = vars.bool('cam.cine.replay', true, { tags, desc: 'replays use the cinematic camera' });
export const letterbox = vars.num('cam.cine.letterbox', 0.1, { min: 0, max: 0.25, hardMin: 0, hardMax: 0.45, tags, desc: 'black bars, as a share of the screen height (0 = off)' });

/** Track the static shots stand on; set each frame by the game (null in free flight). */
/** `route`: the branch the ship is on (-1 = main loop), so track-side spots go on that tube. */
export interface CineScene {
  track: Track | null;
  near: Nearest | null;
  route?: number;
}
/** The main view's scene; another camera (a trackside screen, say) can pass its own to placeCinematic. */
export const cineScene: CineScene = { track: null, near: null, route: -1 };

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
  /** path direction and up at a static spot (the ship passes along `dir`) */
  dir: Vector3;
  up: Vector3;
  /** time the ship went past a static spot, s; -1 = not yet */
  passT: number;
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
  dir: new Vector3(0, 0, -1),
  up: new Vector3(0, 1, 0),
  passT: -1,
  aim: new Vector3(),
  arm: new Quaternion(),
  orbit: 0,
  from: null,
  started: false,
  want: null,
});

/** Shots that show off each race moment; the director cuts to one when it happens. */
const REACT: Partial<Record<RaceEvent['type'], Shot[]>> = { nearMiss: ['tail', 'flyby'], hit: ['tail', 'drone'], lap: ['trackside', 'hero'], route: ['flyby', 'hero'] };
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

export const isStatic = (s: Shot): boolean => s === 'flyby' || s === 'trackside';

/** Pick the next shot: a static pass-by with chance `share` (when both kinds are allowed), never the same twice in a row. */
export function pickShot(prev: Shot | null, allowed: readonly Shot[], r: () => number, share: number): Shot {
  const still = allowed.filter(isStatic);
  const moving = allowed.filter((s) => !isStatic(s));
  if (!still.length || !moving.length) return nextShot(prev, allowed, r);
  const pool = r() < share ? still : moving;
  return nextShot(prev, pool.length > 1 || pool[0] !== prev ? pool : allowed, r);
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

/** Has the ship gone past `spot`, travelling along `dir`? */
export const shipPassed = (spot: Vector3, ship: Vector3, dir: Vector3): boolean => _d.subVectors(ship, spot).dot(dir) > 0;

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

/** Begin `shot`: static cameras stand on the path ahead, where the ship will be in `cam.cine.lead` s. */
function enter(st: CineState, shot: Shot, ship: ShipState, scene: CineScene): void {
  st.shot = shot;
  st.t = 0;
  st.len = shotMin.value + st.rand() * Math.max(0, shotMax.value - shotMin.value);
  st.side = st.rand() < 0.5 ? -1 : 1;
  st.arm.copy(ship.quat);
  st.orbit = st.rand() * Math.PI * 2;
  st.aim.copy(ship.pos);
  st.passT = -1;
  if (!isStatic(shot)) return;

  const speed = ship.vel.length();
  const fly = shot === 'flyby';
  // trackside stands further off so its long lens can follow the approach
  const ahead = Math.max(fly ? 30 : 60, speed * leadTime.value * (fly ? 1 : 1.6));
  // a static shot that waits too long (ship slow or turned away) gives up
  st.len = ahead / Math.max(speed, 1) + afterTime.value + shotMin.value;
  const { track, near } = scene;
  if (track && near) {
    // on a branch, the spot goes down the branch's tube while it lasts
    const route = scene.route ?? -1;
    const b = route >= 0 ? track.branches?.[route] : undefined;
    let R = track.radius;
    if (b && near.s + ahead <= b.s1) {
      courseFrame(track, near.s + ahead, route, 0, 0, _p, _f, _u);
      _r.crossVectors(_f, _u).normalize();
      R = b.radius;
    } else trackFrame(track, near.s + ahead, _p, _r, _u, _f);
    // inside the walls (under half the radius, so even a narrow shaped section holds it):
    // flyby beside the racing line so the ship whips past; trackside wider and higher
    st.spot.copy(_p).addScaledVector(_r, st.side * R * (fly ? 0.42 : 0.45)).addScaledVector(_u, R * (fly ? -0.12 : 0.2));
  } else {
    // free flight: stand where the ship is heading, off to one side
    if (speed > 2) _f.copy(ship.vel).divideScalar(speed);
    else _f.set(0, 0, -1).applyQuaternion(ship.quat);
    _u.set(0, 1, 0).applyQuaternion(ship.quat);
    _r.crossVectors(_f, _u);
    if (_r.lengthSq() < 1e-6) _r.set(1, 0, 0).applyQuaternion(ship.quat);
    _r.normalize();
    _u.crossVectors(_r, _f);
    st.spot.copy(ship.pos).addScaledVector(_f, ahead).addScaledVector(_r, st.side * (fly ? 7 : 25)).addScaledVector(_u, fly ? -1.5 : 8);
  }
  st.dir.copy(_f);
  st.up.copy(_u);
}

/**
 * Place `camera` for the current shot, cutting to the next when it is over. Each camera keeps its
 * own `st`, and `scene` says which track (and where on it) `ship` is, so several can run at once.
 */
export function placeCinematic(camera: PerspectiveCamera, ship: ShipState, dt: number, st: CineState, baseFov: number, scene: CineScene = cineScene): void {
  const allowed = parseShots(shotList.value);
  if (!st.started || !allowed.includes(st.shot)) {
    // open on a fly-by when there is one: it says "cinematic" straight away
    enter(st, allowed.includes('flyby') && flybyShare.value > 0 ? 'flyby' : pickShot(null, allowed, st.rand, flybyShare.value), ship, scene);
    st.started = true;
  }
  st.t += dt;
  const still = isStatic(st.shot);
  if (still && st.passT < 0 && shipPassed(st.spot, ship.pos, st.dir)) st.passT = st.t;
  // a pass-by ends a beat after the ship has gone, or if it wanders off
  const passed = still && ((st.passT >= 0 && st.t - st.passT >= afterTime.value) || st.spot.distanceTo(ship.pos) > 1500);
  const react = st.want !== null && st.t >= REACT_HOLD;
  if (st.t >= st.len || passed || react) {
    st.from = blend.value > 0 && !passed ? { pos: camera.position.clone(), quat: camera.quaternion.clone(), fov: camera.fov } : null;
    const next = react && allowed.includes(st.want!) ? st.want! : pickShot(st.shot, allowed, st.rand, flybyShare.value);
    st.want = null;
    enter(st, next, ship, scene);
  }

  let fovWant = baseFov;
  const k = (rate: number) => 1 - Math.exp(-rate * dt);
  switch (st.shot) {
    case 'trackside':
    case 'flyby': {
      // an operator on a tripod: pans after the ship with a little lag
      st.aim.lerp(ship.pos, k(aimLag.value * (st.shot === 'flyby' ? 3 : 1)));
      camera.position.copy(st.spot);
      camera.up.copy(st.up);
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
