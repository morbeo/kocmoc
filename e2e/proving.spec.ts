import { test, expect } from '@playwright/test';

test('proving ground: level select, gates on the clock, out of time', async ({ page }) => {
  test.setTimeout(240_000); // software GL runs the sim slowly
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/');
  await expect(page.locator('#levels-btn')).toHaveText('Levels (L)');
  await page.keyboard.press('KeyL');
  const panel = page.locator('.lv-panel');
  await expect(panel).toBeVisible();
  // only level 1 is open on a fresh ladder
  await expect(panel.locator('[data-level="1"]')).toBeEnabled();
  await expect(panel.locator('[data-level="2"]')).toBeDisabled();
  await panel.locator('[data-ship="light"]').click();
  await expect(panel.locator('[data-ship="light"]')).toHaveClass(/on/);
  await page.screenshot({ path: 'test-results/70-levels.png' });
  await panel.locator('[data-level="1"]').click();
  await expect(panel).toBeHidden();

  const hud = page.locator('#race-hud');
  await expect(hud.locator('.lap')).toHaveText('LEVEL 1');
  await expect(hud.locator('.seed')).toHaveText('LIGHT');
  await expect(hud.locator('.time')).toHaveText('cross the line');
  // the autopilot crosses the line: the clock starts at the level's budget and counts down
  await page.keyboard.press('KeyP');
  const clock = async () => {
    const [m, sec] = ((await hud.locator('.time').textContent()) ?? '').split(':');
    return Number(m) * 60 + Number(sec);
  };
  await expect.poll(clock, { timeout: 45000 }).toBeLessThan(90);
  const t1 = await clock();
  await expect.poll(clock, { timeout: 20000 }).toBeLessThan(t1);
  await page.screenshot({ path: 'test-results/71-proving.png' });
  await page.keyboard.press('KeyP');

  // a tiny budget runs out: results card, retry hint, and no clear on the ladder
  await page.evaluate(() => {
    const layers = JSON.parse(localStorage.getItem('kocmoc.layers') ?? '{}');
    layers.user = { ...layers.user, 'proving.budget': 1 };
    localStorage.setItem('kocmoc.layers', JSON.stringify(layers));
  });
  await page.reload();
  await expect(hud.locator('.lap')).toHaveText('LEVEL 1');
  await page.keyboard.press('KeyP');
  await expect(page.locator('#results h2')).toHaveText('Out of time', { timeout: 90000 });
  await expect(page.locator('#results .again')).toContainText('R retry');
  await expect(page.locator('#results .again')).not.toContainText('next level');
  await page.screenshot({ path: 'test-results/72-out-of-time.png' });
  expect(await page.evaluate(() => localStorage.getItem('kocmoc.proving.ladder'))).toBeNull();

  expect(errors).toEqual([]);
});

test('proving ground: badges per ship and generated levels past 8', async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem('kocmoc.proving.ladder')) {
      localStorage.setItem('kocmoc.proving.ladder', JSON.stringify({ heavy: { cleared: 8, best: { 8: 1234 } } }));
    }
  });
  await page.goto('/');
  await page.locator('#levels-btn').click();
  const panel = page.locator('.lv-panel');
  await expect(panel.locator('[data-ship="heavy"]')).toHaveText('★ heavy');
  await expect(panel.locator('[data-ship="light"]')).toHaveText('light');
  await panel.locator('[data-ship="heavy"]').click();
  await expect(panel.locator('[data-level="8"] span')).toHaveText('1234');
  await expect(panel.locator('[data-level="9"]')).toBeEnabled();
  await panel.locator('[data-level="9"]').click();
  await expect(page.locator('#race-hud .lap')).toHaveText('LEVEL 9');
  await expect(page.locator('#race-hud .seed')).toHaveText('HEAVY');
});
