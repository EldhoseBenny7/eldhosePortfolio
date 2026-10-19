# Copilot instructions for EldhosePortfolio

## Working expectations

1. Understand the task, inspect the current implementation, and confirm the relevant standards before editing code.
2. Prefer the existing architecture and dependencies over creating new patterns or adding runtime dependencies.
3. For any UI design, redesign, component styling, visual hierarchy, responsive layout, interaction, accessibility, or design-system task, use the installed `ui-ux-pro-max` skill before implementation.
4. Read `docs/UI_UX_STANDARDS.md` for interface decisions, accessibility expectations, and design-system constraints.
5. Read `docs/ARCHITECTURE.md` before structural changes or refactors.
6. Read `docs/SECURITY.md` when modifying security-sensitive behavior, dependencies, CI, credentials, or external integrations.
7. Read `docs/PERFORMANCE.md` when optimizing loading, rendering, assets, animation, memory, or 3D behavior.
8. Read `docs/QUALITY.md` and `docs/DEVELOPMENT.md` for the repository workflow and verification expectations.
9. Follow `docs/QUALITY.md` for the correct quality gates after changes, including formatting checks when Markdown or code changes.
10. Keep the change narrow, reviewable, and evidence-based. Never disable checks or claim results without running them.

## Scope boundaries

- Do not redesign the portfolio or alter personal content.
- Do not implement a 3D hero unless the task explicitly requires it and the scope is approved.
- Do not change the Vite `base` path or the GitHub Pages deployment workflow.
- Do not add secrets, tokens, or environment data to the repo.
- Do not claim a deployment or production validation that was not run.

## Repository-specific defaults

- Components and content are intentionally simple and static; favor consistency with the current structure over introducing complex state management.
- The data model lives in `src/content/portfolio.ts`; use it rather than duplicating strings in components.
- The app is tested with Vitest and React Testing Library. Keep tests aligned with the current accessibility and navigation conventions.
- `AGENTS.md` provides compatible project-wide agent rules; use this file for Copilot-specific behavior and follow the canonical standards rather than duplicating their full contents.
