import * as THREE from 'three';
import { radiusAt, type Track } from '../gen/track';
import { pointSample } from '../gen/edit';
import type { TrackDoc } from '../gen/trackDoc';
import type { Problem } from '../gen/record';
import { createRecordScene } from './recording';

const POINT = new THREE.Color('#7fe7ff');
const FIRST = new THREE.Color('#7cff6b');
const SELECTED = new THREE.Color('#ffd23f');
const Z = new THREE.Vector3(0, 0, 1);
/** Most selected points that get a radius ring and roll tick. */
const RINGS = 64;

/** What a click hit: a control point, or the centreline at a sample. */
export type Pick = { kind: 'point'; index: number } | { kind: 'line'; sample: number; point: THREE.Vector3 };

/**
 * What the track editor draws over the track: control points (drawn through walls, a constant size on
 * screen), the control polygon, the centreline, a radius ring and roll tick on each selected point,
 * and a see-through tube, green with failing stretches red, for the ghost view.
 */
export function createEditScene(parent: THREE.Scene, max = 2000) {
  const group = new THREE.Group();
  group.visible = false;
  parent.add(group);
  const ghost = createRecordScene(group);

  const over = (m: THREE.Material) => {
    m.depthTest = false;
    m.depthWrite = false;
    m.transparent = true;
    return m;
  };
  const pointMat = over(new THREE.MeshBasicMaterial({ color: '#ffffff' }));
  const points = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 14, 10), pointMat, max);
  points.count = 0;
  points.renderOrder = 10;
  points.frustumCulled = false;
  group.add(points);

  const polyMat = over(new THREE.LineDashedMaterial({ color: '#ffffff', opacity: 0.45, dashSize: 6, gapSize: 4 }));
  const poly = new THREE.Line(new THREE.BufferGeometry(), polyMat);
  poly.renderOrder = 9;
  poly.frustumCulled = false;
  const lineMat = over(new THREE.LineBasicMaterial({ color: '#ffd23f', opacity: 0.8 }));
  const line = new THREE.Line(new THREE.BufferGeometry(), lineMat);
  line.renderOrder = 9;
  line.frustumCulled = false;
  group.add(poly, line);

  const ringGeo = new THREE.TorusGeometry(1, 0.02, 4, 48);
  const ringMat = over(new THREE.MeshBasicMaterial({ color: SELECTED, opacity: 0.9 }));
  const rings = new THREE.InstancedMesh(ringGeo, ringMat, RINGS);
  rings.count = 0;
  rings.renderOrder = 10;
  rings.frustumCulled = false;
  const tickMat = over(new THREE.LineBasicMaterial({ color: SELECTED }));
  const ticks = new THREE.LineSegments(new THREE.BufferGeometry(), tickMat);
  ticks.renderOrder = 10;
  ticks.frustumCulled = false;
  group.add(rings, ticks);

  let doc: TrackDoc | null = null;
  let track: Track | null = null;
  let shown: readonly Problem[] = [];
  let tube = true;
  const drawTube = () => {
    if (!track) return;
    if (tube) ghost.showTrack(track, shown);
    else ghost.hide();
  };
  let selection: ReadonlySet<number> = new Set();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const v = new THREE.Vector3();
  const s = new THREE.Vector3();

  function drawSelection(): void {
    if (!doc || !track) return;
    const n = doc.points.length;
    for (let i = 0; i < n; i++) points.setColorAt(i, selection.has(i) ? SELECTED : i === 0 ? FIRST : POINT);
    if (points.instanceColor) points.instanceColor.needsUpdate = true;
    const sel = [...selection].filter((i) => i < n).slice(0, RINGS);
    const tick: number[] = [];
    sel.forEach((k, j) => {
      const i = pointSample(track!, k, n);
      const r = radiusAt(track!, i);
      const p = new THREE.Vector3(...doc!.points[k].p);
      m.compose(p, q.setFromUnitVectors(Z, track!.tan[i]), s.setScalar(r));
      rings.setMatrixAt(j, m);
      // the roll tick: from the point to the wall overhead, along the frame's up (roll included)
      v.copy(p).addScaledVector(track!.up[i], r);
      tick.push(p.x, p.y, p.z, v.x, v.y, v.z);
    });
    rings.count = sel.length;
    rings.instanceMatrix.needsUpdate = true;
    ticks.geometry.dispose();
    ticks.geometry = new THREE.BufferGeometry();
    ticks.geometry.setAttribute('position', new THREE.Float32BufferAttribute(tick, 3));
  }

  return {
    group,
    /** The doc being edited, its centreline, its problems (drawn red) and the selection. */
    set(d: TrackDoc, t: Track, problems: readonly Problem[], sel: ReadonlySet<number>): void {
      doc = d;
      track = t;
      selection = sel;
      points.count = Math.min(max, d.points.length);
      const pts = d.points.map((x) => new THREE.Vector3(...x.p));
      if (d.closed) pts.push(pts[0]);
      poly.geometry.dispose();
      poly.geometry = new THREE.BufferGeometry().setFromPoints(pts);
      poly.computeLineDistances();
      const c = [...t.pos];
      if (t.closed !== false) c.push(t.pos[0]);
      line.geometry.dispose();
      line.geometry = new THREE.BufferGeometry().setFromPoints(c);
      shown = problems;
      drawTube();
      ghost.mark(t, problems);
      drawSelection();
    },
    select(sel: ReadonlySet<number>): void {
      selection = sel;
      drawSelection();
    },
    /** Show the see-through tube (ghost view) or only the lines and points (solid view). */
    ghost(on: boolean): void {
      if (on === tube) return;
      tube = on;
      drawTube();
    },
    show(on: boolean): void {
      group.visible = on;
    },
    /**
     * Once per frame: keep points `px` pixels across on screen. `height` is the view's height in CSS px.
     */
    frame(camera: THREE.PerspectiveCamera, height: number, px = 9): void {
      if (!doc) return;
      const k = (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * px) / 2 / Math.max(1, height);
      for (let i = 0; i < points.count; i++) {
        v.fromArray(doc.points[i].p);
        const d = v.distanceTo(camera.position);
        m.compose(v, q.identity(), s.setScalar(Math.max(1e-3, d * k)));
        points.setMatrixAt(i, m);
      }
      points.instanceMatrix.needsUpdate = true;
      points.computeBoundingSphere();
    },
    /** What the ray hits first: a control point, else the centreline (within `lineTol` m). */
    pick(ray: THREE.Raycaster, lineTol: number): Pick | null {
      if (!group.visible) return null;
      const hit = ray.intersectObject(points, false)[0];
      if (hit?.instanceId !== undefined) return { kind: 'point', index: hit.instanceId };
      ray.params.Line = { threshold: lineTol };
      const l = ray.intersectObject(line, false)[0];
      if (l && l.index !== undefined && track) return { kind: 'line', sample: l.index % track.pos.length, point: l.point.clone() };
      return null;
    },
  };
}

export type EditScene = ReturnType<typeof createEditScene>;
