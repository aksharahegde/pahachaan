<template>
  <main class="min-h-screen flex flex-col gap-6">
    <div>
      <h1 class="text-3xl font-bold mb-1">
        {{ home.name }}
        <sub class="text-base text-gray-500 font-normal">{{ home.pronouns }}</sub>
      </h1>
      <h2 class="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
        {{ home.title }}
      </h2>
      <p class="text-base prose max-w-3xl dark:prose-invert my-0">
        {{ home.bio }}
      </p>
    </div>
    <Contact class="mt-2" />
    <div>
      <ContentRenderer v-if="indexContent" :value="indexContent" class="mt-2" />
    </div>
    <ProjectList class="mt-2" />
    <BlogRecent class="mt-2" />
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
  url: config.public.baseUrl,
  siteName: config.public.ownerName,
};
defineOgImageComponent("MyOg", payload);

useSeoMeta({
  twitterTitle: seo.value.title,
  twitterDescription: seo.value.description,
  twitterImage: seo.value.coverImage,
  twitterTheme: seo.value.theme,
  twitterColorScheme: seo.value.colorMode,
});
</script>
