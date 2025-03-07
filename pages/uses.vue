<template>
  <main class="min-h-screen">
    <div
      class="prose text-sm md:text-base prose-li:text-sm prose-h5:text-gray-600 dark:prose-h5:text-gray-200 prose-h5:font-semibold dark:prose-invert prose-blockquote:not-italic max-w-none md:max-w-4xl prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <Header class="mb-4" :title="doc.title" :description="doc.description" />
      <ContentRenderer :value="doc" />
    </div>
    <SharedCredits />
  </main>
</template>
<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData("doc", () =>
  queryCollection("content").where("title", "==", "Uses").first()
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
