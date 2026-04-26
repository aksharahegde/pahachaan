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
      class="w-full aspect-square max-w-[560px] mx-auto"
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

type GlobeUpdate = Partial<{
  arcs: GlobeArc[];
  markers: GlobeMarker[];
  phi: number;
} & CanvasSize>;

type Globe = {
  destroy(): void;
  update(options: GlobeUpdate): void;
};

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
const { locations } = useVisitors();
const markers = computed(() => toVisitorMarkers(locations.value));
const arcs = computed(() => toVisitorArcs(markers.value));
let globe: Globe | null = null;
let resizeObserver: ResizeObserver | null = null;
let frameId: number | null = null;
let stopVisitorWatch: WatchStopHandle | null = null;
let phi = 0;

onMounted(async () => {
  if (!canvasRef.value) return;

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
    mapSamples: 16000,
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
    phi += 0.005;
    globe?.update({ phi });
    frameId = window.requestAnimationFrame(animate);
  };
  animate();

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
  stopVisitorWatch?.();
  stopVisitorWatch = null;
  globe?.destroy();
  globe = null;
});
</script>
