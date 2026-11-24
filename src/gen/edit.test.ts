import { describe, it, expect } from 'vitest';
import { Euler, Quaternion, Vector3 } from 'three';
import { compileTrack, anchorS, parseTrackDoc, serializeTrackDoc, TRACK_KIND, type TrackDoc } from './trackDoc';
import { deletePoints, docSections, sectionOver, sectionSpan, EditHistory, flyStep, removeSection, setSection, turnView, updateSection, insertPoint, movePoints, nudgePoints, pointSample, radiusPoints, rollPoints, sampleSegment, smoothPoints } from './edit';

/** A closed square-ish loop of 8 points, 400 m across, with things placed on it. */
function loop(closed = true): TrackDoc {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return { p: [Math.cos(a) * 400, i % 2 ? 20 : 0, Math.sin(a) * 400] };
  });
  return parseTrackDoc({
    kind: TRACK_KIND,
    version: 1,
    closed,
    seed: 3,
    radius: 30,
    points: pts,
    sections: [{ kind: 'hex', from: [2, 0.25], to: [3, 0.5], ramp: 40, seed: 1, roll: 0 }],
    hazards: [{ kind: 'iris', at: [5, 0.5], thickness: 2, shape: { k: 'iris', min: 4, max: 20, period: 3, phase: 0, dwell: 0.2, petals: 6 } }],
    pads: [{ kind: 'boost', from: [1, 0.1], to: [1, 0.6], theta: 1.5, half: 0.4, depth: 6, w: 0 }],
  })!;
}

const sAt = (doc: TrackDoc, a: [number, number]) => {
  const t = compileTrack(doc).base;
  return anchorS(a, doc.points.length, t.length, doc.closed);
};
const posAt = (doc: TrackDoc, a: [number, number]) => {
  const t = compileTrack(doc).base;
  const s = sAt(doc, a);
  const i = Math.round((s / t.length) * (doc.closed ? t.pos.length : t.pos.length - 1)) % t.pos.length;
  return t.pos[i];
};

describe('moving points', () => {
  it('moves and nudges points, rounded like a file', () => {
    const d = loop();
    const m = movePoints(d, new Map([[2, [1.234, 5, 6] as [number, number, number]]]))!;
    expect(m.points[2].p).toEqual([1.2, 5, 6]);
    expect(m.points[1]).toEqual(d.points[1]);
    const n = nudgePoints(d, [0, 1], [10, 0, -5])!;
    expect(n.points[0].p).toEqual([d.points[0].p[0] + 10, d.points[0].p[1], d.points[0].p[2] - 5]);
    expect(n.points[1].p[0]).toBeCloseTo(d.points[1].p[0] + 10, 5);
    expect(movePoints(d, new Map([[99, [0, 0, 0] as [number, number, number]]]))).toBeUndefined();
  });

  it('does not change the doc it was given', () => {
    const d = loop();
    const text = serializeTrackDoc(d);
    nudgePoints(d, [0], [5, 5, 5]);
    rollPoints(d, [1], 1);
    deletePoints(d, [2]);
    insertPoint(d, 3);
    expect(serializeTrackDoc(d)).toBe(text);
  });
});

