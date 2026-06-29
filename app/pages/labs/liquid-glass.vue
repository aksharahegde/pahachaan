<template>
  <main class="min-h-screen">
    <NuxtLink
      to="/labs"
      class="mb-4 inline-flex items-center gap-1 text-sm text-gray-600 transition hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
      data-testid="liquid-glass-back-labs"
    >
      <UIcon name="solar:arrow-left-outline" class="size-4" aria-hidden="true" />
      All labs
    </NuxtLink>

    <Header class="mb-6" :title="title" :description="description" />
    <LabLiquidGlassDemo />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();

const title = "Liquid Glass Cards";
const description =
  "Interactive frosted-glass card system with aurora scenes, tilt hover, draggable layers, and live performance metrics.";

defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title,
  description,
  icon: "solar:mirror-left-outline",
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

<style>
@import "~/assets/css/liquid-glass.css";
</style>
