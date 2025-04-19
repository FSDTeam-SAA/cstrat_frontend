'use client';

import type React from 'react';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useCartStore } from '@/store/useCartStore';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, toggleSelected, moveToWishlist } = useCartStore();
  const [quantity, setQuantity] = useState(item.quantity);

  // Sync local state with store when item changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  // Debounce quantity updates to prevent excessive store updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (quantity !== item.quantity) {
        updateQuantity(item.id, quantity);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [quantity, item.quantity, item.id, updateQuantity]);

  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  }, []);

  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const decrementQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }, [quantity]);

  const handleRemoveItem = useCallback(() => {
    removeItem(item.id);
  }, [removeItem, item.id]);

  const handleMoveToWishlist = useCallback(() => {
    moveToWishlist(item.id);
  }, [moveToWishlist, item.id]);

  const handleToggleSelected = useCallback(() => {
    toggleSelected(item.id);
  }, [toggleSelected, item.id]);

  return (
    <div className="flex items-center justify-start gap-4 border-b p-4">
      <div className="flex flex-1 items-center gap-2">
        <Checkbox
          checked={item.selected}
          onCheckedChange={handleToggleSelected}
          className="flex-shrink-0"
          aria-label={`Select ${item.name}`}
        />
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image
            src={item.image || '/placeholder.svg'}
            alt={item.name}
            fill
            className="rounded object-cover"
            sizes="80px"
          />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{item.name}</h3>
        <p className="truncate text-sm text-gray-500">
          Brand Name: {item.brandName}, Size: {item.size}, Color: {item.color}
        </p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-6">
        <div className="min-w-[80px] flex-shrink-0 text-right">
          <p className="font-bold text-red-400">${(item.price * quantity).toFixed(2)}</p>
          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              onClick={handleRemoveItem}
              aria-label="Remove from cart"
              className="transition-colors hover:text-red-500"
            >
              <Trash2 className="h-5 w-5 cursor-pointer" />
            </button>
            <button
              onClick={handleMoveToWishlist}
              aria-label="Move to wishlist"
              className="transition-colors hover:text-red-500"
            >
              <Heart className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="flex items-center">
            <div className="flex items-center rounded-md border">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="px-2"
                aria-label="Decrease quantity"
              >
                -
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="h-8 w-12 border-0 p-0 text-center"
                aria-label="Quantity"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={incrementQuantity}
                className="px-2"
                aria-label="Increase quantity"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
