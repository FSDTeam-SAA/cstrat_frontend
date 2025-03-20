import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface WishlistItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
  }
}

export default function WishlistItem({ item }: WishlistItemProps) {
  return (
    <div className="border rounded-lg overflow-hidden group">
      <div className="relative">
        <Link href={`/shop/product/${item.id}`}>
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover transition-transform group-hover:scale-105 duration-300"
            />
          </div>
        </Link>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white">
          <Heart className="h-5 w-5 fill-black text-black" />
          <span className="sr-only">Remove from wishlist</span>
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">${item.price.toFixed(2)}</p>
          <Button className="rounded-full bg-black text-white hover:bg-gray-800">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

