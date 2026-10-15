import { effect } from '@preact/signals-core';
import { touch, touchVars as tv, resetTouch, dragAxes, screenDown, screenTilt, tiltAxes, type TouchAxis } from '../input/touch';
import { invert } from '../input/input';
import './touch.css';

/** On-screen controls for touch screens: two floating thumb sticks, hold buttons, menu buttons, tilt steering. */

export interface TouchActions {
  respawn(): void;
  camera(): void;
  assist(): void;
  debug(): void;
}

interface Thumb {
  zone: HTMLElement;
  base: HTMLElement;
  knob: HTMLElement;
  id: number | null;
  ox: number;
  oy: number;
  x: number;
  y: number;
}

const el = (tag: string, cls: string, text = ''): HTMLElement => {
  const e = document.createElement(tag);
  e.className = cls;
  e.textContent = text;
  return e;
};

const root = el('div', '');
root.id = 'touch-ui';
root.hidden = true;
document.body.appendChild(root);

function thumb(side: 'left' | 'right'): Thumb {
  const zone = el('div', `zone ${side}`);
  const base = el('div', 'base rest');
  const knob = el('div', 'knob');
  base.appendChild(knob);
  zone.appendChild(base);
  root.appendChild(zone);
  const t: Thumb = { zone, base, knob, id: null, ox: 0, oy: 0, x: 0, y: 0 };

  zone.addEventListener('pointerdown', (e) => {
    if (t.id !== null) return;
    e.preventDefault();
    zone.setPointerCapture(e.pointerId);
    const r = zone.getBoundingClientRect();
    t.id = e.pointerId;
    t.ox = e.clientX - r.left;
    t.oy = e.clientY - r.top;
    base.classList.remove('rest');
    base.style.left = `${t.ox}px`;
    base.style.top = `${t.oy}px`;
    hideHint();
    move(t, e);
  });
  zone.addEventListener('pointermove', (e) => e.pointerId === t.id && move(t, e));
  const end = (e: PointerEvent) => {
    if (e.pointerId !== t.id) return;
    release(t);
    apply();
  };
  zone.addEventListener('pointerup', end);
  zone.addEventListener('pointercancel', end);
  return t;
}

function release(t: Thumb): void {
  t.id = null;
  t.x = t.y = 0;
  t.base.classList.add('rest');
  t.base.style.left = t.base.style.top = '';
  t.knob.style.transform = '';
}

function move(t: Thumb, e: PointerEvent): void {
  const r = t.zone.getBoundingClientRect();
  const rad = tv.radius.value;
  const a = dragAxes(e.clientX - r.left - t.ox, e.clientY - r.top - t.oy, rad);
  t.x = a.x;
  t.y = a.y;
  t.knob.style.transform = `translate(${a.x * rad}px, ${-a.y * rad}px)`;
  apply();
}

const left = thumb('left');
const right = thumb('right');

// --- buttons ---------------------------------------------------------------
const held = { boost: false, up: false, down: false, rollLeft: false, rollRight: false };

/** A button that acts on press (no click delay, no focus), or reports held state. */
function button(parent: HTMLElement, cls: string, text: string, onPress: () => void, onRelease?: () => void): HTMLButtonElement {
  const b = el('button', cls, text) as HTMLButtonElement;
  b.type = 'button';
  b.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    hideHint();
    if (onRelease) b.setPointerCapture(e.pointerId);
    b.classList.add('held');
    onPress();
  });
  const up = () => {
    if (!b.classList.contains('held')) return;
    b.classList.remove('held');
    onRelease?.();
  };
  b.addEventListener('pointerup', up);
  b.addEventListener('pointercancel', up);
  if (!onRelease) b.addEventListener('pointerleave', up);
  parent.appendChild(b);
  return b;
}
const hold = (parent: HTMLElement, cls: string, text: string, key: keyof typeof held) =>
  button(parent, cls, text, () => ((held[key] = true), apply()), () => ((held[key] = false), apply()));

const bar = el('div', 'bar');
root.appendChild(bar);
const bar2 = el('div', 'bar right');
root.appendChild(bar2);
const lift = el('div', 'lift');
root.appendChild(lift);
hold(lift, 'lift-up', '▲', 'up');
hold(lift, 'lift-down', '▼', 'down');
const roll = el('div', 'roll');
root.appendChild(roll);
hold(roll, 'roll-left', '⟲', 'rollLeft');
hold(roll, 'roll-right', '⟳', 'rollRight');
hold(root, 'boost', 'BOOST', 'boost');
const hint = el('div', 'hint');
root.appendChild(hint);

let hintTimer: ReturnType<typeof setTimeout> | undefined;
function hideHint(): void {
  hint.classList.add('gone');
}
function showHint(text: string, ms = 0): void {
  hint.textContent = text;
  hint.classList.remove('gone');
  clearTimeout(hintTimer);
  if (ms) hintTimer = setTimeout(hideHint, ms);
}

// --- tilt ------------------------------------------------------------------
let tilt = { side: 0, pitch: 0 };
let neutral: number | null = null;
let listening = false;

const screenAngle = () => screen.orientation?.angle ?? Number((window as { orientation?: number }).orientation ?? 0);

function onOrient(e: DeviceOrientationEvent): void {
  if (e.beta === null || e.gamma === null) return;
  const t = screenTilt(screenDown(e.beta, e.gamma, screenAngle()));
  if (neutral === null) neutral = t.pitch; // first reading after enabling = level
  tilt = tiltAxes(t, neutral, tv.tiltRange.value);
  apply();
}

