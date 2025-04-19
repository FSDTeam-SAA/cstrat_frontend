import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WishlistItem } from '@/types/wishlist';

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  moveToCart: (id: string, options?: { size?: string; color?: string; quantity?: number }) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        // Only add if not already in wishlist
        if (!items.some((i) => i.id === item.id)) {
          set({ items: [...items, item] });
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      moveToCart: (id, options = {}) => {
        const { size = 'M', color = 'Black', quantity = 1 } = options;
        const item = get().items.find((item) => item.id === id);

        if (item) {
          // This will be connected to the cart store when we import it
          // For now, just remove from wishlist
          get().removeItem(id);
        }
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
