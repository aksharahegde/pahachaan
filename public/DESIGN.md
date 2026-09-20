---
version: alpha
name: Pahachaan
description: Editorial Technical portfolio design system for akshara.dev
colors:
  primary: "#0ea5e9"
  neutral: "#71717a"
  surface-light: "#ffffff"
  surface-dark: "#09090b"
  on-surface-light: "#09090b"
  on-surface-dark: "#fafafa"
  text-body-light: "#3f3f46"
  text-body-dark: "#d4d4d8"
  text-secondary-light: "#52525b"
  text-secondary-dark: "#a1a1aa"
  text-muted-light: "#71717a"
  text-muted-dark: "#a1a1aa"
  border-light: "#e4e4e7"
  border-dark: "#27272a"
  row-hover-light: "rgb(255 255 255 / 0.4)"
  row-hover-dark: "rgb(255 255 255 / 0.05)"
  status-active: "#10b981"
  status-completed: "#22c55e"
  status-wip: "#f59e0b"
  status-abandoned: "#ef4444"
  status-default: "#a1a1aa"
  visitor-live: "#22c55e"
  theme-meta: "#18181b"
typography:
  page-title:
    fontFamily: Georgia, "Times New Roman", serif
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.06em
  page-title-lg:
    fontFamily: Georgia, "Times New Roman", serif
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.06em
  section-title:
    fontFamily: Georgia, "Times New Roman", serif
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.04em
  article-title:
    fontFamily: Georgia, "Times New Roman", serif
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.06em
  body-sans:
    fontFamily: Barlow
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.75
  body-row:
    fontFamily: Barlow
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  nav:
    fontFamily: Barlow
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  kicker:
    fontFamily: Barlow
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.18em
  label-caps:
    fontFamily: Barlow
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.16em
  display-heading:
    fontFamily: "JetBrains Mono"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.3
  display-kicker:
    fontFamily: "JetBrains Mono"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.18em
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 40px
  section: 56px
  row-y: 12px
  row-y-archive: 20px
  container-max: 1152px
  hero-max: 768px
  lead-max: 576px
  toc-width: 260px
  navbar-offset-sm: 32px
  navbar-offset-md: 40px
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
components:
  list-row:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.on-surface-light}"
    typography: "{typography.body-row}"
    padding: "{spacing.row-y}"
  list-row-hover:
    backgroundColor: "{colors.row-hover-light}"
  list-row-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-dark}"
  list-row-hover-dark:
    backgroundColor: "{colors.row-hover-dark}"
  row-border:
    backgroundColor: "{colors.border-light}"
  row-border-dark:
    backgroundColor: "{colors.border-dark}"
  meta-text:
    textColor: "{colors.text-muted-light}"
  meta-text-dark:
    textColor: "{colors.text-muted-dark}"
  secondary-text:
    textColor: "{colors.text-secondary-light}"
  secondary-text-dark:
    textColor: "{colors.text-secondary-dark}"
  neutral-label:
    textColor: "{colors.neutral}"
  navbar:
    backgroundColor: "rgb(255 255 255 / 0.9)"
    textColor: "{colors.text-body-light}"
    typography: "{typography.nav}"
    padding: 16px
  navbar-dark:
    backgroundColor: "rgb(9 9 11 / 0.9)"
    textColor: "{colors.text-body-dark}"
  footer-card:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.on-surface-light}"
    typography: "{typography.body-row}"
    rounded: "{rounded.xl}"
    padding: 16px
  footer-card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-dark}"
  status-dot-active:
    backgroundColor: "{colors.status-active}"
    size: 6px
  status-dot-completed:
    backgroundColor: "{colors.status-completed}"
    size: 6px
  status-dot-wip:
    backgroundColor: "{colors.status-wip}"
    size: 6px
  status-dot-abandoned:
    backgroundColor: "{colors.status-abandoned}"
    size: 6px
  status-dot-default:
    backgroundColor: "{colors.status-default}"
    size: 6px
  visitor-indicator:
    backgroundColor: "{colors.visitor-live}"
    size: 8px
  theme-chrome:
    backgroundColor: "{colors.theme-meta}"
---

# Pahachaan

## Overview

