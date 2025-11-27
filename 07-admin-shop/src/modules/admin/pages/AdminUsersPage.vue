<template>
  <div class="flex-grow p-6 bg-gray-100 min-h-screen">
    <!-- HEADER -->
    <h1 class="text-3xl font-bold mb-6">Panel Administrativo</h1>

    <!-- ESTADÍSTICAS -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white p-4 rounded shadow text-center">
        <p class="text-gray-500">Usuarios Totales</p>
        <p class="text-2xl font-bold">{{ users.length }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow text-center">
        <p class="text-gray-500">Administradores</p>
        <p class="text-2xl font-bold">{{ adminsCount }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow text-center">
        <p class="text-gray-500">Usuarios Normales</p>
        <p class="text-2xl font-bold">{{ users.length - adminsCount }}</p>
      </div>
    </div>

    <!-- BUSCADOR -->
    <div class="mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar por nombre o email..."
        class="w-full p-2 border rounded"
      />
    </div>

    <!-- GRID DE USUARIOS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="u in filteredUsers"
        :key="u.id"
        class="bg-white p-4 rounded shadow flex flex-col justify-between"
      >
        <div>
          <p class="font-bold text-lg">{{ u.fullName }}</p>
          <p class="text-sm text-gray-500">{{ u.email }}</p>
          <span
            class="inline-block mt-2 px-2 py-1 text-xs rounded"
            :class="u.roles?.includes('admin') ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'"
          >
            {{ u.roles?.includes('admin') ? 'Administrador' : 'Usuario' }}
          </span>
        </div>

        <div class="mt-4 flex gap-2">
          <button
            @click="toggleAdmin(u)"
            class="flex-1 bg-gray-300 text-black text-sm py-1 rounded hover:bg-gray-400 transition"
          >
            {{ u.roles?.includes('admin') ? 'Quitar Admin' : 'Hacer Admin' }}
          </button>
          <button
            @click="editUser(u)"
            class="flex-1 bg-gray-300 text-black text-sm py-1 rounded hover:bg-gray-400 transition"
          >
            Editar
          </button>
          <button
            @click="deleteUser(u.id)"
            class="flex-1 bg-gray-300 text-black text-sm py-1 rounded hover:bg-red-500 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL EDITAR USUARIO -->
    <div v-if="selectedUser" class="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h3 class="text-lg font-bold mb-4">Editar Usuario</h3>
        <label class="block mb-2">Nombre completo</label>
        <input v-model="selectedUser.fullName" class="w-full p-2 mb-3 border rounded" />

        <label class="block mb-2">Email</label>
        <input v-model="selectedUser.email" class="w-full p-2 mb-3 border rounded" />

        <label class="block mb-2">Nueva contraseña</label>
        <input type="password" v-model="selectedUser.newPassword" class="w-full p-2 mb-3 border rounded" />

        <div class="flex justify-end gap-3 mt-4">
          <button @click="selectedUser = null" class="px-3 py-1 rounded bg-gray-300">Cancelar</button>
          <button @click="saveChanges" class="px-3 py-1 rounded bg-gray-300 text-black">Guardar cambios</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { tesloApi } from '@/api/tesloApi';

const users = ref<any[]>([]);
const selectedUser = ref<any | null>(null);
const search = ref('');
const token = localStorage.getItem('token'); 
// CARGAR USUARIOS
const loadUsers = async () => {
  if (!token) {
    console.error('No se encontró token. Debes iniciar sesión.');
    return;
  }

  try {
    const response = await tesloApi.get('/auth/users', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = response.data;

    if (!Array.isArray(data)) {
      console.error('La respuesta de la API no es un array:', data);
      users.value = [];
      return;
    }
    users.value = data.map(user => ({
      ...user,
      roles: Array.isArray(user.roles) ? user.roles : []
    }));

  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    alert('No se pudieron cargar los usuarios. Revisa la consola.');
  }
};

onMounted(loadUsers);

// FILTRO DE USUARIOS
const filteredUsers = computed(() =>
  users.value.filter(u =>
    u.fullName.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
);

const adminsCount = computed(() => users.value.filter(u => u.roles?.includes('admin')).length);

const editUser = (u: any) => {
  selectedUser.value = { ...u, newPassword: '' };
};

const saveChanges = async () => {
  if (!selectedUser.value) return;

  const payload: any = {
    fullName: selectedUser.value.fullName,
    email: selectedUser.value.email
  };

  if (selectedUser.value.newPassword.trim() !== '') {
    payload.password = selectedUser.value.newPassword;
  }

  try {
    await tesloApi.patch(`/auth/users/${selectedUser.value.id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    await loadUsers();
    selectedUser.value = null;
  } catch (error) {
    console.error('Error al guardar cambios:', error);
    alert('No se pudieron guardar los cambios.');
  }
};


const toggleAdmin = async (u: any) => {
  try {
    let roles = [...u.roles];

    if (roles.includes('admin')) {
      roles = roles.filter(r => r !== 'admin');
    } else {
      roles.push('admin');
    }

    await tesloApi.patch(`/auth/users/${u.id}`, { roles }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    await loadUsers();
  } catch (error) {
    console.error('Error al actualizar roles:', error);
    alert('No se pudo actualizar el rol del usuario.');
  }
};


const deleteUser = async (id: string) => {
  if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

  try {
    await tesloApi.delete(`/auth/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    await loadUsers();
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    alert('No se pudo eliminar el usuario.');
  }
};
</script>
