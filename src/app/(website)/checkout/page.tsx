/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import type { DeliveryInformation } from '@/types/cart';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSummary, setDeliveryInfo, getDeliveryInfo } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<DeliveryInformation>({
    fullName: '',
    phoneNumber: '',
    houseNumber: '',
    colony: '',
    region: '',
    city: '',
    area: '',
    address: '',
  });

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Load saved delivery info if available
    const savedInfo = getDeliveryInfo();
    if (savedInfo) {
      setFormData(savedInfo);
    }
  }, [getDeliveryInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Basic validation
    const requiredFields = ['fullName', 'phoneNumber', 'houseNumber', 'city', 'address'];

    const missingFields = requiredFields.filter((field) => !formData[field as keyof DeliveryInformation]);

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Save delivery information to store
    setDeliveryInfo(formData);

    // Proceed to payment
    router.push('/checkout/payment');
  };

  if (!mounted) {
    return null; // Return nothing on the server side to prevent hydration mismatch
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  // Get only selected items
  const selectedItems = items.filter((item) => item.selected);

  if (selectedItems.length === 0) {
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
        title="Checkout"
        backgroundImage="/images/checkout-bg.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout', href: '/checkout' },
        ]}
      />

      <div className="container py-8">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Delivery Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
                Full Name *
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium">
                Phone Number *
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label htmlFor="houseNumber" className="mb-1 block text-sm font-medium">
                House No/ Street *
              </label>
              <Input
                id="houseNumber"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleInputChange}
                placeholder="Enter your house number and street"
                required
              />
            </div>
            <div>
              <label htmlFor="colony" className="mb-1 block text-sm font-medium">
                Colony/ Locality
              </label>
              <Input
                id="colony"
                name="colony"
                value={formData.colony}
                onChange={handleInputChange}
                placeholder="Enter your colony or locality"
              />
            </div>
            <div>
              <label htmlFor="region" className="mb-1 block text-sm font-medium">
                Region
              </label>
              <Input
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                placeholder="Enter your region"
              />
            </div>
            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium">
                City *
              </label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                required
              />
            </div>
            <div>
              <label htmlFor="area" className="mb-1 block text-sm font-medium">
                Area
              </label>
              <Input
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="Enter your area"
              />
            </div>
            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium">
                Address *
              </label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete address"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-bold">Order Summary</h3>
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
                    Size: {item.size}, Color: {item.color || 'N/A'}, Qty: {item.quantity}
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

          <div className="mt-4 flex justify-end">
            <Button className="bg-black text-white hover:bg-gray-800" onClick={handleSave}>
              Save & Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
