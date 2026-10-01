import { test, expect, type Page } from '@playwright/test';

const row = (page: Page, path: string) =>
  page.locator('tr').filter({ has: page.locator('td.path', { hasText: new RegExp(`^${path.replace(/\./g, '\\.')}$`) }) });
// the scene area left of the debug panel
const scene = (page: Page) => page.screenshot({ clip: { x: 0, y: 0, width: 700, height: 720 } });

test('toon scene renders and the debug table drives it', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/?debug');
  await expect(page.locator('canvas')).toBeVisible();
  await expect(page.locator('.kd-panel')).toBeVisible();
  await page.screenshot({ path: 'test-results/01-initial.png' });

  // fuzzy search
  const search = page.locator('.kd-panel .search');
  await search.fill('spn spd');
  await expect(page.locator('td.path').first()).toHaveText('demo.spin.speed');

  // freeze rotation so scene screenshots are comparable
  await search.fill('demo.spin.speed');
  await row(page, 'demo.spin.speed').locator('input[type=number]').fill('0');
  await row(page, 'demo.spin.speed').locator('input[type=number]').press('Enter');
  await page.waitForTimeout(200);
  const before = await scene(page);

  // edit a var → scene changes, source becomes `user`
  await search.fill('demo.color');
  await row(page, 'demo.color').locator('input[type=color]').fill('#00ff00');
  await expect(row(page, 'demo.color').locator('.layer')).toHaveText('user');
  await page.waitForTimeout(200);
  expect((await scene(page)).equals(before)).toBe(false);
  await page.screenshot({ path: 'test-results/02-edited.png' });

  // undo (focus outside text inputs) → back to default colour
  await page.locator('.count').click();
  await page.keyboard.press('ControlOrMeta+z');
  await expect(row(page, 'demo.color').locator('code')).toHaveText('#ff2fa8');
  await expect(row(page, 'demo.color').locator('.layer')).toHaveText('default');

  // preset applies to its layer
  await page.locator('.preset select').selectOption('visual/ink');
  await search.fill('#render');
  await expect(row(page, 'render.background').locator('.layer')).toHaveText('visual');
  await expect(row(page, 'render.background').locator('code')).toHaveText('#efe8d8');
  await page.screenshot({ path: 'test-results/03-preset-ink.png' });

  // autosave survives reload
  await page.waitForTimeout(400);
  await page.reload();
  await page.locator('.kd-panel .search').fill('render.background');
  await expect(row(page, 'render.background').locator('code')).toHaveText('#efe8d8');

  // watches tick
  await page.locator('.kd-panel .search').fill(':watch');
  await expect(row(page, 'perf.fps').locator('code')).not.toHaveText('0');

  expect(errors).toEqual([]);
});
