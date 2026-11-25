// The debug panel (backquote or ?debug), lazy-loaded.
import { isTyping } from '../core/dom';

let debug: Promise<typeof import('../debug')> | undefined;
export const openDebug = (force?: boolean) => (debug ??= import('../debug')).then((m) => m.toggle(force));

export function bindDebug(): void {
  addEventListener('keydown', (e) => {
    if (e.code === 'Backquote' && !(isTyping(e) && (e.target as HTMLElement).closest('#kocmoc-debug') === null)) {
      e.preventDefault();
      if (document.pointerLockElement) document.exitPointerLock();
      void openDebug();
    }
  });
  if (new URLSearchParams(location.search).has('debug')) void openDebug(true);
}
