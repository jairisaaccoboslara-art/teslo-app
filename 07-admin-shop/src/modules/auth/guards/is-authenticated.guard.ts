import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  const isValid = await authStore.checkAuthStatus();

  if (!isValid || authStore.authStatus === AuthStatus.Unauthenticated) {
    return next({ name: 'home' });
  }

  return next();
};

export default isAuthenticatedGuard;