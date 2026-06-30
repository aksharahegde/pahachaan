<template>
  <UApp class="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
    <NuxtLoadingIndicator color="primary" />
    <SharedNavbar class="no-print" />
    <SharedCommandPalette class="no-print" />
    <div class="h-8 md:h-10" />
    <UContainer class="max-w-6xl">
      <NuxtPage class="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl" />
    </UContainer>
    <div class="h-12 md:h-20" />
    <SharedVisitors class="no-print" />
    <SharedFooter class="no-print" />
    <div class="h-8 md:hidden" />
  </UApp>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

useSeoMeta({
  ogImage: `${config.public.baseURL}/og_me.png`,
  twitterCard: "summary_large_image",
});

useHead({
  titleTemplate: (title) =>
    title ? `${title} - ${config.public.ownerName}` : config.public.ownerName,
  htmlAttrs: {
    lang: "en",
  },
  meta: () => [
    { name: "theme-color", content: "#18181b" },
    { name: "msapplication-TileColor", content: "#18181b" },
    { property: "og:url", content: `${config.public.baseURL}${route.path}` },
    { name: "twitter:site", content: `@${config.public.twitter}` },
    { name: "twitter:creator", content: `@${config.public.twitter}` },
  ],
  link: () => [
    { rel: "canonical", href: `${config.public.baseURL}${route.path}` },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "mask-icon", color: "#18181b", href: "/logo.svg" },
    { rel: "alternate", type: "application/rss+xml", href: "/rss.xml" },
    { rel: "feed", type: "application/rss+xml", href: "/rss.xml" },
  ],
});
</script>
<style>
:host,
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-feature-settings: normal;
  font-variation-settings: normal;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
