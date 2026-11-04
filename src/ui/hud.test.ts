import { it, expect } from 'vitest';
import { formatGap, formatTime, lapLabel, ordinal, provingCard, type ProvingHud } from './hud';

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

const run: ProvingHud = {
  level: 3, timeLeft: 12.34, gates: 40, hits: 38, misses: 2, beacons: 10, collected: 4, result: 'clear', score: 2423,
  weights: { time: 10, gate: 50, beacon: 25 }, best: 2423, newBest: true, badge: false, ship: 'light',
};

it('breaks a proving score down into time, gates and beacons', () => {
  const html = provingCard(run);
  expect(html).toContain('Level 3 cleared');
  expect(html).toContain('<b>123</b>'); // 12.34 s × 10
  expect(html).toContain('<b>1900</b>'); // 38 × 50
  expect(html).toContain('<b>100</b>'); // 4 × 25
  expect(html).toContain('2 gates missed');
  expect(html).toContain('NEW BEST');
  expect(html).not.toContain('BADGE');
});

it('shows out of time without time points, badges, and custom ships', () => {
  const out = provingCard({ ...run, result: 'timeout', newBest: false });
  expect(out).toContain('Out of time');
  expect(out).toContain('<span>0.0 s</span><b>0</b>');
  expect(provingCard({ ...run, badge: true })).toContain('LIGHT BADGE EARNED');
  expect(provingCard({ ...run, ship: null, newBest: false })).toContain('custom ship: no badge');
});
