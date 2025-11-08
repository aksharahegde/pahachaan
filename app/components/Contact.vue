<template>
  <div class="flex flex-col max-w-xl">
    <h3 class="font-bold md:text-xl text-gray-700 dark:text-gray-200">Links</h3>
    <div class="flex flex-wrap gap-6 py-2">
      <a
        v-for="item in items"
        :key="item.name"
        :href="item.url"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-2 group"
      >
        <UIcon
          :name="item.icon"
          class="text-gray-700 dark:text-gray-300 w-6 h-6 transition-all duration-500 group-hover:scale-110"
        />
        <span
          class="text-base font-medium text-gray-600 dark:text-gray-400 group-hover:underline"
        >
          {{ item.name }}
        </span>
      </a>
    </div>
  </div>
</template>

<script setup>
const { data: contactData } = await useAsyncData("contact", () =>
  queryCollection("contact").first()
);

const items = computed(() => contactData.value?.contact || []);
</script>
