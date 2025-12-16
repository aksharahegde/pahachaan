<template>
  <div
    class="mt-6 py-4 border-t-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 only-print"
  >
    <div class="flex flex-col items-start gap-4">
      <div class="flex-1">
        <p class="text-base text-gray-700 dark:text-gray-300 mb-1">
          Thank you
          <span class="font-semibold text-gray-900 dark:text-gray-100">
            {{ config.public.ownerName }}
          </span>
        </p>
      </div>
      <div class="flex flex-col items-start gap-2">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          To read the full article, click the link below.
        </p>
        <a
          :href="articleUrl"
          target="_blank"
          class="text-sm text-gray-500 dark:text-gray-400 underline"
        >
          {{ articleUrl }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toast = useToast();
const config = useRuntimeConfig();
const props = defineProps<{
  articleUrl: string;
}>();

function copyArticleLink(event: Event) {
  event.preventDefault();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(props.articleUrl || "").then(() => {
      toast.add({
        title: "Link copied!",
        description: "Article link has been copied to clipboard",
        color: "success",
      });
    });
  }
}
</script>
