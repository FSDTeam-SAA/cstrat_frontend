import { Suspense } from 'react';
import ProductDetails from '@/components/product/product-details';
import RelatedProducts from '@/components/product/related-products';
import ProductTabs from '@/components/product/product-tabs';
import { PageHeader } from '@/components/shared/page-header';
import { getProduct } from '@/lib/productApi';

// This ensures the page is statically generated at build time
// but revalidated every 60 seconds
export const revalidate = 60;

// Generate static params for the most popular products
export async function generateStaticParams() {
  // In a real app, you would fetch the most popular product IDs here
  return [{ id: '6800e58a33e88d53c58c411b' }];
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Fetch initial product data for SSR
  const initialProductData = await getProduct(params.id).catch(() => null);

  return (
    <div className="">
      <PageHeader title="Shop" subtitle="Style That Speaks, Comfort That Lasts." />
      <div className="container mx-auto px-4 py-6">
        {/* Product Details */}
        <Suspense fallback={<div>Loading product details...</div>}>
          <ProductDetails productId={params.id} initialData={initialProductData} />
        </Suspense>

        {/* Product Tabs */}
        <div className="mt-8">
          <ProductTabs productId={params.id} initialData={initialProductData} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          <Suspense fallback={<div>Loading related products...</div>}>
            <RelatedProducts
              // productId={params.id}
              category={initialProductData?.category?.categoryName}
              // subcategory={initialProductData?.subcategory?.subCategoryName}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
