<template>
  <main class="min-h-screen">
    <Header class="mb-4" :title="pageMeta.title" :description="pageMeta.description" />
    <div class="flex flex-col gap-4">
      <LabCard v-for="(lab, id) in labs" :key="id" :lab="lab" />
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: labs } = await useAsyncData("labs-all", () =>
  queryCollection("labs").where("title", "<>", "Labs").order("stem", "ASC").all()
);

const { data: doc } = await useAsyncData("labs-index", () =>
  queryCollection("labs").where("title", "==", "Labs").first()
);

const pageMeta = computed(() => ({
  title: "Shop",
  description: "Products and digital goods.",
  icon: "solar:shop-2-outline",
  ...(doc.value || {}),
}));

defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title: pageMeta.value.title,
  description: pageMeta.value.description,
  icon: pageMeta.value.icon,
  url: route.fullPath,
});

useSeoMeta({
  title: pageMeta.value.title,
  description: pageMeta.value.description,
  ogTitle: pageMeta.value.title,
  ogDescription: pageMeta.value.description,
  twitterTitle: pageMeta.value.title,
  twitterDescription: pageMeta.value.description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
