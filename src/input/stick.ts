/** Virtual stick: relative pointer motion moves a cursor inside a circle; its offset is the turn command. */
export interface Stick {
  x: number;
  y: number;
}

/** Add pointer movement (px), keeping the cursor inside `radius`. */
export function moveStick(s: Stick, dx: number, dy: number, radius: number): void {
  s.x += dx;
  s.y += dy;
  const len = Math.hypot(s.x, s.y);
  if (len > radius) {
    s.x *= radius / len;
    s.y *= radius / len;
  }
}

/** Pull the cursor back towards the centre at `rate` (1/s); 0 = stays where it is. */
export function recenterStick(s: Stick, rate: number, dt: number): void {
  const k = Math.exp(-Math.max(rate, 0) * dt);
  s.x *= k;
  s.y *= k;
}

/** Normalised axes in [-1, 1]: x = yaw right, y = pitch up (pointer up). */
export function stickAxes(s: Stick, radius: number): { yaw: number; pitch: number } {
  return radius > 0 ? { yaw: s.x / radius, pitch: -s.y / radius } : { yaw: 0, pitch: 0 };
}

/** Move `value` towards `target` by at most `rate * dt` (keyboard axis ramp). `rate` 0 = instant. */
export function ramp(value: number, target: number, rate: number, dt: number): number {
  if (rate <= 0) return target;
  const d = target - value;
  const max = rate * dt;
  return Math.abs(d) <= max ? target : value + Math.sign(d) * max;
}
