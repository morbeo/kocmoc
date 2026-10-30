import { describe, it, expect } from 'vitest';
import { PerspectiveCamera, Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams } from '../gen/track';
import { rng } from '../core/rng';
import { vars } from '../core/vars';
import { newShip } from '../sim/ship';
import { spawnOnTrack } from '../sim/race';
import { REACT_HOLD, SHOTS, cineEvent, cineScene, ease, newCineState, nextShot, parseShots, placeCinematic, staticShotDone, telephotoFov, trackFrame, type Shot } from './cinematic';
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

  it('ends a static shot once the ship is past or far away', () => {
    const fwd = new Vector3(0, 0, -1);
    const spot = new Vector3(0, 0, -100);
    expect(staticShotDone(spot, new Vector3(0, 0, -50), fwd, 40, 1000)).toBe(false);
    expect(staticShotDone(spot, new Vector3(0, 0, -150), fwd, 40, 1000)).toBe(true);
    expect(staticShotDone(spot, new Vector3(2000, 0, -50), fwd, 40, 1000)).toBe(true);
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
      if (shots.at(-1) !== st.shot) shots.push(st.shot);
      else maxStep = Math.max(maxStep, before.distanceTo(cam.position));
      maxDist = Math.max(maxDist, cam.position.distanceTo(ship.pos));
      expect(Number.isFinite(cam.position.x) && Number.isFinite(cam.fov)).toBe(true);
    }
    cineScene.track = cineScene.near = null;
    return { shots, maxStep, maxDist, cam };
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
    set('cam.cine.blend', 4);
    try {
      const glide = newCineState();
      fly(glide, 30);
      expect(glide.from).not.toBeNull();
    } finally {
      set('cam.cine.blend', 0);
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
