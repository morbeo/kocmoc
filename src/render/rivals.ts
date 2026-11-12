import * as THREE from 'three';

/** One translucent ship per rival kind; the best lap keeps the original ghost model. */
export type RivalKind = 'best' | 'last' | 'bot';
export const RIVAL_NAMES: Record<RivalKind, string> = { best: 'BEST', last: 'LAST', bot: 'AUTOPILOT' };
export type RivalModels = Record<RivalKind, { model: THREE.Object3D; mat: THREE.MeshBasicMaterial }>;

/** The rival ships: copies of `ship` in one translucent colour each, hidden, added to `scene`. */
export function createRivalModels(scene: THREE.Scene, ship: THREE.Object3D): RivalModels {
  // the best lap's ghost: the ship's shape in one translucent colour
  const ghostMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
  const ghostModel = ship.clone(true);
  ghostModel.traverse((o) => {
    if (o instanceof THREE.Mesh) o.material = ghostMat;
  });
  ghostModel.visible = false;
  scene.add(ghostModel);
  const cloneGhost = () => {
    const mat = ghostMat.clone();
    const model = ghostModel.clone(true);
    model.traverse((o) => {
      if (o instanceof THREE.Mesh) o.material = mat;
    });
    scene.add(model);
    return { model, mat };
  };
  return { best: { model: ghostModel, mat: ghostMat }, last: cloneGhost(), bot: cloneGhost() };
}
