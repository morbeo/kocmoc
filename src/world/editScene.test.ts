import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { createEditScene } from './editScene';
import { createRecordScene } from './recording';
import { compileBase } from '../gen/edit';
import { trackProblems } from '../gen/record';
import { parseTrackDoc, TRACK_KIND, type TrackDoc } from '../gen/trackDoc';

function loop(): TrackDoc {
  const points = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return { p: [Math.cos(a) * 400, 0, Math.sin(a) * 400], ...(i === 2 ? { r: 60 } : {}) };
  });
  return parseTrackDoc({ kind: TRACK_KIND, version: 1, closed: true, seed: 1, radius: 30, points })!;
}

const camAt = (pos: THREE.Vector3, target: THREE.Vector3) => {
  const c = new THREE.PerspectiveCamera(60, 16 / 9, 0.5, 20000);
  c.position.copy(pos);
  c.lookAt(target);
  c.updateMatrixWorld();
  return c;
};

describe('editor overlay', () => {
  it('draws points, lines and rings for the selection, and picks them', () => {
    const scene = new THREE.Scene();
    const ed = createEditScene(scene);
    const doc = loop();
    const t = compileBase(doc);
    ed.set(doc, t, [], new Set([2]));
    ed.show(true);
    expect(ed.group.visible).toBe(true);
    const cam = camAt(new THREE.Vector3(0, 1500, 0.1), new THREE.Vector3());
    ed.frame(cam, 720);

    // a ray straight down onto point 2 picks it
    const ray = new THREE.Raycaster();
    const p2 = new THREE.Vector3(...doc.points[2].p);
    ray.set(p2.clone().setY(1000), new THREE.Vector3(0, -1, 0));
    expect(ed.pick(ray, 5)).toEqual({ kind: 'point', index: 2 });

    // half way between two points it hits the centreline instead
    const i = Math.round(t.pos.length / 16);
    ray.set(t.pos[i].clone().setY(1000), new THREE.Vector3(0, -1, 0));
    const hit = ed.pick(ray, 5);
    expect(hit?.kind).toBe('line');
    if (hit?.kind === 'line') expect(Math.abs(hit.sample - i)).toBeLessThanOrEqual(3);

    // nothing out in space
    ray.set(new THREE.Vector3(5000, 1000, 5000), new THREE.Vector3(0, -1, 0));
    expect(ed.pick(ray, 5)).toBeNull();

    // hidden: no picks
    ed.show(false);
    ray.set(p2.clone().setY(1000), new THREE.Vector3(0, -1, 0));
    expect(ed.pick(ray, 5)).toBeNull();
  });

  it('keeps points the same size on screen', () => {
    const scene = new THREE.Scene();
    const ed = createEditScene(scene);
    const doc = loop();
    ed.set(doc, compileBase(doc), [], new Set());
    const points = ed.group.children.find((o): o is THREE.InstancedMesh => (o as THREE.InstancedMesh).isInstancedMesh)!;
    const scaleOf = (k: number) => {
      const m = new THREE.Matrix4();
      points.getMatrixAt(k, m);
      return new THREE.Vector3().setFromMatrixScale(m).x;
    };
    ed.frame(camAt(new THREE.Vector3(0, 500, 0.1), new THREE.Vector3()), 720);
    const near = scaleOf(0);
    ed.frame(camAt(new THREE.Vector3(0, 5000, 0.1), new THREE.Vector3()), 720);
    expect(scaleOf(0) / near).toBeGreaterThan(5);
    expect(points.count).toBe(8);
  });

  it('switches the see-through tube and follows a new selection and doc', () => {
    const scene = new THREE.Scene();
    const ed = createEditScene(scene);
    const doc = loop();
    const t = compileBase(doc);
    ed.set(doc, t, trackProblems(t), new Set([0, 1, 2]));
    ed.ghost(false);
    ed.ghost(false);
    ed.ghost(true);
    ed.select(new Set([5]));
    const fewer = parseTrackDoc({ ...doc, points: doc.points.slice(0, 5) })!;
    ed.set(fewer, compileBase(fewer), [], new Set([4, 7]));
    const points = ed.group.children.find((o): o is THREE.InstancedMesh => (o as THREE.InstancedMesh).isInstancedMesh)!;
    expect(points.count).toBe(5);
  });
});

describe('sections on the see-through tube', () => {
  it('draws a section in its shape and colour', () => {
    const scene = new THREE.Scene();
    const ed = createEditScene(scene);
    const doc = parseTrackDoc({ ...loop(), sections: [{ kind: 'square', from: [1, 0], to: [3, 0], ramp: 0, seed: 1, roll: 0 }, { kind: 'open', from: [5, 0], to: [6, 0], ramp: 0, seed: 2, roll: 0 }] })!;
    const t = compileBase(doc);
    ed.set(doc, t, [], new Set());
    let geo!: THREE.BufferGeometry;
    ed.group.traverse((o) => {
      const g = (o as THREE.Mesh).geometry as THREE.BufferGeometry | undefined;
      if ((o as THREE.Mesh).isMesh && g?.getAttribute('color')) geo = g;
    });
    const pos = geo.getAttribute('position');
    const col = geo.getAttribute('color');
    // a ring in the middle of the square section: corners reach √2 radii
    const i = Math.round(t.pos.length * (2 / 8));
    let far = 0;
    for (let k = 0; k < 24; k++) far = Math.max(far, new THREE.Vector3().fromBufferAttribute(pos, i * 24 + k).distanceTo(t.pos[i]));
    expect(far / 30).toBeGreaterThan(1.3);
    // blue, not green
    expect(col.getZ(i * 24)).toBeGreaterThan(col.getY(i * 24) * 0.9);
    // outside sections: round and green
    const j = Math.round(t.pos.length * (4 / 8));
    expect(new THREE.Vector3().fromBufferAttribute(pos, j * 24).distanceTo(t.pos[j])).toBeCloseTo(30, 0);
  });
});

describe('recording tube', () => {
  it('grows ring by ring, truncates, closes and shows a fitted track with red stretches', () => {
    const scene = new THREE.Scene();
    const rec = createRecordScene(scene, 100);
    rec.reset();
    for (let i = 0; i < 20; i++) rec.append(new THREE.Vector3(i * 4, Math.sin(i / 3) * 5, 0), 30);
    rec.truncate(10);
    rec.closable(true);
    rec.closable(false);
    const doc = loop();
    const t = compileBase(doc);
    // the whole track is more samples than the tube holds: it shows what fits
    rec.showTrack(t, [{ kind: 'tight', s0: 0, s1: 40, i0: 0, i1: 10 }]);
    rec.mark(t, [{ kind: 'close', s0: 0, s1: 40, i0: 0, i1: 10 }]);
    expect(rec.marked).toBe(1);
    rec.mark(null, []);
    expect(rec.marked).toBe(0);
    rec.hide();
    // full: more samples are ignored
    rec.reset();
    for (let i = 0; i < 150; i++) rec.append(new THREE.Vector3(0, 0, i * 4), 30);
    expect(scene.children.length).toBe(1);
  });
});
