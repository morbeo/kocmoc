import { LADDER_SIZE, SHIPS, hasBadge, unlockedLevel, type Ladder } from '../core/ladder';
import './levels.css';

/**
 * Proving ground level select: pick a ship preset (each earns its own badge at level 8) and a
 * level up to one past the highest that ship has cleared. Plain DOM, toggled with L.
 */
export interface LevelsHost {
  ladder(): Ladder;
  /** ship preset in use, null for custom tuning */
  ship(): string | null;
  play(level: number, ship: string): void;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

export function createLevels(host: LevelsHost) {
  const root = document.createElement('div');
  root.id = 'levels';
  root.hidden = true;
  document.body.appendChild(root);
  let pick: string = 'balanced';

  function draw(): void {
    const ladder = host.ladder();
    const rec = ladder[pick];
    const open = unlockedLevel(ladder, pick);
    const shown = Math.max(LADDER_SIZE, open);
    const ships = SHIPS.map(
      (s) =>
        `<button class="ship${s === pick ? ' on' : ''}" data-ship="${s}" title="${hasBadge(ladder, s) ? 'badge earned' : 'clear level 8 for the badge'}">` +
        `${hasBadge(ladder, s) ? '★ ' : ''}${s}</button>`,
    ).join('');
    const levels = Array.from({ length: shown }, (_, i) => {
      const n = i + 1;
      const best = rec?.best[n];
      const locked = n > open;
      const done = (rec?.cleared ?? 0) >= n;
      return `<button class="level${done ? ' done' : ''}" data-level="${n}"${locked ? ' disabled' : ''}>
        <b>${n}</b><span>${locked ? 'locked' : best !== undefined ? esc(String(best)) : n > LADDER_SIZE ? 'bonus' : '–'}</span></button>`;
    }).join('');
    root.innerHTML = `
      <div class="lv-panel" role="dialog" aria-label="Proving ground">
        <header><h2>Proving ground</h2><button class="lv-close" title="close (Esc)">×</button></header>
        <p class="lv-help">Fly the gates against the clock. Gates and beacons add time, misses cost it. Clear level ${LADDER_SIZE} with a ship for its badge.</p>
        <div class="lv-ships">${ships}</div>
        <div class="lv-grid">${levels}</div>
        ${host.ship() === null ? '<p class="lv-note">Your ship is custom-tuned: pick a preset to earn badges.</p>' : ''}
      </div>`;
  }

  root.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el === root || el.closest('.lv-close')) return toggle(false);
    const ship = el.closest<HTMLElement>('[data-ship]')?.dataset.ship;
    if (ship) {
      pick = ship;
      draw();
      return;
    }
    const lvl = el.closest<HTMLButtonElement>('[data-level]');
    if (lvl && !lvl.disabled) {
      toggle(false);
      host.play(Number(lvl.dataset.level), pick);
    }
  });
  addEventListener('keydown', (e) => {
    if (!root.hidden && e.code === 'Escape') toggle(false);
  });

  function toggle(force = root.hidden): void {
    if (force) {
      pick = host.ship() ?? pick;
      draw();
      if (document.pointerLockElement) document.exitPointerLock();
    }
    root.hidden = !force;
  }

  return { toggle, get open() { return !root.hidden; } };
}
