# Architecture

## Purpose and current stack

This repository is a static, single-page portfolio foundation built with React 19, TypeScript, and Vite. Vitest and React Testing Library provide the current component test setup; ESLint and Prettier provide static checks and formatting. The production bundle is built by Vite and deployed to GitHub Pages through `.github/workflows/quality.yml`.

The current Vite `base` is `/eldhosePortfolio/`. Keep it aligned with the GitHub Pages project URL. The workflow builds and deploys only from `main` for non-pull-request events; it runs quality checks on pushes, pull requests, and manual dispatches. Do not change either deployment behavior or permissions without explicit approval.

## Current source tree

```text
src/
  App.tsx                         Top-level page composition and skip link
  main.tsx                        Browser entry point and React root
  App.test.tsx                    App-level navigation and structure test
  index.css                       Imports global styles
  assets/                         Assets imported by source components
  components/
    layout/                       SiteHeader and SiteFooter
    sections/                     Hero, About, Education, Projects, Contact,
                                  shared title and hero visual components
  hooks/                          Reusable interaction hooks
  content/portfolio.ts            Typed portfolio content and navigation data
  styles/
    tokens.css                    CSS custom properties for shared design values
    global.css                    Global reset, page layout, and component styles
  test/setup.ts                   Vitest and Testing Library setup
```

`public/` contains static public assets. Root configuration files define Vite, TypeScript, ESLint, formatting, and npm scripts.

## Composition and data flow

`main.tsx` locates `#root`, throws an explicit error if it is absent, and mounts `App` under `StrictMode`. `App.tsx` composes the header, main sections, and footer, passing values from `portfolio.ts` through typed props. The content module defines interfaces for navigation items, projects, and capabilities and keeps placeholder content out of presentation components.

Layout components own site-wide framing and navigation. Section components
represent the current page's major content areas. Shared section titles and
hero visuals are implemented as focused components. Add shared components
when real use cases have materially consistent behavior or when centralizing
them improves accessibility or maintenance; avoid wrappers that only add
indirection.

Keep imports flowing from the app composition toward components and typed content. Components may import the types they consume. Avoid circular imports and avoid making content depend on presentation. Keep component APIs small and typed; pass only the data each component needs. Prefer local state for genuinely interactive behavior. Introduce a custom hook for reusable stateful behavior, a utility for pure reusable logic, or context only when prop passing or state ownership has become a demonstrated problem.

## Styling and design tokens

`src/index.css` imports `src/styles/global.css`, which uses values from `src/styles/tokens.css`. Tokens currently cover colors, typography, spacing, content width, radii, layering, shadow, focus, and motion duration/easing. Reuse or extend these tokens before adding repeated arbitrary values. Keep global resets and site-wide styles in `global.css`; keep component-specific selectors in the same stylesheet unless existing organization establishes a different pattern.

## Error and fallback behavior

The current app has no network calls, forms, runtime data loading, or application-level error boundary. The missing `#root` element is treated as a startup error, not silently ignored. For any future asynchronous feature, define explicit loading, success, empty, and error states and do not return success-shaped fallback data when a dependency fails.

## Testing boundaries

The current Vitest environment is `jsdom`, with setup in `src/test/setup.ts`. `src/App.test.tsx` covers the skip link, main navigation, and section headings. Tests should focus on observable user behavior and component semantics; this setup does not replace a real-browser check for visual layout, cross-viewport behavior, or browser-specific APIs.

## Hero visual

`HeroVisual` lazy-loads the Three.js scene and keeps the CSS artwork available
as a fallback. It avoids the 3D scene when WebGL is unavailable, the device
reports data saving or very low memory, or scene rendering fails. It responds
to the reduced-motion preference and only invalidates the scene as needed for
pointer interaction. The text content remains independent of the visual.
