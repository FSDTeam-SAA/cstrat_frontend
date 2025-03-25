'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CategoryData {
  name: string;
  slug: string;
  productCount: number;
  subcategories?: string[];
}

export default function CategoryTabs({
  category,
  currentSubcategory,
}: {
  category: CategoryData;
  currentSubcategory?: string;
}) {
  const subcategories = category.subcategories || [];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {subcategories.map((subcat) => {
        const subcategorySlug = subcat.toLowerCase().replace(/\s+/g, '-');
        return (
          <Button key={subcat} variant={currentSubcategory === subcat ? 'default' : 'outline'} size="sm" asChild>
            <Link href={`/shop/${category.slug}/${subcategorySlug}`}>{subcat}</Link>
          </Button>
        );
      })}
    </div>
  );
}
