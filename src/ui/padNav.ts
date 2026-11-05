import { type PadState, isDown, padVars } from '../input/pad';
import './padNav.css';

/**
 * Gamepad menu navigation: while a dialog (levels, tracks, controls) is open, the D-pad or left
 * stick moves focus to the nearest button in that direction, A clicks it and B closes the dialog.
 */

export type Dir = 'up' | 'down' | 'left' | 'right';
export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Index of the nearest box in direction `dir` from `from`, or -1. Off-axis distance counts double. */
export function nearestInDir(from: Box, boxes: readonly Box[], dir: Dir): number {
  const cx = from.x + from.w / 2;
  const cy = from.y + from.h / 2;
  let best = -1;
  let bestScore = Infinity;
  boxes.forEach((b, i) => {
    const dx = b.x + b.w / 2 - cx;
    const dy = b.y + b.h / 2 - cy;
    const along = dir === 'right' ? dx : dir === 'left' ? -dx : dir === 'down' ? dy : -dy;
    const across = Math.abs(dir === 'left' || dir === 'right' ? dy : dx);
    if (along <= 1) return;
    const score = along + across * 2;
    if (score < bestScore) {
      bestScore = score;
      best = i;
    }
  });
  return best;
}

/** Nav inputs; while a dialog is open these never reach the game. */
export const NAV = { up: 'b12,-a1', down: 'b13,+a1', left: 'b14,-a0', right: 'b15,+a0', ok: 'b0', back: 'b1' } as const;
type Nav = keyof typeof NAV;

const DIALOGS = '#levels:not([hidden]) [role=dialog], #tracks:not([hidden]) [role=dialog], #controls [role=dialog]';
export const openDialog = () => (typeof document === 'undefined' ? null : document.querySelector<HTMLElement>(DIALOGS));

const REPEAT_DELAY = 0.4;
const REPEAT_EVERY = 0.12;
const held: Partial<Record<Nav, number>> = {};

const box = (el: Element): Box => {
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
};

// show the focus ring only while the pad is driving the menu
let ring = false;
function showRing(): void {
  if (ring) return;
  ring = true;
  document.body.classList.add('pad-nav');
  addEventListener('pointerdown', () => ((ring = false), document.body.classList.remove('pad-nav')), { once: true });
}

function move(dialog: HTMLElement, dir: Dir): void {
  showRing();
  const items = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), input, select')).filter((el) => el.offsetParent !== null);
  if (!items.length) return;
  const cur = document.activeElement instanceof HTMLElement && dialog.contains(document.activeElement) ? document.activeElement : null;
  if (!cur) {
    (dialog.querySelector<HTMLElement>('button.on:not([disabled])') ?? items.find((el) => !el.matches('.close, .lv-close, .tk-close')) ?? items[0]).focus();
    return;
  }
  const others = items.filter((el) => el !== cur);
  const i = nearestInDir(box(cur), others.map(box), dir);
  if (i >= 0) {
    others[i].focus();
    others[i].scrollIntoView?.({ block: 'nearest' });
  }
}

/** Handle one frame of menu input. Returns true when a dialog is open (the game should ignore the nav inputs). */
export function padMenu(p: PadState, dt: number): boolean {
  const dialog = openDialog();
  if (!dialog || !padVars.menuNav.value) {
    for (const k of Object.keys(held) as Nav[]) delete held[k];
    return !!dialog;
  }
  for (const k of Object.keys(NAV) as Nav[]) {
    if (!isDown(p, NAV[k])) {
      delete held[k];
      continue;
    }
    // fire on press; directions repeat while held
    const t = held[k];
    let fire = t === undefined;
    if (t === undefined) held[k] = 0;
    else if (k !== 'ok' && k !== 'back' && (held[k] = t + dt) >= REPEAT_DELAY) {
      held[k]! -= REPEAT_EVERY;
      fire = true;
    }
    if (!fire) continue;
    if (k === 'ok') {
      const el = document.activeElement;
      if (el instanceof HTMLElement && dialog.contains(el)) el.click();
      else move(dialog, 'down');
    } else if (k === 'back') dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape' }));
    else move(dialog, k);
  }
  return true;
}
