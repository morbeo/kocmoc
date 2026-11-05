import { test, expect, type Page } from '@playwright/test';

// a fake standard-mapping pad; tests poke window.__pad. A tap holds a button for exactly two reads
// (frames), since software GL frames are too slow for wall-clock taps.
type Fake = { axes: number[]; buttons: number[]; taps: Record<number, number>; reads: number };
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const state: Fake = { axes: [0, 0, 0, 0], buttons: Array<number>(17).fill(0), taps: {}, reads: 0 };
    (window as unknown as { __pad: Fake }).__pad = state;
    navigator.getGamepads = () => {
      state.reads++;
      const buttons = state.buttons.map((v, i) => (state.taps[i] ? (state.taps[i]--, 1) : v));
      return [
        {
          id: 'Test Pad (STANDARD GAMEPAD)',
          index: 0,
          connected: true,
          mapping: 'standard',
          timestamp: performance.now(),
          axes: state.axes.slice(),
          buttons: buttons.map((value) => ({ value, pressed: value > 0.5, touched: value > 0 })),
        },
      ] as unknown as (Gamepad | null)[];
    };
  });
});

const set = (page: Page, kind: 'axes' | 'buttons', i: number, v: number) =>
  page.evaluate(([kind, i, v]) => ((window as unknown as { __pad: Fake }).__pad[kind][i] = v), [kind, i, v] as const);
async function tap(page: Page, button: number) {
  const reads = await page.evaluate((b) => {
    const p = (window as unknown as { __pad: Fake }).__pad;
    p.taps[b] = 2;
    return p.reads;
  }, button);
  // pressed for two reads, then seen released at least once
  await page.waitForFunction((r) => (window as unknown as { __pad: Fake }).__pad.reads >= r + 3, reads);
}
const speed = async (page: Page) => Number(await page.locator('#hud .speed').textContent());

test('gamepad flies the ship and drives the menus', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('canvas[data-engine]')).toBeVisible();
  // a connected pad hides the click-to-steer hint
  await expect(page.locator('#hud .hint')).toHaveText('');

  // RT = thrust
  await set(page, 'buttons', 7, 1);
  await expect.poll(() => speed(page), { timeout: 15_000 }).toBeGreaterThan(10);
  await set(page, 'buttons', 7, 0);

  // Start opens the tracks, B closes them
  await tap(page, 9);
  const tracks = page.locator('#tracks');
  await expect(tracks).toBeVisible();
  await tap(page, 1);
  await expect(tracks).toBeHidden();

  // Start, D-pad down to a venue, A picks it
  await tap(page, 9);
  await expect(tracks).toBeVisible();
  await tap(page, 13);
  await tap(page, 13);
  await expect(page.locator('#tracks .venue:focus')).toHaveCount(1);
  await page.screenshot({ path: 'test-results/pad-01-tracks.png' });
  await tap(page, 0);
  // building the new venue is slow on software GL
  await expect(tracks).toBeHidden({ timeout: 30_000 });

  expect(errors).toEqual([]);
});

test('controls panel binds a pad button', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('KeyK');
  const panel = page.locator('.ctl-panel');
  await expect(panel).toBeVisible();
  await expect(panel.locator('.ctl-pad')).toContainText('Test Pad');

  const slot = panel.locator('tr[data-action=respawn] .key.pad');
  await expect(slot).toHaveText('Y');
  await slot.click();
  await expect(slot).toHaveText('press / push…');
  await set(page, 'buttons', 11, 1);
  await expect(slot).toHaveText('R3');
  await set(page, 'buttons', 11, 0);

  // a stick direction binds as an axis half
  const up = panel.locator('tr[data-action=up] .key.pad');
  await up.click();
  await set(page, 'axes', 1, -0.9);
  await expect(up).toHaveText('LS ↑');
  await set(page, 'axes', 1, 0);
  await expect(panel.locator('tr[data-action=pitchUp] .key.pad')).toHaveClass(/conflict/);
  await page.screenshot({ path: 'test-results/pad-02-controls.png' });

  await panel.getByRole('button', { name: 'Reset all' }).click();
  await expect(slot).toHaveText('Y');
  await expect(up).toHaveText('RS ↑');
});
