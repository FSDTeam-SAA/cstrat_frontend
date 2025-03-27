/* eslint-disable react/no-unescaped-entities */
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import CartItem from '@/components/cart/cart-item';
import CartSummary from '@/components/cart/cart-summary';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  // This would normally come from a cart context or API
  const cartItems = [
    {
      id: '1',
      name: "Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt",
      price: 25,
      quantity: 1,
      image: '/images/image 5.png',
      brandName: "ABC",
      size: 'XL',
      color: 'Black'
    },
    {
      id: '2',
      name: "Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt",
      price: 25,
      quantity: 2,
      image: '/images/image 5.png',
      brandName: "AtoZ",
      size: 'XL',
      color: 'Red'
    },
  ];

  const isEmpty = cartItems.length === 0;

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Cart"
        backgroundImage="/images/cart-hero.png"
        // breadcrumbs={[
        //   { label: 'Home', href: '/' },
        //   { label: 'Cart', href: '/cart' },
        // ]}
      />

      <div className="container py-8">
        {isEmpty ? (
          <div className="py-16 text-center">
            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h2 className="mb-2 text-2xl font-bold">Your cart is empty</h2>
            <p className="mb-8 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="">
            <div className="lg:col-span-2 mb-8">
              <div className="overflow-hidden rounded-lg border">
                <div className="border-b bg-gray-50 p-4">
                  <h2 className="font-bold">
                    Shopping Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                  </h2>
                </div>
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <CartSummary subtotal={cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)} />
              <div className="mt-6">
                <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
