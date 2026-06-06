<template>
  <component
    :is="rootTag"
    ref="surfaceRef"
    class="liquid-glass-surface liquid-glass-surface--morph rounded-2xl p-5"
    :class="[
      draggable ? 'touch-none select-none cursor-grab active:cursor-grabbing' : '',
      className,
    ]"
    :style="[surfaceStyle, tiltStyle, draggableStyle]"
    :data-testid="testId"
    v-bind="rootAttrs"
  >
    <div class="relative z-10 flex flex-col gap-3">
      <div v-if="icon || title" class="flex items-start gap-3">
        <div
          v-if="icon"
          class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10"
          aria-hidden="true"
        >
          <UIcon :name="icon" class="size-5" />
        </div>
        <div class="min-w-0">
          <h3 v-if="title" class="text-base font-semibold tracking-tight">
            {{ title }}
          </h3>
          <p
            v-if="description"
            class="mt-1 text-sm leading-relaxed"
            :style="{ color: 'var(--lg-muted)' }"
          >
            {{ description }}
          </p>
        </div>
      </div>

      <slot />

      <div
        v-if="metricLabel && metricValue"
        class="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/5 px-3 py-2 text-sm dark:bg-white/5"
      >
        <span :style="{ color: 'var(--lg-muted)' }">{{ metricLabel }}</span>
        <span class="font-semibold tabular-nums">{{ metricValue }}</span>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { useDraggable } from "@vueuse/core";
import { LIQUID_GLASS_CANVAS_KEY, useLiquidGlassTilt } from "~/composables/useLiquidGlass";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    icon?: string;
    metricLabel?: string;
    metricValue?: string;
    draggable?: boolean;
    tilt?: boolean;
    testId?: string;
    className?: string;
    as?: "article" | "div";
    initialX?: number;
    initialY?: number;
  }>(),
  {
    draggable: false,
    tilt: true,
    as: "article",
    initialX: 0,
    initialY: 0,
  }
);

const surfaceRef = ref<HTMLElement | null>(null);
const rootTag = computed(() => props.as);
const canvasElement = inject<Ref<HTMLElement | null | undefined>>(
  LIQUID_GLASS_CANVAS_KEY,
  ref(null)
);

const rootAttrs = computed(() =>
  props.draggable
    ? { "aria-grabbed": isDragging.value ? "true" : "false" }
    : {}
);

const tiltEnabled = computed(() => props.tilt && !props.draggable);
const { tiltStyle } = useLiquidGlassTilt(surfaceRef, tiltEnabled);

const draggableEnabled = computed(() => props.draggable && import.meta.client);
const { style: draggableStyle, isDragging } = useDraggable(surfaceRef, {
  disabled: computed(() => !draggableEnabled.value),
  initialValue: { x: props.initialX, y: props.initialY },
  containerElement: canvasElement,
});

const surfaceStyle = computed(() => ({
  willChange: props.tilt || props.draggable ? "transform" : undefined,
}));
</script>
