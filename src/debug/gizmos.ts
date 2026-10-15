import * as THREE from 'three';
import { vars } from '../core/vars';
import type { ShipState } from '../sim/ship';
import type { Nearest, Track } from '../gen/track';

export interface GizmoContext {
  scene: THREE.Scene;
  ship: () => ShipState;
  /** previous sim state, for acceleration */
  prevShip: () => ShipState;
  step: () => number;
  track: () => Track | null;
  near: () => Nearest | null;
  shipRadius: () => number;
}

const on = (name: string) => vars.get(`debug.gizmo.${name}`)?.value === true;

// overlay colours: drawn without depth test so they read through geometry
const mat = (color: number) => new THREE.LineBasicMaterial({ color, depthTest: false, transparent: true });

/** Debug overlays: velocity / acceleration vectors, collision sphere, spline frames, checkpoint planes, nearest point. */
export function createGizmos(ctx: GizmoContext) {
  const root = new THREE.Group();
  root.renderOrder = 10;
  ctx.scene.add(root);

  const velArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(), 1, 0x40ff80, 1.2, 0.6);
  const accArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(), 1, 0xff8040, 1, 0.5);
  for (const a of [velArrow, accArrow]) a.traverse((o) => {
    const m = (o as THREE.Mesh).material as THREE.Material | undefined;
    if (m) m.depthTest = false;
  });
  const sphere = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1, 1)), mat(0xffffff));
  const nearLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), mat(0xff40ff));
  const nearDot = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff40ff, depthTest: false }));
  root.add(velArrow, accArrow, sphere, nearLine, nearDot);

  let framesFor: Track | null = null;
  const frames = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false }));
  const planes = new THREE.LineSegments(new THREE.BufferGeometry(), mat(0x40e0ff));
  root.add(frames, planes);

  function buildTrackGizmos(t: Track): void {
    framesFor = t;
    // tangent (red), up (green), right (blue) every few samples
    const every = Math.max(1, Math.round(t.pos.length / 200));
    const len = t.radius * 0.5;
    const pos: number[] = [];
    const col: number[] = [];
    for (let i = 0; i < t.pos.length; i += every) {
      for (const [dir, c] of [
        [t.tan[i], [1, 0.3, 0.3]],
        [t.up[i], [0.3, 1, 0.3]],
        [t.right[i], [0.3, 0.5, 1]],
      ] as const) {
        const p = t.pos[i];
        pos.push(p.x, p.y, p.z, p.x + dir.x * len, p.y + dir.y * len, p.z + dir.z * len);
        col.push(...c, ...c);
      }
    }
    frames.geometry.dispose();
    frames.geometry = new THREE.BufferGeometry();
    frames.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    frames.geometry.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));

    // checkpoint planes: a square spanning the tube at each checkpoint
    const sq: number[] = [];
    const n = t.pos.length;
    for (const s of t.checkpoints) {
      const i = Math.min(n - 1, Math.round((s / t.length) * n)) % n;
      const r = t.radius;
      const corners = [
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1],
      ].map(([a, b]) => t.pos[i].clone().addScaledVector(t.right[i], a * r).addScaledVector(t.up[i], b * r));
      for (let k = 0; k < 4; k++) sq.push(...corners[k].toArray(), ...corners[(k + 1) % 4].toArray());
      sq.push(...corners[0].toArray(), ...corners[2].toArray(), ...corners[1].toArray(), ...corners[3].toArray());
    }
    planes.geometry.dispose();
    planes.geometry = new THREE.BufferGeometry();
    planes.geometry.setAttribute('position', new THREE.Float32BufferAttribute(sq, 3));
  }

  const acc = new THREE.Vector3();
  const dir = new THREE.Vector3();
  return {
    update() {
      const s = ctx.ship();
      const speed = s.vel.length();
      velArrow.visible = on('velocity') && speed > 0.01;
      if (velArrow.visible) {
        velArrow.position.copy(s.pos);
        velArrow.setDirection(dir.copy(s.vel).divideScalar(speed));
        velArrow.setLength(Math.max(2, speed * 0.1), 1.2, 0.6);
      }
      acc.subVectors(s.vel, ctx.prevShip().vel).divideScalar(ctx.step());
      const a = acc.length();
      accArrow.visible = on('accel') && a > 0.5;
      if (accArrow.visible) {
        accArrow.position.copy(s.pos);
        accArrow.setDirection(dir.copy(acc).divideScalar(a));
        accArrow.setLength(Math.max(1.5, a * 0.05), 1, 0.5);
      }
      sphere.visible = on('collision');
      sphere.position.copy(s.pos);
      sphere.scale.setScalar(ctx.shipRadius());

      const t = ctx.track();
      if (t && t !== framesFor) buildTrackGizmos(t);
      frames.visible = !!t && on('frames');
      planes.visible = !!t && on('checkpoints');

      const near = ctx.near();
      nearLine.visible = nearDot.visible = !!t && !!near && on('nearest');
      if (near && nearLine.visible) {
        const p = nearLine.geometry.attributes.position as THREE.BufferAttribute;
        p.setXYZ(0, s.pos.x, s.pos.y, s.pos.z);
        p.setXYZ(1, near.point.x, near.point.y, near.point.z);
        p.needsUpdate = true;
        nearDot.position.copy(near.point);
      }
    },
  };
}
