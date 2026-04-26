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
import { onBeforeUnmount, onMounted, ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let globe: { destroy: () => void } | null = null;
let resizeObserver: ResizeObserver | null = null;
let frameId: number | null = null;
let phi = 0;

onMounted(async () => {
  if (!canvasRef.value) return;

  const { default: createGlobe } = await import("cobe");
  const canvas = canvasRef.value;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  globe = createGlobe(canvas, {
    devicePixelRatio: ratio,
    width: canvas.offsetWidth * ratio,
    height: canvas.offsetHeight * ratio,
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
    markers: [
      { location: [12.97, 77.59], size: 0.04, id: "blr" },
      { location: [51.5, -0.12], size: 0.03, id: "ldn" },
      { location: [40.71, -74], size: 0.03, id: "nyc" },
      { location: [35.67, 139.65], size: 0.03, id: "tokyo" },
    ],
    arcs: [
      { from: [12.97, 77.59], to: [40.71, -74] },
      { from: [40.71, -74], to: [51.5, -0.12] },
      { from: [12.97, 77.59], to: [35.67, 139.65] },
    ],
    arcColor: [0.3, 0.5, 1],
    arcWidth: 0.5,
    arcHeight: 0.25,
    markerElevation: 0.02,
    scale: 1,
    opacity: 1,
  });

  const animate = () => {
    phi += 0.005;
    globe?.update({ phi });
    frameId = window.requestAnimationFrame(animate);
  };
  animate();

  resizeObserver = new ResizeObserver(() => {
    const nextWidth = canvas.offsetWidth * ratio;
    const nextHeight = canvas.offsetHeight * ratio;
    globe?.update({ width: nextWidth, height: nextHeight });
  });
  resizeObserver.observe(canvas);
});

onBeforeUnmount(() => {
  if (frameId !== null) {
    window.cancelAnimationFrame(frameId);
  }
  resizeObserver?.disconnect();
  resizeObserver = null;
  globe?.destroy();
  globe = null;
});
</script>
