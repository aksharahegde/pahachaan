<template>
  <main class="min-h-screen">
    <Header
      class="mb-4"
      title="Live Visitors"
      description="A rotating visitors view powered by Cobe."
    />
    <canvas
      ref="canvasRef"
      data-testid="visitor-globe-view"
      class="w-full aspect-square max-w-[560px] mx-auto cursor-grab touch-none active:cursor-grabbing"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointercancel="handlePointerUp"
      @pointerleave="handlePointerUp"
    />
  </main>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type WatchStopHandle,
} from "vue";

import {
  toVisitorArcs,
  toVisitorMarkers,
  type GlobeArc,
  type GlobeMarker,
} from "~/utils/visitorGlobe";

type CanvasSize = {
  height: number;
  width: number;
};

type GlobeUpdate = Partial<CanvasSize & {
  arcs: GlobeArc[];
  markers: GlobeMarker[];
  phi: number;
}>;

type Globe = {
  destroy(): void;
  update(options: GlobeUpdate): void;
};

function getMapSamples(): number {
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const lowEndDevice =
    navigator.hardwareConcurrency !== undefined &&
    navigator.hardwareConcurrency <= 4;

  return coarsePointer || lowEndDevice ? 8000 : 16000;
}

function getCanvasSize(
  canvas: HTMLCanvasElement,
  ratio: number,
): CanvasSize {
  return {
    width: canvas.offsetWidth * ratio,
    height: canvas.offsetHeight * ratio,
  };
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { locations } = useAblyVisitors();
const markers = computed(() => toVisitorMarkers(locations.value));
const arcs = computed(() => toVisitorArcs(markers.value));
let globe: Globe | null = null;
let resizeObserver: ResizeObserver | null = null;
let visibilityObserver: IntersectionObserver | null = null;
let frameId: number | null = null;
let stopVisitorWatch: WatchStopHandle | null = null;
let phi = 0;
let isVisible = false;
let pointerStartX: number | null = null;
let rotationOffset = 0;
let targetRotationOffset = 0;

function handlePointerDown(event: PointerEvent) {
  pointerStartX = event.clientX - targetRotationOffset * 200;
  canvasRef.value?.setPointerCapture(event.pointerId);
}

function handlePointerMove(event: PointerEvent) {
  if (pointerStartX === null) {
    return;
  }

  targetRotationOffset = (event.clientX - pointerStartX) / 200;
}

function handlePointerUp(event: PointerEvent) {
  pointerStartX = null;

  if (canvasRef.value?.hasPointerCapture(event.pointerId)) {
    canvasRef.value.releasePointerCapture(event.pointerId);
  }
}

onMounted(async () => {
  if (!canvasRef.value) {
    return;
  }

  const { default: createGlobe } = await import("cobe");
  const canvas = canvasRef.value;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = getCanvasSize(canvas, ratio);

  globe = createGlobe(canvas, {
    devicePixelRatio: ratio,
    width,
    height,
    phi: 0,
    theta: 0.2,
    dark: 0,
    diffuse: 1.2,
    mapSamples: getMapSamples(),
    mapBrightness: 6,
    mapBaseBrightness: 0,
    baseColor: [1, 1, 1],
    markerColor: [0.2, 0.4, 1],
    glowColor: [1, 1, 1],
    markers: markers.value,
    arcs: arcs.value,
    arcColor: [0.3, 0.5, 1],
    arcWidth: 0.5,
    arcHeight: 0.25,
    markerElevation: 0.02,
    scale: 1,
    opacity: 1,
  });

  stopVisitorWatch = watch([markers, arcs], ([nextMarkers, nextArcs]) => {
    globe?.update({
      markers: nextMarkers,
      arcs: nextArcs,
    });
  });

  const animate = () => {
    if (!isVisible) {
      frameId = null;
      return;
    }

    phi += 0.005;
    rotationOffset += (targetRotationOffset - rotationOffset) * 0.12;
    globe?.update({ phi: phi + rotationOffset });
    frameId = window.requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (frameId === null) {
      frameId = window.requestAnimationFrame(animate);
    }
  };

  visibilityObserver = new IntersectionObserver(([entry]) => {
    isVisible = Boolean(entry?.isIntersecting);

    if (isVisible) {
      startAnimation();
    } else if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  });
  visibilityObserver.observe(canvas);

  resizeObserver = new ResizeObserver(() => {
    globe?.update(getCanvasSize(canvas, ratio));
  });
  resizeObserver.observe(canvas);
});

onBeforeUnmount(() => {
  if (frameId !== null) {
    window.cancelAnimationFrame(frameId);
  }
  resizeObserver?.disconnect();
  resizeObserver = null;
  visibilityObserver?.disconnect();
  visibilityObserver = null;
  isVisible = false;
  stopVisitorWatch?.();
  stopVisitorWatch = null;
  globe?.destroy();
  globe = null;
});
</script>
