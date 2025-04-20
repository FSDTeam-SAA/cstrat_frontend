'use client';

import { useMemo } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';

export default function CheckoutSummary() {
  const { items } = useCartStore();

  // Get only selected items
  const selectedItems = useMemo(() => items.filter((item) => item.selected), [items]);

  // Calculate totals for selected items only
  const subtotal = useMemo(
    () => selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [selectedItems],
  );

  const shipping: number = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-lg font-bold">Order Summary</h2>

      <div className="divide-y">
        {selectedItems.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 py-4">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                fill
                className="rounded object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{item.name}</h4>
              <p className="text-xs text-gray-500">
                Size: {item.size}, Color: {item.color || 'N/A'}, Qty: {item.quantity}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
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
