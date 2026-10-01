import { defineConfig } from 'vitest/config';

export default defineConfig({
  // relative base: works at username.github.io/<any-repo-name>/
  base: './',
  // three.js alone is ~500 kB minified; debug tools are split out via dynamic import
  build: { chunkSizeWarningLimit: 800 },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
