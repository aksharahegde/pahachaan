# Design Context

## Current System

Pahachaan is a compact Nuxt portfolio with a technical, content-first interface. It uses Nuxt UI, Tailwind CSS, Barlow for body text, JetBrains Mono for display text, and a theme picker that lets visitors tune color, neutral palette, radius, and color mode.

The visual direction is minimal, developer-native, and readable: small cards, restrained shadows, rounded controls, monochrome surfaces, icon-forward navigation, and primary-color accents for active states and links.

## Typography

- Body: Barlow, system UI fallback.
- Display: JetBrains Mono, used for headings, section labels, project titles, and article titles.
- Keep type compact and legible. Prefer moderate font sizes, clear line height, and short text blocks.
- Headings should feel technical and precise, not oversized or promotional.
- Body copy should stay relaxed enough for reading: use generous line height for prose and descriptions.

## Color

- Base surfaces: light gray in light mode, deep gray/near black in dark mode.
- Text: high-contrast zinc/gray tones for primary copy, softer gray tones for secondary metadata.
- Accent: Nuxt UI primary color, user-configurable through the theme picker.
- Project thumbnails may carry their own brand colors, but cards and surrounding layout should remain quiet.
- Avoid default rainbow SaaS gradients except where existing user-controlled theme previews intentionally demonstrate customization.

## Layout

- Keep pages narrow and scannable. The existing `max-w-2xl` navigation and content-first page rhythm should remain the default.
- Use vertical rhythm instead of heavy section containers.
- Prefer list-like cards for projects and posts over large marketing tiles.
- Navigation should stay accessible on desktop and mobile, with the mobile bottom bar remaining thumb-friendly.
- Preserve the homepage hierarchy: identity, contact paths, announcement, projects, recent writing.

## Components

### Navigation

Use icon-first navigation with tooltips, active route indicators, and subtle primary-color accents. Keep labels available to screen readers. The active state should be discoverable without adding visual clutter.

### Project Cards

Project cards should read like concise open-source entries: logo or avatar, title, role badge, status signal, and one concrete description. Hover states may change text color but should not transform or animate heavily.

### Blog Cards

Blog cards should emphasize date, title, and summary. Keep thumbnails small and supportive. Reading metadata should be quiet but legible.

### Announcement

Announcements should feel like a useful project callout, not a promotional banner. Use subtle alert styling, concise copy, and a single clear link.

### Theme Picker

The theme picker is a real product feature of the template. Keep it visible, understandable, and scoped to visitor-controlled preferences.

## Motion

- Use Nuxt page transitions sparingly and keep them quick.
- Avoid motion that delays reading or makes navigation feel decorative.
- Respect reduced-motion expectations when adding new animations.
- Prefer hover/focus color changes over movement.

## Imagery And Icons

- Use project logos and Iconify icons as compact identifiers.
- Icons should clarify navigation or contact destinations, not decorate generic content.
- Avatar and thumbnail imagery should remain small enough that text carries the page.

## Accessibility

- Maintain strong contrast across light and dark themes.
- Keep focusable elements keyboard reachable and visibly interactive.
- Preserve screen-reader labels for icon-only navigation.
- Do not rely on color alone for project status when additional text or labels are available.
- Avoid dense decorative effects behind text.

## Do

- Make project and article lists faster to scan.
- Keep technical credibility visible through concrete work.
- Use small refinements: spacing, type hierarchy, contrast, and state clarity.
- Preserve the template's content-driven editing model.

## Do Not

- Add generic hero gradients, glassmorphism, or oversized startup-style sections.
- Replace concise project lists with heavy cards unless the content justifies it.
- Add animation for personality at the expense of speed or readability.
- Hide important content behind carousels, tabs, or interaction-heavy layouts.
