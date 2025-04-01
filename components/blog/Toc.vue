<!-- components/TableOfContents.vue -->
<template>
  <div class="max-w-3xl mx-auto p-5 bg-gray-100 my-4 dark:bg-gray-950 rounded-lg overflow-y-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-lg mb-0">Table of Contents</h1>
      <button 
      @click="toggle()"
      :aria-expanded="isOpen"
      aria-controls="toc-content"
    >
      [ {{ isOpen ? 'Hide' : 'Show' }} ]
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
          <ul v-if="item.children && item.children.length" class="mt-2 space-y-2">
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
import { useToggle } from '@vueuse/core'

const [isOpen, toggle] = useToggle()

watch(isOpen, (newVal) => {
  console.log('isOpen', newVal)
})

defineProps({
  links: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.toc-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.toc-list {
  list-style: none;
  padding: 0;
}

.depth-2 {
  margin: 10px 0;
  font-size: 1.2em;
  font-weight: bold;
}

.depth-3 {
  margin: 5px 0 5px 20px;
  font-size: 1em;
}

a {
  text-decoration: none;
  color: #2c3e50;
}

a:hover {
  text-decoration: underline;
}
</style>
