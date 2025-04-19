'use client';

import { useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';
import { useFilterStore } from '@/store/filter-store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ProductGrid() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);

  // Get filter state from Zustand store
  const { minPrice, maxPrice, status, page, limit, sortBy, setPage, setCategory, setSubcategory } = useFilterStore();
  // 👇 Extract category and subcategory from pathname
  const { category, subcategory } = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean); // remove empty strings
    const category = segments[1] || ''; // assuming /shop/:category/:subcategory
    const subcategory = segments[2] || '';
    return { category, subcategory };
  }, [pathname]);
  // Set category and subcategory in the store based on URL params
  useEffect(() => {
    setCategory(category);
    setSubcategory(subcategory.toLowerCase().replace(/\s+/g, '-'));
  }, [category, subcategory, setCategory, setSubcategory]);

  // Query products
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', category, subcategory, minPrice, maxPrice, status, page, limit, sortBy],
    queryFn: () =>
      getProducts({
        category,
        subcategory,
        minPrice,
        maxPrice,
        status,
        page,
        limit,
        sortBy,
      }),
    staleTime: 5000, // Adjust the time (in milliseconds) as needed
    enabled: !!category, // wait until category is extracted
  });

  const scrollToTop = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // update URL page param when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    window.history.replaceState({}, '', `${pathname}?${params}`);
  }, [page, pathname, searchParams]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="space-y-6" ref={gridRef}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={`skeleton-${index}`} className="animate-pulse rounded-lg border">
              <div className="relative aspect-square bg-gray-200"></div>
              <div className="space-y-3 p-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-4 w-4 rounded-full bg-gray-200"></div>
                  ))}
                  <div className="ml-1 h-4 w-16 rounded bg-gray-200"></div>
                </div>
                <div className="h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="flex items-center justify-between">
                  <div className="h-7 w-20 rounded bg-gray-200"></div>
                  <div className="h-9 w-9 rounded-full bg-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="py-12 text-center">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error instanceof Error ? error.message : 'Failed to load products'}</AlertDescription>
        </Alert>
        <Button onClick={() => refetch()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  const products = data?.data?.products || [];
  const totalPages = data?.data?.totalPages || 1;

  // If no products match filters
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-2 text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find what you&apos;re looking for.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={gridRef}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="group overflow-hidden rounded-lg border">
            <div className="relative">
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.media.images[0] || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
              </Link>
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
              <h3 className="mb-1 line-clamp-1 text-lg font-bold">{product.name}</h3>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) {
                    setPage(page - 1);
                    scrollToTop();
                  }
                }}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              // Show first page, last page, current page, and pages around current
              const shouldShowPage =
                pageNumber === 1 || pageNumber === totalPages || (pageNumber >= page - 1 && pageNumber <= page + 1);

              if (!shouldShowPage && pageNumber === 2) {
                return (
                  <PaginationItem key="ellipsis-start">
                    <span className="px-4">...</span>
                  </PaginationItem>
                );
              }

              if (!shouldShowPage && pageNumber === totalPages - 1) {
                return (
                  <PaginationItem key="ellipsis-end">
                    <span className="px-4">...</span>
                  </PaginationItem>
                );
              }

              if (!shouldShowPage) return null;

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(pageNumber);
                      scrollToTop();
                    }}
                    isActive={page === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) {
                    setPage(page + 1);
                    scrollToTop();
                  }
                }}
                className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
