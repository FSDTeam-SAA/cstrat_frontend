'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, RefreshCw, ShoppingBag, Truck, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';

interface OrderProduct {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
  _id: string;
}

interface OrderResponse {
  status: boolean;
  message: string;
  order: {
    _id: string;
    user: {
      _id: string;
      name: string;
    };
    products: OrderProduct[];
    totalAmount: number;
    status: string;
    orderSlug: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface OrderStatusStep {
  title: string;
  description: string;
  date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  completed: boolean;
}

export default function OrderDetails({ params }: { params: { id: string } }) {
  const orderId = params.id;
  const { user } = useAuth();
  if (!user?._id) throw new Error('User ID not found');

  const [contactNo] = useState('+9900000000');
  const [address] = useState('13th Street, 47 W 13th St, New York, NY 10011');

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders/getallorders/${orderId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      return response.json() as Promise<OrderResponse>;
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders/order/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderDetails', orderId] });
    },
  });

  const getOrderProgressSteps = (status: string): OrderStatusStep[] => {
    const steps = ['Order Placed', 'Processing', 'Packed', 'Shipping', 'Delivered'];
    const statusMap: { [key: string]: number } = {
      pending: 0,
      processing: 1,
      packed: 2,
      shipped: 3,
      shipping: 3,
      delivered: 4,
      cancelled: -1,
    };
    const currentStep = statusMap[status.toLowerCase()] ?? -1;

    return steps.map((step, index) => ({
      title: step,
      description: getStatusDescription(step),
      date: index === currentStep ? formatDate(data?.order.updatedAt || '') : '',
      icon: getStepIcon(step),
      completed: index <= currentStep,
    }));
  };

  const getStatusDescription = (step: string): string => {
    switch (step) {
      case 'Order Placed':
        return 'An order has been placed.';
      case 'Processing':
        return 'Seller has processed your order.';
      case 'Packed':
        return 'Your order has been packed.';
      case 'Shipping':
        return 'Your order is on the way.';
      case 'Delivered':
        return 'Your order has been delivered.';
      default:
        return '';
    }
  };

  const getStepIcon = (step: string) => {
    switch (step) {
      case 'Order Placed':
        return ShoppingBag;
      case 'Processing':
        return RefreshCw;
      case 'Packed':
        return Package;
      case 'Shipping':
        return Truck;
      case 'Delivered':
        return Check;
      default:
        return ShoppingBag;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'DD/MM/YY, 00:00';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const deliveryFee = 550.0;

  if (isLoading) {
    return <div className="max-w-full p-8 text-center">Loading order details...</div>;
  }

  if (error || !data) {
    return <div className="max-w-full p-8 text-center text-red-500">Error loading order details</div>;
  }

  const { order } = data;
  const orderStatus = getOrderProgressSteps(order.status);

  return (
    <div className="max-w-full">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/profile/order-history">
          <Button variant="ghost" size="icon" className="h-auto w-auto rounded-full p-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Order History:</h1>
      </div>

      <h2 className="mb-6 text-2xl font-bold">Order No : {order.orderSlug}</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm">Date: {formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm">Contact No: {contactNo}</p>
          </div>
          <div>
            <p className="text-sm">Address: {address}</p>
          </div>
        </div>

        <div className="space-y-4">
          {orderStatus.map((status, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${status.completed ? 'bg-black text-white' : 'bg-gray-200'}`}>
                <status.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{status.title}</h3>
                {status.description && <p className="text-sm text-gray-600">{status.description}</p>}
                {status.date && <p className="text-sm text-gray-500">{status.date}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button className="bg-orange-400 text-white hover:bg-orange-500">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Button>
          {order.status.toLowerCase() !== 'cancelled' && (
            <Button className="bg-red-500 text-white hover:bg-red-600" onClick={() => cancelOrderMutation.mutate()}>
              Cancel
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {order.products.map((item) => (
            <div key={item._id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 bg-gray-100">
                <Image
                  src={item.product.images[0] || '/placeholder.svg'}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3>{item.product.name}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="font-medium">${item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal Amount</span>
            <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-medium">${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span>${(order.totalAmount + deliveryFee).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
