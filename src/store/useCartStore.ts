import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, CartSummary } from '@/types/cart';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleSelected: (id: string) => void;
  toggleSelectAll: (selected: boolean) => void;
  moveToWishlist: (id: string) => void;
  clearCart: () => void;
  getSummary: () => CartSummary;
  getSelectedItems: () => CartItem[];
  isItemSelected: (id: string) => boolean;
  areAllItemsSelected: () => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (i) => i.id === item.id && i.size === item.size && i.color === item.color,
        );

        if (existingItemIndex !== -1) {
          // Create a new array with the updated item
          const newItems = [...items];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + (item.quantity || 1),
          };
          set({ items: newItems });
        } else {
          set({ items: [...items, { ...item, selected: true }] });
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return; // Prevent invalid quantities

        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
      },

      toggleSelected: (id) => {
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
        }));
      },

      toggleSelectAll: (selected) => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, selected })),
        }));
      },

      moveToWishlist: (id) => {
        // This will be implemented when we connect to the wishlist store
        // For now, just remove from cart
        get().removeItem(id);
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSummary: () => {
        const items = get().items;
        const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Could add tax calculation, shipping costs, etc. here
        const shipping = 0; // Free shipping

        return {
          subtotal,
          shipping,
          total: subtotal + shipping,
          itemCount: items.reduce((count, item) => count + item.quantity, 0),
        };
      },

      getSelectedItems: () => {
        return get().items.filter((item) => item.selected);
      },

      isItemSelected: (id) => {
        const item = get().items.find((item) => item.id === id);
        return item ? !!item.selected : false;
      },

      areAllItemsSelected: () => {
        const { items } = get();
        return items.length > 0 && items.every((item) => item.selected);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
