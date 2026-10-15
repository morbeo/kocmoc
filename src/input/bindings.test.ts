import { describe, it, expect } from 'vitest';
import { actionLabel, conflicts, keyLabel, parseCodes, setSlot } from './bindings';

describe('bindings', () => {
  it('parses comma-separated codes, ignoring blanks and spaces', () => {
    expect(parseCodes(' ShiftLeft, ShiftRight ,')).toEqual(['ShiftLeft', 'ShiftRight']);
    expect(parseCodes('')).toEqual([]);
  });

  it('sets, appends and clears slots', () => {
    expect(setSlot('KeyW', 0, 'KeyI')).toBe('KeyI');
    expect(setSlot('KeyW', 1, 'ArrowUp')).toBe('KeyW,ArrowUp');
    expect(setSlot('KeyW', 5, 'ArrowUp')).toBe('KeyW,ArrowUp');
    expect(setSlot('KeyW,ArrowUp', 0, null)).toBe('ArrowUp');
    expect(setSlot('KeyW', 1, null)).toBe('KeyW');
    expect(setSlot('', 0, 'KeyW')).toBe('KeyW');
  });

  it('swaps instead of duplicating a code already bound to the action', () => {
    expect(setSlot('KeyW,ArrowUp', 0, 'ArrowUp')).toBe('ArrowUp,KeyW');
    expect(setSlot('KeyW', 1, 'KeyW')).toBe('KeyW');
  });

  it('reports codes shared by several actions', () => {
    const c = conflicts({ a: 'KeyW,KeyX', b: 'KeyW', c: 'KeyX,KeyX', d: '' });
    expect([...c]).toEqual([
      ['KeyW', ['a', 'b']],
      ['KeyX', ['a', 'c']],
    ]);
  });

  it('labels keys and actions for display', () => {
    expect(['KeyW', 'Digit3', 'ArrowUp', 'ShiftLeft', 'ControlRight', 'Numpad8', 'Space', 'F3'].map(keyLabel)).toEqual([
      'W', '3', '↑', 'L Shift', 'R Ctrl', 'Num 8', 'Space', 'F3',
    ]);
    expect(actionLabel('input.key.pitchUp')).toBe('Pitch up');
    expect(actionLabel('input.key.someNew')).toBe('someNew');
  });
});
