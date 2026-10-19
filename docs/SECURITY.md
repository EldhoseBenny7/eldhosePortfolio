# Security standards

This is a static frontend application. Keep security controls proportional to its actual attack surface; do not add a backend, authentication, tracking, or third-party analytics without an explicit requirement and security review.

## Sensitive data and configuration

- Never commit secrets, tokens, credentials, private user data, or machine-specific configuration.
- Treat every variable included in a Vite client build (including `VITE_*`) as public and inspectable by site visitors. Do not place secrets in frontend environment variables.
- Keep local environment files out of source control; provide only non-sensitive examples when needed.
- Do not expose CI secrets in logs, client bundles, or generated artifacts.

## Inputs, rendering, and links

- Validate data at trust boundaries; TypeScript types do not validate runtime input.
- Render untrusted content as text. Do not use `dangerouslySetInnerHTML` or equivalent unsafe HTML injection unless there is a compelling reviewed requirement and a robust sanitization strategy.
- Validate externally supplied or user-controlled URLs against the intended schemes and destinations before using them for navigation or resource loading.
- For links that open a new tab, use `rel="noopener noreferrer"` with `target="_blank"` unless a documented, safe alternative applies.
- Avoid embedding untrusted content in HTML, CSS, script, or URL contexts.

## Dependencies and external resources

- Minimize dependencies and prefer existing platform capabilities for simple needs.
- Review the package's provenance, maintenance, permissions, transitive dependencies, and relevance before adding or updating it.
- Use the lockfile and `npm ci` for reproducible CI installs. Review dependency advisories and updates as part of normal maintenance; an audit result is evidence to evaluate, not an automatic assurance of safety.
- Review remote scripts, fonts, images, model files, and other external resources for origin, integrity, privacy, licensing, and availability implications. Prefer local assets when appropriate.
- Do not download or execute untrusted generated code or tool output without reviewing it.

## GitHub Actions and deployment

- Preserve least-privilege workflow permissions, deployment conditions, environments, and secret handling.
- This repository currently grants `contents: read` to quality checks and scoped Pages/id-token permissions to the deploy job. Do not broaden these or alter deployment conditions without explicit approval and review.
- Never print secrets or tokens; mask and scope them when a task legitimately requires their use.
- Review changes to workflows, npm scripts, or external integrations for command injection and untrusted input flow.

## Review expectations

Review for unsafe HTML, URL handling, secret exposure, dependency/supply-chain risk, and workflow permission changes whenever relevant. For a new library, workflow, or external integration, document why it is needed and assess its security impact before adoption. Consult the primary guidance from [OWASP](https://owasp.org/www-project-top-ten/) and [GitHub Actions security hardening](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions) when the change warrants it.
