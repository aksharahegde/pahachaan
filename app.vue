<template>
  <NuxtLoadingIndicator color="primary" />
  <SharedNavbar />
  <div class="h-4 md:h-24" />
  <UContainer>
    <NuxtPage class="mx-auto px-2 lg:px-8 max-w-2xl" />
  </UContainer>
  <div class="h-4 md:h-32" />
  <SharedFooter />
  <div class="h-16 md:hidden" />
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

useSeoMeta({
  ogImage: `${config.public.baseURL}/og_me.png`,
  twitterCard: "summary_large_image",
});

useHead({
  title: () => (route.meta.title as string) || "",
  titleTemplate: (title) =>
    title ? `${title} - ${config.public.ownerName}` : config.public.ownerName,
  htmlAttrs: {
    lang: "en",
  },
  bodyAttrs: {
    class: "font-sans",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/icon.png",
    },
  ],
});

if (import.meta.server) {
  const PATH_RE = /([^/]+)\/?$/;
  const { path = "/" } = route.fullPath.match(PATH_RE)?.groups ?? {};
  const url = `${config.public.baseURL}${path}`;

  useServerHead({
    meta: () => [
      { name: "theme-color", content: "#0ea5e9" },
      { name: "msapplication-TileColor", content: "#0ea5e9" },
      { property: "og:url", content: url },
      {
        property: "og:image",
        content: `${config.public.baseURL}/__og-image__/static/og.png`,
        key: "og:image",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "600" },
      {
        property: "og:title",
        content: (route.meta.title as string) || config.public.ownerName,
      },
      {
        name: "description",
        content:
          (route.meta.description as string) ||
          `The personal website of ${config.public.ownerName}`,
      },
      {
        property: "og:description",
        content:
          (route.meta.description as string) ||
          `The personal website of ${config.public.ownerName}`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: `@${config.public.twitter}` },
      { name: "twitter:creator", content: `@${config.public.twitter}` },
    ],
    link: [
      { rel: "canonical", href: url },
      { rel: "mask-icon", color: "#fff", href: "/favicon.ico" },
      { rel: "icon", type: "image/ico", href: "/favicon.ico" },
      { rel: "alternate", type: "application/rss+xml", href: "/rss.xml" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/icon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "feed", type: "application/rss+xml", href: "/rss.xml" },
    ],
  });
}
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

.font-sans {
  font-family: "Barlow", "Barlow Fallback: BlinkMacSystemFont",
    "Barlow Fallback: Segoe UI", "Barlow Fallback: Roboto",
    "Barlow Fallback: Helvetica Neue", "Barlow Fallback: Arial", system-ui,
    sans-serif;
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
