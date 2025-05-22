/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/use-wishlist-store';
import { connectStores } from '@/store/store-connector';

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
      console.log('Stores connected');
    }

    // Only add sample data if stores are empty and we're in the browser
    if (typeof window !== 'undefined' && !localStorage.getItem('cart-storage')) {
      console.log('No existing cart data found, adding sample data');

      if (cartItems.length === 0) {
        // Add sample cart items
        const sampleCartItems = [
          {
            id: '1',
            productId: '1',
            name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
            price: 50,
            quantity: 1,
            image: '/images/image 5.png',
            brandName: 'ABC',
            size: 'XL',
            color: 'Black',
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
          },
          {
            id: '2',
            productId: '2',
            name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
            price: 50,
            quantity: 2,
            image: '/images/image 5.png',
            brandName: 'AtoZ',
            size: 'XL',
            color: 'Red',
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
          },
        ];

        // Add items one by one to prevent batch updates
        sampleCartItems.forEach((item) => addToCart(item));
      }
    } else {
      console.log('Existing cart data found:', localStorage.getItem('cart-storage'));
    }
  }, [cartItems.length, addToCart, addToWishlist]);
}
