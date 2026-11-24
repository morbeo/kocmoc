import { createStore, del, entries, set } from 'idb-keyval';
import { parseTrackText, serializeTrackDoc, type TrackDoc } from '../gen/trackDoc';

/** A track saved in this browser (IndexedDB), listed under My tracks. */
export interface SavedTrack {
  id: string;
  title: string;
  time: number;
  /** canonical track file text */
  text: string;
}

// its own database: a store can't be added to the snapshots database without a version bump
let store: ReturnType<typeof createStore> | undefined;
const db = () => (store ??= createStore('kocmoc-tracks', 'tracks'));

/** Save a track file; returns its id. */
export async function saveTrack(doc: TrackDoc, now = Date.now()): Promise<string> {
  const id = `t${now.toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`;
  await set(id, { id, title: doc.title ?? 'Untitled track', time: now, text: serializeTrackDoc(doc) } satisfies SavedTrack, db());
  return id;
}

/** Saved tracks, newest first (entries that no longer parse are left out). */
export async function listTracks(): Promise<SavedTrack[]> {
  const all = (await entries<string, SavedTrack>(db())).map(([, t]) => t);
  return all.filter((t) => t && typeof t.text === 'string' && parseTrackText(t.text)).sort((a, b) => b.time - a.time);
}

export const removeTrack = (id: string): Promise<void> => del(id, db());
