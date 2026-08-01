<template>
  <nav
    aria-label="Mobile navigation"
    class="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200/70 bg-white/90 backdrop-blur md:hidden dark:border-zinc-800 dark:bg-zinc-950/90"
  >
    <ul class="flex items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
      <li
        v-for="item in primaryMobileNav"
        :key="item.to"
        class="flex min-w-0 flex-1"
      >
        <NuxtLink
          :to="item.to"
          :data-testid="item.testId"
          class="flex min-h-11 w-full flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium transition"
          :class="
            isNavItemActive(route.path, item.to)
              ? 'text-zinc-950 dark:text-white'
              : 'text-zinc-500 dark:text-zinc-400'
          "
        >
          <UIcon :name="item.icon" class="size-5" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </li>

      <li class="flex min-w-0 flex-1">
        <button
          type="button"
          data-testid="portfolio-bottom-nav-more-trigger"
          class="flex min-h-11 w-full flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium transition"
          :class="
            isMoreOpen || isMoreNavActive(route.path)
              ? 'text-zinc-950 dark:text-white'
              : 'text-zinc-500 dark:text-zinc-400'
          "
          @click="isMoreOpen = true"
        >
          <UIcon name="i-solar-menu-dots-linear" class="size-5" />
          <span>More</span>
        </button>
      </li>
    </ul>

    <ClientOnly>
      <UDrawer
        v-model:open="isMoreOpen"
        :handle="true"
        :should-scale-background="false"
        :ui="moreDrawerUi"
      >
        <template #body>
          <p class="mb-3 text-sm font-semibold text-zinc-950 dark:text-white">
            More
          </p>
          <ul class="flex flex-col gap-1">
            <li v-for="item in moreMobileNav" :key="item.to">
              <NuxtLink
                :to="item.to"
                :data-testid="item.testId"
                class="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                :class="
                  isNavItemActive(route.path, item.to)
                    ? 'text-zinc-950 dark:text-white'
                    : 'text-zinc-700 dark:text-zinc-300'
                "
                @click="isMoreOpen = false"
              >
                <UIcon :name="item.icon" class="size-5 shrink-0" />
                <span>{{ item.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </template>
      </UDrawer>
    </ClientOnly>
  </nav>
</template>

<script setup lang="ts">
import {
  isMoreNavActive,
  isNavItemActive,
  moreMobileNav,
  primaryMobileNav,
} from "~/constants/siteNav";

const route = useRoute();
const isMoreOpen = ref(false);

const moreDrawerUi = {
  overlay: "bg-zinc-950/50",
  content:
    "bg-white dark:bg-zinc-950 border-t border-zinc-200/70 dark:border-zinc-800 ring-0 focus:outline-none",
  handle: "!bg-zinc-300 dark:!bg-zinc-600",
  container: "p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]",
  body: "px-1",
};

watch(
  () => route.path,
  () => {
    isMoreOpen.value = false;
  },
);
</script>
