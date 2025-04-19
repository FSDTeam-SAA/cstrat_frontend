import { useCartStore } from './useCartStore';
import { useWishlistStore } from './use-wishlist-store';
import type { CartItem } from '@/types/cart';

// Connect the wishlist store's moveToCart function to the cart store
export function connectStores() {
  // const originalMoveToCart = useWishlistStore.getState().moveToCart;

  // Override the moveToCart function to add the item to cart
  useWishlistStore.setState({
    moveToCart: (id, options = {}) => {
      const { size = 'M', color = 'Black', quantity = 1 } = options;
      const item = useWishlistStore.getState().items.find((item) => item.id === id);

      if (item) {
        const cartItem: CartItem = {
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity,
          image: item.image,
          brandName: 'Brand', // Default value
          size,
          color,
          selected: true,
          frontCustomization: {
            logoUrl: null,
            position: { x: 50, y: 30 },
            size: 20,
            rotation: 0,
            preview: null,
          },
          backCustomization: {
            logoUrl: null,
            position: { x: 50, y: 30 },
            size: 20,
            rotation: 0,
            preview: null,
          },
        };

        useCartStore.getState().addItem(cartItem);
        useWishlistStore.getState().removeItem(id);
      }
    },
  });

  // Connect the cart store's moveToWishlist function to the wishlist store
  // const originalMoveToWishlist = useCartStore.getState().moveToWishlist;

  useCartStore.setState({
    moveToWishlist: (productId) => {
      const item = useCartStore.getState().items.find((item) => item.productId === productId);

      if (item) {
        useWishlistStore.getState().addItem({
          id: productId,
          name: item.name,
          price: item.price,
          image: item.image || '/placeholder.svg',
          rating: 5, // Default rating
        });
        useCartStore.getState().removeItem(productId);
      }
    },
  });
}
