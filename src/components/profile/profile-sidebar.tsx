'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Bell, CreditCard, History, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

interface ProfileSidebarProps {
  activeItem: string;
}

export default function ProfileSidebar({ activeItem }: ProfileSidebarProps) {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'personal', label: 'Personal Information', icon: <User className="mr-2 h-5 w-5" />, href: '/profile' },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="mr-2 h-5 w-5" />,
      href: '/profile/notifications',
    },
    { id: 'settings', label: 'Settings', icon: <Settings className="mr-2 h-5 w-5" />, href: '/profile/settings' },
    { id: 'orders', label: 'Order History', icon: <History className="mr-2 h-5 w-5" />, href: '/profile/orders' },
    {
      id: 'payment',
      label: 'Payment Methods',
      icon: <CreditCard className="mr-2 h-5 w-5" />,
      href: '/profile/payment',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-full">
          <Image src="/placeholder.svg?height=96&width=96" alt="Profile" fill className="object-cover" />
        </div>
        <h2 className="text-lg font-bold">Darrell Steward</h2>
        <p className="text-sm text-gray-500">darrellsteward@gmail.com</p>
      </div>

      <div className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'flex items-center rounded-md px-3 py-2 text-sm',
              activeItem === item.id ? 'bg-black text-white' : 'hover:bg-gray-100',
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        <button
          onClick={logout}
          className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
