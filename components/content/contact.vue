<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="flex gap-6 py-2 mt-1">
    <a
      v-for="item in items"
      :key="item.name"
      :href="item.url"
      target="_blank"
      rel="noopener"
      class="rounded-md text-gray-700 dark:bg-gray-900 dark:text-gray-300 transition-all duration-300 border border-gray-500 p-2 hover:text-primary-500 hover:border-primary-500 flex items-center justify-center"
    >
      <Icon :name="item.name" class="w-5 h-5 md:w-4 md:h-4" />
    </a>
  </div>
</template>
