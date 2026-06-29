<template>
  <main class="page-main">
    <section>
      <Header class="mb-8" :title="doc.title" :description="doc.description" />
      <div class="page-section">
        <ProductCard
          v-for="(product, id) in products"
          :key="id"
          :product="product"
        />
      </div>
    </section>
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
defineOgImage("MyOg", {
  headline: config.public.ownerName,
  title,
  description,
  icon,
  url: route.fullPath,
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${config.public.baseURL}/og_me.png`,
});
</script>
