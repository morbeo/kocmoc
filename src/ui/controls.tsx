import { render } from 'preact';
import { signal, computed } from '@preact/signals';
import { vars, type Var } from '../core/vars';
import { invert } from '../input/input';
import { BIND_PREFIX, SLOTS, actionLabel, conflicts, keyLabel, parseCodes, setSlot } from '../input/bindings';
import './controls.css';

/** Player-facing controls panel: rebind keys, invert pitch. Every setting is a var (user layer). */

const root = document.createElement('div');
root.id = 'controls';
document.body.appendChild(root);

/** slot waiting for a key press */
const listening = signal<{ path: string; slot: number } | null>(null);

const bindVars = computed(() => {
  vars.version.value;
  return vars.list().filter((v): v is Var<string> => v.type === 'str' && v.path.startsWith(BIND_PREFIX));
});
const clashes = computed(() => conflicts(Object.fromEntries(bindVars.value.map((v) => [v.path, v.value]))));

let open = false;
export function toggle(force = !open): void {
  open = force;
  listening.value = null;
  if (open && document.pointerLockElement) document.exitPointerLock();
  render(open ? <Panel /> : null, root);
}

// capture phase on window runs before every other key handler, so a key being bound never reaches the game
addEventListener(
  'keydown',
  (e) => {
    if (!open) return;
    const l = listening.value;
    if (!l) {
      if (e.code === 'Escape') toggle(false);
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.repeat) return;
    listening.value = null;
    if (e.code === 'Escape') return;
    const v = vars.get(l.path) as Var<string>;
    v.set(setSlot(v.value, l.slot, e.code === 'Backspace' || e.code === 'Delete' ? null : e.code));
  },
  { capture: true },
);

function KeySlot({ v, slot }: { v: Var<string>; slot: number }) {
  const code = parseCodes(v.value)[slot];
  const active = listening.value?.path === v.path && listening.value.slot === slot;
  const others = code ? clashes.value.get(code)?.filter((p) => p !== v.path) : undefined;
  const cls = ['key', active && 'listening', !code && 'empty', others && 'conflict'].filter(Boolean).join(' ');
  return (
    <button
      class={cls}
      title={others ? `also bound to ${others.map(actionLabel).join(', ')}` : code ?? 'unbound'}
      onClick={() => (listening.value = active ? null : { path: v.path, slot })}
    >
      {active ? 'press a key…' : code ? keyLabel(code) : '—'}
    </button>
  );
}

function Panel() {
  const binds = bindVars.value;
  const resetAll = () => {
    listening.value = null;
    for (const v of [...binds, invert.pointer, invert.keys]) vars.unset(v.path);
  };
  return (
    <div class="ctl-backdrop" onClick={(e) => e.target === e.currentTarget && toggle(false)}>
      <div class="ctl-panel" role="dialog" aria-label="Controls">
        <header>
          <h2>Controls</h2>
          <button class="close" onClick={() => toggle(false)} title="close (Esc)">
            ✕
          </button>
        </header>
        <section class="ctl-invert">
          <label>
            <input type="checkbox" checked={invert.pointer.value} onChange={(e) => invert.pointer.set(e.currentTarget.checked)} />
            Invert pitch (touchpad / mouse Y)
          </label>
          <label>
            <input type="checkbox" checked={invert.keys.value} onChange={(e) => invert.keys.set(e.currentTarget.checked)} />
            Invert pitch keys
          </label>
        </section>
        <table>
          <tbody>
            {binds.map((v) => (
              <tr key={v.path} data-action={v.path.slice(BIND_PREFIX.length)}>
                <th>{actionLabel(v.path)}</th>
                {Array.from({ length: SLOTS }, (_, i) => (
                  <td>
                    <KeySlot v={v} slot={i} />
                  </td>
                ))}
                <td>
                  {v.modified && (
                    <button class="reset" onClick={() => vars.unset(v.path)} title={`reset to ${parseCodes(v.def).map(keyLabel).join(', ')}`}>
                      ↺
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer>
          <span>
            Click a key to rebind · <kbd>Esc</kbd> cancel · <kbd>Backspace</kbd> clear
          </span>
          <button onClick={resetAll}>Reset all</button>
        </footer>
      </div>
    </div>
  );
}
