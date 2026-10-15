import { it, expect } from 'vitest';
import { formatTime } from './hud';

it('formats lap times as m:ss.mmm', () => {
  expect(formatTime(0)).toBe('0:00.000');
  expect(formatTime(83.4567)).toBe('1:23.457');
  expect(formatTime(9.5)).toBe('0:09.500');
  expect(formatTime(null)).toBe('–:––.–––');
});
