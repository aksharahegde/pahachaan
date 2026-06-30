<script setup lang="ts">
/**
 * @credits Nuxt SEO <https://nuxtseo.com/>
 */

import { computed, defineComponent, h, resolveComponent } from "vue";
import { useSiteConfig } from "#imports";

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
const displayTitle = computed(() => (props.title || "").slice(0, 90));
const displayDescription = computed(() => (props.description || "").slice(0, 180));

const runtimeConfig = useRuntimeConfig()["nuxt-og-image"];

const IconComponent = runtimeConfig.hasNuxtIcon
  ? resolveComponent("Icon")
  : defineComponent({
      render() {
        return h("div", "missing nuxt-icon");
      },
    });
</script>

<template>
  <div
    class="flex h-full w-full flex-col font-sans"
    :class="isLight ? 'bg-white text-[#09090b]' : 'bg-[#09090b] text-[#fafafa]'"
  >
    <div class="flex flex-1 flex-row px-[72px] pt-[72px]">
      <div class="flex flex-col pr-[48px]" style="width: 68%">
        <p
          v-if="headline"
          class="m-0 text-[20px] uppercase tracking-[0.18em]"
          :class="isLight ? 'text-[#71717a]' : 'text-[#a1a1aa]'"
        >
          {{ headline }}
        </p>
        <h1
          class="m-0 mt-[28px] text-[58px] leading-none tracking-[-0.06em]"
          style="font-family: Georgia, 'Times New Roman', serif"
        >
          {{ displayTitle }}
        </h1>
        <p
          v-if="description"
          class="m-0 mt-[32px] text-[30px] leading-snug"
          :class="isLight ? 'text-[#52525b]' : 'text-[#d4d4d8]'"
        >
          {{ displayDescription }}
        </p>
      </div>

      <div
        v-if="coverImage"
        class="flex items-start justify-end"
        style="width: 32%"
      >
        <img
          :src="coverImage"
          width="220"
          height="220"
          alt=""
          class="rounded-lg border grayscale"
          :class="isLight ? 'border-[#e4e4e7]' : 'border-[#3f3f46]'"
          style="object-fit: cover"
        >
      </div>

      <div
        v-else-if="icon"
        class="flex items-start justify-end"
        style="width: 32%"
      >
        <div
          class="flex size-[220px] items-center justify-center rounded-lg border"
          :class="isLight ? 'border-[#e4e4e7] bg-[#fafafa]' : 'border-[#3f3f46] bg-[#18181b]'"
        >
          <IconComponent
            :name="icon"
            size="96px"
            :class="isLight ? 'text-[#3f3f46]' : 'text-[#e4e4e7]'"
          />
        </div>
      </div>
    </div>

    <div
      class="flex items-center gap-[16px] border-t px-[72px] py-[36px]"
      :class="isLight ? 'border-[#e4e4e7]' : 'border-[#27272a]'"
    >
      <img :src="displaySiteLogo" width="36" height="36" alt="">
      <p
        class="m-0 text-[28px] tracking-tight"
        style="font-family: Georgia, 'Times New Roman', serif"
      >
        {{ displaySiteName === "Akshara Hegde" ? "akshara.dev" : displaySiteName }}
      </p>
    </div>
  </div>
</template>
