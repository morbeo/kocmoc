/** True when a key event targets a text field, so global hotkeys and game input should ignore it. */
export function isTyping(e: KeyboardEvent): boolean {
  const t = e.target as HTMLElement | null;
  if (!t) return false;
  if (t.isContentEditable || t.tagName === 'TEXTAREA') return true;
  return t.tagName === 'INPUT' && ['text', 'search', 'number'].includes((t as HTMLInputElement).type);
}
