'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';

interface RelatedProductsProps {
  category: string;
  subcategory: string;
  currentProductId: string;
}

export default function RelatedProducts({ category, subcategory, currentProductId }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<typeof products>([]);

  useEffect(() => {
    // Filter products by category and subcategory, excluding current product
    const filtered = products
      .filter(
        (product) =>
          product.id !== currentProductId && (product.category === category || product.subcategory === subcategory),
      )
      .slice(0, 4); // Limit to 4 products

    setRelatedProducts(filtered);
  }, [category, subcategory, currentProductId]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {relatedProducts.map((product) => (
        <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-lg border">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2">
              <Button size="icon" variant="secondary" className="rounded-full bg-background shadow-sm">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-black/70 p-2 text-white transition-transform group-hover:translate-y-0">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Add to Cart</span>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <h3 className="font-medium">{product.name}</h3>
            <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
            <div className="mt-1 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={i < 4 ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-3 w-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-muted-foreground">4.0</span>
            </div>
          </div>
          <Link href={`/product/${product.id}`} className="absolute inset-0">
            <span className="sr-only">View product details</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
