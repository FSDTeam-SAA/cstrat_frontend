'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  isWishlisted?: boolean;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: "Men's Sports T-Shirt",
      price: 25,
      rating: 4.5,
      image: '/images/best-2.png',
      isWishlisted: false,
    },
    {
      id: '2',
      name: "Women's Hoodie",
      price: 25,
      rating: 4,
      image: '/images/image 1.png',
      isWishlisted: false,
    },
    {
      id: '3',
      name: 'Black Stripes T-Shirt',
      price: 70,
      rating: 4.5,
      image: '/images/best-2.png',
      isWishlisted: true,
    },
    {
      id: '4',
      name: 'Running Shoes',
      price: 120,
      rating: 5,
      image: '/images/image 1.png',
      isWishlisted: false,
    },
    {
      id: '5',
      name: 'Wireless Headphones',
      price: 85,
      rating: 4,
      image: '/images/best-2.png',
      isWishlisted: false,
    },
    {
      id: '6',
      name: 'Water Bottle',
      price: 15,
      rating: 4.5,
      image: '/images/image 1.png',
      isWishlisted: false,
    },
  ]);

  const toggleWishlist = (id: string) => {
    setProducts(
      products.map((product) => (product.id === id ? { ...product, isWishlisted: !product.isWishlisted } : product)),
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="group overflow-hidden rounded-lg border">
          <div className="relative">
            <Link href={`/shop/product/${product.id}`}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 rounded-full bg-white/80 hover:bg-white"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={`h-5 w-5 ${product.isWishlisted ? 'fill-black text-black' : ''}`} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          <div className="p-4">
            <div className="mb-1 flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : i < product.rating
                        ? 'fill-yellow-400 text-yellow-400 opacity-50'
                        : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-500">{product.rating}/5</span>
            </div>
            <h3 className="mb-1 text-lg font-bold">{product.name}</h3>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              <Button size="icon" className="rounded-full bg-black text-white hover:bg-gray-800">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
