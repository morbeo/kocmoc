import './replay.css';

export interface ReplayBarHandlers {
  toggle(): void;
  seek(tick: number): void;
  speed(x: number): void;
  save(): void;
  exit(): void;
}

/** Bottom bar shown while a recording plays: play/pause, scrub, speed, save, exit. */
export function createReplayBar(h: ReplayBarHandlers) {
  const el = document.createElement('div');
  el.id = 'replay-bar';
  el.hidden = true;
  el.innerHTML = `
    <button class="play" title="Play / pause (B)">⏸</button>
    <input class="scrub" type="range" min="0" max="1" step="1" value="0" />
    <span class="time">0.00 s</span>
    <select class="speed" title="Playback speed">
      <option value="0.25">¼×</option><option value="0.5">½×</option><option value="1" selected>1×</option><option value="2">2×</option><option value="4">4×</option>
    </select>
    <button class="save" title="Download this run as a bug-repro bundle">save repro</button>
    <button class="exit" title="Back to flying">exit replay</button>`;
  document.body.appendChild(el);
  const $ = <T extends HTMLElement>(q: string) => el.querySelector(q) as T;
  const play = $<HTMLButtonElement>('.play');
  const scrub = $<HTMLInputElement>('.scrub');
  const time = $<HTMLSpanElement>('.time');
  const speed = $<HTMLSelectElement>('.speed');
  let dragging = false;
  const blur = (e: Event) => (e.currentTarget as HTMLElement).blur();
  play.addEventListener('click', (e) => {
    blur(e);
    h.toggle();
  });
  scrub.addEventListener('pointerdown', () => (dragging = true));
  scrub.addEventListener('pointerup', () => (dragging = false));
  scrub.addEventListener('input', () => h.seek(Number(scrub.value)));
  speed.addEventListener('change', (e) => {
    blur(e);
    h.speed(Number(speed.value));
  });
  $('.save').addEventListener('click', (e) => {
    blur(e);
    h.save();
  });
  $('.exit').addEventListener('click', (e) => {
    blur(e);
    h.exit();
  });

  return {
    el,
    update(s: { active: boolean; playing: boolean; tick: number; ticks: number; step: number }) {
      el.hidden = !s.active;
      if (!s.active) return;
      play.textContent = s.playing ? '⏸' : '⏵';
      scrub.max = String(s.ticks);
      if (!dragging) scrub.value = String(s.tick);
      time.textContent = `${(s.tick * s.step).toFixed(2)} / ${(s.ticks * s.step).toFixed(2)} s`;
    },
  };
}
