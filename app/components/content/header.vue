<template>
  <div>
    <h1 class="page-heading">
      {{ title }}
    </h1>
    <p class="page-lead">
      {{ description }}
    </p>
  </div>
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
});
</script>
