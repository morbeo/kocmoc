import { vars } from '../core/vars';
import { isTyping } from '../core/dom';
import type { Controls } from '../sim/ship';
import { applyCurve, type Curve } from './curve';
import { moveStick, recenterStick, stickAxes, ramp, type Stick } from './stick';

export const AXES = ['pitch', 'yaw', 'roll', 'strafe', 'lift', 'thrust'] as const;
export type Axis = (typeof AXES)[number];
type AxisValues = Record<Axis, number>;

const zero = (): AxisValues => ({ pitch: 0, yaw: 0, roll: 0, strafe: 0, lift: 0, thrust: 0 });

// --- vars ------------------------------------------------------------------
const tags = ['input'];
const keyTags = ['input', 'keys'];
// bindings: comma-separated KeyboardEvent.code values
const bind = (action: string, codes: string) =>
  vars.str(`input.key.${action}`, codes, { tags: keyTags, desc: 'KeyboardEvent.code, comma-separated' });
const keys = {
  thrust: [bind('forward', 'KeyW'), bind('back', 'KeyS')],
  strafe: [bind('right', 'KeyD'), bind('left', 'KeyA')],
  lift: [bind('up', 'Space'), bind('down', 'KeyC')],
  roll: [bind('rollRight', 'KeyE'), bind('rollLeft', 'KeyQ')],
  pitch: [bind('pitchUp', 'ArrowUp'), bind('pitchDown', 'ArrowDown')],
  yaw: [bind('yawRight', 'ArrowRight'), bind('yawLeft', 'ArrowLeft')],
} satisfies Record<Axis, unknown>;
const boostKey = bind('boost', 'ShiftLeft,ShiftRight');
export const assistKey = bind('assist', 'KeyF');
export const cameraKey = bind('camera', 'KeyV');
export const controlsKey = bind('controls', 'KeyK');
export const respawnKey = bind('respawn', 'KeyR');

const keyRamp = vars.num('input.key.ramp', 8, { min: 0, max: 30, hardMin: 0, unit: '/s', tags: keyTags, desc: 'how fast key axes move to full; 0 = instant' });
export const invert = {
  pointer: vars.bool('input.invert.pointerY', false, { tags, desc: 'touchpad/mouse: moving up pitches the nose down' }),
  keys: vars.bool('input.invert.keyPitch', false, { tags: keyTags, desc: 'swap the pitch up/down keys' }),
};

const pointerMode = vars.enum('input.pointer.mode', 'stick', ['stick', 'scroll', 'off'], {
  tags,
  desc: 'stick: click to capture, move finger to steer; scroll: two-finger scroll steers',
});
const stickRadius = vars.num('input.stick.radius', 200, { min: 20, max: 800, hardMin: 1, unit: 'px', tags });
const stickRecenter = vars.num('input.stick.recenter', 1.5, { min: 0, max: 10, hardMin: 0, unit: '/s', tags, desc: '0 = stick stays where you leave it' });
const scrollSens = vars.num('input.scroll.sens', 0.01, { min: 0.001, max: 0.05, hardMin: 0, tags });
const scrollDecay = vars.num('input.scroll.decay', 6, { min: 0, max: 30, hardMin: 0, unit: '/s', tags });
const pinchAction = vars.enum('input.pinch.action', 'throttle', ['throttle', 'zoom', 'off'], { tags, desc: 'ctrl+wheel / trackpad pinch' });
const pinchSens = vars.num('input.pinch.sens', 0.01, { min: 0.001, max: 0.05, hardMin: 0, tags });
const clickAction = vars.enum('input.pointer.click', 'boost', ['boost', 'thrust', 'none'], { tags, desc: 'held click while the stick is captured' });

const curveVars = (group: string, expo: number): Record<keyof Curve, { value: number }> => ({
  deadzone: vars.num(`input.curve.${group}.deadzone`, 0.05, { min: 0, max: 0.5, hardMin: 0, hardMax: 0.99, tags: ['input', 'curve', 'feel'] }),
  expo: vars.num(`input.curve.${group}.expo`, expo, { min: 0.5, max: 4, hardMin: 0.1, tags: ['input', 'curve', 'feel'] }),
  sensitivity: vars.num(`input.curve.${group}.sens`, 1, { min: 0.1, max: 3, hardMin: 0, tags: ['input', 'curve', 'feel'] }),
});
const moveCurve = curveVars('move', 1);
export const curves: Record<Axis, Record<keyof Curve, { value: number }>> = {
  pitch: curveVars('pitch', 1.6),
  yaw: curveVars('yaw', 1.6),
  roll: curveVars('roll', 1.3),
  strafe: moveCurve,
  lift: moveCurve,
  thrust: moveCurve,
};
export const curveOf = (axis: Axis): Curve => ({
  deadzone: curves[axis].deadzone.value,
  expo: curves[axis].expo.value,
  sensitivity: curves[axis].sensitivity.value,
});

