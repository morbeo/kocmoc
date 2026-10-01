import { signal } from '@preact/signals';
import { createStore, entries, set, del } from 'idb-keyval';
import { vars, type LayersState } from '../core/vars';
import { parseLayers } from '../core/persist';

export interface Snapshot {
  id: string;
  name: string;
  time: number;
  state: LayersState;
}

const store = createStore('kocmoc', 'snapshots');
const AB_KEY = 'kocmoc.ab';

export const snapshots = signal<Snapshot[]>([]);
/** snapshot ids assigned to the A/B slots, and which one is loaded */
export const ab = signal<{ a?: string; b?: string; current?: 'a' | 'b' }>(
  JSON.parse(localStorage.getItem(AB_KEY) ?? '{}'),
);

function setAb(next: typeof ab.value): void {
  ab.value = next;
  localStorage.setItem(AB_KEY, JSON.stringify(next));
}

export async function refreshSnapshots(): Promise<void> {
  const all = (await entries<string, Snapshot>(store)).map(([, s]) => s);
  snapshots.value = all.sort((x, y) => y.time - x.time);
}

export async function saveSnapshot(name: string): Promise<void> {
  const snap: Snapshot = { id: crypto.randomUUID(), name, time: Date.now(), state: vars.snapshot() };
  await set(snap.id, snap, store);
  await refreshSnapshots();
}

export async function deleteSnapshot(id: string): Promise<void> {
  await del(id, store);
  const { a, b, current } = ab.value;
  setAb({ a: a === id ? undefined : a, b: b === id ? undefined : b, current });
  await refreshSnapshots();
}

export function loadSnapshot(id: string): void {
  const snap = snapshots.value.find((s) => s.id === id);
  if (snap) vars.restore(snap.state);
}

export function assignAb(slot: 'a' | 'b', id: string): void {
  setAb({ ...ab.value, [slot]: id });
}

/** Flip between the A and B snapshots (F2). */
export function flipAb(): void {
  const { a, b, current } = ab.value;
  if (!a || !b) return;
  const next = current === 'a' ? 'b' : 'a';
  loadSnapshot(next === 'a' ? a : b);
  setAb({ ...ab.value, current: next });
}

export function exportJson(): void {
  const blob = new Blob([JSON.stringify({ kocmoc: 1, layers: vars.snapshot() }, null, 2)], {
    type: 'application/json',
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `kocmoc-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export async function importJson(file: File): Promise<boolean> {
  try {
    const state = parseLayers(JSON.parse(await file.text())?.layers);
    if (!state) return false;
    vars.restore(state);
    return true;
  } catch {
    return false;
  }
}
