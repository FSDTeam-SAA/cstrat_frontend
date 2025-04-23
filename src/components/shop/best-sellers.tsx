'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  totalQuantitySold: number;
  sizes?: string[];
  colors?: string[];
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders/best-selling-products`;

export default function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }
    return 4;
  };

  // Fetch products with React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['bestSellingProducts'],
    queryFn: async () => {
      const res = await fetch(API_URL);
      const json = await res.json();
      return json.data as Product[];
    },
  });

  const products = data ?? [];
  const maxIndex = Math.max(0, products.length - visibleItems);

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current && products.length > 0) {
      const itemWidth = scrollContainerRef.current.scrollWidth / products.length;
      scrollContainerRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, products.length]);

  // Add to cart
  // const addToCart = async () => {
  //   try {
  //     if (!productData) {
  //       throw new Error('Product data not available');
  //     }

  //     if (!selectedSize) {
  //       alert('Please select a size');
  //       return;
  //     }

  //     // Generate previews for front and back
  //     let frontPreview = null;
  //     let backPreview = null;

  //     try {
  //       if (frontLogo.logoUrl) {
  //         // Temporarily switch to front view to generate preview
  //         const currentIndex = selectedImageIndex;
  //         setSelectedImageIndex(0);
  //         frontPreview = await generatePreviewImage();
  //         setSelectedImageIndex(currentIndex);
  //       }

  //       if (backLogo.logoUrl) {
  //         // Temporarily switch to back view to generate preview
  //         const currentIndex = selectedImageIndex;
  //         setSelectedImageIndex(1);
  //         backPreview = await generatePreviewImage();
  //         setSelectedImageIndex(currentIndex);
  //       }
  //     } catch (previewError) {
  //       console.error('Error generating preview images:', previewError);
  //       // Continue without previews if they fail
  //     }

  //     // Create cart item with all customizations
  //     const cartItem = {
  //       productId: productData._id,
  //       name: productData.name,
  //       price: productData.price,
  //       color: selectedColor,
  //       size: selectedSize,
  //       quantity,
  //       frontCustomization: {
  //         logoUrl: frontLogo.logoUrl,
  //         position: frontLogo.position,
  //         size: frontLogo.size,
  //         rotation: frontLogo.rotation,
  //         preview: frontPreview,
  //       },
  //       backCustomization: {
  //         logoUrl: backLogo.logoUrl,
  //         position: backLogo.position,
  //         size: backLogo.size,
  //         rotation: backLogo.rotation,
  //         preview: backPreview,
  //       },
  //     };

  //     console.log('Adding to cart:', cartItem);

  //     // Add to cart using the Zustand store
  //     useCartStore.getState().addItem(cartItem);
  //     toast.success(`Added ${quantity} ${productData.name} to cart!`);
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //     toast.error('Failed to add to cart. Please try again.');
  //   }
  // };

  const scrollPrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const scrollNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section className="w-full overflow-hidden py-12" id="best-sellers">
      <div className="container px-4">
        <h2 className="mb-8 border-b pb-2 text-2xl font-bold uppercase md:text-3xl">BEST SELLERS</h2>

        {isLoading ? (
          <p>Loading best sellers...</p>
        ) : isError ? (
          <p>Failed to load products.</p>
        ) : (
          <div className="relative">
            <div ref={scrollContainerRef} className="flex gap-4 overflow-x-hidden">
              {products.map((product) => (
                <div key={product._id} className="w-full flex-shrink-0 px-1 sm:w-1/2 lg:w-1/4">
                  <div className="group relative overflow-hidden rounded-lg">
                    <div className="relative aspect-[270/330] w-full">
                      <Link href={`/product/${product._id}`} className="block h-full w-full">
                        <Image
                          src={product.images?.[0] || '/placeholder.svg'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-3">
                      <div>
                        <h3 className="text-lg font-[600] uppercase leading-[120%] md:text-[20px]">{product.name}</h3>
                        <p className="text-base font-[600] md:text-[20px]">${product.price}</p>
                      </div>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-lg bg-black text-white hover:bg-gray-800"
                        onClick={() => {
                          // Create a cart item with default values
                          const cartItem = {
                            productId: product._id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image: product.images?.[0] || '/placeholder.svg',
                            size: product.sizes?.[0] || 'M', // Default size
                            color: product.colors?.[0] || null, // Default color
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

                          // Add to cart using the Zustand store
                          useCartStore.getState().addItem(cartItem);
                          toast.success(`Added ${product.name} to cart!`);
                        }}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Add to cart</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'absolute left-2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white sm:-left-12',
                currentIndex === 0 && 'cursor-not-allowed opacity-50',
              )}
              onClick={scrollPrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'absolute right-2 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white sm:-right-12',
                currentIndex === maxIndex && 'cursor-not-allowed opacity-50',
              )}
              onClick={scrollNext}
              disabled={currentIndex === maxIndex}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
