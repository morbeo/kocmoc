import type { Scenario } from './scenarios';

/**
 * Proving ground ladder: levels 1–8 are bundled scenarios (`scenarios/proving-N.json`), later ones
 * are made from level 8 with a shorter clock and tighter gates. Progress and badges are kept per
 * ship preset, as the X-Wing flight badges and TIE Fighter training patches were per craft.
 */

export const LADDER_SIZE = 8;
export const SHIPS = ['light', 'balanced', 'heavy'] as const;
export type Ship = (typeof SHIPS)[number];

export const levelName = (n: number) => `proving-${n}`;

/** The scenario for ladder level `n` (1-based): bundled up to 8, generated beyond. */
export function levelScenario(n: number, bundled: readonly Scenario[]): Scenario | undefined {
  const level = Math.max(1, Math.round(n));
  const own = bundled.find((s) => s.name === levelName(level));
  if (own) return own;
  const top = bundled.find((s) => s.name === levelName(LADDER_SIZE));
  if (!top || level <= LADDER_SIZE) return undefined;
  const k = level - LADDER_SIZE;
  const v = { ...top.vars };
  const num = (key: string, fallback: number) => (typeof v[key] === 'number' ? (v[key] as number) : fallback);
  v['proving.level'] = level;
  v['proving.budget'] = Math.max(20, Math.round(num('proving.budget', 90) * 0.95 ** k));
  v['gen.proving.gateRadiusMin'] = Math.max(2.5, Math.round((num('gen.proving.gateRadiusMin', 4) - 0.2 * k) * 10) / 10);
  v['gen.proving.gateRadius'] = Math.max(v['gen.proving.gateRadiusMin'] as number, Math.round((num('gen.proving.gateRadius', 7) - 0.2 * k) * 10) / 10);
  v['gen.proving.offsetMax'] = Math.min(0.95, Math.round((num('gen.proving.offsetMax', 0.8) + 0.01 * k) * 100) / 100);
  return {
    ...top,
    name: levelName(level),
    desc: `Proving ground level ${level} (generated)`,
    seed: (top.seed ?? 0) + 101 * k,
    vars: v,
  };
}

export interface LadderRecord {
  /** highest level cleared */
  cleared: number;
  /** best score per level */
  best: Record<string, number>;
}
export type Ladder = Partial<Record<string, LadderRecord>>;

/** Validate a stored ladder (corrupt or foreign entries are dropped). */
export function parseLadder(raw: unknown): Ladder {
  const out: Ladder = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
  for (const [ship, rec] of Object.entries(raw as Record<string, unknown>)) {
    if (!rec || typeof rec !== 'object') continue;
    const r = rec as Record<string, unknown>;
    const cleared = typeof r.cleared === 'number' && Number.isFinite(r.cleared) ? Math.max(0, Math.round(r.cleared)) : 0;
    const best: Record<string, number> = {};
    if (r.best && typeof r.best === 'object') {
      for (const [lvl, sc] of Object.entries(r.best as Record<string, unknown>)) if (typeof sc === 'number' && Number.isFinite(sc)) best[lvl] = sc;
    }
    out[ship] = { cleared, best };
  }
  return out;
}

export interface RunOutcome {
  ladder: Ladder;
  /** beat the stored best for this level and ship */
  newBest: boolean;
  /** cleared the last bundled level for the first time with this ship */
  badge: boolean;
}

/** Fold one finished run into the ladder (returns a new object). Only cleared runs set a best. */
export function recordRun(l: Ladder, ship: string, level: number, score: number, clear: boolean): RunOutcome {
  const prev = l[ship] ?? { cleared: 0, best: {} };
  if (!clear) return { ladder: l, newBest: false, badge: false };
  const old = prev.best[level];
  const newBest = old === undefined || score > old;
  const cleared = Math.max(prev.cleared, level);
  const badge = prev.cleared < LADDER_SIZE && cleared >= LADDER_SIZE;
  const rec: LadderRecord = { cleared, best: newBest ? { ...prev.best, [level]: score } : prev.best };
  return { ladder: { ...l, [ship]: rec }, newBest, badge };
}

export const hasBadge = (l: Ladder, ship: string) => (l[ship]?.cleared ?? 0) >= LADDER_SIZE;

/** Highest level a ship may start: one past the highest it has cleared. */
export function unlockedLevel(l: Ladder, ship: string): number {
  return (l[ship]?.cleared ?? 0) + 1;
}
