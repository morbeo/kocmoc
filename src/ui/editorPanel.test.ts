import { describe, it, expect } from 'vitest';
import { helpText, panelHtml, EDIT_CAMS, type PanelKeys, type PanelView } from './editorPanel';
import { parseTrackDoc, TRACK_KIND } from '../gen/trackDoc';

const doc = parseTrackDoc({
  kind: TRACK_KIND,
  version: 1,
  closed: true,
  title: 'Glass <Loop>',
  seed: 1,
  radius: 40,
  points: [
    { p: [0, 0, 0], roll: Math.PI / 6 },
    { p: [400, 0, 0], r: 55 },
    { p: [400, 0, 400] },
    { p: [0, 0, 400] },
  ],
})!;
const keys: PanelKeys = { edit: 'G', focus: '.', frame: 'Home', insert: 'I', remove: 'Del', rollLeft: ';', rollRight: "'", smooth: 'M', camera: 'V', record: 'J', wider: ']', narrower: '[' };
const view = (o: Partial<PanelView> = {}): PanelView => ({ doc, length: 1600, selection: [], problems: [], cam: 'orbit', view: 'ghost', canUndo: false, canRedo: false, changed: false, notice: '', ...o });

describe('editor panel', () => {
  it('with nothing selected: help to click, point buttons off, checks pass', () => {
    const h = panelHtml(view(), keys);
    expect(h).toContain('No point selected');
    expect(h).toContain('data-a="insert" disabled');
    expect(h).toContain('data-a="delete" disabled');
    expect(h).not.toContain('data-f="roll"');
    expect(h).toContain('Passes the checks');
    expect(h).toContain('Loop, 1.60 km, 4 points, tube 40 m');
    expect(h).toContain('data-a="undo" disabled');
    expect(h).toContain('data-a="revert" disabled');
    expect(h).toContain('value="Glass &#60;Loop&#62;"');
    expect(h).toContain('<button data-cam="orbit" class="on">');
    expect(h).toContain('<button data-view="ghost" class="on">');
    expect(h).not.toContain('Record from here');
  });

  it('one point: its roll in degrees and its radius; several: a count', () => {
    let h = panelHtml(view({ selection: [0] }), keys);
    expect(h).toContain('Point 1 of 4');
    expect(h).toContain('data-f="roll" value="30.0"');
    expect(h).toContain('data-f="radius" value="40.0"');
    expect(h).not.toContain('data-a="insert" disabled');
    h = panelHtml(view({ selection: [1, 2] }), keys);
    expect(h).toContain('2 points');
    expect(h).toContain('data-f="radius" value="55.0"');
    expect(h).toContain('data-a="insert" disabled');
    expect(h).not.toContain('data-a="delete" disabled');
  });

  it('lists problems, undo state, a short run, the fly cam and a notice', () => {
    const h = panelHtml(
      view({
        doc: { ...doc, closed: false },
        length: 800,
        cam: 'fly',
        view: 'solid',
        canUndo: true,
        canRedo: true,
        changed: true,
        notice: 'Saved',
        problems: [{ kind: 'tight', s0: 100, s1: 200, i0: 25, i1: 50 }, { kind: 'close', s0: 300, s1: 400, i0: 75, i1: 100 }],
      }),
      keys,
    );
    expect(h).toContain('Point to point, 800 m');
    expect(h).toContain('data-problem="1"');
    expect(h).toContain('bend too tight');
    expect(h).toContain('tube too close to itself');
    expect(h).not.toContain('Passes the checks');
    expect(h).not.toContain('data-a="undo" disabled');
    expect(h).not.toContain('data-a="redo" disabled');
    expect(h).not.toContain('data-a="revert" disabled');
    expect(h).toContain('Record from here J');
    expect(h).toContain('<button data-view="solid" class="on">');
    expect(h).toContain('>Saved</p>');
  });

  it('has a hint for every camera', () => {
    const hints = EDIT_CAMS.map(helpText);
    expect(new Set(hints).size).toBe(3); // top and side share one
    expect(helpText('fly')).toContain('right button to look');
    expect(helpText('orbit')).toContain('double-click the line');
  });
});
