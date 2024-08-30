<template>
  <main class="min-h-screen prose dark:prose-invert">
    <LazyContentDoc v-slot="{ doc }" tag="article">
      <UBreadcrumb :links="links" />
      <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-1">
        {{ doc.title }}
      </h1>
      <div class="text-gray-600 dark:text-gray-300 text-sm">
        Published on {{ useDateFormat(doc.published, "Do MMMM YYYY").value }}
      </div>
      <ContentRenderer :value="doc" />
    </LazyContentDoc>
    <div class="flex items-center justify-end mt-6 text-sm">
      <UButton label="All articles &rarr;" to="/blog" variant="link" color="gray" />
    </div>
  </main>
</template>
<script setup>
import { useDateFormat } from "@vueuse/core";

const route = useRoute();
const { slug } = route.params;
const links = useBreadcrumbItems();
const config = useRuntimeConfig();

const ogImage = `${config.public.baseURL}/blog/${slug}.png`;
useSeoMeta({
  ogImage: ogImage,
  twitterCard: "summary_large_image",
  articleAuthor: config.public.ownerName,
});

const { data: doc } = await useAsyncData("doc", () =>
  queryContent(route.path).findOne()
);

const { title, description } = doc.value
defineOgImageComponent("BlogOgImage", {
  headline: config.public.ownerName,
  title,
  description,
  url: route.fullPath,
  coverImage: ogImage,
  colorMode: "dark",
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}

nav[aria-label="Breadcrumb"] {
  ol {
    @apply pl-0 my-0 overflow-x-auto;
  }

  a {
    @apply no-underline text-gray-600 dark:text-gray-400 text-xs capitalize whitespace-nowrap;
  }
}
</style>
