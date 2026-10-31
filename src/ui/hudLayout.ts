import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars, type Change, type Var } from '../core/vars';
import type { Track } from '../gen/track';
import './hudLayout.css';

/**
 * HUD widgets that can be moved, scaled and hidden. Layout lives in vars (`hud.<widget>.*`),
 * so it saves, shares and comes in presets like everything else. `H` toggles edit mode.
 */
export const WIDGETS = ['speed', 'timer', 'minimap', 'arrow', 'standings'] as const;
export type Widget = (typeof WIDGETS)[number];

const tags = ['hud'];
const DEFAULTS: Record<Widget, { x: number; y: number; scale: number; visible: boolean; desc: string }> = {
  speed: { x: 0.5, y: 0.9, scale: 1, visible: true, desc: 'speed, boost, assist and camera' },
  timer: { x: 0.5, y: 0.07, scale: 1, visible: true, desc: 'lap timer and splits' },
  minimap: { x: 0.9, y: 0.82, scale: 1, visible: true, desc: 'top-down track map' },
  arrow: { x: 0.5, y: 0.2, scale: 1, visible: true, desc: 'points at the next checkpoint' },
  standings: { x: 0.08, y: 0.32, scale: 1, visible: true, desc: 'your place and the gaps to the ghost rivals' },
};
export const editMode = vars.bool('hud.edit', false, { tags, desc: 'drag HUD widgets to move, scroll to resize (H)' });
export const editKey = vars.str('input.key.hudEdit', 'KeyH', { tags: ['input', 'keys'], desc: 'KeyboardEvent.code, comma-separated' });
const w = Object.fromEntries(
  WIDGETS.map((name) => {
    const d = DEFAULTS[name];
    const t = ['hud', name];
    return [
      name,
      {
        x: vars.num(`hud.${name}.x`, d.x, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: t, desc: 'centre, fraction of screen width' }),
        y: vars.num(`hud.${name}.y`, d.y, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: t, desc: 'centre, fraction of screen height' }),
        scale: vars.num(`hud.${name}.scale`, d.scale, { min: 0.5, max: 3, hardMin: 0.2, hardMax: 6, tags: t }),
        visible: vars.bool(`hud.${name}.visible`, d.visible, { tags: t, desc: d.desc }),
      },
    ];
  }),
) as Record<Widget, { x: Var<number>; y: Var<number>; scale: Var<number>; visible: Var<boolean> }>;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export interface HudFrame {
  camera: THREE.Camera;
  shipPos: THREE.Vector3;
  shipQuat: THREE.Quaternion;
  track: Track | null;
  /** arc length of the next checkpoint, if racing */
  nextCp: number | null;
}

