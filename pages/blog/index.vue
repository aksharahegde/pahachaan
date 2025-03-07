<template>
  <main class="min-h-screen">
    <LazyContentDoc v-slot="{ doc }">
      <Header class="mb-4" :title="doc.title" :description="doc.description" />
      <div class="flex flex-col space-y-4">
        <BlogCard
          v-for="article in articles"
          :key="article._path"
          :article="article"
        />
      </div>
    </LazyContentDoc>
  </main>
</template>
<script setup>
const config = useRuntimeConfig();
const route = useRoute();

const { data: articles } = await useAsyncData("blog-all", () =>
  queryCollection("blog")
  .where('title', '<>', 'Blog')
  .order('published_at', 'DESC')
  .all()
);

const { data: mainIndex } = await useAsyncData("mainIndex", () =>
  queryCollection("blog").where('title', '==', 'Blog').findOne()
);

const { title, description, icon } = mainIndex.value;
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
})
</script>
