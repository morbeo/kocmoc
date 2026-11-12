import { it, expect } from 'vitest';
import { trimInputs } from './replay';

it('trimInputs cuts the runs to the first ticks, the last one kept going short', () => {
  const runs = [[3, 1], [2, 2], [4, 3]];
  expect(trimInputs(runs, 9)).toEqual(runs);
  expect(trimInputs(runs, 4)).toEqual([[3, 1], [1, 2]]);
  expect(trimInputs(runs, 3)).toEqual([[3, 1]]);
  expect(trimInputs(runs, 0)).toEqual([]);
  expect(trimInputs(runs, 20)).toEqual(runs);
});
