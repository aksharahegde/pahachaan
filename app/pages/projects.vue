<template>
  <main class="min-h-screen pb-12">
    <section class="space-y-8 pb-12 pt-6 md:pb-16 md:pt-8">
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
          Work archive
        </p>
        <h1 class="mt-3 font-serif text-3xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl md:text-4xl">
          {{ pageDoc.title }}
        </h1>
        <p class="mt-4 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
          {{ pageDoc.description }}
        </p>
        <ProjectStatusLegend :legend="STATUS_LEGEND" class="mt-4" />
      </div>

      <aside class="space-y-8">
        <NuxtLink
          v-if="featuredProject"
          :to="featuredProject.url"
          data-testid="portfolio-work-featured-link"
          target="_blank"
          external
          class="group block border-t border-zinc-200 pt-5 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5"
        >
          <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Featured
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
            {{ featuredProject.heading }}
          </h2>
          <p class="mt-2 leading-6 text-zinc-600 dark:text-zinc-400">
            {{ featuredProject.description }}
          </p>
          <span class="mt-4 inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            Visit project
            <UIcon
              name="i-solar-arrow-right-up-linear"
              class="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </NuxtLink>
      </aside>
    </section>

    <section>
      <div class="mb-4">
        <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
          All Work
        </h2>
      </div>

      <ProjectCard
        v-for="project in projectItems"
        :key="project.path || project.heading"
        :project="project"
        variant="archive"
        test-domain="portfolio-work"
      />
    </section>
  </main>
</template>

<script setup>
import { STATUS_LEGEND } from "~/constants";

const route = useRoute();
const config = useRuntimeConfig();

const { data: projects } = await useAsyncData("projects-all", () =>
  queryCollection("projects").order("stem", "ASC").all()
);

const { data: doc } = await useAsyncData(route.path, () => {
  return queryCollection("projects")
    .where("title", "==", "Projects")
    .order("status", "DESC")
    .first();
});

const pageDoc = computed(() => ({
  title: "Projects",
  description: "I love to build things that make an impact, mostly open source projects.",
  icon: "solar:folder-with-files-outline",
  ...(doc.value || {}),
}));

const projectStatusOrder = {
  active: 0,
  wip: 1,
  completed: 2,
  abandoned: 3,
  abondoned: 3,
};

const projectItems = computed(() =>
  (projects.value || [])
    .filter((project) => project?.heading && project?.url)
    .slice()
    .sort((a, b) => {
      const statusA = projectStatusOrder[a.status] ?? Number.MAX_SAFE_INTEGER;
      const statusB = projectStatusOrder[b.status] ?? Number.MAX_SAFE_INTEGER;

      return statusA - statusB || String(a.stem).localeCompare(String(b.stem));
    })
);

const featuredProject = computed(
  () => projectItems.value.find((project) => project.status === "active") || projectItems.value[0]
);

const { title, description, icon } = pageDoc.value;
defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title,
  description,
  icon,
  url: route.fullPath,
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
