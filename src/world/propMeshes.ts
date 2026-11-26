import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { HORROR_ARMS, LEVIATHAN, limbSamples, TENDRIL, WRECK_BOW, type BuiltKind, type Limb } from '../gen/scenery';

/**
 * Unit meshes for the built scenery kinds: several primitives merged into one geometry, so a kind is
 * still one InstancedMesh (one draw call). Vertex colours carry a shade (1 = body, low = eye sockets,
 * windows, scorch marks) that the instance colour multiplies. The clearance balls in
 * `gen/scenery.ts` (`LOCAL_BALLS`) must cover every vertex; a unit test checks it.
 */

type V3 = readonly [number, number, number];
interface At {
  at?: V3;
  rot?: V3;
  /** instead of `rot` */
  quat?: THREE.Quaternion;
  scale?: V3;
  /** 0..1 brightness of this part */
  shade?: number;
  /** applied after the part's own transform (a sub-assembly) */
  parent?: THREE.Matrix4;
}

const DARK = 0.18;

class Kit {
  private parts: THREE.BufferGeometry[] = [];

  add(geo: THREE.BufferGeometry, { at = [0, 0, 0], rot = [0, 0, 0], quat, scale = [1, 1, 1], shade = 1, parent }: At = {}): this {
    const g = geo.index ? geo.toNonIndexed() : geo;
    if (g !== geo) geo.dispose();
    g.deleteAttribute('uv');
    const m = new THREE.Matrix4().compose(new THREE.Vector3(...at), quat ?? new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)), new THREE.Vector3(...scale));
    if (parent) m.premultiply(parent);
    g.applyMatrix4(m);
    const n = g.getAttribute('position').count;
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3).fill(shade), 3));
    this.parts.push(g);
    return this;
  }

  build(): THREE.BufferGeometry {
    const out = mergeGeometries(this.parts);
    for (const p of this.parts) p.dispose();
    if (!out) throw new Error('kocmoc: prop parts do not merge');
    out.computeBoundingSphere();
    return out;
  }
}

/** a cylinder or cone along local X instead of Y */
const ALONG_X: V3 = [0, 0, -Math.PI / 2];
const ALONG_Z: V3 = [Math.PI / 2, 0, 0];

/** Horned alien skull facing +Z, cranium about a unit across. */
function skull(): THREE.BufferGeometry {
  const k = new Kit()
    .add(new THREE.SphereGeometry(1, 18, 14), { at: [0, 0.25, -0.1], scale: [0.9, 0.85, 1.05] })
    .add(new THREE.SphereGeometry(1, 14, 10), { at: [0, -0.3, 0.4], scale: [0.62, 0.45, 0.55] })
    .add(new THREE.SphereGeometry(1, 14, 8), { at: [0, -0.9, 0.35], scale: [0.6, 0.22, 0.55] })
    .add(new THREE.ConeGeometry(0.12, 0.32, 3), { at: [0, -0.22, 0.93], scale: [1, 1, 0.4], shade: DARK })
    .add(new THREE.BoxGeometry(1, 1, 1), { at: [0, -0.77, 0.62], scale: [0.62, 0.1, 0.3], shade: DARK });
  for (const s of [-1, 1]) {
    k.add(new THREE.SphereGeometry(1, 12, 8), { at: [s * 0.34, 0.02, 0.84], scale: [0.26, 0.22, 0.14], shade: DARK })
      .add(new THREE.SphereGeometry(1, 10, 8), { at: [s * 0.55, -0.18, 0.45], scale: [0.28, 0.16, 0.32] })
      .add(new THREE.ConeGeometry(0.16, 1.1, 8), { at: [s * 0.62, 0.95, -0.35], rot: [-0.7, 0, -s * 0.5] });
  }
  for (let i = -3; i <= 3; i++) {
    const z = 0.86 - 0.012 * i * i;
    k.add(new THREE.BoxGeometry(0.08, 0.16, 0.08), { at: [i * 0.1, -0.68, z] }).add(new THREE.BoxGeometry(0.08, 0.13, 0.08), { at: [i * 0.1, -0.8, z - 0.04] });
  }
  return k.build();
}

