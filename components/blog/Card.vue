<template>
  <NuxtLink
    :to="article.path"
    class="flex items-start group p-2 -m-2 rounded-lg flex-col"
  >
    <UBadge :label="publishedDate" color="black" variant="soft" class="mb-1" />
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

const props = defineProps({
  article: Object,
});
const publishedDate = ref(null);
onMounted(() => {
  publishedDate.value = useDateFormat(
    props.article.published,
    "Do MMMM YYYY"
  ).value;
});
</script>
