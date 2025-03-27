import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, RefreshCw, ShoppingBag, Truck, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderDetails({ params }: { params: { id: string } }) {
  const orderId = params.id;
  console.log(orderId);
  // This would normally come from an API call using the orderId
  const orderDetails = {
    id: '7777777777',
    date: '8 Dec, 2025',
    contactNo: '+9900000000',
    address: '13th Street, 47 W 13th St,New York, NY 10011',
    status: [
      {
        title: 'Order Placed',
        description: 'An order has been placed.',
        date: '12/12/2025, 03:00',
        icon: ShoppingBag,
        completed: true,
      },
      {
        title: 'Processing',
        description: 'Seller has processed your order.',
        date: '12/12/2025, 03:15',
        icon: RefreshCw,
        completed: true,
      },
      {
        title: 'Packed',
        description: '',
        date: 'DD/MM/YY, 00:00',
        icon: Package,
        completed: false,
      },
      {
        title: 'Shipping',
        description: '',
        date: 'DD/MM/YY, 00:00',
        icon: Truck,
        completed: false,
      },
      {
        title: 'Delivered',
        description: '',
        date: 'DD/MM/YY, 00:00',
        icon: Check,
        completed: false,
      },
    ],
    items: [
      { id: 1, name: 'T Shirt For Men', price: 70.0, image: '/black-tshirt.png' },
      { id: 2, name: 'T Shirt For Women', price: 70.0, image: '/white-tshirt.png' },
      { id: 3, name: 'T Shirt For Men', price: 60.0, image: '/teal-tshirt.png' },
    ],
    subtotal: 1170.0,
    deliveryFee: 550.0,
    total: 1720.0,
  };

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

      <h2 className="mb-6 text-2xl font-bold">Order No : # {orderDetails.id}</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm">Date: {orderDetails.date}</p>
          </div>
          <div>
            <p className="text-sm">Contact No:{orderDetails.contactNo}</p>
          </div>
          <div>
            <p className="text-sm">Address: {orderDetails.address}</p>
          </div>
        </div>

        <div className="space-y-4">
          {orderDetails.status.map((status, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${status.completed ? 'bg-black text-white' : 'bg-gray-200'}`}>
                <status.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{status.title}</h3>
                {status.description && <p className="text-sm text-gray-600">{status.description}</p>}
                <p className="text-sm text-gray-500">{status.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button className="bg-orange-400 text-white hover:bg-orange-500">Pending</Button>
          <Button className="bg-red-500 text-white hover:bg-red-600">Cancel</Button>
        </div>

        <div className="space-y-4">
          {orderDetails.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 bg-gray-100">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3>{item.name}</h3>
              </div>
              <div className="font-medium">${item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal Amount</span>
            <span className="font-medium">${orderDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-medium">${orderDetails.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span>${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
