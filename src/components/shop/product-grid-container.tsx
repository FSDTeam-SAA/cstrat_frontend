'use client';

import { useState, useEffect, useRef } from 'react';
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
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/lib/data';

interface CategoryData {
  name: string;
  slug: string;
  productCount: number;
  subcategories?: string[];
}

export default function ProductGrid({ category, subcategory }: { category: CategoryData; subcategory: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current page from URL or default to 1
  const currentPageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(currentPageParam ? Number.parseInt(currentPageParam) : 1);

  const gridRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToTop = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get filter values from URL
  const minPrice = searchParams.get('minPrice') || '0';
  const maxPrice = searchParams.get('maxPrice') || '200';
  const minimum = searchParams.get('minimum') || 'all';
  const type = searchParams.get('type') || 'all';
  const sustainability = searchParams.get('sustainability') || 'all';
  const sortBy = searchParams.get('sortBy') || 'all';

  const productsPerPage = 9;

  // Filter products based on URL parameters
  const filteredProducts = products.filter((product) => {
    // Filter by category and subcategory
    if (product.category !== category.slug) return false;
    if (product.subcategory !== subcategory.toLowerCase().replace(/\s+/g, '-')) return false;

    // Filter by price
    if (product.price < Number.parseInt(minPrice) || product.price > Number.parseInt(maxPrice)) return false;

    // Filter by minimum (this is a placeholder - adjust based on your actual data structure)
    if (minimum !== 'all') {
      const minimumValue = Number.parseInt(minimum.split('-')[0]);
      if (minimumValue === 41 && product.quantity <= 40) return false;
      if (minimumValue === 40 && product.quantity > 40) return false;
      if (minimumValue === 30 && product.quantity > 30) return false;
      if (minimumValue === 20 && product.quantity > 20) return false;
      if (minimumValue === 10 && product.quantity > 10) return false;
    }

    // Filter by type (this is a placeholder - adjust based on your actual data structure)
    if (type !== 'all' && product.type !== type) return false;

    // Filter by sustainability (this is a placeholder - adjust based on your actual data structure)
    if (sustainability !== 'all' && product.sustainability !== sustainability) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'popular') return b.popularity - a.popularity;
    return 0;
  });

  // Calculate pagination
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const currentProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', currentPage.toString());

    // Update URL without refreshing the page
    router.push(`?${params.toString()}`, { scroll: false });
  }, [currentPage, router, searchParams]);

  // Reset loading state after data changes
  useEffect(() => {
    // Short timeout to ensure the loading state is visible
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage]);

  // If no products match filters
  if (currentProducts.length === 0) {
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
        {isLoading
          ? // Skeleton loading UI
            Array.from({ length: productsPerPage }).map((_, index) => (
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
            ))
          : currentProducts.map((product) => (
              <div key={product.id} className="group overflow-hidden rounded-lg border">
                <div className="relative">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    setIsLoading(true);
                    setCurrentPage(currentPage - 1);
                    scrollToTop();
                  }
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              // Show first page, last page, current page, and pages around current
              const shouldShowPage =
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

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
                      setIsLoading(true);
                      setCurrentPage(pageNumber);
                      scrollToTop();
                    }}
                    isActive={currentPage === pageNumber}
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
                  if (currentPage < totalPages) {
                    setIsLoading(true);
                    setCurrentPage(currentPage + 1);
                    scrollToTop();
                  }
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
