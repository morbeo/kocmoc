/** Pure building blocks for game-feel effects. Everything here is frame-rate independent. */

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** Screen-shake trauma (Squirrel Eiserloh): hits add trauma, it decays linearly, shake = trauma². */
export class Trauma {
  value = 0;
  add(amount: number): void {
    this.value = clamp(this.value + amount, 0, 1);
  }
  step(dt: number, decay: number): void {
    this.value = Math.max(0, this.value - decay * dt);
  }
  get shake(): number {
    return this.value * this.value;
  }
}

/** Smooth noise in [-1, 1]: a few incommensurate sines, so shake is continuous and repeatable. */
export function shakeNoise(t: number, freq: number, seed: number): number {
  const w = Math.PI * 2 * freq;
  return (
    0.5 * Math.sin(w * t + seed * 1.7) +
    0.3 * Math.sin(w * 2.31 * t + seed * 4.3) +
    0.2 * Math.sin(w * 4.67 * t + seed * 9.1)
  );
}

export interface Spring {
  x: number;
  v: number;
}

/**
 * Damped spring towards `target`. `freq` in Hz, `damping` ratio: < 1 overshoots, 1 is critical.
 * Semi-implicit Euler, sub-stepped so a slow frame can't blow it up.
 */
export function springStep(s: Spring, target: number, freq: number, damping: number, dt: number): void {
  const w = Math.PI * 2 * freq;
  const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
  const h = dt / steps;
  for (let i = 0; i < steps; i++) {
    s.v += (w * w * (target - s.x) - 2 * damping * w * s.v) * h;
    s.x += s.v * h;
  }
}

/** Hit-stop (a short freeze) and slow-motion that eases back to normal speed. */
export class TimeWarp {
  private hold = 0;
  private slowFrom = 1;
  private slowLeft = 0;
  private slowDur = 0;

  hitStop(seconds: number): void {
    this.hold = Math.max(this.hold, seconds);
  }
  slowMo(scale: number, seconds: number): void {
    if (seconds <= 0) return;
    this.slowFrom = Math.min(this.current(), clamp(scale, 0, 1));
    this.slowDur = seconds;
    this.slowLeft = seconds;
  }
  /** Current time scale, without advancing. */
  current(): number {
    if (this.hold > 0) return 0;
    if (this.slowLeft <= 0) return 1;
    const k = 1 - this.slowLeft / this.slowDur; // 0 → 1 over the slow-mo
    return this.slowFrom + (1 - this.slowFrom) * k * k;
  }
  /** Advance by real (wall-clock) time and return the scale for this frame. */
  step(realDt: number): number {
    const s = this.current();
    if (this.hold > 0) this.hold = Math.max(0, this.hold - realDt);
    else if (this.slowLeft > 0) this.slowLeft = this.slowLeft - realDt > 1e-9 ? this.slowLeft - realDt : 0;
    return s;
  }
}

/** Extra field of view in degrees: grows with speed above `from` (fraction of max), plus a boost kick. */
export function fovKick(speed: number, maxSpeed: number, boost: number, p: { speed: number; boost: number; from: number }): number {
  const f = clamp((speed / Math.max(maxSpeed, 1e-6) - p.from) / Math.max(1 - p.from, 1e-6), 0, 1.5);
  return p.speed * f + p.boost * clamp(boost, 0, 1);
}

/** Visual bank angle (rad) for a yaw rate: roll into the turn, clamped. */
export function bankAngle(yawRate: number, gain: number, max: number): number {
  return clamp(-yawRate * gain, -max, max);
}

/** Fixed-size particle pool (positions, velocities, remaining life). */
export class Particles {
  readonly pos: Float32Array;
  readonly vel: Float32Array;
  readonly life: Float32Array;
  readonly maxLife: Float32Array;
  private next = 0;

  constructor(readonly capacity: number) {
    this.pos = new Float32Array(capacity * 3);
    this.vel = new Float32Array(capacity * 3);
    this.life = new Float32Array(capacity);
    this.maxLife = new Float32Array(capacity);
  }

  /** Overwrites the oldest slot when full. */
  emit(px: number, py: number, pz: number, vx: number, vy: number, vz: number, life: number): void {
    const i = this.next;
    this.next = (this.next + 1) % this.capacity;
    this.pos.set([px, py, pz], i * 3);
    this.vel.set([vx, vy, vz], i * 3);
    this.life[i] = life;
    this.maxLife[i] = life;
  }

  step(dt: number, drag: number): void {
    const k = Math.exp(-drag * dt);
    for (let i = 0; i < this.capacity; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] = Math.max(0, this.life[i] - dt);
      for (let a = 0; a < 3; a++) {
        this.vel[i * 3 + a] *= k;
        this.pos[i * 3 + a] += this.vel[i * 3 + a] * dt;
      }
    }
  }

  get alive(): number {
    let n = 0;
    for (let i = 0; i < this.capacity; i++) if (this.life[i] > 0) n++;
    return n;
  }
}
