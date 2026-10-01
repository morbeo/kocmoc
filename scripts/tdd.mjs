#!/usr/bin/env node
// TDD session state machine. See docs/TDD.md.
//
//   spec ──approve-spec*──▶ test ──submit-tests──▶ review ──lock*──▶ implement ──submit──▶ mutate ──(score ok)──▶ accept ──done*──▶ archived
//                            ▲                       │                  ▲                     │
//                            └─────reject-tests──────┘                  └──────rework─────────┤
//                            └──────────────────────────unlock*───────────────────────────────┘
//   * human gate: blocked for agents by .claude/hooks/tdd-guard.mjs
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  BASELINE_DIR, MUTATION_REPORT, MUTATION_THRESHOLD, SPEC, STATE, WATCHED_DIRS, isTestFile,
} from './tdd-policy.mjs';

const [cmd, ...args] = process.argv.slice(2);

const die = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};
const ok = (msg) => console.log(`✓ ${msg}`);
const run = (command, cmdArgs, opts = {}) => spawnSync(command, cmdArgs, { stdio: 'inherit', ...opts }).status;

const load = () => (existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : null);
const save = (s) => {
  const history = [...(s.history ?? []), { cmd, phase: s.phase, at: new Date().toISOString() }];
  writeFileSync(STATE, JSON.stringify({ ...s, history }, null, 2) + '\n');
};
function need(...phases) {
  const s = load();
  if (!s) die('no active TDD session. Start one with: npm run tdd -- start <slug>');
  if (!phases.includes(s.phase)) die(`command not valid in phase "${s.phase}" (expected: ${phases.join(', ')})`);
  return s;
}

const sha = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');
function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const hashAll = (files) => Object.fromEntries(files.map((f) => [f, sha(f)]));
const watchedFiles = () => WATCHED_DIRS.flatMap(walk);
const changedSince = (baseline) => watchedFiles().filter((f) => baseline[f] !== sha(f));

function lockViolations(lock) {
  const current = hashAll(watchedFiles().filter(isTestFile));
  const problems = [];
  for (const [f, h] of Object.entries(lock)) {
    if (!(f in current)) problems.push(`deleted: ${f}`);
    else if (current[f] !== h) problems.push(`modified: ${f}`);
  }
  for (const f of Object.keys(current)) if (!(f in lock)) problems.push(`added: ${f}`);
  return problems;
}
function verifyLock(s) {
  const problems = lockViolations(s.lock);
  if (problems.length) die(`locked tests were tampered with:\n  ${problems.join('\n  ')}`);
  ok(`test lock intact (${Object.keys(s.lock).length} files)`);
}

