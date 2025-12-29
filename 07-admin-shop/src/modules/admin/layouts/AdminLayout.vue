<template>
  <!-- component -->
  <div class="flex w-screen h-screen text-gray-700">
    <!-- Component Start -->
    <div class="flex flex-col items-center w-16 pb-4 overflow-auto border-r border-gray-300">
      <a class="flex items-center justify-center flex-shrink-0 w-full h-16 bg-gray-300" href="#">
        <svg
          class="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </a>
      <RouterLink
  to="/"
  class="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300"
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
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
</RouterLink>


    </div>
    <div class="flex flex-col w-56 border-r border-gray-300">
      <button class="relative text-sm focus:outline-none group">
        <div
          class="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 hover:bg-gray-300"
        >
        <div class="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300">
        <h1 class="text-lg font-medium">{{ username }}</h1>
       
      
      </div>
          
          <svg
            class="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
          </svg>
        </div>
        <div
          class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg group-focus:flex"
        >
        </div>
      </button>
     
      <div class="flex flex-col flex-grow p-4 overflow-auto">
        <RouterLink
          class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
          to="/admin"
        >
          <span class="leading-none">Panel Administrativo</span>
        </RouterLink>
        
        <RouterLink
          class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
          to="/admin/products"
        >
          <span class="leading-none">Productos</span>
        </RouterLink>
       
      <RouterLink
          class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
          to="/admin/sales"
        >
          <span class="leading-none">Ventas</span>
        </RouterLink>
       
       <RouterLink
          to="/admin/products/create"
          class="flex items-center flex-shrink-0 h-10 px-3 mt-auto text-sm font-medium bg-blue-500 rounded hover:bg-blue-700 text-white"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span class="ml-2 leading-none">Nuevo</span>
        </RouterLink>
    
      </div>
      
    </div>
    <div class="flex flex-col flex-grow">
      
      <div class="flex-grow p-6 overflow-auto bg-gray-200">
        <RouterView />
      </div>
    </div>
    <!-- Component End  -->
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { storeToRefs } from 'pinia';

const { username } = storeToRefs(useAuthStore());
</script>

