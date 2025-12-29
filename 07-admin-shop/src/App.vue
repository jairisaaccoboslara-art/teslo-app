<template>
  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />
  <RouterLink 
  to="/carrito"
  class="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-xl hover:bg-blue-700 transition-all" >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="h-7 w-7"> 
  <path stroke-linecap="round" stroke-linejoin="round" 
  d="M2.25 3h1.5l1.5 12h12l2-8H6M6 20.25a.75.75 0 110-1.5.75.75 0 010 1.5zm10 0a.75.75 0 110-1.5.75.75 0 010 1.5z" /> </svg>
</RouterLink>
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
