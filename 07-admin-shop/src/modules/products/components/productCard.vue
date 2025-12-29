<template>
  <!-- TARJETA DEL PRODUCTO -->
  <article
    class="rounded-xl bg-white p-3 shadow-lg transition duration-300 hover:shadow-xl hover:scale-105"
  >
    <div>
      <div class="relative flex items-end overflow-hidden rounded-xl">
        <img
          :src="getImageUrl(product.images[0])"
          :alt="product.title"
          class="w-full h-56 object-cover"
        />

        <!-- BOTÓN AGREGAR -->
        <button
          class="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white hover:bg-blue-600"
          @click="openModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272"
            />
          </svg>
          <span class="text-sm">Agregar</span>
        </button>
      </div>

      <div class="mt-3 px-1">
        <h2 class="text-slate-700 font-medium">
          {{ product.title }}
        </h2>

        <p class="text-sm text-slate-400 capitalize">
          {{ product.gender }}
        </p>

        <p class="mt-2 text-lg font-bold text-blue-500">
          ${{ product.price }}
        </p>
      </div>
    </div>
  </article>

  <!-- MODAL DE CANTIDAD -->
  <QuantityModal
    v-if="showModal"
    :product="product"
    @close="closeModal"
    @confirm="confirmAdd"
  />

  <!-- MODAL DE AUTENTICACIÓN REQUERIDA -->
  <AuthRequiredModal
    v-if="showAuthModal"
    @close="closeAuthModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/modules/cart/stores/cart.store';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useToast } from 'vue-toastification';
import QuantityModal from './QuantityModal.vue';
import AuthRequiredModal from './AuthRequiredModal.vue';
import type { Product } from '../interface/product.interface';
import { getImageUrl } from '@/helpers/getImageUrl';

interface Props {
  product: Product;
}

const { product } = defineProps<Props>();

const showModal = ref(false);
const showAuthModal = ref(false);
const cartStore = useCartStore();
const authStore = useAuthStore();
const toast = useToast();

function openModal() {
  if (!authStore.isAuthenticated) {
    showAuthModal.value = true;
    return;
  }
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function closeAuthModal() {
  showAuthModal.value = false;
}

interface ConfirmPayload {
  productId: string;
  quantity: number;
  size: string;
}

function confirmAdd(payload: ConfirmPayload) {
  cartStore.addToCart({
    product,
    quantity: payload.quantity,
    size: payload.size,
  });

  toast.success(
    ` ${product.title}, agregado al carrito ×  ${payload.quantity}`
  );

  closeModal();
}
</script>


