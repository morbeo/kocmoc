import { it, expect } from 'vitest';
import { rampValues } from './toon';

it('ramp has `steps` bands from floor to full brightness', () => {
  expect([...rampValues(3, 0)]).toEqual([0, 128, 255]);
  expect([...rampValues(2, 0.5)]).toEqual([128, 255]);
  expect([...rampValues(4, 0.2)]).toEqual([51, 119, 187, 255]);
});
