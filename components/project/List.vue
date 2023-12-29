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
        color="gray"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: projects } = await useAsyncData("projects-home", () =>
  queryContent("/projects").limit(3).find()
);
</script>
