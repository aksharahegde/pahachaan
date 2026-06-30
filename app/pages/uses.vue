<template>
  <main class="min-h-screen pb-12">
    <section class="space-y-8 pb-14 pt-6 md:pb-20 md:pt-8">
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
          Daily setup
        </p>
        <h1 class="mt-4 font-serif text-3xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl md:text-4xl">
          {{ pageMeta.title }}
        </h1>
        <p class="mt-7 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
          {{ pageMeta.description }}
        </p>
      </div>

      <aside>
        <h2 class="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-950 dark:text-zinc-50">
          Core stack
        </h2>
        <div class="grid gap-4 md:grid-cols-3">
          <div
            v-for="item in coreStack"
            :key="item.label"
            class="grid grid-cols-[20px_1fr] gap-4 border-t border-zinc-200 pt-4 text-[12px] dark:border-zinc-800"
          >
            <UIcon :name="item.icon" class="mt-1 size-4 text-zinc-700 dark:text-zinc-300" />
            <div>
              <p class="font-semibold text-zinc-950 dark:text-zinc-50">{{ item.label }}</p>
              <p class="text-zinc-500 dark:text-zinc-400">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </aside>
    </section>

    <section>
      <div class="mb-4">
        <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
          Tools and Hardware
        </h2>
      </div>

      <div ref="usesContentEl" class="uses-content">
        <ContentRenderer v-if="doc" :value="doc" />
      </div>
    </section>

    <section data-testid="uses-credits-section">
      <LazySharedCredits hydrate-on-visible />
    </section>
  </main>
</template>
<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData("uses-doc", () =>
  queryCollection("content").where("title", "==", "Uses").first()
);

const usesContentEl = ref(null);

const applyExternalLinkAttributes = () => {
  usesContentEl.value
    ?.querySelectorAll('a[href^="http"]')
    .forEach((anchor) => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });
};

onMounted(() => {
  applyExternalLinkAttributes();
});

watch(doc, async () => {
  await nextTick();
  applyExternalLinkAttributes();
});

const pageMeta = computed(() => ({
  title: "Uses",
  description: "Tools, services, and setup I use.",
  icon: "solar:monitor-smartphone-outline",
  ...(doc.value || {}),
}));

const coreStack = [
  {
    label: "Machine",
    value: "Mac Mini M4",
    icon: "i-solar-monitor-linear",
  },
  {
    label: "AI",
    value: "Claude, Cursor, Opencode, Codadmin",
    icon: "i-solar-code-square-linear",
  },
  {
    label: "Terminal",
    value: "Ghostty and cmux",
    icon: "i-solar-command-linear",
  },
];

defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title: pageMeta.value.title,
  description: pageMeta.value.description,
  icon: pageMeta.value.icon,
  url: route.fullPath,
});

useSeoMeta({
  title: pageMeta.value.title,
  description: pageMeta.value.description,
  ogTitle: pageMeta.value.title,
  ogDescription: pageMeta.value.description,
  twitterTitle: pageMeta.value.title,
  twitterDescription: pageMeta.value.description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
<style>
@reference "~/assets/css/main.css";

.uses-content h5 {
  @apply mb-4 mt-10 font-serif text-2xl tracking-[-0.04em] text-zinc-950 first:mt-0 dark:text-zinc-50;
}

.uses-content ul {
  @apply m-0 list-disc space-y-1 pl-5;
}

.uses-content li {
  @apply py-0.5 text-[13px] leading-6 text-zinc-700 dark:text-zinc-300;
}

.uses-content li ul {
  @apply mt-1 list-[circle] space-y-0 pl-5;
}

.uses-content li li {
  @apply py-0 text-[12px] text-zinc-500 dark:text-zinc-400;
}

.uses-content a {
  @apply text-inherit underline-offset-4 transition hover:text-zinc-950 hover:underline dark:hover:text-white;
}

.uses-content .uses-row-link {
  @apply inline-grid grid-cols-[minmax(0,max-content)_16px] items-center gap-2 border-b border-transparent py-1 pr-1 text-inherit no-underline transition hover:border-zinc-950 hover:text-zinc-950 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:hover:border-white dark:hover:text-white;
}

.uses-content .uses-row-link::after {
  @apply text-zinc-400 opacity-0 transition;
  content: "↗";
}

.uses-content .uses-row-link:hover::after,
.uses-content .uses-row-link:focus-visible::after {
  @apply opacity-100;
}
</style>