Pahachaan follows an **Editorial Technical** direction: a compact Nuxt portfolio that reads like a carefully edited technical profile, not a startup landing page. Typography, spacing, quiet dividers, and metadata hierarchy carry the experience. The work itself is the signal.

The visual personality is minimal, developer-native, and calm. Visitors should feel they are browsing a technical profile or long-form blog index — not a SaaS landing page. Borrow from technical writing, GitHub profiles, and type specimen pages; avoid hype, gradients, and decorative motion.

For voice, audience, and positioning, see [PRODUCT.md](./PRODUCT.md).

**Stack:** Nuxt 4, Nuxt UI 4, Tailwind CSS v4 (`app/assets/css/main.css`), Nuxt Content (`content/`), Solar / Simple Icons / Heroicons.

## Colors

The palette is rooted in zinc neutrals with a single sky accent. Surfaces stay quiet so project thumbnails and writing carry visual weight.

- **Primary (`#0ea5e9`):** Sky accent for focus rings, archive-title hovers, and the loading indicator. Use sparingly — not for every link hover.
- **Neutral (`#71717a`):** Metadata, captions, secondary labels, and muted UI chrome.
- **Surface light (`#ffffff`) / dark (`#09090b`):** Page backgrounds on `<body>` and `UApp`.
- **On-surface light (`#09090b`) / dark (`#fafafa`):** Headlines, row titles, and primary copy.
- **Body text light (`#3f3f46`) / dark (`#d4d4d8`):** Bio paragraphs, nav links, and lead copy.
- **Secondary light (`#52525b`) / dark (`#a1a1aa`):** Descriptions and archive body text.
- **Muted light (`#71717a`) / dark (`#a1a1aa`):** Dates, kickers, issuer lines, and row metadata.
- **Border light (`#e4e4e7`) / dark (`#27272a`):** Row dividers, cards, and navbar rule.
- **Row hover:** `rgb(255 255 255 / 0.4)` in light mode; `rgb(255 255 255 / 0.05)` in dark mode.
- **Status dots:** active `#10b981`, completed `#22c55e`, wip `#f59e0b`, abandoned `#ef4444`, default `#a1a1aa`.
- **Theme meta (`#18181b`):** `theme-color`, tile color, mask icon.

Project thumbnails may carry brand colors; surrounding layout stays neutral. Row hovers remain typographic (`hover:text-zinc-950`) rather than accent-colored.

Tailwind mapping: `text-zinc-950` → `{colors.on-surface-light}`, `text-zinc-700` → `{colors.text-body-light}`, `border-zinc-200` → `{colors.border-light}`, `text-primary-600` → `{colors.primary}`.

## Typography

Three font roles, used consistently:

| Role | Token | Usage |
| --- | --- | --- |
| **Serif** | `page-title`, `section-title`, `article-title` | Page titles, section headings, site wordmark, article headlines |
| **Sans** | `body-sans`, `body-row`, `nav`, `kicker` | Body copy, navigation, metadata, list rows (Barlow) |
| **Display** | `display-heading`, `display-kicker` | Editorial utility classes, lab cards, MDC hero blocks (JetBrains Mono) |

### Scale

- **Page title:** `{typography.page-title}` → `{typography.page-title-lg}` at `sm` breakpoint (`text-3xl` → `text-4xl`)
- **Section title:** `{typography.section-title}` (`text-2xl`, tracking `-0.04em`)
- **Article title:** `{typography.article-title}` → `60px` at `sm` (`text-4xl` → `text-5xl`)
- **Kicker / label:** `{typography.kicker}` or `{typography.label-caps}` — uppercase, wide tracking
- **Body lead:** `{typography.body-sans}` (`15px`, line-height `1.75`)
- **List rows / nav:** `{typography.body-row}` or `{typography.nav}`
- **Section link:** `11px` with arrow (`→`)

Headings should feel precise and editorial, not promotional. Body copy stays relaxed with generous line height for prose.

### Shared utilities (`app/assets/css/main.css`)

Reusable editorial classes for content-heavy pages:

