import { useCartStore } from './use-cart-store';
import { useWishlistStore } from './use-wishlist-store';
import type { CartItem } from '@/types/cart';

// Connect the wishlist store's moveToCart function to the cart store
export function connectStores() {
  const originalMoveToCart = useWishlistStore.getState().moveToCart;

  // Override the moveToCart function to add the item to cart
  useWishlistStore.setState({
    moveToCart: (id, options = {}) => {
      const { size = 'M', color = 'Black', quantity = 1 } = options;
      const item = useWishlistStore.getState().items.find((item) => item.id === id);

      if (item) {
        const cartItem: CartItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          image: item.image,
          brandName: 'Brand', // Default value
          size,
          color,
          selected: true,
        };

        useCartStore.getState().addItem(cartItem);
        useWishlistStore.getState().removeItem(id);
      }
    },
  });

  // Connect the cart store's moveToWishlist function to the wishlist store
  const originalMoveToWishlist = useCartStore.getState().moveToWishlist;

  useCartStore.setState({
    moveToWishlist: (id) => {
      const item = useCartStore.getState().items.find((item) => item.id === id);

      if (item) {
        useWishlistStore.getState().addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          rating: 5, // Default rating
        });
        useCartStore.getState().removeItem(id);
      }
    },
  });
}
