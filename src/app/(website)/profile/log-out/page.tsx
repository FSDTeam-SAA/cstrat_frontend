'use client';

import { useState, useEffect } from 'react';
import { LogoutModal } from '@/components/logout-modal';

export default function LogOut() {
  const [showModal, setShowModal] = useState(false);

  // Show the modal when the page loads
  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div className="max-w-full">
      <h1 className="mb-6 text-2xl font-bold">Log Out</h1>

      <div className="max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Log Out</h2>
        <p className="mb-6 text-gray-600">Click the button below to log out of your account.</p>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-md bg-black px-4 py-2 text-white hover:bg-black/90"
        >
          Log Out
        </button>
      </div>

      <LogoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