- `.page-main`, `.page-section` — vertical page rhythm
- `.section-heading`, `.section-kicker` — labeled sections (JetBrains Mono / `{typography.display-kicker}`)
- `.editorial-list`, `.editorial-row`, `.editorial-row-title`, `.editorial-row-copy`, `.editorial-meta`, `.editorial-link`
- `.page-heading`, `.page-lead`, `.prose-page`

Prefer these on inner/content pages when they reduce repetition. Primary routes use inline Tailwind that mirrors the same rhythm.

## Layout

The layout follows a **fixed-max-width single column** model (`max-w-6xl` / `{spacing.container-max}`) with optional article sidebar.

- **Container:** `1152px` via `UContainer`
- **Hero content:** `768px` on homepage; `576px` for page leads
- **Article prose:** full width with optional `lg:grid-cols-[minmax(0,1fr)_260px]` TOC sidebar
- **Vertical rhythm:** `{spacing.section}` (`56px`) between homepage sections; `{spacing.xl}`–`48px` on inner pages
- **Navbar offset:** `{spacing.navbar-offset-sm}` / `{spacing.navbar-offset-md}` spacer below sticky header
- **Base spacing unit:** `{spacing.unit}` (`4px`); Tailwind `--spacing: 0.25rem`

Keep pages scannable and single-column by default. Prefer thin `border-t` dividers (`{colors.border-light}`) and `{spacing.row-y}` padding over nested card stacks.

## Elevation & Depth

Depth is achieved through **tonal layers and borders**, not heavy shadows.

- **Flat surfaces:** white / zinc-950 backgrounds with `border-t` row separators
- **Navbar:** `bg-white/90 backdrop-blur` over page content — the only persistent blur on main pages
- **Row hover:** subtle background tint (`{colors.row-hover-light}`) instead of lift
- **Footer affiliate cards:** `border` + `{rounded.xl}`; no drop shadow
- **Optional shadows:** `shadow-zoop` / `shadow-zoopdark` in `tailwind.config.ts` for rare elevated elements — avoid on list rows

Do not use glassmorphism, large gradients, or stacked card shadows on main portfolio pages. The `/labs` liquid-glass experiments are isolated (see Labs exception).

## Shapes

The shape language is **soft but restrained**.

- **Default radius:** `{rounded.sm}` (`4px` / `0.25rem` in `app/app.config.ts`)
- **List rows / inputs:** `{rounded.lg}` (`8px`) where rounding is needed
- **Footer cards:** `{rounded.xl}` (`12px`)
- **Visitor pill / avatars:** `{rounded.full}`

`ThemePicker` exposes radius presets `[0, 0.125, 0.25, 0.375, 0.5]` rem for visitor customization. The live navbar currently exposes only light/dark toggle; wire `ThemePicker` back in when full customization should be visitor-facing.

## Components

### Navigation (`navbar`)

Sticky top bar — wordmark in serif, desktop links (Work, Writing, Resources, Photos, Uses), command palette (`⌘K`), light/dark toggle.

- Tokens: `{components.navbar}`
- Styling: `border-b border-zinc-200/70`, `bg-white/90 backdrop-blur`
- Active route: `{colors.on-surface-light}` / white in dark mode
- Hover: color transition only, no scale

### List rows (`list-row`)

The primary content unit is a **bordered list row**, not a heavy card.

```
border-t {colors.border-light} py-{spacing.row-y} {typography.body-row}
transition hover:bg-{colors.row-hover-light}
```

External links use `i-solar-arrow-right-up-linear` with subtle `translate-x-0.5 -translate-y-0.5` on hover.

| Component | `compact` | `default` / `archive` |
| --- | --- | --- |
| `ProjectCard` | Logo + status dot + title + one-line description | Full row with role badge, multi-line description |
| `BlogCard` | Title only + arrow | Date column + title + description |
| `CertificationCard` | Badge/icon + title + issuer line | Full detail with issued date, credential ID |

Homepage uses `compact` variants. Index pages use `archive` or full variants.

### Section header pattern

```html
<div class="mb-4 grid grid-cols-[1fr_auto] items-center gap-4">
  <h2 class="font-serif text-2xl tracking-[-0.04em]">Section Title</h2>
  <NuxtLink class="text-[11px] ...">View all →</NuxtLink>
</div>
```

### Page header pattern

