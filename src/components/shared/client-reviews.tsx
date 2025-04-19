'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
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

// Fetch reviews from API
const fetchReviews = async (): Promise<Review[]> => {
  const res = await fetch('http://localhost:8001/api/v1/reviews/allreviews');
  const data = await res.json();

  return data.map((item: any) => ({
    id: item._id,
    name: item.user.name,
    // role: 'Customer',
    // avatar: '/images/review-image.png',
    rating: item.rating,
    title: item.product.name,
    content: item.review,
  }));
};

export default function ClientReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });

  useEffect(() => {
    if (reviews.length > 2) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % (reviews.length - 2));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  if (isLoading) return <p className="text-center py-10">Loading reviews...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load reviews.</p>;

  return (
    <section className="w-full py-12">
      <div className="container px-4">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">Our Client Reviews</h2>
        <div className="overflow-hidden relative" ref={containerRef}>
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeIndex * 380}px)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-[355px] h-[221px] flex-shrink-0 mx-2"
              >
                <div className="rounded-lg border p-6 h-full">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src={review.avatar} alt={review.name} fill className="object-cover" />
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
                    <h4 className="mb-2 font-bold">Product: {review.title}</h4>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Buttons */}
        {reviews.length > 2 && (
          <div className="flex justify-center mt-6">
            {reviews.slice(0, reviews.length - 2).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-all ${
                  activeIndex === index ? 'bg-gray-900' : 'bg-gray-400'
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
