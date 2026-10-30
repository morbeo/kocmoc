import { test, expect } from '@playwright/test';

test('cinematic camera: X toggles it, letterbox, replays use it', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('/');
  await expect(page.locator('#hud')).toBeVisible();
  const cam = page.locator('#hud .cam');
  const bars = page.locator('.letterbox[data-on="true"]');
  await expect(cam).toHaveText('CHASE');
  await page.keyboard.press('KeyP'); // autopilot flies, so there's something to film

  await page.keyboard.press('KeyX');
  await expect(cam).toHaveText('CINEMATIC');
  await expect(bars).toHaveCount(2);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test-results/60-cinematic.png' });

  // X again returns to the rig used before
  await page.keyboard.press('KeyX');
  await expect(cam).toHaveText('CHASE');
  await expect(bars).toHaveCount(0);

  // a replay is shown through the director, and the live rig comes back after
  await page.keyboard.press('KeyB');
  await expect(page.locator('#replay-bar')).toBeVisible();
  await expect(cam).toHaveText('CINEMATIC');
  await page.screenshot({ path: 'test-results/61-cinematic-replay.png' });
  await page.locator('#replay-bar .exit').click();
  await expect(cam).toHaveText('CHASE');

  expect(errors).toEqual([]);
});
