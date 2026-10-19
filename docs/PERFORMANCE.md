# Performance standards

## Principles

- Measure before optimizing. First establish a reproducible symptom or baseline relevant to the changed experience.
- Do not invent bundle-size, memory, frame-rate, or loading budgets. Set budgets only after measuring the actual portfolio, assets, and supported devices.
- Avoid unnecessary runtime dependencies and code. Split code only when it improves loading for real user journeys rather than as a blanket rule.
- Consider users on lower-powered devices, constrained networks, and battery-powered hardware.

## Rendering and assets

- Keep React state and effects focused on actual behavior. Avoid redundant state, unnecessary rerenders, and expensive work in render paths.
- Use memoization only when measurement or a clear computational reason justifies its complexity.
- Clean up subscriptions, event listeners, observers, animation loops, and resources owned by components.
- Use appropriately sized, responsive images and optimize large image, texture, and model assets. Avoid redundant network requests.
- Reserve media and canvas dimensions to prevent layout shifts.
- Prefer CSS for simple visual effects and avoid unnecessary background animation.
- Respect reduced-motion preferences.

## Hero visual

The hero lazily loads its Three.js scene and retains a CSS illustration as a
fallback. It skips the scene when WebGL is unavailable or the browser reports
data saving or very low device memory, and returns to the fallback after scene
failure. The canvas uses demand-driven rendering; pointer interaction requests
updates, while reduced motion disables the scene's motion response. Keep these
fallbacks and the text's independence intact when changing the hero.

## Measurement and validation

Use the production build output and browser measurements to understand changes in transfer size, loading, rendering, and interaction. Where representative real-user or lab measurements are available, use Core Web Vitals as reference goals; do not present them as achieved without measurements. For changes that affect rendering or assets, compare the relevant before/after behavior and document trade-offs.
