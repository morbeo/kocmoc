import base from './stryker.config.mjs';

/**
 * Mutation testing for src/sim only (npm run test:mutate:sim).
 * Runs the sim tests plus the few outside tests that drive the sim, not the whole suite,
 * and stops at the first failing test, so a killed mutant costs a couple of seconds instead of the
 * whole suite. A mutant that makes one test run past 5 s counts as killed (the slowest takes ~1 s).
 * Survivors here may still be killed by tests elsewhere in src/.
 */
export default {
  ...base,
  mutate: ['src/sim/**/*.ts', '!src/sim/**/*.test.ts'],
  commandRunner: { command: 'npx vitest run src/sim src/core/ladder.test.ts --isolate=false --maxWorkers=2 --bail=1 --testTimeout=5000' },
  // keep results between runs: only mutants in changed code or under changed tests run again
  incremental: true,
  incrementalFile: 'reports/mutation/sim-incremental.json',
  concurrency: 2,
  timeoutMS: 10_000,
  jsonReporter: { fileName: 'reports/mutation/sim.json' },
  htmlReporter: { fileName: 'reports/mutation/sim.html' },
};
