<script setup lang="ts">
/**
 * @credits Nuxt SEO <https://nuxtseo.com/>
 */

import { computed } from "vue";

const props = defineProps({
  headline: { type: String, required: false },
  title: { type: String, required: false, default: "title" },
  description: { type: String, required: false },
  icon: { type: [String, Boolean], required: false },
  siteName: { type: String, required: false },
  siteLogo: { type: String, required: false },
  theme: { type: String, required: false, default: "#18181b" },
  coverImage: { type: String, required: false },
  colorMode: { type: String, required: false },
});

const resolvedColorMode = computed(() => props.colorMode || "light");
const isLight = computed(() => resolvedColorMode.value === "light");

const siteConfig = useSiteConfig();
const displaySiteName = computed(() => props.siteName || siteConfig.name || "akshara.dev");
const displaySiteLogo = computed(() => props.siteLogo || siteConfig.logo || "/logo.svg");
const displayTitle = computed(() => (props.title || "").slice(0, 80));
const displayDescription = computed(() => (props.description || "").slice(0, 200));
</script>

<template>
  <div class="flex h-full w-full font-sans">
    <div
      class="flex flex-col justify-between p-[72px]"
      :class="isLight ? 'bg-white text-[#09090b]' : 'bg-[#09090b] text-[#fafafa]'"
      style="width: 58%"
    >
      <div>
        <p
          v-if="headline"
          class="m-0 text-[20px] uppercase tracking-[0.18em]"
          :class="isLight ? 'text-[#71717a]' : 'text-[#a1a1aa]'"
        >
          {{ headline }}
        </p>
        <h1
          class="m-0 mt-[28px] text-[54px] leading-none tracking-[-0.06em]"
          style="font-family: Georgia, 'Times New Roman', serif"
        >
          {{ displayTitle }}
        </h1>
        <p
          v-if="description"
          class="m-0 mt-[32px] text-[28px] leading-snug"
          :class="isLight ? 'text-[#52525b]' : 'text-[#d4d4d8]'"
        >
          {{ displayDescription }}
        </p>
      </div>

      <div class="flex items-center gap-[16px]">
        <img :src="displaySiteLogo" width="36" height="36" alt="">
        <p
          class="m-0 text-[28px] tracking-tight"
          style="font-family: Georgia, 'Times New Roman', serif"
        >
          {{ displaySiteName === "Akshara Hegde" ? "akshara.dev" : displaySiteName }}
        </p>
      </div>
    </div>

    <div
      v-if="coverImage"
      class="relative flex-1 overflow-hidden"
    >
      <img
        :src="coverImage"
        alt=""
        class="h-full w-full grayscale"
        style="object-fit: cover"
      >
      <div
        class="absolute inset-0"
        :style="{
          background: isLight
            ? 'linear-gradient(to right, rgb(255 255 255) 0%, rgb(255 255 255 / 0.82) 18%, transparent 42%)'
            : 'linear-gradient(to right, rgb(9 9 11) 0%, rgb(9 9 11 / 0.82) 18%, transparent 42%)',
        }"
      />
    </div>

    <div
      v-else
      class="flex flex-1 items-center justify-center"
      :class="isLight ? 'bg-[#f4f4f5]' : 'bg-[#18181b]'"
    >
      <img :src="displaySiteLogo" width="120" height="120" alt="">
    </div>
  </div>
</template>
