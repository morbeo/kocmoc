import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Registry } from './vars';

let r: Registry;
beforeEach(() => {
  r = new Registry();
  vi.useFakeTimers();
});
afterEach(() => vi.useRealTimers());

describe('definition', () => {
  it('returns default value and source', () => {
    const v = r.num('ship.thrust', 120);
    expect(v.value).toBe(120);
    expect(v.source.value).toBe('default');
    expect(v.modified).toBe(false);
  });

  it('redefining keeps layer values and updates default', () => {
    r.num('a', 1);
    r.set('a', 5);
    const v = r.num('a', 2, { unit: 'm' });
    expect(v.value).toBe(5);
    expect(v.def).toBe(2);
    expect(v.meta.unit).toBe('m');
  });

  it('rejects redefinition with another type', () => {
    r.num('a', 1);
    expect(() => r.bool('a', true)).toThrow();
  });

  it('applies layer values set before the var was registered', () => {
    r.set('later', 7, 'scenario');
    expect(r.num('later', 1).value).toBe(7);
  });
});

describe('layers', () => {
  it('higher layers win, unset falls through', () => {
    const v = r.num('x', 0);
    r.set('x', 1, 'preset:feel');
    r.set('x', 2, 'scenario');
    r.set('x', 3, 'user');
    expect([v.value, v.source.value]).toEqual([3, 'user']);
    r.unset('x');
    expect([v.value, v.source.value]).toEqual([2, 'scenario']);
    r.unset('x', 'scenario');
    expect([v.value, v.source.value]).toEqual([1, 'preset:feel']);
  });

  it('invalid layer values fall through to lower layers', () => {
    const v = r.enum('mode', 'a', ['a', 'b']);
    r.set('mode', 'b', 'preset:feel');
    r.restore({ 'preset:feel': { mode: 'b' }, user: { mode: 'nope' } });
    expect(v.value).toBe('b');
  });

  it('coerces values by type', () => {
    expect((r.int('i', 0), r.set('i', 2.7), r.get('i')!.value)).toBe(3);
    const c = r.color('c', '#000000');
    r.set('c', '#ABCDEF');
    expect(c.value).toBe('#abcdef');
    r.set('c', 'red');
    expect(c.value).toBe('#abcdef');
    const p = r.vec3('p', [0, 0, 0]);
    r.set('p', [1, 2, Number.NaN]);
    expect(p.value).toEqual([0, 0, 0]);
  });

  it('setLayer replaces a whole layer', () => {
    const a = r.num('a', 0);
    const b = r.num('b', 0);
    r.setLayer('preset:juice', { a: 1, b: 1 });
    r.setLayer('preset:juice', { a: 2 });
    expect([a.value, b.value]).toEqual([2, 0]);
  });

  it('snapshot / restore round-trips', () => {
    r.num('a', 0);
    r.set('a', 1, 'preset:visual');
    r.set('a', 2);
    r.set('unregistered', 'kept', 'scenario');
    const snap = r.snapshot();
    r.restore({});
    expect(r.get('a')!.value).toBe(0);
    r.restore(snap);
    expect(r.get('a')!.value).toBe(2);
    expect(r.snapshot()).toEqual(snap);
  });

  it('notifies listeners with effective changes only', () => {
    r.num('a', 0);
    const fn = vi.fn();
    r.onChange(fn);
    r.set('a', 1);
    r.set('a', 1);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('history', () => {
  it('undo / redo single edits', () => {
    const v = r.num('a', 0);
    r.set('a', 1);
    vi.advanceTimersByTime(1000);
    r.set('a', 2);
    r.history.undo();
    expect(v.value).toBe(1);
    r.history.undo();
    expect(v.value).toBe(0);
    expect(v.source.value).toBe('default');
    r.history.redo();
    r.history.redo();
    expect(v.value).toBe(2);
  });

  it('coalesces rapid edits to the same var', () => {
    const v = r.num('a', 0);
    for (let i = 1; i <= 10; i++) {
      r.set('a', i);
      vi.advanceTimersByTime(50);
    }
    r.history.undo();
    expect(v.value).toBe(0);
    expect(r.history.canUndo.value).toBe(false);
  });

  it('does not coalesce edits to different vars', () => {
    const a = r.num('a', 0);
    const b = r.num('b', 0);
    r.set('a', 1);
    r.set('b', 1);
    r.history.undo();
    expect([a.value, b.value]).toEqual([1, 0]);
  });

  it('restore is one undo step', () => {
    const a = r.num('a', 0);
    const b = r.num('b', 0);
    r.restore({ user: { a: 1, b: 2 }, scenario: { a: 5 } });
    r.history.undo();
    expect([a.value, b.value]).toEqual([0, 0]);
    expect(r.snapshot()).toEqual({});
  });

  it('new edit clears redo', () => {
    r.num('a', 0);
    r.set('a', 1);
    r.history.undo();
    vi.advanceTimersByTime(1000);
    r.set('a', 2);
    expect(r.history.canRedo.value).toBe(false);
  });

  it('restore without recording leaves history untouched', () => {
    r.num('a', 0);
    r.restore({ user: { a: 3 } }, false);
    expect(r.history.canUndo.value).toBe(false);
  });
});
