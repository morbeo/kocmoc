/**
 * Fixed-timestep accumulator. The sim always advances in whole `step` increments,
 * so it is deterministic regardless of frame rate; rendering interpolates between
 * the last two sim states using the returned alpha.
 */
export class FixedLoop {
  private acc = 0;
  /** total sim time advanced, in seconds */
  time = 0;
  /** sim steps run since creation */
  ticks = 0;

  constructor(
    public step: number,
    /** cap on steps per frame, so a long stall can't snowball (spiral of death) */
    public maxSteps = 8,
  ) {}

  /** Advance by `dt` seconds of sim time, calling `tick(step)` 0..maxSteps times. Returns interpolation alpha in [0, 1). */
  advance(dt: number, tick: (step: number) => void): number {
    this.acc += Math.max(0, dt);
    let n = 0;
    while (this.acc >= this.step && n < this.maxSteps) {
      tick(this.step);
      this.acc -= this.step;
      this.time += this.step;
      this.ticks++;
      n++;
    }
    // dropped time after hitting the cap: slow down rather than spiral
    if (n === this.maxSteps && this.acc >= this.step) this.acc = this.acc % this.step;
    return this.acc / this.step;
  }
}
