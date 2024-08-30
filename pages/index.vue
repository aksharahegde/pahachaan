<template>
  <main class="min-h-screen space-y-6">
    <LazyContentDoc v-slot="{ doc }">
      <template v-if="doc">
        <ContentRenderer :value="doc" class="prose prose-h1:mb-1 prose-h3:mt-0 dark:prose-invert" />
      </template>
      <template v-else>
        <p>Loading content...</p>
      </template>
    </LazyContentDoc>
    <ProjectList class="mt-2" />
    <BlogRecent class="mt-2" />
  </main>
</template>

<script setup>
const config = useRuntimeConfig();
const { data: seo } = await useAsyncData("seo", () =>
  queryContent("/seo").findOne()
);

const payload = {
  ...seo.value,
  url: config.public.baseUrl,
  siteName: config.public.ownerName,
}
defineOgImageComponent("MyOg", payload);
</script>
