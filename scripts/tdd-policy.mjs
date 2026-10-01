// Shared by scripts/tdd.mjs (state machine) and .claude/hooks/tdd-guard.mjs (write blocker).

export const STATE = '.tdd/state.json';
export const SPEC = '.tdd/spec.md';
export const MUTATION_REPORT = '.tdd/mutation.md';
export const BASELINE_DIR = '.tdd/baseline';
export const WATCHED_DIRS = ['src', 'e2e'];
export const MUTATION_THRESHOLD = 80;

// Commands only the human may run (the guard blocks them for agents).
export const HUMAN_GATES = ['approve-spec', 'lock', 'unlock', 'done', 'abort'];

export const isTestFile = (rel) => /\.(test|spec)\.[cm]?[jt]sx?$/.test(rel) || /(^|\/)__snapshots__\//.test(rel);

// Files no agent may write while a TDD session is active: the session state, the harness,
// and every config that decides what "passing" means.
const PROTECTED = [
  /^\.tdd\/(?!spec\.md$)/,
  /^\.claude\//,
  /^scripts\/tdd/,
  /^stryker\.config\./,
  /^vite\.config\./,
  /^vitest\.config\./,
  /^playwright\.config\./,
  /^tsconfig.*\.json$/,
  /^package(-lock)?\.json$/,
  /^\.github\//,
];

/** Why an agent may not write `rel` (project-relative) in `phase`, or null if allowed. */
export function writeBlockReason(rel, phase) {
  if (rel.startsWith('..') || rel.startsWith('/')) return null; // outside the project
  if (PROTECTED.some((re) => re.test(rel))) {
    return `${rel} is protected during a TDD session (harness, state or test config). Changes need the user.`;
  }
  switch (phase) {
    case 'spec':
      return rel === SPEC ? null : `spec phase: only ${SPEC} is writable.`;
    case 'test':
      return isTestFile(rel) ? null : 'test phase: only test files (*.test.ts, *.spec.ts) are writable. Do not write implementation.';
    case 'implement':
      if (isTestFile(rel)) {
        return 'tests are locked. Never edit tests to make them pass. If a test looks wrong, stop and report it with evidence.';
      }
      return rel === SPEC ? 'the spec is approved and read-only. Report ambiguities instead of editing it.' : null;
    default:
      return `${phase} phase: file writes are not allowed.`;
  }
}
