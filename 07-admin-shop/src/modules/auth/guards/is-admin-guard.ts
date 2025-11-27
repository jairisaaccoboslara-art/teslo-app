import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useToast } from 'vue-toastification';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  const toast = useToast();

  await authStore.checkAuthStatus();

  if (!authStore.isAdmin) {
    toast.error("No tienes permisos para acceder a esta sección");
    return next({ name: 'home' });
  }

  next();
};

export default isAdminGuard;

