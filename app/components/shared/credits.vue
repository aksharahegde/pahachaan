<template>
  <section class="space-y-4 border-t border-zinc-200 pt-10 dark:border-zinc-800">
    <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
      This site uses,
    </h2>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      <a
        v-for="item in uses"
        :key="item.label"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center justify-center rounded-xl border border-zinc-200 p-4 transition hover:bg-white/40 dark:border-zinc-800 dark:hover:bg-white/5 md:justify-start"
      >
        <template v-if="item.iconDark">
          <img
            class="h-10 w-auto max-w-[8rem] opacity-90 transition duration-300 group-hover:scale-105 dark:hidden"
            :src="item.icon"
            :alt="item.label"
            loading="lazy"
            fetchpriority="low"
            width="128"
            height="40"
          >
          <img
            class="hidden h-10 w-auto max-w-[8rem] opacity-90 transition duration-300 group-hover:scale-105 dark:block dark:opacity-100"
            :src="item.iconDark"
            :alt="item.label"
            loading="lazy"
            fetchpriority="low"
            width="128"
            height="40"
          >
        </template>
        <img
          v-else
          class="h-10 w-auto max-w-[8rem] opacity-90 transition duration-300 group-hover:scale-105 dark:opacity-100"
          :class="item.class"
          :src="item.icon"
          :alt="item.label"
          loading="lazy"
          fetchpriority="low"
          width="128"
          height="40"
        >
      </a>
    </div>
  </section>
</template>

<script setup>
const uses = [
  {
    icon: "/credits/nuxt-white.svg",
    label: "NuxtJS",
    link: "https://nuxt.com/",
    class: "brightness-0 dark:brightness-100",
  },
  {
    icon: "/credits/tailwind-white.svg",
    label: "Tailwind CSS",
    link: "https://tailwindcss.com/",
    class: "brightness-0 dark:brightness-100",
  },
  {
    icon: "/credits/nuxt-content.svg",
    label: "Nuxt Content",
    link: "https://content.nuxt.com/",
    class: "brightness-0 dark:brightness-100",
  },
  {
    icon: "/credits/vercel-light.svg",
    label: "Vercel",
    link: "https://vercel.com/",
    class: "brightness-0 dark:brightness-100",
  },
  {
    icon: "/credits/openstatus.svg",
    label: "Openstatus",
    link: "https://www.openstatus.dev/",
    class: "brightness-0 dark:brightness-100",
  },
  {
    icon: "/credits/calcom.svg",
    label: "Cal.com",
    link: "https://cal.com/",
    class: "brightness-0 dark:brightness-100",
  },
  {
    icon: "/credits/dubco.svg",
    iconDark: "/credits/dubco-dark.svg",
    label: "dub.co",
    link: "https://dub.co/",
  },
];
</script>
