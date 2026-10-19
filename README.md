# Eldhose Benny — Developer Portfolio

A responsive portfolio built with React, TypeScript, and Vite. Page content is
maintained in `src/content/portfolio.ts`, reusable sections live under
`src/components`, and shared styles live in `src/styles`.

## Development

Install dependencies with `npm ci`, then start the local server with
`npm run dev`.

Run the project checks with:

```sh
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

The Vite base path is `/eldhosePortfolio/` for the existing GitHub Pages site.
Keep it aligned with the deployment URL when changing deployment settings.