describe('inserting points', () => {
  it('puts the new point on the curve and barely changes its shape', () => {
    const d = loop();
    const r = insertPoint(d, 3)!;
    expect(r.index).toBe(4);
    expect(r.doc.points.length).toBe(9);
    const before = compileTrack(d).base;
    const after = compileTrack(r.doc).base;
    // the new point lies on the old curve
    const p = new Vector3(...r.doc.points[4].p);
    expect(Math.min(...before.pos.map((q) => q.distanceTo(p)))).toBeLessThan(3);
    expect(Math.abs(after.length - before.length) / before.length).toBeLessThan(0.02);
  });

  it('keeps placed things where they were', () => {
    const d = loop();
    for (const seg of [0, 2, 5, 7]) {
      const r = insertPoint(d, seg, 0.3)!;
      const h0 = posAt(d, d.hazards![0].at);
      const h1 = posAt(r.doc, r.doc.hazards![0].at);
      expect(h1.distanceTo(h0)).toBeLessThan(8);
      expect(r.doc.sections!.length).toBe(1);
      expect(r.doc.pads!.length).toBe(1);
      const s0 = r.doc.sections![0];
      expect(s0.to[0] + s0.to[1]).toBeGreaterThan(s0.from[0] + s0.from[1]);
    }
  });

  it('works on the closing segment of a loop and on an open track', () => {
    const d = loop();
    const r = insertPoint(d, 7)!;
    expect(r.index).toBe(8);
    expect(r.doc.points.length).toBe(9);
    const o = loop(false);
    expect(insertPoint(o, 7)).toBeUndefined(); // an open track of 8 points has 7 segments
    expect(insertPoint(o, 6)!.doc.points.length).toBe(9);
  });

  it('eases roll and radius from the neighbours', () => {
    let d = rollPoints(loop(), [3], 1)!;
    d = radiusPoints(d, [4], 50, true)!;
    const r = insertPoint(d, 3, 0.5)!;
    expect(r.doc.points[4].roll).toBeCloseTo(0.5, 3);
    expect(r.doc.points[4].r).toBeCloseTo(40, 1);
  });
});

describe('deleting points', () => {
  it('removes points and keeps placed things near where they were', () => {
    const d = loop();
    for (const k of [0, 1, 2, 3, 4, 5, 6, 7]) {
      const r = deletePoints(d, [k])!;
      expect(r.points.length).toBe(7);
      expect(r.hazards!.length).toBe(1);
      const h0 = posAt(d, d.hazards![0].at);
      const h1 = posAt(r, r.hazards![0].at);
      // the hazard sits on segment 5 (points 5 to 6): points 4 to 7 shape the curve there
      expect(h1.distanceTo(h0)).toBeLessThan(k >= 4 ? 120 : 8);
    }
  });

  it('removes several at once and refuses to go below the minimum', () => {
    const d = loop();
    expect(deletePoints(d, [1, 3, 5])!.points.length).toBe(5);
    expect(deletePoints(d, [0, 1, 2, 3, 4])).toBeUndefined();
    expect(deletePoints(loop(false), [0, 1, 2, 3, 4, 5])!.points.length).toBe(2);
    expect(deletePoints(d, [])).toBeUndefined();
  });

  it('moves things on a removed end segment of an open track to the new end', () => {
    const o = loop(false);
    const r = deletePoints(o, [0])!;
    expect(r.points.length).toBe(7);
    // the pad was on segment 1, now segment 0
    expect(r.pads![0].from[0]).toBe(0);
  });
});

describe('roll, radius, smoothing', () => {
  it('adds roll and clamps radius', () => {
    const d = loop();
    expect(rollPoints(d, [0, 1], 0.25)!.points.slice(0, 2).map((q) => q.roll)).toEqual([0.25, 0.25]);
    expect(radiusPoints(d, [2], 10)!.points[2].r).toBe(40);
    expect(radiusPoints(d, [2], -1000)!.points[2].r).toBe(3);
    expect(radiusPoints(d, [2], 5000, true)!.points[2].r).toBe(1000);
    // back to the track's radius: the field goes away
    expect(radiusPoints(d, [2], 30, true)!.points[2].r).toBeUndefined();
  });

  it('pulls a kinked point towards its neighbours, but not the ends of an open track', () => {
    const d = nudgePoints(loop(), [2], [0, 200, 0])!;
    const s = smoothPoints(d, [2])!;
    // 200 up, neighbours at 20: half way to 20
    expect(s.points[2].p[1]).toBeCloseTo(110, 1);
    const o = loop(false);
    expect(serializeTrackDoc(smoothPoints(o, [0, 7])!)).toBe(serializeTrackDoc(parseTrackDoc(JSON.parse(serializeTrackDoc(o)))!));
  });
});

describe('samples and segments', () => {
  it('finds the sample for a control point and the segment for a sample', () => {
    const d = loop();
    const t = compileTrack(d).base;
    expect(pointSample(t, 0, 8)).toBe(0);
    const i4 = pointSample(t, 4, 8);
    expect(i4).toBe(Math.round(t.pos.length / 2));
    const [seg, f] = sampleSegment(d, t, i4);
    expect(seg + f).toBeCloseTo(4, 0);
    const o = loop(false);
    const to = compileTrack(o).base;
    expect(pointSample(to, 7, 8)).toBe(to.pos.length - 1);
    expect(sampleSegment(o, to, to.pos.length - 1)[0]).toBe(6);
  });
});

