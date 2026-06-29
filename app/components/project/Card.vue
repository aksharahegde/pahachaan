<template>
  <NuxtLink
    class="editorial-row group flex items-start gap-4"
    :to="project.url"
    target="_blank"
    external
  >
    <UChip
      v-if="!isMinimalMode"
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
    <div class="min-w-0">
      <h3
        class="editorial-row-title flex items-center gap-2 group-hover:text-primary-600 dark:group-hover:text-primary-400"
      >
        {{ project.heading }}
        <UBadge v-if="project.role" color="neutral" size="sm" variant="subtle">
          {{ project.role }}
        </UBadge>
      </h3>
      <p class="editorial-row-copy">
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

const isMinimalMode = useMinimalMode()
</script>
