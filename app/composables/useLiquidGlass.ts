import {
  usePreferredReducedMotion,
  useRafFn,
  useMouseInElement,
} from "@vueuse/core";

export type LiquidGlassScene = "light" | "dark" | "aurora";

export const LIQUID_GLASS_SCENE_KEY = Symbol("liquid-glass-scene");
export const LIQUID_GLASS_CANVAS_KEY = Symbol("liquid-glass-canvas");

const ACCENTS = ["sky", "violet", "emerald", "rose", "amber"] as const;
export type LiquidGlassAccent = (typeof ACCENTS)[number];

export function useLiquidGlassScene() {
  return inject(
    LIQUID_GLASS_SCENE_KEY,
    () => useState<LiquidGlassScene>("liquid-glass-scene", () => "dark"),
    true
  );
}

export function useLiquidGlassMetrics() {
  const fps = ref(60);
  const frameMs = ref(16.7);
  const frames = ref(0);
  const lastTime = ref(0);

  const supportsBackdrop = computed(
    () =>
      import.meta.client &&
      CSS.supports("backdrop-filter", "blur(1px)")
  );

  if (import.meta.client) {
    useRafFn(({ delta }) => {
      frames.value += 1;
      frameMs.value = Math.round(delta * 10) / 10;
      const now = performance.now();
      if (now - lastTime.value >= 1000) {
        fps.value = frames.value;
        frames.value = 0;
        lastTime.value = now;
      }
    });
  }

  return { fps, frameMs, supportsBackdrop };
}

export function useLiquidGlassTilt(
  target: Ref<HTMLElement | null | undefined>,
  enabled: Ref<boolean> | boolean = true
) {
  const reducedMotion = usePreferredReducedMotion();
  const { elementX, elementY, elementWidth, elementHeight, isOutside } =
    useMouseInElement(target);

  const tiltStyle = computed(() => {
    const active = typeof enabled === "boolean" ? enabled : enabled.value;
    if (
      !active ||
      reducedMotion.value === "reduce" ||
      isOutside.value ||
      !elementWidth.value ||
      !elementHeight.value
    ) {
      return {};
    }

    const rotateX =
      (elementY.value / elementHeight.value - 0.5) * -12;
    const rotateY =
      (elementX.value / elementWidth.value - 0.5) * 12;

    return {
      transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      "--lg-spot-x": `${((elementX.value / elementWidth.value) * 100).toFixed(1)}%`,
      "--lg-spot-y": `${((elementY.value / elementHeight.value) * 100).toFixed(1)}%`,
    };
  });

  return { tiltStyle, reducedMotion };
}

export function useLiquidGlassAccents() {
  const accent = useState<LiquidGlassAccent>(
    "liquid-glass-accent",
    () => "sky"
  );

  const accentCss = computed(() => {
    const map: Record<LiquidGlassAccent, string> = {
      sky: "rgb(14 165 233)",
      violet: "rgb(139 92 246)",
      emerald: "rgb(16 185 129)",
      rose: "rgb(244 63 94)",
      amber: "rgb(245 158 11)",
    };
    return map[accent.value];
  });

  return { accent, accentCss, accents: ACCENTS };
}
