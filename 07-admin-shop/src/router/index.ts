import { adminRoutes } from '@/modules/admin/routes';
import { authRoutes } from '@/modules/auth/routes';
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
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
      ],
    },
    authRoutes,
    adminRoutes,
  ],
});
import { useAuthStore } from '@/modules/auth/stores/auth.store';

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (auth.isChecking) {
    const ok = await auth.checkAuthStatus();

    if (!ok && to.meta.requiresAuth) {
      return next('/auth/login');
    }
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return next('/');
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/auth/login');
  }

  next();
});


export default router;
