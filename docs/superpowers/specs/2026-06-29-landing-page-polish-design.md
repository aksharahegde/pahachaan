# Landing Page Polish Design

## Goal

Polish the landing page in an Editorial Technical direction: minimal, unique, and reader friendly. The page should feel like a carefully edited technical profile, not a startup landing page or a themed terminal mockup.

## Current Context

The landing page already has the right content order:

1. Identity and bio
2. Contact links
3. Announcement
4. Featured projects
5. Recent articles

The polish should preserve this structure while improving hierarchy, scan speed, and small interaction details.

## Chosen Direction

Editorial Technical.

This direction uses typography, spacing, quiet separators, and metadata hierarchy to make the existing page easier to read. It borrows from technical blogs, developer docs, GitHub profiles, and type specimen pages without adding a heavy visual theme.

## In Scope

- Refine the landing-page hero hierarchy in `app/pages/index.vue`.
- Improve the contact-link presentation in `app/components/Contact.vue`.
- Refine project and blog list/card readability where those components appear on the landing page.
- Add small shared CSS utilities only when they make repeated spacing or typography clearer.
- Preserve content-driven data from `content/`.
- Preserve existing `data-testid` values if any are encountered.

## Out Of Scope

- Reworking site navigation or the full information architecture.
- Adding animation-heavy effects, glassmorphism, large gradients, or a terminal-themed frame.
- Moving portfolio content from `content/` into Vue components.
- Changing project/blog data models.
- Adding end-to-end tests or QA automation selectors.

## Landing Page Design

### Hero

The hero remains compact but gets a clearer editorial rhythm:

- Add a small uppercase context line above or near the name, such as `Full-stack engineer / OSS contributor`.
- Keep the name as the primary heading.
- Keep pronouns visible but visually secondary.
- Make the title and bio easier to scan with calmer line length and stronger contrast.
- Avoid marketing-style CTA blocks.

### Contact Links

Contact links should read like useful destinations rather than social-icon decoration:

- Keep icons when minimal mode allows them.
- Reduce visual noise from hover scale effects.
- Use compact text-forward link styling with visible hover and focus states.
- Keep wrapping behavior for small screens.

### Announcement

The announcement should stay as a useful project callout:

- Keep one concise headline, one description, and one destination.
- Avoid making it look like a banner ad.
- Ensure it sits naturally between identity/contact and the project list.

### Projects

Project rows should feel like concise open-source entries:

- Preserve the small thumbnail/status/role pattern.
- Improve title and description rhythm.
- Use subtle row spacing or separators to support scanning.
- Keep role badges quiet.
- Keep hover states primarily typographic.

### Recent Articles

Article rows should emphasize reading:

- Make date, title, and description hierarchy clearer.
- Keep thumbnails small and supportive.
- Improve line height and spacing so titles do not blend into descriptions.
- Keep the `All articles` link aligned with the section rhythm.

## Visual Rules

- Use typography and spacing as the main polish tools.
- Keep surfaces neutral in light and dark mode.
- Use the existing primary color for links and active/hover states only.
- Keep the page narrow and single-column.
- Prefer thin dividers or spacing over cards-within-cards.
- Avoid adding new decorative elements that compete with project or article text.

## Accessibility

- Maintain strong contrast for primary text and secondary metadata.
- Keep all links keyboard reachable.
- Use visible focus states on user-visible links and actions.
- Do not rely on color alone to communicate project status.
- Avoid motion that affects reading comfort.

## Implementation Notes

- Start with the smallest set of component edits that improves the landing page.
- Prefer existing Nuxt UI and Tailwind patterns.
- Keep reusable classes in `app/assets/css/main.css` only when they reduce repetition.
- Do not add `data-testid` to Nuxt UI primitives or generic styling wrappers.
- Add `data-testid` only if a new business-level user action is introduced.

## Acceptance Criteria

- The landing page remains content-driven and single-column.
- The hero, contact links, projects, and recent articles are easier to scan.
- The page feels minimal and editorial, with a subtle technical personality.
- Dark and light mode remain readable.
- Minimal mode still hides decorative icons where intended.
- No `.superpowers/` visual-companion artifacts are included in git.
