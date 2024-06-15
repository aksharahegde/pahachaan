<template>
  <NuxtLink
    :to="article._path"
    class="flex items-start group p-2 -m-2 rounded-lg flex-col"
  >
    <UBadge
      :label="useDateFormat(article.published, 'Do MMMM YYYY').value"
      color="black"
      variant="soft"
      class="mb-1"
    />
    <div class="flex gap-2">
      <UAvatar
        :src="article.thumbnail"
        :ui="{ rounded: 'rounded relative bg-gray-700' }"
        :alt="article.title"
        size="md"
      />
      <div>
        <h3
          class="text-sm font-medium group-hover:text-primary-600 dark:group-hover:text-primary-500"
        >
          {{ article.title }}
        </h3>
        <p class="dark:text-gray-400 text-gray-600 text-sm py-1">
          {{ article.description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
import { useDateFormat } from "@vueuse/core";

defineProps({
  article: Object,
});
</script>
