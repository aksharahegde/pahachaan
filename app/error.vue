<template>
  <UApp class="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
    <SharedNavbar class="no-print" />
    <div class="h-8 md:h-10" />
    <UContainer class="max-w-6xl">
      <main class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
          {{ statusCode }}
        </p>
        <h1 class="mt-3 font-serif text-3xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl md:text-4xl">
          {{ heading }}
        </h1>
        <p class="mt-4 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
          {{ description }}
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-4 text-[12px] font-semibold">
          <button
            class="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            @click="handleError"
          >
            Back to home
          </button>
        </div>

        <div class="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Looking for something specific?
          </p>
          <ul class="mt-3 space-y-1.5 text-[13px] text-zinc-700 dark:text-zinc-300">
            <li><NuxtLink to="/sitemap.xml" class="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-white">Sitemap</NuxtLink> — every indexed URL on this site</li>
            <li><NuxtLink to="/llms.txt" class="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-white">llms.txt</NuxtLink> — machine-readable site overview for AI agents</li>
            <li><NuxtLink to="/projects" class="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-white">Projects</NuxtLink></li>
            <li><NuxtLink to="/blog" class="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-white">Writing</NuxtLink></li>
            <li><NuxtLink to="/resources" class="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-white">Resources</NuxtLink></li>
          </ul>
        </div>
      </main>
    </UContainer>
    <div class="h-12 md:h-20" />
    <SharedFooter class="no-print" />
  </UApp>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

const statusCode = computed(() => props.error?.statusCode ?? 404);

const heading = computed(() =>
  statusCode.value === 404 ? "Page not found" : "Something went wrong"
);

const description = computed(() =>
  statusCode.value === 404
    ? "There is no page at this address. It may have moved, or the link is out of date."
    : "An unexpected error occurred while loading this page."
);

useSeoMeta({
  title: heading,
  description,
});

const handleError = () => clearError({ redirect: "/" });
</script>
