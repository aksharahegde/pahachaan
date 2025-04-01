<!-- components/TableOfContents.vue -->
<template>
  <div
    class="max-w-3xl mx-auto p-4 bg-gray-100 mt-4 dark:bg-gray-950 rounded-lg"
    :class="[
      isPinned
        ? [
            'fixed top-20 right-4 z-50 w-72 shadow-lg',
            'max-h-[calc(100vh-7rem)]',
            'overflow-y-auto',
            'scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600',
            'scrollbar-track-transparent',
          ]
        : 'overflow-y-auto',
    ]"
    :style="{
      viewTransitionName: 'toc-container',
      containIntrinsicSize: 'auto',
      contain: 'layout',
    }"
  >
    <div
      class="flex items-center justify-between w-full gap-2 sticky top-0 bg-gray-100 dark:bg-gray-950 py-2 -mt-2 -mx-2 px-2 rounded-md"
    >
      <div class="flex items-center gap-2">
        <SharedPin
          v-if="isPinned"
          @click="handlePinToggle"
          class="cursor-pointer hover:text-primary-500 transition-colors"
          style="view-transition-name: pin-icon"
        />
        <SharedUnpin
          v-else
          @click="handlePinToggle"
          class="cursor-pointer hover:text-primary-500 transition-colors"
          style="view-transition-name: pin-icon"
        />
        <h1 class="text-lg mb-0" style="view-transition-name: toc-title">
          Table of Contents
        </h1>
      </div>
      <button
        @click="toggle()"
        :aria-expanded="isOpen"
        aria-controls="toc-content"
        class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
      >
        [ {{ isOpen ? "Hide" : "Show" }} ]
      </button>
    </div>

    <div
      class="overflow-hidden"
      :style="{
        height: isOpen ? `${contentHeight}px` : '0',
        transition: 'height 0.3s ease-in-out',
      }"
    >
      <ul ref="tocContent" id="toc-content" class="space-y-2 mt-4 pb-3">
        <li
          v-for="item in links"
          :key="item.id"
          :class="[
            item.depth === 2 ? 'text-base font-medium' : 'text-sm',
            item.depth === 3 ? 'ml-4' : '',
          ]"
        >
          <a
            :href="`#${item.id}`"
            class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:underline block py-1"
            @click="handleLinkClick"
          >
            {{ item.text }}
          </a>
          <ul
            v-if="item.children && item.children.length"
            class="mt-2 space-y-2"
          >
            <li
              v-for="child in item.children"
              :key="child.id"
              :class="['text-sm ml-4', child.depth === 3 ? 'ml-4' : '']"
            >
              <a
                :href="`#${child.id}`"
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:underline block py-1"
                @click="handleLinkClick"
              >
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useToggle, useLocalStorage } from "@vueuse/core";

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const [isOpen, toggle] = useToggle(true);
const isPinned = useLocalStorage("isPinned", false);
const tocContent = ref(null);
const contentHeight = ref(0);

const updateContentHeight = () => {
  nextTick(() => {
    if (tocContent.value) {
      contentHeight.value = tocContent.value.scrollHeight;
    }
  });
};

onMounted(() => updateContentHeight());

watch(() => props.links, updateContentHeight, { deep: true });

const handlePinToggle = () => {
  if (!document.startViewTransition) {
    isPinned.value = !isPinned.value;
    return;
  }

  document.startViewTransition(() => {
    isPinned.value = !isPinned.value;
  });
};

const handleLinkClick = () => {
  if (window.innerWidth < 768) {
    isOpen.value = false;
  }
};
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes slide-from-right {
  from {
    transform: translateX(100%);
  }
}

@keyframes slide-to-right {
  to {
    transform: translateX(100%);
  }
}

::view-transition-old(toc-container) {
  animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-right;
}

::view-transition-new(toc-container) {
  animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}

::view-transition-old(pin-icon),
::view-transition-new(pin-icon) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-group(toc-container) {
  isolation: auto;
}
</style>
