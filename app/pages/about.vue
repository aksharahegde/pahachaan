<template>
  <main class="min-h-screen pb-12">
    <section class="pb-12 pt-6 md:pb-16 md:pt-8">
      <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
        About
      </p>
      <h1 class="mt-3 font-serif text-3xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl md:text-4xl">
        {{ pageMeta.title }}
      </h1>
      <p class="mt-4 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
        {{ pageMeta.description }}
      </p>
    </section>

    <section class="prose prose-page dark:prose-invert max-w-none">
      <Suspense>
        <ArticleRenderer v-if="tree" :value="tree" />
      </Suspense>
    </section>
  </main>
</template>
<script setup>
import { createMarkdownParser } from "comark";
import { ArticleRenderer, articlePlugins } from "~/composables/comark";

const parseMarkdown = createMarkdownParser({ plugins: articlePlugins });

const route = useRoute();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData("about-doc", () =>
  queryCollection("content").where("path", "==", "/about").first()
);

if (!doc.value?.rawbody) {
  throw createError({ statusCode: 404, statusMessage: "Not found" });
}

const { data: tree } = await useAsyncData("about-tree", () => parseMarkdown(doc.value.rawbody));

const pageMeta = computed(() => ({
  title: "About",
  description: "Who builds and maintains akshara.dev.",
  ...(doc.value || {}),
}));

defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title: pageMeta.value.title,
  description: pageMeta.value.description,
  url: route.fullPath,
});

useSeoMeta({
  title: pageMeta.value.title,
  description: pageMeta.value.description,
  ogTitle: pageMeta.value.title,
  ogDescription: pageMeta.value.description,
  twitterTitle: pageMeta.value.title,
  twitterDescription: pageMeta.value.description,
});
</script>
