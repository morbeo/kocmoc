import { AXES, curveOf, debug, type Axis } from '../input/input';
import { applyCurve } from '../input/curve';
import { vars } from '../core/vars';

// raw device → combined action → curved axis, for every axis, plus the virtual stick and the curves themselves
const W = 380;
const H = 250;
const C = {
  bg: 'rgba(255, 255, 255, 0.9)',
  fg: '#1d1b26',
  dim: '#8a879a',
  grid: '#dcdae4',
  keys: '#2f7de1',
  pointer: '#1aa36f',
  out: '#e0217f',
};

const canvas = document.createElement('canvas');
canvas.id = 'input-viz';
canvas.width = W * devicePixelRatio;
canvas.height = H * devicePixelRatio;
Object.assign(canvas.style, {
  position: 'fixed',
  left: '8px',
  bottom: '8px',
  width: `${W}px`,
  height: `${H}px`,
  borderRadius: '6px',
  pointerEvents: 'none',
  zIndex: '900',
});
const ctx = canvas.getContext('2d')!;
ctx.scale(devicePixelRatio, devicePixelRatio);

function bar(x: number, y: number, w: number, h: number, v: number, color: string): void {
  const mid = x + w / 2;
  ctx.fillStyle = color;
  ctx.fillRect(Math.min(mid, mid + (v * w) / 2), y, Math.abs((v * w) / 2), h);
}

function curvePlot(x: number, y: number, s: number, label: string, axes: Axis[]): void {
  ctx.strokeStyle = C.grid;
  ctx.strokeRect(x, y, s, s);
  ctx.beginPath();
  ctx.moveTo(x + s / 2, y);
  ctx.lineTo(x + s / 2, y + s);
  ctx.moveTo(x, y + s / 2);
  ctx.lineTo(x + s, y + s / 2);
  ctx.stroke();
  const c = curveOf(axes[0]);
  ctx.strokeStyle = C.fg;
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) {
    const inp = i / 20 - 1;
    const px = x + ((inp + 1) / 2) * s;
    const py = y + ((1 - applyCurve(inp, c)) / 2) * s;
    if (i) ctx.lineTo(px, py);
    else ctx.moveTo(px, py);
  }
  ctx.stroke();
  ctx.fillStyle = C.out;
  for (const a of axes) {
    if (debug.raw[a] === 0) continue;
    ctx.beginPath();
    ctx.arc(x + ((debug.raw[a] + 1) / 2) * s, y + ((1 - debug.curved[a]) / 2) * s, 3, 0, 7);
    ctx.fill();
  }
  ctx.fillStyle = C.dim;
  ctx.fillText(label, x + 2, y + s + 11);
}

function draw(): void {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.font = '10px ui-monospace, Menlo, monospace';
  ctx.lineWidth = 1;

  // virtual stick
  const mode = vars.get('input.pointer.mode')?.value;
  const radius = Number(vars.get('input.stick.radius')?.value ?? 200);
  const cx = 55;
  const cy = 62;
  const r = 44;
  ctx.strokeStyle = C.grid;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 7);
  ctx.stroke();
  ctx.fillStyle = debug.captured ? C.pointer : C.dim;
  ctx.beginPath();
  ctx.arc(cx + (debug.stick.x / radius) * r, cy + (debug.stick.y / radius) * r, 4, 0, 7);
  ctx.fill();
  ctx.fillStyle = C.fg;
  ctx.fillText(`pointer: ${mode}`, 10, 122);
  ctx.fillStyle = C.dim;
  ctx.fillText(debug.captured ? 'captured (Esc frees)' : 'not captured', 10, 134);
  ctx.fillText(`boost ${debug.boost ? 'ON' : 'off'}  cruise ${Math.round(debug.cruise * 100)}%`, 10, 146);

  // per-axis stages: keys, pointer, curved output (outline = combined raw)
  const bx = 160;
  const bw = 150;
  AXES.forEach((a, i) => {
    const y = 12 + i * 22;
    ctx.fillStyle = C.fg;
    ctx.fillText(a, 112, y + 9);
    ctx.fillStyle = C.grid;
    ctx.fillRect(bx + bw / 2, y - 1, 1, 15);
    bar(bx, y, bw, 3, debug.keys[a], C.keys);
    bar(bx, y + 4, bw, 3, debug.pointer[a], C.pointer);
    bar(bx, y + 8, bw, 5, debug.curved[a], C.out);
    ctx.strokeStyle = C.fg;
    const rx = bx + bw / 2 + (debug.raw[a] * bw) / 2;
    ctx.beginPath();
    ctx.moveTo(rx, y + 7);
    ctx.lineTo(rx, y + 14);
    ctx.stroke();
    ctx.fillStyle = C.dim;
    ctx.fillText(debug.curved[a].toFixed(2), bx + bw + 6, y + 10);
  });
  ctx.fillStyle = C.keys;
  ctx.fillText('keys', 160, 146);
  ctx.fillStyle = C.pointer;
  ctx.fillText('pointer', 192, 146);
  ctx.fillStyle = C.out;
  ctx.fillText('curved', 242, 146);
  ctx.fillStyle = C.fg;
  ctx.fillText('| raw', 286, 146);

  // response curves
  const s = 72;
  curvePlot(12, 160, s, 'pitch', ['pitch']);
  curvePlot(104, 160, s, 'yaw', ['yaw']);
  curvePlot(196, 160, s, 'roll', ['roll']);
  curvePlot(288, 160, s, 'move', ['strafe', 'lift', 'thrust']);
}

let raf = 0;
const loop = () => {
  draw();
  raf = requestAnimationFrame(loop);
};

export function show(on: boolean): void {
  if (on) {
    document.body.appendChild(canvas);
    if (!raf) loop();
  } else {
    canvas.remove();
    cancelAnimationFrame(raf);
    raf = 0;
  }
}
