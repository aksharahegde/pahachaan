<template>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold md:text-lg text-gray-700 dark:text-gray-200">
      Recent articles
    </h3>
    <div class="flex flex-col gap-4">
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
        color="neutral"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: articles } = await useAsyncData("blog-recent", () =>
  queryCollection("blog")
    .where("title", "<>", "Blog")
    .order("published", "DESC")
    .limit(3)
    .all()
);
</script>
