<template>
  <section class="space-y-2 py-4 text-gray-600 dark:text-gray-300 text-sm">
    <div class="font-bold md:text-lg text-gray-600 dark:text-gray-200">
      This site uses,
    </div>
    <div
      class="grid grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-slate-800 dark:bg-transparent rounded-lg py-4"
    >
      <a
        :href="item.link"
        target="_blank"
        v-for="(item, index) in uses"
        :key="index"
        class="flex justify-center items-center p-4 md:justify-start group"
      >
        <img
          class="w-32 h-12 mx-auto group-hover:scale-110 transition-all duration-300"
          :src="item.icon"
          :alt="item.label"
          :class="item.class"
          :aria-label="`${item.label} website`"
          loading="lazy"
          width="128"
          height="128"
        />
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
  },
  {
    icon: "/credits/tailwind-white.svg",
    label: "Tailwind CSS",
    link: "https://tailwindcss.com/",
  },
  {
    icon: "/credits/nuxt-content.svg",
    label: "Nuxt Content",
    link: "https://content.nuxt.com/",
  },
  {
    icon: "/credits/vercel-light.svg",
    label: "Vercel",
    link: "https://vercel.com/",
  },
  {
    icon: "/credits/openstatus.svg",
    label: "Openstatus",
    link: "https://www.openstatus.dev/",
  },
  {
    icon: "/credits/calcom.svg",
    label: "Cal.com",
    link: "https://cal.com/",
  },
  {
    icon: "/credits/dubco.svg",
    label: "dub.co",
    link: "https://dub.co/",
    class: "invert",
  },
];
</script>
