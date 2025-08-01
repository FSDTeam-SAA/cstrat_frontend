'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Minus, Plus, ShoppingCart, Check, Eye, RotateCw, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StarRating } from '@/components/ui/star-rating';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useProduct } from '@/hooks/use-product';
import type { Product } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';

interface LogoCustomization {
  logoUrl: string | null;
  position: { x: number; y: number };
  size: number;
  rotation: number;
}

interface ProductDetailsProps {
  productId: string;
  initialData?: Product | null;
}

export default function ProductDetails({ productId, initialData }: ProductDetailsProps) {
  console.log(initialData);
  // Fetch product data with TanStack Query
  const { data: product, isLoading, error } = useProduct(productId);

  // Use initialData if available, otherwise use fetched data
  const productData = product || initialData;

  // State for product customization
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Front and back logo customizations
  const [frontLogo, setFrontLogo] = useState<LogoCustomization>({
    logoUrl: null,
    position: { x: 50, y: 30 },
    size: 20,
    rotation: 0,
  });

  const [backLogo, setBackLogo] = useState<LogoCustomization>({
    logoUrl: null,
    position: { x: 50, y: 30 },
    size: 20,
    rotation: 0,
  });

  // UI state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(false);
  const [rotateStartAngle, setRotateStartAngle] = useState(0);

  // Preview state
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Set default color and size when product data is loaded
  useEffect(() => {
    if (productData) {
      if (productData.isCustomizable && productData.colors && productData.colors.length > 0) {
        setSelectedColor(productData.colors[0]._id);
      } else if (productData.colors && productData.colors.length > 0) {
        setSelectedColor(productData.colors[0]);
      }

      if (productData.sizes && productData.sizes.length > 0) {
        setSelectedSize(productData.sizes[0]);
      }
    }
  }, [productData]);

  // Get current logo customization based on selected image
  const getCurrentLogo = (): LogoCustomization => {
    return selectedImageIndex === 0
      ? frontLogo
      : selectedImageIndex === 1
        ? backLogo
        : { logoUrl: null, position: { x: 50, y: 30 }, size: 20, rotation: 0 };
  };

  // Update current logo customization
  const updateCurrentLogo = (updates: Partial<LogoCustomization>) => {
    if (selectedImageIndex === 0) {
      setFrontLogo({ ...frontLogo, ...updates });
    } else if (selectedImageIndex === 1) {
      setBackLogo({ ...backLogo, ...updates });
    }
  };

  // Check if current view can be customized
  const canCustomizeCurrentView = () => {
    return selectedImageIndex === 0 || selectedImageIndex === 1;
  };

  // Handle color selection
  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
    setSelectedImageIndex(0); // Reset to first image when color changes
  };

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handle logo upload
  const handleLogoUpload = () => {
    if (!canCustomizeCurrentView()) {
      alert('You can only customize the front and back views (first two thumbnails)');
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updateCurrentLogo({
        logoUrl: event.target?.result as string,
        position: { x: 50, y: 30 },
        size: 20,
        rotation: 0,
      });
    };
    reader.readAsDataURL(file);
  };

  // Remove logo
  const handleRemoveLogo = () => {
    updateCurrentLogo({ logoUrl: null });
  };

  // Handle logo drag
  const handleMouseDown = (e: React.MouseEvent) => {
    const currentLogo = getCurrentLogo();
    if (!currentLogo.logoUrl || !imageContainerRef.current) return;

    setIsDragging(true);

    // Get starting position
    setDragStartPos({
      x: e.clientX,
      y: e.clientY,
    });

    // Prevent default behavior
    e.preventDefault();
  };

  // Add touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const currentLogo = getCurrentLogo();
    if (!currentLogo.logoUrl || !imageContainerRef.current) return;

    setIsDragging(true);

    // Get starting position from first touch
    const touch = e.touches[0];
    setDragStartPos({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageContainerRef.current) return;

    const currentLogo = getCurrentLogo();
    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartPos.x;
    const deltaY = e.clientY - dragStartPos.y;

    // Calculate new position as percentage of container
    const newX = currentLogo.position.x + (deltaX / containerRect.width) * 100;
    const newY = currentLogo.position.y + (deltaY / containerRect.height) * 100;

    // Constrain to container bounds with some padding for the logo
    const padding = currentLogo.size / 2;
    const constrainedX = Math.max(padding, Math.min(100 - padding, newX));
    const constrainedY = Math.max(padding, Math.min(100 - padding, newY));

    updateCurrentLogo({
      position: {
        x: constrainedX,
        y: constrainedY,
      },
    });

    setDragStartPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsRotating(false);
  };

  // Handle logo resize with corner handles
  const handleResizeMouseDown = (e: React.MouseEvent, corner: string) => {
    const currentLogo = getCurrentLogo();
    if (!currentLogo.logoUrl || !imageContainerRef.current || !logoRef.current) return;

    e.stopPropagation(); // Prevent triggering drag

    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const startSize = currentLogo.size;
    const startMouseX = e.clientX;
    const startMouseY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      // Calculate distance moved
      const deltaX = moveEvent.clientX - startMouseX;
      const deltaY = moveEvent.clientY - startMouseY;

      // Determine direction based on corner
      let sizeDelta = 0;

      switch (corner) {
        case 'topLeft':
          sizeDelta = -Math.max(deltaX, deltaY);
          break;
        case 'topRight':
          sizeDelta = Math.max(deltaX, -deltaY);
          break;
        case 'bottomLeft':
          sizeDelta = Math.max(-deltaX, deltaY);
          break;
        case 'bottomRight':
          sizeDelta = Math.max(deltaX, deltaY);
          break;
      }

      // Convert to percentage of container width
      const percentDelta = (sizeDelta / containerRect.width) * 100;

      // Apply new size with constraints
      const newSize = Math.max(10, Math.min(60, startSize + percentDelta));
      updateCurrentLogo({ size: newSize });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle logo rotation
  const handleRotateMouseDown = (e: React.MouseEvent) => {
    const currentLogo = getCurrentLogo();
    if (!currentLogo.logoUrl || !logoRef.current) return;

    e.stopPropagation(); // Prevent triggering drag
    setIsRotating(true);

    const logoRect = logoRef.current.getBoundingClientRect();
    const logoCenter = {
      x: logoRect.left + logoRect.width / 2,
      y: logoRect.top + logoRect.height / 2,
    };

    // Calculate initial angle
    const initialAngle = Math.atan2(e.clientY - logoCenter.y, e.clientX - logoCenter.x) * (180 / Math.PI);

    setRotateStartAngle(initialAngle - currentLogo.rotation);

    const handleRotateMove = (moveEvent: MouseEvent) => {
      // Calculate new angle
      const newAngle = Math.atan2(moveEvent.clientY - logoCenter.y, moveEvent.clientX - logoCenter.x) * (180 / Math.PI);

      // Apply rotation (accounting for initial offset)
      updateCurrentLogo({ rotation: newAngle - rotateStartAngle });
    };

    const handleRotateUp = () => {
      setIsRotating(false);
      document.removeEventListener('mousemove', handleRotateMove);
      document.removeEventListener('mouseup', handleRotateUp);
    };

    document.addEventListener('mousemove', handleRotateMove);
    document.addEventListener('mouseup', handleRotateUp);
  };

  // Generate preview image for current view
  const generatePreviewImage = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const currentLogo = getCurrentLogo();
        const productImages = productData?.media?.images || [];

        // Create a new canvas
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Failed to get canvas context');
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Create a new image for the product using the native Image constructor
        const productImage = new window.Image();
        productImage.crossOrigin = 'anonymous';

        // Check if we're using a placeholder or a real image
        const imageSrc = productImages[selectedImageIndex];
        if (!imageSrc || imageSrc === '/placeholder.svg') {
          // For placeholder images, use a simple colored rectangle instead
          ctx.fillStyle = '#f3f4f6'; // Light gray background
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw a placeholder text
          ctx.fillStyle = '#9ca3af';
          ctx.font = 'bold 24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('Product Image', canvas.width / 2, canvas.height / 2);

          // If there's no logo, resolve immediately
          if (!currentLogo.logoUrl) {
            const dataUrl = canvas.toDataURL('image/png');
            resolve(dataUrl);
            return;
          }

          // If there is a logo, continue with logo processing
          const logoImage = new window.Image();
          if (!currentLogo.logoUrl.startsWith('data:')) {
            logoImage.crossOrigin = 'anonymous';
          }
          logoImage.src = currentLogo.logoUrl;

          logoImage.onload = () => {
            try {
              // Calculate logo dimensions and position
              const logoWidth = (currentLogo.size / 100) * canvas.width;
              const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
              const logoX = (currentLogo.position.x / 100) * canvas.width - logoWidth / 2;
              const logoY = (currentLogo.position.y / 100) * canvas.height - logoHeight / 2;

              // Save the current state
              ctx.save();

              // Move to the center of where the logo should be
              ctx.translate(logoX + logoWidth / 2, logoY + logoHeight / 2);

              // Rotate around this center
              ctx.rotate((currentLogo.rotation * Math.PI) / 180);

              // Draw the logo centered at the origin (which is now at the logo's center)
              ctx.drawImage(logoImage, -logoWidth / 2, -logoHeight / 2, logoWidth, logoHeight);

              // Restore the context to its original state
              ctx.restore();

              // Convert canvas to data URL
              const dataUrl = canvas.toDataURL('image/png');
              resolve(dataUrl);
            } catch (error) {
              console.error('Error drawing logo on canvas:', error);
              reject(error);
            }
          };

          logoImage.onerror = (error) => {
            console.error('Error loading logo image:', error);
            reject(new Error('Failed to load logo image'));
          };

          return;
        }

        // For real product images, proceed normally
        productImage.src = imageSrc;

        // Handle product image load
        productImage.onload = () => {
          // Draw the product image
          ctx.drawImage(productImage, 0, 0, canvas.width, canvas.height);

          // If there's no logo, just return the product image
          if (!currentLogo.logoUrl) {
            const dataUrl = canvas.toDataURL('image/png');
            resolve(dataUrl);
            return;
          }

          // Create a new image for the logo using the native Image constructor
          const logoImage = new window.Image();

          // For data URLs, we don't need to set crossOrigin
          if (!currentLogo.logoUrl.startsWith('data:')) {
            logoImage.crossOrigin = 'anonymous';
          }

          logoImage.src = currentLogo.logoUrl;

          // Handle logo image load
          logoImage.onload = () => {
            try {
              // Calculate logo dimensions and position
              const logoWidth = (currentLogo.size / 100) * canvas.width;
              const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
              const logoX = (currentLogo.position.x / 100) * canvas.width - logoWidth / 2;
              const logoY = (currentLogo.position.y / 100) * canvas.height - logoHeight / 2;

              // Save the current state
              ctx.save();

              // Move to the center of where the logo should be
              ctx.translate(logoX + logoWidth / 2, logoY + logoHeight / 2);

              // Rotate around this center
              ctx.rotate((currentLogo.rotation * Math.PI) / 180);

              // Draw the logo centered at the origin (which is now at the logo's center)
              ctx.drawImage(logoImage, -logoWidth / 2, -logoHeight / 2, logoWidth, logoHeight);

              // Restore the context to its original state
              ctx.restore();

              // Convert canvas to data URL
              const dataUrl = canvas.toDataURL('image/png');
              resolve(dataUrl);
            } catch (error) {
              console.error('Error drawing logo on canvas:', error);
              reject(error);
            }
          };

          // Handle logo image error
          logoImage.onerror = (error) => {
            console.error('Error loading logo image:', error);
            reject(new Error('Failed to load logo image'));
          };
        };

        // Handle product image error
        productImage.onerror = (error) => {
          console.error('Error loading product image:', error);
          reject(new Error('Failed to load product image'));
        };
      } catch (error) {
        console.error('Unexpected error in generatePreviewImage:', error);
        reject(error);
      }
    });
  };

  // Handle preview dialog open
  const handlePreviewOpen = async () => {
    try {
      setPreviewLoading(true);
      setIsDialogOpen(true);

      console.log('Generating preview for:', selectedImageIndex);
      console.log('Current logo:', getCurrentLogo());

      const previewImage = await generatePreviewImage();
      console.log('Preview generated successfully');

      setPreviewImageUrl(previewImage);
    } catch (error) {
      console.error('Error generating preview:', error);
      alert('Failed to generate preview. Please try again.');
    } finally {
      setPreviewLoading(false);
    }
  };

  // Handle image download
  const handleDownloadImage = () => {
    if (!previewImageUrl) {
      console.error('No preview image URL available for download');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = previewImageUrl;
      link.download = `${productData?.name || 'product'}-${selectedImageIndex === 0 ? 'front' : 'back'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  // Add to cart
  const addToCart = async () => {
    try {
      if (!productData) {
        throw new Error('Product data not available');
      }

      if (!selectedSize) {
        alert('Please select a size');
        return;
      }

      // Generate previews for front and back
      let frontPreview = null;
      let backPreview = null;

      try {
        if (frontLogo.logoUrl) {
          // Temporarily switch to front view to generate preview
          const currentIndex = selectedImageIndex;
          setSelectedImageIndex(0);
          frontPreview = await generatePreviewImage();
          setSelectedImageIndex(currentIndex);
        }

        if (backLogo.logoUrl) {
          // Temporarily switch to back view to generate preview
          const currentIndex = selectedImageIndex;
          setSelectedImageIndex(1);
          backPreview = await generatePreviewImage();
          setSelectedImageIndex(currentIndex);
        }
      } catch (previewError) {
        console.error('Error generating preview images:', previewError);
        // Continue without previews if they fail
      }

      // Create cart item with all customizations
      const cartItem = {
        id: productData._id,
        productId: productData._id,
        name: productData.name,
        price: productData.price,
        color: selectedColor,
        size: selectedSize,
        quantity,
        frontCustomization: {
          logoUrl: frontLogo.logoUrl,
          position: frontLogo.position,
          size: frontLogo.size,
          rotation: frontLogo.rotation,
          preview: frontPreview,
        },
        backCustomization: {
          logoUrl: backLogo.logoUrl,
          position: backLogo.position,
          size: backLogo.size,
          rotation: backLogo.rotation,
          preview: backPreview,
        },
      };

      console.log('Adding to cart:', cartItem);

      // Add to cart using the Zustand store
      useCartStore.getState().addItem(cartItem);
      toast.success(`Added ${quantity} ${productData.name} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  // Handle touch move for dragging and rotating
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!imageContainerRef.current) return;

    // Handle dragging
    if (isDragging) {
      const currentLogo = getCurrentLogo();
      const containerRect = imageContainerRef.current.getBoundingClientRect();
      const touch = e.touches[0];

      const deltaX = touch.clientX - dragStartPos.x;
      const deltaY = touch.clientY - dragStartPos.y;

      // Calculate new position as percentage of container
      const newX = currentLogo.position.x + (deltaX / containerRect.width) * 100;
      const newY = currentLogo.position.y + (deltaY / containerRect.height) * 100;

      // Constrain to container bounds with some padding for the logo
      const padding = currentLogo.size / 2;
      const constrainedX = Math.max(padding, Math.min(100 - padding, newX));
      const constrainedY = Math.max(padding, Math.min(100 - padding, newY));

      updateCurrentLogo({
        position: {
          x: constrainedX,
          y: constrainedY,
        },
      });

      setDragStartPos({
        x: touch.clientX,
        y: touch.clientY,
      });
    }

    // Handle rotation
    if (isRotating && logoRef.current) {
      const logoRect = logoRef.current.getBoundingClientRect();
      const logoCenter = {
        x: logoRect.left + logoRect.width / 2,
        y: logoRect.top + logoRect.height / 2,
      };

      const touch = e.touches[0];
      const newAngle = Math.atan2(touch.clientY - logoCenter.y, touch.clientX - logoCenter.x) * (180 / Math.PI);

      // Apply rotation (accounting for initial offset)
      updateCurrentLogo({ rotation: newAngle - rotateStartAngle });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsRotating(false);
  };

  // Setup touch event listeners with { passive: false } to allow preventDefault
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    // Function to handle touch move with passive: false
    const handleTouchMoveNonPassive = (e: TouchEvent) => {
      if (isDragging || isRotating) {
        e.preventDefault();
      }
    };

    // Add event listener with passive: false
    container.addEventListener('touchmove', handleTouchMoveNonPassive, { passive: false });

    // Clean up
    return () => {
      container.removeEventListener('touchmove', handleTouchMoveNonPassive);
    };
  }, [isDragging, isRotating]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Revoke object URLs if needed
      if (frontLogo.logoUrl && frontLogo.logoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(frontLogo.logoUrl);
      }
      if (backLogo.logoUrl && backLogo.logoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(backLogo.logoUrl);
      }
      if (previewImageUrl && previewImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [frontLogo.logoUrl, backLogo.logoUrl, previewImageUrl]);

  // Loading state
  if (isLoading && !initialData) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="order-2 flex flex-row gap-2 overflow-x-auto pb-2 md:order-1 md:col-span-1 md:flex-col md:overflow-x-visible md:pb-0">
          {[1, 2, 3].map((_, index) => (
            <Skeleton key={index} className="aspect-square h-20 w-20 rounded-md" />
          ))}
        </div>
        <div className="order-1 md:order-2 md:col-span-5">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>
        <div className="order-3 md:col-span-6">
          <Skeleton className="h-10 w-3/4 rounded-md" />
          <Skeleton className="mt-2 h-4 w-24 rounded-md" />
          <Skeleton className="mt-4 h-20 w-full rounded-md" />
          <Skeleton className="mt-6 h-8 w-24 rounded-md" />
          <div className="mt-6">
            <Skeleton className="h-6 w-32 rounded-md" />
            <div className="mt-2 flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton key={index} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !initialData) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500">Error loading product</h2>
          <p className="mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  // Get product rating or default
  const rating = productData?.rating || 0;

  // Get current logo for rendering
  const currentLogo = getCurrentLogo();

  // Use product images based on product type and selected color
  const getProductImages = () => {
    if (!productData) return [];

    if (productData.isCustomizable && productData.colors && productData.colors.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selectedColorObj = productData.colors.find((color: any) => color._id === selectedColor);
      return selectedColorObj?.images || [];
    } else {
      return productData.media?.images || [];
    }
  };

  // Generate color buttons based on product data
  const renderColorOptions = () => {
    if (!productData?.colors || productData.colors.length === 0) {
      return <div className="text-sm text-muted-foreground">No color options available for this product</div>;
    }

    return (
      <div className="mt-2 flex flex-wrap gap-3">
        {productData.isCustomizable
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            productData.colors.map((color: any) => (
              <button
                key={color._id}
                className={cn(
                  'relative h-12 w-12 rounded-full border-2 sm:h-10 sm:w-10',
                  selectedColor === color._id ? 'border-black' : 'border-transparent hover:border-gray-300',
                )}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleColorSelect(color._id)}
                aria-label={`Select ${color.name} color`}
              >
                {selectedColor === color._id && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
              </button>
            ))
          : productData.colors.map((color: string) => (
              <button
                key={color}
                className={cn(
                  'relative h-12 w-12 rounded-full border-2 sm:h-10 sm:w-10',
                  selectedColor === color ? 'border-black' : 'border-transparent hover:border-gray-300',
                )}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                aria-label={`Select ${color} color`}
              >
                {selectedColor === color && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
              </button>
            ))}
      </div>
    );
  };

  // Generate size buttons based on product data
  const renderSizeOptions = () => {
    if (!productData?.sizes || productData.sizes.length === 0) {
      return <div className="text-sm text-muted-foreground">No size options available for this product</div>;
    }

    return (
      <div className="mt-2 flex flex-wrap gap-3">
        {productData.sizes.map((size: string) => (
          <button
            key={size}
            className={cn(
              'h-12 min-w-[80px] touch-manipulation rounded-md border px-3 sm:h-10',
              selectedSize === size
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white hover:border-gray-900',
            )}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    );
  };

  // Get product images
  const productImages = getProductImages();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {/* Left Thumbnails - horizontal on mobile, vertical on desktop */}
      <div className="order-2 flex flex-row gap-2 overflow-x-auto pb-2 md:order-1 md:col-span-1 md:flex-col md:overflow-x-visible md:pb-0">
        {productImages.length > 0 ? (
          productImages.map((image: string, index: number) => (
            <button
              key={index}
              className={cn(
                'relative aspect-square overflow-hidden rounded-md border',
                selectedImageIndex === index ? 'border-black' : 'border-gray-200',
              )}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image || '/placeholder.svg'}
                alt={`${productData?.name || 'Product'} view ${index + 1}`}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
              {/* Show indicator for customizable views */}
              {(index === 0 || index === 1) && (
                <div
                  className="absolute right-1 top-1 h-3 w-3 rounded-full bg-green-500"
                  title={index === 0 ? 'Front view (customizable)' : 'Back view (customizable)'}
                />
              )}
            </button>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">No product images available</div>
        )}
      </div>

      {/* Main Product Image */}
      <div className="order-1 md:order-2 md:col-span-5">
        <div
          ref={imageContainerRef}
          className="relative aspect-square overflow-hidden rounded-lg bg-background"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Product base image */}
          {productImages.length > 0 ? (
            <Image
              src={productImages[selectedImageIndex] || '/placeholder.svg'}
              alt={`${productData?.name || 'Product'}`}
              width={600}
              height={600}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-muted-foreground">
              No image available
            </div>
          )}

          {/* Uploaded logo overlay */}
          {currentLogo.logoUrl && canCustomizeCurrentView() && (
            <div
              ref={logoRef}
              className="absolute cursor-move touch-manipulation select-none"
              style={{
                left: `${currentLogo.position.x}%`,
                top: `${currentLogo.position.y}%`,
                width: `${currentLogo.size}%`,
                height: 'auto',
                transform: `translate(-50%, -50%) rotate(${currentLogo.rotation}deg)`,
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <Image
                src={currentLogo.logoUrl || '/placeholder.svg'}
                alt="Custom logo"
                width={200}
                height={200}
                className="h-auto w-full object-contain"
              />

              {/* Resize handles */}
              <div
                className="absolute -bottom-3 -right-3 h-6 w-6 cursor-nwse-resize touch-manipulation rounded-full border-2 border-blue-500 bg-white"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottomRight')}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  const currentLogo = getCurrentLogo();
                  if (!currentLogo.logoUrl || !imageContainerRef.current || !logoRef.current) return;

                  const containerRect = imageContainerRef.current.getBoundingClientRect();
                  const touch = e.touches[0];
                  const startSize = currentLogo.size;
                  const startTouchX = touch.clientX;
                  const startTouchY = touch.clientY;

                  const handleTouchMove = (moveEvent: TouchEvent) => {
                    moveEvent.preventDefault(); // Prevent scrolling
                    const moveTouch = moveEvent.touches[0];
                    const deltaX = moveTouch.clientX - startTouchX;
                    const deltaY = moveTouch.clientY - startTouchY;

                    // For bottom right, we want to increase size when dragging outward
                    const sizeDelta = Math.max(deltaX, deltaY);

                    // Convert to percentage of container width
                    const percentDelta = (sizeDelta / containerRect.width) * 100;

                    // Apply new size with constraints
                    const newSize = Math.max(10, Math.min(60, startSize + percentDelta));
                    updateCurrentLogo({ size: newSize });
                  };

                  const handleTouchEnd = () => {
                    document.removeEventListener('touchmove', handleTouchMove);
                    document.removeEventListener('touchend', handleTouchEnd);
                  };

                  // Add with passive: false to allow preventDefault
                  document.addEventListener('touchmove', handleTouchMove, { passive: false });
                  document.addEventListener('touchend', handleTouchEnd);
                }}
              ></div>
              <div
                className="absolute -bottom-3 -left-3 h-6 w-6 cursor-nesw-resize touch-manipulation rounded-full border-2 border-blue-500 bg-white"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottomLeft')}
              ></div>
              <div
                className="absolute -right-3 -top-3 h-6 w-6 cursor-nesw-resize touch-manipulation rounded-full border-2 border-blue-500 bg-white"
                onMouseDown={(e) => handleResizeMouseDown(e, 'topRight')}
              ></div>
              <div
                className="absolute -left-3 -top-3 h-6 w-6 cursor-nwse-resize touch-manipulation rounded-full border-2 border-blue-500 bg-white"
                onMouseDown={(e) => handleResizeMouseDown(e, 'topLeft')}
              ></div>

              {/* Rotation handle */}
              <div
                className="absolute -top-8 left-1/2 h-6 w-6 -translate-x-1/2 cursor-move touch-manipulation rounded-full border-2 border-green-500 bg-white"
                onMouseDown={handleRotateMouseDown}
              ></div>

              {/* Remove logo button */}
              <button
                className="absolute -right-10 -top-3 flex h-8 w-8 touch-manipulation items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                onClick={handleRemoveLogo}
                title="Remove logo"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* View indicator */}
          <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
            {selectedImageIndex === 0
              ? 'Front View'
              : selectedImageIndex === 1
                ? 'Back View'
                : selectedImageIndex === 2
                  ? 'Side View'
                  : 'View ' + (selectedImageIndex + 1)}
            {!canCustomizeCurrentView() && <span className="ml-1">(Not customizable)</span>}
          </div>

          {/* Logo editing tools */}

          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
            <div className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white">
              {canCustomizeCurrentView() && (
                <>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <button
                        className="rounded-md p-2 transition-colors hover:bg-gray-700"
                        title="Preview"
                        onClick={handlePreviewOpen}
                      >
                        <Eye size={18} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <div className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h2 className="text-xl font-bold">
                            {selectedImageIndex === 0 ? 'Front View Preview' : 'Back View Preview'}
                          </h2>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={handleDownloadImage}
                            disabled={!previewImageUrl || previewLoading}
                          >
                            <Download size={16} />
                            Download
                          </Button>
                        </div>
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-background">
                          {previewLoading ? (
                            <div className="flex h-full items-center justify-center">Loading preview...</div>
                          ) : previewImageUrl ? (
                            <Image
                              src={previewImageUrl || '/placeholder.svg'}
                              alt="Customized product preview"
                              width={600}
                              height={600}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">No preview available</div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {currentLogo.logoUrl && (
                    <button
                      className="rounded-md p-2 transition-colors hover:bg-gray-700"
                      title="Reset Rotation"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateCurrentLogo({ rotation: 0 });
                      }}
                    >
                      <RotateCw size={18} />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* View selection info */}
        {!canCustomizeCurrentView() && (
          <div className="mt-2 text-center text-sm text-amber-600">
            Note: You can only customize the front and back views (first two thumbnails)
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="order-3 md:col-span-6">
        <h1 className="text-3xl font-bold">{productData?.name || 'Product Name'}</h1>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={rating} />
          <span className="text-sm text-muted-foreground">{rating}/5</span>
          {productData?.reviewCount ? (
            <span className="text-sm text-muted-foreground">({productData.reviewCount} reviews)</span>
          ) : null}
        </div>

        {/* Description */}
        <p className="mt-4 text-muted-foreground">{productData?.description || 'No description available.'}</p>

        {/* Price */}
        <div className="mt-6 text-2xl font-bold">${productData?.price?.toFixed(2) || '0.00'}</div>

        {/* Discount */}
        {productData?.discountParcentage > 0 && (
          <div className="mt-1 text-sm text-green-600">{productData.discountParcentage}% off</div>
        )}

        <div className="mt-6">
          <h3 className="font-medium">Select Colors</h3>
          {renderColorOptions()}
        </div>

        <div className="mt-6">
          <h3 className="font-medium">Choose Size</h3>
          {renderSizeOptions()}
        </div>

        {/* Logo Upload */}
        {productData.isCustomizable && (
          <div className="mt-6">
            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2"
              onClick={handleLogoUpload}
              disabled={!canCustomizeCurrentView()}
            >
              <Upload className="h-5 w-5" />
              Upload Logo for {selectedImageIndex === 0 ? 'Front' : selectedImageIndex === 1 ? 'Back' : 'Current'} View
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            {!canCustomizeCurrentView() && (
              <p className="mt-2 text-sm text-amber-600">
                Please select front or back view (first two thumbnails) to upload a logo
              </p>
            )}
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-14 items-center rounded-md border bg-gray-100 sm:h-12">
            <button
              className="flex h-full w-14 touch-manipulation items-center justify-center sm:w-12"
              onClick={decreaseQuantity}
              disabled={!productData?.inStock}
            >
              <Minus className="h-5 w-5 sm:h-4 sm:w-4" />
            </button>
            <span className="flex h-full min-w-[40px] items-center justify-center px-2 text-lg sm:text-base">
              {quantity}
            </span>
            <button
              className="flex h-full w-14 touch-manipulation items-center justify-center sm:w-12"
              onClick={increaseQuantity}
              disabled={!productData?.inStock || (productData?.quantity && quantity >= productData.quantity)}
            >
              <Plus className="h-5 w-5 sm:h-4 sm:w-4" />
            </button>
          </div>

          <Button
            className="flex h-14 flex-1 items-center justify-center gap-2 bg-black text-lg hover:bg-black/90 sm:h-12 sm:text-base"
            onClick={addToCart}
            disabled={!productData?.inStock}
          >
            <ShoppingCart className="h-6 w-6 sm:h-5 sm:w-5" />
            Add to Cart
          </Button>
        </div>

        {/* Stock status */}
        {productData && (
          <div className="mt-4">
            <p className={`text-sm ${productData.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {productData.inStock ? `In Stock (${productData.quantity} available)` : 'Out of Stock'}
            </p>
          </div>
        )}

        {/* Additional product details */}
        {productData && (
          <div className="mt-6 grid gap-2 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">SKU:</span>
              <span>{productData.sku || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Category:</span>
              <span>{productData.category?.categoryName || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Subcategory:</span>
              <span>{productData.subcategory?.subCategoryName || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Type:</span>
              <span className="capitalize">{productData.type || 'N/A'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
