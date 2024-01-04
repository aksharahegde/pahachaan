<template>
    <div class="space-y-4">
      <h3 class="font-bold md:text-lg text-gray-700 dark:text-gray-200">
        Recent articles
      </h3>
      <div class="space-y-4">
        <BlogCard
          v-for="(article, id) in articles"
          :key="id"
          :article="article"
        />
      </div>
      <div class="flex items-center justify-end mt-4 text-sm">
        <UButton
          label="All articles &rarr;"
          to="/blog"
          variant="link"
          color="black"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
const { data: articles } = await useAsyncData("blog-recent", () =>
  queryContent("/blog").where({ title: { $ne: 'Blog' } }).sort({ published: -1 }).limit(3).find()
);
  </script>
  