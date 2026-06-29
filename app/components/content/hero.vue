<template>
  <section class="flex flex-col gap-3 text-base">
    <h1 class="font-display text-2xl font-bold md:text-4xl"><slot /></h1>
    <slot name="description" />
  </section>
</template>
