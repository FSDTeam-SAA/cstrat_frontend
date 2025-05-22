import { toast } from 'sonner';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/types/product';

interface LogoCustomization {
  logoUrl: string | null;
  position: { x: number; y: number };
  size: number;
  rotation: number;
}

interface AddToCartOptions {
  productData: Product;
  selectedSize: string | null;
  selectedColor: string | null;
  quantity: number;
  frontLogo?: LogoCustomization;
  backLogo?: LogoCustomization;
  generatePreviewImage?: () => Promise<string>;
  setSelectedImageIndex?: (index: number) => void;
}

export const useAddToCart = () => {
  const addToCart = async ({
    productData,
    selectedSize,
    selectedColor,
    quantity,
    frontLogo,
    backLogo,
    generatePreviewImage,
    setSelectedImageIndex,
  }: AddToCartOptions) => {
    try {
      if (!productData) {
        throw new Error('Product data not available');
      }

      if (!selectedSize) {
        toast.error('Please select a size');
        return false;
      }

      // Generate previews for front and back if customization exists
      let frontPreview = null;
      let backPreview = null;

      if (frontLogo?.logoUrl && generatePreviewImage && setSelectedImageIndex) {
        const currentIndex = 0; // Front view
        setSelectedImageIndex(0);
        frontPreview = await generatePreviewImage();
        setSelectedImageIndex(currentIndex);
      }

      if (backLogo?.logoUrl && generatePreviewImage && setSelectedImageIndex) {
        const currentIndex = 1; // Back view
        setSelectedImageIndex(1);
        backPreview = await generatePreviewImage();
        setSelectedImageIndex(currentIndex);
      }

      // Create cart item
      const cartItem = {
        id: productData._id,
        productId: productData._id,
        name: productData.name,
        price: productData.price,
        color: selectedColor,
        size: selectedSize,
        quantity,
        ...(frontLogo && {
          frontCustomization: {
            logoUrl: frontLogo.logoUrl,
            position: frontLogo.position,
            size: frontLogo.size,
            rotation: frontLogo.rotation,
            preview: frontPreview,
          },
        }),
        ...(backLogo && {
          backCustomization: {
            logoUrl: backLogo.logoUrl,
            position: backLogo.position,
            size: backLogo.size,
            rotation: backLogo.rotation,
            preview: backPreview,
          },
        }),
      };

      // Add to cart using the Zustand store
      useCartStore.getState().addItem(cartItem);
      toast.success(`Added ${quantity} ${productData.name} to cart!`);
      return true;
    } catch {
      toast.error('Failed to add to cart. Please try again.');
      return false;
    }
  };

  return { addToCart };
};
