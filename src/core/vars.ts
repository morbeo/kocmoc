import { signal, batch, type Signal } from '@preact/signals-core';

export type VarType = 'num' | 'int' | 'bool' | 'enum' | 'color' | 'vec3' | 'str';
export type Vec3 = [number, number, number];
export type VarValue = number | boolean | string | Vec3;

export interface VarMeta {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  tags?: string[];
  desc?: string;
  /** allowed values for `enum` */
  options?: readonly (string | number)[];
  /** changing this var should rebuild procedural content */
  regen?: boolean;
}

/** Cascade order, lowest priority first. `default` is implicit below all of them. */
export const LAYERS = [
  'preset:feel',
  'preset:juice',
  'preset:visual',
  'preset:hud',
  'scenario',
  'user',
] as const;
export type Layer = (typeof LAYERS)[number];
export type Source = Layer | 'default';

export type LayerData = Record<string, unknown>;
export type LayersState = Partial<Record<Layer, LayerData>>;

/** One layer edit. `undefined` means "absent from the layer". */
export interface Change {
  layer: Layer;
  path: string;
  before: unknown;
  after: unknown;
}

export class Var<T extends VarValue = VarValue> {
  readonly sig: Signal<T>;
  readonly source: Signal<Source>;

  constructor(
    private readonly registry: Registry,
    readonly path: string,
    readonly type: VarType,
    public def: T,
    public meta: VarMeta,
  ) {
    this.sig = signal(def);
    this.source = signal<Source>('default');
  }

  get value(): T {
    return this.sig.value;
  }

  set(value: T, layer: Layer = 'user'): void {
    this.registry.set(this.path, value, layer);
  }

  get modified(): boolean {
    return !valueEquals(this.sig.value, this.def);
  }

  /** Validate a raw (possibly imported) value; `undefined` if unusable. */
  coerce(raw: unknown): T | undefined {
    return coerce(this.type, this.meta, raw) as T | undefined;
  }
}

export interface Watch {
  path: string;
  read: () => unknown;
  meta: VarMeta;
}

export class Registry {
  private readonly vars = new Map<string, Var>();
  private readonly layers = new Map<Layer, Map<string, unknown>>(LAYERS.map((l) => [l, new Map()]));
  private readonly listeners = new Set<(changes: Change[]) => void>();
  readonly watches = new Map<string, Watch>();
  readonly history = new History(this);
  /** bumps when the set of vars/watches changes (UI lists subscribe to this) */
  readonly version = signal(0);

  num(path: string, def: number, meta: VarMeta = {}) {
    return this.define(path, 'num', def, meta);
  }
  int(path: string, def: number, meta: VarMeta = {}) {
    return this.define(path, 'int', def, { step: 1, ...meta });
  }
  bool(path: string, def: boolean, meta: VarMeta = {}) {
    return this.define(path, 'bool', def, meta);
  }
  enum<T extends string | number>(path: string, def: T, options: readonly T[], meta: VarMeta = {}) {
    return this.define<T>(path, 'enum', def, { ...meta, options });
  }
  color(path: string, def: string, meta: VarMeta = {}) {
    return this.define(path, 'color', def, meta);
  }
  vec3(path: string, def: Vec3, meta: VarMeta = {}) {
    return this.define(path, 'vec3', def, meta);
  }
  str(path: string, def: string, meta: VarMeta = {}) {
    return this.define(path, 'str', def, meta);
  }

  /** Re-defining an existing path (e.g. on HMR) updates default/meta and keeps layer values. */
  define<T extends VarValue>(path: string, type: VarType, def: T, meta: VarMeta): Var<T> {
    const existing = this.vars.get(path);
    if (existing) {
      if (existing.type !== type) throw new Error(`var ${path} redefined as ${type} (was ${existing.type})`);
      existing.def = def;
      existing.meta = meta;
      this.resolve(existing);
      return existing as Var<T>;
    }
    const v = new Var<T>(this, path, type, def, meta);
    this.vars.set(path, v as unknown as Var);
    this.resolve(v as unknown as Var);
    this.version.value++;
    return v;
  }

  watch(path: string, read: () => unknown, meta: VarMeta = {}): void {
    this.watches.set(path, { path, read, meta });
    this.version.value++;
  }

  get(path: string): Var | undefined {
    return this.vars.get(path);
  }

  list(): Var[] {
    return [...this.vars.values()];
  }

  layerValue(layer: Layer, path: string): unknown {
    return this.layers.get(layer)!.get(path);
  }

  set(path: string, value: unknown, layer: Layer = 'user'): void {
    const v = this.vars.get(path);
    const after = v ? v.coerce(value) : value;
    if (after === undefined) return;
    this.change([{ layer, path, before: this.layerValue(layer, path), after }]);
  }

  /** Remove a value from a layer (`user` by default = reset to whatever is below). */
  unset(path: string, layer: Layer = 'user'): void {
    const before = this.layerValue(layer, path);
    if (before === undefined) return;
    this.change([{ layer, path, before, after: undefined }]);
  }

