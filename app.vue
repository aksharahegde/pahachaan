<template>
  <NuxtLoadingIndicator color="primary" />
  <SharedNavbar />
  <div class="h-4 md:h-24" />
  <UContainer>
    <NuxtPage />
  </UContainer>
  <div class="h-4 md:h-32" />
  <SharedFooter />
  <div class="h-16 md:hidden" />
</template>
<script setup>
const config = useRuntimeConfig();
useSeoMeta({
  ogImage: `${config.public.baseURL}/og_me.png`,
  twitterCard: "summary_large_image",
});
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/icon.png",
    },
  ],
});
</script>
<style>
* {
  font-family: "Fira Code", monospace;
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
