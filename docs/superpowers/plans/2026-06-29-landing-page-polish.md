# Landing Page Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the landing page in an Editorial Technical direction while preserving the current content order and content-driven data model.

**Architecture:** Keep the landing page single-column and refine existing Vue components in place. Add only a few shared CSS utilities for repeated editorial list rhythm, link treatment, and focus states.

**Tech Stack:** Nuxt 4, Vue SFCs, Nuxt Content, Nuxt UI, Tailwind CSS v4, Bun.

---

## File Structure

- Modify: `app/assets/css/main.css`
  - Add reusable editorial utilities for section dividers, row links, metadata, and text links.
- Modify: `app/pages/index.vue`
  - Refine the hero hierarchy and intro rhythm without changing data sources.
- Modify: `app/components/Contact.vue`
  - Make contact links text-forward and reduce hover motion.
- Modify: `app/components/project/List.vue`
  - Apply editorial list spacing and align the section footer link.
- Modify: `app/components/project/Card.vue`
  - Improve project row hierarchy while preserving thumbnail/status/role behavior.
- Modify: `app/components/blog/Recent.vue`
  - Apply editorial list spacing and align the section footer link.
- Modify: `app/components/blog/Card.vue`
  - Improve article row date/title/description hierarchy.

## Task 1: Add Shared Editorial Utilities

**Files:**
- Modify: `app/assets/css/main.css`

- [ ] **Step 1: Add shared utility classes**

Add these classes inside the existing `@layer components` block after `.section-heading`:

```css
  .section-kicker {
    @apply font-display text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400;
  }

  .editorial-list {
    @apply flex flex-col divide-y divide-gray-200/80 dark:divide-white/10;
  }

  .editorial-row {
    @apply rounded-lg py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 first:pt-0 last:pb-0 hover:text-primary-600 dark:hover:text-primary-400;
  }

  .editorial-row-title {
    @apply font-display text-base font-semibold leading-snug text-zinc-800 transition-colors dark:text-zinc-100;
  }

  .editorial-row-copy {
    @apply mt-1 text-base leading-relaxed text-gray-600 dark:text-gray-400;
  }

  .editorial-meta {
    @apply font-display text-xs font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400;
  }

  .editorial-link {
    @apply font-display text-sm font-semibold text-gray-600 underline-offset-4 transition-colors hover:text-primary-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-gray-400 dark:hover:text-primary-400;
  }
```

- [ ] **Step 2: Verify Tailwind compilation**

Run: `bun run build`

Expected: Nuxt build completes with exit code 0.

## Task 2: Refine Landing Hero

**Files:**
- Modify: `app/pages/index.vue`

- [ ] **Step 1: Replace the hero markup**

Replace the opening hero `<div>` block in the template with:

```vue
    <section class="max-w-3xl">
      <p class="section-kicker mb-3">Full-stack engineer / OSS contributor</p>
      <h1 class="font-display text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {{ home.name }}
        <sub class="text-sm text-gray-500 font-normal align-baseline">{{ home.pronouns }}</sub>
      </h1>
      <h2 class="font-display text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 mt-2">
        {{ home.title }}
      </h2>
      <p class="mt-4 max-w-2xl text-base leading-8 text-gray-700 dark:text-gray-300">
        {{ home.bio }}
      </p>
    </section>
```

- [ ] **Step 2: Run build**

Run: `bun run build`

Expected: Nuxt build completes with exit code 0.

## Task 3: Polish Contact Links

**Files:**
- Modify: `app/components/Contact.vue`

- [ ] **Step 1: Replace the contact template**

Replace the template with:

```vue
<template>
  <section class="page-section max-w-2xl">
    <h3 class="section-heading">Links</h3>
    <div class="flex flex-wrap gap-x-5 gap-y-3">
      <a
        v-for="item in items"
        :key="item.name"
        :href="item.url"
        target="_blank"
        rel="noopener"
        class="editorial-link inline-flex items-center gap-2"
      >
        <UIcon
          v-if="!isMinimalMode"
          :name="item.icon"
          class="h-4 w-4 text-gray-500 transition-colors group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-400"
        />
        <span>{{ item.name }}</span>
      </a>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Fix the hover group class**

Update the anchor class in the previous step to include `group`:

```vue
        class="editorial-link group inline-flex items-center gap-2"
```

- [ ] **Step 3: Run build**

Run: `bun run build`

Expected: Nuxt build completes with exit code 0.

## Task 4: Refine Project List And Rows

**Files:**
- Modify: `app/components/project/List.vue`
- Modify: `app/components/project/Card.vue`

- [ ] **Step 1: Update project list spacing**

In `app/components/project/List.vue`, change:

```vue
    <div class="flex flex-col gap-4">
