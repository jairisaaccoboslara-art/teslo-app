import { adminRoutes } from '@/modules/admin/routes';
import { authRoutes } from '@/modules/auth/routes';
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/shop/views/HomeView.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/modules/shop/views/AboutView.vue'),
        },
        {
          path: 'carousel',
          name: 'carousel',
          component: () => import('@/modules/shop/views/Carousel.vue'),
        },
        {
          path: 'carrito',
          name: 'carrito',
          component: () => import('@/modules/shop/views/carrito.vue'),
        },
        {
          path: '/products/:id',
          name: 'product-detail',
          component: () => import('@/modules/admin/views/ProductView.vue'),
        },
        {
          path: '/admin/sales',
          name: 'admin-sales',
          component: () => import('@/modules/admin/views/AdminsalesView.vue'),
        },
        {
          path: '/news',
          name: 'noticias-tienda',
          component: () => import('@/modules/shop/views/news.vue'),
        },
        {
          path: '/perfil',
          name: 'perfil-persona',
          component: () => import('@/modules/shop/views/perfil.vue'),
        },
      ],
    },
    authRoutes,
    adminRoutes,
  ],
});

export default router;
