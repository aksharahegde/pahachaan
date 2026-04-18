## Learned User Preferences

- Use Bun for package installs and lockfile work in this repository (`bun install`, `bun run` for scripts); avoid defaulting to npm for dependency installs.

## Learned Workspace Facts

- Portfolio projects on the site are defined as JSON under `content/projects/`; list ordering often relies on numeric filename prefixes.
- `package.json` pins Bun via a `packageManager` field for reproducible installs.
- `nuxt-llms` expects `llms.domain`; it is wired from `NUXT_PUBLIC_SITE_URL` with a localhost fallback when that env var is unset.
