import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, CartSummary, DeliveryInformation } from '@/types/cart';

interface CartStore {
  items: CartItem[];
  deliveryInfo: DeliveryInformation | null;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelected: (productId: string) => void;
  toggleSelectAll: (selected: boolean) => void;
  moveToWishlist: (productId: string) => void;
  clearCart: () => void;
  getSummary: () => CartSummary;
  getSelectedItems: () => CartItem[];
  isItemSelected: (productId: string) => boolean;
  areAllItemsSelected: () => boolean;
  setDeliveryInfo: (info: DeliveryInformation) => void;
  getDeliveryInfo: () => DeliveryInformation | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      deliveryInfo: null,

      addItem: (item) => {
        console.log('Adding item to cart:', item);
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (i) => i.productId === item.productId && i.size === item.size && i.color === item.color,
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

        console.log('Cart after adding item:', [...get().items]);
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return; // Prevent invalid quantities

        set((state) => ({
          items: state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        }));
      },

      toggleSelected: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, selected: !item.selected } : item,
          ),
        }));
      },

      toggleSelectAll: (selected) => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, selected })),
        }));
      },

      moveToWishlist: (productId) => {
        // This will be implemented when we connect to the wishlist store
        // For now, just remove from cart
        get().removeItem(productId);
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
          selectedItemCount: items.filter((item) => item.selected).length,
        };
      },

      getSelectedItems: () => {
        return get().items.filter((item) => item.selected);
      },

      isItemSelected: (productId) => {
        const item = get().items.find((item) => item.productId === productId);
        return item ? !!item.selected : false;
      },

      areAllItemsSelected: () => {
        const { items } = get();
        return items.length > 0 && items.every((item) => item.selected);
      },

      setDeliveryInfo: (info) => {
        set({ deliveryInfo: info });
      },

      getDeliveryInfo: () => {
        return get().deliveryInfo;
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, deliveryInfo: state.deliveryInfo }),
      // Add debugging to see what's being stored
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrated cart state:', state);
      },
    },
  ),
);
