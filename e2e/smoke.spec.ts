import { test, expect, type Page } from '@playwright/test';

const row = (page: Page, path: string) =>
  page.locator('tr').filter({ has: page.locator('td.path', { hasText: new RegExp(`^${path.replace(/\./g, '\\.')}$`) }) });
const presetSelect = (page: Page, group: string) =>
  page.locator('.preset select').filter({ has: page.locator(`option[value^="${group}/"]`) });
// the scene area left of the debug panel
const scene = (page: Page) => page.screenshot({ clip: { x: 0, y: 0, width: 700, height: 720 } });

test('toon scene renders and the debug table drives it', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text() + ' ' + m.location().url));

  await page.goto('/?debug');
  await expect(page.locator('canvas[data-engine]')).toBeVisible();
  await expect(page.locator('.kd-panel')).toBeVisible();
  await page.screenshot({ path: 'test-results/01-initial.png' });

  // fuzzy search
  const search = page.locator('.kd-panel .search');
  await search.fill('shp clr');
  await expect(page.locator('td.path').first()).toHaveText('ship.color');

  // freeze the sim so scene screenshots are comparable
  await search.fill('time.paused');
  await row(page, 'time.paused').locator('input[type=checkbox]').check();
  await page.waitForTimeout(200);
  const before = await scene(page);

  // edit a var → scene changes, source becomes `user`
  await search.fill('ship.color');
  await row(page, 'ship.color').locator('input[type=color]').fill('#00ff00');
  await expect(row(page, 'ship.color').locator('.layer')).toHaveText('user');
  await page.waitForTimeout(200);
  expect((await scene(page)).equals(before)).toBe(false);
  await page.screenshot({ path: 'test-results/02-edited.png' });

  // undo (focus outside text inputs) → back to default colour
  await page.locator('.count').click();
  await page.keyboard.press('ControlOrMeta+z');
  await expect(row(page, 'ship.color').locator('code')).toHaveText('#ff2fa8');
  await expect(row(page, 'ship.color').locator('.layer')).toHaveText('default');

  // preset applies to its layer
  await presetSelect(page, 'visual').selectOption('visual/ink');
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

test('flying: thrust, camera cycle, flight assist, input visualizer', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('/');
  await expect(page.locator('#hud')).toBeVisible();
  // hold until moving: software GL can be slow, so don't assume a frame rate
  await page.keyboard.down('KeyW');
  await expect.poll(async () => Number(await page.locator('#hud .speed').textContent()), { timeout: 15000 }).toBeGreaterThan(10);
  await page.keyboard.up('KeyW');
  await page.screenshot({ path: 'test-results/10-flying.png' });

  await page.keyboard.press('KeyV');
  await expect(page.locator('#hud .cam')).toHaveText('COCKPIT');
  await page.keyboard.press('KeyF');
  await expect(page.locator('#hud .fa')).toHaveText('NEWTONIAN');

  await page.keyboard.press('F3');
  await expect(page.locator('#input-viz')).toBeVisible();
  await page.keyboard.down('ArrowLeft');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'test-results/11-input-viz.png' });
  await page.keyboard.up('ArrowLeft');

  expect(errors).toEqual([]);
});

test('render debug views and visual presets', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/?debug');
  const search = page.locator('.kd-panel .search');
  await search.fill('render.debug.view');
  const select = row(page, 'render.debug.view').locator('select');
  for (const view of ['edges', 'normals', 'depth', 'color', 'final']) {
    await select.selectOption(view);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `test-results/20-view-${view}.png` });
  }
  for (const preset of ['visual/pastel', 'visual/mono', 'visual/neon']) {
    await presetSelect(page, 'visual').selectOption(preset);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `test-results/21-${preset.replace('/', '-')}.png` });
  }
  expect(errors).toEqual([]);
});

