<template>
  <main class="min-h-screen">
    <Header class="mb-4" :title="doc.title" :description="doc.description" />
    <ContentRenderer :value="doc" />
  </main>
</template>
<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData("doc", () =>
  queryCollection("content").where("title", "==", "Resources").first()
);

const { title, description, icon } = doc.value;
defineOgImageComponent("MyOg", {
  headline: config.public.ownerName,
  title,
  description,
  icon,
  url: route.fullPath,
});

useSeoMeta({
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
