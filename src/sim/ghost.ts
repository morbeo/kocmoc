import type { Quaternion, Vector3 } from 'three';
import type { RaceState } from './race';
import type { ShipState } from './ship';

/** A lap as a pose track: position + orientation sampled at a fixed rate from the start line. */
export interface Ghost {
  /** lap time, s */
  lap: number;
  /** seconds between samples */
  every: number;
  /** flat [x, y, z, qx, qy, qz, qw] per sample */
  samples: number[];
}

const STRIDE = 7;
const r2 = (v: number) => Math.round(v * 100) / 100;
const r4 = (v: number) => Math.round(v * 1e4) / 1e4;

/** Samples the current lap; hands back the finished lap as a ghost when the line is crossed. */
export class GhostRecorder {
  private buf: number[] = [];
  private lap = 0;
  private nextT = 0;

  constructor(readonly every = 1 / 30) {}

  reset(): void {
    this.buf = [];
    this.lap = 0;
    this.nextT = 0;
  }

  /** Call after every sim step. Returns the lap just finished, if any. */
  update(r: RaceState, ship: ShipState): Ghost | null {
    if (!r.started) {
      this.reset();
      return null;
    }
    let done: Ghost | null = null;
    if (r.lap !== this.lap) {
      if (this.lap !== 0 && r.lastLap !== null && this.buf.length) done = { lap: r.lastLap, every: this.every, samples: this.buf };
      this.buf = [];
      this.lap = r.lap;
      this.nextT = 0;
    }
    if (r.lapTime >= this.nextT) {
      const p = ship.pos;
      const q = ship.quat;
      this.buf.push(r2(p.x), r2(p.y), r2(p.z), r4(q.x), r4(q.y), r4(q.z), r4(q.w));
      this.nextT += this.every;
    }
    return done;
  }
}

/** Pose at lap time `t`; false once the ghost has finished its lap. */
export function sampleGhost(g: Ghost, t: number, pos: Vector3, quat: Quaternion): boolean {
  const n = g.samples.length / STRIDE;
  if (n === 0 || t < 0) return false;
  const f = t / g.every;
  const i = Math.floor(f);
  if (i >= n - 1) return false;
  const k = f - i;
  const a = i * STRIDE;
  const b = a + STRIDE;
  const s = g.samples;
  pos.set(s[a] + (s[b] - s[a]) * k, s[a + 1] + (s[b + 1] - s[a + 1]) * k, s[a + 2] + (s[b + 2] - s[a + 2]) * k);
  quat.set(s[a + 3], s[a + 4], s[a + 5], s[a + 6]);
  const qa = quat.clone();
  quat.set(s[b + 3], s[b + 4], s[b + 5], s[b + 6]);
  quat.slerpQuaternions(qa.normalize(), quat.normalize(), k);
  return true;
}

export function parseGhost(raw: unknown): Ghost | null {
  if (!raw || typeof raw !== 'object') return null;
  const g = raw as Record<string, unknown>;
  if (typeof g.lap !== 'number' || typeof g.every !== 'number' || !Array.isArray(g.samples)) return null;
  if (g.samples.length % STRIDE !== 0 || !g.samples.every(Number.isFinite)) return null;
  return { lap: g.lap, every: g.every, samples: g.samples as number[] };
}
