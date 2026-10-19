# Development workflow

Follow this workflow for code and configuration changes. Scale validation to the risk and scope, and state clearly which checks were skipped.

## Before implementation

1. Inspect the working tree and the affected files, tests, nearby patterns, and relevant configuration.
2. Translate the request into observable requirements, constraints, and acceptance criteria. Preserve existing behavior unless a change is requested.
3. Read `AGENTS.md`, `.github/copilot-instructions.md`, this guide, and the relevant subject-specific standards; do not load every standard for an unrelated small change.
4. Activate a relevant installed skill when the task calls for it. For interface design or implementation, use the installed `ui-ux-pro-max` skill and read `docs/UI_UX_STANDARDS.md`.
5. Consult current authoritative documentation when an API, security practice, accessibility criterion, or tool behavior may have changed. Distinguish confirmed facts from assumptions.
6. Identify the smallest useful implementation and its direct validation plan. Ask a focused question only when required information cannot be safely inferred.

## During implementation

- Make small, coherent, reviewable changes. Prefer clarity and simplicity over cleverness.
- Reuse existing architecture and dependencies where they genuinely fit. Keep content separate from rendering where appropriate.
- Avoid premature abstractions, broad rewrites, unrelated refactoring, and unnecessary dependencies.
- Preserve existing behavior unless the request explicitly changes it; explain meaningful trade-offs.
- Surface errors and uncertainty. Do not conceal failures, invent facts, or use silent success-shaped fallbacks.
- Do not disable checks, modify deployment behavior without approval, expose secrets, or execute destructive operations without authorization.

## After implementation

1. Inspect the diff and confirm it contains only intended changes.
2. Run the relevant tests and quality gates documented in `docs/QUALITY.md`.
3. Review potential regressions and applicable security, accessibility, and performance concerns.
4. For user-visible interface changes, verify actual browser behavior at representative viewports and keyboard/focus states; compilation alone is insufficient.
5. Report changed files, exact validation results, skipped checks, and remaining limitations. Identify follow-up work only when it is genuinely necessary.

## Vibe-coding safeguards

- Read and test generated code; generation is not evidence of correctness.
- Verify packages, commands, APIs, and framework behavior against current authoritative sources when that matters.
- Do not install dependencies when the existing stack is sufficient.
- Avoid giant rewrites, speculative file structures, and unnecessary abstraction.
- Never push, deploy, expose secrets, or perform destructive operations without authorization.
