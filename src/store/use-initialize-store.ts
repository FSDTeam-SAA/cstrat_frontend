'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from './useCartStore';
import { useWishlistStore } from './useWishlistStore';
import { connectStores } from '';

// This hook is for demonstration purposes only
export function useInitializeStores() {
  const { items: cartItems, addItem: addToCart } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();
  const initialized = useRef(false);

  useEffect(() => {
    // Connect the stores only once
    if (!initialized.current) {
      connectStores();
      initialized.current = true;
    }

    // Only add sample data if stores are empty and we're in the browser
    if (typeof window !== 'undefined') {
      if (cartItems.length === 0) {
        // Add sample cart items
        const sampleCartItems = [
          {
            id: '1',
            name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
            price: 50,
            quantity: 1,
            image: '/images/image 5.png',
            brandName: 'ABC',
            size: 'XL',
            color: 'Black',
            selected: true,
          },
          {
            id: '2',
            name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
            price: 50,
            quantity: 2,
            image: '/images/image 5.png',
            brandName: 'AtoZ',
            size: 'XL',
            color: 'Red',
            selected: true,
          },
        ];

        // Add items one by one to prevent batch updates
        sampleCartItems.forEach((item) => addToCart(item));
      }

      if (wishlistItems.length === 0) {
        // Add sample wishlist items
        const sampleWishlistItems = [
          {
            id: '1',
            name: 'Black Stripes T-Shirt',
            price: 70,
            rating: 4.5,
            image: '/images/best-2.png',
          },
          {
            id: '2',
            name: "Men's Sports T-Shirt",
            price: 65,
            rating: 4.5,
            image: '/images/best-2.png',
          },
          {
            id: '3',
            name: "Women's Hoodie",
            price: 85,
            rating: 4.5,
            image: '/images/best-2.png',
          },
          {
            id: '4',
            name: 'Black Stripes T-Shirt',
            price: 70,
            rating: 4.5,
            image: '/images/best-2.png',
          },
        ];

        // Add items one by one to prevent batch updates
        sampleWishlistItems.forEach((item) => addToWishlist(item));
      }
    }
  }, [cartItems.length, wishlistItems.length, addToCart, addToWishlist]);
}
