'use client';
import Image from 'next/image';
import { InstagramIcon } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
export function UserProfile() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user } = useAuth()
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-2 h-28 w-28">
      {user?.image ? (
    <Image
      src={user.image}
      alt={user.name?.charAt(0) || 'D'}
      width={112}
      height={112}
      className="rounded-full border border-gray-200 object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-3xl font-semibold text-gray-600">
      {user?.name?.charAt(0).toUpperCase() || 'D'}
    </div>
  )}
        <div className="absolute bottom-0 right-0 rounded-full border border-gray-200 bg-white p-1">
          <InstagramIcon />
          {/* <Image src="/instagram-icon.png" alt="Instagram" width={20} height={20} /> */}
        </div>
      </div>
      {user && <h2 className="text-xl font-bold">{user.name}</h2>}
      {user && <p className="text-sm text-gray-500">{user.email}</p>}
    </div>
  );
}
