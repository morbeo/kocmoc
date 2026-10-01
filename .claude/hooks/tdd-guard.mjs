// PreToolUse hook: enforces the TDD phase write policy for every agent (main and subagents).
// Exit 2 blocks the tool call and feeds stderr back to the agent.
import { existsSync, readFileSync } from 'node:fs';
import { isAbsolute, relative, resolve } from 'node:path';
import { HUMAN_GATES, STATE, writeBlockReason } from '../../scripts/tdd-policy.mjs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd;
const block = (msg) => {
  process.stderr.write(`TDD guard: ${msg}\n`);
  process.exit(2);
};

const statePath = resolve(root, STATE);
const phase = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')).phase : null;
const tool = input.tool_name;
const ti = input.tool_input ?? {};

if (tool === 'Bash') {
  const cmd = String(ti.command ?? '');
  if (!phase) process.exit(0);
  const gate = HUMAN_GATES.find((g) => new RegExp(`\\btdd(\\.mjs)?\\b[^;&|]*\\s${g}\\b`).test(cmd));
  if (gate) block(`"tdd ${gate}" is a human gate. Present it to the user as a USER ACTION REQUIRED block and wait.`);

  if (/Stryker\s+disable/i.test(cmd)) block('only the user may suppress mutants.');
  if (/\b(npm|pnpm|yarn)\s+(i|install|add|uninstall|remove|rm|update|up)\b/.test(cmd)) {
    block('changing dependencies during a TDD session needs the user. Ask for it as a USER ACTION REQUIRED.');
  }
  if (/\bgit\s+(checkout|restore|stash|reset|clean|apply|rm|mv|commit|push)\b/.test(cmd)) {
    block('git commands that change the working tree or history are not allowed during a TDD session.');
  }
  if (/\bvitest\b.*\s(-u|--update)\b/.test(cmd)) block('updating snapshots rewrites tests.');

  // Heuristic: a write-like command that mentions a path the current phase may not write.
  const stripped = cmd.replace(/\d*>&\d/g, '').replace(/\d*>\s*\/dev\/null/g, '');
  const writes = /(>|\btee\b|\bsed\b[^|;]*\s-i|\bperl\b[^|;]*\s-[a-z]*i|\bmv\b|\bcp\b|\brm\b|\btouch\b|\bchmod\b|\bln\b|\btruncate\b|\bdd\b|writeFile|appendFile|unlink|rename|copyFile|rmSync|open\([^)]*['"][wa])/;
  if (writes.test(stripped)) {
    const tokens = stripped.split(/[\s'"`;|&()<>=,]+/).filter((t) => /[/.]/.test(t) && !/^-/.test(t));
    for (const t of tokens) {
      const rel = isAbsolute(t) ? relative(root, t) : t.replace(/^\.\//, '');
      if (rel.includes('*') && /^(src|e2e|\.tdd)\b/.test(rel)) block('use explicit file paths, not globs, in write commands.');
      const reason = writeBlockReason(rel, phase);
      if (reason) block(`${reason} (via shell)`);
    }
  }
  process.exit(0);
}

if (!phase) process.exit(0);
const file = ti.file_path ?? ti.notebook_path;
if (!file) process.exit(0);
const content = [ti.content, ti.new_string, ...(ti.edits ?? []).map((e) => e.new_string)].join('\n');
if (/Stryker\s+disable/i.test(content)) block('only the user may suppress mutants. Present equivalent-mutant claims as a USER ACTION REQUIRED.');
const reason = writeBlockReason(relative(root, resolve(root, file)), phase);
if (reason) block(reason);
