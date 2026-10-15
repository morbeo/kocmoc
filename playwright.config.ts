import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  outputDir: 'test-results',
  // software GL in headless runs is slow; the scene is heavier since M3
  timeout: 90_000,
  use: { baseURL: 'http://localhost:5199', viewport: { width: 1280, height: 720 } },
  webServer: {
    command: 'npx vite --port 5199 --strictPort',
    url: 'http://localhost:5199',
    reuseExistingServer: true,
  },
});
