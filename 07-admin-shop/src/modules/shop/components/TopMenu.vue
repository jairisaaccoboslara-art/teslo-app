<template>
  <div>
    <nav class="w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
  <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
    <a href="#" class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-6 text-blue-500 sm:h-9">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>

      <span class="self-center whitespace-nowrap text-xl font-semibold">Termcode</span>
    </a>
    <div class="mt-2 sm:mt-0 sm:flex md:order-2">
         <button
  type="button"
  @click="showPerfil = true"
  class="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-auto rounded-full
         hover:bg-gray-300 active:scale-95 transition cursor-pointer"
  aria-label="Perfil"
>
  <svg
    class="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
</button>



      <button
  @click="toggleMenu"
  class="md:hidden inline-flex items-center rounded-lg p-2 text-gray-500 hover:bg-gray-100"
>
  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
    <path
      fill-rule="evenodd"
      d="M3 5h14M3 10h14M3 15h14"
      clip-rule="evenodd"
    />
  </svg>
</button>

    </div>
    <div
  class="w-full items-center justify-between md:order-1 flex md:w-auto"
  id="navbar-sticky"
>
<ul class="flex flex-row space-x-8 text-sm font-medium">

  <li>
    <RouterLink
      to="/"
      class="block rounded py-2 pl-3 pr-4 md:p-0 hover:underline text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
    >
      Inicio
    </RouterLink>
  </li>
  <li>
    <RouterLink
      to="/carousel"
      class="block rounded py-2 pl-3 pr-4 md:p-0 hover:underline"
      :class="$route.name === 'carousel'
          ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700' 
          : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'"
    >
      Descuentos
    </RouterLink>
  </li>
   <li>
    <RouterLink
      to="/about"
      class="block rounded py-2 pl-3 pr-4 md:p-0 hover:underline"
      :class="$route.name === 'about'
          ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700' 
          : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'"
    >
      ¿Quienes somos?
    </RouterLink>
  </li>
  <li>
    <RouterLink to="/news" class="block rounded py-2 pl-3 pr-4 md:p-0 hover:underline"
      :class="$route.name === 'news'
          ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700' 
          : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'"
    >
    Noticias
    </RouterLink>
  </li>
  <li>
    <RouterLink to="/carrito" class="block rounded py-2 pl-3 pr-4 md:p-0 hover:underline"
      :class="$route.name === 'carrito'
          ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700' 
          : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'"
    >
    </RouterLink>
  </li>
  

  <!-- BOTONES MÓVIL -->





</ul>
    </div>
  </div>
    </nav>
    <!-- Modal Perfil -->
    <Perfil v-if="showPerfil" @close="showPerfil = false" />
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import Perfil from '@/modules/shop/views/perfil.vue';

const AuthStore = useAuthStore();
// menú móvil
const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// modal perfil
const showPerfil = ref(false);
</script>

<!-- No additional template blocks -->

