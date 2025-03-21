import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import ProductGrid from '@/components/shop/product-grid';
import ProductFilters from '@/components/shop/product-filters';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const categoryName = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full">
        <div className="absolute inset-0 z-10 bg-black/50"></div>
        <div
          className="relative z-20 flex h-[300px] w-full flex-col items-center justify-center bg-cover bg-center text-white md:h-[400px]"
          style={{
            backgroundImage: "url('/images/shop-hero.jpg')",
          }}
        >
          <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">{categoryName}</h1>
          <p className="text-xl">Style That Speaks, Comfort That Lasts.</p>
        </div>
      </div>

      <div className="container py-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem aria-current="page">
            <BreadcrumbLink>{categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

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
