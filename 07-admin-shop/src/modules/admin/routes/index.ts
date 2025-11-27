import type { RouteRecordRaw } from 'vue-router';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import isAdminGuard from '@/modules/auth/guards/is-admin-guard';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  redirect: { name: 'admin-UserPage' },

  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  children: [
    {
      path: 'Dashboard',
      name: 'admin-UserPage',
      component: () => import('@/modules/admin/pages/AdminUsersPage.vue'),
    },
    {
      path: 'products',
      name: 'admin-products',
      component: () => import('@/modules/admin/views/ProductsView.vue'),
    },
    {
      path: 'products/:productId',
      name: 'admin-product',
      props: true,
      component: () => import('@/modules/admin/views/ProductView.vue'),
    },
    

  ],
};

