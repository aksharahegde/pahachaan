<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: false,
    default: () => [
      {
        name: "Github",
        icon: "i-simple-icons-github",
        url: "https://git.new/pahachaan",
      },
      {
        name: "LinkedIn",
        icon: "i-simple-icons-linkedin",
        url: "https://linkedin.com/in/aksharadt",
      },
      { name: "Twitter", icon: "i-simple-icons-twitter", url: "https://x.com/akshara_dev" },
      {
        name: "Email",
        icon: "i-simple-icons-minutemailer",
        url: "mailto:akshara.dt@gmail.com",
      },
      {
        name: "Cal.com",
        icon: "i-solar-calendar-date-bold",
        url: "https://cal.com/aksharahegde",
      },
      {
        name: "OSS PRs",
        icon: "i-solar-usb-bold",
        url: "https://oss-pr.pages.dev",
      },
    ],
  },
});
</script>

<template>
  <div class="flex flex-col max-w-xl">
    <h3 class="font-bold md:text-lg text-gray-700 dark:text-gray-200">
      Links
    </h3>
    <div class="flex flex-col space-y-3 py-2">
      <a
        v-for="item in items"
        :key="item.name"
        :href="item.url"
        target="_blank"
        rel="noopener"
        class="flex items-end justify-between w-full gap-2 group"
      >
        <span class="text-sm font-medium text-gray-800 dark:text-gray-200">
          {{ item.name }}
        </span>
        <span class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"/>
        <UIcon
          :name="item.icon"
          class="text-gray-700 dark:text-gray-300 w-6 h-6"
        />
      </a>
    </div>
  </div>
</template>
