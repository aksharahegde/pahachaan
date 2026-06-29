<template>
  <div class="page-section">
    <h3 class="section-heading">
      Recent articles
    </h3>
    <div class="flex flex-col gap-4">
      <BlogCard
        v-for="(article, id) in articles"
        :key="id"
        :article="article"
      />
    </div>
    <div class="flex items-center justify-end mt-1 text-sm">
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
