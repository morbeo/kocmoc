import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { bridge, canClose, closeLoop, fitControlPoints, fitRolls, PathRecorder, recordingToDoc, smoothPath, trackProblems, type RecSample } from './record';
import { compileTrack } from './trackDoc';
import { nearestOnTrack, sampleTrack } from './track';

const UP = new Vector3(0, 1, 0);

/** Fly a parametric path through a recorder, as the game does each tick. */
function fly(path: (t: number) => Vector3, from: number, to: number, ticks: number, up: (t: number) => Vector3 = () => UP, r = 20, step = 4): PathRecorder {
  const rec = new PathRecorder(step);
  for (let k = 0; k <= ticks; k++) {
    const t = from + ((to - from) * k) / ticks;
    rec.push(path(t), up(t), r);
  }
  return rec;
}

const circle = (R: number) => (t: number) => new Vector3(R * Math.cos(t), 0, R * Math.sin(t));

describe('PathRecorder', () => {
  it('samples every step metres, pauses and undoes the last stretch', () => {
    const rec = new PathRecorder(4);
    for (let x = 0; x <= 100; x += 0.5) rec.push(new Vector3(x, 0, 0), UP, 20);
    expect(rec.samples).toHaveLength(26);
    expect(rec.length).toBeCloseTo(100);
    rec.paused = true;
    expect(rec.push(new Vector3(200, 0, 0), UP, 20)).toBe(false);
    rec.paused = false;
    expect(rec.undo(30)).toBe(8);
    expect(rec.length).toBeCloseTo(68);
    rec.undo(1e6);
    expect(rec.samples).toHaveLength(1);
  });

  it('stops at its limit', () => {
    const rec = new PathRecorder(1, 10);
    for (let x = 0; x < 50; x++) rec.push(new Vector3(x, 0, 0), UP, 20);
    expect(rec.samples).toHaveLength(10);
    expect(rec.full).toBe(true);
  });
});

describe('closing', () => {
  it('offers to close only near the start, heading the same way, after a long enough path', () => {
    const R = 300;
    const most = fly(circle(R), 0, Math.PI * 1.97, 4000).samples;
    expect(canClose(most, 20)).toBe(true);
    expect(canClose(fly(circle(R), 0, Math.PI * 1.5, 4000).samples, 20)).toBe(false);
    // back at the start but flying the other way
    const back = [...most, ...fly(circle(R), Math.PI * 1.97, Math.PI * 1.8, 400).samples];
    expect(canClose(back, 20)).toBe(false);
    expect(canClose(fly(circle(30), 0, Math.PI * 1.97, 400).samples, 20)).toBe(false);
  });

  it('cuts an overshot loop where it passes the start', () => {
    const samples = fly(circle(300), 0, Math.PI * 2.1, 4000).samples;
    const closed = closeLoop(samples, 20);
    expect(closed.length).toBeLessThan(samples.length);
    const last = closed[closed.length - 1].p;
    expect(last.distanceTo(closed[0].p)).toBeLessThan(8);
    expect(last.distanceTo(closed[0].p)).toBeGreaterThan(1);
  });

  it('bridges the gap back to the start with evenly spaced samples', () => {
    const samples = fly(circle(300), 0, Math.PI * 1.5, 4000).samples;
    const out = bridge(samples, 4, 20);
    const added = out.slice(samples.length);
    expect(added.length).toBeGreaterThan(80);
    // along the circle: the Hermite bridge with matching tangents stays near the missing quarter
    for (const q of added) expect(Math.abs(Math.hypot(q.p.x, q.p.z) - 300)).toBeLessThan(40);
    const gaps = out.map((q, i) => q.p.distanceTo(out[(i + 1) % out.length].p));
    expect(Math.max(...gaps)).toBeLessThan(6);
  });
});

