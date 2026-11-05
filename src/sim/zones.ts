import { Vector3 } from 'three';
import type { ShipState } from './ship';
import type { Nearest, Track } from '../gen/track';
import { inPad, type Pad, type PadKind } from '../gen/pads';
import { moverPose, type Mover, type MoverPose } from '../gen/movers';
import { arcDelta } from './gauntlet';

export interface PadEffect {
  /** forward push over a boost strip, m/s² */
  accel: number;
  /** boost strips push up to this speed, m/s */
  speed: number;
  /** drag inside a slow field, 1/s */
  drag: number;
}

/** Which pad the ship is in after this step (-1 = none), for entry events. */
export interface ZoneState {
  pad: number;
}

/**
 * Apply boost strips and slow fields to a ship on the main loop. Returns the kind of pad just
 * entered, or null.
 */
export function stepPads(pads: Pad[], ship: ShipState, track: Track, near: Nearest, fx: PadEffect, dt: number, st: ZoneState): PadKind | null {
  const i = near.index;
  const R = track.radius;
  _off.subVectors(ship.pos, near.point);
  const x = _off.dot(track.right[i]);
  const y = _off.dot(track.up[i]);
  let hit = -1;
  for (let k = 0; k < pads.length; k++) {
    const p = pads[k];
    if (near.s < p.s0 || near.s > p.s1) continue;
    if (inPad(p, x, y, R)) {
      hit = k;
      break;
    }
  }
  const was = st.pad;
  st.pad = hit;
  if (hit < 0) return null;
  const p = pads[hit];
  if (p.kind === 'boost') {
    const tan = track.tan[i];
    const v = ship.vel.dot(tan);
    if (v < fx.speed) ship.vel.addScaledVector(tan, Math.min(fx.accel * dt, fx.speed - v));
  } else ship.vel.multiplyScalar(Math.exp(-fx.drag * dt));
  return was !== hit ? p.kind : null;
}

const _off = new Vector3();
const _n = new Vector3();
const _pose: MoverPose = { x: 0, y: 0, vx: 0, vy: 0, active: true };

/**
 * Collide the ship with the cavern movers: push it out of a slab or rock and bounce it off the
 * object's moving surface. Returns the into-object speed of the hardest contact (0 = none).
 */
export function collideMovers(movers: Mover[], ship: ShipState, track: Track, near: Nearest, time: number, shipRadius: number, bounce: number): number {
  const i = near.index;
  const right = track.right[i];
  const up = track.up[i];
  const tan = track.tan[i];
  let impact = 0;
  for (const m of movers) {
    const ds = arcDelta(near.s, m.s, track.length);
    const reachAlong = m.kind === 'slab' ? m.hl : m.r;
    if (Math.abs(ds) > reachAlong + shipRadius) continue;
    const pose = moverPose(m, time, _pose);
    if (!pose.active) continue;
    _off.subVectors(ship.pos, near.point);
    const x = _off.dot(right) - pose.x;
    const y = _off.dot(up) - pose.y;
    let nx: number, ny: number, nz: number, pen: number;
    if (m.kind === 'rock') {
      const d = Math.hypot(x, y, ds);
      pen = m.r + shipRadius - d;
      if (pen <= 0) continue;
      const inv = d > 1e-6 ? 1 / d : 0;
      [nx, ny, nz] = d > 1e-6 ? [x * inv, y * inv, ds * inv] : [0, -1, 0];
    } else {
      // into the slab's frame: u along a, w across, z along the track
      const c = Math.cos(m.a);
      const s = Math.sin(m.a);
      const u = x * c + y * s;
      const w = -x * s + y * c;
      const cu = Math.max(-m.hw, Math.min(m.hw, u));
      const cw = Math.max(-m.ht, Math.min(m.ht, w));
      const cz = Math.max(-m.hl, Math.min(m.hl, ds));
      let du = u - cu;
      let dw = w - cw;
      let dz = ds - cz;
      let d = Math.hypot(du, dw, dz);
      if (d < 1e-6) {
        // centre inside the box: out through the nearest face
        const fu = m.hw - Math.abs(u);
        const fw = m.ht - Math.abs(w);
        const fz = m.hl - Math.abs(ds);
        if (fw <= fu && fw <= fz) [du, dw, dz, d] = [0, Math.sign(w) || 1, 0, -fw];
        else if (fu <= fz) [du, dw, dz, d] = [Math.sign(u) || 1, 0, 0, -fu];
        else [du, dw, dz, d] = [0, 0, Math.sign(ds) || 1, -fz];
        pen = shipRadius - d;
      } else {
        pen = shipRadius - d;
        du /= d;
        dw /= d;
        dz /= d;
      }
      if (pen <= 0) continue;
      nx = du * c - dw * s;
      ny = du * s + dw * c;
      nz = dz;
    }
    _n.copy(right).multiplyScalar(nx).addScaledVector(up, ny).addScaledVector(tan, nz);
    ship.pos.addScaledVector(_n, pen);
    // bounce off the surface as it moves: relative velocity along the normal
    const vm = pose.vx * nx + pose.vy * ny;
    const vn = ship.vel.dot(_n) - vm;
    if (vn < 0) {
      ship.vel.addScaledVector(_n, -(1 + bounce) * vn);
      impact = Math.max(impact, -vn);
    }
  }
  return impact;
}
