<template>
  <footer class="body-font max-w-2xl mx-auto">
    <div class="flex flex-col gap-2 py-2">
      <!-- affiliate link -->
      <UAlert
        v-if="footer.affiliate"
        variant="solid"
        :title="footer.affiliate.title"
        :avatar="{ src: '/credits/dubco.png', alt: 'Dub.co', size: 'sm' }"
      >
        <template #title="{ title }">
          <h2 class="text-lg font-bold">{{ title }}</h2>
        </template>
        <template #description>
          <div class="flex flex-col relative">
            <p class="text-base">{{ footer.affiliate.description }}</p>
            <UButton
              :to="footer.affiliate.url"
              target="_blank"
              variant="soft"
              color="white"
              class="mt-2 hover:text-primary-500 transition-all duration-300 underline flex items-center gap-2 w-fit p-0"
              external
            >
              <span>Signup to Dub</span>
            </UButton>
            <span
              class="absolute top-0 right-0 -translate-y-1/2 hidden lg:block text-5xl px-2 py-1 opacity-30 rounded-full animate-pulse"
              >20% off</span
            >
          </div>
        </template>
      </UAlert>

      <!-- Github repo -->
      <UAlert
        v-if="footer"
        icon="i-simple-icons-github"
        variant="solid"
        :title="footer.title"
      >
        <template #icon="{ icon }">
          <UIcon :name="icon" class="w-8 h-8" />
        </template>
        <template #title="{ title }">
          <span>{{ title }}</span>
        </template>
        <template #description>
          This site is opensource template and can be used for free.
          <NuxtLink
            :to="footer.github"
            target="_blank"
            class="text-sm mt-2 hover:text-primary-500 transition-all duration-300 underline flex items-center gap-2"
            external
            >Click to get the template</NuxtLink
          >
        </template>
      </UAlert>
    </div>
    <div
      class="container flex flex-col items-center px-4 py-2 mx-auto border-t-2 border-gray-400 md:px-8 sm:flex-row"
    >
      <p
        class="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 text-center md:text-left"
      >
        © {{ new Date().getFullYear() }} {{ config.public.ownerName }}. All
        Rights Reserved.
      </p>
      <div
        class="flex items-center justify-between md:justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start"
      >
        <SharedOpenstatusWidget />
        <UTooltip text="Blog">
          <UButton
            color="gray"
            variant="ghost"
            :to="footer?.blog"
            target="_blank"
            icon="i-simple-icons-blogger"
            external
          />
        </UTooltip>
      </div>
    </div>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: footer } = await useAsyncData("footer", () => {
  return queryCollection("footer").first();
});
</script>
<style scoped>
@reference "~/assets/css/main.css";

.link {
  @apply text-gray-500 hover:text-primary-500 text-lg flex justify-center items-center;
}
.link svg {
  @apply w-12 h-12;
}
</style>
