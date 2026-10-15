import { describe, it, expect, vi } from 'vitest';
import { Registry } from './vars';
import { parseScenario, scenarioLayer, applyScenario, captureScenario, setSpawnHandler } from './scenarios';

describe('parseScenario', () => {
  it('accepts a full scenario and drops junk', () => {
    const sc = parseScenario({
      name: 'x',
      mode: 'race',
      seed: 4815.4,
      spawn: { trackT: 0.42, speed: 200, junk: 1 },
      vars: { 'a.b': 1 },
      presets: ['feel/drifty', 3],
      extra: true,
    });
    expect(sc).toEqual({ name: 'x', mode: 'race', seed: 4815, spawn: { trackT: 0.42, speed: 200 }, vars: { 'a.b': 1 }, presets: ['feel/drifty'] });
  });

  it('rejects things that are not scenarios', () => {
    expect(parseScenario(null)).toBeUndefined();
    expect(parseScenario([1])).toBeUndefined();
    expect(parseScenario({ user: { a: 1 } })).toBeUndefined(); // an exported layers file
    expect(parseScenario({ mode: 'bogus' })).toEqual({ name: 'dropped' });
  });
});

describe('applying and capturing', () => {
  it('mode and seed go into the scenario layer as vars', () => {
    expect(scenarioLayer({ name: 'x', mode: 'free', seed: 7, vars: { 'a': 1 } })).toEqual({ a: 1, 'game.mode': 'free', 'gen.race.seed': 7 });
  });

  it('apply replaces the scenario layer in one undo step and respawns', () => {
    const r = new Registry();
    const seed = r.int('gen.race.seed', 1);
    const tw = r.num('gen.race.twist', 0);
    r.set('gen.race.twist', 3, 'scenario');
    const spawn = vi.fn();
    setSpawnHandler(spawn);
    applyScenario(r, { name: 's', seed: 99, spawn: { trackT: 0.5, speed: 120 } });
    expect(seed.value).toBe(99);
    expect(tw.value).toBe(0); // old scenario values are gone
    expect(spawn).toHaveBeenCalledWith({ trackT: 0.5, speed: 120 });
    r.history.undo();
    expect(seed.value).toBe(1);
    expect(tw.value).toBe(3);
  });

  it('loading a scenario drops user overrides of the values it sets, keeps the rest', () => {
    const r = new Registry();
    const seed = r.int('gen.race.seed', 1);
    const fov = r.num('cam.fov', 70);
    r.set('gen.race.seed', 5);
    r.set('cam.fov', 90);
    setSpawnHandler(() => {});
    applyScenario(r, { name: 's', seed: 77 });
    expect(seed.value).toBe(77);
    expect(fov.value).toBe(90);
    r.history.undo();
    expect(seed.value).toBe(5);
  });

  it('capture round-trips through apply', () => {
    const r = new Registry();
    r.int('gen.race.seed', 1);
    r.enum('game.mode', 'race', ['race', 'free']);
    r.num('ship.thrust', 60);
    r.set('gen.race.seed', 42);
    r.set('ship.thrust', 90);
    const sc = captureScenario(r, 'mine', { trackT: 0.123456, speed: 87.6 });
    expect(sc).toMatchObject({ name: 'mine', mode: 'race', seed: 42, spawn: { trackT: 0.1235, speed: 88 }, vars: { 'ship.thrust': 90 } });

    const r2 = new Registry();
    const seed2 = r2.int('gen.race.seed', 1);
    const thrust2 = r2.num('ship.thrust', 60);
    setSpawnHandler(() => {});
    applyScenario(r2, sc);
    expect(seed2.value).toBe(42);
    expect(thrust2.value).toBe(90);
    expect(thrust2.source.value).toBe('scenario');
  });
});
