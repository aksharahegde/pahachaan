<template>
  <div class="space-y-4">
    <h3 class="font-bold md:text-lg text-gray-700 dark:text-gray-200">
      Projects
    </h3>
    <div class="space-y-4">
      <ProjectCard
        v-for="(project, id) in projects"
        :key="id"
        :project="project"
      />
    </div>
    <div class="flex items-center justify-end mt-4 text-sm">
      <UButton
        label="All Projects &rarr;"
        to="/projects"
        variant="link"
        color="black"
      />
    </div>
    <span class="hidden" v-for="color in colors" :key="color" />
  </div>
</template>

<script lang="ts" setup>
const { data: projects } = await useAsyncData("projects-home", () =>
  queryContent("/projects").limit(3).find()
);

const colors = [
  "bg-blue-100",
  "bg-gray-100",
  "bg-gray-800",
  "bg-purple-300",
  "bg-purple-950",
  "bg-amber-700",
  "bg-green-200",
  "bg-yellow-200",
  "bg-yellow-500",
  "bg-yellow-800",
  "bg-yellow-900",
  "bg-slate-300",
  "bg-slate-600",
  "bg-red-100",
  "bg-red-600",
  "bg-blue-100",
  "bg-pink-100",
  "bg-gradient-to-tr from-yellow-200 to-blue-200",
  "bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200"
];
</script>
