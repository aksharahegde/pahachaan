<template>
  <main class="page-main">
    <div class="prose prose-page dark:prose-invert">
      <Header class="mb-8" :title="doc.title" :description="doc.description" />
      <ContentRenderer :value="doc" />
    </div>
  </main>
</template>
<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData("doc", () =>
  queryCollection("content").where("title", "==", "Resources").first()
);

const { title, description, icon } = doc.value;
defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title,
  description,
  icon,
  url: route.fullPath,
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
