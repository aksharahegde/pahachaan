<template>
  <main
    data-testid="photos-page"
    class="min-h-screen pb-12"
  >
    <section class="pb-12 pt-6 md:pb-16 md:pt-8">
      <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
        Black & white archive
      </p>
      <h1 class="mt-3 font-serif text-3xl leading-none tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl md:text-4xl">
        Photos
      </h1>
      <p class="mt-4 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
        A grouped collection of monochrome frames, quiet scenes, and visual notes.
      </p>
      <p class="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        {{ totalPhotos }} photos / {{ photoGroups.length }} categories
      </p>
    </section>

    <nav
      v-if="photoGroups.length"
      aria-label="Photo categories"
      class="mb-10 flex flex-wrap gap-2"
    >
      <NuxtLink
        v-for="group in photoGroups"
        :key="group.slug"
        :to="`#${group.slug}`"
        class="rounded-full border border-zinc-200 px-3 py-1.5 text-[11px] font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white"
      >
        {{ group.title }}
      </NuxtLink>
    </nav>

    <section
      v-if="totalPhotos"
      class="space-y-16"
    >
      <section
        v-for="group in photoGroups"
        :id="group.slug"
        :key="group.slug"
        :data-testid="`photos-category-${group.slug}`"
        class="scroll-mt-28"
      >
        <div class="mb-5 grid grid-cols-[1fr_auto] items-end gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-800">
          <div>
            <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
              {{ group.title }}
            </h2>
            <p
              v-if="group.description"
              class="mt-2 max-w-xl text-[13px] leading-6 text-zinc-600 dark:text-zinc-400"
            >
              {{ group.description }}
            </p>
          </div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            {{ group.photos.length }} frames
          </p>
        </div>

        <div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <button
            v-for="photo in group.photos"
            :key="photo.src"
            type="button"
            data-testid="photos-photo-open"
            class="mb-4 block w-full break-inside-avoid border border-zinc-200 bg-zinc-50 p-2 text-left transition hover:-translate-y-0.5 hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-600"
            @click="openPhoto(photo)"
          >
            <div
              class="overflow-hidden bg-zinc-200 dark:bg-zinc-900"
              :style="{ aspectRatio: photo.aspect || '4 / 5' }"
            >
              <img
                :src="photo.src"
                :alt="photo.alt"
                loading="lazy"
                class="size-full object-cover grayscale transition duration-500 hover:contrast-125"
                :class="{ 'opacity-0': isGridPhotoHidden(photo) }"
                :style="getGridPhotoStyle(photo)"
              >
            </div>
            <span class="mt-3 flex items-start justify-between gap-4 text-[11px] leading-5">
              <span class="font-medium text-zinc-800 dark:text-zinc-200">{{ photo.title }}</span>
              <span
                v-if="getPhotoMeta(photo)"
                class="shrink-0 text-right text-zinc-500 dark:text-zinc-400"
              >
                {{ getPhotoMeta(photo) }}
              </span>
            </span>
          </button>
        </div>
      </section>
    </section>

    <section
      v-else
      class="border-t border-zinc-200 py-10 dark:border-zinc-800"
    >
      <h2 class="font-serif text-2xl tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
        Photos coming soon
      </h2>
    </section>

    <Teleport to="body">
      <Transition :name="useLightboxTransition ? 'photo-lightbox' : ''">
        <div
          v-if="selectedPhoto"
          data-testid="photos-lightbox"
          class="photo-lightbox fixed inset-0 z-[100] grid place-items-center bg-zinc-950/90 p-4 backdrop-blur-sm"
          @click.self="closePhoto"
        >
          <button
            type="button"
            data-testid="photos-lightbox-close"
            aria-label="Minimize photo"
            class="absolute right-4 top-4 rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            @click="closePhoto"
          >
            Minimize
          </button>

          <figure class="photo-lightbox-figure w-full max-w-5xl">
            <img
              :src="selectedPhoto.src"
              :alt="selectedPhoto.alt"
              class="photo-lightbox-image max-h-[82vh] w-full object-contain grayscale"
              :style="getSelectedPhotoStyle(selectedPhoto)"
            >
            <figcaption class="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px] text-white/80">
              <span class="font-medium text-white">{{ selectedPhoto.title }}</span>
              <span v-if="getPhotoMeta(selectedPhoto)">{{ getPhotoMeta(selectedPhoto) }}</span>
            </figcaption>
          </figure>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const selectedPhoto = ref(null);
const supportsViewTransition = ref(false);
const useLightboxTransition = computed(() => !supportsViewTransition.value);

const { data: photos } = await useAsyncData("photos-list", () =>
  queryCollection("photos").all()
);

const photoGroups = computed(() =>
  [...(photos.value || [])]
    .map((group) => ({
      ...group,
      photos: [...(group.photos || [])].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))),
    }))
    .filter((group) => group.photos.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title))
);

const totalPhotos = computed(() =>
  photoGroups.value.reduce((total, group) => total + group.photos.length, 0)
);

const getPhotoMeta = (photo) =>
  [photo.location, photo.year].filter(Boolean).join(" / ");

const getPhotoId = (photo) =>
  String(photo.slug || photo.title || photo.src)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getPhotoTransitionName = (photo) => `photo-${getPhotoId(photo)}`;

const withViewTransition = (callback) => {
  if (supportsViewTransition.value) {
    return document.startViewTransition(callback);
  }

  callback();
  return Promise.resolve();
};

const openPhoto = (photo) => {
  withViewTransition(() => {
    selectedPhoto.value = photo;
  });
};

const closePhoto = () => {
  withViewTransition(() => {
    selectedPhoto.value = null;
  });
};

const isGridPhotoHidden = (photo) => selectedPhoto.value?.src === photo.src;

const getGridPhotoStyle = (photo) => ({
  viewTransitionName: getPhotoTransitionName(photo),
});

const getSelectedPhotoStyle = (photo) => ({
  viewTransitionName: getPhotoTransitionName(photo),
});

const handlePhotoKeydown = (event) => {
  if (event.key === "Escape" && selectedPhoto.value) {
    closePhoto();
  }
};

onMounted(() => {
  supportsViewTransition.value = typeof document.startViewTransition === "function";
  window.addEventListener("keydown", handlePhotoKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handlePhotoKeydown);
});

defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title: "Photos",
  description: "Black-and-white photo collections grouped by category.",
  icon: "solar:gallery-wide-linear",
  url: route.fullPath,
});

useSeoMeta({
  title: "Photos",
  description: "Black-and-white photo collections grouped by category.",
  ogTitle: "Photos",
  ogDescription: "Black-and-white photo collections grouped by category.",
  twitterTitle: "Photos",
  twitterDescription: "Black-and-white photo collections grouped by category.",
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>

<style scoped>
.photo-lightbox-enter-active,
.photo-lightbox-leave-active {
  transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.photo-lightbox-enter-active .photo-lightbox-figure,
.photo-lightbox-leave-active .photo-lightbox-figure {
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.photo-lightbox-enter-from,
.photo-lightbox-leave-to {
  opacity: 0;
}

.photo-lightbox-enter-from .photo-lightbox-figure,
.photo-lightbox-leave-to .photo-lightbox-figure {
  transform: scale(0.94);
  opacity: 0;
}
</style>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

::view-transition-group(*) {
  animation-duration: 0.45s;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

::view-transition-old(*),
::view-transition-new(*) {
  animation-duration: 0.45s;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
