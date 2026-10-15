/** Pure helpers for key bindings stored as comma-separated KeyboardEvent.code strings. */

export const BIND_PREFIX = 'input.key.';
/** Keys an action can hold: primary + alternate. */
export const SLOTS = 2;

/** Human names for `input.key.<action>` vars; unknown actions fall back to the action id. */
export const ACTION_LABELS: Record<string, string> = {
  forward: 'Thrust',
  back: 'Reverse',
  left: 'Strafe left',
  right: 'Strafe right',
  up: 'Up',
  down: 'Down',
  pitchUp: 'Pitch up',
  pitchDown: 'Pitch down',
  yawLeft: 'Yaw left',
  yawRight: 'Yaw right',
  rollLeft: 'Roll left',
  rollRight: 'Roll right',
  boost: 'Boost',
  assist: 'Flight assist',
  camera: 'Cycle camera',
  inputViz: 'Input visualizer',
  controls: 'Controls panel',
};

export const actionOf = (path: string) => path.slice(BIND_PREFIX.length);
export const actionLabel = (path: string) => ACTION_LABELS[actionOf(path)] ?? actionOf(path);

export function parseCodes(s: string): string[] {
  return s
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);
}

/** Put `code` into `slot` (or clear it with `null`). A code already in another slot swaps places. */
export function setSlot(codes: string, slot: number, code: string | null): string {
  const list = parseCodes(codes);
  if (code === null) list.splice(slot, 1);
  else if (slot >= list.length) {
    if (!list.includes(code)) list.push(code);
  } else {
    const at = list.indexOf(code);
    if (at >= 0) list[at] = list[slot];
    list[slot] = code;
  }
  return list.join(',');
}

/** code → actions bound to it, only for codes bound to more than one action. */
export function conflicts(bindings: Record<string, string>): Map<string, string[]> {
  const byCode = new Map<string, string[]>();
  for (const [action, codes] of Object.entries(bindings)) {
    for (const c of new Set(parseCodes(codes))) byCode.set(c, [...(byCode.get(c) ?? []), action]);
  }
  for (const [c, actions] of byCode) if (actions.length < 2) byCode.delete(c);
  return byCode;
}

const NAMED: Record<string, string> = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  Backquote: '`',
  Minus: '-',
  Equal: '=',
  BracketLeft: '[',
  BracketRight: ']',
  Backslash: '\\',
  Semicolon: ';',
  Quote: "'",
  Comma: ',',
  Period: '.',
  Slash: '/',
};

/** Short display name for a KeyboardEvent.code: `KeyW` → `W`, `ShiftLeft` → `L Shift`. */
export function keyLabel(code: string): string {
  if (NAMED[code]) return NAMED[code];
  let m = /^(?:Key|Digit)(.)$/.exec(code);
  if (m) return m[1];
  m = /^Numpad(.+)$/.exec(code);
  if (m) return `Num ${m[1]}`;
  m = /^(Shift|Control|Alt|Meta)(Left|Right)$/.exec(code);
  if (m) return `${m[2][0]} ${m[1] === 'Control' ? 'Ctrl' : m[1]}`;
  return code;
}
