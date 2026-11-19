import { afterEach, describe, expect, it } from 'vitest';
import { vars } from './vars';
import { presets } from './presets';
import { scenarios, venues } from './scenarios';
import { levelScenario } from './ladder';
import { currentShip, currentVenue, playLevel } from './selection';

const clear = () => {
  for (const layer of ['user', 'scenario', 'preset:feel'] as const) {
    for (const path of Object.keys(vars.snapshot()[layer] ?? {})) vars.unset(path, layer);
  }
};
afterEach(clear);

const ship = (name: string) => presets.find((p) => p.id === `feel/${name}`)!;
const aShipVar = () => Object.keys(ship('balanced').vars)[0];

describe('currentShip', () => {
  it('is balanced with no ship preset loaded', () => {
    expect(currentShip()).toBe('balanced');
  });

  it('names the loaded ship preset', () => {
    vars.setLayer('preset:feel', ship('light').vars);
    expect(currentShip()).toBe('light');
  });

  it('is null once a ship var is tuned by hand', () => {
    vars.set(aShipVar(), 1);
    expect(currentShip()).toBeNull();
  });

  it('is null when the preset layer was edited', () => {
    vars.setLayer('preset:feel', { ...ship('heavy').vars, [aShipVar()]: 1 });
    expect(currentShip()).toBeNull();
  });
});

describe('playLevel', () => {
  it('loads the level in the chosen ship and drops your tuning of that ship', () => {
    vars.set(aShipVar(), 1);
    vars.set('cam.fov', 60); // not a ship var: kept
    playLevel(2, 'heavy');
    expect(currentShip()).toBe('heavy');
    expect(vars.snapshot().user?.[aShipVar()]).toBeUndefined();
    expect(vars.snapshot().user?.['cam.fov']).toBe(60);
    expect(vars.snapshot().scenario?.['game.mode']).toBe(levelScenario(2, scenarios)!.mode);
    vars.unset('cam.fov');
  });

  it('does nothing for an unknown ship', () => {
    playLevel(1, 'nope');
    expect(vars.snapshot().scenario ?? {}).toEqual({});
  });
});

describe('currentVenue', () => {
  it('is null with no scenario loaded', () => {
    expect(currentVenue()).toBeNull();
  });

  it('names a venue loaded as it ships, and forgets it once changed', () => {
    const v = venues()[0];
    vars.setLayer('scenario', { ...v.vars, ...(v.mode ? { 'game.mode': v.mode } : {}), ...(v.seed !== undefined ? { 'gen.race.seed': v.seed } : {}) });
    expect(currentVenue()).toBe(v.name);
    vars.set('gen.race.seed', 12345, 'scenario');
    expect(currentVenue()).toBeNull();
  });
});
