<template>
  <NuxtLink
    class="flex flex-col items-start group p-2 -m-2 rounded-lg"
    :to="lab.url"
    :target="isExternal ? '_blank' : undefined"
    :external="isExternal"
  >
    <h3
      class="text-sm font-medium group-hover:text-primary-600 dark:group-hover:text-primary-500"
    >
      {{ lab.heading }}
    </h3>
    <p class="dark:text-gray-400 text-gray-600 text-sm py-1">
      {{ lab.description }}
    </p>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  lab: {
    type: Object,
    required: true,
  },
});

const isExternal = computed(() => /^https?:\/\//.test(props.lab.url));
</script>
