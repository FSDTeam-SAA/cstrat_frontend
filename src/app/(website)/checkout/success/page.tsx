'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { verifyPayment } from '@/lib/api-services';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<{
    verified: boolean;
    message: string;
    orderNumber?: string;
  }>({
    verified: false,
    message: 'Verifying your payment...',
  });

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setPaymentStatus({
        verified: false,
        message: 'Invalid payment session. Please contact customer support.',
      });
      setIsVerifying(false);
      return;
    }

    const verifyPaymentStatus = async () => {
      try {
        const response = await verifyPayment(sessionId);

        if (response.status && response.paid) {
          setPaymentStatus({
            verified: true,
            message: 'Your payment has been successfully processed!',
            orderNumber: response.payment?.orderId,
          });
        } else {
          setPaymentStatus({
            verified: false,
            message: 'Payment verification failed. Please contact customer support.',
          });
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setPaymentStatus({
          verified: false,
          message: 'An error occurred while verifying your payment. Please contact customer support.',
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPaymentStatus();
  }, [searchParams]);

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader title="Payment Status" backgroundImage="/images/payment-bg.jpg" />

      <div className="container py-16">
        <div className="mx-auto max-w-md text-center">
          {isVerifying ? (
            <div className="flex flex-col items-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-black"></div>
              <h2 className="mb-2 text-2xl font-bold">Verifying Payment</h2>
              <p className="text-gray-600">Please wait while we verify your payment...</p>
            </div>
          ) : paymentStatus.verified ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
              <h2 className="mb-2 text-2xl font-bold">Payment Successful!</h2>
              <p className="mb-6 text-gray-600">{paymentStatus.message}</p>
              {paymentStatus.orderNumber && <p className="mb-6 text-gray-800">Order ID: {paymentStatus.orderNumber}</p>}
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => router.push('/account/orders')}>
                  View Orders
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push('/shop')}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <span className="text-2xl text-red-500">×</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold">Payment Failed</h2>
              <p className="mb-6 text-gray-600">{paymentStatus.message}</p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => router.push('/checkout/payment')}>
                  Try Again
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push('/contact')}>
                  Contact Support
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
