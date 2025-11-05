<template>
  <section class="flex flex-col gap-2 text-sm">
    <h1 class="text-2xl font-bold md:text-4xl"><slot /></h1>
    <slot name="description" />
  </section>
</template>
