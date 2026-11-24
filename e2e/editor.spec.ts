import { test, expect, type Page } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 720 } });

type Pt = { x: number; y: number };
interface Hook {
  point(i: number): [number, number, number] | null;
  screen(i: number): Pt | null;
  line(i: number): Pt | null;
  samples(): number;
  view(): { fwd: number[]; up: number[]; target: number[] };
  arrow(axis: 'x' | 'y' | 'z', px: number): { from: Pt; dir: Pt };
}
const hook = <T>(page: Page, fn: (h: Hook, arg: never) => T, arg?: unknown) =>
  page.evaluate(([src, a]) => new Function('h', 'a', `return (${src})(h, a)`)((window as unknown as { __editor: Hook }).__editor, a), [fn.toString(), arg] as const) as Promise<T>;

test('M8d: open the editor, select, edit, undo, cameras, checks, close', async ({ page }) => {
  test.setTimeout(420_000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/');
  await expect(page.locator('#race-hud')).toContainText('SEED', { timeout: 30000 });
  // the track list offers the editor
  await page.keyboard.press('KeyT');
  await expect(page.locator('#tracks .edit')).toHaveText('✎ Edit this track (G)');
  await page.locator('#tracks .edit').click();

  const panel = page.locator('#edit-panel');
  await expect(panel).toBeVisible();
  await expect(page.locator('body')).toHaveClass(/editing/);
  await expect(page.locator('#race-hud')).toBeHidden();
  await expect(panel.locator('.ed-facts')).toContainText('Loop');
  await expect(panel.locator('.ed-facts')).toContainText('12 points');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-results/editor-1-orbit.png' });

  // click a point, shift-click another, Escape clears
  const click = async (i: number, mod?: 'Shift') => {
    const p = (await hook(page, (h, i: number) => h.screen(i), i))!;
    if (mod) await page.keyboard.down(mod);
    await page.mouse.click(p.x, p.y);
    if (mod) await page.keyboard.up(mod);
  };
  await click(3);
  await expect(panel.locator('.ed-sel p')).toHaveText('Point 4 of 12');
  await click(5, 'Shift');
  await expect(panel.locator('.ed-sel p')).toHaveText('2 points');
  await page.keyboard.press('Escape');
  await expect(panel.locator('.ed-sel p')).toContainText('No point selected');
  await click(3);
  await expect(panel.locator('.ed-sel p')).toHaveText('Point 4 of 12');

  // roll and radius keys, undo and redo
  await page.keyboard.press('Quote');
  await expect(panel.locator('[data-f="roll"]')).not.toHaveValue('0.0');
  const roll = Number(await panel.locator('[data-f="roll"]').inputValue());
  await page.keyboard.press('BracketRight');
  await expect(panel.locator('[data-f="radius"]')).toHaveValue('45.0');
  await page.keyboard.press('Control+KeyZ');
  await expect(panel.locator('[data-f="radius"]')).toHaveValue('40.0');
  await page.keyboard.press('Control+Shift+KeyZ');
  await expect(panel.locator('[data-f="radius"]')).toHaveValue('45.0');
  expect(Number(await panel.locator('[data-f="roll"]').inputValue())).toBeCloseTo(roll, 1);

  // insert after it, then delete the new one
  await page.keyboard.press('KeyI');
  await expect(panel.locator('.ed-facts')).toContainText('13 points');
  await expect(panel.locator('.ed-sel p')).toHaveText('Point 5 of 13');
  await page.keyboard.press('Delete');
  await expect(panel.locator('.ed-facts')).toContainText('12 points');

  // double-click the centreline adds a point there
  const n = await hook(page, (h) => h.samples());
  const at = (await hook(page, (h, i: number) => h.line(i), Math.round(n * 0.55)))!;
  await page.mouse.dblclick(at.x, at.y);
  await expect(panel.locator('.ed-facts')).toContainText('13 points');
  await page.keyboard.press('Control+KeyZ');
  await expect(panel.locator('.ed-facts')).toContainText('12 points');

  // drag the selected point up with the gizmo's Y arrow
  await click(3);
  const before = (await hook(page, (h) => h.point(3)))!;
  const arrow = await hook(page, (h) => h.arrow('y', 70));
  await page.mouse.move(arrow.from.x, arrow.from.y);
  await page.mouse.down();
  for (let k = 1; k <= 8; k++) await page.mouse.move(arrow.from.x + arrow.dir.x * k * 10, arrow.from.y + arrow.dir.y * k * 10);
  await page.mouse.up();
  await expect.poll(async () => (await hook(page, (h) => h.point(3)))![1]).toBeGreaterThan(before[1] + 1);
  const after = (await hook(page, (h) => h.point(3)))!;
  expect(after[0]).toBeCloseTo(before[0], 0);
  expect(after[2]).toBeCloseTo(before[2], 0);
  await page.screenshot({ path: 'test-results/editor-2-dragged.png' });

  // a huge tube fails the checks: listed, and clickable
  await panel.locator('[data-f="radius"]').fill('400');
  await panel.locator('[data-f="radius"]').press('Enter');
  await expect(panel.locator('.ed-problems li').first()).toBeVisible();
  await panel.locator('.ed-problems button').first().click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'test-results/editor-3-problem.png' });
  await page.keyboard.press('Control+KeyZ');
  await expect(panel.locator('.ed-ok')).toBeVisible();

  // turn the view by steps (keys and buttons) and center it
  const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const v0 = await hook(page, (h) => h.view());
  await page.keyboard.press('Digit2'); // yaw right, 45° by default
  const v1 = await hook(page, (h) => h.view());
  expect(dot(v0.fwd, v1.fwd)).toBeCloseTo(Math.cos(Math.PI / 4), 2);
  await panel.locator('[data-step="90"]').click();
  await expect(panel.locator('[data-step="90"]')).toHaveClass('on');
  await panel.locator('[data-a="viewRollRight"]').click();
  const v2 = await hook(page, (h) => h.view());
  expect(dot(v1.up, v2.up)).toBeCloseTo(0, 2);
  expect(dot(v1.fwd, v2.fwd)).toBeCloseTo(1, 2);
  await page.keyboard.press('Numpad8'); // pitch up 90°
  const v3 = await hook(page, (h) => h.view());
  expect(dot(v2.fwd, v3.fwd)).toBeCloseTo(0, 2);
  await page.keyboard.press('Digit0'); // step 90 → 15
  await expect(panel.locator('[data-step="15"]')).toHaveClass('on');
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'test-results/editor-3b-turned.png' });
  await page.keyboard.press('Escape');
  await page.keyboard.press('KeyH'); // center on the whole track
  const v4 = await hook(page, (h) => h.view());
  expect(dot(v3.fwd, v4.fwd)).toBeCloseTo(1, 3);
  await page.keyboard.press('Home');

  // every camera, and the solid view
  for (const cam of ['top', 'side', 'fly', 'orbit']) {
    await panel.locator(`[data-cam="${cam}"]`).click();
    await expect(panel.locator(`[data-cam="${cam}"]`)).toHaveClass('on');
    await page.waitForTimeout(300);
    await page.screenshot({ path: `test-results/editor-4-${cam}.png` });
  }
  await page.keyboard.press('KeyV');
  await expect(panel.locator('[data-cam="fly"]')).toHaveClass('on');
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(400);
  await page.keyboard.up('KeyW');
  await panel.locator('[data-view="solid"]').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'test-results/editor-5-solid.png' });
  await panel.locator('[data-view="ghost"]').click();

  // close: the edited track is raced
  await page.keyboard.press('KeyG');
  await expect(panel).toBeHidden();
  await expect(page.locator('body')).not.toHaveClass(/editing/);
  await expect(page.locator('#race-hud')).toBeVisible();
  await page.keyboard.press('KeyG');
  const p3 = (await hook(page, (h) => h.point(3)))!;
  expect(p3[1]).toBeCloseTo(after[1], 0);
  await page.keyboard.press('KeyG');

  expect(errors).toEqual([]);
});

