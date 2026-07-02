<template>
  <div
    data-testid="portfolio-social-links"
    class="mt-8 flex flex-wrap gap-5 text-[12px] text-zinc-700 dark:text-zinc-300"
  >
    <NuxtLink
      v-for="item in primaryItems"
      :key="item.name"
      :to="item.url"
      target="_blank"
      external
      class="flex items-center gap-2 transition hover:text-zinc-950 dark:hover:text-white"
    >
      <UIcon :name="item.icon" class="size-4" />
      <span>{{ item.name }}</span>
    </NuxtLink>

    <div
      v-if="overflowItems.length"
      class="flex flex-wrap items-center gap-5"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <button
        v-show="!isHovering"
        type="button"
        data-testid="portfolio-social-more-toggle"
        :aria-expanded="showOverflow"
        class="flex items-center gap-2 transition hover:text-zinc-950 dark:hover:text-white"
        @click="expanded = !expanded"
      >
        <span>{{ expanded ? "−" : `+${overflowItems.length}` }}</span>
      </button>

      <NuxtLink
        v-for="item in overflowItems"
        v-show="showOverflow"
        :key="item.name"
        :to="item.url"
        target="_blank"
        external
        :data-testid="`portfolio-social-row-${slugify(item.name)}`"
        class="flex items-center gap-2 transition hover:text-zinc-950 dark:hover:text-white"
      >
        <UIcon :name="item.icon" class="size-4" />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  visibleCount: {
    type: Number,
    default: 5,
  },
});

const expanded = ref(false);
const isHovering = ref(false);

const primaryItems = computed(() => props.items.slice(0, props.visibleCount));
const overflowItems = computed(() => props.items.slice(props.visibleCount));
const showOverflow = computed(() => expanded.value || isHovering.value);

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
</script>
