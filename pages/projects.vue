<template>
  <main class="min-h-screen">
    <LazyContentDoc v-slot="{ doc }">
      <Header class="mb-4" :title="doc.title" :description="doc.description" />
      <ProjectStatusLegend :legend="STATUS_LEGEND" class="mb-2" />
      <div class="flex flex-col space-y-4">
        <ProjectCard
          v-for="(project, id) in projects"
          :key="id"
          :project="project"
        />
      </div>
    </LazyContentDoc>
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

const { title, description, icon } = doc.value;
defineOgImageComponent("MyOg", {
  headline: config.public.ownerName,
  title,
  description,
  icon,
  url: route.fullPath
});

useSeoMeta({
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
})
</script>