test('M8d: record from the fly cam, then edit the recording', async ({ page }) => {
  test.setTimeout(240_000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto('/');
  await expect(page.locator('#race-hud')).toContainText('SEED', { timeout: 30000 });
  await page.keyboard.press('KeyG');
  const panel = page.locator('#edit-panel');
  await panel.locator('[data-cam="fly"]').click();
  await panel.locator('[data-a="record"]').click();
  await expect(panel).toBeHidden();
  const hud = page.locator('#rec-hud');
  await expect(hud.locator('.rec')).toHaveText('● REC');
  await page.keyboard.down('KeyW');
  await page.keyboard.down('ArrowRight');
  await expect
    .poll(async () => {
      const t = (await hud.locator('.row span').first().textContent()) ?? '';
      return t.endsWith('km') ? parseFloat(t) * 1000 : parseFloat(t);
    }, { timeout: 120_000 })
    .toBeGreaterThan(400);
  await page.keyboard.up('KeyW');
  await page.keyboard.up('ArrowRight');
  await page.keyboard.press('KeyJ');
  const rec = page.locator('#rec-panel');
  await rec.locator('[data-a="open"]').click();
  await expect(rec).toContainText('Recorded track');
  await rec.locator('[data-a="edit"]').click();
  await expect(rec).toBeHidden();
  await expect(panel).toBeVisible();
  await expect(panel.locator('.ed-facts')).toContainText('Point to point');
  await page.screenshot({ path: 'test-results/editor-6-recorded.png' });
  expect(errors).toEqual([]);
});
