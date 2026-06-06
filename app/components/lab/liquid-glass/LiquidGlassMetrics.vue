<template>
  <div
    class="liquid-glass-surface rounded-2xl p-4"
    aria-live="polite"
    data-testid="liquid-glass-metrics"
  >
    <p class="mb-3 text-sm font-medium">Performance</p>
    <dl class="grid grid-cols-2 gap-3 text-sm">
      <div>
        <dt class="liquid-glass-muted">FPS</dt>
        <dd class="font-semibold tabular-nums">{{ fps }}</dd>
      </div>
      <div>
        <dt class="liquid-glass-muted">Frame</dt>
        <dd class="font-semibold tabular-nums">{{ frameMs }}ms</dd>
      </div>
      <div>
        <dt class="liquid-glass-muted">Backdrop blur</dt>
        <dd class="font-semibold">
          {{ supportsBackdrop ? "Supported" : "Fallback" }}
        </dd>
      </div>
      <div>
        <dt class="liquid-glass-muted">Motion</dt>
        <dd class="font-semibold">
          {{ reducedMotion === "reduce" ? "Reduced" : "Full" }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { usePreferredReducedMotion } from "@vueuse/core";
import { useLiquidGlassMetrics } from "~/composables/useLiquidGlass";

const enabled = ref(false);

onMounted(() => {
  enabled.value = true;
});

onUnmounted(() => {
  enabled.value = false;
});

const { fps, frameMs, supportsBackdrop } = useLiquidGlassMetrics({ enabled });
const reducedMotion = usePreferredReducedMotion();
</script>
