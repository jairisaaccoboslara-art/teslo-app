import { defineStore } from 'pinia';
import type { Product } from '@/modules/products/interface/product.interface';

interface CartItem extends Product {
  quantity: number;
  size: string;
  discountedPrice?: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as CartItem[],
  }),

  getters: {
    totalItems: (state) =>
      state.cart.reduce((total, item) => total + item.quantity, 0),
  },

  actions: {
    /* 🛒 AGREGAR AL CARRITO (con talla) */
    addToCart(payload: {
      product: Product;
      quantity: number;
      size: string;
      discountedPrice?: number;
    }) {
      const { product, quantity, size, discountedPrice } = payload;

      const exists = this.cart.find(
        (p) =>
          String(p.id) === String(product.id) &&
          p.size === size
      );

      if (!exists) {
        this.cart.push({
          ...product,
          quantity,
          size,
          discountedPrice,
        });
      } else {
        exists.quantity += quantity;
      }

      this.saveToLocalStorage();
    },

    /* ❌ ELIMINAR PRODUCTO (por id + talla) */
    removeFromCart(productId: string | number, size: string) {
      const cleanId = String(productId);

      this.cart = this.cart.filter(
        (p) =>
          String(p.id) !== cleanId || p.size !== size
      );

      this.saveToLocalStorage();
    },

    clearCart() {
      this.cart = [];
      this.saveToLocalStorage();
    },

    loadFromLocalStorage() {
      try {
        const stored = localStorage.getItem('cart');
        this.cart = stored ? JSON.parse(stored) : [];
      } catch {
        this.cart = [];
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      } catch {
        // silencioso
      }
    },
  },
});
;
