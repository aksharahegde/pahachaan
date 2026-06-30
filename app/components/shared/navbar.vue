<template>
  <header class="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-[13px] sm:px-6 lg:px-8">
      <NuxtLink
        to="/"
        data-testid="portfolio-home-link"
        class="font-serif text-xl tracking-tight text-zinc-950 dark:text-zinc-50"
      >
        akshara.dev
      </NuxtLink>

      <ul class="hidden items-center gap-8 text-zinc-700 dark:text-zinc-300 md:flex">
        <li>
          <ULink
            to="/projects"
            data-testid="portfolio-work-nav-link"
            class="transition hover:text-zinc-950 dark:hover:text-white"
            active-class="text-zinc-950 dark:text-white"
          >
            Work
          </ULink>
        </li>
        <li>
          <ULink
            to="/blog"
            data-testid="portfolio-writing-nav-link"
            class="transition hover:text-zinc-950 dark:hover:text-white"
            active-class="text-zinc-950 dark:text-white"
          >
            Writing
          </ULink>
        </li>
        <li>
          <ULink
            to="/resources"
            data-testid="portfolio-toolkit-nav-link"
            class="transition hover:text-zinc-950 dark:hover:text-white"
            active-class="text-zinc-950 dark:text-white"
          >
            Resources
          </ULink>
        </li>
        <li>
          <ULink
            to="/photos"
            data-testid="portfolio-photos-nav-link"
            class="transition hover:text-zinc-950 dark:hover:text-white"
            active-class="text-zinc-950 dark:text-white"
          >
            Photos
          </ULink>
        </li>
        <li>
          <ULink
            to="/uses"
            data-testid="portfolio-about-nav-link"
            class="transition hover:text-zinc-950 dark:hover:text-white"
            active-class="text-zinc-950 dark:text-white"
          >
            Uses
          </ULink>
        </li>
      </ul>

      <div class="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
        <button
          type="button"
          data-testid="portfolio-search-open-link"
          aria-label="Open command palette"
          class="inline-flex h-8 items-center gap-1.5 rounded-md px-2 transition hover:bg-zinc-200/60 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-white"
          @click="openCommandPalette"
        >
          <UIcon name="i-solar-magnifer-linear" class="size-4" />
          <span class="text-[11px] text-zinc-500 dark:text-zinc-400">⌘K</span>
        </button>
        <SharedColorMode />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { openCommandPalette } = useCommandPalette();
</script>
