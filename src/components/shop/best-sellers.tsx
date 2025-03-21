'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: '1',
      name: 'MEN SPORTS T-SHIRT',
      category: 'men',
      price: 25,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      id: '2',
      name: 'WOMAN RUNNING KIT',
      category: 'women',
      price: 25,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      id: '3',
      name: 'WOMEN HOODIE',
      category: 'women',
      price: 25,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      id: '4',
      name: 'WOMEN HOODIE',
      category: 'women',
      price: 25,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      id: '5',
      name: 'MEN JACKET',
      category: 'men',
      price: 35,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      id: '6',
      name: 'UNISEX BACKPACK',
      category: 'accessories',
      price: 45,
      image: '/placeholder.svg?height=400&width=300',
    },
  ];

  // Calculate how many items to show based on screen size
  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }
    return 4; // Default for SSR
  };

  const [visibleItems, setVisibleItems] = useState(4);
  const maxIndex = Math.max(0, products.length - visibleItems);

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.scrollWidth / products.length;
      scrollContainerRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, products.length]);

  return (
    <section className="w-full overflow-hidden py-12">
      <div className="container px-4">
        <h2 className="mb-8 border-b pb-2 text-2xl font-bold uppercase md:text-3xl">BEST SELLERS</h2>
        <div className="relative">
          <div ref={scrollContainerRef} className="flex gap-4 overflow-x-hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[calc(100%/1)] flex-shrink-0 px-1 sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/4)]"
              >
                <div className="group relative overflow-hidden rounded-lg border">
                  <div className="relative aspect-square">
                    <Image src={product.image || '/placeholder.svg'} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div>
                      <h3 className="text-sm font-medium uppercase">{product.name}</h3>
                      <p className="font-bold">${product.price}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-black text-white hover:bg-gray-800"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white',
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
              'absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white',
              currentIndex === maxIndex && 'cursor-not-allowed opacity-50',
            )}
            onClick={scrollNext}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
