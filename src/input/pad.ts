import { signal } from '@preact/signals-core';
import { vars } from '../core/vars';

/**
 * Gamepad input (Gamepad API, "standard" mapping). Bindings are `input.pad.<action>` vars next to
 * each `input.key.<action>`: comma-separated sources, where `b7` is button 7 (analog triggers read
 * 0..1) and `-a1` / `+a1` is the up / down half of axis 1. Each source reads 0..1, so a flight axis
 * is its positive action minus its negative one, exactly like the keys.
 */

// --- vars ------------------------------------------------------------------
const tags = ['input', 'pad'];
export const padVars = {
  enabled: vars.bool('input.pad.enabled', true, { tags, desc: 'read connected gamepads' }),
  deadzone: vars.num('input.pad.deadzone', 0.15, { min: 0, max: 0.5, hardMin: 0, hardMax: 0.95, tags, desc: 'radial, per stick; rescaled so motion starts at 0' }),
  invertPitch: vars.bool('input.invert.padPitch', false, { tags, desc: 'gamepad: pushing the stick up pitches the nose down' }),
  menuNav: vars.bool('input.pad.menuNav', true, { tags, desc: 'D-pad / left stick move between menu buttons, A picks, B closes' }),
};

export const PAD_PREFIX = 'input.pad.';
/** Default pad sources per `input.key.<action>`, standard mapping. */
export const PAD_DEFAULTS: Record<string, string> = {
  forward: 'b7',
  back: 'b6',
  left: '-a2',
  right: '+a2',
  up: '-a3',
  down: '+a3',
  pitchUp: '-a1',
  pitchDown: '+a1',
  yawLeft: '-a0',
  yawRight: '+a0',
  rollLeft: 'b4',
  rollRight: 'b5',
  boost: 'b0,b10',
  assist: 'b1',
  camera: 'b2',
  respawn: 'b3',
  levels: 'b8',
  tracks: 'b9',
  cinematic: 'b12',
  replay: 'b13',
  autopilot: 'b14',
  nextLevel: 'b15',
};

/** The `input.pad.<action>` var paired with a key var, created on first use. */
export function padBind(action: string) {
  return vars.str(`${PAD_PREFIX}${action}`, PAD_DEFAULTS[action] ?? '', { tags: ['input', 'pad', 'keys'], desc: 'gamepad: b<n> button, -a<n>/+a<n> axis half; comma-separated' });
}

// --- math ------------------------------------------------------------------
export interface PadState {
  axes: number[];
  buttons: number[];
}
export const emptyPad = (): PadState => ({ axes: [], buttons: [] });

export type PadSource = { kind: 'b'; index: number } | { kind: 'a'; index: number; sign: 1 | -1 };

export function parseSource(s: string): PadSource | null {
  const m = /^\s*(?:b(\d+)|([+-])a(\d+))\s*$/.exec(s);
  if (!m) return null;
  if (m[1] !== undefined) return { kind: 'b', index: Number(m[1]) };
  return { kind: 'a', index: Number(m[3]), sign: m[2] === '-' ? -1 : 1 };
}

export const parseSources = (s: string): PadSource[] => s.split(',').map(parseSource).filter((x): x is PadSource => x !== null);

/** How far one source is pushed, 0..1. */
export function sourceValue(p: PadState, src: PadSource): number {
  const v = src.kind === 'b' ? (p.buttons[src.index] ?? 0) : (p.axes[src.index] ?? 0) * src.sign;
  return Math.min(Math.max(v, 0), 1);
}

/** Strongest of a binding's sources, 0..1. */
export function bindingValue(p: PadState, binding: string): number {
  let v = 0;
  for (const s of parseSources(binding)) v = Math.max(v, sourceValue(p, s));
  return v;
}

/** Radial deadzone for a stick, rescaled so the output starts at 0 at the edge of the zone. */
export function radialDeadzone(x: number, y: number, dz: number): [number, number] {
  const len = Math.hypot(x, y);
  const d = Math.min(Math.max(dz, 0), 0.95);
  if (len <= d) return [0, 0];
  const k = Math.min((len - d) / (1 - d), 1) / len;
  return [x * k, y * k];
}

