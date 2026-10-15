export interface Curve {
  /** inputs with |x| below this read as 0; the rest is rescaled to start at 0 */
  deadzone: number;
  /** 1 = linear, >1 = finer control near centre */
  expo: number;
  sensitivity: number;
}

/** Response curve for one axis: deadzone → exponent → sensitivity, clamped to [-1, 1]. */
export function applyCurve(x: number, c: Curve): number {
  const mag = Math.min(Math.abs(x), 1);
  const dz = Math.min(Math.max(c.deadzone, 0), 0.99);
  if (mag <= dz) return 0;
  const shaped = Math.pow((mag - dz) / (1 - dz), Math.max(c.expo, 0.01)) * c.sensitivity;
  return Math.sign(x) * Math.min(shaped, 1);
}
