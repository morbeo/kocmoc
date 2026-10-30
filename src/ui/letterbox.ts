import './letterbox.css';
import { letterbox } from '../cam/cinematic';
import type { Rect } from '../render/viewports';

/** Black bars that slide in over the main view while the cinematic camera is on. */
export function createLetterbox() {
  const [top, bottom] = ['top', 'bottom'].map((side) => {
    const el = document.createElement('div');
    el.className = `letterbox ${side}`;
    document.body.prepend(el);
    return el;
  });
  let key = '';
  return {
    update(on: boolean, r: Rect) {
      const h = Math.round(r.h * letterbox.value);
      const k = `${on},${h},${r.x},${r.y},${r.w},${r.h}`;
      if (k === key) return;
      key = k;
      top.style.cssText = `left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${h}px`;
      bottom.style.cssText = `left:${r.x}px;top:${r.y + r.h - h}px;width:${r.w}px;height:${h}px`;
      top.dataset.on = bottom.dataset.on = String(on && h > 0);
    },
  };
}
