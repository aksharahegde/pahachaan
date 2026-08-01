<template>
  <main class="min-h-screen pb-12">
    <article>
      <header class="pb-14 pt-6 md:pb-20 md:pt-8">
        <NuxtLink
          to="/blog"
          data-testid="portfolio-writing-back-link"
          class="no-print inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        >
          <UIcon name="i-solar-alt-arrow-left-linear" class="size-4" />
          Writing
        </NuxtLink>

        <p class="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          Published {{ publishedDate }}
        </p>
        <h1 class="mt-4 max-w-4xl font-serif text-4xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-5xl md:text-5xl">
          {{ doc.title }}
        </h1>
        <p class="mt-7 max-w-2xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
          {{ doc.description }}
        </p>

        <img
          :src="imageUrl"
          :alt="doc.title"
          class="mt-8 rounded-lg lg:hidden"
        >

      </header>

      <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
        <aside class="no-print lg:order-2 lg:sticky lg:top-24">
          <ClientOnly>
            <LazyBlogToc :links="tree.meta?.toc?.links || []" hydrate-on-visible />
          </ClientOnly>
        </aside>

        <div class="prose prose-page dark:prose-invert max-w-none lg:order-1">
          <Suspense>
            <ArticleRenderer v-if="tree" :tree="tree" />
          </Suspense>
          <LazyBlogPrintCredit
            :article-url="articleUrl"
            hydrate-on-visible
          />
        </div>
      </div>
    </article>
  </main>
</template>
<script setup>
import { parse } from "comark";
import { useDateFormat } from "@vueuse/core";
import { defineArticle } from "@unhead/schema-org/vue";
import { articlePlugins, ArticleRenderer } from "~/composables/comark";

const route = useRoute();
const { slug } = route.params;
const config = useRuntimeConfig();

const { data: page } = await useAsyncData(route.path, async () => {
  const doc = await queryCollection("blog").where("path", "==", route.path).first();
  if (!doc?.rawbody) return null;
  const tree = await parse(doc.rawbody, { plugins: articlePlugins });
  return { doc, tree };
});

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Not found" });
}

const doc = page.value.doc;
const tree = page.value.tree;
const { title, description, published, cover } = doc;
const base = config.public.baseURL?.replace(/\/$/, "") ?? "";
const articleUrl = `${base}${route.path}`;
const ogImage = `${base}/blog/${slug}.png`;
const imageUrl = cover.startsWith("http") ? cover : `${base}${cover}`;
const publishedDate = computed(() => useDateFormat(published, "Do MMMM YYYY").value);

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogType: "article",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterCard: "summary_large_image",
  articleAuthor: config.public.ownerName,
  articlePublishedTime: published,
  articleModifiedTime: published,
});

defineOgImage("BlogOgImage", {
  headline: config.public.ownerName,
  title,
  description,
  url: route.fullPath,
  coverImage: ogImage,
  colorMode: "light",
});

useSchemaOrg([
  defineArticle({
    headline: title,
    description,
    datePublished: published,
    author: {
      "@type": "Person",
      name: config.public.ownerName,
      url: base,
    },
    image: imageUrl,
    url: articleUrl,
  }),
]);
</script>
<style>
@reference "~/assets/css/main.css";

.prose h2 a,
.prose h3 a {
  @apply no-underline;
}

.prose-page img:first-of-type {
  @apply hidden lg:block;
}

</style>
