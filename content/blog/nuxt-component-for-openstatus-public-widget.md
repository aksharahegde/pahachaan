---
title: Nuxt component for Openstatus public widget
description: Component for adding Openstatus public widget to Nuxt 2 and Nuxt 3
path: /blog/openstatus-public-widget-nuxt
published: 2023-10-05T23:00:08.602Z
cover: /blog/nuxt-component-for-openstatus-public-widget.png
---

<img src="/blog/nuxt-component-for-openstatus-public-widget.png">

[Openstatus](https://www.openstatus.dev/) has added a public endpoint where you can access the status of your status page.
However, there's no SDK or package to integrate the status into your project right now.

Here, I'm giving components for Nuxt 2 and Nuxt 3 projects.

### Component for Nuxt 3
```html
<template>
  <a
    class="inline-flex gap-2 items-center px-3 py-1 text-sm rounded-md border border-border text-white/70 hover:bg-muted hover:text-white max-w-fit"
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
    {{ status.label }}
  </a>
</template>
<script setup lang="ts">
import * as z from "zod";

const config = useRuntimeConfig();
const statusSiteUrl = config.statusSiteSlug;

const status = ref({
  label: "checking",
  color: undefined,
});

const statusEnum = z.enum([
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
  "unknown",
]);

const statusSchema = z.object({ status: statusEnum });

const dictionary = {
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

const { data } = await useFetch("/api/site-status");
const parsed = statusSchema.safeParse(data);
const key = !parsed.success ? "unknown" : parsed.data.status;
status.value = dictionary[key];
</script>
```

### Component for Nuxt 2
```html
<template>
  <a
    class="inline-flex gap-2 items-center px-3 py-1 text-sm rounded-md border border-border text-white/70 hover:bg-muted hover:text-white max-w-fit"
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
    {{ status.label }}
  </a>
</template>
<script>
const statusEnum = [
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
  "unknown",
];

const dictionary = {
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
};

export default {
  data() {
    return {
      status: {
        label: "Checking",
        color: "",
      },
      statusSiteUrl: "read-from-runtime-config",
    };
  },
  mounted() {
    this.fetchSiteStatus();
  },
  methods: {
    async fetchSiteStatus() {
      const { data } = await $fetch((`/api/site-status`);
      const key = statusEnum.includes(data.status) ? data.status : "unknown";
      this.status = dictionary[key];
    },
  },
};
</script>
```


### Serverless function to fetch status from Openstatus public API
```js
export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  const resp = await $fetch(
    `https://api.openstatus.dev/public/status/${config.statusSiteSlug}`,
    {
      next: { revalidate: 60 }, // cache request for 60 seconds
    }
  );
  return response.status(200).json(resp.data);
})
```

You can find the code snippets in notion as well:
[Openstatus public widget snippets](https://nullbrains.notion.site/Openstatus-Widget-Nuxt-Components-0784ad2140894ebdb5d400172a556b9c)

Link to main documentation of Openstatus:
[Openstatus Docs](https://docs.openstatus.dev/)