/** One vertebra of a spine running along local Z, processes pointing up and sideways. */
function vertebra(): THREE.BufferGeometry {
  const k = new Kit()
    .add(new THREE.CylinderGeometry(0.45, 0.5, 0.55, 12), { rot: ALONG_Z })
    .add(new THREE.CylinderGeometry(0.5, 0.5, 0.1, 12), { at: [0, 0, 0.32], rot: ALONG_Z, shade: 0.55 })
    .add(new THREE.TorusGeometry(0.25, 0.08, 6, 12, Math.PI), { at: [0, 0.45, 0] })
    .add(new THREE.ConeGeometry(0.14, 1.3, 6), { at: [0, 1.25, -0.25], rot: [-0.45, 0, 0] });
  for (const s of [-1, 1]) k.add(new THREE.ConeGeometry(0.1, 0.9, 6), { at: [s * 0.75, 0.25, 0], rot: [0, 0, -s * Math.PI / 2] });
  return k.build();
}

/** A ruined gateway: two legs at x = ±1 on the ground, a broken arch springing from y = 2. */
function arch(): THREE.BufferGeometry {
  const k = new Kit().add(new THREE.TorusGeometry(1, 0.17, 4, 20, 2.5), { at: [0, 2, 0] });
  k.add(new THREE.BoxGeometry(0.4, 0.3, 0.45), { at: [-1.5, 0.15, 0.5], rot: [0, 0.6, 0.3] });
  k.add(new THREE.BoxGeometry(0.3, 0.25, 0.4), { at: [0.6, 0.12, -0.6], rot: [0.4, 1.1, 0.2] });
  for (const s of [-1, 1]) {
    k.add(new THREE.BoxGeometry(0.36, 2, 0.4), { at: [s, 1, 0] })
      .add(new THREE.BoxGeometry(0.5, 0.14, 0.5), { at: [s, 2, 0] })
      .add(new THREE.BoxGeometry(0.55, 0.2, 0.55), { at: [s, 0.1, 0] })
      .add(new THREE.BoxGeometry(0.38, 0.12, 0.42), { at: [s, 1.3, 0], shade: 0.3 });
  }
  return k.build();
}

/** Alien tower standing on y = 0, about 4.5 tall: tapering shaft, rings, a bulb and a spike, fins at the foot. */
function tower(): THREE.BufferGeometry {
  const k = new Kit()
    .add(new THREE.CylinderGeometry(0.18, 0.32, 2.6, 10), { at: [0, 1.3, 0] })
    .add(new THREE.CylinderGeometry(0.1, 0.18, 1.0, 10), { at: [0, 3.1, 0] })
    .add(new THREE.SphereGeometry(0.38, 14, 10), { at: [0, 2.75, 0], scale: [1, 0.8, 1] })
    .add(new THREE.ConeGeometry(0.06, 0.9, 6), { at: [0, 4.05, 0] });
  for (const y of [0.6, 1.4, 2.2]) k.add(new THREE.CylinderGeometry(0.42, 0.42, 0.08, 14), { at: [0, y, 0] });
  // window bands sit just proud of the shaft (radius 0.32 at the foot to 0.18 at y = 2.6)
  for (const y of [1.0, 1.8]) k.add(new THREE.CylinderGeometry(0.3 - 0.054 * y, 0.3 - 0.054 * y, 0.12, 10), { at: [0, y, 0], scale: [1.12, 1, 1.12], shade: 0.25 });
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3;
    k.add(new THREE.BoxGeometry(0.06, 1.1, 0.5), { at: [Math.cos(a) * 0.35, 0.55, Math.sin(a) * 0.35], rot: [0, Math.PI / 2 - a, 0] });
  }
  return k.build();
}

/** A dome of radius 1 on y = 0: window band, mast, a breach in the shell and a small annex. */
function dome(): THREE.BufferGeometry {
  const half = (r: number) => new THREE.SphereGeometry(r, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2);
  return new Kit()
    .add(half(1))
    .add(new THREE.CircleGeometry(1, 24), { rot: [Math.PI / 2, 0, 0] })
    .add(new THREE.TorusGeometry(1, 0.07, 6, 32), { rot: [Math.PI / 2, 0, 0] })
    .add(new THREE.TorusGeometry(0.87, 0.035, 4, 32), { at: [0, 0.5, 0], rot: [Math.PI / 2, 0, 0], shade: DARK })
    .add(new THREE.CylinderGeometry(0.04, 0.07, 0.6, 6), { at: [0, 1.25, 0] })
    .add(new THREE.SphereGeometry(0.09, 8, 6), { at: [0, 1.6, 0] })
    .add(new THREE.SphereGeometry(1, 10, 8), { at: [0.9, 0.42, 0], rot: [0, 0, -0.45], scale: [0.08, 0.3, 0.35], shade: 0.12 })
    .add(half(0.4), { at: [0.95, 0, -0.75] })
    .build();
}

