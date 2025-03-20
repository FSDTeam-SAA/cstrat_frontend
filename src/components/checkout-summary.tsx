import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function CheckoutSummary() {
  // This would normally come from a cart context or API
  const items = [
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
  ]

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="font-bold">Order Summary</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 border rounded">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <div className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div className="ml-auto">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Promo code" />
            <Button variant="outline">Apply</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

