<template>
  <main class="min-h-screen">
    <Header class="mb-4" title="Projects" description="I love to build stuff. Here are some of my projects."/>
    <ProjectStatusLegend :legend="STATUS_LEGEND" class="mb-2" />
    <div class="space-y-4">
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

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find()
);
</script>
