'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchCategories,
  fetchSubcategories,
  fetchSubcategoriesByCategory,
  type Subcategory,
  type CategoriesResponse,
  type SubcategoriesResponse,
} from '@/lib/api';
import { useMemo } from 'react';

// Constants for query keys
const QUERY_KEYS = {
  categories: 'categories',
  subcategories: 'subcategories',
} as const;

// Hook to fetch all categories
export function useCategories() {
  return useQuery<CategoriesResponse, Error>({
    queryKey: [QUERY_KEYS.categories],
    queryFn: fetchCategories,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    select: (data) => data, // Optional transform of the data
  });
}

// Hook to fetch all subcategories
export function useSubcategories() {
  return useQuery<SubcategoriesResponse, Error>({
    queryKey: [QUERY_KEYS.subcategories],
    queryFn: fetchSubcategories,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}

// Hook to fetch subcategories for a specific category
export function useSubcategoriesByCategory(categoryId: string | null) {
  return useQuery<Subcategory[], Error>({
    queryKey: [QUERY_KEYS.subcategories, categoryId],
    queryFn: () => fetchSubcategoriesByCategory(categoryId!),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!categoryId, // Only fetch if categoryId is provided
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}

// Hook to get a structured menu with categories and their subcategories
export function useShopMenu() {
  const categoriesQuery = useCategories();
  const subcategoriesQuery = useSubcategories();

  const isLoading = categoriesQuery.isLoading || subcategoriesQuery.isLoading;
  const error = categoriesQuery.error || subcategoriesQuery.error;

  // Process the data to create a structured menu
  const menuData = useMemo(() => {
    if (isLoading || error || !categoriesQuery.data || !subcategoriesQuery.data) {
      return [];
    }

    const categories = categoriesQuery.data.data || [];
    const subcategories = subcategoriesQuery.data.subCategories || [];

    // Create a map of category ID to subcategories for better performance
    const categorySubcategoriesMap = new Map<string, Subcategory[]>();

    subcategories.forEach((subcategory) => {
      const categoryId = subcategory.category._id;
      if (!categorySubcategoriesMap.has(categoryId)) {
        categorySubcategoriesMap.set(categoryId, []);
      }
      categorySubcategoriesMap.get(categoryId)?.push(subcategory);
    });

    // Create the menu structure with proper typing
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
      .filter((category) => category.subcategories.length > 0);
  }, [categoriesQuery.data, subcategoriesQuery.data, isLoading, error]);

  return {
    menuData,
    isLoading,
    error,
    isFetching: categoriesQuery.isFetching || subcategoriesQuery.isFetching,
    refetch: () => {
      categoriesQuery.refetch();
      subcategoriesQuery.refetch();
    },
  };
}

// Types for the returned menu structure
export interface MenuSubcategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  categoryId: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image?: string;
  slug: string;
  subcategories: MenuSubcategory[];
}
