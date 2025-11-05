<template>
  <main class="min-h-screen">
    <Header class="mb-4" :title="doc.title" :description="doc.description" />
    <div class="flex flex-col gap-4">
      <ProductCard
        v-for="(product, id) in products"
        :key="id"
        :product="product"
      />
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: products } = await useAsyncData("shop-all", () =>
  queryCollection("shop").where("title", "<>", "Shop").all()
);

const { data: doc } = await useAsyncData("shop-index", () =>
  queryCollection("shop").where("title", "==", "Shop").first()
);

const { title, description, icon } = doc.value;
defineOgImageComponent("MyOg", {
  headline: config.public.ownerName,
  title,
  description,
  icon,
  url: route.fullPath,
});

useSeoMeta({
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
