<template>
    <nav class="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
  <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
    <a href="#" class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-6 text-blue-500 sm:h-9">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>

      <span class="self-center whitespace-nowrap text-xl font-semibold">Termcode</span>
    </a>
    <div class="mt-2 sm:mt-0 sm:flex md:order-2">
      <!-- Login Button -->
      <template v-if="!AuthStore.isAuthenticated">
        <RouterLink 
      to ="/auth/Login" type="button" class=" mr-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg">Iniciar sesion </RouterLink> 
      <RouterLink 
      to="/auth/Register" type="button" class=" mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">Crear Cuenta </RouterLink>
      </template>
         <RouterLink
            v-if="AuthStore.isAdmin && $route.path.startsWith('/admin')"
            to="/"
            type="button"
            class="mr-3 hidden border border-green-700 py-1.5 px-6 text-center text-sm font-medium text-green-700 hover:bg-green-100 focus:outline-none focus:ring-4 focus:ring-green-300 md:inline-block rounded-lg"
        >
            Volver al inicio
        </RouterLink>

      <template v-if="AuthStore.isAuthenticated">
        <RouterLink 
        v-if="AuthStore.isAdmin"
      to ="/admin" type="button" class=" mr-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg">Admin </RouterLink> 
      <button
      @click="AuthStore.logout()"
      type="button" class=" mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">Cerrar sesión </button>
      </template>
      <button 
        data-collapse-toggle="navbar-sticky" 
        type="button" 
        class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
        aria-controls="navbar-sticky" 
        aria-expanded="false"
    >
        <span class="sr-only">Abrir menu principal</span>
        <svg class="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
        </svg>
    </button>

      <!-- Register Button -->
      <button @click="toggleMenu" type="button" class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Abrir menu principal</span>
        <svg class="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
    <div
  :class="[
    'w-full items-center justify-between md:order-1 md:flex md:w-auto',
    isOpen ? 'block' : 'hidden'
  ]"
  id="navbar-sticky"
>
<ul class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">

  <li>
    <RouterLink
      to="/"
      class="block rounded py-2 pl-3 pr-4 md:p-0"
      :class="$route.name === 'home' 
          ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700' 
          : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'"
    >
      Inicio
    </RouterLink>
  </li>

  <li>
    <RouterLink
      to="/about"
      class="block rounded py-2 pl-3 pr-4 md:p-0"
      :class="$route.name === 'about'
          ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700' 
          : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'"
    >
      ¿Quines somos?
    </RouterLink>
  </li>
  <!-- BOTONES MÓVIL -->
<!-- BOTONES MÓVIL (idénticos a escritorio) -->
<li class=" border-t pt-3 mt-3 flex flex-col gap-3">

  <template v-if="!AuthStore.isAuthenticated">
    <RouterLink 
     to ="/auth/Login" type="button" class=" mr-3  border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300  rounded-lg">Iniciar sesion
    >
      Iniciar sesión
    </RouterLink>

    <RouterLink 
      to="/auth/Register" type="button" class=" mr-3 bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300   rounded-lg">Crear Cuenta 
    </RouterLink>
  </template>

  <template v-else>
    <RouterLink 
      v-if="AuthStore.isAdmin"
      to="/admin"
      class="border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 rounded-lg"
    >
      Admin
    </RouterLink>

    <button
      @click="AuthStore.logout()"
      type="button" class=" mr-3 bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300   rounded-lg">Cerrar sesión </button>
   
  </template>

</li>



</ul>
    </div>
  </div>
</nav>

 </template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';

const AuthStore = useAuthStore(); 

// Estado del menú móvil
const isOpen = ref(false);

// Función para abrir/cerrar menú
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
