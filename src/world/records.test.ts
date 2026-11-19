import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { vars } from '../core/vars';
import { bestKey, ghostKey, LADDER_KEY, loadLadder } from './records';

const touched = new Set<string>();
const set = (path: string, value: unknown) => {
  touched.add(path);
  vars.set(path, value);
};
afterEach(() => {
  for (const p of touched) vars.unset(p);
  touched.clear();
});

describe('best lap keys', () => {
  it('differ per mode', () => {
    const keys = ['race', 'gauntlet', 'proving'].map((m) => {
      set('game.mode', m);
      return bestKey();
    });
    expect(new Set(keys).size).toBe(3);
    expect(keys[1]).toMatch(/^kocmoc\.best\.gauntlet\./);
    expect(keys[2]).toMatch(/^kocmoc\.best\.proving\./);
  });

  it('change with the track, and only grow suffixes for features that are on', () => {
    const plain = bestKey();
    expect(plain).toMatch(/\|routes/); // forks are on by default
    expect(plain).not.toMatch(/\|(sections|hazards|pads|movers)/);
    set('gen.race.seed', 77);
    const reseeded = bestKey();
    expect(reseeded).not.toBe(plain);
    set('gen.race.sections', 2);
    expect(bestKey()).toMatch(/\|sections/);
    set('gen.race.hazards', 3);
    expect(bestKey()).toMatch(/\|sections.*\|hazards/);
  });

  it('ghost key mirrors the best key', () => {
    set('gen.race.seed', 5);
    expect(ghostKey()).toBe(bestKey().replace('kocmoc.best.', 'kocmoc.ghost.'));
    expect(ghostKey()).toMatch(/^kocmoc\.ghost\./);
  });
});

describe('loadLadder', () => {
  const store = new Map<string, string>();
  beforeEach(() => {
    store.clear();
    vi.stubGlobal('localStorage', { getItem: (k: string) => store.get(k) ?? null });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('is empty with nothing stored', () => {
    expect(loadLadder()).toEqual({});
  });

  it('reads and validates the stored ladder', () => {
    store.set(LADDER_KEY, JSON.stringify({ balanced: { cleared: 3, best: { 1: 900, 2: 'x' } } }));
    expect(loadLadder()).toEqual({ balanced: { cleared: 3, best: { 1: 900 } } });
  });

  it('survives corrupt JSON', () => {
    store.set(LADDER_KEY, '{nope');
    expect(loadLadder()).toEqual({});
  });

  it('survives storage that throws (private mode)', () => {
    vi.stubGlobal('localStorage', { getItem: () => { throw new Error('denied'); } });
    expect(loadLadder()).toEqual({});
  });
});
