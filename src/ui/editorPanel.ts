import { describeProblem, type Problem } from '../gen/record';
import type { TrackDoc } from '../gen/trackDoc';

export const EDIT_CAMS = ['orbit', 'fly', 'top', 'side'] as const;
export type EditCam = (typeof EDIT_CAMS)[number];

/** What the editor panel shows. */
export interface PanelView {
  doc: TrackDoc;
  /** track length, m */
  length: number;
  /** selected point indices, ascending */
  selection: number[];
  problems: readonly Problem[];
  cam: EditCam;
  view: string;
  canUndo: boolean;
  canRedo: boolean;
  /** differs from the track as opened */
  changed: boolean;
  notice: string;
}
/** Key labels for the buttons. */
export type PanelKeys = Record<'edit' | 'focus' | 'frame' | 'insert' | 'remove' | 'rollLeft' | 'rollRight' | 'smooth' | 'camera' | 'record' | 'wider' | 'narrower', string>;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const km = (m: number) => (m >= 1000 ? `${(m / 1000).toFixed(2)} km` : `${m.toFixed(0)} m`);
const deg = (r: number) => (r * 180) / Math.PI;

/** The editor panel's HTML. */
export function panelHtml(v: PanelView, k: PanelKeys): string {
  const sel = v.selection;
  const one = sel.length === 1 ? v.doc.points[sel[0]] : null;
  const first = sel.length ? v.doc.points[sel[0]] : null;
  const cam = v.cam;
  const camBtns = EDIT_CAMS.map((c) => `<button data-cam="${c}"${c === cam ? ' class="on"' : ''}>${c}</button>`).join('');
  const viewBtns = (['ghost', 'solid'] as const).map((x) => `<button data-view="${x}"${x === v.view ? ' class="on"' : ''}>${x}</button>`).join('');
  const selText = !sel.length ? 'No point selected. Click one.' : one ? `Point ${sel[0] + 1} of ${v.doc.points.length}` : `${sel.length} points`;
  const probs = v.problems.length
    ? `<ul class="ed-problems">${v.problems.map((p, i) => `<li><button data-problem="${i}">${esc(describeProblem(p))}</button></li>`).join('')}</ul>`
    : '<p class="ed-ok">Passes the checks: no tight bends, the tube never touches itself.</p>';
  return `
    <div class="ed-panel" role="dialog" aria-label="Track editor">
      <header><h2>Track editor</h2><button class="ed-close" data-a="close" title="close and fly it (${esc(k.edit)})">×</button></header>
      <label class="ed-title">Name <input type="text" maxlength="80" data-f="title" value="${esc(v.doc.title ?? '')}" placeholder="Untitled track"></label>
      <div class="ed-row"><span>Camera</span><span class="ed-seg">${camBtns}</span><small>${esc(k.camera)}</small></div>
      <div class="ed-row"><span>View</span><span class="ed-seg">${viewBtns}</span></div>
      <section class="ed-sel">
        <p>${selText}</p>
        ${
          first
            ? `<div class="ed-fields">
            <label>Roll <input type="number" step="1" data-f="roll" value="${deg(first.roll ?? 0).toFixed(1)}">°</label>
            <label>Radius <input type="number" step="1" min="3" max="1000" data-f="radius" value="${(first.r ?? v.doc.radius).toFixed(1)}"> m</label>
          </div>`
            : ''
        }
        <div class="ed-btns">
          <button data-a="insert"${one ? '' : ' disabled'} title="add a point after this one (${esc(k.insert)}); or double-click the line">Insert ${esc(k.insert)}</button>
          <button data-a="delete"${sel.length ? '' : ' disabled'}>Delete ${esc(k.remove)}</button>
          <button data-a="smooth"${sel.length ? '' : ' disabled'}>Smooth ${esc(k.smooth)}</button>
          <button data-a="focus">Focus ${esc(k.focus)}</button>
          <button data-a="frame">Whole track ${esc(k.frame)}</button>
        </div>
      </section>
      <p class="ed-facts">${v.doc.closed ? 'Loop' : 'Point to point'}, ${km(v.length)}, ${v.doc.points.length} points, tube ${v.doc.radius} m</p>
      ${probs}
      <div class="ed-btns">
        <button data-a="undo"${v.canUndo ? '' : ' disabled'} title="Ctrl/Cmd+Z">Undo</button>
        <button data-a="redo"${v.canRedo ? '' : ' disabled'} title="Ctrl/Cmd+Shift+Z">Redo</button>
        <button data-a="revert"${!v.changed ? ' disabled' : ''}>Revert</button>
      </div>
      <div class="ed-btns">
        <button data-a="close" class="go">Fly it ${esc(k.edit)}</button>
        <button data-a="save">Save to My tracks</button>
        <button data-a="download">Download</button>
        ${cam === 'fly' ? `<button data-a="record">Record from here ${esc(k.record)}</button>` : ''}
      </div>
      <p class="ed-msg" aria-live="polite">${esc(v.notice)}</p>
    </div>`;
}

/** The hint line at the bottom for each camera. */
export function helpText(cam: EditCam): string {
  return cam === 'fly'
    ? 'Fly: thrust, strafe and turn keys as in flight, hold the right button to look, wheel for speed · click a point to select it'
    : cam === 'orbit'
      ? 'Drag to orbit · right-drag to pan · wheel to zoom · click a point to select, shift-click to add · drag the arrows to move · double-click the line to add a point'
      : 'Drag to pan · right-drag to spin · wheel to zoom · click a point to select, shift-click to add · drag the arrows to move';
}
