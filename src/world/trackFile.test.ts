import { afterEach, describe, expect, it } from 'vitest';
import { vars } from '../core/vars';
import { applyScenario, captureScenario, parseScenario, scenarioLayer, trackScenario } from '../core/scenarios';
import { serializeTrackDoc } from '../gen/trackDoc';
import { authored, track, trackDoc } from './race';
import { gauntlet } from './gauntlet';
import { pads } from './pads';
import { bestKey } from './records';
import { bakeCurrent, clearTrackFile, loadTrackDoc, lookVars, trackFromHash, trackShareUrl } from './trackFile';

const touched = new Set<string>();
const set = (path: string, value: unknown) => {
  touched.add(path);
  vars.set(path, value);
};
afterEach(() => {
  for (const p of touched) vars.unset(p);
  touched.clear();
  clearTrackFile();
  for (const [p] of Object.entries(vars.snapshot().scenario ?? {})) vars.unset(p, 'scenario');
});

/** A quick race course with a fork, sections, hazards and pads. */
const course = () => {
  const vals: Record<string, unknown> = {
    'game.mode': 'race', 'gen.race.seed': 4, 'gen.race.points': 10, 'gen.race.radius': 1000, 'gen.race.tubeRadius': 40, 'gen.race.spacing': 8,
    'gen.race.forks': 1, 'gen.race.pitLane': false, 'gen.race.route.saveMin': 0, 'gen.race.route.saveMax': 1, 'gen.race.route.costMax': 1,
    'gen.race.sections': 2, 'gen.race.sectionKinds': 'hex,cavern', 'gen.race.sectionMin': 300, 'gen.race.sectionMax': 500,
    'gen.race.hazards': 3, 'gen.race.hazardKinds': 'iris,shutter', 'gen.race.boostPads': 2, 'gen.race.slowFields': 1,
    'render.track.color': '#123456',
  };
  for (const [k, v] of Object.entries(vals)) set(k, v);
};

describe('track files in the game', () => {
  it('a baked course loads back as the same course, under its own best-lap key', { timeout: 30_000 }, () => {
    course();
    const gen = track.value;
    const genPlanes = gauntlet.value!.planes.map((p) => p.s);
    const genPads = pads.value.map((p) => p.s0);
    const genKey = bestKey();
    const doc = bakeCurrent('Test course');
    expect(doc.vars?.['render.track.color']).toBe('#123456');
    expect(doc.vars?.['gen.race.points']).toBeUndefined();
    expect(doc.seed).toBe(4);

    loadTrackDoc(doc);
    expect(trackDoc.value?.title).toBe('Test course');
    const t = track.value;
    expect(t).toBe(authored.value!.track);
    expect(t.pos.length).toBe(gen.pos.length);
    expect(Math.abs(t.length - gen.length)).toBeLessThan(0.5);
    expect(t.branches?.length).toBe(gen.branches?.length);
    expect(t.sections?.map((x) => x.kind)).toEqual(gen.sections?.map((x) => x.kind));
    gauntlet.value!.planes.forEach((p, k) => expect(Math.abs(p.s - genPlanes[k])).toBeLessThan(0.5));
    pads.value.forEach((p, k) => expect(Math.abs(p.s0 - genPads[k])).toBeLessThan(0.5));
    // its look came with it; the generator's vars no longer matter
    expect(vars.get('render.track.color')?.value).toBe('#123456');
    const key = bestKey();
    expect(key).toMatch(/^kocmoc\.best\.track\.[0-9a-f]{8}\|race/);
    expect(key).not.toBe(genKey);
    set('gen.race.points', 30);
    expect(track.value).toBe(t);
    expect(bestKey()).toBe(key);
  });

  it('gauntlet mode flies the bare line of a file, with its own obstacles', () => {
    course();
    loadTrackDoc(bakeCurrent());
    set('game.mode', 'gauntlet');
    expect(track.value.branches).toBeUndefined();
    expect(track.value.sections).toBeUndefined();
    expect(gauntlet.value?.chunks.length).toBeGreaterThan(0);
    expect(pads.value).toEqual([]);
  });

  it('going back to generated restores the generated course', () => {
    course();
    const gen = track.value;
    loadTrackDoc(bakeCurrent());
    expect(track.value).not.toBe(gen);
    clearTrackFile();
    expect(trackDoc.value).toBeNull();
    expect(track.value.length).toBeCloseTo(gen.length);
  });

  it('a scenario without a track file replaces one loaded by hand', () => {
    course();
    const doc = bakeCurrent();
    vars.set('gen.race.track', serializeTrackDoc(doc));
    expect(trackDoc.value).not.toBeNull();
    applyScenario(vars, { name: 'plain', mode: 'race', vars: {} });
    expect(trackDoc.value).toBeNull();
  });

  it('a link carries the file', () => {
    course();
    const doc = bakeCurrent('Linked');
    const url = trackShareUrl(doc, 'https://example.com/kocmoc/?seed=4#s=old');
    expect(url).toMatch(/^https:\/\/example\.com\/kocmoc\/#t=/);
    expect(trackFromHash(new URL(url).hash)).toEqual(doc);
    expect(trackFromHash('#t=garbage')).toBeUndefined();
    expect(trackFromHash('#s=x')).toBeUndefined();
  });

  it('scenarios carry a track file inline, and capture it whole', () => {
    course();
    const doc = bakeCurrent('Inline');
    const sc = parseScenario(JSON.parse(JSON.stringify(trackScenario(doc, 'inline'))))!;
    expect(sc.track).toEqual(doc);
    const layer = scenarioLayer(sc);
    expect(layer['gen.race.track']).toBe(serializeTrackDoc(doc));
    expect(layer['render.track.color']).toBe('#123456');
    expect(layer['gen.race.seed']).toBe(4);
    applyScenario(vars, sc);
    const cap = captureScenario(vars, 'again', { trackT: 0, speed: 0 });
    expect(cap.track).toEqual(doc);
    expect(cap.vars?.['gen.race.track']).toBeUndefined();
  });

  it('a bake leaves out the generator and the mode', () => {
    course();
    const look = lookVars();
    expect(look['render.track.color']).toBe('#123456');
    expect(look['game.mode']).toBeUndefined();
    expect(Object.keys(look).some((k) => k.startsWith('gen.race.') && k !== 'gen.race.profile' && !k.startsWith('gen.race.cavern'))).toBe(false);
  });
});
