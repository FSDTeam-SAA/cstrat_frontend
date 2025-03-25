import { Suspense } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ProductGrid from '@/components/shop/product-grid-container';
import ProductFilters from '@/components/shop/product-filter-l';
import CategoryTabs from '@/components/shop/category-tabs';
import { categories } from '@/lib/data';

export default function CategoryPage({ params }: { params: { category: string; subcategory: string } }) {
  const { category, subcategory } = params;

  // Find the category data
  const categoryData = categories.find((cat) => cat.slug === category) || categories[0];

  // Find the current subcategory display name
  const subcategoryDisplayName =
    categoryData.subcategories?.find((subcat) => subcat.toLowerCase().replace(/\s+/g, '-') === subcategory) ||
    subcategory
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center text-sm">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <Link href={`/shop/${category}`} className="hover:underline">
          {categoryData.name}
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium">{subcategoryDisplayName}</span>
      </nav>

      {/* Category Tabs - Mobile */}
      <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
        <CategoryTabs category={categoryData} currentSubcategory={subcategoryDisplayName} />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        {/* Sidebar Filters */}
        <aside className="hidden md:block">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilters category={categoryData} subcategory={subcategoryDisplayName} />
          </Suspense>
        </aside>

        {/* Main Content */}
        <main>
          <div className="mb-6 flex flex-col">
            <h1 className="text-2xl font-bold">{subcategoryDisplayName}</h1>
            <p className="text-sm text-muted-foreground">({categoryData.productCount} Products)</p>
          </div>

          {/* Category Tabs - Desktop */}
          <div className="mb-6 hidden gap-2 md:flex">
            <CategoryTabs category={categoryData} currentSubcategory={subcategoryDisplayName} />
          </div>

          {/* Mobile Filters Button */}
          <div className="mb-6 md:hidden">
            <ProductFilters category={categoryData} subcategory={subcategoryDisplayName} />
          </div>

          {/* Product Grid */}
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid category={categoryData} subcategory={subcategoryDisplayName} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
