<template>
  <div class="page-section">
    <h3 class="section-heading">
      Recent articles
    </h3>
    <div class="editorial-list">
      <BlogCard
        v-for="(article, id) in articles"
        :key="id"
        :article="article"
        :variant="variant"
      />
    </div>
    <div class="flex items-center justify-end pt-1 text-sm">
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
const props = defineProps({
  variant: {
    type: String,
    default: "default",
  },
  limit: {
    type: Number,
    default: 3,
  },
});

const { data: articles } = await useAsyncData("blog-recent", () =>
  queryCollection("blog")
    .where("title", "<>", "Blog")
    .order("published", "DESC")
    .limit(props.limit)
    .all()
);
</script>
