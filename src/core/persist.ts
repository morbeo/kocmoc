import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { LAYERS, type LayersState, type Registry } from './vars';

const AUTOSAVE_KEY = 'kocmoc.layers';
const HASH_PREFIX = '#s=';

/** Validate untrusted JSON (imports, URL, storage) into a LayersState; drops unknown layers. */
export function parseLayers(raw: unknown): LayersState | undefined {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return undefined;
  const out: LayersState = {};
  for (const layer of LAYERS) {
    const data = (raw as Record<string, unknown>)[layer];
    if (data && typeof data === 'object' && !Array.isArray(data)) out[layer] = { ...data };
  }
  return out;
}

export function shareUrl(registry: Registry): string {
  const url = new URL(location.href);
  url.hash = HASH_PREFIX.slice(1) + compressToEncodedURIComponent(JSON.stringify(registry.snapshot()));
  return url.toString();
}

/**
 * Load initial state (URL hash wins over autosave), then autosave every change.
 * The hash is removed after loading so reloads use the (now autosaved) state.
 */
export function initPersistence(registry: Registry): void {
  let state: LayersState | undefined;
  if (location.hash.startsWith(HASH_PREFIX)) {
    try {
      state = parseLayers(JSON.parse(decompressFromEncodedURIComponent(location.hash.slice(HASH_PREFIX.length)) ?? ''));
    } catch {
      console.warn('kocmoc: invalid shared state in URL');
    }
    history.replaceState(null, '', location.pathname + location.search);
  }
  if (!state) {
    try {
      state = parseLayers(JSON.parse(localStorage.getItem(AUTOSAVE_KEY) ?? 'null'));
    } catch {
      console.warn('kocmoc: invalid autosave, ignoring');
    }
  }
  if (state) registry.restore(state, false);

  let timer: ReturnType<typeof setTimeout> | undefined;
  registry.onChange(() => {
    clearTimeout(timer);
    timer = setTimeout(() => localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(registry.snapshot())), 300);
  });
}
