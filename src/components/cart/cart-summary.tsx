'use client';

import { useMemo } from 'react';
import { useCartStore } from '@/store/useCartStore';

export default function CartSummary() {
  const { getSummary } = useCartStore();

  // Memoize the summary calculation to prevent unnecessary recalculations
  const { subtotal, shipping, total, itemCount } = useMemo(() => getSummary(), [getSummary]);

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-lg font-bold">Cart Total</h2>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-4">
          <span>Subtotal ({itemCount} items):</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-b pb-4">
          <span>Shipping:</span>
          <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
