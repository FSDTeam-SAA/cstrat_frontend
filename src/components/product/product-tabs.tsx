'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProduct } from '@/hooks/use-product';
import type { Product } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';
import ProductReview from './ProductReview';
import AddProductReview from './AddProductReview';

interface ProductTabsProps {
  productId: string;
  initialData?: Product | null;
}

export default function ProductTabs({ productId, initialData }: ProductTabsProps) {
  const { data: product, isLoading } = useProduct(productId);
  const [activeTab, setActiveTab] = useState('description');
console.log("product", product?.name);
  // Use initialData if available, otherwise use fetched data
  const productData = product || initialData;

  if (isLoading && !initialData) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          <p>{productData?.description || 'No description available.'}</p>
        </div>
      </TabsContent>
      <TabsContent value="details" className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium">Product Details</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="font-medium">SKU</span>
                <span>{productData?.sku || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Category</span>
                <span>{productData?.category?.categoryName || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Subcategory</span>
                <span>{productData?.subcategory?.subCategoryName || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Type</span>
                <span className="capitalize">{productData?.type || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Status</span>
                <span className="capitalize">{productData?.status || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Sustainability</span>
                <span className="capitalize">{productData?.sustainability || 'N/A'}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Availability</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="font-medium">In Stock</span>
                <span>{productData?.inStock ? 'Yes' : 'No'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Quantity</span>
                <span>{productData?.quantity || 0}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Customizable</span>
                <span>{productData?.isCustomizable ? 'Yes' : 'No'}</span>
              </li>
            </ul>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-4">
<AddProductReview productId={productId}/>
      
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Customer Reviews </h3>
         
            <div className="flex items-center">
              <span className="text-sm font-medium">{productData?.rating || 0}/5</span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({productData?.reviewCount || 0} {productData?.reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
          <ProductReview productId={productId} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
