import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'
import './config/yup';


if (import.meta.env.DEV) {
  const originalLog = console.log;
  console.log = (...args) => {
    if (args[0]?.includes?.('🍍') && args[0]?.includes?.('store installed')) return;
    originalLog(...args);
  };
}

const app = createApp(App);

// Plugins
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);
app.use(Toast);


import { useCartStore } from "@/modules/cart/stores/cart.store";
const cartStore = useCartStore(pinia);
cartStore.loadFromLocalStorage();

// Mount
app.mount('#app');