describe('edit history', () => {
  it('undoes and redoes, and a new edit clears redo', () => {
    const h = new EditHistory('a');
    h.push('b', '', 0);
    h.push('c', '', 10);
    expect(h.undo()).toBe('b');
    expect(h.undo()).toBe('a');
    expect(h.undo()).toBeUndefined();
    expect(h.redo()).toBe('b');
    h.push('d', '', 20);
    expect(h.canRedo).toBe(false);
    expect(h.undo()).toBe('b');
  });

  it('joins quick edits with the same key into one step', () => {
    const h = new EditHistory('a', 200, 600);
    h.push('b', 'roll', 0);
    h.push('c', 'roll', 300);
    h.push('d', 'roll', 800);
    h.push('e', 'roll', 2000); // too late: a new step
    expect(h.undo()).toBe('d');
    expect(h.undo()).toBe('a');
  });

  it('ignores no-op edits and keeps at most `limit` steps', () => {
    const h = new EditHistory('0', 3);
    h.push('0');
    expect(h.canUndo).toBe(false);
    for (let i = 1; i <= 5; i++) h.push(String(i), '', i * 1000);
    expect([h.undo(), h.undo(), h.undo(), h.undo()]).toEqual(['4', '3', '2', undefined]);
  });
});

describe('fly cam', () => {
  const p = { speed: 100, boost: 4, turn: [1, 1, 1] as [number, number, number] };
  const none = { thrust: 0, strafe: 0, lift: 0, pitch: 0, yaw: 0, roll: 0, boost: false };

  it('flies along where it looks', () => {
    const pos = new Vector3();
    const q = new Quaternion();
    flyStep(pos, q, { ...none, thrust: 1 }, p, 0.5);
    expect(pos.toArray().map((x) => Math.round(x))).toEqual([0, 0, -50]);
    flyStep(pos, q, { ...none, strafe: 1, lift: -1, boost: true }, p, 0.25);
    expect(pos.toArray().map((x) => Math.round(x))).toEqual([100, -100, -50]);
    // yaw right a quarter turn: forward is now +x
    q.identity();
    pos.set(0, 0, 0);
    flyStep(pos, q, { ...none, yaw: 1 }, p, Math.PI / 2);
    flyStep(pos, q, { ...none, thrust: 1 }, p, 1);
    expect(pos.x).toBeCloseTo(100, 3);
    expect(pos.z).toBeCloseTo(0, 3);
  });

  it('pitches up and rolls about its own axes', () => {
    const q = new Quaternion();
    const pos = new Vector3();
    flyStep(pos, q, { ...none, pitch: 1 }, p, Math.PI / 2);
    expect(new Vector3(0, 0, -1).applyQuaternion(q).y).toBeCloseTo(1, 5);
    q.identity();
    flyStep(pos, q, { ...none, roll: 1 }, p, Math.PI / 2);
    // roll right: the camera's up tips to the right
    expect(new Vector3(0, 1, 0).applyQuaternion(q).x).toBeCloseTo(1, 5);
  });
});

