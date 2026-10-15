import type { ShipState } from '../sim/ship';

/** Minimal flight readout: speed, boost, flight assist, camera, and a capture hint. */
export function createHud() {
  const el = document.createElement('div');
  el.id = 'hud';
  el.innerHTML = `
    <div class="hint"></div>
    <div class="row"><b class="speed">0</b><span>m/s</span></div>
    <div class="bar"><i></i></div>
    <div class="row small"><span class="fa"></span><span class="cam"></span><span class="cruise"></span></div>`;
  document.body.appendChild(el);
  const $ = (s: string) => el.querySelector(s) as HTMLElement;
  const speed = $('.speed');
  const bar = $('.bar i');
  const fa = $('.fa');
  const cam = $('.cam');
  const cruise = $('.cruise');
  const hint = $('.hint');

  return {
    update(ship: ShipState, info: { assist: boolean; cam: string; cruise: number; hint: string }) {
      speed.textContent = ship.vel.length().toFixed(0);
      bar.style.width = `${(ship.energy * 100).toFixed(1)}%`;
      bar.classList.toggle('on', ship.boosting);
      bar.classList.toggle('locked', ship.boostLocked);
      fa.textContent = info.assist ? 'ASSIST' : 'NEWTONIAN';
      fa.classList.toggle('off', !info.assist);
      cam.textContent = info.cam.toUpperCase();
      cruise.textContent = info.cruise > 0 ? `CRUISE ${Math.round(info.cruise * 100)}%` : '';
      hint.textContent = info.hint;
    },
  };
}
