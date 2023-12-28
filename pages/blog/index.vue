<template>
  <main class="min-h-screen">
    <ContentDoc v-slot="{ doc }">
      <Header class="mb-4" :title="doc.title" :description="doc.description" />
      <div class="flex flex-col">
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
</script>
