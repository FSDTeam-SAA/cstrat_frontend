// stores/wishlistStore.ts
import { create } from 'zustand';
// types/product.ts

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountParcentage: number;
    media: {
      images: string[];
      videos: string[];
    };
    category: {
      _id: string;
      categoryName: string;
      description: string;
    };
    subcategory: {
      _id: string;
      subCategoryName: string;
      description: string;
    };
    type: string;
    status: string;
    sustainability: string;
    rating: number;
    reviewCount: number;
    popularity: number;
    quantity: number;
    inStock: boolean;
    isCustomizable: boolean;
    sizes: string[];
    colors: string[];
    sku: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
interface WishlistState {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],

  addToWishlist: (product) => {
    const exists = get().wishlist.find((item) => item._id === product._id);
    if (!exists) {
      set((state) => ({
        wishlist: [...state.wishlist, product],
      }));
    }
  },

  removeFromWishlist: (productId) => {
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item._id !== productId),
    }));
  },
}));
