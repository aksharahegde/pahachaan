<template>
  <main class="min-h-screen">
    <ContentDoc v-slot="{ doc }">
      <Header class="mb-4" :title="doc.title" :description="doc.description" />
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </main>
</template>
