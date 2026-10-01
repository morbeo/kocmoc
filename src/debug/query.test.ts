import { describe, it, expect } from 'vitest';
import { Registry } from '../core/vars';
import { parseQuery, filterRows, type Row } from './query';

function rows(): { r: Registry; rows: Row[] } {
  const r = new Registry();
  r.num('juice.shake.intensity', 0.5, { tags: ['juice'] });
  r.num('ship.thrust.max', 120, { tags: ['feel'], desc: 'forward acceleration' });
  r.bool('ship.flightAssist', true, { tags: ['feel'] });
  r.watch('perf.fps', () => 60, { tags: ['perf'] });
  const list: Row[] = [
    ...r.list().map((v) => ({ kind: 'var' as const, path: v.path, tags: v.meta.tags ?? [], desc: v.meta.desc ?? '', v })),
    ...[...r.watches.values()].map((w) => ({ kind: 'watch' as const, path: w.path, tags: w.meta.tags ?? [], desc: '', w })),
  ];
  return { r, rows: list };
}

const paths = (m: { row: Row }[]) => m.map((x) => x.row.path);

describe('parseQuery', () => {
  it('splits tags, flags and text', () => {
    expect(parseQuery('  #Feel shk :mod int :fav ')).toEqual({
      text: 'shk int',
      tags: ['feel'],
      mod: true,
      fav: true,
      watch: false,
    });
  });
});

describe('filterRows', () => {
  it('fuzzy matches abbreviated words', () => {
    const { rows: list } = rows();
    expect(paths(filterRows(list, parseQuery('shk int'), new Set()))[0]).toBe('juice.shake.intensity');
  });

  it('searches descriptions', () => {
    const { rows: list } = rows();
    expect(paths(filterRows(list, parseQuery('acceleration'), new Set()))).toEqual(['ship.thrust.max']);
  });

  it('filters by tag, sorted by path without text', () => {
    const { rows: list } = rows();
    expect(paths(filterRows(list, parseQuery('#feel'), new Set()))).toEqual(['ship.flightAssist', 'ship.thrust.max']);
  });

  it('filters modified, favourites and watches', () => {
    const { r, rows: list } = rows();
    r.set('ship.thrust.max', 200);
    expect(paths(filterRows(list, parseQuery(':mod'), new Set()))).toEqual(['ship.thrust.max']);
    expect(paths(filterRows(list, parseQuery(':fav'), new Set(['ship.flightAssist'])))).toEqual(['ship.flightAssist']);
    expect(paths(filterRows(list, parseQuery(':watch'), new Set()))).toEqual(['perf.fps']);
  });

  it('returns path highlight indexes', () => {
    const { rows: list } = rows();
    const [m] = filterRows(list, parseQuery('thrust'), new Set());
    expect(m.indexes.length).toBe(6);
  });
});
