<template>
  <NuxtLink
    class="flex items-center gap-4 group p-2 -m-2 rounded-lg"
    :to="project.url"
    target="_blank"
    external
  >
    <UChip
      :color="STATUS_COLORS[project.status]"
      size="md"
      variant="solid"
      position="top-left"
      inset
    >
      <UAvatar
        :src="project.thumbnail"
        :ui="{ rounded: 'rounded px-[2px] py-[4px] relative' }"
        :alt="project.heading"
        :class="project.thumbnailBg"
        size="md"
      />
    </UChip>
    <div>
      <h3
        class="text-base flex items-center gap-2 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-500"
      >
        {{ project.heading }}
        <UBadge v-if="project.role" color="neutral" size="sm" variant="subtle">
          {{ project.role }}
        </UBadge>
      </h3>
      <p class="dark:text-gray-400 text-gray-600 text-base">
        {{ project.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
import { STATUS_COLORS } from "~/constants";

defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>
