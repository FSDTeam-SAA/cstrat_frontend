'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import type { CartSummary as CartSummaryType } from '@/types/cart';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartSummary() {
  const { items, getSummary } = useCartStore();
  const [summary, setSummary] = useState<CartSummaryType>({
    subtotal: 0,
    shipping: 0,
    total: 0,
    itemCount: 0,
    selectedItemCount: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const currentSummary = getSummary();
    setSummary(currentSummary);
    setIsLoading(false);
  }, [items, getSummary]);

  // Update summary whenever items change
  useEffect(() => {
    const currentSummary = getSummary();
    setSummary(currentSummary);
  }, [items, getSummary]); // Re-calculate when items or getSummary changes

  if (isLoading) {
    return (
      <div className="rounded-lg border p-6">
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between border-b pb-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-lg font-bold">Cart Total</h2>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-4">
          <span>Subtotal ({summary.itemCount} items):</span>
          <span className="font-medium">${summary.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-b pb-4">
          <span>Shipping:</span>
          <span className="font-medium">{summary.shipping === 0 ? 'Free' : `$${summary.shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${summary.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
