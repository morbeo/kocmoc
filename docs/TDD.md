# Test-driven development with Claude

Run `/tdd <feature description>` in Claude Code. The main session acts as **orchestrator** and
delegates to three isolated agents. The design assumes any agent may try to "make it green" the
cheap way, so it makes cheating either impossible or detectable.

## Roles

| Agent | Phase | Can write | Defined in |
|---|---|---|---|
| Orchestrator (main session) | spec, mutate triage | `.tdd/spec.md` only | `.claude/skills/tdd/SKILL.md` |
| `tdd-test-writer` | test | test files only | `.claude/agents/tdd-test-writer.md` |
| `tdd-test-reviewer` | review, accept | nothing | `.claude/agents/tdd-test-reviewer.md` |
| `tdd-implementer` | implement | source files, never tests | `.claude/agents/tdd-implementer.md` |
| **You** | gates | anything | — |

Agents share only artifacts (spec, files, findings, mutation report), never reasoning, so the
reviewer judges the tests cold.

## Flow

```
spec ─approve-spec*→ test ─submit-tests→ review ─lock*→ implement ─submit→ mutate ─≥80%→ accept ─done*→ archived
                      ↑                    │              ↑                  │
                      └────reject-tests────┘              └─────rework───────┤
                      └─────────────────────unlock*──────────────────────────┘
* human gate
```

State lives in `.tdd/state.json` (with a transition `history`) and is managed only by
`npm run tdd -- <command>` (`scripts/tdd.mjs`). `npm run tdd -- status` shows the phase and next step.

When you need to act, the orchestrator prints a **USER ACTION REQUIRED** block with the gate,
why it matters, context, exact steps (`! npm run tdd -- lock`), and the alternatives.

## Mechanical enforcement

1. **Phase write policy:** a `PreToolUse` hook (`.claude/hooks/tdd-guard.mjs`, policy in
   `scripts/tdd-policy.mjs`) checks every Edit/Write/Bash call from every agent against the
   current phase. While a session is active, harness, state and test config (`.claude/`, `.tdd/state.json`,
   `vite.config.ts`, `tsconfig.json`, `stryker.config.mjs`, `package.json`, CI) are never writable.
   The hook also blocks dependency installs, tree-changing git commands, `vitest -u`, and
   `Stryker disable` comments.
2. **Human gates:** `approve-spec`, `lock`, `unlock`, `done`, `abort` are blocked for agents.
3. **Red first:** `lock` refuses if the new tests already pass.
4. **Hash lock:** `lock` records SHA-256 of every test file. `submit`, `mutate`, `done` and CI
   (`npm run tdd -- verify` in `deploy.yml`) fail on any added, modified or deleted test file.
5. **Green and typed:** `submit` requires the full suite to pass and `tsc --noEmit` to succeed.
6. **Mutation testing:** `mutate` runs Stryker only on lines changed in this session (diffed against
   a baseline snapshot in `.tdd/baseline/`). Score must be ≥ 80% (`MUTATION_THRESHOLD`).
   Survivors go to `.tdd/mutation.md` and are triaged as weak test (unlock, more tests), dead
   code (rework) or equivalent mutant (only you may suppress it).

## Limits (by design, be aware)

- The Bash check is a heuristic. A determined agent could write files through indirection (for
  example, generating and running a script). The hash lock, red-first check, mutation score,
  conformance review and the `history` log are the backstops. They detect tampering rather than prevent it.
  Always review the final diff, especially `git diff -- '*.test.ts'`.
- Gates rely on the hook telling agents and humans apart. If `history` shows a transition you
  didn't make, treat the session as compromised.

## Tooling notes

- Stryker uses the `command` runner (`npx vitest run` per mutant). The Vitest runner plugin
  (v10) doesn't activate mutants under Vitest 5: everything "survives".
- `tsconfigFile` points at a nonexistent file because Stryker's tsconfig rewriter calls an API
  TypeScript 7 removed. Revisit both when the Stryker plugins catch up.
- `npm run test:mutate` runs Stryker over all of `src/` outside the TDD flow.
