<template>
  <main class="page-main">
    <div>
      <h1 class="font-display text-3xl font-bold mb-1">
        {{ home.name }}
        <sub class="text-base text-gray-500 font-normal">{{ home.pronouns }}</sub>
      </h1>
      <h2 class="font-display text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
        {{ home.title }}
      </h2>
      <p class="text-base leading-relaxed prose max-w-3xl dark:prose-invert my-0">
        {{ home.bio }}
      </p>
    </div>
    <Contact />
    <div>
      <ContentRenderer v-if="indexContent" :value="indexContent" />
    </div>
    <LazyProjectList hydrate-on-visible />
    <LazyBlogRecent hydrate-on-visible />
  </main>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: home } = await useAsyncData("home", () =>
  queryCollection("home").first()
);

const { data: indexContent } = await useAsyncData("index-content", () =>
  queryCollection("content").path("/").first()
);

const { data: seo } = await useAsyncData("seo", () =>
  queryCollection("seo").first()
);

const payload = {
  ...seo.value,
  url: config.public.baseURL,
  siteName: config.public.ownerName,
};
defineOgImage("MyOg", payload);

useHead({
  title: seo.value.title,
  titleTemplate: false,
});

useSeoMeta({
  description: seo.value.description,
  ogTitle: seo.value.title,
  ogDescription: seo.value.description,
  twitterTitle: seo.value.title,
  twitterDescription: seo.value.description,
  twitterImage: seo.value.coverImage,
  twitterTheme: seo.value.theme,
  twitterColorScheme: seo.value.colorMode,
});
</script>
