<template>
  <main class="min-h-screen space-y-6">
    <ContentDoc path="/" />
    <ProjectList class="mt-2" />
    <BlogRecent class="mt-2" />
  </main>
</template>
<script setup>
// @todo Icon is not working. Need to check.

// const config = useRuntimeConfig();
// const { data: seo } = await useAsyncData("seo", () =>
//   queryContent("/seo").findOne()
// );

// defineOgImageComponent("Nuxt", {
//   title: seo.value.title,
//   description: seo.value.description,
//   icon: seo.value.icon,
//   siteLogo: seo.value.siteLogo,
//   url: config.public.baseUrl,
// });
</script>
