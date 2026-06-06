import {
  usePreferredReducedMotion,
  useRafFn,
  useMouseInElement,
} from "@vueuse/core";
import type { MaybeRef } from "vue";
import { toRef } from "vue";

export type LiquidGlassScene = "light" | "dark" | "aurora";

export const LIQUID_GLASS_SCENE_KEY = Symbol("liquid-glass-scene");
export const LIQUID_GLASS_CANVAS_KEY = Symbol("liquid-glass-canvas");

export const LIQUID_GLASS_ACCENT_TOKENS = {
  sky: { rgb: "rgb(14 165 233)", glow: "rgb(14 165 233 / 0.45)" },
  violet: { rgb: "rgb(139 92 246)", glow: "rgb(139 92 246 / 0.45)" },
  emerald: { rgb: "rgb(16 185 129)", glow: "rgb(16 185 129 / 0.45)" },
  rose: { rgb: "rgb(244 63 94)", glow: "rgb(244 63 94 / 0.45)" },
  amber: { rgb: "rgb(245 158 11)", glow: "rgb(245 158 11 / 0.45)" },
} as const;

export type LiquidGlassAccent = keyof typeof LIQUID_GLASS_ACCENT_TOKENS;

export const LIQUID_GLASS_ACCENTS = Object.keys(
  LIQUID_GLASS_ACCENT_TOKENS
) as LiquidGlassAccent[];

export function useLiquidGlassScene() {
  return inject(
    LIQUID_GLASS_SCENE_KEY,
    () => useState<LiquidGlassScene>("liquid-glass-scene", () => "dark"),
    true
  );
}

export function useLiquidGlassMetrics(options?: {
  enabled?: MaybeRef<boolean>;
}) {
  const enabled = toRef(options?.enabled ?? true);
  const fps = ref(60);
  const frameMs = ref(16.7);
  const frames = ref(0);
  const lastTime = ref(0);

  const supportsBackdrop = computed(
    () =>
      import.meta.client && CSS.supports("backdrop-filter", "blur(1px)")
  );

  if (import.meta.client) {
    const { pause, resume } = useRafFn(
      ({ delta }) => {
        if (!enabled.value) return;

        frames.value += 1;
        frameMs.value = Math.round(delta * 10) / 10;
        const now = performance.now();
        if (now - lastTime.value >= 1000) {
          fps.value = frames.value;
          frames.value = 0;
          lastTime.value = now;
        }
      },
      { immediate: false }
    );

    watch(
      enabled,
      (active) => {
        if (active) resume();
        else pause();
      },
      { immediate: true }
    );
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

    const rotateX = (elementY.value / elementHeight.value - 0.5) * -12;
    const rotateY = (elementX.value / elementWidth.value - 0.5) * 12;

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

  const accentCss = computed(
    () => LIQUID_GLASS_ACCENT_TOKENS[accent.value].rgb
  );

  const accentGlow = computed(
    () => LIQUID_GLASS_ACCENT_TOKENS[accent.value].glow
  );

  return {
    accent,
    accentCss,
    accentGlow,
    accents: LIQUID_GLASS_ACCENTS,
  };
}