// Changed line ranges of a source file relative to the session baseline, for Stryker's --mutate.
function mutateSpecs(file) {
  const base = join(BASELINE_DIR, file);
  if (!existsSync(base)) return [file]; // new file: mutate all of it
  const diff = spawnSync('git', ['diff', '--no-index', '-U0', base, file], { encoding: 'utf8' }).stdout;
  const specs = [];
  for (const m of diff.matchAll(/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(m[1]);
    const count = m[2] === undefined ? 1 : Number(m[2]);
    if (count > 0) specs.push(`${file}:${start}-${start + count - 1}`);
  }
  return specs;
}

const NEXT = {
  spec: 'Orchestrator drafts .tdd/spec.md, then the USER runs: npm run tdd -- approve-spec',
  test: 'tdd-test-writer writes failing tests, then runs: npm run tdd -- submit-tests',
  review: 'tdd-test-reviewer reviews. CHANGES → npm run tdd -- reject-tests. APPROVE → USER runs: npm run tdd -- lock',
  implement: 'tdd-implementer makes tests pass, then runs: npm run tdd -- submit',
  mutate: 'Run: npm run tdd -- mutate. Survivors → rework (code) or USER runs: npm run tdd -- unlock (more tests)',
  accept: 'tdd-test-reviewer checks spec conformance, then USER runs: npm run tdd -- done',
};

const commands = {
  start() {
    const slug = args[0];
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) die('usage: tdd start <kebab-case-slug>');
    if (load()) die('a TDD session is already active (see: npm run tdd -- status)');
    mkdirSync('.tdd', { recursive: true });
    rmSync(BASELINE_DIR, { recursive: true, force: true });
    for (const d of WATCHED_DIRS) if (existsSync(d)) cpSync(d, join(BASELINE_DIR, d), { recursive: true });
    if (!existsSync(SPEC)) {
      writeFileSync(SPEC, `# ${slug}\n\n## Context\n\n## Requirements\n\n- R1: \n\n## Acceptance criteria\n\n- A1 (R1): \n\n## Out of scope\n\n## Open questions\n`);
    }
    save({ slug, phase: 'spec', round: 0, implemented: false, baseline: hashAll(watchedFiles()), lock: null, mutation: null });
    ok(`session "${slug}" started in phase spec`);
    console.log(`→ ${NEXT.spec}`);
  },

  'approve-spec'() {
    const s = need('spec');
    if (/- R1: *\n/.test(readFileSync(SPEC, 'utf8'))) die(`${SPEC} still has the empty template`);
    save({ ...s, phase: 'test' });
    ok('spec approved → phase test');
  },

  'submit-tests'() {
    const s = need('test');
    const tests = changedSince(s.baseline).filter(isTestFile);
    if (!tests.length) die('no new or changed test files since the session started');
    save({ ...s, phase: 'review' });
    ok(`tests submitted for review → phase review\n  ${tests.join('\n  ')}`);
  },

  'reject-tests'() {
    const s = need('review');
    save({ ...s, phase: 'test' });
    ok('tests sent back → phase test');
  },

  lock() {
    const s = need('review');
    const tests = changedSince(s.baseline).filter(isTestFile);
    if (!s.implemented) {
      // Red first: the new tests must fail before any implementation exists.
      console.log('Checking the new tests are red...');
      const specs = tests.filter((f) => !f.includes('__snapshots__'));
      if (run('npx', ['vitest', 'run', ...specs]) === 0) die('new tests already pass: they do not specify new behaviour');
      ok('new tests are red');
    }
    const lock = hashAll(watchedFiles().filter(isTestFile));
    save({ ...s, phase: 'implement', lock });
    ok(`locked ${Object.keys(lock).length} test files → phase implement`);
  },

  submit() {
    const s = need('implement');
    verifyLock(s);
    if (run('npx', ['vitest', 'run']) !== 0) die('test suite is not green');
    if (run('npx', ['tsc', '--noEmit']) !== 0) die('typecheck failed');
    const sources = changedSince(s.baseline).filter((f) => !isTestFile(f) && /\.[cm]?[jt]sx?$/.test(f));
    if (!sources.length) die('no changed source files');
    save({ ...s, phase: 'mutate', implemented: true, sources });
    ok(`all green, typecheck clean → phase mutate\n  ${sources.join('\n  ')}`);
  },

  mutate() {
    const s = need('mutate');
    verifyLock(s);
    const specs = s.sources.filter((f) => existsSync(f)).flatMap(mutateSpecs);
    if (!specs.length) die('no changed lines to mutate');
    rmSync('reports/mutation/mutation.json', { force: true });
    run('npx', ['stryker', 'run', '--mutate', specs.join(',')]);
    if (!existsSync('reports/mutation/mutation.json')) die('Stryker produced no report (see output above)');

    const report = JSON.parse(readFileSync('reports/mutation/mutation.json', 'utf8'));
    const all = Object.entries(report.files).flatMap(([file, f]) => f.mutants.map((m) => ({ file, ...m })));
    const count = (...st) => all.filter((m) => st.includes(m.status)).length;
    const detected = count('Killed', 'Timeout');
    const valid = detected + count('Survived', 'NoCoverage');
    const score = valid ? (100 * detected) / valid : 100;
    const survivors = all.filter((m) => m.status === 'Survived' || m.status === 'NoCoverage');
    const lines = survivors.map(
      (m) => `- ${m.file}:${m.location.start.line}:${m.location.start.column} ${m.status} ${m.mutatorName} → \`${(m.replacement ?? '').replace(/\s+/g, ' ').slice(0, 100)}\``,
    );
    writeFileSync(MUTATION_REPORT, `# Mutation report: ${s.slug} (round ${s.round})\n\nScore: ${score.toFixed(1)}% (threshold ${MUTATION_THRESHOLD}%), ${detected}/${valid} detected\n\n## Surviving mutants\n\n${lines.join('\n') || 'none'}\n`);

    const passed = score >= MUTATION_THRESHOLD;
    save({ ...s, phase: passed ? 'accept' : 'mutate', mutation: { score, survivors: survivors.length } });
    console.log(`\nMutation score ${score.toFixed(1)}% (threshold ${MUTATION_THRESHOLD}%), ${survivors.length} survivors → ${MUTATION_REPORT}`);
    if (!passed) die('below threshold. Triage survivors: weak tests → user unlock; dead/redundant code → rework');
    ok('mutation threshold met → phase accept');
  },

  rework() {
    const s = need('mutate', 'accept');
    save({ ...s, phase: 'implement' });
    ok('→ phase implement (tests stay locked)');
  },

  unlock() {
    const s = need('implement', 'mutate', 'accept');
    save({ ...s, phase: 'test', lock: null, round: s.round + 1 });
    ok(`tests unlocked → phase test (round ${s.round + 1})`);
  },

  done() {
    const s = need('accept');
    verifyLock(s);
    const dir = join('.tdd/archive', s.slug);
    mkdirSync(dir, { recursive: true });
    renameSync(SPEC, join(dir, 'spec.md'));
    if (existsSync(MUTATION_REPORT)) renameSync(MUTATION_REPORT, join(dir, 'mutation.md'));
    const { baseline, ...summary } = s;
    writeFileSync(join(dir, 'session.json'), JSON.stringify({ ...summary, finishedAt: new Date().toISOString() }, null, 2) + '\n');
    rmSync(STATE);
    rmSync(BASELINE_DIR, { recursive: true, force: true });
    ok(`session "${s.slug}" archived to ${dir}. Review the diff and commit.`);
  },

  abort() {
    const s = load();
    if (!s) die('no active TDD session');
    rmSync(STATE);
    rmSync(BASELINE_DIR, { recursive: true, force: true });
    ok(`session "${s.slug}" aborted. Files on disk (including ${SPEC}) are left as they are.`);
  },

  status() {
    const s = load();
    if (!s) return console.log('No active TDD session.');
    console.log(`Session: ${s.slug}   phase: ${s.phase}   round: ${s.round}`);
    if (s.mutation) console.log(`Last mutation score: ${s.mutation.score.toFixed(1)}% (${s.mutation.survivors} survivors)`);
    if (s.lock) {
      const problems = lockViolations(s.lock);
      console.log(problems.length ? `Lock VIOLATED:\n  ${problems.join('\n  ')}` : `Lock intact (${Object.keys(s.lock).length} test files)`);
    }
    console.log(`Next: ${NEXT[s.phase]}`);
  },

  // For CI: fail if a locked session's tests were changed.
  verify() {
    const s = load();
    if (!s?.lock) return ok('no locked TDD session');
    verifyLock(s);
  },
};

(commands[cmd] ?? (() => die(`usage: tdd <${Object.keys(commands).join('|')}>`)))();
