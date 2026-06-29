<template>
  <div
    class="liquid-glass-surface rounded-2xl p-4"
    role="group"
    aria-label="Accent color picker"
    data-testid="liquid-glass-accent-picker"
  >
    <p class="mb-3 text-sm font-medium">Accent inside glass</p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="item in accents"
        :key="item"
        type="button"
        class="size-9 rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        :class="
          accent === item
            ? 'scale-110 border-[var(--lg-accent)]'
            : 'border-[var(--lg-chrome-border)] hover:scale-105'
        "
        :style="{ background: LIQUID_GLASS_ACCENT_TOKENS[item].rgb }"
        :aria-pressed="accent === item"
        :aria-label="`${item} accent`"
        :data-testid="`liquid-glass-accent-${item}`"
        @click="accent = item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LIQUID_GLASS_ACCENT_TOKENS,
  useLiquidGlassAccents,
} from "~/composables/useLiquidGlass";

const { accent, accents } = useLiquidGlassAccents();
</script>
