<template>
  <section
    class="flex flex-col gap-3 py-6 text-gray-600 dark:text-gray-300 text-base"
  >
    <h3 class="section-heading prose-p:my-0">
      <slot />
    </h3>
    <slot name="description" />
  </section>
</template>
