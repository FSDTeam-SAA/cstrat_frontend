import { create } from 'zustand'


export interface ProductColor {
    name: string
    hex: string
    images: string[]
    _id: string
  }
  
  export interface ProductCategory {
    _id: string
    categoryName: string
    description: string
  }
  
  export interface ProductSubCategory {
    _id: string
    subCategoryName: string
    description: string
  }
  
  export interface Product {
    _id: string
    name: string
    description: string
    price: number
    discountParcentage: number
    category: ProductCategory
    subcategory: ProductSubCategory
    type: string
    status: string
    sustainability: string
    rating: number
    reviewCount: number
    popularity: number
    quantity: number
    inStock: boolean
    isCustomizable: boolean
    sizes: string[]
    colors: ProductColor[]
    sku: string
    createdAt: string
    updatedAt: string
  }
  

interface WishlistState {
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  addToWishlist: (product) => {
    const currentWishlist = get().wishlist
    if (!currentWishlist.some(item => item._id === product._id)) {
      set({ wishlist: [...currentWishlist, product] })
    }
  },
  removeFromWishlist: (productId) => {
    set((state) => ({
      wishlist: state.wishlist.filter(item => item._id !== productId)
    }))
  },
  isInWishlist: (productId) => {
    return get().wishlist.some(item => item._id === productId)
  }
}))

export default useWishlistStore
