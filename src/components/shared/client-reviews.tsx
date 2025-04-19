'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Robert Fox',
      role: 'Customer',
      avatar: '',
      rating: 4,
      title: 'Good Experience',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '2',
      name: 'Jane Doe',
      role: 'Customer',
      avatar: '',
      rating: 5,
      title: 'Excellent Service',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '3',
      name: 'John Smith',
      role: 'Customer',
      avatar: '',
      rating: 3,
      title: 'Satisfactory',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '4',
      name: 'Emily Johnson',
      role: 'Customer',
      avatar: '',
      rating: 5,
      title: 'Amazing!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  // Set up auto-sliding
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  // Track current slide
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full select-none py-12">
      <div className="container px-4">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">Our Client Reviews</h2>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-[5px]">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-[221px] rounded-lg border p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={review.avatar || 'https://github.com/shadcn.png'}
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
                          className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="mb-2 font-bold">{review.title}</h4>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>

        {/* Custom Pagination */}
        <div className="mt-6 flex justify-center">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`mx-1 h-3 w-3 rounded-full transition-all ${
                current === index ? 'bg-gray-900' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
