import { beforeAll, beforeEach, describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';
import { vars } from '../core/vars';
import { generateTrack, type Track } from '../gen/track';

// a page without a browser: just enough DOM for the HUD layout (elements, classes, data, styles, listeners, closest)
type Listener = (e: any) => void;
class El {
  children: El[] = [];
  parent: El | null = null;
  style: Record<string, string> = {};
  dataset: Record<string, string> = {};
  hidden = false;
  id = '';
  title = '';
  textContent = '';
  width = 0;
  height = 0;
  private cls = new Set<string>();
  private html = '';
  listeners: Record<string, Listener[]> = {};
  readonly calls: string[] = [];
  constructor(readonly tagName: string) {}
  get className() { return [...this.cls].join(' '); }
  set className(v: string) { this.cls = new Set(v.split(/\s+/).filter(Boolean)); }
  readonly classList = {
    add: (c: string) => void this.cls.add(c),
    toggle: (c: string, on?: boolean) => void ((on ?? !this.cls.has(c)) ? this.cls.add(c) : this.cls.delete(c)),
    contains: (c: string) => this.cls.has(c),
  };
  get innerHTML() { return this.html; }
  // only the markup the HUD writes: '<i></i><span></span>' and bar text with buttons
  set innerHTML(v: string) {
    this.html = v;
    this.children = [...v.matchAll(/<(i|span|button)([^>]*)>/g)].map(([, tag, attrs]) => {
      const e = new El(tag.toUpperCase());
      e.parent = this;
      for (const [, k, val] of attrs.matchAll(/data-(\w+)(?:="([^"]*)")?/g)) e.dataset[k] = val ?? '';
      return e;
    });
  }
  appendChild(c: El) { c.parent = this; this.children.push(c); return c; }
  querySelector(tag: string) { return this.children.find((c) => c.tagName === tag.toUpperCase()) ?? null; }
  closest(sel: string): El | null {
    const hit = sel.startsWith('.') ? this.cls.has(sel.slice(1)) : this.tagName === sel.toUpperCase();
    return hit ? this : this.parent?.closest(sel) ?? null;
  }
  addEventListener(t: string, fn: Listener) { (this.listeners[t] ||= []).push(fn); }
  fire(t: string, e: object = {}) { for (const fn of this.listeners[t] ?? []) fn({ target: this, ...e }); }
  getContext() {
    // records drawing calls by name
    return new Proxy({}, { get: (_t, k) => (typeof k === 'string' ? () => void this.calls.push(k) : undefined), set: () => true });
  }
}
const body = new El('BODY');
const winListeners: Record<string, Listener[]> = {};
const fireWin = (t: string, e: object) => { for (const fn of winListeners[t] ?? []) fn({ preventDefault() {}, stopPropagation() {}, ...e }); };

vi.stubGlobal('document', { body, createElement: (t: string) => new El(t.toUpperCase()) });
vi.stubGlobal('addEventListener', (t: string, fn: Listener) => void (winListeners[t] ||= []).push(fn));
vi.stubGlobal('innerWidth', 1000);
vi.stubGlobal('innerHeight', 500);

const { createHudLayout, editMode, WIDGETS } = await import('./hudLayout');

const track: Track = generateTrack({ seed: 3, points: 10, radius: 300, wobble: 0.3, height: 60, twist: 0, twistNoise: 0, tubeRadius: 20, spacing: 4, checkpoints: 4 });
const els = { speed: new El('DIV'), timer: new El('DIV'), standings: new El('DIV') };
let hud: ReturnType<typeof createHudLayout>;
const map = () => body.children.find((c) => c.id === 'minimap')!;
const arrow = () => body.children.find((c) => c.id === 'cp-arrow')!;
const bar = () => body.children.find((c) => c.id === 'hud-editor')!;
const v = (path: string) => vars.get(path)!.value;

function camera(at: THREE.Vector3, look: THREE.Vector3) {
  const cam = new THREE.PerspectiveCamera();
  cam.position.copy(at);
  cam.lookAt(look);
  cam.updateMatrixWorld();
  return cam;
}
const frame = (over: Partial<Parameters<typeof hud.update>[0]> = {}) => ({
  camera: camera(new THREE.Vector3(0, 0, 10), new THREE.Vector3()),
  shipPos: track.pos[0].clone(),
  shipQuat: new THREE.Quaternion(),
  track,
  nextCp: track.checkpoints[1],
  ...over,
});

beforeAll(() => {
  hud = createHudLayout(els as unknown as { speed: HTMLElement; timer: HTMLElement; standings: HTMLElement });
});
beforeEach(() => {
  vars.restore({}, false);
  vars.history.clear();
});

describe('widgets', () => {
  it('every widget is marked, named and gets a close button; the minimap, arrow and editor bar are added', () => {
    const all = { ...els, minimap: map(), arrow: arrow() };
    for (const name of WIDGETS) {
      const el = all[name];
      expect(el.classList.contains('hud-widget')).toBe(true);
      expect(el.dataset.widget).toBe(name);
      expect(el.children.some((c) => c.className === 'hud-close')).toBe(true);
    }
    expect(map().width).toBe(160);
    expect(bar().hidden).toBe(true);
  });

  it('places and scales each widget from its vars, centred on its point', () => {
    vars.set('hud.timer.x', 0.25);
    vars.set('hud.timer.y', 0.1);
    vars.set('hud.timer.scale', 2);
    expect(els.timer.style).toMatchObject({ left: '25%', top: '10%', bottom: 'auto', transform: 'translate(-50%, -50%) scale(2)' });
  });

  it('× hides a widget; the editor lists it to show again, and done leaves edit mode', () => {
    els.speed.children.find((c) => c.className === 'hud-close')!.fire('click');
    expect(v('hud.speed.visible')).toBe(false);
    expect(els.speed.classList.contains('hud-hidden')).toBe(true);
    editMode.set(true);
    expect(body.classList.contains('hud-editing')).toBe(true);
    expect(bar().hidden).toBe(false);
    expect(bar().innerHTML).toContain('show speed');
    const show = bar().children.find((c) => c.dataset.show === 'speed')!;
    bar().fire('click', { target: show });
    expect(v('hud.speed.visible')).toBe(true);
    bar().fire('click', { target: bar() }); // not on a button: nothing
    bar().fire('click', { target: bar().children.find((c) => 'done' in c.dataset)! });
    expect(editMode.value).toBe(false);
    expect(bar().hidden).toBe(true);
  });
});

describe('edit mode: drag and wheel', () => {
  it('dragging a widget moves it live, clamped to the screen, and the drop is one undo step', () => {
    vars.set('hud.timer.x', 0.5);
    vars.set('hud.timer.y', 0.5);
    vars.history.clear();
    editMode.set(true);
    fireWin('pointerdown', { target: els.timer, clientX: 500, clientY: 250 });
    fireWin('pointermove', { clientX: 600, clientY: 300 });
    expect([v('hud.timer.x'), v('hud.timer.y')]).toEqual([0.6, 0.6]);
    fireWin('pointermove', { clientX: 5000, clientY: -100 });
    expect([v('hud.timer.x'), v('hud.timer.y')]).toEqual([1, 0]);
    fireWin('pointerup', {});
    expect(vars.history.canUndo.value).toBe(true);
    vars.history.undo();
    expect([v('hud.timer.x'), v('hud.timer.y')]).toEqual([0.5, 0.5]);
    fireWin('pointermove', { clientX: 100, clientY: 100 }); // no drag any more
    fireWin('pointerup', {});
    expect(v('hud.timer.x')).toBe(0.5);
    editMode.set(false);
  });

  it('outside edit mode, on a close button or off the widgets, pointer and wheel do nothing', () => {
    vars.set('hud.timer.x', 0.5);
    fireWin('pointerdown', { target: els.timer, clientX: 500, clientY: 250 });
    fireWin('pointermove', { clientX: 900, clientY: 250 });
    fireWin('wheel', { target: els.timer, deltaY: -1 });
    editMode.set(true);
    fireWin('pointerdown', { target: els.timer.children.find((c) => c.className === 'hud-close')!, clientX: 500, clientY: 250 });
    fireWin('pointerdown', { target: body, clientX: 500, clientY: 250 });
    fireWin('pointermove', { clientX: 900, clientY: 250 });
    fireWin('wheel', { target: body, deltaY: -1 });
    expect([v('hud.timer.x'), v('hud.timer.scale')]).toEqual([0.5, 1]);
    editMode.set(false);
  });

  it('the wheel scales the widget under it by 10% a notch, between 0.5 and 3', () => {
    editMode.set(true);
    fireWin('wheel', { target: map(), deltaY: -1 });
    expect(v('hud.minimap.scale')).toBe(1.1);
    fireWin('wheel', { target: map(), deltaY: 1 });
    expect(v('hud.minimap.scale')).toBe(1);
    for (let i = 0; i < 30; i++) fireWin('wheel', { target: map(), deltaY: -1 });
    expect(v('hud.minimap.scale')).toBe(3);
    for (let i = 0; i < 30; i++) fireWin('wheel', { target: map(), deltaY: 1 });
    expect(v('hud.minimap.scale')).toBe(0.5);
    editMode.set(false);
  });
});

describe('update: minimap and checkpoint arrow', () => {
  it('draws the track, the next checkpoint and the ship on the minimap; only branches that have a colour', () => {
    map().calls.length = 0;
    hud.update(frame());
    expect(map().hidden).toBe(false);
    const drawn = map().calls.slice();
    expect(drawn.filter((c) => c === 'arc')).toHaveLength(2); // the disc and the checkpoint dot
    expect(drawn.filter((c) => c === 'lineTo').length).toBeGreaterThan(track.pos.length / 4 - 2);
    map().calls.length = 0;
    hud.update(frame({ nextCp: null }));
    expect(map().calls.filter((c) => c === 'arc')).toHaveLength(1);

    const b = { pos: track.pos.slice(10, 30) };
    const forked = { ...track, branches: [b, b] } as unknown as Track;
    map().calls.length = 0;
    hud.update(frame({ track: forked, branchColors: ['#f00', null] }));
    const strokes = map().calls.filter((c) => c === 'stroke').length;
    expect(strokes).toBe(2); // the loop and the one coloured branch
  });

  it('no track hides the minimap and the arrow, except while editing the layout', () => {
    hud.update(frame({ track: null }));
    expect([map().hidden, arrow().hidden]).toEqual([true, true]);
    editMode.set(true);
    hud.update(frame({ track: null }));
    expect([map().hidden, arrow().hidden]).toEqual([false, false]);
    editMode.set(false);
    vars.set('hud.minimap.visible', false);
    hud.update(frame());
    expect(map().hidden).toBe(true);
  });

  it('the arrow points at the next checkpoint or a given target, says how far, and marks one behind the camera', () => {
    const ship = new THREE.Vector3(0, 0, 0);
    const ahead = new THREE.Vector3(0, 0, -50);
    hud.update(frame({ shipPos: ship, target: ahead, camera: camera(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)) }));
    const [head, label] = arrow().children;
    expect(arrow().hidden).toBe(false);
    expect(label.textContent).toBe('50 m');
    expect(arrow().classList.contains('behind')).toBe(false);
    const right = new THREE.Vector3(30, 0, -0.0001);
    hud.update(frame({ shipPos: ship, target: right, camera: camera(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)) }));
    expect(head.style.transform).toBe('rotate(90deg)');
    hud.update(frame({ shipPos: ship, target: new THREE.Vector3(0, 0, 40), camera: camera(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)) }));
    expect(arrow().classList.contains('behind')).toBe(true);
    // the checkpoint when there is no target; nothing to point at hides it
    hud.update(frame({ shipPos: track.pos[0].clone() }));
    expect(label.textContent).toMatch(/^\d+ m$/);
    hud.update(frame({ nextCp: null }));
    expect(arrow().hidden).toBe(true);
  });
});
