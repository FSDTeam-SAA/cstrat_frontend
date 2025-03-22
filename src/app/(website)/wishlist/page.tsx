import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import WishlistItem from '@/components/wishlist/wishlist-item';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  // This would normally come from a wishlist context or API
  const wishlistItems = [
    {
      id: '1',
      name: "Men's Sports T-Shirt",
      price: 25,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      id: '2',
      name: "Women's Hoodie",
      price: 25,
      image: '/placeholder.svg?height=400&width=300',
    },
    {
      id: '3',
      name: 'Black Stripes T-Shirt',
      price: 70,
      image: '/placeholder.svg?height=400&width=300',
    },
  ];

  const isEmpty = wishlistItems.length === 0;

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Wishlist"
        subtitle="Style That Speaks, Comfort That Lasts."
        backgroundImage="/images/wishlist-bg.jpg"
      />

      <div className="container py-8">
        {isEmpty ? (
          <div className="py-16 text-center">
            <Heart className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h2 className="mb-2 text-2xl font-bold">Your wishlist is empty</h2>
            <p className="mb-8 text-gray-500">Looks like you haven&apos;t added anything to your wishlist yet.</p>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="mb-6 text-2xl font-bold">My Wishlist ({wishlistItems.length} items)</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((item) => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
