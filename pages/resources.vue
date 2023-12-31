<template>
  <main class="min-h-screen">
    <ContentDoc v-slot="{ doc }">
      <Header class="mb-4" :title="doc.title" :description="doc.description" />
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </main>
</template>
<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData("doc", () =>
  queryContent(route.path).findOne()
);

defineOgImageComponent("MyOg", {
  headline: config.public.ownerName,
  title: doc.value.title,
  description: doc.value.description,
  url: route.fullPath,
  icon: doc.value.icon,
});
</script>
