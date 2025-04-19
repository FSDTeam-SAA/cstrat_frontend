'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchSubcategories, fetchSubcategoriesByCategory } from '@/lib/api';

// Hook to fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook to fetch all subcategories
export function useSubcategories() {
  return useQuery({
    queryKey: ['subcategories'],
    queryFn: fetchSubcategories,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook to fetch subcategories for a specific category
export function useSubcategoriesByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => fetchSubcategoriesByCategory(categoryId),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Only fetch if categoryId is provided
    enabled: !!categoryId,
  });
}

// Hook to get a structured menu with categories and their subcategories
export function useShopMenu() {
  const categoriesQuery = useCategories();
  const subcategoriesQuery = useSubcategories();

  const isLoading = categoriesQuery.isLoading || subcategoriesQuery.isLoading;
  const error = categoriesQuery.error || subcategoriesQuery.error;

  // Process the data to create a structured menu
  const menuData = React.useMemo(() => {
    if (isLoading || error || !categoriesQuery.data || !subcategoriesQuery.data) {
      return [];
    }

    const categories = categoriesQuery.data.data || [];
    const subcategories = subcategoriesQuery.data.subCategories || [];

    // Create a map of category ID to subcategories
    const categorySubcategoriesMap = new Map();

    subcategories.forEach((subcategory) => {
      const categoryId = subcategory.category._id;
      if (!categorySubcategoriesMap.has(categoryId)) {
        categorySubcategoriesMap.set(categoryId, []);
      }
      categorySubcategoriesMap.get(categoryId).push(subcategory);
    });

    // Create the menu structure
    return categories
      .map((category) => {
        const categorySubcategories = categorySubcategoriesMap.get(category._id) || [];

        // Sort subcategories alphabetically
        const sortedSubcategories = [...categorySubcategories].sort((a, b) =>
          a.subCategoryName.localeCompare(b.subCategoryName),
        );

        return {
          id: category._id,
          name: category.categoryName,
          description: category.description,
          image: category.categoryImage,
          slug: category.categoryName.toLowerCase().replace(/\s+/g, '-'),
          subcategories: sortedSubcategories.map((subcategory) => ({
            id: subcategory._id,
            name: subcategory.subCategoryName,
            description: subcategory.description,
            slug: subcategory.subCategoryName.toLowerCase().replace(/\s+/g, '-'),
            categoryId: category._id,
          })),
        };
      })
      .filter((category) => category.subcategories.length > 0); // Only include categories with subcategories
  }, [categoriesQuery.data, subcategoriesQuery.data, isLoading, error]);

  return {
    menuData,
    isLoading,
    error,
    refetch: () => {
      categoriesQuery.refetch();
      subcategoriesQuery.refetch();
    },
  };
}
