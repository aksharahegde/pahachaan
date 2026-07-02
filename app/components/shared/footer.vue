<template>
  <footer class="mx-auto max-w-6xl px-4 pb-4 pt-1 text-[11px] text-zinc-500 sm:px-6 lg:px-8 dark:text-zinc-500">
    <section class="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <NuxtLink
        v-for="affiliate in footerContent.affiliates || []"
        :key="affiliate.url"
        :to="affiliate.url"
        target="_blank"
        external
        :data-testid="affiliate.testId"
        class="group grid grid-cols-[1fr_20px] gap-4 rounded-xl border border-zinc-200 p-4 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5"
      >
        <div>
          <p class="font-semibold text-zinc-950 dark:text-zinc-50">{{ affiliate.title }}</p>
          <p class="mt-1 text-zinc-500 dark:text-zinc-400">{{ affiliate.description }}</p>
          <p class="mt-3 text-zinc-700 transition group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white">
            {{ affiliate.cta }}
          </p>
        </div>
        <UIcon
          name="i-solar-arrow-right-up-linear"
          class="size-4 justify-self-end text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 dark:group-hover:text-white"
        />
      </NuxtLink>

      <NuxtLink
        v-if="footerContent.github"
        :to="footerContent.github"
        target="_blank"
        external
        data-testid="portfolio-template-download-link"
        class="group grid grid-cols-[1fr_20px] gap-4 rounded-xl border border-zinc-200 p-4 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5"
      >
        <div>
          <p class="font-semibold text-zinc-950 dark:text-zinc-50">Use this template</p>
          <p class="mt-1 text-zinc-500 dark:text-zinc-400">
            This site is an open-source portfolio template and free to use.
          </p>
          <p class="mt-3 text-zinc-700 transition group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white">
            Click to get the template
          </p>
        </div>
        <UIcon
          name="i-simple-icons-github"
          class="size-4 justify-self-end text-zinc-400 transition group-hover:text-zinc-900 dark:group-hover:text-white"
        />
      </NuxtLink>
    </section>

    <div class="flex flex-col gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-4">
        <SharedOpenstatusWidget />
        <NuxtLink
          to="https://ink.aksharahegde.xyz"
          target="_blank"
          external
          class="inline-flex items-center gap-2 transition hover:text-zinc-950 dark:hover:text-white"
        >
          <span>Ink</span>
        </NuxtLink>
      </div>
      <p>© {{ currentYear }} {{ config.public.ownerName || "Akshara Hegde" }}</p>
    </div>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig();
const currentYear = new Date().getFullYear();

const { data: footerData } = await useAsyncData("footer-shared", () =>
  queryCollection("footer").first()
);

const footerContent = computed(() => footerData.value || {});
</script>
