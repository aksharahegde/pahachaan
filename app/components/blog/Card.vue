<template>
  <NuxtLink
    :to="article.path"
    class="editorial-row group flex flex-col"
  >
    <span class="editorial-meta mb-2">
      {{ publishedDate }}
    </span>
    <div class="flex items-start gap-3">
      <UAvatar
        v-if="!isMinimalMode"
        :src="article.thumbnail"
        :ui="{ rounded: 'rounded relative bg-gray-700' }"
        :alt="article.title"
        size="md"
      />
      <div class="min-w-0">
        <h3
          class="editorial-row-title group-hover:text-primary-600 dark:group-hover:text-primary-400"
        >
          {{ article.title }}
        </h3>
        <p class="editorial-row-copy">
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

const isMinimalMode = useMinimalMode()
</script>
