'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedProductsProps {
  category?: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Product {
  colors?: {
    images?: string[];
    color?: string;
  }[];
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  media?: {
    images?: string[];
  };
}

export default function RelatedProducts({ category }: RelatedProductsProps) {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['related-products', category],
    queryFn: async () => {
      if (!category) return [];
      const res = await fetch(`${BACKEND_URL}/api/v1/products/getallproducts?category=${category}`);
      if (!res.ok) throw new Error('Failed to fetch related products');
      const json = await res.json();
      return json.data.products as Product[];
    },
    enabled: !!category,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-lg border">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Failed to load related products</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center text-muted-foreground">No related products found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((product) => (
        <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-lg border">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.media?.images?.[0] || product.colors?.[0].images?.[0] || '/placeholder.jpg'}
              alt={product.name}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2">
              <Button size="icon" variant="secondary" className="rounded-full bg-background shadow-sm">
                <Heart className="h-4 w-4" />
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
            {!product.inStock && <span className="mt-1 text-xs text-red-500">Out of stock</span>}
          </div>
          <Link href={`/product/${product.id}`} className="absolute inset-0">
            <span className="sr-only">View product details</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