/** A crashed starship two units long, nose at +X: hull broken behind the bow, one wing snapped. */
function wreck(): THREE.BufferGeometry {
  // the bow is a sub-assembly, kinked down and aside at the break
  const bow = WRECK_BOW;
  const k = new Kit()
    .add(new THREE.CylinderGeometry(0.2, 0.22, 1.0, 12), { at: [-0.5, 0, 0], rot: ALONG_X })
    .add(new THREE.CylinderGeometry(0.205, 0.205, 0.04, 12), { at: [-0.01, 0, 0], rot: ALONG_X, shade: 0.15 })
    .add(new THREE.CylinderGeometry(0.12, 0.2, 0.75, 12), { at: [0.375, 0, 0], rot: ALONG_X, parent: bow })
    .add(new THREE.CylinderGeometry(0.2, 0.2, 0.04, 12), { at: [0.01, 0, 0], rot: ALONG_X, parent: bow, shade: 0.15 })
    .add(new THREE.ConeGeometry(0.12, 0.35, 12), { at: [0.925, 0, 0], rot: ALONG_X, parent: bow })
    .add(new THREE.BoxGeometry(0.3, 0.12, 0.16), { at: [-0.45, 0.25, 0] })
    .add(new THREE.BoxGeometry(0.04, 0.05, 0.14), { at: [-0.31, 0.27, 0], shade: 0.15 })
    .add(new THREE.BoxGeometry(0.35, 0.3, 0.03), { at: [-0.85, 0.3, 0], rot: [0, 0, 0.4] })
    // the intact wing, and the snapped one bent down
    .add(new THREE.BoxGeometry(0.55, 0.03, 0.6), { at: [-0.55, -0.05, 0.5], rot: [0, 0.35, 0] })
    .add(new THREE.BoxGeometry(0.45, 0.03, 0.3), { at: [-0.6, -0.12, -0.32], rot: [0.5, -0.3, 0] })
    .add(new THREE.SphereGeometry(1, 10, 6), { at: [-0.3, 0.17, 0.1], scale: [0.15, 0.06, 0.1], shade: 0.12 })
    .add(new THREE.SphereGeometry(1, 10, 6), { at: [0.3, 0.1, -0.06], scale: [0.12, 0.05, 0.08], shade: 0.12, parent: bow });
  for (const s of [-1, 1]) k.add(new THREE.BoxGeometry(0.7, 0.025, 0.02), { at: [-0.5, 0.05, s * 0.21], shade: DARK });
  for (const [y, z] of [[0.1, 0], [-0.08, 0.12], [-0.08, -0.12]] as const) {
    k.add(new THREE.CylinderGeometry(0.08, 0.09, 0.35, 10), { at: [-1.05, y, z], rot: ALONG_X }).add(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 10), {
      at: [-1.23, y, z],
      rot: ALONG_X,
      shade: DARK,
    });
  }
  return k.build();
}

