'use client'; // Only if you're using Next.js App Router

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
export type Review = {
    _id: string;
    user: {
      _id: string;
      name: string;
    };
    product: string;
    rating: number;
    review: string;
    images: string[]; // Assuming these are URLs or filenames; adjust type if different
    createdAt: string; // Could also use Date if parsing it
    updatedAt: string;
    __v: number;
  };
const fetchProductReviews = async (productId: string) => {
  console.log("productId", productId);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reviews/products/${productId}/reviews`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch reviews');
  }

  const result = await res.json();
  return result.data;
};

const ProductReview = ({ productId }: { productId: string }) => {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => fetchProductReviews(productId),
  });

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-5">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Customer Reviews</h3>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review: Review) => (
            <li key={review._id} className="border p-5 rounded-2xl shadow-sm bg-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                    {review.user.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-semibold text-gray-800">{review.user.name}</p>
                </div>

                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="italic text-gray-700 mb-2">&quot;{review.review}&quot;</p>
              <p className="text-sm text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductReview;
