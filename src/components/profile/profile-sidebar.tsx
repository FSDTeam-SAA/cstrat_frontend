'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User,  Settings, ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { LogoutModal } from '../logout-modal';
import { useState } from 'react';

const menuItems = [
  {
    label: 'Profile Details',
    href: '/profile/personal-information',
    icon: User,
  },
  // {
  //   label: 'Notifications',
  //   href: '/profile/notifications',
  //   icon: Bell,
  // },
  {
    label: 'Change Password',
    href: '/profile/settings',
    icon: Settings,
  },
  {
    label: 'Order History',
    href: '/profile/order-history',
    icon: ShoppingBag,
  },
  // {
  //   label: 'Log out',
  //   href: '/profile/log-out',
  //   icon: LogOut,
  // },
];



export default function ProfileSidebar() {
  const pathname = usePathname();

 const [showModal, setShowModal] = useState(false);

  

  return (
<>
<nav className="mt-6">
      <ul className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${
                  isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    

   <Button
     onClick={() => setShowModal(true)}
   className=' btn-start  font-bold bg-black my-5'><LogOut/>  LogOut</Button>
 
    </nav>
    <LogoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
</>
  );
}
