'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Hideon from '@/provider/Hideon';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, Subcategory } from '@/lib/api';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // Fetch categories with retry
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Fetch subcategories with retry
  // const { data: subcategoriesData } = useQuery({
  //   queryKey: ['subcategories'],
  //   queryFn: fetchSubcategories,
  //   retry: 3,
  //   retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  // });

  // Create a map of category ID to subcategories
  const categorySubcategoriesMap = new Map<string, Subcategory[]>();

  // Filter categories that have at least one subcategory
  const categoriesWithSubcategories = categoryData?.data.filter(
    (category) => (categorySubcategoriesMap.get(category?._id) || []).length > 0,
  );

  console.log(categoriesWithSubcategories);

  return (
    <Hideon routes={['/sign-up', '/login', '/reset-password', '/verify-otp', '/reset-password', '/forgot-password']}>
      <footer className="bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <Image src="/logo.svg" alt="Drip Swag" width={120} height={40} className="h-10 w-auto" />
              </Link>
              <p className="max-w-xs text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu tortor vehicula. Fames dolor
                nibh cursus pulvinar diam risus.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-gray-300">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>

            {/* Shop Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Shop</h3>
              <ul className="space-y-2">
<<<<<<< HEAD
                {categoryData?.data?.map((category) => (
                  <li key={category._id}>
                    <a href="#" className="text-sm hover:underline">
                      {category.categoryName}
                    </a>
                  </li>
                ))}
=======
                <li>
                  <Link href="/shop/clothing" className="text-sm hover:underline">
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link href="/shop/bags" className="text-sm hover:underline">
                    Bags
                  </Link>
                </li>
                <li>
                  <Link href="/shop/writing" className="text-sm hover:underline">
                    Writing Items
                  </Link>
                </li>
                <li>
                  <Link href="/shop/tech" className="text-sm hover:underline">
                    Tech Products
                  </Link>
                </li>
                <li>
                  <Link href="/shop/drinkware" className="text-sm hover:underline">
                    Drink Ware
                  </Link>
                </li>
>>>>>>> ab4f8dd369f9c20a841cbd3f6c16a74d51f72ade
              </ul>
            </div>

            {/* Collection Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Collection</h3>
              <ul className="space-y-2">
                <li>
<<<<<<< HEAD
                  <Link href="#best-sellers" className="text-sm hover:underline">
                    Best Sellers
                  </Link>
                </li>
=======
                  <Link href="/collection/best-sellers" className="text-sm hover:underline">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="/collection/buying-guide" className="text-sm hover:underline">
                    Buying Guide
                  </Link>
                </li>
                <li>
                  <Link href="/collection/golf" className="text-sm hover:underline">
                    Golf
                  </Link>
                </li>
                <li>
                  <Link href="/collection/new-arrivals" className="text-sm hover:underline">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/collection/budget-friendly" className="text-sm hover:underline">
                    Budget Friendly
                  </Link>
                </li>
>>>>>>> ab4f8dd369f9c20a841cbd3f6c16a74d51f72ade
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Support</h3>
              <ul className="space-y-2">
                <li>
<<<<<<< HEAD
=======
                  <Link href="/faq" className="text-sm hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
>>>>>>> ab4f8dd369f9c20a841cbd3f6c16a74d51f72ade
                  <Link href="/privacy-policy" className="text-sm hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
<<<<<<< HEAD
                  <Link href="/temrs-conditions" className="text-sm hover:underline">
                    Terms of Service
=======
                  <Link href="/terms-conditions" className="text-sm hover:underline">
                    Terms and conditions
                  </Link>
                </li>
                <li>
                  <Link href="/support/shipping" className="text-sm hover:underline">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/support/returns" className="text-sm hover:underline">
                    Returns
>>>>>>> ab4f8dd369f9c20a841cbd3f6c16a74d51f72ade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-400">
            © {currentYear} Drip Swag All rights reserved.
          </div>
        </div>
      </footer>
    </Hideon>
  );
}
