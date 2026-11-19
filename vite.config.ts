import { defineConfig } from 'vitest/config';

export default defineConfig({
  // relative base: works at username.github.io/<any-repo-name>/
  base: './',
  // three.js alone is ~500 kB minified; debug tools are split out via dynamic import
  build: { chunkSizeWarningLimit: 800 },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // npm run coverage. Unit tests cover the logic; three.js, DOM and audio glue is left to e2e.
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.ts'],
      reporter: ['text-summary', 'json-summary', 'html'],
      // a floor just under today's numbers, so coverage can't drop unnoticed; raise it as tests land
      thresholds: { lines: 55, statements: 55, branches: 53, functions: 50 },
    },
  },
});
