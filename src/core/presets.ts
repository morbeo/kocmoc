import { valueEquals, type Layer, type LayerData, type Registry } from './vars';

export interface Preset {
  /** e.g. `visual/ink` */
  id: string;
  name: string;
  layer: Layer;
  desc?: string;
  vars: LayerData;
}

interface PresetFile {
  desc?: string;
  vars: LayerData;
}

// presets/<group>/<name>.json → layer `preset:<group>`
const files = import.meta.glob<PresetFile>('/presets/*/*.json', { eager: true, import: 'default' });

export const presets: Preset[] = Object.entries(files).map(([file, data]) => {
  const [group, name] = file.replace(/^\/presets\//, '').replace(/\.json$/, '').split('/');
  return { id: `${group}/${name}`, name, layer: `preset:${group}` as Layer, desc: data.desc, vars: data.vars };
});

export function applyPreset(registry: Registry, preset: Preset): void {
  registry.setLayer(preset.layer, preset.vars);
}

/** The preset whose values exactly match the layer's current contents, if any. */
export function activePreset(registry: Registry, layer: Layer): Preset | undefined {
  const current = registry.snapshot()[layer] ?? {};
  return presets.find((p) => {
    if (p.layer !== layer) return false;
    const keys = Object.keys(p.vars);
    return (
      keys.length === Object.keys(current).length && keys.every((k) => valueEquals(current[k], p.vars[k]))
    );
  });
}
