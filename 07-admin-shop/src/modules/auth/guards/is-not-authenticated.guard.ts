import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  if (authStore.isChecking) {
    await authStore.checkAuthStatus();
  }

  if (authStore.isAuthenticated) {
    return next({ name: 'home' });
  }

  return next();
};

export default isNotAuthenticatedGuard;
