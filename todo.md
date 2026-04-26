# Nuxt Page Speed Optimization TODO

## Phase 1 - Baseline and Measurement

- [ ] Run Lighthouse (mobile + desktop) for `/`, `/blog`, `/projects`, `/shop`.
- [ ] Record baseline CWV: LCP, INP, CLS, plus TBT and FCP.
- [x] Run bundle analysis with `bunx nuxi analyze` and capture largest chunks.
- [ ] Capture request waterfall for key pages and note heavy assets/scripts.

## Phase 2 - Quick Wins (Highest ROI)

- [ ] Add `routeRules` in `nuxt.config.ts`:
  - [ ] `prerender` for static pages (`/`, `/uses`, `/resources`).
  - [ ] `swr`/`isr` for content-heavy routes (`/blog/**`, `/projects`, `/shop`).
- [ ] Install and configure `@nuxt/image`.
- [ ] Replace page-critical `<img>` with `<NuxtImg>` where applicable.
- [ ] Set image loading priority:
  - [ ] above-the-fold images: eager + high priority
  - [ ] below-the-fold images: lazy + low priority
- [ ] Review Umami loading strategy and defer non-critical script work.

## Phase 3 - Hydration and JavaScript Budget

- [x] Lazy-hydrate non-critical components (e.g. secondary widgets/sections).
- [x] Keep heavy libraries route-scoped via dynamic imports (especially `mermaid`).
- [ ] Audit and remove unused dependencies and dead imports.
- [ ] Re-check chunk sizes after each cleanup.

## Phase 4 - Nuxt Runtime Tuning

- [x] Test `experimental.payloadExtraction: 'client'` in `nuxt.config.ts`.
- [x] Evaluate `experimental.writeEarlyHints` (keep only if measurable gain).
- [x] Review Nuxt link prefetch behavior for mobile-heavy traffic.

## Phase 5 - Verification and Guardrails

- [ ] Re-run Lighthouse and compare against baseline.
- [ ] Confirm no regressions in SSR hydration warnings and route behavior.
- [ ] Define performance budgets per route:
  - [ ] max JS payload
  - [ ] max image weight
  - [ ] CWV targets
- [ ] Add performance checks to release workflow.

## Target Outcomes

- [ ] LCP < 2.5s on mobile for top landing pages.
- [ ] INP < 200ms.
- [ ] CLS < 0.1.
- [ ] 20-40% reduction in initial JS on content-focused routes.
