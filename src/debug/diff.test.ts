import { describe, it, expect } from 'vitest';
import { diffVars, resolveIn } from './diff';

const list = [
  { path: 'b.x', def: 1, value: 2 },
  { path: 'a.y', def: 'red', value: 'red' },
  { path: 'a.z', def: [0, 0, 0], value: [0, 1, 0] },
];

describe('diffVars', () => {
  it('against defaults: only changed vars, sorted', () => {
    expect(diffVars(list, null)).toEqual([
      { path: 'a.z', before: [0, 0, 0], after: [0, 1, 0] },
      { path: 'b.x', before: 1, after: 2 },
    ]);
  });

  it('against a snapshot: the snapshot’s effective values are the baseline', () => {
    const snap = { 'preset:feel': { 'b.x': 2, 'a.y': 'blue' }, user: { 'a.y': 'green' } };
    expect(diffVars(list, snap)).toEqual([
      { path: 'a.y', before: 'green', after: 'red' },
      { path: 'a.z', before: [0, 0, 0], after: [0, 1, 0] },
    ]);
  });
});

describe('resolveIn', () => {
  it('higher layers win and invalid values fall through', () => {
    const v = { path: 'n', def: 0, value: 0, coerce: (r: unknown) => (typeof r === 'number' ? r : undefined) };
    expect(resolveIn({ scenario: { n: 3 }, user: { n: 'bad' } }, v)).toBe(3);
    expect(resolveIn({}, v)).toBe(0);
  });
});
