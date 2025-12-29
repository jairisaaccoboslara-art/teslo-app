<template>
  <!-- Título -->
  <div class="pt-5 bg-white">
    <h3 class="text-center text-2xl font-bold text-gray-800">Productos Disponibles</h3>
  </div>

  <!-- Mensaje de carga -->
  <div v-if="isPending" class="text-center h-[500px]">
    <h1 class="text-xl font-bold">Cargando productos</h1>
    <p>Espere por favor...</p>
  </div>

  <!-- Lista de productos -->
  <ProductList v-else :products="productsList" />

  <!-- Paginación -->
  <ButtonPagination 
    :has-more-data="productsList.length > 0 && productsList.length < 10"
    :is-first-page="page === 1"
    :page="page"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery, useQueryClient } from "@tanstack/vue-query";

import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import ProductList from '@/modules/products/components/productList.vue';
import Carousel from '@/modules/shop/views/Carousel.vue';
import { getProductsAction } from '@/modules/products/actions';

// 🔹 Ruta y paginación
const route = useRoute();
const page = ref(Number(route.query.page || 1));

// 🔹 Query client
const queryClient = useQueryClient();

// 🔹 Query para obtener productos
const { data: products, isPending } = useQuery({
  queryKey: ['products', page],
  queryFn: () => getProductsAction(page.value),
});

// 🔹 Lista de productos computada
const productsList = computed(() => products?.value ?? []);

// 🔹 Detectar cambios de página en la URL
watch(() => route.query.page, (newPage) => {
  page.value = Number(newPage || 1);
  window.scroll({ top: 0, behavior: 'smooth' });
});

// 🔹 Prefetch de la siguiente página
watch(page, () => {
  queryClient.prefetchQuery({
    queryKey: ['products', page.value + 1],
    queryFn: () => getProductsAction(page.value + 1),
  });
});
</script>