describe('fitting', () => {
  it('smooths jitter without moving the ends of an open path', () => {
    let k = 0;
    const jitter = () => ((k = (k * 9301 + 49297) % 233280) / 233280 - 0.5) * 2;
    const samples: RecSample[] = Array.from({ length: 200 }, (_, i) => ({ p: new Vector3(i * 4, jitter(), jitter()), up: UP.clone(), r: 20 }));
    const sm = smoothPath(samples, false, 20, 4);
    expect(sm[0].p.equals(samples[0].p)).toBe(true);
    expect(sm[199].p.equals(samples[199].p)).toBe(true);
    const off = (xs: RecSample[]) => Math.max(...xs.slice(10, 190).map((q) => Math.hypot(q.p.y, q.p.z)));
    expect(off(sm)).toBeLessThan(off(samples) * 0.6);
  });

  it('keeps the spline within tolerance, with more points in the tight turns', () => {
    // a long straight, a tight hairpin, another straight
    const pts: Vector3[] = [];
    for (let x = 0; x <= 800; x += 4) pts.push(new Vector3(x, 0, 0));
    for (let a = 4 / 80; a < Math.PI; a += 4 / 80) pts.push(new Vector3(800 + 80 * Math.sin(a), 0, 80 - 80 * Math.cos(a)));
    for (let x = 800; x >= 0; x -= 4) pts.push(new Vector3(x, 0, 160));
    const idx = fitControlPoints(pts, false, 5, 160);
    expect(idx[0]).toBe(0);
    expect(idx[idx.length - 1]).toBe(pts.length - 1);
    const track = sampleTrack(idx.map((i) => pts[i]), new Array(idx.length).fill(0), { closed: false, spacing: 2, radius: 20, checkpoints: 1, twist: 0 });
    const worst = Math.max(...pts.map((p) => nearestOnTrack({ ...track, attempts: 0 }, p).dist));
    expect(worst).toBeLessThan(5.5);
    const inTurn = idx.filter((i) => pts[i].x > 800).length;
    const onStraight = idx.filter((i) => pts[i].x < 700 && pts[i].z === 0).length;
    // points per metre: the half circle is 251 m, the straight 700 m
    expect(inTurn / 251).toBeGreaterThan(onStraight / 700);
    expect(idx.length).toBeLessThan(40);
  });

  it('finds the roll the ship flew at, and whole barrel rolls round a loop as twist', () => {
    const n = 16;
    const ctrl = Array.from({ length: n }, (_, i) => circle(400)((i / n) * Math.PI * 2));
    const flat = fitRolls(ctrl, ctrl.map(() => UP), true, 4);
    expect(flat.twist).toBe(0);
    for (const r of flat.rolls) expect(Math.abs(r)).toBeLessThan(0.05);
    // the ship's up turns once about the heading over the lap
    const ups = ctrl.map((_, i) => {
      const a = (i / n) * Math.PI * 2;
      const out = new Vector3(Math.cos(a), 0, Math.sin(a));
      return UP.clone().multiplyScalar(Math.cos(a)).addScaledVector(out, Math.sin(a));
    });
    const rolled = fitRolls(ctrl, ups, true, 4);
    expect(Math.abs(rolled.twist)).toBe(1);
    for (const r of rolled.rolls) expect(Math.abs(r)).toBeLessThan(0.2);
  });
});

describe('recordingToDoc', () => {
  it('turns a flown loop into a closed track file that follows the path', () => {
    const wobble = (t: number) => new Vector3(600 * Math.cos(t), 80 * Math.sin(3 * t), 450 * Math.sin(t));
    const rec = fly(wobble, 0, Math.PI * 2.01, 6000);
    expect(canClose(rec.samples, 20)).toBe(true);
    const doc = recordingToDoc(closeLoop(rec.samples, 20), { closed: true, seed: 5, title: 'Flown' });
    expect(doc.closed).toBe(true);
    expect(doc.radius).toBe(20);
    expect(doc.title).toBe('Flown');
    expect(doc.points.length).toBeGreaterThan(8);
    expect(doc.points.length).toBeLessThan(60);
    const { track } = compileTrack(doc);
    const worst = Math.max(...rec.samples.map((q) => nearestOnTrack(track, q.p).dist));
    expect(worst).toBeLessThan(20 * 0.25 + 3);
    expect(trackProblems(track)).toEqual([]);
  });

  it('keeps an open run open, with the radius changes flown', () => {
    const rec = new PathRecorder(4);
    for (let z = 0; z <= 1200; z += 2) rec.push(new Vector3(30 * Math.sin(z / 200), 0, -z), UP, z < 600 ? 20 : 40);
    const doc = recordingToDoc(rec.samples, { closed: false, seed: 1 });
    expect(doc.closed).toBe(false);
    expect(doc.points[0].p).toEqual([0, 0, 0]);
    expect(doc.points[doc.points.length - 1].p[2]).toBe(-1200);
    const rs = doc.points.map((q) => q.r ?? doc.radius);
    expect(Math.min(...rs)).toBe(20);
    expect(Math.max(...rs)).toBe(40);
    expect(compileTrack(doc).track.closed).toBe(false);
  });
});

describe('trackProblems', () => {
  it('passes a wide loop and marks a hairpin and a near pass', () => {
    const loop = sampleTrack(Array.from({ length: 12 }, (_, i) => circle(800)((i / 12) * Math.PI * 2)), new Array(12).fill(0), { closed: true, spacing: 4, radius: 30, checkpoints: 4, twist: 0 });
    expect(trackProblems(loop)).toEqual([]);
    // an open run that doubles back tightly beside itself
    const hairpin = sampleTrack([new Vector3(0, 0, 0), new Vector3(400, 0, 0), new Vector3(430, 0, 30), new Vector3(400, 0, 60), new Vector3(0, 0, 60)], [0, 0, 0, 0, 0], { closed: false, spacing: 4, radius: 30, checkpoints: 2, twist: 0 });
    const probs = trackProblems(hairpin);
    expect(probs.some((p) => p.kind === 'tight')).toBe(true);
    const close = probs.filter((p) => p.kind === 'close');
    expect(close.length).toBeGreaterThanOrEqual(2);
    for (const p of probs) expect(p.s1).toBeGreaterThanOrEqual(p.s0);
  });
});
