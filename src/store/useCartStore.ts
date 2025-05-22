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
        const { items } = get();

        // Check if the item already exists with same productId, size, and color
        const existingItemIndex = items.findIndex(
          (existingItem) =>
            existingItem.productId === item.productId &&
            existingItem.size === item.size &&
            existingItem.color === item.color,
        );

        if (existingItemIndex !== -1) {
          // If item exists, update its quantity
          const updatedItems = [...items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + item.quantity,
          };

          set({ items: updatedItems });
          return;
        }

        // If item doesn't exist, add it as new
        const uniqueId = `${item.productId}-${item.size}-${item.color}`;
        set({
          items: [
            ...items,
            {
              ...item,
              id: uniqueId,
              selected: true,
            },
          ],
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity, selected: true } : item,
          ),
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
        const selectedItems = items.filter((item) => item.selected);

        const subtotal = selectedItems.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);

        const shipping = 0; // Free shipping or implement your shipping logic

        return {
          subtotal,
          shipping,
          total: subtotal + shipping,
          itemCount: items.reduce((count, item) => count + item.quantity, 0),
          selectedItemCount: selectedItems.length,
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
