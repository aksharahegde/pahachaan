<template>
  <main class="min-h-screen space-y-6">
    <div>
      <h1 class="text-2xl font-bold mb-1">Akshara Hegde</h1>
      <h2 class="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
        Full Stack Engineer and Opensource Contributor
      </h2>
      <p class="text-sm prose max-w-3xl dark:prose-invert my-0">
        I am a dedicated fullstack engineer based in Bengaluru, India. I love
        building things that make an impact using Nuxt and Python and afirm
        believer in the power of Open Source and have contributed to various
        projects.
      </p>
    </div>
    <Contact class="mt-2" />
    <div>
      <Announcement class="mt-2" />
    </div>
    <ProjectList class="mt-2" />
    <BlogRecent class="mt-2" />
  </main>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: seo } = await useAsyncData("seo", () =>
  queryCollection("content").where('title', '==', 'SEO').findOne()
);

const payload = {
  ...seo.value,
  url: config.public.baseUrl,
  siteName: config.public.ownerName,
};
defineOgImageComponent("MyOg", payload);

useSeoMeta({
  twitterTitle: seo.value.title,
  twitterDescription: seo.value.description,
})
</script>
