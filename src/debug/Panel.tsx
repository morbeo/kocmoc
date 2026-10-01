import { signal, computed } from '@preact/signals';
import { useEffect, useRef, useState } from 'preact/hooks';
import { vars, LAYERS, type Layer } from '../core/vars';
import { presets, applyPreset, activePreset } from '../core/presets';
import { shareUrl } from '../core/persist';
import { parseQuery, filterRows, type Row } from './query';
import { Editor, formatValue } from './editors';
import {
  snapshots,
  ab,
  saveSnapshot,
  deleteSnapshot,
  loadSnapshot,
  assignAb,
  exportJson,
  importJson,
} from './snapshots';

const FAVS_KEY = 'kocmoc.favs';
const query = signal(localStorage.getItem('kocmoc.query') ?? '');
const favs = signal<Set<string>>(new Set(JSON.parse(localStorage.getItem(FAVS_KEY) ?? '[]')));
/** bumps on any layer change: for UI that reads whole-layer state */
const layersVersion = signal(0);
vars.onChange(() => layersVersion.value++);
/** ~10 Hz tick that drives watch readouts */
const tick = signal(0);

function toggleFav(path: string): void {
  const next = new Set(favs.value);
  if (!next.delete(path)) next.add(path);
  favs.value = next;
  localStorage.setItem(FAVS_KEY, JSON.stringify([...next]));
}

const rows = computed<Row[]>(() => {
  vars.version.value;
  return [
    ...vars.list().map((v) => ({ kind: 'var' as const, path: v.path, tags: v.meta.tags ?? [], desc: v.meta.desc ?? '', v })),
    ...[...vars.watches.values()].map((w) => ({
      kind: 'watch' as const,
      path: w.path,
      tags: w.meta.tags ?? [],
      desc: w.meta.desc ?? '',
      w,
    })),
  ];
});

const matches = computed(() => {
  // `:mod` depends on values, so re-filter on layer changes too
  layersVersion.value;
  return filterRows(rows.value, parseQuery(query.value), favs.value);
});

function Highlight({ text, indexes }: { text: string; indexes: readonly number[] }) {
  if (!indexes.length) return <>{text}</>;
  const set = new Set(indexes);
  // group consecutive matched / unmatched chars into runs
  const runs: { hit: boolean; s: string }[] = [];
  [...text].forEach((ch, i) => {
    const hit = set.has(i);
    if (runs.at(-1)?.hit === hit) runs.at(-1)!.s += ch;
    else runs.push({ hit, s: ch });
  });
  return <>{runs.map((r) => (r.hit ? <b>{r.s}</b> : <span>{r.s}</span>))}</>;
}

const shortLayer = (s: string) => s.replace('preset:', '');

function VarRow({ row, indexes }: { row: Row; indexes: readonly number[] }) {
  const fav = favs.value.has(row.path);
  const title = row.desc || undefined;
  const star = (
    <button class={`star ${fav ? 'on' : ''}`} onClick={() => toggleFav(row.path)} title="favourite">
      {fav ? '★' : '☆'}
    </button>
  );
  if (row.kind === 'watch') {
    tick.value;
    return (
      <tr class="watch">
        <td>{star}</td>
        <td class="path" title={title}>
          <Highlight text={row.path} indexes={indexes} />
        </td>
        <td class="value" colSpan={4}>
          <code>{formatValue(row.w.read())}</code> {row.w.meta.unit && <span class="unit">{row.w.meta.unit}</span>}
        </td>
      </tr>
    );
  }
  const v = row.v;
  const source = v.source.value;
  return (
    <tr class={v.modified ? 'modified' : ''}>
      <td>{star}</td>
      <td class="path" title={title}>
        <Highlight text={row.path} indexes={indexes} />
        {v.meta.regen && <span class="badge">regen</span>}
      </td>
      <td class="value">
        <Editor v={v} />
      </td>
      <td class="default" title="default">
        {formatValue(v.def)}
      </td>
      <td>
        <span class={`layer layer-${source.replace(':', '-')}`}>{shortLayer(source)}</span>
      </td>
      <td>
        {vars.layerValue('user', v.path) !== undefined && (
          <button onClick={() => vars.unset(v.path)} title="remove user override">
            ↺
          </button>
        )}
      </td>
    </tr>
  );
}

