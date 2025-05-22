'use client';

import type React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/use-wishlist-store';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlistStore();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the first size and color if available
    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M';
    const color = product.colors && product.colors.length > 0 ? product.colors[0] : null;

    const cartItem = {
      id: product._id,
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.media?.images?.[0] || '/placeholder.svg',
      brandName: product.category?.categoryName || 'Brand Name',
      size, // Store as a simple string, not a JSON string
      color: color?.color || null,
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

    addToCart(cartItem);
    console.log('Added to cart:', cartItem);
    alert(`Added ${product.name} to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeItem(product._id);
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.media?.images?.[0] || '/placeholder.svg',
        rating: product.rating || 5,
      });
    }
  };
  console.log('Image', product.colors[0].images[0]);

  return (
    <div
      className="group relative overflow-hidden rounded-lg border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={`/product/${product._id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.media?.images?.[0] || product.colors[0].images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </Link>

        {/* Wishlist button */}
        <button
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white"
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
        </button>

        {/* Add to cart overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/70 p-2 text-white transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            className="flex w-full items-center justify-center gap-2"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm font-medium">Add to Cart</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < (product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">{product.rating || 0}/5</span>
        </div>

        <h3 className="mb-1 truncate font-medium">{product.name}</h3>

        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
