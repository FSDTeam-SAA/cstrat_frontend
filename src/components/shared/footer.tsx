import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto flex items-center justify-between gap-4 py-6">
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <Image src="/logo.svg" alt="Drip Swag" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <p className="max-w-xs text-sm text-gray-300">
            Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu tortor vehicula. Fames dolor nibh
            cursus pulvinar diam risus.
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

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Shop</h3>
          <ul className="space-y-2">
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
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Collection</h3>
          <ul className="space-y-2">
            <li>
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
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/support/faq" className="text-sm hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/support/privacy-policy" className="text-sm hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/support/terms-of-service" className="text-sm hover:underline">
                Terms of Service
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
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container py-6 text-center text-sm text-gray-400">
          © {currentYear} Drip Swag All rights reserved.
        </div>
      </div>
    </footer>
  );
}
