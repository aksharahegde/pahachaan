<template>
  <ClientOnly>
    <div
      class="fixed bottom-[4rem] md:bottom-[1rem] md:right-[1rem] right-[1rem] p-1 bg-default rounded-full overflow-hidden z-10"
    >
      <NuxtLink
        to="/visitors"
        data-testid="visitor-count-open-visitors"
        :title="visitors ? `${visitors} viewers on website` : undefined"
        class="pl-2 pr-2 py-1 rounded-full flex flex-row items-center shadow tracking-none border text-xs transition-opacity border-green-800/80 dark:border-green-400/80 shadow-green-400/30 dark:shadow-green-800/30 opacity-60 hover:opacity-100 focus:opacity-100"
      >
        <span
          class="rounded-full inline-block h-2 w-2 motion-safe:animate-pulse shadow bg-green-800 dark:bg-green-400 dark:shadow-green-800"
          :class="{
            'bg-gray-800 dark:bg-gray-400': !isConnected && !isLoading,
          }"
        />
        <span
          class="ml-2 tabular-nums flex flex-row items-center gap-1 uppercase tracking-wider"
        >
          <template v-if="visitors !== null">{{ visitors }}</template>
          <template v-else>&nbsp;</template>
          <span v-if="visitors" class="sr-only">viewers on website</span>
        </span>
        &ZeroWidthSpace;
      </NuxtLink>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
const { visitors, isConnected, isLoading } = useAblyVisitors();
</script>
