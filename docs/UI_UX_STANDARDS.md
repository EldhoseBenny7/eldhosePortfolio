# UI/UX and accessibility standards

## Design process

Before choosing a visual direction, identify the interface purpose, users, content priority, primary tasks, technical constraints, and measurable success criteria. Inspect the existing implementation and preserve the portfolio's intended identity and truthful content. Do not invent experience, metrics, testimonials, project details, or other personal claims.

For applicable interface design, component design, visual changes, responsive layouts, interactions, or accessibility work, use the installed `ui-ux-pro-max` skill before implementation:

1. Read the skill's `SKILL.md` and follow its documented workflow.
2. Use its focused search/recommendation mechanism when relevant, verifying that the result fits the actual product and platform.
3. Adapt recommendations to this repository's React/Vite/TypeScript stack, architecture, tokens, and task constraints.
4. Treat accessibility, usability, performance, and explicit user requirements as mandatory constraints.
5. Verify the implemented behavior in a real browser and report honestly if the skill could not be loaded or invoked.

The skill provides design intelligence; it does not supersede these standards or authorize a redesign.

## Visual system

- Reuse and extend existing CSS custom properties in `src/styles/tokens.css` for color, surfaces, typography, spacing, radii, borders, layering, shadows, focus, and motion. Do not add arbitrary repeated values when a suitable token exists.
- Establish a clear hierarchy, consistent alignment, useful whitespace, and a content width appropriate to the page. Keep text line lengths and type sizes readable.
- Maintain a restrained, distinctive identity that serves portfolio content. Avoid gratuitous gradients, glow, glassmorphism, decoration, and animation.
- Reusable components should have consistent semantics, behavior, and interaction states. Do not add wrappers or abstractions merely to maximize reuse.
- Keep visual choices consistent with existing layout and content; do not alter personal content without approval.

## Responsive behavior

- Build from small screens upward using fluid sizing and content-driven breakpoints.
- Check a small mobile viewport, tablet-width viewport, and desktop viewport. Include landscape or narrow-width cases when relevant to the changed layout.
- Prevent horizontal page overflow, clipped text, accidental overlaps, and inaccessible or broken navigation.
- Use responsive image sizing and appropriate asset resolutions. Reserve dimensions for image, video, or canvas content to avoid layout shifts.
- Reconsider content order and interaction patterns at small sizes; do not merely shrink a desktop layout.

## Accessibility target

Target WCAG 2.2 AA for applicable content and interactions. This is a development target, not a claim of conformance; document scope and evidence, and do not claim full conformance without a suitable evaluation.

- Use semantic HTML, a logical heading hierarchy, and native controls when possible.
- Make all interactions keyboard operable with a logical focus order and a clearly visible focus indicator.
- Provide accessible names, labels, descriptions, and meaningful link purpose. Do not rely on color, position, or icon shape alone to communicate meaning.
- Meet text contrast and non-text contrast requirements for the applicable content and control states.
- Meet WCAG 2.2 AA target-size requirements (24 by 24 CSS pixels, subject to the criterion's exceptions) and use larger targets when touch context benefits; avoid tightly packed controls.
- Respect `prefers-reduced-motion`; keep motion purposeful and never make it the only way to access information.
- Provide clear validation and status feedback. Announce asynchronous status changes appropriately without overwhelming assistive technology.
- Consider screen-reader reading order and test with assistive technology for complex or high-risk interactions.
- Use automated accessibility checks as one signal among manual keyboard, visual, and assistive-technology review; passing lint rules alone is not proof of accessibility.

## Interaction and feedback

Keep navigation destinations correct and call-to-action hierarchy clear. Provide appropriate hover, focus, active, selected, disabled, loading, success, and error states wherever those states apply. Interactions should be predictable, provide feedback, and avoid scroll hijacking. Forms need clear instructions, actionable validation messages, and understandable submission feedback.

## Visual and behavioral verification

For UI changes, verify in a real browser at representative small-mobile, tablet, and desktop sizes. Check keyboard-only navigation, visible focus, reduced-motion behavior, contrast, text zoom/reflow where relevant, content overflow, and actual interaction destinations/states. Check browser console errors and failed resource loads. Use automated testing and accessibility tooling as supporting evidence, not as substitutes for manual checks.

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) for custom widgets when native HTML is insufficient