export function createHudLayout(elements: { speed: HTMLElement; timer: HTMLElement; standings: HTMLElement }) {
  // minimap
  const map = document.createElement('canvas');
  map.id = 'minimap';
  map.width = map.height = 160;
  document.body.appendChild(map);
  const g = map.getContext('2d');
  // checkpoint arrow
  const arrow = document.createElement('div');
  arrow.id = 'cp-arrow';
  arrow.innerHTML = '<i></i><span></span>';
  document.body.appendChild(arrow);
  const arrowHead = arrow.querySelector('i') as HTMLElement;
  const arrowText = arrow.querySelector('span') as HTMLElement;

  const els: Record<Widget, HTMLElement> = { speed: elements.speed, timer: elements.timer, minimap: map, arrow, standings: elements.standings };
  for (const name of WIDGETS) {
    const el = els[name];
    el.classList.add('hud-widget');
    el.dataset.widget = name;
    const close = document.createElement('button');
    close.className = 'hud-close';
    close.textContent = '×';
    close.title = 'hide this widget';
    close.addEventListener('click', () => w[name].visible.set(false));
    el.appendChild(close);
  }

  // layout from vars
  effect(() => {
    for (const name of WIDGETS) {
      const v = w[name];
      const el = els[name];
      el.style.left = `${v.x.value * 100}%`;
      el.style.top = `${v.y.value * 100}%`;
      el.style.bottom = 'auto';
      el.style.transform = `translate(-50%, -50%) scale(${v.scale.value})`;
      el.classList.toggle('hud-hidden', !v.visible.value);
    }
  });

  // edit mode: a hint bar with the hidden widgets, and drag/scroll on the widgets
  const bar = document.createElement('div');
  bar.id = 'hud-editor';
  document.body.appendChild(bar);
  effect(() => {
    const on = editMode.value;
    document.body.classList.toggle('hud-editing', on);
    bar.hidden = !on;
    if (!on) return;
    const hidden = WIDGETS.filter((n) => !w[n].visible.value);
    bar.innerHTML =
      '<b>HUD editor</b> drag to move · scroll to resize · × hides' +
      hidden.map((n) => ` <button data-show="${n}">show ${n}</button>`).join('') +
      ' <button data-done>done (H)</button>';
  });
  bar.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('button');
    if (!b) return;
    if (b.dataset.show) w[b.dataset.show as Widget].visible.set(true);
    if ('done' in b.dataset) editMode.set(false);
  });

  let drag: { name: Widget; dx: number; dy: number; before: [number, number] } | null = null;
  addEventListener('pointerdown', (e) => {
    if (!editMode.value) return;
    const el = (e.target as HTMLElement).closest('.hud-widget') as HTMLElement | null;
    if (!el || (e.target as HTMLElement).classList.contains('hud-close')) return;
    const name = el.dataset.widget as Widget;
    const v = w[name];
    drag = { name, dx: e.clientX / innerWidth - v.x.value, dy: e.clientY / innerHeight - v.y.value, before: [v.x.value, v.y.value] };
    e.preventDefault();
    e.stopPropagation();
  }, true);
  addEventListener('pointermove', (e) => {
    if (!drag) return;
    const x = clamp01(e.clientX / innerWidth - drag.dx);
    const y = clamp01(e.clientY / innerHeight - drag.dy);
    // live, not recorded: the drop records one undo step
    vars.change(
      [
        { layer: 'user', path: `hud.${drag.name}.x`, before: vars.layerValue('user', `hud.${drag.name}.x`), after: Math.round(x * 1000) / 1000 },
        { layer: 'user', path: `hud.${drag.name}.y`, before: vars.layerValue('user', `hud.${drag.name}.y`), after: Math.round(y * 1000) / 1000 },
      ],
      false,
    );
  });
  addEventListener('pointerup', () => {
    if (!drag) return;
    const { name, before } = drag;
    drag = null;
    const changes: Change[] = (['x', 'y'] as const).map((k, i) => ({
      layer: 'user',
      path: `hud.${name}.${k}`,
      before: before[i],
      after: vars.layerValue('user', `hud.${name}.${k}`),
    }));
    vars.history.push(changes.filter((c) => c.before !== c.after));
  });
  addEventListener(
    'wheel',
    (e) => {
      if (!editMode.value) return;
      const el = (e.target as HTMLElement).closest('.hud-widget') as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      const v = vars.get(`hud.${el.dataset.widget}.scale`);
      if (v) v.set(Math.round(Math.min(3, Math.max(0.5, (v.value as number) * (e.deltaY < 0 ? 1.1 : 1 / 1.1))) * 100) / 100);
    },
    { passive: false, capture: true },
  );

  // minimap: track projected top-down (x/z), fitted once per track
  let fitFor: Track | null = null;
  let fit = { cx: 0, cz: 0, k: 1 };
  const _v = new THREE.Vector3();
  const _f = new THREE.Vector3();

  return {
    update(f: HudFrame) {
      const showMap = w.minimap.visible.value && !!f.track;
      map.hidden = !showMap && !editMode.value;
      if (g && f.track && showMap) {
        const t = f.track;
        if (fitFor !== t) {
          let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
          for (const p of t.pos) {
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minZ = Math.min(minZ, p.z);
            maxZ = Math.max(maxZ, p.z);
          }
          fit = { cx: (minX + maxX) / 2, cz: (minZ + maxZ) / 2, k: 140 / Math.max(maxX - minX, maxZ - minZ, 1) };
          fitFor = t;
        }
        const px = (x: number) => 80 + (x - fit.cx) * fit.k;
        const pz = (z: number) => 80 + (z - fit.cz) * fit.k;
        g.clearRect(0, 0, 160, 160);
        g.fillStyle = 'rgba(255,255,255,0.75)';
        g.beginPath();
        g.arc(80, 80, 80, 0, Math.PI * 2);
        g.fill();
        g.strokeStyle = '#5a3fa0';
        g.lineWidth = 3;
        g.beginPath();
        for (let i = 0; i < t.pos.length; i += 4) {
          const p = t.pos[i];
          if (i === 0) g.moveTo(px(p.x), pz(p.z));
          else g.lineTo(px(p.x), pz(p.z));
        }
        g.closePath();
        g.stroke();
        if (f.nextCp !== null) {
          const p = t.pos[Math.min(t.pos.length - 1, Math.floor((f.nextCp / t.length) * t.pos.length))];
          g.fillStyle = '#0aa5c8';
          g.beginPath();
          g.arc(px(p.x), pz(p.z), 4, 0, Math.PI * 2);
          g.fill();
        }
        // ship: a small triangle pointing along its heading
        _f.set(0, 0, -1).applyQuaternion(f.shipQuat);
        const a = Math.atan2(_f.z, _f.x);
        const sx = px(f.shipPos.x);
        const sz = pz(f.shipPos.z);
        g.fillStyle = '#ff2fa8';
        g.beginPath();
        g.moveTo(sx + Math.cos(a) * 7, sz + Math.sin(a) * 7);
        g.lineTo(sx + Math.cos(a + 2.5) * 5, sz + Math.sin(a + 2.5) * 5);
        g.lineTo(sx + Math.cos(a - 2.5) * 5, sz + Math.sin(a - 2.5) * 5);
        g.fill();
      }

      // checkpoint arrow: direction to the next checkpoint in the camera's view
      const showArrow = w.arrow.visible.value && !!f.track && f.nextCp !== null;
      arrow.hidden = !showArrow && !editMode.value;
      if (showArrow && f.track && f.nextCp !== null) {
        const t = f.track;
        const p = t.pos[Math.min(t.pos.length - 1, Math.floor((f.nextCp / t.length) * t.pos.length))];
        _v.copy(p).applyMatrix4(f.camera.matrixWorldInverse);
        // 0° = straight up the screen; behind the camera it fades so "turn around" reads
        arrowHead.style.transform = `rotate(${(Math.atan2(_v.x, _v.y) * 180) / Math.PI}deg)`;
        arrow.classList.toggle('behind', _v.z > 0);
        arrowText.textContent = `${Math.round(p.distanceTo(f.shipPos))} m`;
      }
    },
  };
}
