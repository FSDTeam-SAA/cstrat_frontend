'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ApiCategory {
  _id: string;
  categoryName: string;
  categoryImage?: string;
}

const fetchCategories = async (): Promise<ApiCategory[]> => {
  const res = await fetch('http://localhost:8001/api/v1/categories?page=1&limit=10');
  const json = await res.json();
  return json.data || [];
};

export default function Categories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  useEffect(() => {
    const handleResize = () => setVisibleItems(getVisibleItems());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, categories.length - visibleItems);

  const scrollPrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const scrollNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

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
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div ref={scrollContainerRef} className="flex gap-4 overflow-x-hidden">
              { Array.isArray(categories) && categories.map((category) => (
                <div
                  key={category._id}
                  className="min-w-[calc(100%/1)] flex-shrink-0 px-1 sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)]"
                >
                  <Link href={`/shop/${category.categoryName.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="group relative overflow-hidden rounded-lg">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={category.categoryImage || '/placeholder.svg'}
                          alt={category.categoryName}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-lg font-medium text-white">{category.categoryName}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Prev Button */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'absolute left-0 lg:-left-12 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white',
              currentIndex === 0 && 'cursor-not-allowed opacity-50',
            )}
            onClick={scrollPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'absolute right-0 lg:-right-12 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white',
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
