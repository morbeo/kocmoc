import { presets, applyPreset, activePreset } from './presets';
import { LAYERS, type Change, type LayerData, type Registry } from './vars';

export const GAME_MODES = ['race', 'gauntlet', 'free'] as const;
export type GameMode = (typeof GAME_MODES)[number];
const isMode = (m: unknown): m is GameMode => GAME_MODES.includes(m as GameMode);

/** A complete test situation: mode, seed, spawn point, var overrides and presets. */
export interface Scenario {
  name: string;
  desc?: string;
  mode?: GameMode;
  seed?: number;
  spawn?: { trackT?: number; speed?: number };
  vars?: LayerData;
  presets?: string[];
}

// scenarios/<name>.json, bundled
const files = import.meta.glob<Scenario>('/scenarios/*.json', { eager: true, import: 'default' });
export const scenarios: Scenario[] = Object.entries(files).map(([file, data]) => ({
  ...data,
  name: data.name ?? file.replace(/^\/scenarios\//, '').replace(/\.json$/, ''),
}));

/** Validate untrusted JSON (file drop, import) into a Scenario. */
export function parseScenario(raw: unknown): Scenario | undefined {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return undefined;
  const r = raw as Record<string, unknown>;
  const looksLike = ['mode', 'seed', 'spawn', 'vars', 'presets'].some((k) => k in r);
  if (!looksLike) return undefined;
  const out: Scenario = { name: typeof r.name === 'string' ? r.name : 'dropped' };
  if (typeof r.desc === 'string') out.desc = r.desc;
  if (isMode(r.mode)) out.mode = r.mode;
  if (typeof r.seed === 'number' && Number.isFinite(r.seed)) out.seed = Math.round(r.seed);
  if (r.spawn && typeof r.spawn === 'object') {
    const s = r.spawn as Record<string, unknown>;
    out.spawn = {};
    if (typeof s.trackT === 'number' && Number.isFinite(s.trackT)) out.spawn.trackT = s.trackT;
    if (typeof s.speed === 'number' && Number.isFinite(s.speed)) out.spawn.speed = s.speed;
  }
  if (r.vars && typeof r.vars === 'object' && !Array.isArray(r.vars)) out.vars = { ...(r.vars as LayerData) };
  if (Array.isArray(r.presets)) out.presets = r.presets.filter((p): p is string => typeof p === 'string');
  return out;
}

/** The `scenario` layer contents a scenario produces (mode and seed become vars). */
export function scenarioLayer(sc: Scenario): LayerData {
  const data: LayerData = { ...sc.vars };
  if (sc.mode) data['game.mode'] = sc.mode;
  if (sc.seed !== undefined) data['gen.race.seed'] = sc.seed;
  return data;
}

type SpawnHandler = (spawn: { trackT: number; speed: number }) => void;
let onSpawn: SpawnHandler = () => {};
/** The game registers how to put the ship at a scenario's spawn point. */
export function setSpawnHandler(fn: SpawnHandler): void {
  onSpawn = fn;
}

type SpawnSource = () => { trackT: number; speed: number };
let spawnSource: SpawnSource = () => ({ trackT: 0, speed: 0 });
/** The game reports where the ship is now, for "save current as scenario". */
export function setSpawnSource(fn: SpawnSource): void {
  spawnSource = fn;
}
export const currentSpawn = () => spawnSource();

/**
 * Load a scenario: replaces the scenario layer and drops user overrides of the values it sets
 * (so loading it actually gives you the scenario), as one undo step; then applies presets and respawns.
 */
export function applyScenario(registry: Registry, sc: Scenario): void {
  const data = scenarioLayer(sc);
  const current = registry.snapshot();
  const changes: Change[] = [];
  for (const [path, before] of Object.entries(current.scenario ?? {})) {
    if (!(path in data)) changes.push({ layer: 'scenario', path, before, after: undefined });
  }
  for (const [path, after] of Object.entries(data)) {
    changes.push({ layer: 'scenario', path, before: current.scenario?.[path], after });
    const user = current.user?.[path];
    if (user !== undefined) changes.push({ layer: 'user', path, before: user, after: undefined });
  }
  registry.change(changes);
  for (const id of sc.presets ?? []) {
    const p = presets.find((x) => x.id === id);
    if (p) applyPreset(registry, p);
    else console.warn(`kocmoc: scenario "${sc.name}" names unknown preset ${id}`);
  }
  onSpawn({ trackT: sc.spawn?.trackT ?? 0, speed: sc.spawn?.speed ?? 0 });
}

/** Capture the current setup as a scenario: scenario + user layers merged, active presets, spawn. */
export function captureScenario(
  registry: Registry,
  name: string,
  spawn: { trackT: number; speed: number },
): Scenario {
  const snap = registry.snapshot();
  const merged: LayerData = { ...snap.scenario, ...snap.user };
  const mode = merged['game.mode'];
  const seed = merged['gen.race.seed'];
  delete merged['game.mode'];
  delete merged['gen.race.seed'];
  const sc: Scenario = { name };
  sc.mode = isMode(mode) ? mode : 'race';
  sc.seed = typeof seed === 'number' ? seed : (registry.get('gen.race.seed')?.value as number | undefined);
  sc.spawn = { trackT: Math.round(spawn.trackT * 1e4) / 1e4, speed: Math.round(spawn.speed) };
  sc.vars = merged;
  sc.presets = LAYERS.filter((l) => l.startsWith('preset:'))
    .map((l) => activePreset(registry, l)?.id)
    .filter((id): id is string => !!id);
  return sc;
}
