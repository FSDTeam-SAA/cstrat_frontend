import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import WishlistItem from "@/components/wishlist/wishlist-item"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function WishlistPage() {
  // This would normally come from a wishlist context or API
  const wishlistItems = [
    {
      id: "1",
      name: "Men's Sports T-Shirt",
      price: 25,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "2",
      name: "Women's Hoodie",
      price: 25,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "3",
      name: "Black Stripes T-Shirt",
      price: 70,
      image: "/placeholder.svg?height=400&width=300",
    },
  ]

  const isEmpty = wishlistItems.length === 0

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center flex flex-col items-center justify-center text-white z-20"
          style={{
            backgroundImage: "url('/images/shop-hero.jpg')",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Wishlist</h1>
          <p className="text-xl">Style That Speaks, Comfort That Lasts.</p>
        </div>
      </div>

      <div className="container py-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Wishlist</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="container py-8">
        {isEmpty ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your wishlist yet.</p>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Wishlist ({wishlistItems.length} items)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

