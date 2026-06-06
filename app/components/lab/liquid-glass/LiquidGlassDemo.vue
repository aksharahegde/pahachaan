<template>
  <section
    class="liquid-glass-scene relative overflow-hidden rounded-2xl p-4 sm:p-6"
    :class="[sceneClass, backgroundClass]"
    :style="accentStyle"
    data-testid="liquid-glass-demo"
  >
    <div
      v-if="scene === 'aurora'"
      class="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div class="liquid-glass-aurora-blob liquid-glass-aurora-blob--one" />
      <div class="liquid-glass-aurora-blob liquid-glass-aurora-blob--two" />
      <div class="liquid-glass-aurora-blob liquid-glass-aurora-blob--three" />
    </div>

    <div class="relative flex flex-col gap-6">
      <div class="grid gap-4">
        <LabLiquidGlassThemeToggle />
        <LabLiquidGlassMetrics />
        <LabLiquidGlassAccentPicker />
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <LabLiquidGlassCard
          v-for="card in staticCards"
          :key="card.id"
          :title="card.title"
          :description="card.description"
          :icon="card.icon"
          :metric-label="card.metricLabel"
          :metric-value="card.metricValue"
          :test-id="`liquid-glass-card-${card.id}`"
        />
      </div>

      <div class="liquid-glass-panel relative overflow-hidden rounded-2xl p-4">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-base font-semibold">Interactive layer</h2>
            <p class="liquid-glass-muted text-sm">
              Drag cards around the canvas. Tilt and glow stay on the static grid above.
            </p>
          </div>
          <button
            type="button"
            class="liquid-glass-chrome-btn rounded-full px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lg-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            data-testid="liquid-glass-demo-reset"
            @click="resetDraggables"
          >
            Reset layout
          </button>
        </div>

        <div
          ref="canvasRef"
          class="liquid-glass-canvas relative h-[16rem] rounded-xl sm:h-[18rem]"
        >
          <LabLiquidGlassCard
            v-for="(card, index) in draggableCards"
            :key="`${card.id}-${layoutSeed}`"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            draggable
            :tilt="false"
            class-name="absolute w-[min(100%,14rem)]"
            :test-id="`liquid-glass-draggable-${card.id}`"
            :initial-x="initialPositions[index]?.x ?? 0"
            :initial-y="initialPositions[index]?.y ?? 0"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  LIQUID_GLASS_SCENE_KEY,
  LIQUID_GLASS_CANVAS_KEY,
  useLiquidGlassAccents,
  type LiquidGlassScene,
} from "~/composables/useLiquidGlass";

const scene = useState<LiquidGlassScene>("liquid-glass-scene", () => "dark");
provide(LIQUID_GLASS_SCENE_KEY, scene);

const canvasRef = ref<HTMLElement | null>(null);
provide(LIQUID_GLASS_CANVAS_KEY, canvasRef);

const { accentCss, accentGlow } = useLiquidGlassAccents();
const layoutSeed = ref(0);

const sceneClass = computed(() => {
  if (scene.value === "aurora") return "liquid-glass-scene--aurora";
  if (scene.value === "dark") return "liquid-glass-scene--dark";
  return "";
});

const backgroundClass = computed(() => {
  if (scene.value === "light") return "liquid-glass-scene-bg";
  if (scene.value === "aurora") return "liquid-glass-scene-bg--aurora";
  return "liquid-glass-scene-bg--dark";
});

const accentStyle = computed(() => ({
  "--lg-accent": accentCss.value,
  "--lg-glow": accentGlow.value,
}));

const staticCards = [
  {
    id: "blur",
    title: "Frosted surface",
    description: "Translucent panel with blur, sheen, and soft border highlights.",
    icon: "solar:mirror-left-outline",
    metricLabel: "Blur radius",
    metricValue: "18px",
  },
  {
    id: "tilt",
    title: "Tilt + glow",
    description: "Pointer-driven perspective with a radial glow that follows your cursor.",
    icon: "solar:stars-minimalistic-outline",
    metricLabel: "Interaction",
    metricValue: "Hover",
  },
  {
    id: "morph",
    title: "Morph hover",
    description: "Border radius eases on hover for a liquid, malleable glass feel.",
    icon: "solar:water-sun-outline",
    metricLabel: "Radius",
    metricValue: "1.75rem",
  },
  {
    id: "contrast",
    title: "Accessible contrast",
    description: "Scene tokens tune text and muted copy for readable glass overlays.",
    icon: "solar:eye-outline",
    metricLabel: "Scenes",
    metricValue: "3 modes",
  },
];

const draggableCards = [
  {
    id: "stack",
    title: "Draggable card",
    description: "Grab and reposition on the canvas.",
    icon: "solar:hand-stars-outline",
  },
  {
    id: "layer",
    title: "Layered glass",
    description: "Stack panels over vibrant gradients.",
    icon: "solar:layers-minimalistic-outline",
  },
  {
    id: "pulse",
    title: "Live metrics",
    description: "FPS and backdrop support update in real time.",
    icon: "solar:chart-2-outline",
  },
];

const initialPositions = [
  { x: 12, y: 16 },
  { x: 150, y: 40 },
  { x: 56, y: 132 },
];

function resetDraggables() {
  layoutSeed.value += 1;
}
</script>
