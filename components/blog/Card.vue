<template>
  <NuxtLink
    :to="article._path"
    class="py-4 text-gray-600 dark:text-gray-300 text-sm group"
  >
    <UBadge
      :label="useDateFormat(article.published, 'DD MMM YYYY').value"
      color="black"
      variant="soft"
      class="mb-2"
    />
    <div
      class="font-bold md:text-lg text-gray-700 dark:text-gray-200 group-hover:text-primary-500"
    >
      {{ article.title }}
    </div>
    <div>{{ article.description }}</div>
  </NuxtLink>
</template>
<script setup>
import { useDateFormat } from "@vueuse/core";

defineProps({
  article: Object,
});
</script>