// --- state -----------------------------------------------------------------
const down = new Set<string>();
const stick: Stick = { x: 0, y: 0 };
const scroll = { yaw: 0, pitch: 0 };
let clickHeld = false;
let captured = false;
/** throttle lever set by pinch, 0..1, added to forward thrust */
let cruise = 0;
/** camera zoom multiplier set by pinch (zoom mode) */
export const zoom = { value: 1 };

/** Last sample, per stage, for the input visualizer. */
export const debug = {
  keys: zero(),
  pointer: zero(),
  raw: zero(),
  curved: zero(),
  boost: false,
  captured: false,
  cruise: 0,
  stick,
};

const pressed = (v: { value: string }) => v.value.split(',').some((c) => down.has(c.trim()));
const clamp1 = (x: number) => Math.min(Math.max(x, -1), 1);

/** Edge-triggered key handlers (flight assist toggle, camera cycle, …). */
const actions: { key: { value: string }; fn: () => void }[] = [];
export function onKey(key: { value: string }, fn: () => void): void {
  actions.push({ key, fn });
}

export function attachInput(canvas: HTMLCanvasElement): void {
  addEventListener('keydown', (e) => {
    if (isTyping(e) || e.ctrlKey || e.metaKey) return;
    if (!e.repeat) for (const a of actions) if (a.key.value.split(',').some((c) => c.trim() === e.code)) a.fn();
    // keep Space / arrows from scrolling or activating focused buttons
    if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
    down.add(e.code);
  });
  addEventListener('keyup', (e) => down.delete(e.code));
  addEventListener('blur', () => {
    down.clear();
    clickHeld = false;
  });

  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (pointerMode.value === 'stick' && !captured) {
      void canvas.requestPointerLock?.();
      return;
    }
    clickHeld = true;
  });
  addEventListener('mouseup', () => (clickHeld = false));
  document.addEventListener('pointerlockchange', () => {
    captured = document.pointerLockElement === canvas;
    if (!captured) {
      stick.x = stick.y = 0;
      clickHeld = false;
    }
  });
  addEventListener('mousemove', (e) => {
    if (captured && pointerMode.value === 'stick') moveStick(stick, e.movementX, e.movementY, stickRadius.value);
  });

  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault(); // no page zoom / scroll / swipe-back on the canvas
      const px = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
      if (e.ctrlKey) {
        // trackpad pinch arrives as ctrl+wheel; pinch out = negative deltaY
        const d = -e.deltaY * px * pinchSens.value;
        if (pinchAction.value === 'throttle') cruise = Math.min(1, Math.max(0, cruise + d));
        else if (pinchAction.value === 'zoom') zoom.value = Math.min(4, Math.max(0.25, zoom.value * Math.exp(-d)));
        return;
      }
      if (pointerMode.value === 'scroll') {
        scroll.yaw = clamp1(scroll.yaw + e.deltaX * px * scrollSens.value);
        scroll.pitch = clamp1(scroll.pitch - e.deltaY * px * scrollSens.value);
      }
    },
    { passive: false },
  );
  // Safari pinch gestures
  for (const t of ['gesturestart', 'gesturechange']) canvas.addEventListener(t, (e) => e.preventDefault());
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
}

/** Sample devices into controls. Called once per fixed sim step, so keyboard ramps are deterministic. */
export function sampleInput(prev: Controls, dt: number): Controls {
  const k = debug.keys;
  for (const axis of AXES) {
    const [pos, neg] = keys[axis];
    let target = (pressed(pos) ? 1 : 0) - (pressed(neg) ? 1 : 0);
    if (axis === 'pitch' && invert.keys.value) target = -target;
    k[axis] = ramp(k[axis], target, keyRamp.value, dt);
  }

  const p = debug.pointer;
  Object.assign(p, zero());
  if (pointerMode.value === 'stick' && captured) {
    recenterStick(stick, stickRecenter.value, dt);
    const s = stickAxes(stick, stickRadius.value);
    p.yaw = s.yaw;
    p.pitch = s.pitch;
  } else if (pointerMode.value === 'scroll') {
    const decay = Math.exp(-scrollDecay.value * dt);
    scroll.yaw *= decay;
    scroll.pitch *= decay;
    p.yaw = scroll.yaw;
    p.pitch = scroll.pitch;
  }
  if (invert.pointer.value) p.pitch = -p.pitch;
  const clickLive = clickHeld && (captured || pointerMode.value !== 'stick');
  if (clickLive && clickAction.value === 'thrust') p.thrust = 1;
  p.thrust = Math.max(p.thrust, cruise);

  const out = prev;
  for (const axis of AXES) {
    debug.raw[axis] = clamp1(k[axis] + p[axis]);
    debug.curved[axis] = applyCurve(debug.raw[axis], curveOf(axis));
    out[axis] = debug.curved[axis];
  }
  out.boost = pressed(boostKey) || (clickLive && clickAction.value === 'boost');

  debug.boost = out.boost;
  debug.captured = captured;
  debug.cruise = cruise;
  return out;
}

export { pointerMode };
