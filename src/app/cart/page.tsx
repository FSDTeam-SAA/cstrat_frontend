import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import CartItem from "@/components/cart-item";
import CartSummary from "@/components/cart-summary";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  // This would normally come from a cart context or API
  const cartItems = [
    {
      id: "1",
      name: "Men's Sports T-Shirt",
      price: 25,
      quantity: 1,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "2",
      name: "Women's Hoodie",
      price: 25,
      quantity: 2,
      image: "/placeholder.svg?height=400&width=300",
    },
  ];

  const isEmpty = cartItems.length === 0;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="relative h-[200px] md:h-[300px] w-full bg-cover bg-center flex flex-col items-center justify-center text-white z-20"
          style={{
            backgroundImage: "url('/images/cart-hero.jpg')",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Cart
          </h1>
        </div>
      </div>

      <div className="container py-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink aria-current="page">Cart</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="container py-8">
        {isEmpty ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h2 className="font-bold">
                    Shopping Cart (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    items)
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
              <CartSummary
                subtotal={cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              />
              <div className="mt-6">
                <Button
                  asChild
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
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
