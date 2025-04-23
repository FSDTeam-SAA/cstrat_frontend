'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { createCustomizedOrder, createPayment } from '@/lib/api-services';

export default function PaymentForm() {
  const router = useRouter();
  const { items, getDeliveryInfo, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setIsLoading(true);

    try {
      const deliveryInfo = getDeliveryInfo();

      if (!deliveryInfo) {
        alert('Delivery information is missing. Please go back and fill in your delivery details.');
        router.push('/checkout');
        return;
      }

      // Temporary user ID - in a real app, this would come from authentication
      const userId = '67fb8eebe5a697a3ae53f7d1'; // Example user ID

      // Create orders for each item
      const orderPromises = items.map(item => 
        createCustomizedOrder({
          userId: userId,
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          frontCustomizationPreview: item.frontCustomization?.preview || null,
          logoImage: item.frontCustomization?.logoUrl || null,
        })
      );

      // Wait for all orders to be created
      const orderResponses = await Promise.all(orderPromises);
      const orderResponse = orderResponses[0]; // Use first order for payment

      if (orderResponse.status && orderResponse.data._id) {
        // Create payment
        const paymentData = {
          userId: userId,
          orderId: [orderResponse.data._id],
        };

        const paymentResponse = await createPayment(paymentData);

        if (paymentResponse.status && paymentResponse.url) {
          // Clear cart after successful order
          clearCart();

          // Redirect to Stripe checkout
          window.location.href = paymentResponse.url;
        } else {
          throw new Error('Failed to create payment');
        }
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-bold">Payment Method</h2>

      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
        <div className="flex items-center space-x-2 rounded-md border p-4">
          <RadioGroupItem value="stripe" id="stripe" />
          <Label htmlFor="stripe" className="flex items-center gap-2">
            <span>Pay with Stripe</span>
            <Image src="https://v0.blob.com/pjtmy8OGJ.png" alt="Stripe" width={60} height={25} />
          </Label>
        </div>
      </RadioGroup>

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
  );
}
