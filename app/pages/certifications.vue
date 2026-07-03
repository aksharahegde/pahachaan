<template>
  <main class="min-h-screen pb-12">
    <section class="space-y-8 pb-12 pt-6 md:pb-16 md:pt-8">
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
          Credentials
        </p>
        <h1 class="mt-3 font-serif text-3xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl md:text-4xl">
          {{ pageDoc.title }}
        </h1>
        <p class="mt-4 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
          {{ pageDoc.description }}
        </p>
        <p class="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          {{ certificationItems.length }} certifications
        </p>
      </div>
    </section>

    <section>
      <div class="mb-4">
        <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
          All Certifications
        </h2>
      </div>

      <CertificationCard
        v-for="certification in certificationItems"
        :key="certification.heading"
        :certification="certification"
        variant="archive"
        test-domain="portfolio-certifications"
      />
    </section>
  </main>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: certifications } = await useAsyncData("certifications-all", () =>
  queryCollection("certifications").order("issued", "DESC").all()
);

const { data: doc } = await useAsyncData("certifications-index", () =>
  queryCollection("certifications").where("title", "==", "Certifications").first()
);

const pageDoc = computed(() => ({
  title: "Certifications",
  description: "Professional credentials and course completions.",
  icon: "solar:diploma-verified-linear",
  ...(doc.value || {}),
}));

const certificationItems = computed(() =>
  (certifications.value || []).filter((item) => item?.heading && item?.url)
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
