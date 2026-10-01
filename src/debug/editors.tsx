import type { Var, Vec3 } from '../core/vars';

function autoStep(v: Var<number>): number {
  const { min, max, step } = v.meta;
  if (step) return step;
  if (min !== undefined && max !== undefined) return (max - min) / 200;
  return Math.abs(v.def) >= 10 ? 1 : 0.01;
}

/** Wheel over a number nudges it; Shift for fine steps. */
function onWheelNudge(e: WheelEvent, value: number, step: number, apply: (n: number) => void): void {
  e.preventDefault();
  const s = e.shiftKey ? step / 10 : step;
  const dir = Math.sign(-e.deltaY || e.deltaX);
  apply(+(value + dir * s).toFixed(6));
}

function NumberEditor({ v }: { v: Var<number> }) {
  const value = v.sig.value;
  const step = autoStep(v);
  const { min, max } = v.meta;
  const apply = (n: number) => Number.isFinite(n) && v.set(n);
  return (
    <span class="ed-num">
      {min !== undefined && max !== undefined && (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={(e) => apply(+e.currentTarget.value)}
        />
      )}
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => apply(+e.currentTarget.value)}
        onWheel={(e) => onWheelNudge(e, value, step, apply)}
      />
      {v.meta.unit && <span class="unit">{v.meta.unit}</span>}
    </span>
  );
}

function Vec3Editor({ v }: { v: Var<Vec3> }) {
  const value = v.sig.value;
  const step = v.meta.step ?? 0.1;
  const apply = (i: number, n: number) => {
    if (!Number.isFinite(n)) return;
    const next = [...value] as Vec3;
    next[i] = n;
    v.set(next);
  };
  return (
    <span class="ed-vec3">
      {value.map((c, i) => (
        <input
          type="number"
          step={step}
          value={c}
          onChange={(e) => apply(i, +e.currentTarget.value)}
          onWheel={(e) => onWheelNudge(e, c, step, (n) => apply(i, n))}
        />
      ))}
    </span>
  );
}

export function Editor({ v }: { v: Var }) {
  switch (v.type) {
    case 'num':
    case 'int':
      return <NumberEditor v={v as Var<number>} />;
    case 'bool':
      return (
        <input type="checkbox" checked={v.sig.value as boolean} onChange={(e) => v.set(e.currentTarget.checked)} />
      );
    case 'enum': {
      const options = v.meta.options ?? [];
      return (
        <select
          value={String(v.sig.value)}
          onChange={(e) => {
            const picked = options.find((o) => String(o) === e.currentTarget.value);
            if (picked !== undefined) v.set(picked);
          }}
        >
          {options.map((o) => (
            <option value={String(o)}>{String(o)}</option>
          ))}
        </select>
      );
    }
    case 'color':
      return (
        <span class="ed-color">
          <input type="color" value={v.sig.value as string} onInput={(e) => v.set(e.currentTarget.value)} />
          <code>{v.sig.value as string}</code>
        </span>
      );
    case 'vec3':
      return <Vec3Editor v={v as Var<Vec3>} />;
    case 'str':
      return <input type="text" value={v.sig.value as string} onChange={(e) => v.set(e.currentTarget.value)} />;
  }
}

export function formatValue(value: unknown): string {
  if (typeof value === 'number') return Number.isInteger(value) ? String(value) : value.toFixed(3);
  if (Array.isArray(value)) return value.map(formatValue).join(', ');
  return String(value);
}