/** A limb's tube, tapered sample by sample (the clearance balls sit on the same samples). */
function limbTube(l: Limb): THREE.BufferGeometry {
  const samples = limbSamples(l);
  const curve = new THREE.CatmullRomCurve3(l.pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  const radial = 8;
  const geo = new THREE.TubeGeometry(curve, l.segs, 1, radial, false);
  const pos = geo.getAttribute('position');
  const v = new THREE.Vector3();
  for (let i = 0; i <= l.segs; i++)
    for (let j = 0; j <= radial; j++) {
      const k = i * (radial + 1) + j;
      const { p, r } = samples[i];
      v.fromBufferAttribute(pos, k).sub(p).multiplyScalar(r).add(p);
      pos.setXYZ(k, v.x, v.y, v.z);
    }
  return geo;
}

/** Dark suckers down one side of a limb, every `step` samples. */
function suckers(k: Kit, l: Limb, from: number, step: number): void {
  const samples = limbSamples(l);
  const curve = new THREE.CatmullRomCurve3(l.pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  const frames = curve.computeFrenetFrames(l.segs, false);
  for (let i = from; i < l.segs - 2; i += step) {
    const { p, r } = samples[i];
    const at = p.clone().addScaledVector(frames.normals[i], r * 0.8);
    k.add(new THREE.SphereGeometry(r * 0.3, 8, 6), { at: [at.x, at.y, at.z], shade: 0.3 });
  }
}

/** Point on a unit sphere from a rough direction. */
const onSphere = (x: number, y: number, z: number, d: number): V3 => {
  const n = Math.hypot(x, y, z);
  return [(x / n) * d, (y / n) * d, (z / n) * d];
};

/** A giant tentacle rising from y = 0, curling over at the top, suckers on its inner side. */
function tendril(): THREE.BufferGeometry {
  const k = new Kit().add(limbTube(TENDRIL));
  suckers(k, TENDRIL, 6, 3);
  return k.build();
}

/** A floating eye-beast: a body of radius 1, one huge slit-pupilled eye at +Z, small eyes, a maw and eight arms. */
function horror(): THREE.BufferGeometry {
  const k = new Kit()
    .add(new THREE.SphereGeometry(1, 24, 16), { shade: 0.55 })
    .add(new THREE.SphereGeometry(0.55, 20, 14), { at: [0, 0.1, 0.62] })
    .add(new THREE.SphereGeometry(0.34, 16, 10), { at: [0, 0.1, 1.06], scale: [1, 1, 0.45], shade: DARK })
    // a pale slit pupil on the dark iris, so it reads from far off
    .add(new THREE.BoxGeometry(0.07, 0.46, 0.06), { at: [0, 0.1, 1.2] })
    .add(new THREE.SphereGeometry(0.4, 14, 8), { at: [0, -0.9, 0], scale: [1, 0.2, 1], shade: DARK });
  for (const [x, y, z] of [[0.6, 0.5, 0.55], [-0.6, 0.5, 0.55], [0.8, -0.05, 0.5], [-0.8, -0.05, 0.5], [0.3, 0.85, 0.2], [-0.3, 0.85, 0.2]] as const) {
    k.add(new THREE.SphereGeometry(0.14, 10, 8), { at: onSphere(x, y, z, 0.92) }).add(new THREE.SphereGeometry(0.07, 8, 6), { at: onSphere(x, y, z, 1.02), shade: DARK });
  }
  for (const [x, y, z] of [[0.3, 0.6, -0.7], [-0.6, 0.2, -0.7], [0.7, -0.3, -0.5], [-0.2, -0.5, -0.8]] as const)
    k.add(new THREE.SphereGeometry(0.3, 10, 8), { at: onSphere(x, y, z, 0.78), shade: 0.65 });
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI * 2) / 10;
    k.add(new THREE.ConeGeometry(0.04, 0.16, 5), { at: [Math.cos(a) * 0.3, -0.98, Math.sin(a) * 0.3], rot: [Math.PI, 0, 0] });
  }
  for (const arm of HORROR_ARMS) {
    k.add(limbTube(arm), { shade: 0.55 });
    suckers(k, arm, 4, 4);
  }
  return k.build();
}

