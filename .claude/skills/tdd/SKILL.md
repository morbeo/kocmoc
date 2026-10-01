---
name: tdd
description: Build a feature test-first with three isolated agents (test writer → test reviewer → implementer), hook-enforced phase locks, and mutation testing. Use when the user asks to build or change behaviour with TDD, or runs /tdd <feature description>.
---

# TDD orchestration

You are the **orchestrator**. You do not write tests or implementation yourself. You drive the
state machine in `scripts/tdd.mjs`, delegate each phase to its agent, and stop at human gates.
Read `docs/TDD.md` once if you need the rationale.

Always start by running `npm run tdd -- status`. If a session is active, resume from its phase.

## User action format

Whenever the user must act (a human gate, an ambiguity, a blocked agent, a dependency or config
change, an equivalent-mutant claim), stop and print exactly this block, then end your turn:

```
━━━ USER ACTION REQUIRED ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gate:     <short name, e.g. "Lock tests (review → implement)">
Why:      <one sentence: what this decision controls>
Context:  <bullets: files to look at, agent verdicts, scores, counts, risks>
Do:       1. <concrete review step, e.g. a command or file to read>
          2. <the exact command, e.g. `! npm run tdd -- lock`>
Then:     <what to reply, e.g. "continue", and what happens next>
Instead:  <the alternative(s), e.g. "tell me what to change and I'll send it back to the writer">
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

- Gate commands start with `!` so they run in the user's shell. The guard blocks agents from
  running them. If `!` is unavailable, tell the user to run the command in a separate terminal.
- For a choice between options (not a command), use AskUserQuestion. Put the context in the question.
- Never claim a gate passed until `npm run tdd -- status` shows the next phase.

## Flow

### 1. Spec (phase `spec`)
1. `npm run tdd -- start <kebab-slug>`
2. Explore the relevant code and write `.tdd/spec.md`: context, numbered requirements (R1…),
   acceptance criteria (A1 (R1)…) phrased as observable behaviour with concrete examples,
   the public API (module path, signatures), out of scope, and open questions.
3. Resolve open questions with the user (AskUserQuestion). Gate: **Approve spec**, `! npm run tdd -- approve-spec`.

### 2. Tests (phase `test`)
Spawn `tdd-test-writer` with the spec path and, if any, the reviewer findings or surviving
mutants. It ends by running `submit-tests`.

### 3. Review (phase `review`)
Spawn `tdd-test-reviewer` in mode **tests**. It runs in a fresh context and must not see the writer's reasoning, only the files.
- `CHANGES`: run `npm run tdd -- reject-tests` and go back to step 2 with the findings verbatim.
  After 3 rejection rounds, escalate to the user.
- `SPEC ISSUES` that are not "none": escalate to the user before going on.
- `APPROVE`: gate **Lock tests**, `! npm run tdd -- lock`. In Context, list the test files, the
  criterion→test map, the reviewer's minor notes, and suggest the user skim the tests. The lock
  refuses if the new tests already pass (first round).

### 4. Implement (phase `implement`)
Spawn `tdd-implementer`. It ends by running `submit` (lock check, full suite, typecheck).
If it reports a wrong test or a needed dependency or config change, escalate to the user with the
evidence. Fixing a test requires `! npm run tdd -- unlock` and going back to step 2.

### 5. Mutation (phase `mutate`)
Run `npm run tdd -- mutate` yourself. It mutates only the lines changed in this session.
- Threshold met: phase moves to `accept`.
- Below threshold: read `.tdd/mutation.md` and triage each survivor:
  - **Weak test** (behaviour the spec requires but no test pins down): gate **Unlock tests for
    round N**, `! npm run tdd -- unlock`, then step 2 with the survivors, step 3, step 4 (usually
    already green), step 5.
  - **Dead or redundant code** (behaviour the spec does not require): `npm run tdd -- rework`,
    then the implementer removes it, then `submit` and `mutate`.
  - **Equivalent mutant** (no observable difference): escalate. Only the user may add a
    `// Stryker disable next-line <mutator>: <reason>` comment.
- After 3 mutation rounds, escalate with the report.

### 6. Accept (phase `accept`)
Spawn `tdd-test-reviewer` in mode **conformance**. `REJECT` → `rework` (code issues) or `unlock`
(test gaps). `ACCEPT` → gate **Finish**, `! npm run tdd -- done`. In Context, give the files
changed, the mutation score, the remaining survivors, and the reviewer's verdict. Remind the user to review
the diff and commit. Do not commit unless asked.

## Never
- Write tests or implementation yourself, or edit `.tdd/state.json`.
- Pass one agent's private reasoning to another. Pass only artifacts (spec, file paths, findings, survivors).
- Work around a guard block. A block means stop and report.
