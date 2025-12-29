<template>
  <div class="pt-15 bg-white">
    <!-- Mensaje de carga -->
    <div
      v-if="isLoading"
      class="text-center h-[400px] flex flex-col justify-center items-center"
    >
      <h1 class="text-xl font-bold">Cargando productos</h1>
      <p>Espere por favor...</p>
    </div>
    <!-- Carrusel -->
    <section
      v-else-if="productsList.length"
      class="relative w-full py-16 overflow-hidden"
    >
      <div
        class="absolute inset-0 -z-10 blur-3xl opacity-40 bg-cover bg-center"
        :style="{
          backgroundImage: `url(${getImageUrl(productsList[0]?.images?.[0])})`,
        }"
      ></div>
      <div
        class="relative bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl max-w-5xl mx-auto p-10"
      >
        <!-- Flecha izquierda -->
        <button @click="goPrev" class="swiper-button-custom left-0">
          <svg          
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          stroke-width="2"
          class="w-5 h-5"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15 19l-7-7 7-7"
    />
  </svg>
</button>
        <!-- Flecha derecha -->
        <button @click="goNext" class="swiper-button-custom right-0">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          stroke-width="2"
          class="w-5 h-5"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 5l7 7-7 7"
    />
  </svg>
</button>
        <!-- Swiper -->
        <Swiper
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          pagination
          class="mySwiper"
          @swiper="onSwiper"
        >
          <SwiperSlide
            v-for="product in productsList"
            :key="product.id"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            >
              <div class="flex justify-center">
                <img
                  :src="getImageUrl(product.images?.[0])"
                  :alt="product.title"
                  class="rounded-xl object-contain max-h-[350px] opacity-0 transition-opacity duration-500"
                  @load="onImageLoad"
                />
              </div>

              <div class="text-left space-y-4">
                <h2 class="text-3xl font-bold text-gray-900">
                  {{ product.title }}
                </h2>
                <div class="space-y-1">
                   <!-- Precio con descuento -->
                     <p class="text-4xl font-bold text-blue-600">
                       ${{ getDiscountPrice(product.price) }}
                      </p>
                      <!-- Precio original tachado -->
                       <p class="text-sm text-gray-400 line-through">
                          ${{ product.price }}
                         </p>
                          <!-- Badge de descuento -->
                           <span class="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                            -10%
                          </span>
                        </div>
                        <p class="text-gray-500">
                           {{ product.description.substring(0, 130) }}...
                          </p>

                <button
                  class="mt-4 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                  @click="openModal(product)"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
    <div v-else class="text-center h-[500px]">
      <h3 class="text-xl font-bold">No hay productos disponibles</h3>
    </div>
    <!-- MODAL PARA AGREGAR AL CARRITO -->
    <QuantityModal
      v-if="showModal && selectedProduct"
      :product="selectedProduct"
      :discount="10"
      @close="closeModal"
      @confirm="confirmAdd"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { getProductsAction } from "@/modules/products/actions";
import { useCartStore } from '@/modules/cart/stores/cart.store';
import { useToast } from 'vue-toastification';
import QuantityModal from '@/modules/products/components/QuantityModal.vue';
import type { Product } from '@/modules/products/interface/product.interface';
// Query de productos
const { data: products, isLoading } = useQuery({
  queryKey: ["products", "carousel"],
  queryFn: () => getProductsAction(1, 10),
});
const productsList = computed(() => products?.value ?? []);
// Estado para el modal
const showModal = ref(false);
const selectedProduct = ref<Product | null>(null);
const cartStore = useCartStore();
const toast = useToast();

// Funciones del modal
function openModal(product: Product) {
  selectedProduct.value = product;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedProduct.value = null;
}

interface ConfirmPayload {
  productId: string;
  quantity: number;
  size: string;
  discountedPrice?: number;
}
function confirmAdd(payload: ConfirmPayload) {
  if (!selectedProduct.value) return;
  cartStore.addToCart({
    product: selectedProduct.value,
    quantity: payload.quantity,
    size: payload.size,
    discountedPrice: payload.discountedPrice,
  });

  toast.success(
    `${selectedProduct.value.title} agregado al carrito × ${payload.quantity}`
  );

  closeModal();
}
// Imagen fade-in
const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement | null;
  if (img) img.classList.add("opacity-100");
};
// URL imagen
const getImageUrl = (img?: string) => {
  if (!img) return "https://via.placeholder.com/300x300?text=No+Image";
  return img.startsWith("http")
    ? img
    : `${import.meta.env.VITE_TESLO_API_URL}/files/product/${img}`;
};

// Swiper instance REAL
const swiperInstance = ref<SwiperType | null>(null);

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
};

const goPrev = () => {
  swiperInstance.value?.slidePrev();
};

const goNext = () => {
  swiperInstance.value?.slideNext();
};
const getDiscountPrice = (price: number, discount = 10) => {
  const discounted = price - price * (discount / 100);
  return Math.round(discounted * 100) / 100; // 2 decimales
};

</script>

<style>
.mySwiper {
  width: 100%;
}

.swiper-button-custom {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
}

.swiper-button-custom:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.swiper-button-custom.left-0 {
  left: 10px;
}

.swiper-button-custom.right-0 {
  right: 10px;
}
</style>




