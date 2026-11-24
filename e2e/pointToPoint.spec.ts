import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 960, height: 540 } });

test('M8b: a point-to-point track is one run to the finish gate', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  // the bundled open track loads by scenario name
  await page.goto('/?scenario=canyon-run');
  await expect(page.locator('#race-hud .time')).toHaveText('cross the line', { timeout: 30000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/95-canyon-run.png' });

  // software GL draws few frames, so the run is raced on a short open track dropped in as a file
  test.setTimeout(240_000);
  const short = {
    kind: 'kocmoc.track',
    version: 1,
    title: 'Short run',
    closed: false,
    radius: 14,
    checkpoints: 3,
    points: [{ p: [0, 0, 0] }, { p: [0, 0, -200] }, { p: [60, 0, -400] }, { p: [60, 0, -650] }],
  };
  await page.evaluate((doc) => {
    const dt = new DataTransfer();
    dt.items.add(new File([JSON.stringify(doc)], 'short.kocmoc-track.json', { type: 'application/json' }));
    dispatchEvent(new DragEvent('drop', { dataTransfer: dt, cancelable: true }));
  }, short);
  // the autopilot flies, and also gives the autopilot rival
  await page.keyboard.press('KeyP');
  await expect(page.locator('#race-hud .lap')).toHaveText('RUN', { timeout: 30000 });
  await expect(page.locator('#race-hud .total')).toHaveText('');
  await expect(page.locator('#results')).toBeVisible({ timeout: 200_000 });
  await expect(page.locator('#results .laps li')).toHaveCount(1);
  await expect(page.locator('#results .laps li span').first()).toHaveText('RUN');
  await expect(page.locator('#results .again')).toHaveText('R to race again');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test-results/96-run-results.png' });
  await page.keyboard.press('KeyP');
  await page.keyboard.press('KeyR');
  await expect(page.locator('#results')).toBeHidden();
  expect(errors).toEqual([]);
});
