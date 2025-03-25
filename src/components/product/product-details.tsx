'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Minus, Plus, ShoppingCart, Check, Eye, RotateCw, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StarRating } from '@/components/ui/star-rating';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

// Available colors with their hex values and image paths
const COLORS = [
  {
    name: 'Olive',
    value: '#5D4A1F',
    images: [
      '/ts/blue.jpg', // Front view
      '/ts/blue.jpg', // Back view
      '/ts/blue.jpg', // Side view
      '/ts/blue.jpg', // Model view
    ],
  },
  {
    name: 'Forest',
    value: '#1F3D36',
    images: ['/ts/green.jpg', '/ts/green.jpg', '/ts/green.jpg', '/ts/green.jpg'],
  },
  {
    name: 'Yellow',
    value: '#E5E03F',
    images: ['/images/green-1.jpeg', '/images/green-1.jpeg', '/images/green-1.jpeg', '/images/green-1.jpeg'],
  },
  {
    name: 'Orange',
    value: '#FF6B35',
    images: ['/images/orange-1.jpeg', '/images/orange-1.jpeg', '/images/orange-1.jpeg', '/images/orange-1.jpeg'],
  },
  {
    name: 'Purple',
    value: '#C04CFD',
    images: ['/images/blue-1.jpeg', '/images/blue-1.jpeg', '/images/blue-1.jpeg', '/images/blue-1.jpeg'],
  },
];

// Available sizes
const SIZES = ['Small', 'Medium', 'Large', 'X-Large'];

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
}

interface LogoCustomization {
  logoUrl: string | null;
  position: { x: number; y: number };
  size: number;
  rotation: number;
}

export default function ProductDetails({ product }: { product: Product }) {
  // State for product customization
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState('Large');
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
  // const [isRotating, setIsRotating] = useState(false);
  const [rotateStartAngle, setRotateStartAngle] = useState(0);

  // Preview state
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

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
  const handleColorSelect = (color: (typeof COLORS)[0]) => {
    setSelectedColor(color);
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
      alert('You can only customize the front and back views (first two images)');
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

    // Prevent default behavior to avoid scrolling
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !imageContainerRef.current) return;

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
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // setIsRotating(false);
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
    // setIsRotating(false);
  };

  // Handle logo resize with corner handles
  const handleResizeMouseDown = (e: React.MouseEvent, corner: string) => {
    const currentLogo = getCurrentLogo();
    if (!currentLogo.logoUrl || !imageContainerRef.current || !logoRef.current) return;

    e.stopPropagation(); // Prevent triggering drag

    const containerRect = imageContainerRef.current.getBoundingClientRect();
    // const logoRect = logoRef.current.getBoundingClientRect();

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
    // setIsRotating(true);

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
      // setIsRotating(false);
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

        // Create a new image for the t-shirt using the native Image constructor
        const tshirtImage = new window.Image();
        tshirtImage.crossOrigin = 'anonymous';
        tshirtImage.src = selectedColor.images[selectedImageIndex];

        // Handle t-shirt image load
        tshirtImage.onload = () => {
          // Draw the t-shirt image
          ctx.drawImage(tshirtImage, 0, 0, canvas.width, canvas.height);

          // If there's no logo, just return the t-shirt image
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

        // Handle t-shirt image error
        tshirtImage.onerror = (error) => {
          console.error('Error loading t-shirt image:', error);
          reject(new Error('Failed to load t-shirt image'));
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
      link.download = `${product.name}-${selectedColor.name}-${selectedImageIndex === 0 ? 'front' : 'back'}.png`;
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
      // Generate previews for front and back
      let frontPreview = null;
      let backPreview = null;

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

      // Create cart item with all customizations
      const cartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        color: selectedColor.name,
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

      // In a real app, you would dispatch this to your cart state/context
      console.log('Adding to cart:', cartItem);

      // Show confirmation
      alert(`Added ${quantity} ${product.name} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

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

  // Get product rating or default
  const rating = product.rating || 4.5;
  // const reviewCount = product.reviewCount || 42;

  // Get current logo for rendering
  const currentLogo = getCurrentLogo();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {/* Left Thumbnails - horizontal on mobile, vertical on desktop */}
      <div className="order-2 flex flex-row gap-2 overflow-x-auto pb-2 md:order-1 md:col-span-1 md:flex-col md:overflow-x-visible md:pb-0">
        {selectedColor.images.slice(0, 3).map((image, index) => (
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
              alt={`${product.name} view ${index + 1}`}
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
        ))}
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
          {/* T-shirt base image */}
          <Image
            src={selectedColor.images[selectedImageIndex] || '/placeholder.svg'}
            alt={`${product.name} - ${selectedColor.name}`}
            width={600}
            height={600}
            className="h-full w-full object-contain"
          />

          {/* Uploaded logo overlay */}
          {currentLogo.logoUrl && canCustomizeCurrentView() && (
            <div
              ref={logoRef}
              className="absolute cursor-move touch-manipulation"
              style={{
                left: `${currentLogo.position.x}%`,
                top: `${currentLogo.position.y}%`,
                width: `${currentLogo.size}%`,
                height: 'auto',
                transform: `translate(-50%, -50%) rotate(${currentLogo.rotation}deg)`,
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
                  : 'Model View'}
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
                      onClick={() => updateCurrentLogo({ rotation: 0 })}
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
        <h1 className="text-3xl font-bold">One Life Graphic T-shirt</h1>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={rating} />
          <span className="text-sm text-muted-foreground">{rating}/5</span>
        </div>

        {/* Description */}
        <p className="mt-4 text-muted-foreground">
          This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers
          superior comfort and style.
        </p>

        {/* Price */}
        <div className="mt-6 text-2xl font-bold">${product.price.toFixed(2)}</div>

        {/* Color Selection */}
        <div className="mt-6">
          <h3 className="font-medium">Select Colors</h3>
          <div className="mt-2 flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color.name}
                className={cn(
                  'relative h-12 w-12 rounded-full border-2 sm:h-10 sm:w-10',
                  selectedColor.name === color.name ? 'border-black' : 'border-transparent hover:border-gray-300',
                )}
                style={{ backgroundColor: color.value }}
                onClick={() => handleColorSelect(color)}
                aria-label={`Select ${color.name} color`}
              >
                {selectedColor.name === color.name && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-6">
          <h3 className="font-medium">Choose Size</h3>
          <div className="mt-2 flex flex-wrap gap-3">
            {SIZES.map((size) => (
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
        </div>

        {/* Logo Upload */}
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

        {/* Quantity and Add to Cart */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-14 items-center rounded-md border bg-gray-100 sm:h-12">
            <button
              className="flex h-full w-14 touch-manipulation items-center justify-center sm:w-12"
              onClick={decreaseQuantity}
            >
              <Minus className="h-5 w-5 sm:h-4 sm:w-4" />
            </button>
            <span className="flex h-full min-w-[40px] items-center justify-center px-2 text-lg sm:text-base">
              {quantity}
            </span>
            <button
              className="flex h-full w-14 touch-manipulation items-center justify-center sm:w-12"
              onClick={increaseQuantity}
            >
              <Plus className="h-5 w-5 sm:h-4 sm:w-4" />
            </button>
          </div>

          <Button
            className="flex h-14 flex-1 items-center justify-center gap-2 bg-black text-lg hover:bg-black/90 sm:h-12 sm:text-base"
            onClick={addToCart}
          >
            <ShoppingCart className="h-6 w-6 sm:h-5 sm:w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
