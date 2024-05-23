<template>
  <footer class="body-font max-w-5xl mx-auto">
    <div class="flex py-2">
      <UAlert
        icon="i-simple-icons-github"
        variant="solid"
        title="Free site template"
      >
        <template #title="{ title }">
          <span>{{ title }}</span>
        </template>
        <template #description>
          This site is opensource template and can be used for free.
          <NuxtLink
            :to="footer.github"
            target="_blank"
            class="text-xs mt-2 hover:text-primary-500 transition-all duration-300 underline flex items-center gap-2"
            external
          >Click to get the template</NuxtLink>
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
        class="flex items-center justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start"
      >
        <SharedOpenstatusWidget />
        <NuxtLink
          :to="`mailto:${footer.email}`"
          target="_blank"
          class="link"
          external
        >
          <Icon name="i-simple-icons-minutemailer" />
        </NuxtLink>

        <NuxtLink :to="footer.github" target="_blank" class="link" external>
          <span class="sr-only">GitHub</span>
          <Icon name="i-simple-icons-github" />
        </NuxtLink>

        <NuxtLink :to="footer.blog" target="_blank" class="link" external>
          <span class="sr-only">Blog</span>
          <Icon name="solar:document-add-outline" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
<script setup>
const config = useRuntimeConfig();
const { data: footer } = await useAsyncData("footer", () =>
  queryContent("/footer").findOne()
);
</script>
<style scoped>
.link {
  @apply text-gray-500 hover:text-primary-500 text-lg flex justify-center items-center;
}
</style>
