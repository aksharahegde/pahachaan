<template>
  <main class="page-main">
    <section>
      <Header
        class="mb-8"
        :title="mainIndex.title"
        :description="mainIndex.description"
      />
      <div class="page-section">
        <BlogCard
          v-for="article in articles"
          :key="article.path"
          :article="article"
        />
      </div>
    </section>
  </main>
</template>
<script setup>
const config = useRuntimeConfig();
const route = useRoute();

const { data: articles } = await useAsyncData("blog-all", () =>
  queryCollection("blog")
    .where("title", "<>", "Blog")
    .order("published", "DESC")
    .all()
);

const { data: mainIndex } = await useAsyncData("mainIndex", () =>
  queryCollection("blog").where("title", "==", "Blog").first()
);

const { title, description, icon } = mainIndex.value;
defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title,
  description,
  icon,
  url: route.fullPath,
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
