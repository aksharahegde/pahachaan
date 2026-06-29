<template>
  <main class="page-main">
    <section class="max-w-3xl">
      <h1 class="font-display text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {{ home.name }}
        <sub class="text-sm text-gray-500 font-normal align-baseline">{{ home.pronouns }}</sub>
      </h1>
      <h2 class="font-display text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 mt-2">
        {{ home.title }}
      </h2>
      <p class="mt-4 max-w-2xl text-base leading-8 text-gray-700 dark:text-gray-300">
        {{ home.bio }}
      </p>
    </section>
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
