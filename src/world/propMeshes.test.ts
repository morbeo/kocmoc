import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { builtGeometry } from './propMeshes';
import { BUILT_KINDS, LOCAL_BALLS } from '../gen/scenery';

describe('built scenery meshes', () => {
  for (const kind of BUILT_KINDS)
    it(`${kind}: the clearance balls cover every vertex`, () => {
      const geo = builtGeometry(kind);
      const pos = geo.getAttribute('position');
      const v = new Vector3();
      const outside: number[][] = [];
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        if (!LOCAL_BALLS[kind].some(([x, y, z, r]) => v.distanceTo(new Vector3(x, y, z)) <= r + 1e-6)) outside.push(v.toArray().map((n) => +n.toFixed(3)));
      }
      expect(outside.slice(0, 5), `${outside.length} of ${pos.count} vertices outside`).toEqual([]);
    });

  it('carry a shade per vertex, with dark details', () => {
    for (const kind of BUILT_KINDS) {
      const geo = builtGeometry(kind);
      const c = geo.getAttribute('color');
      expect(c.count, kind).toBe(geo.getAttribute('position').count);
      expect(geo.getAttribute('normal').count, kind).toBe(c.count);
      let lo = 1;
      for (let i = 0; i < c.count; i++) lo = Math.min(lo, c.getX(i));
      expect(lo, kind).toBeLessThan(0.6);
    }
  });
});
