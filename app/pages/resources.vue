<template>
  <main class="min-h-screen pb-12">
    <section class="pb-12 pt-6 md:pb-16 md:pt-8">
      <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
        Toolkit archive
      </p>
      <h1 class="mt-3 font-serif text-3xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl md:text-4xl">
        {{ pageMeta.title }}
      </h1>
      <p class="mt-4 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
        {{ pageMeta.description }}
      </p>
    </section>

    <section class="space-y-12">
      <div
        v-for="resource in resourceGroups"
        :key="resource.slug"
      >
        <div class="mb-4 grid grid-cols-[1fr_auto] items-end gap-4">
          <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
            {{ resource.tag }}
          </h2>
          <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            {{ resource.links.length }} links
          </p>
        </div>

        <NuxtLink
          v-for="(link, index) in resource.links"
          :key="link.url"
          :to="link.url"
          :data-testid="`resource-row-${resource.slug}-${index}`"
          target="_blank"
          external
          class="group grid grid-cols-[minmax(0,1fr)_20px] gap-4 border-t border-zinc-200 py-3 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5"
        >
          <div>
            <h3 class="font-semibold text-zinc-950 transition group-hover:text-zinc-950 dark:text-zinc-50 dark:group-hover:text-white">
              {{ getLinkTitle(link) }}
            </h3>
            <p class="mt-1 truncate text-zinc-500 dark:text-zinc-400">
              {{ getDisplayUrl(link.url) }}
            </p>
          </div>
          <UIcon
            name="i-solar-arrow-right-up-linear"
            class="size-4 justify-self-end text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 dark:group-hover:text-white"
          />
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: doc } = await useAsyncData("resources-doc", () =>
  queryCollection("content").where("title", "==", "Resources").first()
);

const { data: resources } = await useAsyncData("resources-list", () =>
  queryCollection("resources").all()
);

const pageMeta = computed(() => ({
  title: "Resources",
  description: "Useful links and resources.",
  icon: "solar:bookmark-linear",
  ...(doc.value || {}),
}));

const resourceGroups = computed(() =>
  [...(resources.value || [])].sort((a, b) => a.tag.localeCompare(b.tag))
);

const parseResourceUrl = (url) => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

const getLinkTitle = (link) => {
  if (link.title) {
    return link.title;
  }

  return parseResourceUrl(link.url)?.hostname.replace(/^www\./, "") || link.url;
};

const getDisplayUrl = (url) => {
  const parsedUrl = parseResourceUrl(url);

  if (!parsedUrl) {
    return url;
  }

  const pathname = parsedUrl.pathname === "/" ? "" : parsedUrl.pathname.replace(/\/$/, "");

  return `${parsedUrl.hostname.replace(/^www\./, "")}${pathname}`;
};

defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title: pageMeta.value.title,
  description: pageMeta.value.description,
  icon: pageMeta.value.icon,
  url: route.fullPath,
});

useSeoMeta({
  title: pageMeta.value.title,
  description: pageMeta.value.description,
  ogTitle: pageMeta.value.title,
  ogDescription: pageMeta.value.description,
  twitterTitle: pageMeta.value.title,
  twitterDescription: pageMeta.value.description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
