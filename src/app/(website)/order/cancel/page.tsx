'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-2xl font-bold text-red-600">Order Cancellation!</h1>
      <p className="mt-4">Your order has been successfully cancelled.</p>
      <p className="mt-2">If you have any questions, please contact our support team.</p>
      <Button className="mt-4">
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  );
}
