## Learned User Preferences

- Use Bun for package installs and lockfile work in this repository (`bun install`, `bun run` for scripts); avoid defaulting to npm for dependency installs.
- Do not run `bun run build` after every task when changes are content-only or rules-only; reserve builds for code, styling, config, dependency, or behavior changes that need compilation verification.
- For release requests, bump `package.json` version, tag `v*`, push to `main`, and publish GitHub release notes via `gh release create` using the Highlights / Content / Full Changelog format.
- Feature branches use the `cursor/` prefix (e.g., `cursor/short-description`).

## Learned Workspace Facts

- Portfolio projects on the site are defined as JSON under `content/projects/`; list ordering often relies on numeric filename prefixes.
- Certifications are defined as JSON under `content/certifications/`; list ordering often relies on numeric filename prefixes.
- Uses page content lives in `content/uses.md`; hardware product links should point to amazon.in product pages.
- Homepage social links are defined in `content/contact.json`; the first five render inline and the rest appear in the `+N` overflow via `PortfolioSocialLinks`.
- Production site deploys to Vercel at https://akshara.dev; pushes to `main` trigger automatic deploys.
- `package.json` pins Bun via a `packageManager` field for reproducible installs.
- `package.json` overrides pin `estree-walker` to `2.0.2` so Vercel `bun install` / `nuxt prepare` does not break on ESM-only v3.
- `nuxt-llms` expects `llms.domain`; it is wired from `NUXT_PUBLIC_SITE_URL` with a localhost fallback when that env var is unset.
- Visitor globe markers are driven from Ably Presence locations via `useAblyVisitors().locations`.
- Live visitor presence is Vercel-safe through Ably; keep `ABLY_API_KEY` server-only and avoid reintroducing app-hosted Nitro WebSocket visitor routes on Vercel.
- `DESIGN.md` at the repo root follows the Google DESIGN.md format (YAML tokens + prose); `/DESIGN.md` is served via a Nitro route for download from the Resources page.
- Below the `md` breakpoint (768px), mobile navigation uses a fixed bottom tab bar (`MobileBottomNav.vue`); shared nav items live in `app/constants/siteNav.ts`.