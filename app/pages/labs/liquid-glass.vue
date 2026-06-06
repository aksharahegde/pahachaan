<template>
  <LabLiquidGlassDemo />
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();

const title = "Liquid Glass Cards";
const description =
  "Interactive frosted-glass card system with aurora scenes, tilt hover, draggable layers, and live performance metrics.";
const icon = "solar:mirror-left-outline";

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

<style>
@import "~/assets/css/liquid-glass.css";
</style>
