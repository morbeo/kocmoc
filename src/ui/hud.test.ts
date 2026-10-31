import { it, expect } from 'vitest';
import { formatGap, formatTime, lapLabel, ordinal } from './hud';

it('formats lap times as m:ss.mmm', () => {
  expect(formatTime(0)).toBe('0:00.000');
  expect(formatTime(83.4567)).toBe('1:23.457');
  expect(formatTime(9.5)).toBe('0:09.500');
  expect(formatTime(null)).toBe('–:––.–––');
});

it('formats gaps with a sign, negative = ahead', () => {
  expect(formatGap(1.234)).toBe('+1.23');
  expect(formatGap(-0.5)).toBe('−0.50');
});

it('names places', () => {
  expect([1, 2, 3, 4, 11, 12, 13, 21, 22, 101].map(ordinal)).toEqual(['1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st', '22nd', '101st']);
});

it('labels laps against the race length, held at the last lap', () => {
  expect(lapLabel(2, 3)).toBe('LAP 2/3');
  expect(lapLabel(4, 3)).toBe('LAP 3/3');
  expect(lapLabel(5, 0)).toBe('LAP 5');
});
