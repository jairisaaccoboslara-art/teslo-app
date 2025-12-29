<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-96 shadow-xl">
      <h2 class="text-2xl font-bold mb-4">
        Información sobre su compra
      </h2>

      <p class="text-gray-700 mb-2">
        Total de productos:
        <b>{{ items }}</b>
      </p>

      <p class="text-xl font-semibold mb-6">
        Total a pagar:
        <span class="text-green-600">
          ${{ total.toFixed(2) }}
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
      La factura de esta compra será enviada al correo electrónico con el correo que iniciaste sesión.
    </span>
  </p>
     <p class="text-gray-600 mt-3 flex items-start gap-2">
  <span class="text-green-500">✔</span>
  <span>
    Estás a punto de finalizar tu compra.  
    Confirma tu pedido para continuar con el proceso de pago.
  </span>
</p>
      <div class="flex justify-between">
        <button
          @click="emit('close')"
          class="bg-gray-300 px-4 py-2 rounded-lg"
        >
          Cancelar
        </button>

        <button
          @click="emit('confirm')"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Confirmar compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  total: number;
  items: number;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();
</script>
