'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchCategories, fetchSubcategories } from '@/lib/api';
import { useFilterStore } from '@/store/filter-store';

// Component that uses the query hooks
function ShopMenuConnectorData() {
  const router = useRouter();
  const { setCategory, setSubcategory, resetFilters } = useFilterStore();

  // Fetch categories with retry
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Fetch subcategories with retry
  const { data: subcategoriesData, isLoading: isSubcategoriesLoading } = useQuery({
    queryKey: ['subcategories'],
    queryFn: fetchSubcategories,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Listen for custom events from the navbar
  useEffect(() => {
    const handleCategoryClick = (event: CustomEvent) => {
      const { category, subcategory } = event.detail;

      // Don't proceed if data is still loading
      if (isCategoriesLoading || isSubcategoriesLoading) return;

      // Don't proceed if data is missing
      if (!categoriesData?.data || !subcategoriesData?.subCategories) return;

      // Find the category by name (case insensitive)
      const categoryData = categoriesData.data.find((cat) => cat.categoryName.toLowerCase() === category.toLowerCase());

      // If category not found, don't navigate
      if (!categoryData) return;

      const categorySlug = categoryData.categoryName.toLowerCase().replace(/\s+/g, '-');

      // Reset filters when navigating
      resetFilters();

      // Set the category in the store
      setCategory(categorySlug);

      // If subcategory is provided, navigate to it
      if (subcategory) {
        // Set the subcategory in the store
        setSubcategory(subcategory);
        router.push(`/shop/${categorySlug}/${subcategory}`);
      } else {
        // Otherwise navigate to the first subcategory of the category
        const categorySubcategories = subcategoriesData.subCategories.filter(
          (subcat) => subcat.category._id === categoryData._id,
        );

        // Sort subcategories alphabetically
        const sortedSubcategories = [...categorySubcategories].sort((a, b) =>
          a.subCategoryName.localeCompare(b.subCategoryName),
        );

        if (sortedSubcategories.length > 0) {
          const firstSubcategory = sortedSubcategories[0].subCategoryName.toLowerCase().replace(/\s+/g, '-');
          setSubcategory(firstSubcategory);
          router.push(`/shop/${categorySlug}/${firstSubcategory}`);
        } else {
          // If no subcategories, navigate to the category page
          router.push(`/shop/${categorySlug}`);
        }
      }
    };

    // Add event listener
    window.addEventListener('shop:category:click', handleCategoryClick as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('shop:category:click', handleCategoryClick as EventListener);
    };
  }, [
    router,
    categoriesData,
    subcategoriesData,
    isCategoriesLoading,
    isSubcategoriesLoading,
    resetFilters,
    setCategory,
    setSubcategory,
  ]);

  return null;
}

// Main component that ensures QueryClient is available
export default function ShopMenuConnector() {
  // Create a client with optimized settings
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            // cacheTime: 1000 * 60 * 30, // 30 minutes
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
      <ShopMenuConnectorData />
    </QueryClientProvider>
  );
}
