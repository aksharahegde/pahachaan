<template>
  <div class="flex gap-4 py-3 px-1">
    <div
      v-for="status in legend"
      :key="status.name"
      class="flex gap-2 items-center"
    >
      <UChip :color="status.color" />
      <span class="text-xs text-gray-600 dark:text-gray-400 capitalize">{{ status.name }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  legend: {
    type: Array,
    default: () => [],
  },
});
</script>