/** A living moon of radius 1: craters, a heavy-lidded eye and a fanged grimace facing +Z. */
function moon(): THREE.BufferGeometry {
  const k = new Kit()
    .add(new THREE.SphereGeometry(1, 28, 18), { shade: 0.85 })
    .add(new THREE.SphereGeometry(0.42, 18, 12), { at: [0, 0.25, 0.68] })
    .add(new THREE.SphereGeometry(0.22, 14, 10), { at: [0, 0.25, 1.04], scale: [1, 1, 0.5], shade: DARK })
    .add(new THREE.BoxGeometry(0.05, 0.28, 0.05), { at: [0, 0.25, 1.15] })
    // the upper lid, half shut over the eye
    .add(new THREE.SphereGeometry(0.46, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), { at: [0, 0.25, 0.68], rot: [-0.2, 0, 0], shade: 0.85 })
    // a gaping maw set into the surface, fangs above and below
    .add(new THREE.SphereGeometry(1, 18, 10), { at: [0, -0.45, 0.86], rot: [0.47, 0, 0], scale: [0.42, 0.15, 0.12], shade: DARK });
  for (let i = 0; i < 6; i++) {
    const x = -0.3 + i * 0.12;
    const w = 1 - (x / 0.42) ** 2;
    k.add(new THREE.ConeGeometry(0.045, 0.16, 5), { at: [x, -0.45 + 0.11 * w, 0.92], rot: [Math.PI + 0.47, 0, 0] });
    if (i % 2) k.add(new THREE.ConeGeometry(0.04, 0.12, 5), { at: [x, -0.45 - 0.1 * w, 0.9], rot: [0.47, 0, 0] });
  }
  const up = new THREE.Vector3(0, 0, 1);
  for (const [x, y, z, r] of [[0.8, 0.5, -0.2, 0.22], [-0.7, 0.6, 0.1, 0.18], [0.2, -0.6, -0.8, 0.26], [-0.6, -0.5, -0.5, 0.2], [0.1, 0.9, -0.4, 0.15], [-0.9, -0.1, -0.3, 0.24], [0.6, -0.2, -0.75, 0.16], [0.85, -0.45, 0.2, 0.14]] as const) {
    const d = new THREE.Vector3(x, y, z).normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(up, d);
    k.add(new THREE.TorusGeometry(r, r * 0.22, 5, 16), { at: onSphere(x, y, z, 0.99), quat, shade: 0.95 }).add(new THREE.SphereGeometry(r, 12, 6), {
      at: onSphere(x, y, z, 0.97),
      quat,
      scale: [1, 1, 0.25],
      shade: 0.5,
    });
  }
  return k.build();
}

/** A star-whale two units long, nose at +X: tapering body, broad head, fins, flukes and dorsal spines. */
function leviathan(): THREE.BufferGeometry {
  const k = new Kit()
    .add(limbTube(LEVIATHAN), { shade: 0.85 })
    .add(new THREE.SphereGeometry(1, 18, 12), { at: [0.95, 0, 0], scale: [0.4, 0.26, 0.28], shade: 0.85 })
    .add(new THREE.BoxGeometry(0.42, 0.025, 0.46), { at: [1.08, -0.07, 0], shade: DARK })
    .add(new THREE.BoxGeometry(0.3, 0.03, 0.8), { at: [-1.3, 0.12, 0], rot: [0, 0, 0.15] })
    .add(new THREE.BoxGeometry(0.12, 0.05, 0.3), { at: [-1.2, 0.12, 0], shade: 0.6 });
  for (const s of [-1, 1]) {
    k.add(new THREE.SphereGeometry(0.06, 10, 8), { at: [1.05, 0.08, s * 0.2] })
      .add(new THREE.SphereGeometry(0.035, 8, 6), { at: [1.08, 0.08, s * 0.24], shade: DARK })
      .add(new THREE.BoxGeometry(0.5, 0.03, 0.35), { at: [0.3, -0.15, s * 0.45], rot: [s * 0.4, -s * 0.4, 0] });
  }
  for (let i = 0; i < 4; i++) k.add(new THREE.ConeGeometry(0.06, 0.3, 6), { at: [-0.6 + 0.4 * i, 0.38, 0], rot: [0, 0, 0.5] });
  // a row of pale spots down each flank
  for (let i = 0; i < 6; i++)
    for (const s of [-1, 1]) {
      const t = 0.3 + i * 0.1;
      const p = limbSamples(LEVIATHAN)[Math.round(t * LEVIATHAN.segs)];
      k.add(new THREE.SphereGeometry(p.r * 0.2, 8, 6), { at: [p.p.x, p.p.y - p.r * 0.2, p.p.z + s * p.r * 0.85], shade: 1 });
    }
  return k.build();
}

/** Unit geometry of a built kind, merged and vertex-shaded. */
export function builtGeometry(kind: BuiltKind): THREE.BufferGeometry {
  switch (kind) {
    case 'skulls':
      return skull();
    case 'spines':
      return vertebra();
    case 'arches':
      return arch();
    case 'towers':
      return tower();
    case 'domes':
      return dome();
    case 'wrecks':
      return wreck();
    case 'tendrils':
      return tendril();
    case 'horrors':
      return horror();
    case 'moons':
      return moon();
    case 'leviathans':
      return leviathan();
  }
}
