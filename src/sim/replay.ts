import type { Controls } from './ship';
import type { Spawn } from './world';
import type { LayersState } from '../core/vars';

/**
 * A run is reproducible from: the var layers (which fix ship, track and gauntlet), the spawn,
 * the fixed step, and the controls of every tick. Controls are quantised *before* the live sim
 * uses them, so the recording replays bit-for-bit.
 */
export interface Recording {
  version: 1;
  /** var layers when the run started (defaults are code, so a bundle names the commit too) */
  layers: LayersState;
  spawn: Spawn;
  /** fixed step, s */
  step: number;
  /** run-length encoded controls: [count, pitch, yaw, roll, strafe, lift, thrust, boost] in 1/Q units */
  inputs: number[][];
  ticks: number;
  /** free text, e.g. what went wrong */
  note?: string;
  /** build id, for bug reports */
  build?: string;
}

const Q = 1024;
const AXES = ['pitch', 'yaw', 'roll', 'strafe', 'lift', 'thrust'] as const;

/** Round each axis to 1/1024 so it survives JSON exactly. Mutates and returns `c`. */
export function quantize(c: Controls): Controls {
  for (const a of AXES) c[a] = Math.round(c[a] * Q) / Q;
  return c;
}

export class Recorder {
  private runs: number[][] = [];
  private last: number[] | null = null;
  ticks = 0;

  constructor(
    readonly layers: LayersState,
    readonly spawn: Spawn,
    readonly step: number,
  ) {}

  /** Record one tick's (already quantised) controls. */
  push(c: Controls): void {
    const row = [...AXES.map((a) => Math.round(c[a] * Q)), c.boost ? 1 : 0];
    const l = this.last;
    if (l && row.every((v, i) => v === l[i + 1])) l[0]++;
    else {
      this.last = [1, ...row];
      this.runs.push(this.last);
    }
    this.ticks++;
  }

  finish(extra: Partial<Recording> = {}): Recording {
    return {
      version: 1,
      layers: JSON.parse(JSON.stringify(this.layers)),
      spawn: { ...this.spawn },
      step: this.step,
      inputs: this.runs.map((r) => [...r]),
      ticks: this.ticks,
      ...extra,
    };
  }
}

/** Steps through a recording's controls, tick by tick. */
export class Player {
  private run = 0;
  private left: number;
  tick = 0;

  constructor(readonly rec: Recording) {
    this.left = rec.inputs[0]?.[0] ?? 0;
  }

  get done(): boolean {
    return this.tick >= this.rec.ticks;
  }

  /** Write the next tick's controls into `out`; false when the recording has ended. */
  next(out: Controls): boolean {
    while (this.left <= 0) {
      this.run++;
      if (this.run >= this.rec.inputs.length) return false;
      this.left = this.rec.inputs[this.run][0];
    }
    const r = this.rec.inputs[this.run];
    AXES.forEach((a, i) => (out[a] = r[i + 1] / Q));
    out.boost = r[7] === 1;
    this.left--;
    this.tick++;
    return true;
  }
}

/** Validate untrusted JSON into a Recording. */
export function parseRecording(raw: unknown): Recording | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const r = raw as Record<string, unknown>;
  if (r.version !== 1 || typeof r.step !== 'number' || typeof r.ticks !== 'number') return undefined;
  if (!Array.isArray(r.inputs) || !r.inputs.every((x) => Array.isArray(x) && x.length === 8 && x.every(Number.isFinite))) return undefined;
  const sp = r.spawn as Record<string, unknown> | undefined;
  if (!sp || typeof sp.s !== 'number' || typeof sp.speed !== 'number') return undefined;
  if (!r.layers || typeof r.layers !== 'object') return undefined;
  return {
    version: 1,
    layers: r.layers as LayersState,
    spawn: { s: sp.s, speed: sp.speed },
    step: r.step,
    inputs: r.inputs as number[][],
    ticks: r.ticks,
    note: typeof r.note === 'string' ? r.note : undefined,
    build: typeof r.build === 'string' ? r.build : undefined,
  };
}
