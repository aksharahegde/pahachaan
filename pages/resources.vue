<template>
  <main class="min-h-screen">
    <LazyContentDoc v-slot="{ doc }">
      <Header class="mb-4" :title="doc.title" :description="doc.description" />
      <ContentRenderer :value="doc" />
    </LazyContentDoc>
  </main>
</template>
<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData("doc", () =>
  queryContent(route.path).findOne()
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
