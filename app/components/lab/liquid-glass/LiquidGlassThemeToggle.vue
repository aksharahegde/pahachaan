<template>
  <div
    class="liquid-glass-surface rounded-2xl p-4"
    role="group"
    aria-label="Liquid glass scene modes"
    data-testid="liquid-glass-theme-toggle"
  >
    <p class="mb-1 text-sm font-medium">Demo scene</p>
    <p class="liquid-glass-muted mb-3 text-xs">
      Changes this lab preview only, not the site theme in the navbar.
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="mode in modes"
        :key="mode.value"
        type="button"
        class="rounded-full px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lg-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        :class="
          scene === mode.value
            ? 'liquid-glass-chrome-btn liquid-glass-chrome-btn--active'
            : 'liquid-glass-chrome-btn'
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
