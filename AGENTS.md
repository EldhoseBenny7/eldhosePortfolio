# AGENTS.md

## Project context

This repository is a Vite + React + TypeScript portfolio site. The app is intentionally small, content-driven, and organized around a single portfolio data model in `src/content/portfolio.ts`, reusable UI sections in `src/components`, and top-level composition in `src/App.tsx`.

## Required operating rules

- Inspect the current code, tests, and configuration before editing. Never assume an implementation from memory.
- Follow the workflow in `docs/DEVELOPMENT.md` and read the relevant subject-specific standard before making changes; use the specific document rather than copying its detailed rules here.
- Prefer the smallest maintainable change that solves the problem and verify it with the repository's existing quality gates.
- Reuse the current React, TypeScript, Vite, and testing patterns before introducing new abstractions or dependencies.
- For any UI/UX, styling, interaction, accessibility, or responsive-layout work, use the installed `ui-ux-pro-max` skill before implementation. The repository already contains the skill under `.agents/skills/ui-ux-pro-max` and it should remain intact.
- Preserve the existing GitHub Pages deployment flow, Vite base path, and portfolio content unless a task explicitly requires a different, reviewed change.
- Do not bypass checks, add secrets, or claim verification that has not been run.

## Standards and guidance

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/UI_UX_STANDARDS.md](docs/UI_UX_STANDARDS.md)
- [docs/SECURITY.md](docs/SECURITY.md)
- [docs/PERFORMANCE.md](docs/PERFORMANCE.md)
- [docs/QUALITY.md](docs/QUALITY.md)
- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)

## Quality gates and definition of done

- Follow `docs/QUALITY.md` for the full local and CI workflow. Run applicable checks after changes: typecheck, lint, formatting, tests, and production build as appropriate for the scope.
- Ensure the change is consistent with the current project architecture and does not alter unrelated sections or deployment behavior.
- The work is done only when the evidence matches the requested outcome and the repository still passes its configured checks.

## Security and scope restrictions

- Keep secrets, tokens, and environment values out of source control.
- Do not modify the GitHub Pages deployment workflow or deployment URL without explicit approval.
- Do not redesign the portfolio, replace personal content, add a 3D hero, or make unrelated product changes.
- Report actual results, blockers, and limitations truthfully.
