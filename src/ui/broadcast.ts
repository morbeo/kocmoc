import { formatGap, formatTime, lapLabel, type RaceHud } from './hud';

/** The lower third on the giant screens: place, lap, the gap that matters and the clock. */
export interface Broadcast {
  /** "P2/4", or "LIVE" without rivals */
  tag: string;
  lap: string;
  /** "−0.84 BEST": to the rival just ahead, or your lead over the one behind; '' without rivals */
  gap: string;
  time: string;
}

type Info = Pick<RaceHud, 'lap' | 'laps' | 'started' | 'finished' | 'raceTime' | 'lapTime' | 'finishTime' | 'standings'>;

export function broadcast(r: Info | null): Broadcast | null {
  if (!r || !r.started) return null;
  const st = r.standings;
  let gap = '';
  if (st?.rivals.length) {
    // rivals are sorted front first; the one just ahead is the last with a negative gap
    const ahead = st.rivals.filter((x) => x.gap < 0);
    const near = ahead.length ? ahead[ahead.length - 1] : st.rivals[0];
    // the rival's gap is their time minus yours; from your side it flips
    gap = `${formatGap(-near.gap)} ${near.name.toUpperCase()}`;
  }
  const time = r.finished ? (r.finishTime ?? r.raceTime) : r.laps > 0 ? r.raceTime : r.lapTime;
  return {
    tag: st ? `P${st.position}/${st.of}` : 'LIVE',
    lap: r.finished ? 'FINISH' : lapLabel(r.lap, r.laps),
    gap,
    time: formatTime(time),
  };
}

/** Draw the lower third onto a transparent 16:9 canvas (cleared first). */
export function drawBroadcast(ctx: CanvasRenderingContext2D, b: Broadcast | null, accent: string): void {
  const { width: w, height: h } = ctx.canvas;
  ctx.clearRect(0, 0, w, h);
  if (!b) return;
  const bar = h * 0.14;
  const y = h - bar - h * 0.06;
  const x = w * 0.04;
  ctx.font = `700 ${Math.round(bar * 0.62)}px system-ui, sans-serif`;
  ctx.textBaseline = 'middle';
  const cells = [b.tag, b.lap, b.gap, b.time].filter(Boolean);
  const pad = bar * 0.35;
  const widths = cells.map((c) => ctx.measureText(c).width + pad * 2);
  let cx = x;
  cells.forEach((c, k) => {
    // the place sits on the accent colour, the rest on a light panel
    ctx.fillStyle = k === 0 ? accent : 'rgba(250, 250, 252, 0.92)';
    ctx.fillRect(cx, y, widths[k], bar);
    ctx.fillStyle = k === 0 ? '#ffffff' : '#1a1a24';
    ctx.fillText(c, cx + pad, y + bar / 2);
    cx += widths[k] + bar * 0.12;
  });
}
