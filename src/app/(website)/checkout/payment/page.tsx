'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { useCartStore } from '@/store/useCartStore';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { createCustomizedOrder, createPayment } from '@/lib/api-services';
import { useAuth } from '@/context/auth-context';

export default function PaymentPage() {
  const router = useRouter();
  const { items, getDeliveryInfo } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log('user', user);

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const deliveryInfo = getDeliveryInfo();

      if (!deliveryInfo) {
        alert('Delivery information is missing. Please go back and fill in your delivery details.');
        router.push('/checkout');
        return;
      }

      const selectedItems = items.filter((item) => item.selected);

      if (selectedItems.length === 0) {
        alert('No items selected for checkout');
        router.push('/cart');
        return;
      }

      if (!user?._id) {
        throw new Error('User ID is required to place an order');
      }

      const userId = user._id;
      const orderIds: string[] = [];

      for (const item of selectedItems) {
        let sizeValue = 'M';
        if (item.size) {
          if (typeof item.size === 'string') {
            if (item.size.startsWith('[') && item.size.includes('"')) {
              try {
                const parsed = JSON.parse(item.size);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  sizeValue = parsed[0];
                }
              } catch {
                sizeValue = item.size.replace(/[[\]"\\]/g, '');
              }
            } else {
              sizeValue = item.size;
            }
          }
        }

        const orderData = {
          userId: userId,
          productId: item.productId,
          color: item.color === null ? 'null' : String(item.color),
          size: sizeValue,
          quantity: item.quantity,
          frontCustomizationPreview: item.frontCustomization?.preview || null,
          logoImage: item.frontCustomization?.logoUrl || null,
        };

        console.log(`Creating order for product ${item.productId}:`, orderData);

        const orderResponse = await createCustomizedOrder(orderData);
        console.log(`Order response for product ${item.productId}:`, orderResponse);

        if (orderResponse.status && orderResponse.data && orderResponse.data._id) {
          orderIds.push(orderResponse.data._id);
        } else {
          throw new Error(
            `Failed to create order for product ${item.productId}: ${orderResponse.message || 'Unknown error'}`,
          );
        }
      }

      if (orderIds.length > 0) {
        const paymentData = {
          userId: userId,
          orderId: orderIds,
        };

        console.log('Creating payment with data:', paymentData);
        const paymentResponse = await createPayment(paymentData);
        console.log('Payment response:', paymentResponse);

        if (paymentResponse.status && paymentResponse.url) {
          window.location.href = paymentResponse.url;
        } else {
          throw new Error('Failed to create payment: ' + (paymentResponse.message || 'Unknown error'));
        }
      } else {
        throw new Error('No orders were created successfully');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`There was an error processing your order: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null; // Return nothing on the server side to prevent hydration mismatch
  }

  // Get only selected items
  const selectedItems = items.filter((item) => item.selected);

  // Redirect if cart is empty or delivery info is missing
  if (selectedItems.length === 0 || !getDeliveryInfo()) {
    router.push('/cart');
    return null;
  }

  // Calculate totals for selected items only
  const subtotal = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping: number = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Payment Details"
        backgroundImage="/images/delivery-hero.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout', href: '/checkout' },
          { label: 'Payment Details', href: '/checkout/payment' },
        ]}
      />

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border p-6">
              <h2 className="mb-6 text-xl font-bold">Payment Method</h2>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe" className="flex w-full items-center justify-between gap-2">
                    <span>Pay with Stripe</span>
                    <Image src="/images/stripe.png" alt="Stripe" width={60} height={25} />
                  </Label>
                </div>
              </RadioGroup>

              {error && <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-600">{error}</div>}

              <div className="mt-8">
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800"
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-lg font-bold">Order Summary</h2>

              <div className="divide-y">
                {selectedItems.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4 py-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        className="rounded object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
