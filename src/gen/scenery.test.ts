import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams } from './track';
import { addRoutes, nearestOnPath, radAt } from './routes';
import { generateScenery, placements, propBalls, SCENERY_KINDS, type SceneryParams } from './scenery';

const gen: RaceGenParams = { seed: 4, points: 12, radius: 600, wobble: 0.35, height: 150, twist: 0, twistNoise: 0.5, tubeRadius: 30, spacing: 4, checkpoints: 8 };
const params: SceneryParams = { seed: 4, kinds: [...SCENERY_KINDS], count: 40, size: 30, spread: 500, ground: 'both', gap: 150, clearance: 1.5 };
// a branch or two, judged by the quick estimate (no autopilot) so the test stays fast
const track = addRoutes(generateTrack(gen), { seed: 4, forks: 2, pitLane: true, saveMin: 0, saveMax: 1, costMax: 1 });

describe('generateScenery', () => {
  const sc = generateScenery(track, params);

  it('places every kind', () => {
    for (const k of SCENERY_KINDS) expect(sc.props.some((p) => p.kind === k), k).toBe(true);
  });

  it('no prop reaches into the corridor of the loop or any branch', () => {
    expect(track.branches?.length).toBeGreaterThan(0);
    for (const p of sc.props)
      for (const b of propBalls(p)) {
        const main = nearestOnTrack(track, b.c);
        expect(main.dist - b.r, p.kind).toBeGreaterThan(track.radius);
        for (const br of track.branches ?? []) {
          const n = nearestOnPath(br, b.c);
          expect(n.dist - b.r, `${p.kind} by a ${br.kind}`).toBeGreaterThan(radAt(br, n));
        }
      }
  });

  it('is deterministic per seed', () => {
    const again = generateScenery(track, params);
    expect(again.props.map((p) => p.pos.toArray())).toEqual(sc.props.map((p) => p.pos.toArray()));
    const other = generateScenery(track, { ...params, seed: 5 });
    expect(other.props[0].pos.equals(sc.props[0].pos)).toBe(false);
  });

  it('floor sits below the track and ceiling above, a gap from the tube', () => {
    const ys = track.pos.map((p) => p.y);
    expect(sc.floorY).toBeCloseTo(Math.min(...ys) - track.radius - params.gap, 0);
    expect(sc.ceilY).toBeCloseTo(Math.max(...ys) + track.radius + params.gap, 0);
    expect(generateScenery(track, { ...params, ground: 'none' }).floorY).toBeNull();
    expect(generateScenery(track, { ...params, ground: 'floor' }).ceilY).toBeNull();
  });

  it('rooted props stand on the floor or hang from the ceiling', () => {
    for (const p of sc.props.filter((x) => x.kind === 'spires')) expect([sc.floorY, sc.ceilY]).toContain(p.pos.y);
    for (const p of sc.props.filter((x) => x.kind === 'peaks')) expect(p.pos.y).toBe(sc.ceilY);
  });

  it('ribs and halos are centred on the track, so it flies through them', () => {
    for (const p of sc.props.filter((x) => x.kind === 'ribs' || x.kind === 'halos')) expect(nearestOnTrack(track, p.pos).dist).toBeLessThan(1e-6);
  });

  it('built props stand on the floor or hang from the ceiling, upright', () => {
    const up = new Vector3();
    for (const p of sc.props.filter((x) => x.kind === 'towers' || x.kind === 'domes')) {
      up.set(0, 1, 0).applyQuaternion(p.quat);
      const onFloor = Math.abs(p.pos.y - sc.floorY!) <= p.scale.y * 0.05 + 1e-6;
      const onCeil = Math.abs(p.pos.y - sc.ceilY!) <= p.scale.y * 0.05 + 1e-6;
      expect(onFloor || onCeil, p.kind).toBe(true);
      // towers stand within a slight lean, domes dead upright; both point away from their ground
      expect(onFloor ? up.y : -up.y, p.kind).toBeGreaterThan(0.99 - (p.kind === 'towers' ? 0.05 : 0));
    }
    for (const p of sc.props.filter((x) => x.kind === 'arches' || x.kind === 'skulls' || x.kind === 'wrecks')) {
      expect(p.pos.y, p.kind).toBeGreaterThanOrEqual(sc.floorY! - p.scale.y * 0.1 - 1e-6);
      expect(p.pos.y, p.kind).toBeLessThan(sc.floorY! + p.scale.y);
    }
  });

  it('wrecks are huge, and nose down into the floor', () => {
    const wrecks = sc.props.filter((x) => x.kind === 'wrecks');
    expect(wrecks.length).toBeGreaterThan(0);
    const nose = new Vector3();
    for (const w of wrecks) {
      expect(w.scale.x).toBeGreaterThanOrEqual(params.size * 5);
      nose.set(1, 0, 0).applyQuaternion(w.quat);
      expect(nose.y).toBeLessThan(0);
    }
  });

  it('spines are runs of vertebrae, each a step on from the last and tapering', () => {
    const verts = sc.props.filter((x) => x.kind === 'spines');
    expect(verts.length).toBeGreaterThan(placements('spines', params.count) * 5);
    let steps = 0;
    for (let i = 1; i < verts.length; i++) {
      const a = verts[i - 1];
      const b = verts[i];
      const d = a.pos.distanceTo(b.pos);
      // neighbours in the same spine (a vertebra that didn't fit leaves a gap)
      if (d > a.scale.x * 0.73 + 1e-6) continue;
      steps++;
      expect(d).toBeGreaterThan(a.scale.x * 0.6);
      expect(b.scale.x).toBeLessThan(a.scale.x);
      const along = new Vector3(0, 0, 1).applyQuaternion(a.quat);
      expect(along.dot(b.pos.clone().sub(a.pos).normalize())).toBeGreaterThan(0.95);
    }
    expect(steps).toBeGreaterThan(verts.length / 2);
  });

  it('places every kind in open space too, clear of the corridor', () => {
    const open = generateScenery(track, { ...params, ground: 'none' });
    for (const k of SCENERY_KINDS) expect(open.props.some((p) => p.kind === k), k).toBe(true);
    for (const p of open.props) for (const b of propBalls(p)) expect(nearestOnTrack(track, b.c).dist - b.r, p.kind).toBeGreaterThan(track.radius);
  });

  it('sparse kinds get a tenth of the count, at least one', () => {
    expect(placements('wrecks', 120)).toBe(12);
    expect(placements('spines', 3)).toBe(1);
    expect(placements('skulls', 120)).toBe(120);
    expect(placements('towers', -2)).toBe(0);
  });

  it('no kinds, no props', () => {
    expect(generateScenery(track, { ...params, kinds: [] }).props).toEqual([]);
  });
});
