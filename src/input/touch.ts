import { effect, signal } from '@preact/signals-core';
import { vars } from '../core/vars';

/** Touch and tilt input: vars, the shared state the on-screen controls write, and the pure math behind them. */

const AXIS_OPTIONS = ['pitch', 'yaw', 'roll', 'strafe', 'lift', 'thrust', 'none'] as const;
export type TouchAxis = (typeof AXIS_OPTIONS)[number];

// --- vars ------------------------------------------------------------------
const tags = ['input', 'touch'];
const tiltTags = ['input', 'touch', 'tilt'];
export const touchVars = {
  ui: vars.enum('input.touch.ui', 'auto', ['auto', 'on', 'off'], { tags, desc: 'on-screen sticks and buttons; auto = on touch screens' }),
  radius: vars.num('input.touch.radius', 60, { min: 20, max: 200, hardMin: 1, unit: 'px', tags, desc: 'how far a thumb drags for full deflection' }),
  left: {
    x: vars.enum('input.touch.left.x', 'strafe', AXIS_OPTIONS, { tags }),
    y: vars.enum('input.touch.left.y', 'thrust', AXIS_OPTIONS, { tags, desc: 'drag up = positive' }),
  },
  right: {
    x: vars.enum('input.touch.right.x', 'yaw', AXIS_OPTIONS, { tags }),
    y: vars.enum('input.touch.right.y', 'pitch', AXIS_OPTIONS, { tags, desc: 'drag up = positive (input.invert.pointerY flips pitch)' }),
  },
  boostAtRim: vars.num('input.touch.boostAtRim', 0.95, { min: 0.5, max: 1.01, hardMin: 0, tags, desc: 'pushing the thrust stick this far forward boosts; >1 = never' }),
  tilt: vars.bool('input.tilt.enabled', false, { tags: tiltTags, desc: 'steer by tilting the device (TILT button recalibrates)' }),
  tiltRange: vars.num('input.tilt.range', 25, { min: 5, max: 90, hardMin: 1, unit: '°', tags: tiltTags, desc: 'tilt for full deflection' }),
  tiltSide: vars.enum('input.tilt.side', 'yaw', ['yaw', 'roll', 'none'], { tags: tiltTags, desc: 'what tilting left/right does' }),
  tiltPitch: vars.bool('input.tilt.pitch', true, { tags: tiltTags, desc: 'tilting the top edge towards you pitches up' }),
  tiltInvert: vars.bool('input.tilt.invertPitch', false, { tags: tiltTags }),
};

// --- state -----------------------------------------------------------------
/** Axes written by the on-screen controls, each in [-1, 1]; summed into the pointer stage by sampleInput. */
export const touch = { pitch: 0, yaw: 0, roll: 0, strafe: 0, lift: 0, thrust: 0, boost: false };
/** True while the on-screen controls are shown. */
export const touchUi = signal(false);

const sawTouch = signal(false);
/** Decide whether to show the on-screen controls: touch screens, a first touch on hybrids, or input.touch.ui = on. */
export function detectTouch(): void {
  if (matchMedia('(pointer: coarse)').matches) sawTouch.value = true;
  addEventListener('touchstart', () => (sawTouch.value = true), { once: true, passive: true });
  effect(() => {
    const mode = touchVars.ui.value;
    touchUi.value = mode === 'on' || (mode === 'auto' && sawTouch.value);
  });
}

export function resetTouch(): void {
  Object.assign(touch, { pitch: 0, yaw: 0, roll: 0, strafe: 0, lift: 0, thrust: 0, boost: false });
}

// --- math ------------------------------------------------------------------
const clamp1 = (x: number) => Math.min(Math.max(x, -1), 1);

/** Thumb drag (screen px, y down) → stick axes in the unit circle: x right, y up. */
export function dragAxes(dx: number, dy: number, radius: number): { x: number; y: number } {
  if (radius <= 0) return { x: 0, y: 0 };
  const len = Math.hypot(dx, dy);
  const k = len > radius ? 1 / len : 1 / radius;
  return { x: dx * k, y: -dy * k };
}

/** Wrap an angle in degrees into [-180, 180). */
export function wrapDeg(a: number): number {
  return ((((a + 180) % 360) + 360) % 360) - 180;
}

/**
 * Unit "down" vector in screen space (x right, y up, z out of the screen) from DeviceOrientation
 * beta/gamma and the screen rotation (screen.orientation.angle). Working from gravity rather than
 * raw angles keeps the result smooth in landscape, where gamma flips near ±90°.
 */
export function screenDown(beta: number, gamma: number, screenAngle: number): [number, number, number] {
  const r = Math.PI / 180;
  const b = beta * r;
  const g = gamma * r;
  const dx = Math.sin(g) * Math.cos(b);
  const dy = -Math.sin(b);
  const dz = -Math.cos(g) * Math.cos(b);
  const a = screenAngle * r;
  return [dx * Math.cos(a) - dy * Math.sin(a), dx * Math.sin(a) + dy * Math.cos(a), dz];
}

/** Screen tilt in degrees: side > 0 = right edge down; pitch = how far the top edge is raised from flat (upright = 90). */
export function screenTilt(down: [number, number, number]): { side: number; pitch: number } {
  const [x, y, z] = down;
  const d = 180 / Math.PI;
  return { side: Math.asin(clamp1(x)) * d, pitch: Math.atan2(-y, -z) * d };
}

/** Tilt relative to the calibrated pitch → axes in [-1, 1]: side (right edge down = +), pitch (top towards you = +). */
export function tiltAxes(tilt: { side: number; pitch: number }, neutralPitch: number, range: number): { side: number; pitch: number } {
  if (range <= 0) return { side: 0, pitch: 0 };
  return { side: clamp1(tilt.side / range), pitch: clamp1(wrapDeg(tilt.pitch - neutralPitch) / range) };
}
