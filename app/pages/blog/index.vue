<template>
  <main class="min-h-screen pb-12">
    <section class="space-y-12 pb-14 pt-6 md:pb-20 md:pt-8">
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
          Notes and essays
        </p>
        <h1 class="mt-4 font-serif text-3xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl md:text-4xl">
          Writing
        </h1>
        <p class="mt-7 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
          {{ blogMeta.description }}
        </p>
      </div>

      <aside class="space-y-8">
        <NuxtLink
          v-if="featuredArticle"
          :to="featuredArticle.path"
          data-testid="portfolio-writing-featured-link"
          class="group block border-t border-zinc-200 pt-5 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5"
        >
          <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Latest
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
            {{ featuredArticle.title }}
          </h2>
          <p class="mt-2 leading-6 text-zinc-600 dark:text-zinc-400">
            {{ featuredArticle.description }}
          </p>
          <span class="mt-4 inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            Read article
            <UIcon
              name="i-solar-arrow-right-up-linear"
              class="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </NuxtLink>
      </aside>
    </section>

    <section>
      <div class="mb-4">
        <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
          All Writing
        </h2>
      </div>

      <BlogCard
        v-for="article in articleItems"
        :key="article.path"
        :article="article"
        test-domain="portfolio-writing"
      />
    </section>
  </main>
</template>
<script setup>
const config = useRuntimeConfig();
const route = useRoute();

const { data: articles } = await useAsyncData("blog-all", () =>
  queryCollection("blog")
    .select("path", "title", "description", "published", "thumbnail")
    .where("title", "<>", "Blog")
    .order("published", "DESC")
    .all()
);

const { data: mainIndex } = await useAsyncData("mainIndex", () =>
  queryCollection("blog").where("title", "==", "Blog").first()
);

const blogMeta = computed(() => ({
  title: "Blog",
  description: "Writing about software, systems, and the web.",
  icon: "solar:document-add-outline",
  ...(mainIndex.value || {}),
}));

const articleItems = computed(() =>
  (articles.value || []).filter((article) => article?.path && article?.title)
);
const featuredArticle = computed(() => articleItems.value[0]);

defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title: blogMeta.value.title,
  description: blogMeta.value.description,
  icon: blogMeta.value.icon,
  url: route.fullPath,
});

useSeoMeta({
  title: blogMeta.value.title,
  description: blogMeta.value.description,
  ogTitle: blogMeta.value.title,
  ogDescription: blogMeta.value.description,
  twitterTitle: blogMeta.value.title,
  twitterDescription: blogMeta.value.description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
