#!/usr/bin/env node
// Prints coverage/coverage-summary.json (from `npm run coverage`) as a Markdown table: the totals,
// then the least-covered files. In CI it goes to the job summary; locally it prints to stdout.
//
//   node scripts/coverage-summary.mjs [--top N]   (default 10 files; 0 = totals only)
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { relative } from 'node:path';

const FILE = 'coverage/coverage-summary.json';
const i = process.argv.indexOf('--top');
const top = i > 0 ? Number(process.argv[i + 1]) : 10;
if (!Number.isInteger(top) || top < 0) {
  console.error('usage: node scripts/coverage-summary.mjs [--top N]');
  process.exit(2);
}
if (!existsSync(FILE)) {
  console.error(`${FILE} not found: run npm run coverage first`);
  process.exit(1);
}

const summary = JSON.parse(readFileSync(FILE, 'utf8'));
const KINDS = ['lines', 'statements', 'branches', 'functions'];
const pct = (m) => `${m.pct.toFixed(1)}%`;
const out = ['### Unit test coverage', '', '| | Lines | Statements | Branches | Functions |', '|---|---|---|---|---|'];
out.push(`| **All files** | ${KINDS.map((k) => `**${pct(summary.total[k])}**`).join(' | ')} |`);

const files = Object.entries(summary)
  .filter(([k, v]) => k !== 'total' && v.lines.total > 0)
  .map(([k, v]) => ({ file: relative(process.cwd(), k), v, missed: v.lines.total - v.lines.covered }))
  .filter((f) => f.missed > 0)
  .sort((a, b) => b.missed - a.missed)
  .slice(0, top);
if (files.length) {
  out.push('', `<details><summary>Most uncovered lines (top ${files.length})</summary>`, '', '| File | Lines | Uncovered | Branches |', '|---|---|---|---|');
  for (const f of files) out.push(`| \`${f.file}\` | ${pct(f.v.lines)} | ${f.missed} | ${pct(f.v.branches)} |`);
  out.push('', '</details>');
}

const md = out.join('\n') + '\n';
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
else process.stdout.write(md);
