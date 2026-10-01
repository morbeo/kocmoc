import { render } from 'preact';
import { vars } from '../core/vars';
import { isTyping } from '../core/dom';
import { Panel } from './Panel';
import { refreshSnapshots, flipAb } from './snapshots';
import './debug.css';

const root = document.createElement('div');
root.id = 'kocmoc-debug';
document.body.appendChild(root);

let open = false;

export function toggle(force = !open): void {
  open = force;
  render(open ? <Panel /> : null, root);
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'F2') {
    e.preventDefault();
    flipAb();
    return;
  }
  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyZ' && !isTyping(e)) {
    e.preventDefault();
    if (e.shiftKey) vars.history.redo();
    else vars.history.undo();
  }
});

void refreshSnapshots();
