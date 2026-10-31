import type { ShipState } from '../sim/ship';
import type { Standings } from '../sim/rivals';

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
  /** laps in the race; 0 = endless practice */
  laps: number;
  raceTime: number;
  finished: boolean;
  finishTime: number | null;
  lapTimes: number[];
  /** places against the ghost rivals, once the clock runs and there are rivals */
  standings: Standings | null;
  /** each rival's time over the whole race */
  rivalTimes: { name: string; time: number }[];
}

/** 1.234 → "+1.23", -0.5 → "−0.50" */
export function formatGap(g: number): string {
  return `${g < 0 ? '−' : '+'}${Math.abs(g).toFixed(2)}`;
}

/** 1 → "1st" */
export function ordinal(n: number): string {
  const t = n % 100;
  const s = t >= 11 && t <= 13 ? 'th' : (['th', 'st', 'nd', 'rd'][n % 10] ?? 'th');
  return `${n}${s}`;
}

/** Lap label: "LAP 2/3" in a race (held at the last lap once finished), "LAP 2" in practice. */
export function lapLabel(lap: number, laps: number): string {
  return laps > 0 ? `LAP ${Math.min(lap, laps)}/${laps}` : `LAP ${lap}`;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

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
    <div class="row small"><span class="last"></span><span class="best"></span><span class="total"></span><span class="seed"></span></div>`;
  document.body.appendChild(top);
  // place and gaps to the ghost rivals
  const board = document.createElement('div');
  board.id = 'standings';
  board.innerHTML = '<div class="pos"></div><ol></ol>';
  document.body.appendChild(board);
  const boardPos = board.querySelector('.pos') as HTMLElement;
  const boardList = board.querySelector('ol') as HTMLElement;
  let boardKey = '';
  // results card at the finish
  const results = document.createElement('div');
  results.id = 'results';
  results.hidden = true;
  document.body.appendChild(results);
  let resultsFor: number | null = null;
  const $t = (q: string) => top.querySelector(q) as HTMLElement;
  const time = $t('.time');
  const lap = $t('.lap');
  const cp = $t('.cp');
  const delta = $t('.delta');
  const last = $t('.last');
  const best = $t('.best');
  const seedEl = $t('.seed');
  const total = $t('.total');
  const $ = (s: string) => el.querySelector(s) as HTMLElement;
  const speed = $('.speed');
  const bar = $('.bar i');
  const fa = $('.fa');
  const cam = $('.cam');
  const cruise = $('.cruise');
  const hint = $('.hint');

  return {
    /** the widget roots, for the HUD layout editor */
    elements: { speed: el, timer: top, standings: board },
    update(ship: ShipState, info: { assist: boolean; cam: string; cruise: number; hint: string; race: RaceHud | null; again: string }) {
      const r = info.race;
      top.hidden = !r;
      if (!r) resultsFor = null;
      if (r) {
        time.textContent = r.finished ? formatTime(r.finishTime) : r.started ? formatTime(r.lapTime) : 'cross the line';
        lap.textContent = r.finished ? 'FINISHED' : r.started ? lapLabel(r.lap, r.laps) : '';
        cp.textContent = r.started && !r.finished ? `CP ${r.checkpoint}/${r.checkpoints}` : '';
        delta.textContent = r.delta === null ? '' : `${r.delta < 0 ? '−' : '+'}${Math.abs(r.delta).toFixed(2)}`;
        delta.className = `delta ${r.delta !== null && r.delta < 0 ? 'ahead' : 'behind'}`;
        last.textContent = `LAST ${formatTime(r.lastLap)}`;
        best.textContent = `BEST ${formatTime(r.bestLap)}`;
        seedEl.textContent = `SEED ${r.seed}`;
        total.textContent = r.laps > 0 && r.started && !r.finished ? `TOTAL ${formatTime(r.raceTime)}` : '';
      }
      const st = r?.standings ?? null;
      board.hidden = !st;
      if (st) {
        boardPos.innerHTML = `<b>${st.position}</b>/${st.of}`;
        // rebuild the list only when the order changes; gaps update in place
        const key = st.rivals.map((s) => s.name).join('|') + st.position;
        if (key !== boardKey) {
          boardKey = key;
          const you = '<li class="you"><span>YOU</span><i></i></li>';
          const rows = st.rivals.map((s) => `<li><span>${esc(s.name)}</span><i></i></li>`);
          rows.splice(st.position - 1, 0, you);
          boardList.innerHTML = rows.join('');
        }
        let k = 0;
        for (const li of boardList.children) {
          if (li.classList.contains('you')) continue;
          const g = st.rivals[k++].gap;
          const i = li.querySelector('i') as HTMLElement;
          i.textContent = formatGap(g);
          i.className = g < 0 ? 'ahead' : 'behind';
        }
      }
      const done = !!r?.finished;
      results.hidden = !done;
      if (r && done && resultsFor !== r.finishTime) {
        resultsFor = r.finishTime;
        const bestI = r.lapTimes.indexOf(Math.min(...r.lapTimes));
        const laps = r.lapTimes.map((t, i) => `<li${i === bestI ? ' class="best"' : ''}><span>LAP ${i + 1}</span><span>${formatTime(t)}</span></li>`).join('');
        const order = [{ name: 'YOU', time: r.finishTime ?? 0, you: true }, ...r.rivalTimes.map((x) => ({ ...x, you: false }))].sort((a, b) => a.time - b.time);
        const place = order.findIndex((x) => x.you) + 1;
        results.innerHTML = `
          <h2>${order.length > 1 ? `${ordinal(place)} of ${order.length}` : 'Finished'}</h2>
          <div class="total">${formatTime(r.finishTime)}</div>
          <ol class="laps">${laps}</ol>
          ${order.length > 1 ? `<ol class="order">${order.map((x) => `<li${x.you ? ' class="you"' : ''}><span>${esc(x.name)}</span><span>${formatTime(x.time)}</span></li>`).join('')}</ol>` : ''}
          <p class="again"></p>`;
      }
      if (done) (results.querySelector('.again') as HTMLElement).textContent = info.again;
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
