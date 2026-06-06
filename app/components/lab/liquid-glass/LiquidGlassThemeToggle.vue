<template>
  <div
    class="liquid-glass-surface rounded-2xl p-4"
    role="group"
    aria-label="Liquid glass scene modes"
    data-testid="liquid-glass-theme-toggle"
  >
    <p class="mb-1 text-sm font-medium">Demo scene</p>
    <p class="mb-3 text-xs" :style="{ color: 'var(--lg-muted)' }">
      Changes this lab preview only, not the site theme in the navbar.
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="mode in modes"
        :key="mode.value"
        type="button"
        class="rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        :class="
          scene === mode.value
            ? 'border-[var(--lg-accent)] bg-[var(--lg-accent)]/15 text-[var(--lg-text)]'
            : 'border-white/15 bg-white/5 hover:bg-white/10'
        "
        :aria-pressed="scene === mode.value"
        :data-testid="`liquid-glass-theme-${mode.value}`"
        @click="scene = mode.value"
      >
        {{ mode.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useLiquidGlassScene,
  type LiquidGlassScene,
} from "~/composables/useLiquidGlass";

const scene = useLiquidGlassScene();

const modes: { value: LiquidGlassScene; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "aurora", label: "Aurora" },
];
</script>
