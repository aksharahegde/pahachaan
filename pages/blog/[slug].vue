<template>
  <main class="min-h-screen">
    <div
      class="prose text-sm md:text-base dark:prose-invert prose-blockquote:not-italic max-w-none md:max-w-4xl prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <article>
        <UBreadcrumb :links="links" />
        <ContentDoc v-slot="{ doc }" tag="article">
          <h1
            class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-1"
          >
            {{ doc.title }}
          </h1>
          <div class="text-gray-600 dark:text-gray-300 text-sm">
            Published on {{ useDateFormat(doc.published, "DD MMM YYYY").value }}
          </div>
          <ContentRenderer :value="doc" />
        </ContentDoc>
      </article>
      <div class="flex items-center justify-end mt-6 text-sm">
        <UButton
          label="All articles &rarr;"
          to="/blog"
          variant="link"
          color="gray"
        />
      </div>
    </div>
  </main>
</template>
<script setup>
const route = useRoute();
const { slug } = route.params;
const links = useBreadcrumbItems()
const config = useRuntimeConfig();
useSeoMeta({
  ogImage: `${config.public.baseURL}/blog/${slug}.png`,
  twitterCard: "summary_large_image",
  articleAuthor: config.public.ownerName,
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
