<template>
  <div v-if="isMermaid" class="mermaid-diagram not-prose my-6">
    <div v-if="!svgContent" class="flex items-center justify-center py-8 text-gray-400">
      Loading diagram...
    </div>
    <!-- mermaid.render() produces sanitized SVG output (securityLevel configured) -->
    <div v-html="svgContent" />
  </div>
  <code v-else-if="isInline" :class="$attrs.class"><slot /></code>
  <pre
    v-else
    :class="$attrs.class"
  ><slot /></pre>
</template>

<script setup>
import { ref, computed, onMounted, useId } from "#imports";

const props = defineProps({
  code: { type: String, default: "" },
  language: { type: String, default: "" },
  filename: { type: String, default: "" },
  highlights: { type: Array, default: () => [] },
  meta: { type: String, default: "" },
});

const isInline = computed(() => !props.language && !props.filename);
const isMermaid = computed(() => props.language === "mermaid");
const svgContent = ref("");

onMounted(async () => {
  if (!isMermaid.value) return;

  const mermaid = (await import("mermaid")).default;

  mermaid.initialize({
    startOnLoad: false,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
  });

  const id = `mermaid-${useId()}`;
  const { svg } = await mermaid.render(id, props.code);
  svgContent.value = svg;
});
</script>

<style>
@reference "~/assets/css/main.css";

.mermaid-diagram {
  @apply flex justify-center overflow-x-auto;
}

.mermaid-diagram svg {
  @apply max-w-full h-auto;
}
</style>
