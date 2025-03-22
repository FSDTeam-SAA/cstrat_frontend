import ProductGrid from '@/components/shop/product-grid';
import ProductFilters from '@/components/shop/product-filters';

export default function ShopPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <ProductFilters />
          </div>
          <div className="md:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
