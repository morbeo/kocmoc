import { test, expect, devices } from '@playwright/test';

test.describe('phone', () => {
  // landscape, touch events, coarse pointer (defaultBrowserType can't change per group)
  const { defaultBrowserType: _, ...phone } = devices['Pixel 7 landscape'];
  test.use(phone);

  test('touch controls fly the ship', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    await page.goto('/');
    const ui = page.locator('#touch-ui');
    await expect(ui).toBeVisible();
    await expect(page.locator('#controls-btn')).toBeHidden();
    await expect(page.locator('#hud .hint')).toHaveText('');
    await page.screenshot({ path: 'test-results/touch-01.png' });

    const vp = page.viewportSize()!;
    const cdp = await page.context().newCDPSession(page);
    const touch = (type: 'touchStart' | 'touchMove' | 'touchEnd', points: { x: number; y: number; id: number }[]) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points });

    // left thumb pushes the throttle up; right thumb steers right at the same time
    const l = { x: 150, y: vp.height - 100, id: 1 };
    const r = { x: vp.width - 150, y: vp.height - 100, id: 2 };
    await touch('touchStart', [l, r]);
    await touch('touchMove', [{ ...l, y: l.y - 40 }, { ...r, x: r.x + 30 }]);
    await expect(page.locator('#touch-ui .left .base')).not.toHaveClass(/rest/);
    await expect.poll(async () => Number(await page.locator('#hud .speed').textContent()), { timeout: 15_000 }).toBeGreaterThan(5);
    await page.screenshot({ path: 'test-results/touch-02-flying.png' });
    await touch('touchEnd', []);
    await expect(page.locator('#touch-ui .left .base')).toHaveClass(/rest/);

    // ⚙ opens the tuning table without covering the button bar
    await page.locator('#touch-ui .menu').tap();
    await expect(page.locator('.kd-panel')).toBeVisible();
    await page.locator('#touch-ui .menu').tap();
    await expect(page.locator('.kd-panel')).toBeHidden();

    // portrait: race HUD drops below the button bars
    await page.setViewportSize({ width: 412, height: 860 });
    const bar = await page.locator('#touch-ui .bar').first().boundingBox();
    const race = await page.locator('#race-hud').boundingBox();
    expect(race!.y).toBeGreaterThan(bar!.y + bar!.height);
    await page.screenshot({ path: 'test-results/touch-03-portrait.png' });

    expect(errors).toEqual([]);
  });
});

test('desktop keeps the keyboard UI', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#controls-btn')).toBeVisible();
  await expect(page.locator('#touch-ui')).toHaveCount(0);
});
