<template>
  <section class="page-section max-w-2xl">
    <h3 class="section-heading">Links</h3>
    <div class="flex flex-wrap gap-x-5 gap-y-3">
      <a
        v-for="item in items"
        :key="item.name"
        :href="item.url"
        target="_blank"
        rel="noopener"
        class="editorial-link group inline-flex items-center gap-2"
      >
        <UIcon
          v-if="!isMinimalMode"
          :name="item.icon"
          class="h-4 w-4 text-gray-500 transition-colors group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-400"
        />
        <span>{{ item.name }}</span>
      </a>
    </div>
  </section>
</template>

<script setup>
const { data: contactData } = await useAsyncData("contact", () =>
  queryCollection("contact").first()
);

const items = computed(() => contactData.value?.contact || []);
const isMinimalMode = useMinimalMode()
</script>
