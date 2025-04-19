import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FilterState {
  // Filter parameters
  category: string | null;
  subcategory: string | null;
  status: string;
  page: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
  sortBy: string;

  // Actions
  setCategory: (category: string | null) => void;
  setSubcategory: (subcategory: string | null) => void;
  setStatus: (status: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setPriceRange: (min: number, max: number) => void;
  setSortBy: (sortBy: string) => void;
  resetFilters: () => void;
}

// Default filter values
const DEFAULT_FILTERS = {
  category: null,
  subcategory: null,
  status: 'all',
  page: 1,
  limit: 20,
  minPrice: 0,
  maxPrice: 1000,
  sortBy: 'all',
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      // Initial state
      ...DEFAULT_FILTERS,

      // Actions
      setCategory: (category) => set({ category, page: 1 }), // Reset page when changing category
      setSubcategory: (subcategory) => set({ subcategory, page: 1 }), // Reset page when changing subcategory
      setStatus: (status) => set({ status, page: 1 }), // Reset page when changing status
      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit, page: 1 }), // Reset page when changing limit
      setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice, page: 1 }), // Reset page when changing price range
      setSortBy: (sortBy) => set({ sortBy, page: 1 }), // Reset page when changing sort
      resetFilters: () => set({ ...DEFAULT_FILTERS }),
    }),
    {
      name: 'product-filters', // Name for localStorage
      partialize: (state) => ({
        // Only persist these fields
        minPrice: state.minPrice,
        maxPrice: state.maxPrice,
        status: state.status,
        limit: state.limit,
        sortBy: state.sortBy,
      }),
    },
  ),
);
