<template>
  <a
    :href="whatsappLink"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 flex items-center gap-3
           bg-green-500 hover:bg-green-600 text-white
           px-4 py-3 rounded-full shadow-lg transition"
  >
    <span class="text-2xl">💬</span>
    <span class="hidden md:block font-medium">
      ¿Necesitas ayuda?
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const phoneNumber = '573001234567'; 
// ⚠️ FORMATO: código país + número (sin +, sin espacios)

const message = 'Hola, tengo una pregunta sobre la tienda 👋';

const whatsappLink = computed(() => {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
});
</script>
