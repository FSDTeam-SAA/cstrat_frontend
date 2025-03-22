'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  onShopHover?: () => void;
  onShopLeave?: () => void;
  className?: string;
}

export default function NavLinks({ onShopHover, onShopLeave, className }: NavLinksProps) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/shop', label: 'Shop', hasSubmenu: true },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className={cn('flex items-center gap-6', className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-gray-300',
            pathname === link.href && 'underline underline-offset-4',
          )}
          onMouseEnter={link.hasSubmenu ? onShopHover : undefined}
          onMouseLeave={link.hasSubmenu ? onShopLeave : undefined}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
