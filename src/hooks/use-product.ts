'use client';

import { useQuery } from '@tanstack/react-query';
import { getProduct, getAllProducts } from '@/lib/productApi';
import type { Product } from '@/types/product';

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

export function useAllProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
}

export function useRelatedProducts(currentProductId: string, category?: string, subcategory?: string) {
  const { data: allProducts = [], isLoading, error } = useAllProducts();

  const relatedProducts = !Array.isArray(allProducts)
    ? []
    : allProducts
        .filter(
          (product: Product) =>
            product._id !== currentProductId &&
            (product.category?.categoryName === category || product.subcategory?.subCategoryName === subcategory),
        )
        .slice(0, 4);

  return {
    data: relatedProducts,
    isLoading,
    error,
  };
}
