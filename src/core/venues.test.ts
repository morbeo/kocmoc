import { describe, it, expect } from 'vitest';
import { scenarios, venues } from './scenarios';
import { generateTrack, TRACK_SHAPES, type RaceGenParams, type TrackShape } from '../gen/track';
import { generateScenery, SCENERY_KINDS, GROUND_MODES, type SceneryKind } from '../gen/scenery';
import { venueTags } from '../ui/tracks';
import { addSections, SECTION_KINDS, type SectionKind } from '../gen/sections';
import { HAZARD_KINDS } from '../gen/gauntlet';
import type { Scenario } from './scenarios';

// every source file, to check that venue vars name real vars
const sources = Object.values(import.meta.glob<string>('/src/**/*.{ts,tsx}', { eager: true, query: '?raw', import: 'default' })).join('\n');

/** A venue's track params, as its vars set them over the defaults. */
function params(v: Scenario): RaceGenParams {
  const x = v.vars ?? {};
  const num = (k: string, d: number) => (typeof x[k] === 'number' ? (x[k] as number) : d);
  return {
    seed: v.seed ?? 1,
    points: num('gen.race.points', 12),
    radius: num('gen.race.radius', 1000),
    wobble: num('gen.race.wobble', 0.35),
    height: num('gen.race.height', 250),
    twist: num('gen.race.twist', 0),
    twistNoise: num('gen.race.twistNoise', 0.5),
    tubeRadius: num('gen.race.tubeRadius', 40),
    spacing: 4,
    checkpoints: 8,
    shape: (x['gen.race.shape'] as TrackShape | undefined) ?? 'loop',
  };
}

describe('race venues', () => {
  const list = venues();

  it('there are twelve, each with its own title, seed and look', () => {
    expect(list).toHaveLength(12);
    expect(new Set(list.map((v) => v.title)).size).toBe(12);
    expect(new Set(list.map((v) => v.seed)).size).toBe(12);
    expect(new Set(list.map((v) => v.vars?.['render.background'])).size).toBe(12);
    for (const v of list) {
      expect(v.mode).toBe('race');
      expect(v.desc?.length).toBeGreaterThan(20);
    }
  });

  it('only venues are listed', () => {
    expect(venues(scenarios).every((s) => s.name.startsWith('venue-'))).toBe(true);
    expect(venues([{ name: 'sprint' }, { name: 'venue-x' }, { name: 'venue-y', title: 'Y' }]).map((s) => s.name)).toEqual(['venue-y']);
  });

  it('use at least six layouts and every scenery kind between them', () => {
    const shapes = new Set(list.map((v) => v.vars?.['gen.race.shape'] ?? 'loop'));
    for (const s of shapes) expect(TRACK_SHAPES).toContain(s);
    expect(shapes.size).toBeGreaterThanOrEqual(6);
    const kinds = new Set(list.flatMap((v) => String(v.vars?.['world.scenery.kinds'] ?? '').split(',')));
    for (const k of SCENERY_KINDS) expect(kinds, k).toContain(k);
    const sections = new Set(list.flatMap((v) => String(v.vars?.['gen.race.sectionKinds'] ?? '').split(',')));
    for (const k of SECTION_KINDS) expect(sections, k).toContain(k);
    const hazards = new Set(list.flatMap((v) => String(v.vars?.['gen.race.hazardKinds'] ?? '').split(',')));
    for (const k of HAZARD_KINDS) expect(hazards, k).toContain(k);
  });

  it('every venue has hazards, and the underground ones are enclosed', () => {
    for (const v of list) expect(v.vars?.['gen.race.hazards'], v.name).toBeGreaterThan(0);
    const under = list.filter((v) => (v.vars?.['gen.race.profile'] ?? 'tube') === 'tube');
    expect(under.length).toBeGreaterThanOrEqual(2);
    for (const v of under) expect(v.vars?.['gen.race.sections'], v.name).toBeGreaterThanOrEqual(8);
  });

  it('place most of the sections they ask for', () => {
    let want = 0;
    let got = 0;
    for (const v of list) {
      const x = v.vars ?? {};
      const t = generateTrack(params(v));
      const kinds = String(x['gen.race.sectionKinds']).split(',') as SectionKind[];
      const count = x['gen.race.sections'] as number;
      const placed = addSections(t, { seed: v.seed ?? 1, count, kinds, minLength: x['gen.race.sectionMin'] as number, maxLength: x['gen.race.sectionMax'] as number }).sections ?? [];
      expect(placed.length, v.name).toBeGreaterThanOrEqual(2);
      want += count;
      got += placed.length;
    }
    expect(got / want).toBeGreaterThan(0.7);
  });

  it('only set vars that exist', () => {
    for (const v of list)
      for (const key of Object.keys(v.vars ?? {})) expect(sources.includes(`'${key}'`), `${v.name}: ${key}`).toBe(true);
  });

  it('each generates a flyable track with its scenery', () => {
    for (const v of list) {
      const x = v.vars ?? {};
      const num = (k: string, d: number) => (typeof x[k] === 'number' ? (x[k] as number) : d);
      const p = params(v);
      const t = generateTrack(p);
      expect(t.attempts, v.name).toBeLessThanOrEqual(3);
      const kinds = String(x['world.scenery.kinds'] ?? '').split(',').filter(Boolean) as SceneryKind[];
      const ground = (x['world.ground'] as (typeof GROUND_MODES)[number] | undefined) ?? 'none';
      const count = num('world.scenery.count', 120);
      const sc = generateScenery(t, { seed: p.seed, kinds, count, size: num('world.scenery.size', 60), spread: num('world.scenery.spread', 700), ground, gap: num('world.ground.gap', 200), clearance: 1.6 });
      // most candidates fit: the scenery is as busy as the venue asks for
      for (const k of kinds) {
        const want = k === 'ribs' || k === 'halos' ? count / 10 : count;
        expect(sc.props.filter((q) => q.kind === k).length, `${v.name} ${k}`).toBeGreaterThan(want * 0.5);
      }
    }
  });

  it('tags show the layout, rolls and laps', () => {
    expect(venueTags({ name: 'x', vars: { 'gen.race.shape': 'figure8', 'gen.race.twist': 2, 'gen.race.profile': 'rails', 'race.laps': 2 } })).toEqual(['figure eight', '2 rolls a lap', 'rails', '2 laps']);
    expect(venueTags({ name: 'x' })).toEqual(['loop']);
  });
});
