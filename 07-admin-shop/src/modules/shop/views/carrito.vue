<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl font-semibold">Carrito de Compras</h1>

    <!-- Tabla de productos en el carrito -->
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white border border-gray-200 border-collapse">
          <thead class="bg-gray-800 text-white">

  <tr>
    <th class="px-4 py-3 text-sm font-semibold">Productos</th>
    <th class="px-4 py-3 text-sm font-semibold">Precios unitarios</th>
    <th class="px-4 py-3 text-sm font-semibold">Talla</th>
    <th class="px-4 py-3 text-sm font-semibold text-center">Cantidad</th>
    <th class="px-4 py-3 text-sm font-semibold text-right">Eliminar producto</th>
  </tr>
</thead>


          <tbody class="text-gray-700">
  <tr
  v-for="(product, index) in cartProducts"
  :key="`${product.id}-${product.size}`"
  :class="{ 'bg-gray-100': index % 2 === 0 }"

  class="border-b hover:bg-gray-50 transition"
>
  <!-- PRODUCTO (imagen + título + precio unitario) -->
  <td class="px-4 py-4">
    <div class="flex items-center gap-4">
      <img
        :src="getImageUrl(product.images[0])"
        :alt="product.title"
        class="h-14 w-14 rounded-lg object-cover"
      />

      <div>
        <RouterLink
          :to="`/products/${product.id}`"
          class="font-semibold text-gray-800 hover:text-blue-600"
        >
          {{ product.title }}
        </RouterLink>

        <p class="text-sm text-gray-400" v-if="!product.discountedPrice">
          ${{ product.price }} c/u
        </p>
        <div v-else class="text-sm">
          <p class="text-blue-600 font-semibold">
            ${{ product.discountedPrice }} c/u
          </p>
          <p class="text-gray-400 line-through text-xs">
            ${{ product.price }}
          </p>
        </div>
      </div>
    </div>
  </td>

  <!-- PRECIO TOTAL -->
  <td class="px-4 py-4 font-semibold text-gray-700">
    ${{ (product.discountedPrice || product.price) * product.quantity }}
  </td>

  <!-- TALLA -->
  <td class="px-4 py-4">
    <span
      class="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
    >
      {{ product.size }}
    </span>
  </td>

  <!-- CANTIDAD -->
  <td class="px-4 py-4 text-center">
    <span
      class="inline-flex items-center justify-center min-w-[36px] px-3 py-1 rounded-full bg-gray-200 font-semibold"
    >
      {{ product.quantity }}
    </span>
  </td>

  <!-- ACCIONES -->
 <td class="px-4 py-4 text-right">
  <button
  @click="removeFromCart(product.id, product.size)"
  class="text-red-500 hover:text-red-700 transition"
  title="Eliminar"
>
  <!-- pega el SVG aquí -->

  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="w-5 h-5"
>
  <path d="M3 6h18" />
  <path d="M8 6V4h8v2" />
  <path d="M19 6l-1 14H6L5 6" />
  <path d="M10 11v6" />
  <path d="M14 11v6" />
</svg>

</button>

</td>

</tr>

</tbody>


        </table>
      </div>
    </div>

      <div class="mt-4 p-4 border rounded-lg bg-gray-50">
  <p class="font-semibold text-gray-600">
    Total de productos:
    <span class="font-semibold text-gray-900">
      {{ totalItems }}
    </span>
  </p>

  <p class="text-xl font-bold text-gray-900 mt-1">
    Total a pagar:
    <span class="text-green-600">
      ${{ totalAmount.toFixed() }}
    </span>
  </p>
  <p class="text-sm text-gray-500 mt-3 flex items-start gap-2">
    <span>
      Por favor detallar bien su compra a realizar 
    </span>
  </p>
  <p class="text-sm text-gray-500 mt-3 flex items-start gap-2">
    <span><svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="w-5 h-5"
>
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
  <polyline points="22,6 12,13 2,6"/>
</svg>
</span>
    <span>
      La factura de esta compra será enviada al correo electrónico con el que iniciaste sesión.
    </span>
  </p>
  
</div>


    <!-- Vaciar carrito y hcaer compra -->
     <div class="flex gap-4 justify-end">
    <button
      @click="openCheckout"
      class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
    >
      Hacer compra
    </button>

    <button 
      @click="clearCart"
      class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
    >
      Vaciar Carrito
    </button>
  </div>

</div>
  <CheckoutModal
  v-if="showCheckout"
  :total="totalAmount"
  :items="totalItems"
  @close="showCheckout = false"
  @confirm="confirmPurchase"
/>

</template>


<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/modules/cart/stores/cart.store';
import CheckoutModal from './CheckoutModal.vue';
import { useSalesStore } from '@/modules/auth/stores/Sales.store';
const cartStore = useCartStore();
const salesStore = useSalesStore();
const router = useRouter();

// Obtener los productos del carrito desde el store
const cartProducts = computed(() => cartStore.cart);

// Función para eliminar un producto del carrito
function removeFromCart(productId: string | number, size: string) {
  cartStore.removeFromCart(productId, size);
}


// Función para vaciar el carrito
function clearCart() {
  cartStore.clearCart();
}

// Obtener la URL de la imagen del producto
function getImageUrl(img?: string) {
  if (!img) return "https://via.placeholder.com/300x300?text=No+Image";
  return img.startsWith("http") ? img : `${import.meta.env.VITE_TESLO_API_URL}/files/product/${img}`;
}
const showCheckout = ref(false);

const totalAmount = computed(() =>
  cartStore.cart.reduce(
    (sum, product) => sum + (product.discountedPrice || product.price) * product.quantity,
    0
  )
);

const totalItems = computed(() =>
  cartStore.cart.reduce(
    (sum, product) => sum + product.quantity,
    0
  )
);

function openCheckout() {
  showCheckout.value = true;
}

async function confirmPurchase() {
  const items = cartStore.cart.map(product => ({
    productId: product.id.toString(),
    title: product.title,
    price: product.discountedPrice || product.price,
    quantity: product.quantity,
  }));

  await salesStore.addSale(items, totalAmount.value);

  cartStore.clearCart();
  showCheckout.value = false;

  // Redirigir al inicio después de la compra
  router.push('/');
}

</script>

<style scoped>
/* Añadir tu estilo personalizado si es necesario */
</style>


