import { redirect } from 'next/navigation';
import { categories } from '@/lib/data';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  // Find the category data
  const categoryData = categories.find((cat) => cat.slug === category);

  if (!categoryData) {
    // If category doesn't exist, redirect to shop
    redirect('/shop');
  }

  // Get the first subcategory
  const firstSubcategory = categoryData.subcategories?.[0]?.toLowerCase().replace(/\s+/g, '-') || 't-shirt';

  // Redirect to the first subcategory

  redirect(`/shop/${category}/${firstSubcategory}`);
}
