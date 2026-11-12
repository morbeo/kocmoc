import { effect } from '@preact/signals-core';
import { keyLabel } from '../input/bindings';

/**
 * A corner button labelled with its first key binding ("Levels (L)"), kept up to date as the
 * binding changes. A click blurs it first so Space doesn't click it again.
 */
export function keyButton(id: string, label: string, key: { value: string }, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.id = id;
  btn.addEventListener('click', () => {
    btn.blur();
    onClick();
  });
  document.body.appendChild(btn);
  effect(() => {
    const codes = key.value.split(',').filter(Boolean);
    btn.textContent = codes.length ? `${label} (${keyLabel(codes[0].trim())})` : label;
  });
  return btn;
}
