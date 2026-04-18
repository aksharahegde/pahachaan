<template>
  <ClientOnly>
    <div
      class="fixed w-full z-50"
      :class="isMobile ? 'bottom-0' : 'top-0 left-1/2 -translate-x-1/2'"
    >
      <nav class="mx-auto px-2 sm:px-6 lg:px-8 max-w-2xl">
        <ul
          class="flex items-center justify-between md:my-4 px-3 text-sm font-medium text-gray-800 shadow shadow-gray-800/5 bg-white dark:bg-gray-900 dark:text-gray-200"
        >
          <li v-for="item in items" :key="item.path">
            <UTooltip
              :text="item.name"
              :ui="{ popper: { strategy: 'absolute' } }"
            >
              <ULink
                :to="item.path"
                class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
                active-class="text-primary-600 dark:text-primary-400"
              >
                <UIcon
                  :name="item.icon"
                  aria-hidden="true"
                  class="w-7 h-7 md:w-5 md:h-5 z-10"
                />
                <span
                  v-if="$route.path === item.path"
                  class="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-primary-500/0 via-primary-500/70 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0"
                />
                <span
                  v-if="$route.path === item.path"
                  class="absolute h-8 w-8 z-0 rounded-full bg-gray-100 dark:bg-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
                <span class="sr-only">{{ item.name }}</span>
              </ULink>
            </UTooltip>
          </li>
          <li class="flex-1 hidden md:flex"></li>
          <li class="hidden md:flex">
            <SharedThemePicker />
          </li>
        </ul>
      </nav>
    </div>
  </ClientOnly>
</template>
<script setup>
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 475);

const items = [
  { name: "Home", path: "/", icon: "solar:home-angle-2-outline" },
  {
    name: "Projects",
    path: "/projects",
    icon: "solar:folder-with-files-outline",
  },
  {
    name: "Shop",
    path: "/shop",
    icon: "solar:shop-2-outline",
  },
  {
    name: "Blog",
    path: "/blog",
    icon: "solar:document-add-outline",
  },
  {
    name: "Uses",
    path: "/uses",
    icon: "solar:monitor-smartphone-outline",
  },
  {
    name: "Resources",
    path: "/resources",
    icon: "solar:bookmark-linear",
  },
];
</script>
