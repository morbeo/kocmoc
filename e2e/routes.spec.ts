import { test, expect } from '@playwright/test';

// a smaller canvas keeps software GL (and so the sim) moving
test.use({ viewport: { width: 800, height: 450 } });

test('race routes: fork sign, a shortcut flown by the autopilot, branches on the minimap', async ({ page }) => {
  test.setTimeout(240_000); // software GL runs the sim slowly
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  // seed 1's shortcut leaves the loop at about 26% of the lap: start a little before it, autopilot on
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('kocmoc.layers', JSON.stringify({ user: { 'race.spawn.t': 0.245, 'race.spawn.speed': 100, 'bot.enabled': true, 'bot.route': 'shortcut' } }));
  });
  await page.reload();
  const route = page.locator('#race-hud .route');
  await expect(route).toHaveText('FORK · SHORTCUT', { timeout: 60000 });
  await page.screenshot({ path: 'test-results/80-fork.png' });
  await expect(route).toHaveText('SHORTCUT', { timeout: 90000 });
  await page.screenshot({ path: 'test-results/81-shortcut.png' });
  await expect(page.locator('#minimap')).toBeVisible();

  // a single line (no forks, no pit lane) has no route label
  await page.evaluate(() => {
    const layers = JSON.parse(localStorage.getItem('kocmoc.layers') ?? '{}');
    layers.user = { ...layers.user, 'gen.race.forks': 0, 'gen.race.pitLane': false };
    localStorage.setItem('kocmoc.layers', JSON.stringify(layers));
  });
  await page.reload();
  await page.waitForTimeout(3000);
  await expect(route).toBeHidden();
  expect(errors).toEqual([]);
});
