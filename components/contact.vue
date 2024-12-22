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
        name: "Linkedin",
        icon: "i-simple-icons-linkedin",
        url: "https://linkedin.com/in/aksharadt",
      },
      {
        name: "Peerlist",
        icon: "i-simple-icons-peerlist",
        url: "https://peerlist.io/akshara",
      },
      {
        name: "Twitter",
        icon: "i-simple-icons-twitter",
        url: "https://x.com/akshara_dev",
      },
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
        url: "https://prs.aksharahegde.xyz",
      },
    ],
  },
});
</script>

<template>
  <div class="flex flex-col max-w-xl">
    <h3 class="font-bold md:text-lg text-gray-700 dark:text-gray-200">Links</h3>
    <div class="flex flex-wrap gap-6 py-2">
      <a
        v-for="item in items"
        :key="item.name"
        :href="item.url"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-2 group"
      >
        <UIcon
          :name="item.icon"
          class="text-gray-700 dark:text-gray-300 w-6 h-6 transition-all duration-500 group-hover:scale-110"
        />
        <span
          class="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:underline"
        >
          {{ item.name }}
        </span>
      </a>
    </div>
  </div>
</template>
