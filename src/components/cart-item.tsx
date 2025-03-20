"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="flex items-center p-4 gap-4">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
      </div>
      <div className="flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center border rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="px-2"
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center border-0 p-0 h-8"
          />
          <Button type="button" variant="ghost" size="sm" onClick={incrementQuantity} className="px-2">
            +
          </Button>
        </div>
      </div>
      <div className="text-right min-w-[80px]">
        <p className="font-bold">${(item.price * quantity).toFixed(2)}</p>
      </div>
      <Button variant="ghost" size="icon" className="text-red-500">
        <Trash2 className="h-5 w-5" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  )
}