```

to:

```vue
    <div class="editorial-list">
```

Change the footer container from:

```vue
    <div class="flex items-center justify-end mt-1 text-sm">
```

to:

```vue
    <div class="flex items-center justify-end pt-1 text-sm">
```

- [ ] **Step 2: Update project card row classes**

In `app/components/project/Card.vue`, change the root `NuxtLink` class from:

```vue
    class="flex items-center gap-4 group p-2 -m-2 rounded-lg"
```

to:

```vue
    class="editorial-row group flex items-start gap-4"
```

Change the content wrapper:

```vue
    <div>
```

to:

```vue
    <div class="min-w-0">
```

Change the title class from:

```vue
        class="font-display text-base flex items-center gap-2 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-500"
```

to:

```vue
        class="editorial-row-title flex items-center gap-2 group-hover:text-primary-600 dark:group-hover:text-primary-400"
```

Change the description class from:

```vue
      <p class="dark:text-gray-400 text-gray-600 text-base">
```

to:

```vue
      <p class="editorial-row-copy">
```

- [ ] **Step 3: Run build**

Run: `bun run build`

Expected: Nuxt build completes with exit code 0.

## Task 5: Refine Recent Article List And Rows

**Files:**
- Modify: `app/components/blog/Recent.vue`
- Modify: `app/components/blog/Card.vue`

- [ ] **Step 1: Update recent article list spacing**

In `app/components/blog/Recent.vue`, change:

```vue
    <div class="flex flex-col gap-4">
```

to:

```vue
    <div class="editorial-list">
```

Change the footer container from:

```vue
    <div class="flex items-center justify-end mt-1 text-sm">
```

to:

```vue
    <div class="flex items-center justify-end pt-1 text-sm">
```

- [ ] **Step 2: Update article card row classes**

In `app/components/blog/Card.vue`, change the root `NuxtLink` class from:

```vue
    class="flex items-start group p-2 -m-2 gap-1 rounded-lg flex-col"
```

to:

```vue
    class="editorial-row group flex flex-col"
```

Change the date class from:

```vue
    <span class="text-sm text-gray-500 dark:text-gray-400">
```

to:

```vue
    <span class="editorial-meta mb-2">
```

Change the row body class from:

```vue
    <div class="flex items-center gap-2">
```

to:

```vue
    <div class="flex items-start gap-3">
```

Change the content wrapper:

```vue
      <div>
```

to:

```vue
      <div class="min-w-0">
```

Change the title class from:

```vue
          class="font-display text-base font-medium group-hover:text-primary-600 dark:group-hover:text-primary-500"
```

to:

```vue
          class="editorial-row-title group-hover:text-primary-600 dark:group-hover:text-primary-400"
```

Change the description class from:

```vue
        <p class="dark:text-gray-400 text-gray-600 text-base">
```

to:

```vue
        <p class="editorial-row-copy">
```

- [ ] **Step 3: Run build**

Run: `bun run build`

Expected: Nuxt build completes with exit code 0.

## Task 6: Final Verification

**Files:**
- Review: `app/pages/index.vue`
- Review: `app/components/Contact.vue`
- Review: `app/components/project/List.vue`
- Review: `app/components/project/Card.vue`
- Review: `app/components/blog/Recent.vue`
- Review: `app/components/blog/Card.vue`
- Review: `app/assets/css/main.css`

- [ ] **Step 1: Run full build**

Run: `bun run build`

Expected: Nuxt build completes with exit code 0.

- [ ] **Step 2: Check git status**

Run: `git status --short`

Expected: Modified app files, `.gitignore`, and docs plan/spec files only. No `.superpowers/` entries should appear.

- [ ] **Step 3: Manual visual check**

Run: `bun run dev`

Open: `http://localhost:3000`

Verify:

- Hero reads in this order: context line, name/pronouns, title, bio.
- Contact links wrap cleanly and do not scale on hover.
- Project rows are divided and readable in light and dark mode.
- Article rows have clear date/title/description hierarchy.
- Minimal mode still hides project, article, contact, and announcement icons where intended.

- [ ] **Step 4: Prepare final diff for review**

Run: `git diff -- app/pages/index.vue app/components/Contact.vue app/components/project/List.vue app/components/project/Card.vue app/components/blog/Recent.vue app/components/blog/Card.vue app/assets/css/main.css .gitignore docs/superpowers/specs/2026-06-29-landing-page-polish-design.md docs/superpowers/plans/2026-06-29-landing-page-polish.md`

Expected: Diff is limited to the approved landing-page polish, `.gitignore`, and planning docs.
