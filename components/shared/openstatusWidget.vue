<template>
  <ClientOnly>
    <UTooltip :text="status.label">
    <a
      v-if="config.public.statusSiteSlug"
      class="inline-flex gap-2 items-center px-3 py-1 max-w-fit"
      :href="statusSiteUrl"
      target="_blank"
      rel="noreferrer"
    >
      <span class="flex relative w-2 h-2">
        <span
          v-if="status.label === 'Operational'"
          class="inline-flex absolute w-full h-full rounded-full opacity-75 duration-1000 animate-ping"
          :class="status.color"
        />
        <span
          class="inline-flex relative w-2 h-2 rounded-full"
          :class="status.color"
        />
      </span>
    </a>
  </UTooltip>
  </ClientOnly>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const statusSiteUrl: any = `https://${config.public.statusSiteSlug}.openstatus.dev`;

const status = ref({
  label: "checking",
  color: undefined,
});

const statusEnum = [
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
  "unknown",
];

const dictionary: any = {
  operational: {
    label: "Operational",
    color: "bg-green-500",
  },
  degraded_performance: {
    label: "Degraded Performance",
    color: "bg-yellow-500",
  },
  partial_outage: {
    label: "Partial Outage",
    color: "bg-yellow-500",
  },
  major_outage: {
    label: "Major Outage",
    color: "bg-red-500",
  },
  unknown: {
    label: "Unknown",
    color: "bg-gray-500",
  },
  under_maintenance: {
    label: "Under Maintenance",
    color: "bg-gray-500",
  },
} as const;

if (config.public.statusSiteSlug) {
  const { data } = await useFetch("/api/site-status");
  const key = statusEnum.includes(data.value?.status)
    ? data.value?.status
    : "unknown";
  status.value = dictionary[key];
}
</script>
