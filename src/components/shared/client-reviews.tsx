/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
}

export default function ClientReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Robert Fox',
      role: 'Customer',
      avatar: '/placeholder.svg?height=60&width=60',
      rating: 4,
      title: 'Good Experience',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.',
    },
    {
      id: '2',
      name: 'Robert Fox',
      role: 'Customer',
      avatar: '/placeholder.svg?height=60&width=60',
      rating: 4,
      title: 'Good Experience',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.',
    },
    {
      id: '3',
      name: 'Robert Fox',
      role: 'Customer',
      avatar: '/placeholder.svg?height=60&width=60',
      rating: 4,
      title: 'Good Experience',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.',
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      role: 'Customer',
      avatar: '/placeholder.svg?height=60&width=60',
      rating: 5,
      title: 'Excellent Service',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate how many reviews to show based on screen size
  const getVisibleReviews = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1280) return 2;
      return 3;
    }
    return 3; // Default for SSR
  };

  const [visibleReviews, setVisibleReviews] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleReviews(getVisibleReviews());
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

  return (
    <section className="w-full py-12">
      <div className="container px-4">
        <h2 className="mb-8 border-b pb-2 text-2xl font-bold md:text-3xl">Our Client Review</h2>
        <div className="relative overflow-hidden" ref={containerRef}>
          <div className="flex flex-wrap justify-center gap-6 md:flex-nowrap">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`w-full md:w-1/${visibleReviews} transition-opacity duration-500 ${
                  (index >= activeIndex && index < activeIndex + visibleReviews) ||
                  (activeIndex + visibleReviews > reviews.length &&
                    index < (activeIndex + visibleReviews) % reviews.length)
                    ? 'opacity-100'
                    : 'hidden opacity-0 md:block'
                }`}
              >
                <div className="rounded-lg border p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={review.avatar || '/placeholder.svg'}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{review.name}</h3>
                      <p className="text-sm text-gray-500">{review.role}</p>
                    </div>
                    <div className="ml-auto flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="mb-2 font-bold">"{review.title}"</h4>
                    <p className="text-gray-600">"{review.content}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === activeIndex ? 'bg-black' : 'bg-gray-300'}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
