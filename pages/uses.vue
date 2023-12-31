<template>
  <main class="min-h-screen">
    <div
      class="prose text-sm md:text-base prose-li:text-sm prose-h5:text-gray-600 dark:prose-h5:text-gray-200 prose-h5:font-semibold dark:prose-invert prose-blockquote:not-italic max-w-none md:max-w-4xl prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <ContentDoc v-slot="{ doc }">
        <Header
          class="mb-4"
          :title="doc.title"
          :description="doc.description"
        />
        <ContentRenderer :value="doc" />
      </ContentDoc>
    </div>
    <SharedCredits />
  </main>
</template>
<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData("doc", () =>
  queryContent(route.path).findOne()
);

defineOgImageComponent("MyOg", {
  headline: config.public.ownerName,
  title: doc.value.title,
  description: doc.value.description,
  icon: doc.value.icon,
  url: route.fullPath,
});
</script>
