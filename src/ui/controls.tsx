import { render } from 'preact';
import { signal, computed } from '@preact/signals';
import { vars, type Var } from '../core/vars';
import { invert } from '../input/input';
import { BIND_PREFIX, SLOTS, actionLabel, conflicts, keyLabel, parseCodes, setSlot } from '../input/bindings';
import { PAD_PREFIX, bindingValue, detectPress, padCapture, padLabels, padName, padVars, rawPad, type PadState } from '../input/pad';
import './controls.css';

/** Player-facing controls panel: rebind keys and gamepad, invert pitch, pad deadzone. Every setting is a var (user layer). */

const root = document.createElement('div');
root.id = 'controls';
document.body.appendChild(root);

/** slot waiting for a key press */
const listening = signal<{ path: string; slot: number } | null>(null);

const bindVars = computed(() => {
  void vars.version.value;
  return vars.list().filter((v): v is Var<string> => v.type === 'str' && v.path.startsWith(BIND_PREFIX));
});
const clashes = computed(() => conflicts(Object.fromEntries(bindVars.value.map((v) => [v.path, v.value]))));
const padOf = (v: Var<string>) => vars.get(v.path.replace(BIND_PREFIX, PAD_PREFIX)) as Var<string> | undefined;
const padBinds = computed(() => bindVars.value.map(padOf).filter((v): v is Var<string> => !!v));
const padClashes = computed(() => conflicts(Object.fromEntries(padBinds.value.map((v) => [v.path, v.value]))));

/** pad binding waiting for a button or stick push */
const padListening = signal<string | null>(null);
let padFrame = 0;
function listenPad(path: string | null): void {
  cancelAnimationFrame(padFrame);
  padListening.value = path;
  padCapture.on = path !== null;
  if (path === null) return;
  const before: PadState = { axes: rawPad.axes.slice(), buttons: rawPad.buttons.slice() };
  const tick = () => {
    const src = detectPress(before, rawPad);
    if (src) {
      (vars.get(path) as Var<string>).set(src);
      // keep the game deaf to the pad until the press is let go
      padListening.value = null;
      const release = () => (bindingValue(rawPad, src) > 0.3 ? (padFrame = requestAnimationFrame(release)) : (padCapture.on = false));
      padFrame = requestAnimationFrame(release);
      return;
    }
    padFrame = requestAnimationFrame(tick);
  };
  padFrame = requestAnimationFrame(tick);
}

let open = false;
export function toggle(force = !open): void {
  open = force;
  listening.value = null;
  if (padListening.value) listenPad(null);
  if (open && document.pointerLockElement) document.exitPointerLock();
  render(open ? <Panel /> : null, root);
}

// capture phase on window runs before every other key handler, so a key being bound never reaches the game
addEventListener(
  'keydown',
  (e) => {
    if (!open) return;
    const pl = padListening.value;
    if (pl) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (e.code === 'Backspace' || e.code === 'Delete') (vars.get(pl) as Var<string>).set('');
      if (e.code === 'Escape' || e.code === 'Backspace' || e.code === 'Delete') listenPad(null);
      return;
    }
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
      onClick={() => {
        if (padListening.value) listenPad(null);
        listening.value = active ? null : { path: v.path, slot };
      }}
    >
      {active ? 'press a key…' : code ? keyLabel(code) : '—'}
    </button>
  );
}

function PadSlot({ v }: { v: Var<string> }) {
  const active = padListening.value === v.path;
  const srcs = parseCodes(v.value);
  const others = srcs.flatMap((s) => padClashes.value.get(s) ?? []).filter((p) => p !== v.path);
  const cls = ['key', 'pad', active && 'listening', !srcs.length && 'empty', others.length && 'conflict'].filter(Boolean).join(' ');
  return (
    <button
      class={cls}
      title={others.length ? `also bound to ${[...new Set(others)].map(actionLabel).join(', ')}` : v.value || 'unbound'}
      onClick={() => {
        listening.value = null;
        listenPad(active ? null : v.path);
      }}
    >
      {active ? 'press / push…' : srcs.length ? padLabels(v.value) : '—'}
    </button>
  );
}

function Panel() {
  const binds = bindVars.value;
  const resetAll = () => {
    listening.value = null;
    listenPad(null);
    for (const v of [...binds, ...padBinds.value, invert.pointer, invert.keys, invert.pad, padVars.deadzone]) vars.unset(v.path);
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
          <label>
            <input type="checkbox" checked={invert.pad.value} onChange={(e) => invert.pad.set(e.currentTarget.checked)} />
            Invert pitch (gamepad)
          </label>
          <label class="ctl-dz">
            Gamepad deadzone
            <input
              type="range"
              min={0}
              max={0.5}
              step={0.01}
              value={padVars.deadzone.value}
              onInput={(e) => padVars.deadzone.set(Number(e.currentTarget.value))}
            />
            <output>{Math.round(padVars.deadzone.value * 100)}%</output>
          </label>
          <p class="ctl-pad">{padName.value ? `Gamepad: ${padName.value}` : 'No gamepad yet: press a button on it to connect'}</p>
        </section>
        <table>
          <thead>
            <tr>
              <th />
              <th>Key</th>
              <th>Alt</th>
              <th>Pad</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {binds.map((v) => {
              const pv = padOf(v);
              const modified = v.modified || pv?.modified;
              const reset = () => [v, pv].forEach((x) => x && vars.unset(x.path));
              const defs = parseCodes(v.def).map(keyLabel).join(', ') + (pv?.def ? ` · ${padLabels(pv.def)}` : '');
              return (
                <tr key={v.path} data-action={v.path.slice(BIND_PREFIX.length)}>
                  <th>{actionLabel(v.path)}</th>
                  {Array.from({ length: SLOTS }, (_, i) => (
                    <td>
                      <KeySlot v={v} slot={i} />
                    </td>
                  ))}
                  <td>{pv && <PadSlot v={pv} />}</td>
                  <td>
                    {modified && (
                      <button class="reset" onClick={reset} title={`reset to ${defs}`}>
                        ↺
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <footer>
          <span>
            Click a slot to rebind · <kbd>Esc</kbd> cancel · <kbd>Backspace</kbd> clear
          </span>
          <button onClick={resetAll}>Reset all</button>
        </footer>
      </div>
    </div>
  );
}
