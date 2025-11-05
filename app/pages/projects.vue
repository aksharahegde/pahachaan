<template>
  <main class="min-h-screen">
    <Header class="mb-4" :title="doc.title" :description="doc.description" />
    <ProjectStatusLegend :legend="STATUS_LEGEND" class="mb-4" />
    <div class="flex flex-col gap-4">
      <ProjectCard
        v-for="(project, id) in projects"
        :key="id"
        :project="project"
      />
    </div>
  </main>
</template>

<script setup>
import { STATUS_LEGEND } from "~/constants";

const route = useRoute();
const config = useRuntimeConfig();

const { data: projects } = await useAsyncData("projects-all", () =>
  queryCollection("projects").where("title", "<>", "Projects").all()
);

const { data: doc } = await useAsyncData(route.path, () => {
  return queryCollection("projects")
    .where("title", "==", "Projects")
    .order("status", "DESC")
    .first();
});

const { title, description, icon } = doc.value;
defineOgImageComponent("MyOg", {
  headline: config.public.ownerName,
  title,
  description,
  icon,
  url: route.fullPath,
});

useSeoMeta({
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
