import { describe, it, expect } from 'vitest';
import { PerspectiveCamera, Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams } from '../gen/track';
import { rng } from '../core/rng';
import { vars } from '../core/vars';
import { newShip } from '../sim/ship';
import { spawnOnTrack } from '../sim/race';
import { REACT_HOLD, SHOTS, cineEvent, cineScene, ease, isStatic, newCineState, nextShot, parseShots, pickShot, placeCinematic, shipPassed, telephotoFov, trackFrame, type Shot } from './cinematic';
import { newRigState, placeRig } from './rigs';

const gen: RaceGenParams = {
  seed: 3,
  points: 10,
  radius: 300,
  wobble: 0.3,
  height: 60,
  twist: 0,
  twistNoise: 0,
  tubeRadius: 20,
  spacing: 4,
  checkpoints: 4,
};
const track = generateTrack(gen);
const set = (path: string, v: unknown) => vars.get(path)!.set(v as never);

describe('shot picking', () => {
  it('parses a shot list, dropping unknown names and duplicates', () => {
    expect(parseShots('hero, nope ,tail,hero')).toEqual(['hero', 'tail']);
    expect(parseShots('')).toEqual([...SHOTS]);
    expect(parseShots('junk')).toEqual([...SHOTS]);
  });

  it('never repeats a shot and reaches every one', () => {
    const r = rng(1);
    let prev: Shot | null = null;
    const seen = new Set<Shot>();
    for (let i = 0; i < 200; i++) {
      const s = nextShot(prev, SHOTS, r);
      expect(s).not.toBe(prev);
      seen.add(s);
      prev = s;
    }
    expect(seen.size).toBe(SHOTS.length);
  });

  it('favours pass-by shots by the flyby share, still never repeating', () => {
    const r = rng(4);
    let prev: Shot | null = null;
    let still = 0;
    for (let i = 0; i < 1000; i++) {
      const s = pickShot(prev, SHOTS, r, 0.75);
      expect(s).not.toBe(prev);
      if (isStatic(s)) still++;
      prev = s;
    }
    expect(still / 1000).toBeGreaterThan(0.65);
    expect(still / 1000).toBeLessThan(0.85);
    expect(isStatic(pickShot(null, SHOTS, rng(1), 0))).toBe(false);
    expect(pickShot('flyby', ['flyby', 'hero'], rng(1), 1)).toBe('hero');
  });

  it('keeps the only allowed shot', () => {
    expect(nextShot('hero', ['hero'], rng(2))).toBe('hero');
  });
});

describe('lens and timing helpers', () => {
  it('narrows the telephoto lens with distance, within its limits', () => {
    const near = telephotoFov(20, 14, 8, 70);
    const far = telephotoFov(200, 14, 8, 70);
    expect(far).toBeLessThan(near);
    expect(telephotoFov(1e6, 14, 8, 70)).toBe(8);
    expect(telephotoFov(0.1, 14, 8, 70)).toBe(70);
    // 14 m across at 100 m ≈ 8°
    expect(telephotoFov(100, 14, 1, 179)).toBeCloseTo(8.01, 1);
  });

  it('eases from 0 to 1 and clamps', () => {
    expect(ease(-1)).toBe(0);
    expect(ease(0.5)).toBe(0.5);
    expect(ease(2)).toBe(1);
  });

  it('tells when the ship has gone past a spot', () => {
    const dir = new Vector3(0, 0, -1);
    const spot = new Vector3(5, 0, -100);
    expect(shipPassed(spot, new Vector3(0, 0, -50), dir)).toBe(false);
    expect(shipPassed(spot, new Vector3(0, 0, -101), dir)).toBe(true);
  });

  it('samples the track frame anywhere on the lap, wrapping around', () => {
    const p = new Vector3();
    const [r, u, f] = [new Vector3(), new Vector3(), new Vector3()];
    trackFrame(track, 0, p, r, u, f);
    expect(p.distanceTo(track.pos[0])).toBeLessThan(1e-6);
    trackFrame(track, track.length, p, r, u, f);
    expect(p.distanceTo(track.pos[0])).toBeLessThan(1e-6);
    trackFrame(track, track.s[5] + 1, p, r, u, f);
    expect(p.distanceTo(track.pos[5])).toBeCloseTo(1, 1);
    expect(r.length()).toBeCloseTo(1);
    expect(f.dot(track.tan[5])).toBeGreaterThan(0.99);
  });
});

