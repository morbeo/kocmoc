import { describe, it, expect } from 'vitest';
import { generateTrack, nearestOnTrack, type RaceGenParams } from './track';
import { addRoutes, nearestOnPath, radAt } from './routes';
import { generateScenery, propBalls, SCENERY_KINDS, type SceneryParams } from './scenery';

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

  it('no kinds, no props', () => {
    expect(generateScenery(track, { ...params, kinds: [] }).props).toEqual([]);
  });
});
