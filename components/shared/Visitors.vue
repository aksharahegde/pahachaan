<template>
  <ClientOnly>
    <div
      class="fixed bottom-[1rem] right-[1rem] p-1 rounded-full overflow-hidden z-10"
    >
      <UTooltip :text="`${visitors} viewers on website`">
        <div
          class="flex items-center gap-1 bg-white shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl px-2"
        >
          <span
            class="rounded-full inline-block h-2 w-2 animate-pulse shadow"
            :class="{
              'bg-green-800 dark:bg-green-400': isConnected,
              'bg-gray-800 dark:bg-gray-400': !isConnected,
              'animate-pulse': isLoading,
              'animate-none': !isLoading,
            }"
          />
          <span
            class="ml-2 tabular-nums flex flex-row items-center gap-1 uppercase tracking-wider"
            >{{ visitors }}
            <span class="sr-only">viewers on website</span></span
          >
        </div>
      </UTooltip>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
const { visitors, isConnected, isLoading, error } = useVisitors();
</script>
