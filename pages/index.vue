<template>
  <main class="min-h-screen space-y-6">
    <ContentDoc path="/" />
    <ProjectList class="mt-2" />
    <BlogRecent class="mt-2" />
  </main>
</template>
<script setup>
const config = useRuntimeConfig();
const { data: seo } = await useAsyncData("seo", () =>
  queryContent("/seo").findOne()
);

const payload = {
  ...seo.value,
  url: config.public.baseUrl,
  siteName: config.public.ownerName,
}
defineOgImageComponent("MyOg", payload);
</script>
