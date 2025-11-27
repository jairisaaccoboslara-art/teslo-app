<template>
<!-- Title -->
<div class="pt-32  bg-white">
<h1 class="text-center text-2xl font-bold text-gray-800">Productos Disponibles</h1>
</div>



<div v-if="!products" class="text-center h-[500px]">
	<h1 class="text-xl">Cargando productos</h1>
	<p>Espere por favor</p>
</div>

<ProductList v-else :products="products" />


<ButtonPagination 
:has-more-data="!!products && products.length < 10"
:is-first-page="page === 1"
:page="page"/>


<!--<div>{{ products }}</div>-->
</template>


<script lang ="ts" setup>
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { getProductsAction } from '@/modules/products/actions';
import ProductList from '@/modules/products/components/productList.vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRoute  } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';
 
const route = useRoute();
const page = ref(Number(route.query.page || 1 ));
const queryClient = useQueryClient ();

const { data: products = [] } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value),
});




watch(
	() => route.query.page,
	(newPage)  =>{
		page.value = Number( newPage || 1)
		window.scroll({ top: 0, behavior: 'smooth'});



	},

);


watchEffect(() =>{
	queryClient.prefetchQuery({
		queryKey: ['products', { page: page.value + 1}],
		queryFn: () => getProductsAction(page.value +1),
	})

}
)
</script>