test('controls panel: rebind a key, invert pitch, reset', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('/');
  await expect(page.locator('#controls-btn')).toHaveText('Controls (K)');
  await page.keyboard.press('KeyK');
  const panel = page.locator('.ctl-panel');
  await expect(panel).toBeVisible();

  // rebind thrust to I; the key being bound must not reach the game
  const thrust = panel.locator('tr[data-action=forward] .key').first();
  await thrust.click();
  await expect(thrust).toHaveText('press a key…');
  await page.keyboard.press('KeyI');
  await expect(thrust).toHaveText('I');
  // binding a key another action uses flags the clash
  await panel.locator('tr[data-action=back] .key').nth(1).click();
  await page.keyboard.press('KeyI');
  await expect(thrust).toHaveClass(/conflict/);
  await panel.locator('tr[data-action=back] .key').nth(1).click();
  await page.keyboard.press('Backspace');
  await expect(thrust).not.toHaveClass(/conflict/);

  await panel.getByLabel('Invert pitch (touchpad / mouse Y)').check();
  await page.screenshot({ path: 'test-results/30-controls.png' });
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();

  await page.keyboard.down('KeyI');
  await expect.poll(async () => Number(await page.locator('#hud .speed').textContent()), { timeout: 15000 }).toBeGreaterThan(10);
  await page.keyboard.up('KeyI');

  // survives reload, then reset all restores defaults
  await page.waitForTimeout(400);
  await page.reload();
  await page.locator('#controls-btn').click();
  await expect(thrust).toHaveText('I');
  await expect(panel.getByLabel('Invert pitch (touchpad / mouse Y)')).toBeChecked();
  await panel.getByRole('button', { name: 'Reset all' }).click();
  await expect(thrust).toHaveText('W');
  await expect(panel.getByLabel('Invert pitch (touchpad / mouse Y)')).not.toBeChecked();

  expect(errors).toEqual([]);
});

test('race: seed in URL, scenario, gizmos, lap timer starts', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/?seed=42');
  await expect(page.locator('#race-hud .seed')).toHaveText('SEED 42');
  expect(new URL(page.url()).searchParams.get('seed')).toBe('42');
  await expect(page.locator('#race-hud .time')).toHaveText('cross the line');
  await page.keyboard.down('KeyW');
  await expect(page.locator('#race-hud .lap')).toHaveText('LAP 1', { timeout: 20000 });
  await page.keyboard.up('KeyW');
  await page.screenshot({ path: 'test-results/30-race.png' });

  await page.goto('/?scenario=rails-night&debug');
  await expect(page.locator('#race-hud .seed')).toHaveText('SEED 77');
  const search = page.locator('.kd-panel .search');
  for (const g of ['velocity', 'collision', 'frames', 'checkpoints', 'nearest']) {
    await search.fill(`debug.gizmo.${g}`);
    await row(page, `debug.gizmo.${g}`).locator('input[type=checkbox]').check();
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-results/31-rails-gizmos.png' });

  for (const look of ['halfpipe', 'gates']) {
    await search.fill('gen.race.profile');
    await row(page, 'gen.race.profile').locator('select').selectOption(look);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `test-results/32-${look}.png` });
  }
  expect(errors).toEqual([]);
});

test('gauntlet: obstacles, near the end, juice presets', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/?scenario=gauntlet-ramp&debug');
  await expect(page.locator('#race-hud .seed')).toHaveText('SEED 7');
  const search = page.locator('.kd-panel .search');
  await search.fill('gauntlet.chunks');
  await expect(row(page, 'gauntlet.chunks').locator('code')).not.toHaveText('0');
  await page.locator('.count').click(); // leave the search box so keys fly the ship
  await page.keyboard.down('KeyW');
  await expect(page.locator('#race-hud .lap')).toHaveText('LAP 1', { timeout: 20000 });
  await page.waitForTimeout(1500);
  await page.keyboard.up('KeyW');
  await page.screenshot({ path: 'test-results/40-gauntlet.png' });

  const juice = presetSelect(page, 'juice');
  for (const preset of ['juice/overkill', 'juice/subtle', 'juice/off']) {
    await juice.selectOption(preset);
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.down('KeyW');
    await page.waitForTimeout(800);
    await page.screenshot({ path: `test-results/41-${preset.replace('/', '-')}.png` });
    await page.keyboard.up('KeyW');
    await page.keyboard.up('ShiftLeft');
  }
  await search.fill('juice.master');
  await expect(row(page, 'juice.master').locator('.layer')).toHaveText('juice');
  expect(errors).toEqual([]);
});
