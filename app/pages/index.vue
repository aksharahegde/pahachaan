<template>
  <main class="min-h-screen pb-8">
    <section class="pb-14 pt-6 md:pb-20 md:pt-8">
      <div class="max-w-3xl">
        <h1 class="font-serif text-3xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl md:text-4xl">
          {{ homeContent.name }}
        </h1>

        <p class="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-900 dark:text-zinc-100">
          {{ focusItems.join(" · ") }}
        </p>

        <p class="mt-7 max-w-2xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
          {{ homeContent.bio }}
        </p>

        <SharedPortfolioSocialLinks :items="contactItems" />
      </div>
    </section>

    <section class="space-y-14">
      <div>
        <div class="mb-4 grid grid-cols-[1fr_auto] items-center gap-4">
          <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">Selected Work</h2>
          <NuxtLink
            to="/projects"
            data-testid="portfolio-work-view-link"
            class="text-[11px] text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
          >
            View all work →
          </NuxtLink>
        </div>
        <ProjectCard
          v-for="project in selectedProjects"
          :key="project.path"
          :project="project"
          variant="compact"
          test-domain="portfolio-work"
        />
      </div>

      <div>
        <div class="mb-4 grid grid-cols-[1fr_auto] items-center gap-4">
          <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">Experiments</h2>
          <NuxtLink
            to="/labs"
            data-testid="portfolio-experiments-view-link"
            class="text-[11px] text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
          >
            View all experiments →
          </NuxtLink>
        </div>
        <NuxtLink
          v-for="experiment in experimentItems"
          :key="experiment.id"
          :to="experiment.url"
          :data-testid="`portfolio-experiment-row-${experiment.id}`"
          class="group grid grid-cols-[1fr_24px] gap-3 border-t border-zinc-200 py-3 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5 md:items-center"
        >
          <div>
            <h3 class="font-semibold text-zinc-950 dark:text-zinc-50">{{ experiment.title }}</h3>
            <p class="text-zinc-500 dark:text-zinc-400">{{ experiment.description }}</p>
          </div>
          <UIcon
            name="i-solar-arrow-right-up-linear"
            class="size-4 justify-self-end text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 dark:group-hover:text-white"
          />
        </NuxtLink>
      </div>

      <div>
        <div class="mb-4 grid grid-cols-[1fr_auto] items-center gap-4">
          <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">Writing</h2>
          <NuxtLink
            to="/blog"
            data-testid="portfolio-writing-view-link"
            class="text-[11px] text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
          >
            View all writing →
          </NuxtLink>
        </div>
        <BlogCard
          v-for="article in articles"
          :key="article.path"
          :article="article"
          variant="compact"
          test-domain="portfolio-writing"
        />
      </div>

      <div v-if="recentCertifications.length">
        <div class="mb-4 grid grid-cols-[1fr_auto] items-center gap-4">
          <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">Certifications</h2>
          <NuxtLink
            to="/certifications"
            data-testid="portfolio-certifications-view-link"
            class="text-[11px] text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
          >
            View all certifications →
          </NuxtLink>
        </div>
        <CertificationCard
          v-for="certification in recentCertifications"
          :key="certification.heading"
          :certification="certification"
          variant="compact"
          test-domain="portfolio-certifications"
        />
      </div>

      <div>
        <div class="mb-4 grid grid-cols-[1fr_auto] items-center gap-4">
          <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">Developer Toolkit</h2>
          <NuxtLink
            to="/resources"
            data-testid="portfolio-toolkit-view-link"
            class="text-[11px] text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
          >
            View all tools →
          </NuxtLink>
        </div>
        <NuxtLink
          v-for="item in toolkitItems"
          :key="item.id"
          :to="item.url"
          :data-testid="`portfolio-toolkit-row-${item.id}`"
          class="group grid grid-cols-[20px_1fr_16px] items-center gap-4 border-t border-zinc-200 py-3 text-[12px] transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5"
        >
          <UIcon :name="item.icon" class="size-4 text-zinc-700 dark:text-zinc-300" />
          <div>
            <h3 class="font-semibold text-zinc-950 dark:text-zinc-50">{{ item.title }}</h3>
            <p class="text-zinc-500 dark:text-zinc-400">{{ item.description }}</p>
          </div>
          <UIcon
            name="i-solar-alt-arrow-right-linear"
            class="size-4 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-900 dark:group-hover:text-white"
          />
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: home } = await useAsyncData("home", () =>
  queryCollection("home").first()
);

const { data: contactData } = await useAsyncData("contact-home", () =>
  queryCollection("contact").first()
);

const { data: selectedProjects } = await useAsyncData("home-selected-projects", () =>
  queryCollection("projects").where("status", "==", "active").limit(5).all()
);

const { data: articles } = await useAsyncData("home-writing", () =>
  queryCollection("blog")
    .select("path", "title", "description", "published", "thumbnail")
    .where("title", "<>", "Blog")
    .order("published", "DESC")
    .limit(5)
    .all()
);

const { data: certifications } = await useAsyncData("home-certifications", () =>
  queryCollection("certifications").order("issued", "DESC").all()
);

const { data: seo } = await useAsyncData("seo", () =>
  queryCollection("seo").first()
);

const defaultHome = {
  name: "Akshara Hegde",
  bio: "I build products, developer tools and AI applications.",
  focus: ["Builder", "Open Source", "Writer"],
  now: [],
  experiments: [],
  toolkit: [],
};

const defaultSeo = {
  title: "Akshara Hegde",
  description: "Portfolio and blog of Akshara Hegde",
  coverImage: "/avatar-bw.jpg",
  theme: "#18181b",
  colorMode: "light",
};

const homeContent = computed(() => ({
  ...defaultHome,
  ...(home.value || {}),
}));

const pageSeo = computed(() => ({
  ...defaultSeo,
  ...(seo.value || {}),
}));

const contactItems = computed(() => contactData.value?.contact || []);
const focusItems = computed(() => homeContent.value.focus.filter(Boolean));
const experimentItems = computed(() =>
  homeContent.value.experiments.filter((item) => item?.id && item?.title)
);
const toolkitItems = computed(() =>
  homeContent.value.toolkit.filter((item) => item?.id && item?.title)
);
const recentCertifications = computed(() =>
  (certifications.value || [])
    .filter((item) => item?.heading && item?.url)
    .slice(0, 4)
);

const payload = {
  headline: pageSeo.value.headline,
  title: pageSeo.value.title,
  description: pageSeo.value.description,
  coverImage: pageSeo.value.coverImage,
  theme: pageSeo.value.theme,
  colorMode: pageSeo.value.colorMode,
  siteName: config.public.ownerName,
  url: config.public.baseURL,
};
defineOgImage("MyOg", payload);

useHead({
  title: pageSeo.value.title,
  titleTemplate: false,
});

useSeoMeta({
  description: pageSeo.value.description,
  ogTitle: pageSeo.value.title,
  ogDescription: pageSeo.value.description,
  twitterTitle: pageSeo.value.title,
  twitterDescription: pageSeo.value.description,
  twitterImage: pageSeo.value.coverImage,
  twitterTheme: pageSeo.value.theme,
  twitterColorScheme: pageSeo.value.colorMode,
});
</script>
