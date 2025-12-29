<template>
  <div
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-xl shadow-xl
             w-full max-w-md
             p-4 sm:p-6"
    >
      <!-- Icon -->
      <div class="flex justify-center mb-4">
        <div class="bg-red-100 rounded-full p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 text-red-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 1.677A9 9 0 1112 21c4.97 0 9-4.03 9-9s-4.03-9-9-9c-1.341 0-2.635.195-3.873.565m0 0A8.967 8.967 0 0112 3c4.97 0 9 4.03 9 9m0 0a8.964 8.964 0 01-8.129 8.592m0 0A9 9 0 115.904 3.975m0 0a8.964 8.964 0 018.129 8.592"
            />
          </svg>
        </div>
      </div>

      <h2 class="text-lg font-bold text-center mb-2">
        Iniciar sesión requerido
      </h2>

      <p class="text-gray-600 text-center text-sm mb-6">
        Debes iniciar sesión para agregar productos al carrito. Por favor, inicia sesión o regístrate para continuar.
      </p>

      <div class="flex gap-3 flex-col sm:flex-row">
        <button
          @click="emit('close')"
          class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded w-full text-sm"
        >
          Cancelar
        </button>

        <RouterLink
          to="/auth/login"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full text-center text-sm"
          @click="emit('close')"
        >
          Ir a Iniciar Sesión
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>