function PresetPickers() {
  layersVersion.value;
  const layers = LAYERS.filter((l) => presets.some((p) => p.layer === l));
  return (
    <>
      {layers.map((layer) => {
        const active = activePreset(vars, layer);
        const empty = !vars.snapshot()[layer];
        return (
          <label class="preset">
            {shortLayer(layer)}
            <select
              value={active?.id ?? (empty ? '' : '*')}
              onChange={(e) => {
                const id = e.currentTarget.value;
                const p = presets.find((x) => x.id === id);
                if (p) applyPreset(vars, p);
                else if (id === '') vars.setLayer(layer as Layer, {});
              }}
            >
              <option value="">none</option>
              {!active && !empty && <option value="*">custom</option>}
              {presets
                .filter((p) => p.layer === layer)
                .map((p) => (
                  <option value={p.id} title={p.desc}>
                    {p.name}
                  </option>
                ))}
            </select>
          </label>
        );
      })}
    </>
  );
}

function Snapshots() {
  const { a, b, current } = ab.value;
  return (
    <div class="snapshots">
      <button
        onClick={() => {
          const name = prompt('Snapshot name', new Date().toLocaleString());
          if (name) void saveSnapshot(name);
        }}
      >
        + snapshot
      </button>
      <span class="hint">F2 flips A/B</span>
      {snapshots.value.map((s) => (
        <div class="snap">
          <span class="name" title={new Date(s.time).toLocaleString()}>
            {s.name}
          </span>
          <button onClick={() => loadSnapshot(s.id)}>load</button>
          <button class={a === s.id ? 'on' : ''} onClick={() => assignAb('a', s.id)}>
            A{a === s.id && current === 'a' ? '•' : ''}
          </button>
          <button class={b === s.id ? 'on' : ''} onClick={() => assignAb('b', s.id)}>
            B{b === s.id && current === 'b' ? '•' : ''}
          </button>
          <button onClick={() => confirm(`Delete snapshot "${s.name}"?`) && void deleteSnapshot(s.id)}>×</button>
        </div>
      ))}
    </div>
  );
}

function Toolbar() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState('');
  const flash = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(''), 1500);
  };
  return (
    <div class="toolbar">
      <div class="row">
        <button disabled={!vars.history.canUndo.value} onClick={() => vars.history.undo()} title="Ctrl/Cmd+Z">
          undo
        </button>
        <button disabled={!vars.history.canRedo.value} onClick={() => vars.history.redo()} title="Ctrl/Cmd+Shift+Z">
          redo
        </button>
        <button onClick={() => confirm('Remove all user overrides?') && vars.setLayer('user', {})}>reset user</button>
        <span class="spacer" />
        <button
          onClick={() => navigator.clipboard.writeText(shareUrl(vars)).then(() => flash('link copied'))}
          title="copy a link with the full current setup"
        >
          share
        </button>
        <button onClick={exportJson}>export</button>
        <button onClick={() => fileInput.current?.click()}>import</button>
        <input
          ref={fileInput}
          type="file"
          accept=".json,application/json"
          hidden
          onChange={async (e) => {
            const file = e.currentTarget.files?.[0];
            e.currentTarget.value = '';
            if (file) flash((await importJson(file)) ? 'imported' : 'invalid file');
          }}
        />
        {status && <span class="status">{status}</span>}
      </div>
      <div class="row">
        <PresetPickers />
      </div>
      <details>
        <summary>snapshots ({snapshots.value.length})</summary>
        <Snapshots />
      </details>
    </div>
  );
}

export function Panel() {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    input.current?.focus();
    const id = setInterval(() => tick.value++, 100);
    return () => clearInterval(id);
  }, []);
  const list = matches.value;
  return (
    <div class="kd-panel">
      <Toolbar />
      <input
        ref={input}
        class="search"
        placeholder="search…  #tag  :mod  :fav  :watch"
        value={query.value}
        onInput={(e) => {
          query.value = e.currentTarget.value;
          localStorage.setItem('kocmoc.query', query.value);
        }}
      />
      <div class="count">
        {list.length} / {rows.value.length}
      </div>
      <div class="table-wrap">
        <table>
          <tbody>
            {list.map((m) => (
              <VarRow key={m.row.path} row={m.row} indexes={m.indexes} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