function listenTilt(on: boolean): void {
  if (on === listening) return;
  listening = on;
  if (on) addEventListener('deviceorientation', onOrient);
  else removeEventListener('deviceorientation', onOrient);
  neutral = null;
  tilt = { side: 0, pitch: 0 };
  apply();
}

/** Turn tilt on (asking for sensor permission where the browser requires it, which must happen in a tap) or off. */
async function toggleTilt(): Promise<void> {
  if (tv.tilt.value) return tv.tilt.set(false);
  const ask = (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission;
  if (ask) {
    try {
      if ((await ask.call(DeviceOrientationEvent)) !== 'granted') return showHint('Tilt needs motion sensor access', 3000);
    } catch {
      return showHint('Tilt needs motion sensor access', 3000);
    }
  }
  tv.tilt.set(true);
  showHint('Tilt on: the way you hold it now counts as level', 3000);
  // no sensor (desktop, insecure origin) → say so instead of silently doing nothing
  setTimeout(() => tv.tilt.value && neutral === null && showHint('No tilt sensor found', 3000), 1500);
}
screen.orientation?.addEventListener('change', () => (neutral = null));

// --- fullscreen ------------------------------------------------------------
async function toggleFullscreen(): Promise<void> {
  if (document.fullscreenElement) return void document.exitFullscreen();
  try {
    await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    await (screen.orientation as { lock?: (o: string) => Promise<void> }).lock?.('landscape');
  } catch {
    /* not allowed here; the page still works */
  }
}

// --- mixing ----------------------------------------------------------------
function apply(): void {
  resetTouch();
  const add = (axis: TouchAxis, v: number) => {
    if (axis === 'none') return;
    touch[axis] += axis === 'pitch' && invert.pointer.value ? -v : v;
  };
  add(tv.left.x.value, left.x);
  add(tv.left.y.value, left.y);
  add(tv.right.x.value, right.x);
  add(tv.right.y.value, right.y);
  if (listening) {
    if (tv.tiltSide.value !== 'none') touch[tv.tiltSide.value] += tilt.side;
    if (tv.tiltPitch.value) touch.pitch += tv.tiltInvert.value ? -tilt.pitch : tilt.pitch;
  }
  touch.lift += (held.up ? 1 : 0) - (held.down ? 1 : 0);
  touch.roll += (held.rollRight ? 1 : 0) - (held.rollLeft ? 1 : 0);
  for (const k of ['pitch', 'yaw', 'roll', 'strafe', 'lift', 'thrust'] as const) touch[k] = Math.min(Math.max(touch[k], -1), 1);
  const rim = tv.boostAtRim.value;
  const pushed = (axis: TouchAxis, v: number) => axis === 'thrust' && v >= rim;
  touch.boost = held.boost || pushed(tv.left.y.value, left.y) || pushed(tv.left.x.value, left.x) || pushed(tv.right.y.value, right.y) || pushed(tv.right.x.value, right.x);
}

const NAMES: Record<TouchAxis, string> = { pitch: 'pitch', yaw: 'turn', roll: 'roll', strafe: 'slide', lift: 'lift', thrust: 'throttle', none: '' };
const thumbLabel = (x: TouchAxis, y: TouchAxis) => [NAMES[y], NAMES[x]].filter(Boolean).join(' + ') || 'nothing';

// --- mount -----------------------------------------------------------------
let mounted = false;
let shown = false;

export function mount(actions: TouchActions): void {
  if (mounted) return;
  mounted = true;
  button(bar, 'menu', '⚙', actions.debug).title = 'tuning (debug table)';
  button(bar, '', 'CAM', actions.camera);
  button(bar, '', 'ASSIST', actions.assist);
  button(bar, '', '↺', actions.respawn).title = 'respawn';
  const tiltBtn = button(bar2, 'tilt', 'TILT', () => void toggleTilt());
  if (document.fullscreenEnabled) button(bar2, '', '⛶', () => void toggleFullscreen()).title = 'fullscreen';
  effect(() => {
    tiltBtn.classList.toggle('on', tv.tilt.value);
    listenTilt(shown && tv.tilt.value);
  });
}

export function show(on: boolean): void {
  shown = on;
  root.hidden = !on;
  document.body.classList.toggle('touch-ui', on);
  listenTilt(on && tv.tilt.value);
  if (!on) return releaseAll();
  const portrait = innerHeight > innerWidth;
  showHint(
    `Left thumb: ${thumbLabel(tv.left.x.value, tv.left.y.value)} · Right thumb: ${thumbLabel(tv.right.x.value, tv.right.y.value)}` +
      (portrait ? ' · Turn sideways for a wider view' : ''),
  );
}

// a lost touch (app switch, notification) must not leave a stick stuck on
document.addEventListener('visibilitychange', () => {
  if (document.hidden) releaseAll();
});
function releaseAll(): void {
  release(left);
  release(right);
  held.boost = held.up = held.down = held.rollLeft = held.rollRight = false;
  for (const b of root.querySelectorAll('.held')) b.classList.remove('held');
  apply();
}
// iOS Safari pinch-zoom
for (const t of ['gesturestart', 'gesturechange']) document.addEventListener(t, (e) => shown && e.preventDefault());
