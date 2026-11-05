import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 960, height: 540 } });

test('race tracks: T opens the venues, picking one loads its world', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/');
  await expect(page.locator('#tracks-btn')).toHaveText('Tracks (T)');
  await page.keyboard.press('KeyT');
  const venues = page.locator('#tracks [data-venue]');
  await expect(venues).toHaveCount(15);
  await page.screenshot({ path: 'test-results/90-tracks.png' });

  await page.locator('[data-venue="venue-obsidian"]').click();
  await expect(page.locator('#tracks')).toBeHidden();
  await expect(page.locator('#race-hud')).toContainText('SEED 305', { timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test-results/91-obsidian.png' });

  // the loaded venue is marked when the list opens again
  await page.locator('#tracks-btn').click();
  await expect(page.locator('#tracks .venue.on')).toHaveAttribute('data-venue', 'venue-obsidian');
  await page.keyboard.press('Escape');
  await expect(page.locator('#tracks')).toBeHidden();
  expect(errors).toEqual([]);
});
