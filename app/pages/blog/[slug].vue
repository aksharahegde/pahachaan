<template>
  <main class="min-h-screen prose dark:prose-invert">
    <UBreadcrumb
      separator-icon="i-lucide-chevron-right"
      :items="links"
      class="no-print"
    />
    <h1
      class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-1"
    >
      {{ doc.title }}
    </h1>
    <div class="text-gray-600 dark:text-gray-300 text-sm">
      Published on {{ useDateFormat(doc.published, "Do MMMM YYYY").value }}
    </div>
    <ClientOnly>
      <LazyBlogToc :links="doc.body?.toc?.links" hydrate-on-visible />
    </ClientOnly>
    <ContentRenderer v-if="doc" :value="doc" />
    <LazyBlogPrintCredit
      :article-url="`${config.public.baseURL}${route.fullPath}`"
      hydrate-on-visible
    />
    <div class="flex items-center justify-end mt-6 text-sm no-print">
      <UButton
        label="All articles &rarr;"
        to="/blog"
        variant="link"
        color="gray"
      />
    </div>
  </main>
</template>
<script setup>
import { useDateFormat } from "@vueuse/core";
import { defineArticle } from "@unhead/schema-org/vue";

const route = useRoute();
const { slug } = route.params;
const links = useBreadcrumbItems();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData(route.path, () =>
  queryCollection("blog").where("path", "==", route.path).first()
);

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: "Not found" });
}

const { title, description, published, cover } = doc.value;
const base = config.public.baseURL?.replace(/\/$/, "") ?? "";
const articleUrl = `${base}${route.path}`;
const ogImage = `${base}/blog/${slug}.png`;
const imageUrl = cover.startsWith("http") ? cover : `${base}${cover}`;

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
  colorMode: "dark",
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

nav[aria-label="Breadcrumb"] {
  ol {
    @apply pl-0 my-0 overflow-x-auto;
  }

  a {
    @apply no-underline text-gray-600 dark:text-gray-400 text-xs capitalize whitespace-nowrap;
  }
}
</style>
