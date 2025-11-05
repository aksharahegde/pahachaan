<template>
  <section
    class="flex flex-col gap-2 py-4 text-gray-600 dark:text-gray-300 text-sm"
  >
    <h3
      class="font-bold md:text-lg text-gray-700 dark:text-gray-200 prose-p:my-0"
    >
      <slot />
    </h3>
    <slot name="description" />
  </section>
</template>