describe('view turns', () => {
  const fwdOf = (q: Quaternion) => new Vector3(0, 0, -1).applyQuaternion(q);
  const upOf = (q: Quaternion) => new Vector3(0, 1, 0).applyQuaternion(q);

  it('yaws round the pivot and keeps looking at it', () => {
    // 100 m back from the origin on +z, looking at it
    const pos = new Vector3(0, 0, 100);
    const q = new Quaternion();
    turnView(pos, q, new Vector3(), 'yaw', Math.PI / 2);
    // the view turned right: it now looks along +x... from -x
    expect(fwdOf(q).x).toBeCloseTo(1, 5);
    expect(pos.x).toBeCloseTo(-100, 5);
    expect(pos.z).toBeCloseTo(0, 5);
    expect(upOf(q).y).toBeCloseTo(1, 5);
  });

  it('pitches up over the pivot, rolls in place, and turns in place about its own position', () => {
    const pos = new Vector3(0, 0, 100);
    const q = new Quaternion();
    turnView(pos, q, new Vector3(), 'pitch', Math.PI / 2);
    expect(fwdOf(q).y).toBeCloseTo(1, 5);
    expect(pos.y).toBeCloseTo(-100, 5);
    const p2 = new Vector3(0, 0, 100);
    const q2 = new Quaternion();
    turnView(p2, q2, new Vector3(), 'roll', Math.PI / 4);
    expect(p2.toArray()).toEqual([0, 0, 100]);
    expect(upOf(q2).x).toBeCloseTo(Math.SQRT1_2, 5);
    expect(fwdOf(q2).z).toBeCloseTo(-1, 5);
    // a pivot at the camera: it only turns
    const p3 = new Vector3(5, 6, 7);
    const q3 = new Quaternion();
    turnView(p3, q3, p3.clone(), 'yaw', 1);
    expect(p3.toArray()).toEqual([5, 6, 7]);
  });

  it('four quarter turns come back', () => {
    const pos = new Vector3(3, 40, 100);
    const q = new Quaternion().setFromEuler(new Euler(0.3, 0.2, 0.1));
    const p0 = pos.clone();
    const q0 = q.clone();
    for (const axis of ['yaw', 'pitch', 'roll'] as const) for (let k = 0; k < 4; k++) turnView(pos, q, new Vector3(1, 2, 3), axis, Math.PI / 2);
    expect(pos.distanceTo(p0)).toBeLessThan(1e-6);
    expect(Math.abs(q.dot(q0))).toBeCloseTo(1, 6);
  });
});

describe('sections', () => {
  it('shapes the stretch between two points, replacing what it overlaps', () => {
    const d = loop(); // has a hex section from [2, 0.25] to [3, 0.5]
    const a = setSection(d, 5, 3, 'star')!;
    expect(a.sections!.map((x) => [x.kind, x.from, x.to])).toEqual([['star', [3, 0], [5, 0]]]);
    expect(a.sections![0].ramp).toBe(45);
    const b = setSection(d, 5, 6, 'cavern')!;
    expect(b.sections!.map((x) => x.kind)).toEqual(['hex', 'cavern']);
    expect(b.sections![1].seed).toBe(2);
    // back to round
    expect(setSection(d, 2, 4, null)!.sections).toBeUndefined();
  });

  it('one point means the segment after it, or before it at the end of a run', () => {
    const d = loop();
    expect(setSection(d, 6, 6, 'octagon')!.sections!.at(-1)!.from).toEqual([6, 0]);
    const o = loop(false);
    const s = setSection(o, 7, 7, 'square')!.sections!.at(-1)!;
    expect([s.from, s.to]).toEqual([[6, 0], [6, 1]]);
    expect(setSection(d, 0, 99, 'hex')).toBeUndefined();
    expect(sectionSpan(d, 4, 1)).toEqual([1, 4]);
    expect(sectionSpan(d, 7, 7)).toEqual([7, 8]);
    expect(sectionSpan(d, -1, 2)).toBeNull();
    expect(sectionOver(d, 3, 4)).toBe(0);
    expect(sectionOver(d, 4, 6)).toBe(-1);
  });

  it('changes and removes sections, and places them on the centreline', () => {
    const d = loop();
    const u = updateSection(d, 0, { kind: 'ellipse', roll: Math.PI / 2, ramp: -5 })!;
    expect(u.sections![0]).toMatchObject({ kind: 'ellipse', roll: 1.571, ramp: 0 });
    expect(updateSection(d, 3, { kind: 'hex' })).toBeUndefined();
    expect(removeSection(d, 0)!.sections).toBeUndefined();
    expect(removeSection(d, 1)).toBeUndefined();
    const t = compileTrack(d).base;
    const [sec] = docSections(d, t);
    expect(sec.s0).toBeCloseTo(t.length * (2.25 / 8), 3);
    expect(sec.s1).toBeCloseTo(t.length * (3.5 / 8), 3);
    // the same as the game puts it
    const raced = compileTrack(d).track.sections![0];
    expect(raced.s0).toBeCloseTo(sec.s0, 6);
  });
});
