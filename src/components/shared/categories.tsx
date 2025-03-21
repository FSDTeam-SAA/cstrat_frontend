'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
}

export default function Categories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      id: '1',
      name: "Men's footwear",
      image: '/placeholder.svg?height=400&width=600',
      href: '/shop/mens-footwear',
    },
    {
      id: '2',
      name: "Men's footwear",
      image: '/placeholder.svg?height=400&width=600',
      href: '/shop/mens-footwear',
    },
    {
      id: '3',
      name: "Men's footwear",
      image: '/placeholder.svg?height=400&width=600',
      href: '/shop/mens-footwear',
    },
    {
      id: '4',
      name: "Women's apparel",
      image: '/placeholder.svg?height=400&width=600',
      href: '/shop/womens-apparel',
    },
    {
      id: '5',
      name: 'Tech accessories',
      image: '/placeholder.svg?height=400&width=600',
      href: '/shop/tech-accessories',
    },
  ];

  // Calculate how many items to show based on screen size
  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3; // Default for SSR
  };

  const [visibleItems, setVisibleItems] = useState(3);
  const maxIndex = Math.max(0, categories.length - visibleItems);

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
      const itemWidth = scrollContainerRef.current.scrollWidth / categories.length;
      scrollContainerRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, categories.length]);

  return (
    <section className="w-full overflow-hidden py-12">
      <div className="container px-4">
        <h2 className="mb-8 border-b pb-2 text-2xl font-bold uppercase md:text-3xl">Categories</h2>
        <div className="relative">
          <div ref={scrollContainerRef} className="flex gap-4 overflow-x-hidden">
            {categories.map((category) => (
              <div
                key={category.id}
                className="min-w-[calc(100%/1)] flex-shrink-0 px-1 sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)]"
              >
                <Link href={category.href}>
                  <div className="group relative overflow-hidden rounded-lg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={category.image || '/placeholder.svg'}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-medium text-white">{category.name}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
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