/** Apply deadzones to raw axes: axes 0/1 and 2/3 are sticks (radial), the rest per axis. */
export function applyDeadzone(axes: readonly number[], dz: number): number[] {
  const out = axes.slice();
  for (let i = 0; i + 1 < Math.min(out.length, 4); i += 2) [out[i], out[i + 1]] = radialDeadzone(out[i], out[i + 1], dz);
  for (let i = 4; i < out.length; i++) out[i] = radialDeadzone(out[i], 0, dz)[0];
  return out;
}

/** Merge several pads: each axis / button takes whichever pad pushes it furthest. */
export function mergePads(pads: readonly PadState[]): PadState {
  const out = emptyPad();
  for (const p of pads) {
    p.axes.forEach((v, i) => {
      if (Math.abs(v) > Math.abs(out.axes[i] ?? 0)) out.axes[i] = v;
      else out.axes[i] ??= 0;
    });
    p.buttons.forEach((v, i) => (out.buttons[i] = Math.max(out.buttons[i] ?? 0, v)));
  }
  return out;
}

const PRESS = 0.5;
const REST = 0.3;
/** First source pushed past half way that was at rest in `before` (for rebinding); axes are preferred over buttons. */
export function detectPress(before: PadState, now: PadState): string | null {
  for (let i = 0; i < now.axes.length; i++) {
    for (const sign of [1, -1] as const) {
      const src = { kind: 'a', index: i, sign } as const;
      if (sourceValue(now, src) > PRESS && sourceValue(before, src) < REST) return `${sign < 0 ? '-' : '+'}a${i}`;
    }
  }
  for (let i = 0; i < now.buttons.length; i++) if ((now.buttons[i] ?? 0) > PRESS && (before.buttons[i] ?? 0) < REST) return `b${i}`;
  return null;
}

export const isDown = (p: PadState, binding: string) => bindingValue(p, binding) > PRESS;

const BUTTONS = ['A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT', 'Back', 'Start', 'L3', 'R3', 'D↑', 'D↓', 'D←', 'D→', 'Home'];
const STICKS: Record<string, string> = { '-a0': 'LS ←', '+a0': 'LS →', '-a1': 'LS ↑', '+a1': 'LS ↓', '-a2': 'RS ←', '+a2': 'RS →', '-a3': 'RS ↑', '+a3': 'RS ↓' };
/** Short display name (standard mapping): `b0` → `A`, `-a1` → `LS ↑`. */
export function padLabel(src: string): string {
  const s = src.trim();
  if (STICKS[s]) return STICKS[s];
  const p = parseSource(s);
  if (!p) return s;
  if (p.kind === 'b') return BUTTONS[p.index] ?? `B${p.index}`;
  return `Axis ${p.index}${p.sign < 0 ? '−' : '+'}`;
}
export const padLabels = (binding: string) =>
  binding
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(padLabel)
    .join(' / ');

// --- state -----------------------------------------------------------------
/** Latest merged pad, deadzones applied; empty when disabled or nothing is connected. */
export let pad: PadState = emptyPad();
/** Raw merged pad (no deadzone), for rebinding. */
export let rawPad: PadState = emptyPad();
/** Name of the first connected pad, or '' when none. */
export const padName = signal('');
/** While true (a binding is being captured) the game ignores the pad. */
export const padCapture = { on: false };

const snapshot = (g: Gamepad): PadState => ({ axes: Array.from(g.axes), buttons: g.buttons.map((b) => b.value || (b.pressed ? 1 : 0)) });

/** Read every connected pad. Call once per animation frame. */
export function readPads(): void {
  const list = typeof navigator !== 'undefined' && navigator.getGamepads ? navigator.getGamepads() : [];
  const pads = Array.from(list).filter((g): g is Gamepad => !!g && g.connected);
  const name = pads[0]?.id ?? '';
  if (padName.value !== name) padName.value = name;
  if (!padVars.enabled.value || !pads.length) {
    pad = rawPad = emptyPad();
    return;
  }
  rawPad = mergePads(pads.map(snapshot));
  pad = { axes: applyDeadzone(rawPad.axes, padVars.deadzone.value), buttons: rawPad.buttons };
}
