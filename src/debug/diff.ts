import { LAYERS, valueEquals, type LayersState } from '../core/vars';

export interface DiffVar {
  path: string;
  def: unknown;
  value: unknown;
  coerce?: (raw: unknown) => unknown;
}

export interface DiffRow {
  path: string;
  /** value in the baseline */
  before: unknown;
  /** value now */
  after: unknown;
}

/** Effective value of `v` under a layer stack (topmost valid layer wins, else the default). */
export function resolveIn(state: LayersState, v: DiffVar): unknown {
  for (let i = LAYERS.length - 1; i >= 0; i--) {
    const raw = state[LAYERS[i]]?.[v.path];
    if (raw === undefined) continue;
    const value = v.coerce ? v.coerce(raw) : raw;
    if (value !== undefined) return value;
  }
  return v.def;
}

/** Vars whose current value differs from the baseline (defaults when `baseline` is null). */
export function diffVars(list: DiffVar[], baseline: LayersState | null): DiffRow[] {
  const out: DiffRow[] = [];
  for (const v of list) {
    const before = baseline ? resolveIn(baseline, v) : v.def;
    if (!valueEquals(before, v.value)) out.push({ path: v.path, before, after: v.value });
  }
  return out.sort((a, b) => a.path.localeCompare(b.path));
}
