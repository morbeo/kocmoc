import { describe, it, expect } from 'vitest';
import { Player, Recorder, parseRecording, quantize, trimInputs, type Recording } from './replay';
import { noControls } from './ship';

it('trimInputs cuts the runs to the first ticks, the last one kept going short', () => {
  const runs = [[3, 1], [2, 2], [4, 3]];
  expect(trimInputs(runs, 9)).toEqual(runs);
  expect(trimInputs(runs, 4)).toEqual([[3, 1], [1, 2]]);
  expect(trimInputs(runs, 3)).toEqual([[3, 1]]);
  expect(trimInputs(runs, 0)).toEqual([]);
  expect(trimInputs(runs, 20)).toEqual(runs);
});

it('quantize rounds every axis to 1/1024', () => {
  const c = { ...noControls(), pitch: 0.1, yaw: -0.3337, roll: 1, strafe: 0.0004, lift: -0.0006, thrust: 0.5 };
  expect(quantize(c)).toBe(c);
  expect([c.pitch, c.yaw, c.roll, c.strafe, c.lift, c.thrust]).toEqual([102 / 1024, -342 / 1024, 1, 0, -1 / 1024, 0.5]);
});

describe('Recorder and Player', () => {
  const rec = () => {
    const r = new Recorder({}, { s: 0, speed: 0 }, 1 / 120);
    const c = noControls();
    r.push(c);
    r.push(c);
    c.pitch = 0.5;
    c.boost = true;
    r.push(c);
    return r.finish();
  };

  it('counts ticks and run-length encodes repeats', () => {
    const r = rec();
    expect(r.ticks).toBe(3);
    expect(r.inputs).toEqual([[2, 0, 0, 0, 0, 0, 0, 0], [1, 512, 0, 0, 0, 0, 0, 1]]);
  });

  it('plays the controls back tick by tick and is done after the last', () => {
    const p = new Player(rec());
    const c = noControls();
    expect(p.done).toBe(false);
    expect(p.next(c)).toBe(true);
    expect(p.next(c)).toBe(true);
    expect([c.pitch, c.boost, p.tick, p.done]).toEqual([0, false, 2, false]);
    expect(p.next(c)).toBe(true);
    expect([c.pitch, c.boost, p.tick, p.done]).toEqual([0.5, true, 3, true]);
    expect(p.next(c)).toBe(false);
    expect(p.tick).toBe(3);
  });

  it('is done at once, and plays nothing, with no inputs', () => {
    const p = new Player({ ...rec(), inputs: [], ticks: 0 });
    expect(p.done).toBe(true);
    expect(p.next(noControls())).toBe(false);
  });
});

describe('parseRecording', () => {
  const ok: Recording = { version: 1, layers: { user: { 'a.b': 1 } }, spawn: { s: 10, speed: 5 }, step: 1 / 120, inputs: [[3, 0, 0, 0, 0, 0, 1024, 0]], ticks: 3 };

  it('keeps a valid recording, with its note and build', () => {
    expect(parseRecording(ok)).toEqual({ ...ok, note: undefined, build: undefined });
    expect(parseRecording({ ...ok, note: 'wall clip', build: 'abc123' })).toMatchObject({ note: 'wall clip', build: 'abc123' });
    expect(parseRecording({ ...ok, note: 3, build: {} })).toMatchObject({ note: undefined, build: undefined });
    // only the fields it knows
    expect(parseRecording({ ...ok, spawn: { s: 1, speed: 2, extra: 3 } })!.spawn).toEqual({ s: 1, speed: 2 });
  });

  it.each([
    ['null', null],
    ['a string', 'rec'],
    ['another version', { ...ok, version: 2 }],
    ['no step', { ...ok, step: undefined }],
    ['no ticks', { ...ok, ticks: '3' }],
    ['inputs not a list', { ...ok, inputs: {} }],
    ['a short input row', { ...ok, inputs: [[3, 0, 0]] }],
    ['a bad input row among good ones', { ...ok, inputs: [ok.inputs[0], [1, 0, 0, 0, 0, 0, 0]] }],
    ['a non-finite input', { ...ok, inputs: [[3, 0, 0, 0, NaN, 0, 0, 0]] }],
    ['no spawn', { ...ok, spawn: undefined }],
    ['no spawn s', { ...ok, spawn: { speed: 1 } }],
    ['no spawn speed', { ...ok, spawn: { s: 1 } }],
    ['no layers', { ...ok, layers: undefined }],
    ['layers not an object', { ...ok, layers: 'user' }],
  ])('rejects %s', (_, raw) => {
    expect(parseRecording(raw)).toBeUndefined();
  });
});
