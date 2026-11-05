import { Matrix4, Quaternion, Vector3 } from 'three';
import { rng } from '../core/rng';
import { Corridor } from './scenery';
import { sectionAt } from './sections';
import type { Track } from './track';

/**
 * Giant screens beside the track, like the big displays at a stadium. Each stands off to one side
 * of the corridor, a little ahead of where it is seen from, turned to face the ship coming at it.
 */
export interface ScreenParams {
  seed: number;
  count: number;
  /** screen width, m (16:9) */
  width: number;
  /** props keep this many tube radii from the centreline (as for scenery) */
  clearance: number;
}

export interface Screen {
  pos: Vector3;
  quat: Quaternion;
  width: number;
  height: number;
  /** main-track arc length it is seen from */
  s: number;
}

const _m = new Matrix4();
const _x = new Vector3();
const _y = new Vector3();
const _z = new Vector3();

/** Check balls covering a screen's panel, for the corridor test. */
export function screenBalls(sc: Screen): { c: Vector3; r: number }[] {
  const r = sc.height / 2;
  const n = Math.max(1, Math.ceil(sc.width / sc.height));
  _x.set(1, 0, 0).applyQuaternion(sc.quat);
  const out: { c: Vector3; r: number }[] = [];
  for (let k = 0; k <= n; k++) out.push({ c: sc.pos.clone().addScaledVector(_x, -sc.width / 2 + (sc.width * k) / n), r: r * 1.05 });
  return out;
}

/** Screens spread evenly round the lap, kept clear of every corridor and out of shaped tunnels. */
export function placeScreens(track: Track, p: ScreenParams): Screen[] {
  if (p.count <= 0) return [];
  const rand = rng(p.seed * 131 + 3);
  const corridor = new Corridor(track);
  const R = track.radius;
  const L = track.length;
  const n = track.pos.length;
  const width = p.width;
  const height = (width * 9) / 16;
  // shaped tunnels would hide them (branches are fine: the corridor test keeps clear of them)
  const busy = (s: number) => {
    const sec = sectionAt(track, s);
    return !!sec && sec.kind !== 'open';
  };
  const out: Screen[] = [];
  for (let k = 0; k < p.count; k++) {
    for (let attempt = 0; attempt < 16; attempt++) {
      // seen from s, standing a few hundred metres further on
      const s = ((k + 0.25 + rand() * 0.5) / p.count) * L;
      const ahead = 250 + rand() * 250;
      const sAt = (s + ahead) % L;
      if (busy(s) || busy(sAt)) continue;
      const i = Math.min(n - 1, Math.floor((sAt / L) * n));
      const side = rand() < 0.5 ? -1 : 1;
      const lift = (rand() * 2 - 1) * 0.6;
      const out0 = R * p.clearance + width * 0.6 + rand() * width * 0.5;
      const dir = _y.copy(track.right[i]).multiplyScalar(side).addScaledVector(track.up[i], lift).normalize();
      const pos = track.pos[i].clone().addScaledVector(dir, out0).addScaledVector(track.up[i], height * 0.3);
      // face the point it is seen from, kept upright to the track there
      const j = Math.min(n - 1, Math.floor((s / L) * n));
      _z.subVectors(track.pos[j], pos).normalize();
      _x.crossVectors(track.up[i], _z);
      if (_x.lengthSq() < 1e-6) continue;
      _x.normalize();
      _y.crossVectors(_z, _x);
      const quat = new Quaternion().setFromRotationMatrix(_m.makeBasis(_x, _y, _z));
      const sc: Screen = { pos, quat, width, height, s };
      if (screenBalls(sc).every((b) => corridor.isClear(b.c, b.r, p.clearance))) {
        out.push(sc);
        break;
      }
    }
  }
  return out;
}

