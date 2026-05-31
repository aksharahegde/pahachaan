<template>
  <a :href="url" target="_blank" class="w-full block">
    <UAlert
      :title="title"
      :description="description"
      color="neutral"
      variant="subtle"
      :avatar="isMinimalMode ? undefined : { src: image, alt: title }"
    />
  </a>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const isMinimalMode = useMinimalMode()
</script>

