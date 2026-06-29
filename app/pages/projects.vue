<template>
  <main class="page-main">
    <section>
      <Header class="mb-8" :title="doc.title" :description="doc.description" />
      <ProjectStatusLegend :legend="STATUS_LEGEND" class="mb-6" />
      <div class="page-section">
        <ProjectCard
          v-for="(project, id) in projects"
          :key="id"
          :project="project"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { STATUS_LEGEND } from "~/constants";

const route = useRoute();
const config = useRuntimeConfig();

const { data: projects } = await useAsyncData("projects-all", () =>
  queryCollection("projects").where("title", "<>", "Projects").order("stem", "ASC").all()
);

const { data: doc } = await useAsyncData(route.path, () => {
  return queryCollection("projects")
    .where("title", "==", "Projects")
    .order("status", "DESC")
    .first();
});

const { title, description, icon } = doc.value;
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
