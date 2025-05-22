// app/order/success/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payments/verify/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data?.status || 'error');
        })
        .catch(() => setStatus('error'));
    } else {
      setStatus('missing');
    }
  }, [sessionId]);

  if (!status || status === 'Verifying...') {
    return <FailureOrLoadingUI status="loading" />;
  }

  return status !== 'paid' ? <SuccessUI /> : <FailureOrLoadingUI status={status} />;
}

function SuccessUI() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 text-center">
      <CheckCircle className="h-20 w-20 text-green-500" />
      <h1 className="mt-4 text-2xl font-bold">Payment Successful</h1>
      <p className="mt-2 text-gray-600">Thank you! Your payment was processed successfully.</p>
      <Button className="hover:bg-primary-dark mt-4 bg-primary text-white">
        <Link href="/shop">Go to Products</Link>
      </Button>
    </div>
  );
}

function FailureOrLoadingUI({ status }: { status: string }) {
  if (status === 'loading') {
    return (
      <div className="flex h-screen flex-col items-center justify-center px-6 text-center">
        <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
        <h1 className="mt-4 text-xl font-semibold">Verifying Payment...</h1>
      </div>
    );
  }

  const isMissing = status === 'missing';

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 text-center">
      <XCircle className="h-20 w-20 text-red-500" />
      <h1 className="mt-4 text-2xl font-bold">Payment Failed</h1>
      <p className="mt-2 text-gray-600">
        {isMissing ? 'Session ID is missing from the URL.' : "We couldn't verify your payment. Please try again."}
      </p>
      <Button className="hover:bg-primary-dark mt-4 bg-primary text-white">
        <Link href="/shop">Go to Products</Link>
      </Button>
    </div>
  );
}
