<template>
  <div class="w-full h-full">
    <!-- CONTENIDO PRINCIPAL -->
    <div class="flex-grow p-6 bg-gray-100 overflow-auto">
      
      <!-- SELECTORES + DIAGRAMA EN UN SOLO CARD -->
      <div class="bg-white p-7 rounded shadow mb-6">
        <!-- Selectores + Botón Datos en la misma línea -->
        <div class="flex justify-between items-center gap-4 mb-4">
          <div class="flex gap-4">
            <button @click="groupBy = 'day'" :class="buttonClass('day')">Días</button>
            <button @click="groupBy = 'month'" :class="buttonClass('month')">Mes</button>
            <button @click="groupBy = 'year'" :class="buttonClass('year')">Año</button>
          </div>
          <button
            @click="showModal = true"
            class="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition shadow-sm hover:shadow-md"
            title="Ver Panel de Control"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Datos
          </button>
        </div>
        <p class="text-sm text-gray-500 mb-2 mt-4">
          Mostrando ventas por
          <span class="font-semibold">
            {{ groupBy === 'day' ? 'días' : groupBy === 'month' ? 'mes' : 'año' }}
          </span>
        </p>
        <!-- Diagrama debajo de los selectores -->
        <div class="mt-4 flex justify-center">
          <div class="w-full max-w-xl h-[280px]">
            <Line :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>

      <!-- TABLA DE VENTAS -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-medium mb-4">Detalles de ventas</h2>

        <div class="overflow-x-auto">
          <table class="w-full border border-gray-200 min-w-[600px]">
            <thead class="bg-gray-100">
              <tr>
                <th class="p-2 text-left">ID</th>
                <th class="p-2 text-left">Fecha</th>
                <th class="p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="sale in sales"
                :key="sale.id"
                class="border-t"
              >
                <td class="p-2">{{ sale.id }}</td>
                <td class="p-2">
                  {{ sale.createdAt ? new Date(sale.createdAt).toLocaleDateString() : 'N/A' }}
                </td>
                <td class="p-2 text-right font-semibold">
                  $ {{ sale.total ? sale.total.toLocaleString() : '0' }}
                </td>
              </tr>

              <tr v-if="!sales.length">
                <td colspan="3" class="p-4 text-center text-gray-500">
                  No hay ventas registradas
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL PANEL DE CONTROL -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Panel de Contro</h3>
          <button
            @click="showModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
          <svg class="w-5 h-5 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>

          </button>
        </div>

        <!-- Contenido -->
        <div class="space-y-4">
          <div class="bg-gradient-to-b from-green-50 to-green-100 rounded p-4">
            <p class="text-sm text-gray-600 mb-2">Ventas de hoy</p>
            <p class="text-3xl font-bold text-black">{{ sales.length }}</p>
          </div>
          <div class="bg-gradient-to-b from-purple-50 to-purple-100 rounded p-4">
            <p class="text-sm text-black-100 mb-2">Promedio por Venta</p>
            <p class="text-3xl font-bold text-black-100">
              ${{ sales.length > 0 ? Math.round(totalRevenue / sales.length).toLocaleString() : '0' }}
            </p>
          </div>
          <div class="bg-gradient-to-b from-blue-50 to-blue-100 rounded p-4">
               <p class="text-3xl font-bold text-black-100">
            $ {{ totalRevenue.toLocaleString() }}
            <h2 class="text-lg font-medium">Total vendido hasta hoy {{ currentDate }}</h2>
          </p>
          </div>

          <button
            @click="downloadExcel"
           class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"

          >
            Exportar Datos
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useSalesStore } from '@/modules/auth/stores/Sales.store';
import { Line } from 'vue-chartjs';
import * as XLSX from 'xlsx';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const salesStore = useSalesStore();

// Estado del modal
const showModal = ref(false);

/* 🔹 CARGAR VENTAS */
onMounted(() => {
  salesStore.fetchSales();
});

const groupBy = ref<'day' | 'month' | 'year'>('month');

/* VENTAS */
const sales = computed(() => salesStore.sales);

/* TOTAL */
const totalRevenue = computed(() => salesStore.totalRevenue);

const currentDate = computed(() => new Date().toLocaleDateString('es-ES'));

/* AGRUPADAS */
const groupedSales = computed(() => {
  const map: Record<string, number> = {};

  sales.value.forEach(sale => {
    const date = new Date(sale.createdAt);
    let key = '';

    if (groupBy.value === 'day') key = date.toLocaleDateString();
    if (groupBy.value === 'month') key = `${date.getMonth() + 1}/${date.getFullYear()}`;
    if (groupBy.value === 'year') key = `${date.getFullYear()}`;

    map[key] = (map[key] || 0) + sale.total;
  });

  return map;
});

/* CHART */
const chartData = computed(() => ({
  labels: Object.keys(groupedSales.value),
  datasets: [
    {
      label: 'Ventas ($)',
      data: Object.values(groupedSales.value),
      backgroundColor: '#3b82f6',
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const buttonClass = (type: 'day' | 'month' | 'year') => [
  'px-4 py-1 rounded font-medium transition',
  groupBy.value === type
    ? 'bg-blue-600 text-white'
    : 'bg-gray-200 hover:bg-gray-300',
];

const downloadExcel = () => {
  const data = sales.value.map(sale => ({
    ID: sale.id,
    Fecha: sale.createdAt ? new Date(sale.createdAt).toLocaleDateString() : 'N/A',
    Total: sale.total || 0,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');

  XLSX.writeFile(workbook, 'detalle_ventas.xlsx');
};
</script>