Kicker → serif title → lead paragraph: `{typography.kicker}` → `{typography.page-title}` → `{typography.body-sans}`.

### Social links (`PortfolioSocialLinks`)

First five contacts inline; overflow behind `+N` toggle (click or hover). `{typography.body-row}`, icon + label, no scale on hover.

### Announcement (`content/Announcement.vue`)

`UAlert` neutral subtle variant. One headline, one description, one external link. Avatar hidden in minimal mode.

### Footer (`footer-card`)

Affiliate cards: `{rounded.xl}` border `{colors.border-light}` `{spacing.md}` padding. Template CTA, OpenStatus widget, copyright at `11px`–`12px`.

### Visitor pill

Fixed bottom-right, `{colors.visitor-live}` pulse dot, tabular count. Links to `/visitors`.

### Blog article

Serif headline (`{typography.article-title}`), uppercase published date (`{typography.label-caps}`), sticky TOC sidebar on large screens, `prose prose-page dark:prose-invert`, print-friendly credits.

### Theme defaults (`app/app.config.ts`)

```ts
theme: { radius: 0.25, blackAsPrimary: false }
ui: { colors: { primary: "sky", neutral: "gray" }, icons: { defaultSet: "solar" } }
```

## Do's and Don'ts

**Do**

- Use typography and spacing as the primary design tools
- Keep list rows fast to scan with consistent dividers and hover tints
- Preserve content-driven editing through `content/`
- Match the zinc palette and serif/sans pairing on new pages
- Add `data-testid` only on business-level actions
- Maintain WCAG AA contrast for body copy and metadata in both color modes
- Use `{colors.primary}` only for focus, archive hovers, and the single most important interactive accent per view

**Don't**

- Add hero gradients, glassmorphism, or oversized marketing sections to main pages
- Replace bordered list rows with heavy card grids unless content demands it
- Animate for personality at the expense of reading speed
- Hide content behind carousels, tabs, or interaction-heavy layouts
- Hardcode personal copy in Vue when it belongs in `content/`
- Mix liquid-glass patterns into the main portfolio surface
- Rely on color alone for project status when text or legend is available

## Motion

- **Page transitions:** 200ms fade + 5px vertical shift (`app/app.vue`)
- **Row hovers:** background tint and icon nudge (`translate-x-0.5 -translate-y-0.5`)
- **Visitor dot:** `motion-safe:animate-pulse` when connected
- Respect `prefers-reduced-motion` for new effects

## Icons & Imagery

- Default icon set: **Solar** (`i-solar-*`)
- Brand/social: **Simple Icons** (`i-simple-icons-*`)
- Project thumbnails: small `UAvatar` with optional `thumbnailBg` tint
- Thumbnails and avatars hidden when `NUXT_PUBLIC_MINIMAL_MODE=true`
- Icons clarify navigation and destinations; they do not decorate generic content

## Content Model

All personal data lives under `content/`:

| Collection | Source | Drives |
| --- | --- | --- |
| `home` | `home.json` | Name, bio, focus, experiments, toolkit |
| `contact` | `contact.json` | Social links |
| `projects` | `projects/*.json` | Work archive |
| `blog` | `blog/*.md` | Writing |
| `certifications` | `certifications/*.json` | Credentials |
| `resources` | `resources/*.json` | Toolkit categories |
| `photos` | `photos/*.json` | Photo galleries |
| `labs` | `labs/*.json` | Experiments index |
| `footer` | `footer.json` | Affiliate cards, GitHub link |
| `seo` | `seo.json` | OG/SEO defaults |

Numeric filename prefixes control list ordering. Do not move content into Vue components.

## Labs Exception

`/labs` and liquid-glass experiments (`app/assets/css/liquid-glass.css`, `app/components/lab/`) are isolated playgrounds. Glassmorphism, blur, and accent-heavy styling are allowed there only.

## Accessibility

- Strong contrast in light and dark mode across body and metadata
- Keyboard-reachable links with `focus-visible:outline-primary-500` on editorial utilities
- `aria-label` on icon-only actions (search, color mode)
- Screen-reader text for visitor count where needed
- Project status communicated by dot **and** text/legend (`ProjectStatusLegend`)
- No dense decorative effects behind readable text
