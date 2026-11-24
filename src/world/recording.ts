import * as THREE from 'three';
import { radiusAt, type Track } from '../gen/track';
import type { Problem } from '../gen/record';

/** Segments round the ghost tube. */
const RING = 14;
const GHOST = new THREE.Color('#7fe7ff');
const GOOD = new THREE.Color('#7cff6b');
const BAD = new THREE.Color('#ff3b3b');
const Z = new THREE.Vector3(0, 0, 1);

/**
 * What recording draws: a see-through tube growing behind the ship (and the fitted track, green
 * with failing stretches red, while it is reviewed), a ring at the start to come back to, and red
 * rings on a flown track where it fails the checks.
 */
export function createRecordScene(parent: THREE.Scene, max = 8000) {
  const group = new THREE.Group();
  parent.add(group);

  // one ring of vertices per sample, written in place as samples come in (+1 to close a loop)
  const rings = max + 1;
  const position = new THREE.BufferAttribute(new Float32Array(rings * RING * 3), 3);
  const color = new THREE.BufferAttribute(new Float32Array(rings * RING * 3), 3);
  position.setUsage(THREE.DynamicDrawUsage);
  color.setUsage(THREE.DynamicDrawUsage);
  const index: number[] = [];
  for (let i = 0; i < rings - 1; i++) {
    for (let k = 0; k < RING; k++) {
      const a = i * RING + k;
      const b = (i + 1) * RING + k;
      const c = (i + 1) * RING + ((k + 1) % RING);
      const d = i * RING + ((k + 1) % RING);
      index.push(a, b, d, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', position);
  geo.setAttribute('color', color);
  geo.setIndex(index);
  geo.setDrawRange(0, 0);
  const skin = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false }));
  const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.28, wireframe: true, depthWrite: false }));
  for (const m of [skin, wire]) m.frustumCulled = false;
  const tube = new THREE.Group();
  tube.add(skin, wire);
  tube.visible = false;
  group.add(tube);

  const ringGeo = new THREE.TorusGeometry(1, 0.05, 6, 48);
  const startMat = new THREE.MeshBasicMaterial({ color: '#ffd23f', transparent: true, opacity: 0.8 });
  const start = new THREE.Mesh(ringGeo, startMat);
  start.visible = false;
  group.add(start);
  const markers = new THREE.Group();
  group.add(markers);
  const markerMat = new THREE.MeshBasicMaterial({ color: BAD, transparent: true, opacity: 0.85 });

  let count = 0;
  const ups: THREE.Vector3[] = [];
  const pts: THREE.Vector3[] = [];
  const tan = new THREE.Vector3();
  const v = new THREE.Vector3();

  function writeRing(i: number, p: THREE.Vector3, t: THREE.Vector3, up: THREE.Vector3, r: number, c: THREE.Color): void {
    const right = v.crossVectors(t, up).normalize();
    for (let k = 0; k < RING; k++) {
      const a = (k / RING) * Math.PI * 2;
      const ca = Math.cos(a) * r;
      const sa = Math.sin(a) * r;
      const o = (i * RING + k) * 3;
      position.array[o] = p.x + right.x * ca + up.x * sa;
      position.array[o + 1] = p.y + right.y * ca + up.y * sa;
      position.array[o + 2] = p.z + right.z * ca + up.z * sa;
      color.array[o] = c.r;
      color.array[o + 1] = c.g;
      color.array[o + 2] = c.b;
    }
  }
  function flush(n: number): void {
    position.needsUpdate = true;
    color.needsUpdate = true;
    geo.setDrawRange(0, Math.max(0, n - 1) * RING * 6);
    geo.computeBoundingSphere();
  }
  /** Ring orientation: the last one's up, kept square to the new heading (no twist). */
  function frameUp(i: number, t: THREE.Vector3): THREE.Vector3 {
    const prev = ups[i - 1] ?? new THREE.Vector3(0, 1, 0);
    const up = prev.clone().addScaledVector(t, -prev.dot(t));
    if (up.lengthSq() < 1e-6) up.set(1, 0, 0).addScaledVector(t, -t.x);
    return up.normalize();
  }

  return {
    /** Start a new recording. */
    reset(): void {
      count = 0;
      ups.length = 0;
      pts.length = 0;
      flush(0);
      tube.visible = true;
      start.visible = false;
    },
    /** A new recorded sample. */
    append(p: THREE.Vector3, r: number): void {
      if (count >= max) return;
      pts[count] = p.clone();
      if (count === 0) {
        count = 1;
        return;
      }
      tan.subVectors(p, pts[count - 1]).normalize();
      if (count === 1) {
        // the first ring waits for a heading
        ups[0] = frameUp(0, tan);
        writeRing(0, pts[0], tan, ups[0], r, GHOST);
        start.position.copy(pts[0]);
        start.quaternion.setFromUnitVectors(Z, tan);
        start.scale.setScalar(r);
        start.visible = true;
      }
      ups[count] = frameUp(count, tan);
      writeRing(count, p, tan, ups[count], r, GHOST);
      count++;
      flush(count);
    },
    /** The recording got shorter (undo): keep its first `n` samples. */
    truncate(n: number): void {
      count = Math.min(count, n);
      ups.length = pts.length = count;
      flush(count);
    },
    /** Light the start ring when the loop can close. */
    closable(on: boolean): void {
      startMat.color.set(on ? GOOD : '#ffd23f');
    },
    /** Show a whole track (the fitted one) instead, red where it fails the checks. */
    showTrack(track: Track, problems: readonly Problem[]): void {
      const n = Math.min(max, track.pos.length);
      const bad = new Uint8Array(n);
      for (const p of problems) for (let i = p.i0; i <= p.i1 && i < n; i++) bad[i] = 1;
      for (let i = 0; i < n; i++) writeRing(i, track.pos[i], track.tan[i], track.up[i], radiusAt(track, i), bad[i] ? BAD : GOOD);
      let shown = n;
      if (track.closed !== false && n < rings) {
        writeRing(n, track.pos[0], track.tan[0], track.up[0], radiusAt(track, 0), bad[0] ? BAD : GOOD);
        shown++;
      }
      count = 0;
      flush(shown);
      tube.visible = true;
      start.visible = false;
    },
    hide(): void {
      tube.visible = false;
      start.visible = false;
    },
    /** Red rings at the failing stretches of a flown track (none to clear them). */
    mark(track: Track | null, problems: readonly Problem[]): void {
      markers.clear();
      if (!track) return;
      for (const p of problems) {
        const i = Math.round((p.i0 + p.i1) / 2);
        const m = new THREE.Mesh(ringGeo, markerMat);
        m.position.copy(track.pos[i]);
        m.quaternion.setFromUnitVectors(Z, track.tan[i]);
        m.scale.setScalar(radiusAt(track, i) * 1.05);
        markers.add(m);
      }
    },
    get marked(): number {
      return markers.children.length;
    },
  };
}

export type RecordScene = ReturnType<typeof createRecordScene>;
