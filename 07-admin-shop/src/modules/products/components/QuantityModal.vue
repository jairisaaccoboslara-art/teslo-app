<template>
  <div
  class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3"
  @click.self="emit('close')"
>
  <div
    class="bg-white rounded-xl shadow-xl
           w-full max-w-md
           max-h-[90vh] overflow-y-auto
           p-4 sm:p-6"
  >

    <h2 class="text-lg font-bold">
      {{ product.title }}
    </h2>

    <p class="border px-3 py-2 w-full rounded text-sm mt-2">
      {{ product.description }}
    </p>

    <!-- Tallas -->
    <div class="mt-4">
      <label class="block text-sm mb-1">Talla</label>

      <div class="flex gap-2 flex-wrap">
        <button
          v-for="size in product.sizes"
          :key="size"
          type="button"
          @click="selectedSize = size"
          :class="[
            'px-3 py-2 rounded border text-sm transition',
            selectedSize === size
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-100 hover:bg-gray-200'
          ]"
        >
          {{ size }}
        </button>
      </div>

      <p v-if="showSizeError" class="text-xs text-red-500 mt-1">
        Selecciona una talla
      </p>
    </div>

    <!-- Precio unitario -->
    <div class="mt-3">
      <p class="text-sm" v-if="!discount">
        Precio unitario: <b>${{ product.price }}</b>
      </p>
      <div v-else>
        <p class="text-sm">
          Precio unitario:
          <b class="text-blue-600">${{ discountedPrice }}</b>
        </p>
        <p class="text-xs text-gray-400 line-through">
          Antes: ${{ product.price }}
        </p>
        <span class="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded mt-1">
          -{{ discount }}%
        </span>
      </div>
    </div>

    <!-- Cantidad -->
    <div class="mt-4">
      <label class="block text-sm mb-1">Cantidad</label>
      <input
        v-model.number="quantity"
        type="number"
        min="1"
        max="6"
        class="border px-3 py-2 w-full rounded text-sm"
        
      />
      <p v-if="showCantidadError" class="text-xs text-red-500 mt-1">
        Selecciona una cantidad válida
      </p>
    </div>

    <p class="mt-4 text-lg font-semibold">
      Total: <b>${{ total }}</b>
    </p>

    <div class="flex justify-between gap-3 mt-6 sticky bottom-0 bg-white pt-4">
      <button
        @click="emit('close')"
        class="bg-gray-300 px-4 py-2 rounded w-full"
      >
        Cancelar
      </button>

      <button
        @click="confirm"
        class="bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded w-full"
      >
        Confirmar
      </button>
    </div>

  </div>
</div>

</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';



const props = defineProps<{
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    sizes: string[];
  };
  discount?: number;
}>();

const emit = defineEmits<{
  (e: 'confirm', payload: {
    productId: string;
    quantity: number;
    size: string;
    discountedPrice?: number;
  }): void;
  (e: 'close'): void;
}>();

const quantity = ref(1);
const selectedSize = ref<string | null>(null);
const showSizeError = ref(false);
const showCantidadError = ref(false);

const discountedPrice = computed(() => {
  if (!props.discount) return props.product.price;
  const discounted = props.product.price - props.product.price * (props.discount / 100);
  return Math.round(discounted * 100) / 100;
});

const total = computed(() => quantity.value * discountedPrice.value);

/* 🔒 Evita cantidades inválidas */
watch(quantity, (val) => {
  if (!val || val < 1) quantity.value = 1;
});

/* 🔄 Reset cuando cambia el producto */
watch(
  () => props.product.id,
  () => {
    quantity.value = 1;
    selectedSize.value = null;
    showSizeError.value = false;
  }
);

function confirm() {
  if (!selectedSize.value) {
    showSizeError.value = true;
    return;
  }

  emit('confirm', {
    productId: props.product.id,
    quantity: quantity.value,
    size: selectedSize.value,
    discountedPrice: props.discount ? discountedPrice.value : undefined,
  });
}
function validateQuantity() {
  showCantidadError.value =
    quantity.value < 1 || quantity.value > 5 || !Number.isInteger(quantity.value);
}
</script>

