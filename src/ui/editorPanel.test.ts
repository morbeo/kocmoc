import { describe, it, expect } from 'vitest';
import { helpText, orbitLimits, panelHtml, EDIT_CAMS, type PanelKeys, type PanelView } from './editorPanel';
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
const keys: PanelKeys = { edit: 'G', focus: '.', frame: 'Home', insert: 'I', remove: 'Del', rollLeft: ';', rollRight: "'", smooth: 'M', camera: 'V', record: 'J', wider: ']', narrower: '[', center: 'H', yawLeft: '1', yawRight: '2', pitchUp: '3', pitchDown: '4', viewRollLeft: '5', viewRollRight: '6', step: '0' };
const view = (o: Partial<PanelView> = {}): PanelView => ({ doc, length: 1600, selection: [], problems: [], cam: 'orbit', view: 'ghost', canUndo: false, canRedo: false, changed: false, notice: '', step: '45', ...o });

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

  it('turns the view by the chosen step, and centers it', () => {
    let h = panelHtml(view(), keys);
    expect(h).toContain('<button data-step="45" class="on">45°</button>');
    expect(h).toContain('data-a="yawRight" title="turn right 45° (2)"');
    expect(h).toContain('data-a="viewRollLeft"');
    expect(h).toContain('data-a="center"');
    h = panelHtml(view({ step: '15' }), keys);
    expect(h).toContain('<button data-step="15" class="on">15°</button>');
    expect(h).toContain('title="turn up 15° (3)"');
  });

  it('has a hint for every camera', () => {
    const hints = EDIT_CAMS.map(helpText);
    expect(new Set(hints).size).toBe(3); // top and side share one
    expect(helpText('fly')).toContain('right button to look');
    expect(helpText('orbit')).toContain('double-click the line');
  });
});

describe('orbit limits', () => {
  it('orbit zooms and rotates with the left button, flat views pan and hold their angle', () => {
    expect(orbitLimits('orbit', false, 1000)).toEqual({ zoom: true, minPolar: 0, maxPolar: Math.PI, minDistance: 2, maxDistance: 30000, leftDrag: 'rotate' });
    expect(orbitLimits('top', false, 1000)).toMatchObject({ zoom: false, minPolar: 0, maxPolar: 0, leftDrag: 'pan', maxDistance: Infinity });
    expect(orbitLimits('side', false, 1000)).toMatchObject({ minPolar: Math.PI / 2, maxPolar: Math.PI / 2 });
  });

  it('a turned flat view is free; the fly cam never holds an angle', () => {
    expect(orbitLimits('top', true, 1000)).toMatchObject({ minPolar: 0, maxPolar: Math.PI });
    expect(orbitLimits('side', true, 1000)).toMatchObject({ minPolar: 0, maxPolar: Math.PI });
    expect(orbitLimits('fly', false, 1000)).toMatchObject({ minPolar: 0, maxPolar: Math.PI, zoom: false });
  });
});
