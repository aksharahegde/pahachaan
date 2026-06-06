<template>
  <main class="min-h-screen">
    <Header class="mb-4" :title="doc.title" :description="doc.description" />
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

const { title, description, icon } = doc.value;
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
