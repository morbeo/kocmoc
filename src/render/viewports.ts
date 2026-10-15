import * as THREE from 'three';
import { vars } from '../core/vars';
import { RIGS, newRigState, placeRig, type Rig, type RigState } from '../cam/rigs';
import type { ShipState } from '../sim/ship';
import { SKY_LAYER } from './sky';
import './viewports.css';

export const LAYOUTS = ['single', 'pip', 'side', 'quad'] as const;
const tags = ['cam', 'view'];
export const layout = vars.enum('view.layout', 'single', LAYOUTS, { tags, desc: 'single, picture-in-picture, side by side, or 2×2' });
const rigVars = [
  vars.enum<Rig>('view.vp2.rig', 'lookback', RIGS, { tags, desc: 'second viewport (pip, side, quad)' }),
  vars.enum<Rig>('view.vp3.rig', 'top', RIGS, { tags, desc: 'third viewport (quad)' }),
  vars.enum<Rig>('view.vp4.rig', 'orbit', RIGS, { tags, desc: 'fourth viewport (quad)' }),
];
const pipSize = vars.num('view.pip.size', 0.3, { min: 0.1, max: 0.6, hardMin: 0.05, hardMax: 1, tags, desc: 'picture-in-picture width, fraction of the screen' });

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Screen rects (CSS px, top-left origin) for the main view and each extra viewport. */
export function layoutRects(kind: (typeof LAYOUTS)[number], W: number, H: number, pip = 0.3): { main: Rect; extra: Rect[] } {
  const full = { x: 0, y: 0, w: W, h: H };
  switch (kind) {
    case 'pip': {
      const w = Math.round(W * pip);
      const h = Math.round(w * 9 / 16);
      return { main: full, extra: [{ x: W - w - 12, y: 52, w, h }] };
    }
    case 'side': {
      const w = Math.floor(W / 2);
      return { main: { x: 0, y: 0, w, h: H }, extra: [{ x: w, y: 0, w: W - w, h: H }] };
    }
    case 'quad': {
      const w = Math.floor(W / 2);
      const h = Math.floor(H / 2);
      return {
        main: { x: 0, y: 0, w, h },
        extra: [
          { x: w, y: 0, w: W - w, h },
          { x: 0, y: h, w, h: H - h },
          { x: w, y: h, w: W - w, h: H - h },
        ],
      };
    }
    default:
      return { main: full, extra: [] };
  }
}

interface Popout {
  win: Window;
  renderer: THREE.WebGLRenderer;
}

/**
 * Extra viewports, scissor-rendered into the main canvas after the main view (no outline pass:
 * they're for watching, not for looks). Each can pop out into its own window for another monitor.
 */
export function createViewports(renderer: THREE.WebGLRenderer, scene: THREE.Scene, sky: { update(c: THREE.Camera, pr: number): void }) {
  const cams = rigVars.map(() => {
    const c = new THREE.PerspectiveCamera(70, 1, 0.1, 5000);
    c.layers.enable(SKY_LAYER);
    return c;
  });
  const states: RigState[] = rigVars.map(() => newRigState());
  const popouts: (Popout | null)[] = rigVars.map(() => null);

  // frames with a rig picker and a pop-out button
  const root = document.createElement('div');
  root.id = 'viewports';
  document.body.appendChild(root);
  const frames = rigVars.map((rv, i) => {
    const f = document.createElement('div');
    f.className = 'vp';
    f.innerHTML = `<div class="bar"><select title="camera rig">${RIGS.map((r) => `<option>${r}</option>`).join('')}</select><button title="open in its own window">pop out</button></div>`;
    const sel = f.querySelector('select')!;
    sel.addEventListener('change', () => {
      rv.set(sel.value as Rig);
      sel.blur();
    });
    f.querySelector('button')!.addEventListener('click', (e) => {
      (e.currentTarget as HTMLElement).blur();
      popOut(i);
    });
    root.appendChild(f);
    return { f, sel };
  });

  function popOut(i: number): void {
    if (popouts[i]) {
      popouts[i]!.win.focus();
      return;
    }
    const win = window.open('', `kocmoc-vp${i + 2}`, 'width=800,height=450');
    if (!win) return;
    win.document.title = `kocmoc · ${rigVars[i].value}`;
    win.document.body.style.cssText = 'margin:0;background:#fff;overflow:hidden';
    const canvas = win.document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100vw;height:100vh';
    win.document.body.appendChild(canvas);
    const r = new THREE.WebGLRenderer({ canvas, antialias: true });
    popouts[i] = { win, renderer: r };
    const close = () => {
      r.dispose();
      popouts[i] = null;
    };
    win.addEventListener('pagehide', close);
  }

  const cam = (i: number, ship: ShipState, dt: number, aspect: number) => {
    const c = cams[i];
    if (c.aspect !== aspect) {
      c.aspect = aspect;
      c.updateProjectionMatrix();
    }
    placeRig(rigVars[i].value, c, ship, dt, states[i]);
    return c;
  };

  return {
    /** Where the main (post-processed) view goes this frame. */
    mainRect(): Rect {
      return layoutRects(layout.value, innerWidth, innerHeight, pipSize.value).main;
    },

    /** Draw the extra viewports and pop-outs; call after the main view. */
    render(ship: ShipState, dt: number) {
      const { extra } = layoutRects(layout.value, innerWidth, innerHeight, pipSize.value);
      const H = renderer.domElement.clientHeight;
      frames.forEach(({ f, sel }, i) => {
        const r = extra[i];
        f.hidden = !r;
        if (r) {
          f.style.cssText = `left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px`;
          f.classList.toggle('popped', !!popouts[i]);
          if (sel.value !== rigVars[i].value) sel.value = rigVars[i].value;
        }
      });
      renderer.setRenderTarget(null);
      extra.forEach((r, i) => {
        if (popouts[i]) return;
        const c = cam(i, ship, dt, r.w / r.h);
        sky.update(c, renderer.getPixelRatio());
        renderer.setViewport(r.x, H - r.y - r.h, r.w, r.h);
        renderer.setScissor(r.x, H - r.y - r.h, r.w, r.h);
        renderer.setScissorTest(true);
        renderer.render(scene, c);
      });
      renderer.setScissorTest(false);
      renderer.setViewport(0, 0, renderer.domElement.clientWidth, H);

      popouts.forEach((p, i) => {
        if (!p) return;
        if (p.win.closed) {
          p.renderer.dispose();
          popouts[i] = null;
          return;
        }
        const w = p.win.innerWidth;
        const h = p.win.innerHeight;
        const size = p.renderer.getSize(new THREE.Vector2());
        if (size.x !== w || size.y !== h) p.renderer.setSize(w, h, false);
        const c = cam(i, ship, dt, w / Math.max(h, 1));
        sky.update(c, p.renderer.getPixelRatio());
        p.renderer.render(scene, c);
      });
    },
  };
}
