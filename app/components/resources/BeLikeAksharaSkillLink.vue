<script setup lang="ts">
const whatsInside = [
  "His default stack: Nuxt 4, Drizzle, Bun, Django, Rust TUIs",
  "Build-in-public rules from ThreatPkg and Django JET Calm",
  "Privacy-first AI patterns: local models, confidence gates",
  "Fiction craft for detective plots and literary tragedy",
  "Blog formula: problem, build, trade-offs, numbers",
  "X vs LinkedIn: two cuts of the same project",
  "Old-west video grammar: sepia grades, wanted-poster titles",
] as const;
</script>

<template>
  <UPopover
    mode="hover"
    :open-delay="180"
    :close-delay="120"
    :content="{ side: 'bottom', align: 'start', sideOffset: 10 }"
    :ui="{
      content:
        'skill-popover w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-zinc-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/95',
    }"
  >
    <a
      href="/be-like-akshara/SKILL.md"
      download="SKILL.md"
      data-testid="resource-be-like-akshara-link"
      class="inline-flex items-center gap-2 text-[12px] font-semibold text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
    >
      <span>Be Like Akshara</span>
      <span class="font-normal text-zinc-500 dark:text-zinc-400">
        — For builders and writers who want Akshara Hegde's taste on tap
      </span>
    </a>

    <template #content>
      <div class="space-y-3">
        <h3 class="text-[13px] font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
          Be Like Akshara Hegde: fullstack builds, open source, fiction drafts, and old-west video cuts in one brain.
        </h3>
        <p class="text-[12px] leading-5 text-zinc-600 dark:text-zinc-300">
          Use when building or debugging fullstack web work (Nuxt/Vue, Django/Python, Node/TS, Rust CLI/TUI), launching or maintaining open source projects and their READMEs/changelogs/"why I built this" posts, drafting detective or literary fiction, writing build-in-public X/LinkedIn posts, or editing videos in an old-west sepia style. Do not use for taxes, medical questions, or small talk with no build, write, or publish angle.
        </p>
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            Whats inside
          </p>
          <ul class="mt-2 space-y-1.5">
            <li
              v-for="item in whatsInside"
              :key="item"
              class="flex gap-2 text-[12px] leading-5 text-zinc-700 dark:text-zinc-300"
            >
              <span class="mt-[0.45rem] size-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<style scoped>
:deep(.skill-popover[data-state="open"]) {
  animation: skill-popover-in 220ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

:deep(.skill-popover[data-state="closed"]) {
  animation: skill-popover-out 160ms cubic-bezier(0.4, 0, 1, 1) both;
}

@keyframes skill-popover-in {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes skill-popover-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  to {
    opacity: 0;
    transform: translateY(4px) scale(0.98);
  }
}
</style>
