import { useCallback } from 'react';
import Image from 'next/image';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useWishlistStore } from '@/store/use-wishlist-store';
import type { WishlistItem as WishlistItemType } from '@/types/wishlist';
import { useRouter } from 'next/navigation'; // Changed from next/router
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';

interface WishlistItemProps {
  item: WishlistItemType;
}

export default function WishlistItem({ item }: WishlistItemProps) {
  const router = useRouter();
  const { removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleMoveToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        // Create cart item with unique ID to prevent merging
        const cartItem = {
          id: `${item.id}-${Date.now()}`, // Ensure unique ID
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
          brandName: 'Brand Name',
          size: 'M',
          color: null,
          selected: true,
          frontCustomization: {
            logoUrl: null,
            position: { x: 50, y: 30 },
            size: 20,
            rotation: 0,
            preview: null,
          },
          backCustomization: {
            logoUrl: null,
            position: { x: 50, y: 30 },
            size: 20,
            rotation: 0,
            preview: null,
          },
        };

        // Add to cart first
        addToCart(cartItem);

        // Then remove from wishlist
        removeItem(item.id);

        // Show success message
        toast.success(`Added ${item.name} to cart!`);

        // Ask user if they want to view the product
        if (window.confirm('Would you like to view the product details?')) {
          router.push(`/product/${item.id}`);
        }
      } catch (error) {
        console.error('Error moving item to cart:', error);
        toast.error('Failed to move item to cart');
      }
    },
    [item, addToCart, removeItem, router],
  );

  const handleRemoveFromWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      removeItem(item.id);
      toast.success(`Removed ${item.name} from wishlist`);
    },
    [item, removeItem],
  );

  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <div className="relative">
        <Link href={`/product/${item.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </Link>

        {/* Move to Cart button on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            className="flex items-center gap-2 rounded-md bg-white/90 px-4 py-2 text-black shadow-md transition-colors hover:bg-white"
            onClick={handleMoveToCart}
            aria-label="Move to cart"
          >
            <ShoppingCart className="h-4 w-4" />
            Move to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">{item.rating}/5</span>
        </div>

        <h3 className="mb-1 truncate text-lg font-bold">{item.name}</h3>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800"
            onClick={handleRemoveFromWishlist}
            aria-label="Remove from wishlist"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
