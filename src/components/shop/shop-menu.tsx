'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchCategories, fetchSubcategories } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFilterStore } from '@/store/filter-store';

interface Category {
  _id: string;
  categoryName: string;
  description: string;
  categoryImage?: string;
  stock: number;
  sales: number;
  createdAt: string;
  updatedAt: string;
}

interface Subcategory {
  _id: string;
  subCategoryName: string;
  category: Category;
  description: string;
  stock: number;
  sales: number;
  createdAt: string;
  updatedAt: string;
}

// Component that uses the query hooks
function ShopMenuData() {
  const { setCategory, setSubcategory, resetFilters } = useFilterStore();

  // Fetch categories with retry
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Fetch subcategories with retry
  const {
    data: subcategoriesData,
    isLoading: isSubcategoriesLoading,
    error: subcategoriesError,
    refetch: refetchSubcategories,
  } = useQuery({
    queryKey: ['subcategories'],
    queryFn: fetchSubcategories,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Handle loading state
  if (isCategoriesLoading || isSubcategoriesLoading) {
    return <LoadingState />;
  }

  // Handle error state with retry option
  if (categoriesError || subcategoriesError) {
    return (
      <div className="container py-6">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load shop menu data.
            {categoriesError ? ` Categories error: ${categoriesError.message}` : ''}
            {subcategoriesError ? ` Subcategories error: ${subcategoriesError.message}` : ''}
          </AlertDescription>
        </Alert>
        <button
          onClick={() => {
            refetchCategories();
            refetchSubcategories();
          }}
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Process the data to group subcategories by category
  const categories = categoriesData?.data || [];
  const subcategories = subcategoriesData?.subCategories || [];

  // Handle empty data
  if (categories.length === 0) {
    return (
      <div className="container py-6">
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Categories</AlertTitle>
          <AlertDescription>No product categories are available at the moment.</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Create a map of category ID to subcategories
  const categorySubcategoriesMap = new Map<string, Subcategory[]>();

  subcategories.forEach((subcategory: Subcategory) => {
    const categoryId = subcategory.category?._id;
    if (!categorySubcategoriesMap.has(categoryId)) {
      categorySubcategoriesMap.set(categoryId, []);
    }
    categorySubcategoriesMap.get(categoryId)?.push(subcategory);
  });

  // Filter categories that have at least one subcategory
  const categoriesWithSubcategories = categories.filter(
    (category) => (categorySubcategoriesMap.get(category._id) || []).length > 0,
  );

  // If no categories have subcategories, show a message
  if (categoriesWithSubcategories.length === 0) {
    return (
      <div className="container py-6">
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Subcategories</AlertTitle>
          <AlertDescription>No product subcategories are available at the moment.</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Find a featured category (using the first one with an image for this example)
  const featuredCategory = categories.find((category) => category.categoryImage) || categories[0];

  // Handle menu item click
  const handleMenuItemClick = (categorySlug: string, subcategorySlug: string) => {
    // Reset filters when navigating to a new category/subcategory
    resetFilters();

    // Set the new category and subcategory
    setCategory(categorySlug);
    setSubcategory(subcategorySlug);
  };

  return (
    <div className="container grid grid-cols-1 gap-4 py-6 md:grid-cols-6">
      {categoriesWithSubcategories.map((category: Category) => {
        const categorySubcategories = categorySubcategoriesMap.get(category._id) || [];

        // Sort subcategories alphabetically
        const sortedSubcategories = [...categorySubcategories].sort((a, b) =>
          a.subCategoryName.localeCompare(b.subCategoryName),
        );

        const categorySlug = category.categoryName.toLowerCase().replace(/\s+/g, '-');

        return (
          <div key={category._id} className="space-y-3 border-r border-dashed border-gray-200 pr-4 last:border-r-0">
            <h3 className="font-bold">{category.categoryName}</h3>
            <ul className="space-y-2">
              {sortedSubcategories.map((subcategory: Subcategory) => {
                const subcategorySlug = subcategory.subCategoryName.toLowerCase().replace(/\s+/g, '-');

                return (
                  <li key={subcategory._id}>
                    <Link
                      href={`/shop/${categorySlug}/${subcategorySlug}`}
                      className="text-sm hover:underline"
                      onClick={() => handleMenuItemClick(categorySlug, subcategorySlug)}
                    >
                      {subcategory.subCategoryName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <div className="space-y-3">
        <h3 className="font-bold">Our Most Valuable Products</h3>
        <div className="relative h-32 w-full">
          {featuredCategory?.categoryImage ? (
            <Image
              src={featuredCategory.categoryImage || '/placeholder.svg'}
              alt={`${featuredCategory.categoryName} category`}
              fill
              className="rounded-md object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="flex h-32 w-full items-center justify-center rounded-md bg-gray-200">
              <p className="text-sm text-gray-500">Featured products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main component that ensures QueryClient is available
export default function ShopMenuContent() {
  // Create a client with optimized settings
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
            retry: 3,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ShopMenuData />
    </QueryClientProvider>
  );
}

function LoadingState() {
  return (
    <div className="container grid grid-cols-1 gap-4 py-6 md:grid-cols-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="space-y-3 border-r border-dashed border-gray-200 pr-4 last:border-r-0">
          <Skeleton className="h-6 w-24" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-32" />
            ))}
          </div>
        </div>
      ))}
      <div className="space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>
    </div>
  );
}
