'use client';

import type React from 'react';

import { useCallback } from 'react';
import Image from 'next/image';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useWishlistStore } from '@/store/use-wishlist-store';
import type { WishlistItem as WishlistItemType } from '@/types/wishlist';

interface WishlistItemProps {
  item: WishlistItemType;
}

export default function WishlistItem({ item }: WishlistItemProps) {
  const { removeItem, moveToCart } = useWishlistStore();

  const handleRemoveFromWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      removeItem(item.id);
    },
    [removeItem, item.id],
  );

  const handleMoveToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      moveToCart(item.id, { size: 'M', color: 'Black', quantity: 1 });
    },
    [moveToCart, item.id],
  );

  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <div className="relative">
        <Link href={`/product/${item.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </Link>

        {/* Move to Cart button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <button
            className="flex items-center gap-2 rounded-md bg-white/90 px-4 py-2 text-black shadow-md transition-colors hover:bg-white"
            onClick={handleMoveToCart}
            aria-label="Move to cart"
          >
            <ShoppingCart className="h-4 w-4" />
            Move to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < item.rating ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">{item.rating}/5</p>
        </div>

        <h3 className="mb-1 truncate text-lg font-bold">{item.name}</h3>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">${item.price.toFixed(2)}</p>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition-colors hover:bg-gray-800"
            onClick={handleRemoveFromWishlist}
            aria-label="Remove from wishlist"
          >
            <Heart className="fill-white text-xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
