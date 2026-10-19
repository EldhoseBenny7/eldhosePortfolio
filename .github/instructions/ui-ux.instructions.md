---
name: UI and accessibility guidance
description: Apply when implementing or changing React components or styles in the frontend.
applyTo: 'src/**/*.{tsx,css,scss}'
---

# Frontend UI instructions

- For relevant design, styling, responsive layout, interaction, and accessibility tasks, read the installed `ui-ux-pro-max` skill and use its documented workflow before implementation.
- Read `docs/UI_UX_STANDARDS.md`; use the skill as design guidance, not as a replacement for accessibility, security, performance, architecture, or the user's explicit requirements.
- Reuse existing CSS tokens and shared components when appropriate. Do not create wrappers or abstractions without a concrete reuse or behavior benefit.
- Use semantic HTML, accessible names and labels, keyboard-operable interactions, visible focus, and reduced-motion support.
- Build responsive layouts that remain usable without horizontal overflow, clipped content, or accidental overlap.
- Verify actual browser behavior at representative viewports, including keyboard/focus behavior, rather than relying only on a successful compile or test run.
- Do not assume these path-specific instructions apply to tasks whose changed files do not match `src/**/*.{tsx,css,scss}`.
