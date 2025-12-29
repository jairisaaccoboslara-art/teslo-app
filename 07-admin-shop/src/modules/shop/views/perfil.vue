<template>
  <!-- Fondo oscurecido -->
  <div class="fixed inset-0 bg-black/50 z-50">
    <!-- Contenedor del modal en la esquina superior derecha -->
    <div class="fixed top-4 right-4 bg-white w-full max-w-md md:max-w-lg rounded-2xl p-6 md:p-7 shadow-2xl ring-1 ring-gray-100">
      <!-- Botón X para cerrar -->
      <button
        @click="onClose"
        class="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
        aria-label="Cerrar"
      >
        ✕
      </button>

      <h2 class="text-2xl font-bold mb-2 tracking-tight">{{ user?.fullName }}</h2>
      <p class="text-sm text-gray-500 mb-4">Gestiona tu cuenta y seguridad</p>
      <div class="border-t border-gray-100 mb-4"></div>

      <!-- Usuario autenticado -->
      <div v-if="isAuthenticated" class="space-y-3 text-sm">
        <p>
          <span class="font-medium">Rol:</span>
          {{ user?.roles?.join(', ') }}
        </p>
        <p>
          <span class="font-medium">Email:</span>
          {{ user?.email }}
        </p>
        <div class="flex items-center justify-between">
          <span class="font-medium">Contraseña:</span>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500">
              {{ showCurrentPassword ? '✓ Protegida por cifrado' : '••••••••' }}
            </span>
            <button
              @click="showCurrentPassword = !showCurrentPassword"
              class="text-gray-500 hover:text-gray-700 transition"
              :title="showCurrentPassword ? 'Contraseña cifrada' : 'Mostrar estado de contraseña'"
            >
              <svg v-if="showCurrentPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0m7.6 0a6 6 0 01-5.922 7.05M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Cambiar contraseña -->
        <div class="mt-3">
          <button
            class="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
            @click="isChangingPassword = !isChangingPassword"
          >
            {{ isChangingPassword ? 'Cancelar' : 'Cambiar contraseña' }}
          </button>

          <div v-if="isChangingPassword" class="mt-3 space-y-2">
            <input
              v-model="newPassword"
              type="password"
              placeholder="Nueva contraseña"
              class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
            />
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
            />
            <button
              :disabled="isUpdatingPassword"
              @click="updatePassword"
              class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {{ isUpdatingPassword ? 'Guardando...' : 'Guardar contraseña' }}
            </button>
            <p v-if="passwordMessage" class="text-xs text-gray-600">{{ passwordMessage }}</p>
          </div>
        </div>

        <!-- Botón Admin (solo admin) -->
        <RouterLink
          v-if="isAdmin"
          :to="{ name: 'admin' }"
          class="mt-4 block text-center border border-blue-700 py-1.5 px-6 text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
        >
          Admin
        </RouterLink>

        <!-- Cerrar sesión -->
        <button
          @click="logout"
          class="mt-3 w-full bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>

      <!-- Usuario no autenticado -->
      <div v-else class="space-y-3 text-sm mt-4">
        <p class="text-gray-600 mb-3">No has iniciado sesión.</p>
        <RouterLink
          :to="{ name: 'login' }"
          class="block text-center border border-blue-700 py-1.5 px-6 text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
        >
          Iniciar sesión
        </RouterLink>
        <RouterLink
          :to="{ name: 'register' }"
          class="block text-center bg-blue-700 py-1.5 px-6 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
        >
          Crear Cuenta
        </RouterLink>
      </div>

      <!-- Botón cerrar modal -->
   
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useRouter } from 'vue-router';
import { updateUserPassword } from '@/modules/auth/actions/users..actions';

const emit = defineEmits<{ (e: 'close'): void }>();
const router = useRouter();

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isAuthenticated = computed(() => {
  // Validar que el usuario exista y tenga datos
  return authStore.isAuthenticated && !!authStore.user?.id;
});
const isAdmin = computed(() => authStore.isAdmin && authStore.user?.roles?.includes('admin'));

// Sincronizar estado de autenticación al abrir el modal
onMounted(async () => {
  // Verificar el estado de autenticación al montar el modal
  if (!authStore.user && authStore.token) {
    await authStore.checkAuthStatus();
  }
});

// Estado para mostrar/ocultar contraseña actual
const showCurrentPassword = ref(false);

// Estado para cambiar contraseña
const isChangingPassword = ref(false);
const newPassword = ref('');
const confirmPassword = ref('');
const isUpdatingPassword = ref(false);
const passwordMessage = ref('');

const onClose = () => {
  emit('close');
  router.push({ name: 'home' });
};

const logout = () => {
  authStore.logout();
  router.push({ name: 'home' });
};

const updatePassword = async () => {
  passwordMessage.value = '';
  if (!user.value?.id) {
    passwordMessage.value = 'Usuario inválido.';
    return;
  }
  if (!newPassword.value || newPassword.value.length < 6) {
    passwordMessage.value = 'La contraseña debe tener al menos 6 caracteres.';
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordMessage.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    isUpdatingPassword.value = true;
    await updateUserPassword(user.value.id, newPassword.value);
    passwordMessage.value = 'Contraseña actualizada correctamente.';
    isChangingPassword.value = false;
    newPassword.value = '';
    confirmPassword.value = '';
  } catch (error: any) {
    console.error('Error details:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Error al actualizar la contraseña.';
    passwordMessage.value = `Error: ${errorMessage}`;
  } finally {
    isUpdatingPassword.value = false;
  }
};
</script>

