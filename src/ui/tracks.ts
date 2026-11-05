import type { Scenario } from '../core/scenarios';
import './tracks.css';

/**
 * Race track select: the bundled alien venues, each with its sky as a swatch. Plain DOM, toggled
 * with T; picking one loads its scenario.
 */
export interface TracksHost {
  venues(): Scenario[];
  /** name of the venue loaded last, if any */
  current(): string | null;
  play(sc: Scenario): void;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const SHAPES: Record<string, string> = {
  loop: 'loop',
  figure8: 'figure eight',
  trefoil: 'trefoil knot',
  star: 'star knot',
  coil: 'coil',
  upright: 'upright loop',
  clover: 'clover',
};
const color = (v: unknown, fallback: string) => (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) ? v : fallback);

/** Short facts under a venue's name: layout, rolls, laps. */
export function venueTags(sc: Scenario): string[] {
  const v = sc.vars ?? {};
  const tags = [SHAPES[String(v['gen.race.shape'] ?? 'loop')] ?? String(v['gen.race.shape'])];
  const twist = Number(v['gen.race.twist'] ?? 0);
  if (twist) tags.push(`${Math.abs(twist)} roll${Math.abs(twist) > 1 ? 's' : ''} a lap`);
  const profile = v['gen.race.profile'];
  if (typeof profile === 'string' && profile !== 'tube') tags.push(profile);
  const laps = v['race.laps'];
  if (typeof laps === 'number') tags.push(`${laps} lap${laps === 1 ? '' : 's'}`);
  return tags;
}

export function createTracks(host: TracksHost) {
  const root = document.createElement('div');
  root.id = 'tracks';
  root.hidden = true;
  document.body.appendChild(root);

  function draw(): void {
    const current = host.current();
    const items = host
      .venues()
      .map((sc) => {
        const v = sc.vars ?? {};
        const sky = `linear-gradient(${color(v['render.sky.zenith'], '#1a0b3d')}, ${color(v['render.background'], '#05010f')})`;
        const track = color(v['render.track.stripe'], '#5a3fa0');
        return `<button class="venue${sc.name === current ? ' on' : ''}" data-venue="${esc(sc.name)}">
          <i class="sw" style="background:${sky}"><b style="background:${track}"></b></i>
          <span class="tx"><b>${esc(sc.title ?? sc.name)}</b><small>${esc(venueTags(sc).join(' · '))}</small><em>${esc(sc.desc ?? '')}</em></span>
        </button>`;
      })
      .join('');
    root.innerHTML = `
      <div class="tk-panel" role="dialog" aria-label="Race tracks">
        <header><h2>Race tracks</h2><button class="tk-close" title="close (Esc)">×</button></header>
        <p class="tk-help">Ten worlds to race. Each has its own shortcuts and long ways, and your ghosts are kept per track.</p>
        <div class="tk-list">${items}</div>
      </div>`;
  }

  root.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el === root || el.closest('.tk-close')) return toggle(false);
    const name = el.closest<HTMLElement>('[data-venue]')?.dataset.venue;
    const sc = host.venues().find((x) => x.name === name);
    if (sc) {
      toggle(false);
      host.play(sc);
    }
  });
  addEventListener('keydown', (e) => {
    if (!root.hidden && e.code === 'Escape') toggle(false);
  });

  function toggle(force = root.hidden): void {
    if (force) {
      draw();
      if (document.pointerLockElement) document.exitPointerLock();
    }
    root.hidden = !force;
  }

  return { toggle, get open() { return !root.hidden; } };
}
