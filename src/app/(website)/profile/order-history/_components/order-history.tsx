'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';


interface OrderHistoryItem {
  orderNo: string;
  total: string;
  status: string;
  date: string;
  orderId: string;
}

interface OrderHistoryResponse {
  status: boolean;
  message: string;
  data: OrderHistoryItem[];
}

export default function OrderHistory() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch order history data
  const { data, isLoading, error } = useQuery({
    queryKey: ['orderHistory', user?._id],
    queryFn: async () => {
      if (!user?._id) throw new Error('User ID not found');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders/history/${user._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order history');
      }
      return response.json() as Promise<OrderHistoryResponse>;
    },
    enabled: !!user?._id,
  });
  console.log(data);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Filter orders based on search term
  const filteredOrders = data?.data.filter(
    (order) =>
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-full">
      <h1 className="mb-6 text-2xl font-bold">Order History:</h1>

      <div className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-gray-100">
        <div className="grid grid-cols-5 bg-gray-200 p-4">
          <div className="font-medium">Order No</div>
          <div className="font-medium">Total</div>
          <div className="font-medium">Status</div>
          <div className="font-medium">Date</div>
          <div className="text-right font-medium"></div>
        </div>

        <div className="divide-y">
          {isLoading ? (
            <div className="p-4 text-center">Loading orders...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">Error loading orders</div>
          ) : filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.orderId} className="grid grid-cols-5 items-center p-4">
                <div>{order.orderNo}</div>
                <div>{order.total}</div>
                <div>
                  <StatusBadge status={order.status} />
                </div>
                <div>{formatDate(order.date)}</div>
                <div className="text-right">
                  <Link href={`/profile/order-history/${order.orderId}`}>
                    <Button variant="link" className="h-auto p-0 text-black">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">No orders found</div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'shipping':
        return 'bg-red-600 text-white';
      case 'packing':
      case 'packed':
        return 'bg-black text-white';
      case 'cancelled':
      case 'cancel':
        return 'bg-red-500 text-white';
      case 'pending':
      case 'not assigned':
        return 'bg-orange-400 text-white';
      case 'delivered':
        return 'bg-green-600 text-white';
      case 'processing':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  console.log(status);

  return <span className={`inline-block rounded-md px-3 py-1 text-sm ${getStatusColor()}`}>{status}</span>;
}
