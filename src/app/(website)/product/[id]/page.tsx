import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductDetails from '@/components/product/product-details';
import RelatedProducts from '@/components/product/related-products';
import ProductTabs from '@/components/product/product-tabs';
import { products } from '@/lib/data';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id) || products[0];

  // Get category and subcategory for breadcrumb
  const category = product.category;
  const subcategory = product.subcategory;

  // Format category and subcategory names for display
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const subcategoryName = subcategory
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center text-sm">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <Link href={`/shop/${category}`} className="hover:underline">
          {categoryName}
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <Link href={`/shop/${category}/${subcategory}`} className="hover:underline">
          {subcategoryName}
        </Link>
      </nav>

      {/* Product Details */}
      <Suspense fallback={<div>Loading product details...</div>}>
        <ProductDetails product={product} />
      </Suspense>

      {/* Product Tabs */}
      <div className="mt-8">
        <ProductTabs product={product} />
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
        <Suspense fallback={<div>Loading related products...</div>}>
          <RelatedProducts
            category={product.category}
            subcategory={product.subcategory}
            currentProductId={product.id}
          />
        </Suspense>
      </div>
    </div>
  );
}
