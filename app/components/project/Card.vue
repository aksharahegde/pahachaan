<template>
  <NuxtLink
    v-if="variant === 'compact'"
    :to="project.url"
    :data-testid="`${testDomain}-row-${rowId}`"
    target="_blank"
    external
    class="group grid gap-3 border-t border-zinc-200 py-3 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5 md:grid-cols-[minmax(0,1fr)_24px] md:items-center"
  >
    <div class="flex min-w-0 items-center gap-3">
      <UAvatar
        v-if="!isMinimalMode"
        :src="project.thumbnail"
        :ui="{ rounded: 'rounded px-[2px] py-[4px] relative' }"
        :alt="project.heading"
        :class="project.thumbnailBg"
        size="sm"
      />
      <div class="min-w-0">
        <div class="flex min-w-0 items-center gap-2">
          <span class="size-1.5 shrink-0 rounded-full" :class="statusDotClass(project.status)" />
          <h3 class="truncate font-semibold text-zinc-950 dark:text-zinc-50">
            {{ project.heading }}
          </h3>
        </div>
        <p class="line-clamp-1 text-zinc-500 dark:text-zinc-400">
          {{ project.description }}
        </p>
      </div>
    </div>

    <UIcon
      name="i-solar-arrow-right-up-linear"
      class="hidden size-4 justify-self-end text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 md:block dark:group-hover:text-white"
    />
  </NuxtLink>

  <NuxtLink
    v-else-if="variant === 'source'"
    :to="project.url"
    :data-testid="`${testDomain}-row-${rowId}`"
    target="_blank"
    external
    class="group grid gap-3 border-t border-zinc-200 py-3 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5 md:grid-cols-[minmax(0,1.25fr)_1fr_70px_70px_120px_24px] md:items-center"
  >
    <div class="flex min-w-0 items-center gap-3">
      <UAvatar
        v-if="!isMinimalMode"
        :src="project.thumbnail"
        :ui="{ rounded: 'rounded px-[2px] py-[4px] relative' }"
        :alt="project.heading"
        :class="project.thumbnailBg"
        size="xs"
      />
      <div class="min-w-0">
        <h3 class="truncate font-semibold text-zinc-950 dark:text-zinc-50">
          {{ project.heading }}
        </h3>
        <p class="line-clamp-1 text-zinc-500 dark:text-zinc-400 md:hidden">
          {{ project.description }}
        </p>
      </div>
    </div>
    <p class="hidden truncate text-zinc-500 dark:text-zinc-400 md:block">
      {{ project.description }}
    </p>
    <span class="hidden text-zinc-600 dark:text-zinc-300 md:block">{{ project.stars || "320" }}</span>
    <span class="hidden text-zinc-600 dark:text-zinc-300 md:block">{{ project.forks || "40" }}</span>
    <span class="text-zinc-500 dark:text-zinc-400">{{ project.updated || "Updated 1w ago" }}</span>
    <UIcon
      name="i-solar-arrow-right-up-linear"
      class="hidden size-4 justify-self-end text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 md:block dark:group-hover:text-white"
    />
  </NuxtLink>

  <NuxtLink
    v-else-if="variant === 'archive'"
    :to="project.url"
    :data-testid="`${testDomain}-row-${rowId}`"
    target="_blank"
    external
    class="group grid gap-4 border-t border-zinc-200 py-5 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5 md:grid-cols-[minmax(0,1fr)_24px] md:items-start"
  >
    <div class="flex min-w-0 gap-3">
      <UAvatar
        v-if="!isMinimalMode"
        :src="project.thumbnail"
        :ui="{ rounded: 'rounded px-[2px] py-[4px] relative' }"
        :alt="project.thumbnailAlt || project.heading"
        :class="project.thumbnailBg"
        size="sm"
      />
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <span class="size-1.5 rounded-full" :class="statusDotClass(project.status)" />
          <h3 class="text-xl font-semibold tracking-[-0.04em] text-zinc-950 transition group-hover:text-primary-600 dark:text-zinc-50 dark:group-hover:text-primary-500">
            {{ project.heading }}
          </h3>
          <UBadge v-if="project.role" color="neutral" size="xs" variant="subtle">
            {{ project.role }}
          </UBadge>
        </div>
        <p class="mt-1 line-clamp-2 leading-6 text-zinc-600 dark:text-zinc-400">
          {{ project.description }}
        </p>
      </div>
    </div>

    <UIcon
      name="i-solar-arrow-right-up-linear"
      class="hidden size-4 justify-self-end text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 md:block dark:group-hover:text-white"
    />
  </NuxtLink>

  <NuxtLink
    v-else
    class="flex items-center gap-4 group p-2 -m-2 rounded-lg"
    :to="project.url"
    target="_blank"
    external
  >
    <UChip
      v-if="!isMinimalMode"
      :color="STATUS_COLORS[project.status]"
      size="md"
      variant="solid"
      position="top-left"
      inset
    >
      <UAvatar
        :src="project.thumbnail"
        :ui="{ rounded: 'rounded px-[2px] py-[4px] relative' }"
        :alt="project.heading"
        :class="project.thumbnailBg"
        size="md"
      />
    </UChip>
    <div class="min-w-0">
      <h3
        class="editorial-row-title flex items-center gap-2 group-hover:text-primary-600 dark:group-hover:text-primary-400"
      >
        {{ project.heading }}
        <UBadge v-if="project.role" color="neutral" size="sm" variant="subtle">
          {{ project.role }}
        </UBadge>
      </h3>
      <p class="editorial-row-copy">
        {{ project.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
import { STATUS_COLORS } from "~/constants";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  variant: {
    type: String,
    default: "default",
  },
  testDomain: {
    type: String,
    default: "portfolio",
  },
});

const isMinimalMode = useMinimalMode();
const testDomain = computed(() => props.testDomain);
const rowId = computed(() =>
  String(props.project.heading || "project")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
);

const statusDotClass = (status) => {
  const classes = {
    active: "bg-emerald-500",
    completed: "bg-green-500",
    wip: "bg-amber-500",
    abandoned: "bg-red-500",
  };

  return classes[status] || "bg-zinc-400";
};
</script>
