'use client';


import Image from 'next/image';
import { useAuth } from '@/context/auth-context';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {

  
const {logout} = useAuth() // Get user data from useAuth hook

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 text-center">
        <div className="mb-6 flex justify-center">
          <Image src="/logo.svg" alt="Drip Swag" width={120} height={40} className="h-10 w-auto" />
        </div>

        <h2 className="mb-6 text-xl font-bold">Are You Sure You Want to Log Out?</h2>

        <div className="space-y-3">
          <button
            onClick={logout}
            className="w-full rounded-md border border-black py-3 transition-colors hover:bg-gray-50"
          >
            Yes
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-md bg-black py-3 text-white transition-colors hover:bg-black/90"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
