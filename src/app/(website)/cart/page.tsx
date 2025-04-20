'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import CartItem from '@/components/cart/cart-item';
import CartSummary from '@/components/cart/cart-summary';
import Link from 'next/link';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Checkbox } from '@/components/ui/checkbox';

export default function CartPage() {
  const router = useRouter();
  const { items, getSummary, toggleSelectAll, removeItem, areAllItemsSelected } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
    console.log('Cart items on mount:', items);
  }, [items]);

  const handleSelectAll = (checked: boolean) => {
    toggleSelectAll(checked);
  };

  const handleDeleteSelected = async () => {
    setIsDeleting(true);

    try {
      // Get selected items before we start removing them
      const selectedItems = items.filter((item) => item.selected);

      // Remove each selected item
      for (const item of selectedItems) {
        removeItem(item.productId);
        // Small delay to prevent UI freezing with many items
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
      return;
    }

    const selectedItems = items.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert('Please select at least one item to proceed to checkout.');
      return;
    }

    router.push('/checkout');
  };

  if (!mounted) {
    return null; // Return nothing on the server side to prevent hydration mismatch
  }

  const isEmpty = items.length === 0;
  const { itemCount } = getSummary();
  const allSelected = areAllItemsSelected();

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader title="Cart" backgroundImage="/images/cart-hero.png" />

      <div className="container py-8">
        {isEmpty ? (
          <div className="py-16 text-center">
            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h2 className="mb-2 text-2xl font-bold">Your cart is empty</h2>
            <p className="mb-8 text-gray-500">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-lg border">
                <div className="flex items-center justify-between border-b bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      id="select-all"
                      aria-label="Select all items"
                    />
                    <label htmlFor="select-all" className="cursor-pointer font-bold">
                      SELECT ALL ({itemCount} ITEMS)
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-red-500"
                    onClick={handleDeleteSelected}
                    disabled={isDeleting || !items.some((item) => item.selected)}
                  >
                    <Trash2 className="h-4 w-4" />
                    DELETE
                  </Button>
                </div>
                <div className="divide-y">
                  {items.map((item) => (
                    <CartItem key={item.productId} item={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
              <div className="mt-6">
                <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleProceedToCheckout}>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
