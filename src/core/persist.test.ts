import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { compressToEncodedURIComponent } from 'lz-string';
import { Registry } from './vars';
import { initPersistence, parseLayers, shareUrl } from './persist';

const KEY = 'kocmoc.layers';

/** a page: location (href + hash), history.replaceState and localStorage, all in memory */
function page(href: string, stored: Record<string, string> = {}) {
  const url = new URL(href);
  const store = new Map(Object.entries(stored));
  const loc = {
    get href() { return url.toString(); },
    get hash() { return url.hash; },
    get pathname() { return url.pathname; },
    get search() { return url.search; },
  };
  vi.stubGlobal('location', loc);
  vi.stubGlobal('history', { replaceState: (_s: unknown, _t: string, to: string) => { url.href = new URL(to, url).toString(); } });
  vi.stubGlobal('localStorage', { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => store.set(k, v) });
  return { url, store };
}
function registry() {
  const r = new Registry();
  const speed = r.num('ship.speed', 10);
  const name = r.str('ship.name', 'kestrel');
  return { r, speed, name };
}
const hashOf = (state: unknown) => '#s=' + compressToEncodedURIComponent(JSON.stringify(state));

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('parseLayers', () => {
  it('keeps known layers that are objects, drops everything else', () => {
    expect(parseLayers({ user: { a: 1 }, bogus: { b: 2 }, preset: 'nope', scenario: [1] })).toEqual({ user: { a: 1 } });
  });
  it('rejects what is not an object', () => {
    for (const raw of [null, undefined, 3, 'user', [{ user: {} }]]) expect(parseLayers(raw)).toBeUndefined();
  });
  it('copies the layer, so later edits to the input do not leak in', () => {
    const raw = { user: { a: 1 } };
    const out = parseLayers(raw)!;
    raw.user.a = 2;
    expect(out.user).toEqual({ a: 1 });
  });
});

describe('shareUrl and initPersistence', () => {
  it('a shared URL carries the state in its hash and loads it back, then drops the hash', () => {
    page('https://example.org/kocmoc/?debug');
    const a = registry();
    a.speed.set(42);
    const link = shareUrl(a.r);
    expect(link).toMatch(/^https:\/\/example\.org\/kocmoc\/\?debug#s=/);

    const { url } = page(link);
    const b = registry();
    initPersistence(b.r);
    expect(b.speed.value).toBe(42);
    expect(url.hash).toBe('');
    expect(url.search).toBe('?debug');
  });

  it('the URL wins over the autosave; without a hash the autosave is loaded', () => {
    page('https://example.org/' + hashOf({ user: { 'ship.speed': 7 } }), { [KEY]: JSON.stringify({ user: { 'ship.speed': 99 } }) });
    const a = registry();
    initPersistence(a.r);
    expect(a.speed.value).toBe(7);

    page('https://example.org/', { [KEY]: JSON.stringify({ user: { 'ship.speed': 99, 'ship.name': 'heron' } }) });
    const b = registry();
    initPersistence(b.r);
    expect([b.speed.value, b.name.value]).toEqual([99, 'heron']);
  });

  it('a broken hash or autosave warns and falls back', () => {
    const { url } = page('https://example.org/#s=%%%not-lz', { [KEY]: JSON.stringify({ user: { 'ship.speed': 5 } }) });
    const a = registry();
    initPersistence(a.r);
    expect(console.warn).toHaveBeenCalledWith('kocmoc: invalid shared state in URL');
    expect(a.speed.value).toBe(5);
    expect(url.hash).toBe('');

    page('https://example.org/', { [KEY]: '{oops' });
    const b = registry();
    initPersistence(b.r);
    expect(console.warn).toHaveBeenCalledWith('kocmoc: invalid autosave, ignoring');
    expect(b.speed.value).toBe(10);
  });

  it('nothing stored: defaults stay', () => {
    page('https://example.org/');
    const a = registry();
    initPersistence(a.r);
    expect([a.speed.value, a.name.value]).toEqual([10, 'kestrel']);
  });

  it('autosaves 300 ms after the last change, once for a burst', () => {
    const { store } = page('https://example.org/');
    const setItem = vi.spyOn(localStorage, 'setItem');
    const a = registry();
    initPersistence(a.r);
    a.speed.set(11);
    vi.advanceTimersByTime(200);
    a.speed.set(12);
    vi.advanceTimersByTime(299);
    expect(setItem).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(setItem).toHaveBeenCalledTimes(1);
    expect(JSON.parse(store.get(KEY)!).user['ship.speed']).toBe(12);
  });
});
