import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface WishlistItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function WishlistItem({ item }: WishlistItemProps) {
  return (
    <div className="group overflow-hidden rounded-lg border">
      <div className="relative">
        <Link href={`/shop/product/${item.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <Button variant="ghost" size="icon" className="absolute right-2 top-2 rounded-full bg-white/80 hover:bg-white">
          <Heart className="h-5 w-5 fill-black text-black" />
          <span className="sr-only">Remove from wishlist</span>
        </Button>
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-lg font-bold">{item.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
          <Button className="rounded-full bg-black text-white hover:bg-gray-800">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
