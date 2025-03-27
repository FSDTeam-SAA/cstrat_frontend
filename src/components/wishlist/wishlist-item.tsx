import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
// import { Butt on } from '@/components/ui/button';
import Link from 'next/link';

interface WishlistItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
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
        {/* <Button variant="ghost" size="icon" className="absolute right-2 top-2 rounded-full bg-white/80 hover:bg-white">
          <Heart className="h-5 w-5 fill-black text-black" />
          <span className="sr-only">Remove from wishlist</span>
        </Button> */}
      </div>
      <div className="p-4">
        <div className='flex items-center gap-2'>
          <div className='flex'>
          <Star className='w-4 h-4 text-orange-500'/>
          <Star className='w-4 h-4 text-orange-500'/>
          <Star className='w-4 h-4 text-orange-500'/>
          <Star className='w-4 h-4 text-orange-500'/>
          </div>
          <p>{item.rating}/{item.rating}</p>
        </div>
        <h3 className="mb-1 text-lg font-bold">{item.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
          {/* <Button className="bg-black rounded-full text-white hover:bg-gray-800">
            <Heart  className="mr-2 flex text-lg" />
          </Button> */}
          <div className='bg-black w-12 h-12 rounded-full flex items-center justify-center'>
            <Heart className='text-xl text-white'/>
          </div>
        </div>
      </div>
    </div>
  );
}
