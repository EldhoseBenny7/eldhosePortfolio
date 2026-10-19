# Quality and verification

The npm scripts below are defined in `package.json`; the checks run in GitHub Actions are defined in `.github/workflows/quality.yml`. Preserve these gates rather than weakening them to make a change pass.

## Existing commands

| Command                | Verifies                                                                                          | Does not prove                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `npm ci`               | Reproducibly installs the lockfile dependency tree in a clean CI workspace.                       | That dependencies are risk-free or that application behavior is correct. |
| `npm run typecheck`    | TypeScript project build/type checks using the repository's configured compiler options.          | Runtime correctness, visual quality, or accessibility conformance.       |
| `npm run lint`         | ESLint rules over the repository, including TypeScript, React Hooks, refresh, and jsx-a11y rules. | Complete accessibility, security, or functional correctness.             |
| `npm run format:check` | Prettier formatting for files not excluded by `.prettierignore`.                                  | Code quality or semantic correctness.                                    |
| `npm run test`         | Runs the Vitest test suite once; current tests use jsdom and Testing Library.                     | Real-browser rendering, all viewport behavior, or untested edge cases.   |
| `npm run build`        | Runs `tsc -b` followed by a production Vite build.                                                | Live deployment success, runtime behavior, or Core Web Vitals.           |

`npm run dev`, `npm run preview`, and `npm run test:watch` are development helpers, not substitutes for the required checks. `npm run format` writes formatting changes; use it only on intentionally changed files rather than reformatting unrelated files.

## Local validation

After meaningful code changes, run the applicable checks. For a complete code change, run:

```text
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

For documentation-only changes, run `npm run format:check` when documentation files have changed. Do not claim a skipped check passed. If a check fails, inspect the cause, fix issues introduced by the change, and distinguish pre-existing failures from regressions. Do not suppress errors by broadening ignore rules or weakening tool configuration.

## Tests and regression review

Tests should cover observable behavior at the level of risk: accessible names and roles, navigation destinations, user interactions, and meaningful state transitions. Prefer Testing Library queries that reflect how users and assistive technology locate controls. Keep tests focused and avoid asserting implementation details.

Review adjacent behavior after a change. A passing existing test suite does not establish that new behavior is covered. Add or update tests when behavior changes or a regression risk justifies them. UI changes also need browser verification as described in `docs/UI_UX_STANDARDS.md`.

## CI and release evidence

The `Quality checks` workflow runs on `push`, `pull_request`, and `workflow_dispatch`. Its quality job uses Node.js 22, runs `npm ci`, then typecheck, lint, format check, tests, and production build. For non-PR events on `main`, it uploads the Pages artifact. The deploy job runs only for those same main-branch non-PR events and uses the existing Pages permissions and environment.

Local success is not evidence that remote GitHub Actions passed. A green CI run is not proof that the live GitHub Pages deployment is reachable or correct. Report these separately and claim live deployment verification only when it was actually checked.

## Acceptance and reporting

A change is acceptable when it meets the request, preserves unrelated behavior, passes the applicable checks, and has no unresolved introduced failures. Report each validation command as passed, failed, skipped, or unavailable with the actual reason. If environmental limitations prevent a check, describe the limitation precisely and give the user any necessary manual verification steps.
