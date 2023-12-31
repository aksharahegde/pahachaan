<template>
  <main class="min-h-screen">
    <ContentDoc v-slot="{ doc }">
      <Header class="mb-4" :title="doc.title" :description="doc.description" />
      <div class="flex flex-col space-y-4">
        <BlogCard
          v-for="article in articles"
          :key="article._path"
          :article="article"
        />
      </div>
    </ContentDoc>
  </main>
</template>
<script setup>
const { data: articles } = await useAsyncData("blog-all", () =>
  queryContent("/blog").where({ title: { $ne: 'Blog' } }).sort({ published: -1 }).find()
);

const config = useRuntimeConfig();
const route = useRoute();
const { data: mainIndex } = await useAsyncData("mainIndex", () =>
  queryContent("/blog").where({ title: { $eq: 'Blog' } }).findOne()
);

defineOgImageComponent("MyOg", {
  headline: config.public.ownerName,
  title: mainIndex.value.title,
  description: mainIndex.value.description,
  url: route.fullPath,
  icon: mainIndex.value.icon
});
</script>
