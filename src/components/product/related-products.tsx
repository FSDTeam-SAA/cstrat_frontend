'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRelatedProducts } from '@/hooks/use-product';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedProductsProps {
  productId: string;
  category?: string;
  subcategory?: string;
}

export default function RelatedProducts({ productId, category, subcategory }: RelatedProductsProps) {
  const { data: relatedProducts, isLoading, error } = useRelatedProducts(productId, category, subcategory);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-lg border">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/4" />
              <Skeleton className="mt-2 h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Failed to load related products</div>;
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return <div className="text-center text-muted-foreground">No related products found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {relatedProducts.map((product) => (
        <div key={product._id} className="group relative flex flex-col overflow-hidden rounded-lg border">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.media?.images?.[0] || '/placeholder.svg'}
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
                  fill={i < (product.rating || 0) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-3 w-3 ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-muted-foreground">{product.rating || 0}</span>
              {product.reviewCount > 0 && (
                <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
              )}
            </div>
            {!product.inStock && <span className="mt-1 text-xs text-red-500">Out of stock</span>}
          </div>
          <Link href={`/product/${product._id}`} className="absolute inset-0">
            <span className="sr-only">View product details</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
