import { test, expect, type Page } from '@playwright/test';

test.use({ viewport: { width: 960, height: 540 } });

/** Fly ahead (boosting, turning a little) until the recording is at least `m` metres long. */
async function flyFor(page: Page, m: number) {
  await page.keyboard.down('KeyW');
  await page.keyboard.down('ShiftLeft');
  await page.keyboard.down('ArrowRight');
  await expect
    .poll(async () => {
      const t = (await page.locator('#rec-hud .row span').first().textContent()) ?? '';
      return t.endsWith('km') ? parseFloat(t) * 1000 : parseFloat(t);
    }, { timeout: 120_000 })
    .toBeGreaterThan(m);
  for (const k of ['KeyW', 'ShiftLeft', 'ArrowRight']) await page.keyboard.up(k);
}

test('M8c: record a track by flying it, then fly, save and list it', async ({ page }) => {
  test.setTimeout(240_000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/');
  await expect(page.locator('#race-hud')).toContainText('SEED', { timeout: 30000 });
  // the track list offers recording
  await page.keyboard.press('KeyT');
  await expect(page.locator('#tracks .record')).toHaveText('● Record a track (J)');
  await page.locator('#tracks .record').click();
  await expect(page.locator('#tracks')).toBeHidden();
  const hud = page.locator('#rec-hud');
  await expect(hud).toBeVisible();
  await expect(hud.locator('.rec')).toHaveText('● REC');
  await expect(hud).toContainText('tube 40 m');

  // live controls: wider tube, pause, and too short to finish yet
  await page.keyboard.press('BracketRight');
  await expect(hud).toContainText('tube 45 m');
  await page.keyboard.press('BracketLeft');
  await expect(hud).toContainText('tube 40 m');
  await page.keyboard.press('KeyU');
  await expect(hud.locator('.paused')).toBeVisible();
  await page.keyboard.press('KeyU');
  await page.keyboard.press('KeyJ');
  await expect(hud.locator('.msg')).toHaveText('Fly at least 200 m first');

  await flyFor(page, 420);
  await page.keyboard.press('Backspace');
  await expect(hud.locator('.msg')).toHaveText('Took back 200 m');
  await flyFor(page, 400);
  await page.screenshot({ path: 'test-results/97-recording.png' });

  // finish: bridge back to the start, review, save, fly
  await page.keyboard.press('KeyJ');
  const panel = page.locator('#rec-panel');
  await expect(panel).toContainText('Finish recording');
  await panel.locator('[data-f="title"]').fill('Test run');
  await panel.locator('[data-a="bridge"]').click();
  await expect(panel).toContainText('Recorded track');
  await expect(panel).toContainText('Test run');
  await expect(panel).toContainText('a loop');
  await page.screenshot({ path: 'test-results/98-recorded.png' });
  await panel.locator('[data-a="save"]').click();
  await expect(panel.locator('.rp-msg')).toHaveText('Saved. It is under My tracks in the track list.');
  await panel.locator('[data-a="fly"]').click();
  await expect(panel).toBeHidden();
  await expect(hud).toBeHidden();
  await expect(page.locator('#race-hud .time')).toHaveText('cross the line', { timeout: 30000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/99-flying-recorded.png' });

  // saved tracks are listed in the track list and load from there
  await page.keyboard.press('KeyT');
  await expect(page.locator('#tracks [data-mine]')).toHaveCount(1);
  await expect(page.locator('#tracks [data-mine]')).toContainText('Test run');
  await expect(page.locator('#tracks [data-venue]')).toHaveCount(15);
  await page.keyboard.press('Escape');

  // an open recording becomes a point-to-point run
  await page.keyboard.press('KeyJ');
  await expect(hud).toBeVisible();
  await flyFor(page, 300);
  await page.keyboard.press('KeyJ');
  await panel.locator('[data-a="open"]').click();
  await expect(panel).toContainText('a point-to-point run');
  await panel.locator('[data-a="fly"]').click();
  await expect(page.locator('#race-hud .time')).toHaveText('cross the line', { timeout: 30000 });
  // the lap label shows once the clock starts: fly over the start line
  await page.keyboard.down('KeyW');
  await expect(page.locator('#race-hud .lap')).toHaveText('RUN', { timeout: 60000 });
  await page.keyboard.up('KeyW');

  // discarding puts the game back as it was
  await page.keyboard.press('KeyJ');
  await expect(hud).toBeVisible();
  await flyFor(page, 220);
  await page.keyboard.press('KeyJ');
  await panel.locator('[data-a="discard"]').click();
  await expect(panel).toBeHidden();
  await expect(hud).toBeHidden();
  await expect(page.locator('#race-hud .time')).toHaveText('cross the line', { timeout: 30000 });
  expect(errors).toEqual([]);
});
