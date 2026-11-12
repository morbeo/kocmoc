/// <reference types="node" />
import { defineConfig } from '@playwright/test';

// CI runners have no GPU either, and share their cores: slower waits there, one worker, one retry
const ci = !!process.env.CI;

export default defineConfig({
  testDir: 'e2e',
  outputDir: 'test-results',
  // software GL in headless runs is slow; the scene is heavier since M3
  timeout: ci ? 180_000 : 90_000,
  expect: { timeout: ci ? 20_000 : 5_000 },
  workers: ci ? 1 : undefined,
  retries: ci ? 1 : 0,
  reporter: ci ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: 'http://localhost:5199', viewport: { width: 1280, height: 720 } },
  webServer: {
    command: 'npx vite --port 5199 --strictPort',
    url: 'http://localhost:5199',
    reuseExistingServer: !ci,
  },
});