  /** Replace a whole layer's contents (presets, scenarios). One undo step. */
  setLayer(layer: Layer, data: LayerData): void {
    const current = this.layers.get(layer)!;
    const changes: Change[] = [];
    for (const [path, before] of current) {
      if (!(path in data)) changes.push({ layer, path, before, after: undefined });
    }
    for (const [path, after] of Object.entries(data)) {
      changes.push({ layer, path, before: current.get(path), after });
    }
    this.change(changes);
  }

  /** Plain-object copy of all non-empty layers. */
  snapshot(): LayersState {
    const out: LayersState = {};
    for (const [layer, values] of this.layers) {
      if (values.size) out[layer] = Object.fromEntries(values);
    }
    return out;
  }

  /** Replace every layer with `state`. One undo step unless `record` is false. */
  restore(state: LayersState, record = true): void {
    const changes: Change[] = [];
    for (const layer of LAYERS) {
      const current = this.layers.get(layer)!;
      const data = state[layer] ?? {};
      for (const [path, before] of current) {
        if (!(path in data)) changes.push({ layer, path, before, after: undefined });
      }
      for (const [path, after] of Object.entries(data)) {
        changes.push({ layer, path, before: current.get(path), after });
      }
    }
    this.change(changes, record);
  }

  onChange(fn: (changes: Change[]) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /** Apply layer changes, optionally recording them in history. */
  change(changes: Change[], record = true): void {
    const effective = changes.filter((c) => !valueEquals(c.before, c.after));
    if (!effective.length) return;
    batch(() => {
      const touched = new Set<string>();
      for (const c of effective) {
        const layer = this.layers.get(c.layer)!;
        if (c.after === undefined) layer.delete(c.path);
        else layer.set(c.path, c.after);
        touched.add(c.path);
      }
      for (const path of touched) {
        const v = this.vars.get(path);
        if (v) this.resolve(v);
      }
    });
    if (record) this.history.push(effective);
    for (const fn of this.listeners) fn(effective);
  }

  private resolve(v: Var): void {
    for (let i = LAYERS.length - 1; i >= 0; i--) {
      const raw = this.layers.get(LAYERS[i])!.get(v.path);
      if (raw === undefined) continue;
      const value = v.coerce(raw);
      if (value === undefined) continue; // invalid for this var: fall through to lower layers
      this.assign(v, value, LAYERS[i]);
      return;
    }
    this.assign(v, v.def, 'default');
  }

  private assign(v: Var, value: VarValue, source: Source): void {
    if (!valueEquals(v.sig.peek(), value)) v.sig.value = value;
    v.source.value = source;
  }
}

const COALESCE_MS = 500;

interface HistoryEntry {
  changes: Change[];
  time: number;
}

export class History {
  private undoStack: HistoryEntry[] = [];
  private redoStack: HistoryEntry[] = [];
  readonly canUndo = signal(false);
  readonly canRedo = signal(false);

  constructor(private readonly registry: Registry, readonly limit = 500) {}

  push(changes: Change[], now = Date.now()): void {
    const last = this.undoStack.at(-1);
    // a slider drag produces many single edits on one var: merge them into one step
    if (
      last &&
      changes.length === 1 &&
      last.changes.length === 1 &&
      last.changes[0].path === changes[0].path &&
      last.changes[0].layer === changes[0].layer &&
      now - last.time < COALESCE_MS
    ) {
      last.changes[0] = { ...last.changes[0], after: changes[0].after };
      last.time = now;
    } else {
      this.undoStack.push({ changes, time: now });
      if (this.undoStack.length > this.limit) this.undoStack.shift();
    }
    this.redoStack = [];
    this.sync();
  }

  undo(): void {
    const entry = this.undoStack.pop();
    if (!entry) return;
    this.registry.change(
      entry.changes.map((c) => ({ ...c, before: c.after, after: c.before })).reverse(),
      false,
    );
    this.redoStack.push(entry);
    this.sync();
  }

  redo(): void {
    const entry = this.redoStack.pop();
    if (!entry) return;
    this.registry.change(entry.changes, false);
    this.undoStack.push({ ...entry, time: 0 }); // time 0: never coalesce into a redone step
    this.sync();
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.sync();
  }

  private sync(): void {
    this.canUndo.value = this.undoStack.length > 0;
    this.canRedo.value = this.redoStack.length > 0;
  }
}

export function valueEquals(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((x, i) => x === b[i]);
  }
  return false;
}

const isNum = (x: unknown): x is number => typeof x === 'number' && Number.isFinite(x);

function coerce(type: VarType, meta: VarMeta, raw: unknown): VarValue | undefined {
  switch (type) {
    case 'num':
      return isNum(raw) ? raw : undefined;
    case 'int':
      return isNum(raw) ? Math.round(raw) : undefined;
    case 'bool':
      return typeof raw === 'boolean' ? raw : undefined;
    case 'enum':
      return meta.options?.includes(raw as string | number) ? (raw as string | number) : undefined;
    case 'color':
      return typeof raw === 'string' && /^#[0-9a-f]{6}$/i.test(raw) ? raw.toLowerCase() : undefined;
    case 'vec3':
      return Array.isArray(raw) && raw.length === 3 && raw.every(isNum) ? ([...raw] as Vec3) : undefined;
    case 'str':
      return typeof raw === 'string' ? raw : undefined;
  }
}

/** The game-wide registry. */
export const vars = new Registry();
