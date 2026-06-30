<template>
  <NuxtLink
    v-if="variant === 'compact'"
    :to="article.path"
    :data-testid="`${testDomain}-row-${rowId}`"
    class="group flex items-center justify-between gap-4 border-t border-zinc-200 py-3 text-[13px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5"
  >
    <span class="line-clamp-1 text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
      {{ article.title }}
    </span>
    <UIcon
      name="i-solar-arrow-right-up-linear"
      class="size-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 dark:group-hover:text-white"
    />
  </NuxtLink>

  <NuxtLink
    v-else
    :to="article.path"
    :data-testid="`${testDomain}-row-${rowId}`"
    class="group grid gap-3 border-t border-zinc-200 py-5 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5 md:grid-cols-[120px_minmax(0,1fr)_24px] md:items-start"
  >
    <span class="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
      {{ publishedDate }}
    </span>
    <div class="min-w-0">
      <h3 class="text-xl font-semibold tracking-[-0.04em] text-zinc-950 transition group-hover:text-primary-600 dark:text-zinc-50 dark:group-hover:text-primary-500">
        {{ article.title }}
      </h3>
      <p class="mt-1 line-clamp-2 leading-6 text-zinc-600 dark:text-zinc-400">
        {{ article.description }}
      </p>
    </div>
    <UIcon
      name="i-solar-arrow-right-up-linear"
      class="hidden size-4 justify-self-end text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 md:block dark:group-hover:text-white"
    />
  </NuxtLink>
</template>
<script setup>
import { useDateFormat } from "@vueuse/core";

const props = defineProps({
  article: Object,
  variant: {
    type: String,
    default: "default",
  },
  testDomain: {
    type: String,
    default: "portfolio",
  },
});
const publishedDate = computed(() =>
  props.article?.published ? useDateFormat(props.article.published, "Do MMM YYYY").value : ""
);

const testDomain = computed(() => props.testDomain);
const rowId = computed(() =>
  String(props.article?.title || "article")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
);
</script>
