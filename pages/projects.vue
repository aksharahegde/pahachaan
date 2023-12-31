<template>
  <main class="min-h-screen">
    <ContentDoc v-slot="{ doc }">
      <Header class="mb-4" :title="doc.title" :description="doc.description" />
      <ProjectStatusLegend :legend="STATUS_LEGEND" class="mb-2" />
      <div class="flex flex-col space-y-4">
        <ProjectCard
          v-for="(project, id) in projects"
          :key="id"
          :project="project"
        />
      </div>
    </ContentDoc>
  </main>
</template>

<script setup>
import { STATUS_LEGEND } from "~/constants";

const route = useRoute();
const config = useRuntimeConfig();

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").where({ title: { $ne: 'Projects' } }).find()
);

const { data: doc } = await useAsyncData("doc", () =>
  queryContent(route.path).findOne()
);

defineOgImageComponent("MyOg", {
  headline: config.public.ownerName,
  title: doc.value.title,
  description: doc.value.description,
  url: route.fullPath,
  icon: doc.value.icon
});
</script>
