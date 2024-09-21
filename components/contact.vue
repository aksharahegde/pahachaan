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
      { name: "X", icon: "i-simple-icons-x", url: "https://x.com/akshara_dev" },
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
  <div class="flex flex-col">
    <h3 class="font-bold md:text-lg text-gray-700 dark:text-gray-200">
      Find me on
    </h3>
    <div class="flex gap-4 py-2">
      <UTooltip v-for="item in items" :key="item.name" :text="item.name">
        <a
          :href="item.url"
          target="_blank"
          rel="noopener"
          class="rounded-md text-gray-700 dark:bg-gray-900 dark:text-gray-300 transition-all duration-300 border border-gray-500 p-2 hover:text-primary-500 hover:border-primary-500 flex items-center justify-center"
        >
          <Icon :name="item.icon" class="w-5 h-5 md:w-4 md:h-4" />
        </a>
      </UTooltip>
    </div>
  </div>
</template>
