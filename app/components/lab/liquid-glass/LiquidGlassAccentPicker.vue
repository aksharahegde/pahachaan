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
            ? 'border-white scale-110'
            : 'border-white/20 hover:scale-105'
        "
        :style="{ background: accentMap[item] }"
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
  useLiquidGlassAccents,
  type LiquidGlassAccent,
} from "~/composables/useLiquidGlass";

const { accent, accents } = useLiquidGlassAccents();

const accentMap: Record<LiquidGlassAccent, string> = {
  sky: "rgb(14 165 233)",
  violet: "rgb(139 92 246)",
  emerald: "rgb(16 185 129)",
  rose: "rgb(244 63 94)",
  amber: "rgb(245 158 11)",
};
</script>