describe('director', () => {
  const fly = (st = newCineState(), seconds = 60, dt = 1 / 60) => {
    const ship = newShip();
    spawnOnTrack(ship, track, 50, 80);
    const cam = new PerspectiveCamera(70, 1, 0.1, 5000);
    const fwd = new Vector3();
    let near = nearestOnTrack(track, ship.pos);
    const shots: Shot[] = [];
    let maxStep = 0;
    let maxDist = 0;
    /** per fly-by: closest the ship came, and how far the camera drifted */
    const flybys: { closest: number; drift: number; wall: number; passed: boolean }[] = [];
    let start = new Vector3();
    let prevT = 0;
    for (let t = 0; t < seconds; t += dt) {
      // fly the centreline at constant speed
      near = nearestOnTrack(track, ship.pos, near.index);
      trackFrame(track, near.s + 80 * dt, ship.pos, new Vector3(), new Vector3(), fwd);
      ship.vel.copy(fwd).multiplyScalar(80);
      ship.quat.setFromUnitVectors(new Vector3(0, 0, -1), fwd);
      cineScene.track = track;
      cineScene.near = near;
      const before = cam.position.clone();
      placeCinematic(cam, ship, dt, st, 70);
      if (st.shot === 'flyby') {
        if (shots.at(-1) !== 'flyby' || st.t < prevT) {
          start = cam.position.clone();
          flybys.push({ closest: Infinity, drift: 0, wall: 0, passed: false });
        }
        const f = flybys.at(-1)!;
        f.closest = Math.min(f.closest, cam.position.distanceTo(ship.pos));
        f.drift = Math.max(f.drift, cam.position.distanceTo(start));
        f.wall = Math.max(f.wall, nearestOnTrack(track, cam.position).dist / track.radius);
        f.passed ||= st.passT >= 0;
      }
      prevT = st.t;
      if (shots.at(-1) !== st.shot) shots.push(st.shot);
      else maxStep = Math.max(maxStep, before.distanceTo(cam.position));
      maxDist = Math.max(maxDist, cam.position.distanceTo(ship.pos));
      expect(Number.isFinite(cam.position.x) && Number.isFinite(cam.fov)).toBe(true);
    }
    cineScene.track = cineScene.near = null;
    return { shots, maxStep, maxDist, cam, flybys };
  };

  it('cuts between different shots on a timer', () => {
    const { shots } = fly();
    // 60 s with 4–8 s shots (or earlier for a pass-by)
    expect(shots.length).toBeGreaterThanOrEqual(8);
    for (let i = 1; i < shots.length; i++) expect(shots[i]).not.toBe(shots[i - 1]);
  });

  it('keeps the camera moving smoothly within a shot and near the ship', () => {
    const { maxStep, maxDist } = fly();
    // at 80 m/s the ship moves 1.3 m a frame; a camera should never jump far more than that
    expect(maxStep).toBeLessThan(15);
    expect(maxDist).toBeLessThan(800);
  });

  it('opens on a fly-by: the camera stands still inside the tube and the ship passes close', () => {
    const { shots, flybys } = fly();
    expect(shots[0]).toBe('flyby');
    expect(flybys.length).toBeGreaterThanOrEqual(3);
    // every fly-by but a possibly unfinished last one saw the ship go past
    for (const f of flybys.slice(0, -1)) {
      expect(f.passed).toBe(true);
      expect(f.drift).toBeLessThan(1e-6);
      expect(f.closest).toBeLessThan(track.radius);
      expect(f.wall).toBeLessThan(0.6);
    }
  });

  it('spends most of the time on pass-by shots', () => {
    const { shots } = fly(newCineState(), 120);
    expect(shots.filter(isStatic).length / shots.length).toBeGreaterThan(0.55);
  });

  it('flies past in free flight too', () => {
    const st = newCineState();
    const ship = newShip();
    ship.vel.set(0, 0, -60);
    const cam = new PerspectiveCamera(70, 1, 0.1, 5000);
    const dt = 1 / 60;
    let closest = Infinity;
    placeCinematic(cam, ship, dt, st, 70);
    const spot = cam.position.clone();
    expect(st.shot).toBe('flyby');
    while (st.shot === 'flyby' && st.t < 10) {
      ship.pos.addScaledVector(ship.vel, dt);
      placeCinematic(cam, ship, dt, st, 70);
      if (st.shot === 'flyby') {
        expect(cam.position.distanceTo(spot)).toBeLessThan(1e-6);
        closest = Math.min(closest, cam.position.distanceTo(ship.pos));
      }
    }
    expect(closest).toBeLessThan(10);
    expect(st.shot).not.toBe('flyby');
  });

  it('is deterministic for a seed', () => {
    expect(fly(newCineState(9)).shots).toEqual(fly(newCineState(9)).shots);
  });

  it('respects the allowed shot list', () => {
    set('cam.cine.shots', 'hero,tail');
    try {
      const { shots } = fly();
      expect(new Set(shots)).toEqual(new Set(['hero', 'tail']));
    } finally {
      set('cam.cine.shots', SHOTS.join(','));
    }
  });

  it('hard-cuts by default and glides when blend is set', () => {
    const cut = newCineState();
    fly(cut, 30);
    expect(cut.from).toBeNull();
    // pass-bys always hard-cut, so glide between moving shots
    set('cam.cine.blend', 4);
    set('cam.cine.shots', 'hero,drone,orbit,tail');
    try {
      const glide = newCineState();
      let glided = false;
      for (let i = 0; i < 30 && !glided; i++) {
        fly(glide, 1);
        glided = glide.from !== null;
      }
      expect(glided).toBe(true);
    } finally {
      set('cam.cine.blend', 0);
      set('cam.cine.shots', SHOTS.join(','));
    }
  });

  it('cuts to a reaction shot after an event, once the shot has been held', () => {
    const st = newCineState();
    fly(st, 0.5);
    const was = st.shot;
    cineEvent(st, 'nearMiss');
    expect(st.want).not.toBeNull();
    expect(['tail', 'flyby']).toContain(st.want);
    const want = st.want;
    fly(st, 0.5); // still within the minimum hold
    expect(st.shot).toBe(was);
    fly(st, REACT_HOLD);
    expect(st.shot).toBe(want);
    expect(st.want).toBeNull();
  });

  it('ignores events with no reaction shot', () => {
    const st = newCineState();
    cineEvent(st, 'checkpoint');
    expect(st.want).toBeNull();
  });

  it('is a rig, and leaving it restarts the director', () => {
    const st = newRigState();
    const ship = newShip();
    const cam = new PerspectiveCamera(70, 1, 0.1, 5000);
    placeRig('cinematic', cam, ship, 1 / 60, st);
    expect(st.cine.started).toBe(true);
    placeRig('chase', cam, ship, 1 / 60, st);
    expect(st.cine.started).toBe(false);
    expect(cam.fov).toBe(70);
  });
});
