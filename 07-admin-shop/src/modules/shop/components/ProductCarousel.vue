<!-- ProductCard.vue -->
<template>
  <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 w-full">
    <a href="#">
      <div class="relative overflow-hidden rounded-xl h-48 flex justify-center items-center bg-gray-100">
        <img
          :src="getImageUrl(product.images?.[0])"
          :alt="product.title"
          class="object-cover w-full h-full opacity-0 transition-opacity duration-500"
          @load="onImageLoad"
        />
        <button
          class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
      <div class="mt-2">
        <h2 class="text-gray-800 text-lg font-semibold truncate">{{ product.title }}</h2>
        <p class="text-sm text-gray-400 capitalize">{{ product.gender }}</p>
        <div class="mt-3 flex items-center justify-between">
          <p class="text-xl font-bold text-blue-500">${{ product.price }}</p>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
import type { Product } from "@/modules/products/interface/product.interface";

const props = defineProps<{ product: Product }>();

const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement | null;
  if (img) img.classList.add("opacity-100");
};

const getImageUrl = (img?: string) => {
  if (!img) return "https://via.placeholder.com/300x300?text=No+Image";
  return img.startsWith("http")
    ? img
    : `${import.meta.env.VITE_TESLO_API_URL}/files/product/${img}`;
};
</script>




