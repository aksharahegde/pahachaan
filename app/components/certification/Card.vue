<template>
  <NuxtLink
    v-if="variant === 'compact'"
    :to="certification.url"
    :data-testid="`${testDomain}-row-${rowId}`"
    target="_blank"
    external
    class="group grid gap-3 border-t border-zinc-200 py-3 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5 md:grid-cols-[minmax(0,1fr)_24px] md:items-center"
  >
    <div class="flex min-w-0 items-center gap-3">
      <UAvatar
        v-if="certification.badge"
        :src="certification.badge"
        :ui="{ rounded: 'rounded px-[2px] py-[4px] relative' }"
        :alt="certification.heading"
        :class="certification.badgeBg"
        size="sm"
      />
      <div
        v-else-if="certification.icon"
        class="flex size-8 shrink-0 items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800"
      >
        <UIcon :name="certification.icon" class="size-4 text-zinc-700 dark:text-zinc-300" />
      </div>
      <div class="min-w-0">
        <h3 class="truncate font-semibold text-zinc-950 dark:text-zinc-50">
          {{ certification.heading }}
        </h3>
        <p class="line-clamp-1 text-zinc-500 dark:text-zinc-400">
          {{ issuerLine }}
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
    :to="certification.url"
    :data-testid="`${testDomain}-row-${rowId}`"
    target="_blank"
    external
    class="group grid gap-4 border-t border-zinc-200 py-5 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5 md:grid-cols-[minmax(0,1fr)_24px] md:items-start"
  >
    <div class="flex min-w-0 gap-3">
      <UAvatar
        v-if="certification.badge"
        :src="certification.badge"
        :ui="{ rounded: 'rounded px-[2px] py-[4px] relative' }"
        :alt="certification.heading"
        :class="certification.badgeBg"
        size="sm"
      />
      <div
        v-else-if="certification.icon"
        class="flex size-8 shrink-0 items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800"
      >
        <UIcon :name="certification.icon" class="size-4 text-zinc-700 dark:text-zinc-300" />
      </div>
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-xl font-semibold tracking-[-0.04em] text-zinc-950 transition group-hover:text-primary-600 dark:text-zinc-50 dark:group-hover:text-primary-500">
            {{ certification.heading }}
          </h3>
          <span
            v-if="issuedDate"
            class="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
          >
            {{ issuedDate }}
          </span>
        </div>
        <p class="mt-1 text-zinc-600 dark:text-zinc-400">
          {{ issuerLine }}
        </p>
        <p
          v-if="certification.description"
          class="mt-1 line-clamp-2 leading-6 text-zinc-600 dark:text-zinc-400"
        >
          {{ certification.description }}
        </p>
        <p
          v-if="certification.credentialId"
          class="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400"
        >
          ID {{ certification.credentialId }}
        </p>
      </div>
    </div>

    <UIcon
      name="i-solar-arrow-right-up-linear"
      class="hidden size-4 justify-self-end text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 md:block dark:group-hover:text-white"
    />
  </NuxtLink>
</template>

<script setup>
import { useDateFormat } from "@vueuse/core";

const props = defineProps({
  certification: {
    type: Object,
    required: true,
  },
  variant: {
    type: String,
    default: "compact",
  },
  testDomain: {
    type: String,
    default: "portfolio-certifications",
  },
});

const testDomain = computed(() => props.testDomain);
const rowId = computed(() =>
  String(props.certification?.heading || "certification")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
);

const issuedDate = computed(() =>
  props.certification?.issued
    ? useDateFormat(props.certification.issued, "MMM YYYY").value
    : ""
);

const issuerLine = computed(() => {
  if (props.variant === "compact") {
    const parts = [props.certification?.issuer, issuedDate.value].filter(Boolean);
    return parts.join(" · ");
  }

  return props.certification?.issuer || "";
});
</script>
