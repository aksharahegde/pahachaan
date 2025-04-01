<!-- components/TableOfContents.vue -->
<template>
  <div
    class="max-w-3xl mx-auto p-5 bg-gray-100 my-4 dark:bg-gray-950 rounded-lg overflow-y-auto"
    :class="{ 'fixed top-12 right-2 z-50': isPinned }"
    :style="{ 
      viewTransitionName: 'toc-container',
      containIntrinsicSize: 'auto',
      contain: 'layout'
    }"
  >
    <div class="flex items-center justify-between w-full gap-2">
      <div class="flex items-center gap-2">
        <SharedPin 
          v-if="isPinned" 
          @click="handlePinToggle" 
          class="cursor-pointer"
          style="view-transition-name: pin-icon"
        />
        <SharedUnpin 
          v-else 
          @click="handlePinToggle" 
          class="cursor-pointer"
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
      >
        [ {{ isOpen ? "Hide" : "Show" }} ]
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-y-95 opacity-0"
      enter-to-class="transform scale-y-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-y-100 opacity-100"
      leave-to-class="transform scale-y-95 opacity-0"
    >
      <ul v-show="isOpen" id="toc-content" class="space-y-2">
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
            class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
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
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
              >
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { useToggle, useLocalStorage } from "@vueuse/core";

defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const [isOpen, toggle] = useToggle();
const isPinned = useLocalStorage("isPinned", false);

const handlePinToggle = () => {
  // Check if View Transitions API is supported
  if (!document.startViewTransition) {
    isPinned.value = !isPinned.value;
    return;
  }

  // Use View Transitions API
  document.startViewTransition(() => {
    isPinned.value = !isPinned.value;
  });
};
</script>

<style>
@keyframes fade-in {
  from { opacity: 0; }
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes slide-from-right {
  from { transform: translateX(100%); }
}

@keyframes slide-to-right {
  to { transform: translateX(100%); }
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

/* Prevent flickering of the content */
::view-transition-group(toc-container) {
  isolation: auto;
}
</style>
