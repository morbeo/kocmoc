import { valueEquals, vars } from './vars';
import { presets, applyPreset, activePreset } from './presets';
import { levelScenario } from './ladder';
import { scenarios, applyScenario, scenarioLayer, venues } from './scenarios';

const shipPreset = presets.find((x) => x.id === 'feel/balanced');
/** Ship preset in use (light/balanced/heavy), null when the ship is custom-tuned. */
export function currentShip(): string | null {
  const snap = vars.snapshot();
  const active = activePreset(vars, 'preset:feel');
  const name = active ? active.name : Object.keys(snap['preset:feel'] ?? {}).length === 0 ? 'balanced' : null;
  const user = snap.user ?? {};
  if (shipPreset && Object.keys(shipPreset.vars).some((k) => k in user)) return null;
  return name;
}
/** Load ladder level `n` flown in ship preset `ship` (drops your own tuning of the ship's vars). */
export function playLevel(n: number, ship: string): void {
  const sc = levelScenario(n, scenarios);
  const preset = presets.find((x) => x.id === `feel/${ship}`);
  if (!sc || !preset) return;
  const user = vars.snapshot().user ?? {};
  const drop = Object.keys(preset.vars).filter((k) => k in user);
  if (drop.length) vars.change(drop.map((path) => ({ layer: 'user', path, before: user[path], after: undefined })));
  applyPreset(vars, preset);
  applyScenario(vars, sc);
}
/** The venue whose scenario is loaded as it ships (none once you've loaded something else). */
export function currentVenue(): string | null {
  const layer = vars.snapshot().scenario ?? {};
  const keys = Object.keys(layer);
  const hit = venues().find((sc) => {
    const data = scenarioLayer(sc);
    return keys.length === Object.keys(data).length && keys.every((k) => valueEquals(layer[k], data[k]));
  });
  return hit?.name ?? null;
}
