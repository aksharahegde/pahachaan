<template>
  <NuxtLink
    class="flex flex-col items-start group p-2 -m-2 rounded-lg"
    :to="product.url"
    target="_blank"
    external
  >
    <h3
      class="text-sm font-medium group-hover:text-primary-600 dark:group-hover:text-primary-500"
    >
      {{ product.heading }}
    </h3>
    <p class="dark:text-gray-400 text-gray-600 text-sm py-1">
      {{ product.description }}
    </p>
  </NuxtLink>
</template>

<script setup>
import { STATUS_COLORS } from "~/constants";

defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
