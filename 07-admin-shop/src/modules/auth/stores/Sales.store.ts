import { defineStore } from 'pinia';
import { tesloApi } from '@/api/tesloApi';

export interface SaleItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  createdAt: string;
}

export const useSalesStore = defineStore('sales', {
  state: () => ({
    sales: [] as Sale[],
    loading: false,
  }),
  getters: {
    totalRevenue: (state) =>
      Array.isArray(state.sales)
        ? state.sales.reduce((sum, sale) => sum + sale.total, 0)
        : 0,
  },
  actions: {
    /* 🔹 CARGAR VENTAS */
    async fetchSales() {
      this.loading = true;
      try {
        const res = await tesloApi.get('/sales');
        // 🔒 NORMALIZAR RESPUESTA
        const sales = res.data?.sales ?? res.data?.data ?? res.data;
        this.sales = Array.isArray(sales) ? sales.filter(s => s != null) : [];
      } catch (error) {
        console.error('Error cargando ventas', error);
        this.sales = [];
      } finally {
        this.loading = false;
      }
    },

    /* 🔹 GUARDAR VENTA */
    async addSale(items: SaleItem[], total: number) {
      try {
        const res = await tesloApi.post('/sales', { items, total });
        const sale = res.data?.sale ?? res.data;
        if (sale && sale.total != null) {
          this.sales.unshift(sale); // aparece instantáneo en la vista
        }
      } catch (error) {
        console.error('Error guardando venta', error);
      }
    },
  },
});
