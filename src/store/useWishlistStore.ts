import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCartStore, type CartItem } from './useCartStore';

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  moveToCart: (id: string, quantity: number, color: string, size: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.productId === item.productId);

        if (!existingItem) {
          set({ items: [...items, { ...item, id: `${item.productId}-${Date.now()}` }] });
        }
      },

      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== id) });
      },

      moveToCart: (id, quantity, color, size) => {
        const { items } = get();
        const item = items.find((item) => item.id === id);

        if (item) {
          const cartItem: CartItem = {
            id: `${item.productId}-${color}-${size}-${Date.now()}`,
            productId: item.productId,
            name: item.name,
            price: item.price,
            color,
            size,
            quantity,
            image: item.image,
            selected: true,
          };

          useCartStore.getState().addItem(cartItem);
          set({ items: items.filter((i) => i.id !== id) });
        }
      },

      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item.productId === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    },
  ),
);
