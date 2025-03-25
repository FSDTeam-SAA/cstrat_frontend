'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { categories } from '@/lib/data';

// This component helps connect the navbar shop menu with the product listing pages
export default function ShopMenuConnector() {
  const router = useRouter();

  // Listen for custom events from the navbar
  useEffect(() => {
    const handleCategoryClick = (event: CustomEvent) => {
      const { category, subcategory } = event.detail;

      // Find the category and subcategory in our data
      const categoryData = categories.find((cat) => cat.slug === category);
      if (!categoryData) return;

      // If subcategory is provided, navigate to it
      if (subcategory) {
        router.push(`/shop/${category}/${subcategory}`);
      } else {
        // Otherwise navigate to the first subcategory of the category
        const firstSubcategory = categoryData.subcategories?.[0]?.toLowerCase().replace(/\s+/g, '-');
        if (firstSubcategory) {
          router.push(`/shop/${category}/${firstSubcategory}`);
        }
      }
    };

    // Add event listener
    window.addEventListener('shop:category:click', handleCategoryClick as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('shop:category:click', handleCategoryClick as EventListener);
    };
  }, [router]);

  return null;
}
