import type { ShipState } from '../sim/ship';

export interface RaceHud {
  lap: number;
  started: boolean;
  lapTime: number;
  lastLap: number | null;
  bestLap: number | null;
  /** latest split vs best, seconds; negative = ahead */
  delta: number | null;
  checkpoint: number;
  checkpoints: number;
  seed: number;
}

/** 83.456 → "1:23.456" */
export function formatTime(t: number | null): string {
  if (t === null) return '–:––.–––';
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${m}:${s.toFixed(3).padStart(6, '0')}`;
}

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
  const top = document.createElement('div');
  top.id = 'race-hud';
  top.innerHTML = `
    <div class="time">0:00.000</div>
    <div class="row small"><span class="lap"></span><span class="cp"></span><span class="delta"></span></div>
    <div class="row small"><span class="last"></span><span class="best"></span><span class="seed"></span></div>`;
  document.body.appendChild(top);
  const $t = (q: string) => top.querySelector(q) as HTMLElement;
  const time = $t('.time');
  const lap = $t('.lap');
  const cp = $t('.cp');
  const delta = $t('.delta');
  const last = $t('.last');
  const best = $t('.best');
  const seedEl = $t('.seed');
  const $ = (s: string) => el.querySelector(s) as HTMLElement;
  const speed = $('.speed');
  const bar = $('.bar i');
  const fa = $('.fa');
  const cam = $('.cam');
  const cruise = $('.cruise');
  const hint = $('.hint');

  return {
    update(ship: ShipState, info: { assist: boolean; cam: string; cruise: number; hint: string; race: RaceHud | null }) {
      const r = info.race;
      top.hidden = !r;
      if (r) {
        time.textContent = r.started ? formatTime(r.lapTime) : 'cross the line';
        lap.textContent = r.started ? `LAP ${r.lap}` : '';
        cp.textContent = r.started ? `CP ${r.checkpoint}/${r.checkpoints}` : '';
        delta.textContent = r.delta === null ? '' : `${r.delta < 0 ? '−' : '+'}${Math.abs(r.delta).toFixed(2)}`;
        delta.className = `delta ${r.delta !== null && r.delta < 0 ? 'ahead' : 'behind'}`;
        last.textContent = `LAST ${formatTime(r.lastLap)}`;
        best.textContent = `BEST ${formatTime(r.bestLap)}`;
        seedEl.textContent = `SEED ${r.seed}`;
      }
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
