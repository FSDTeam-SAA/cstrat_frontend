import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Sample order data
const orders = [
  { id: '5585', total: '$565', products: 5, status: 'Shipping', date: '8 Dec, 2025' },
  { id: '54858', total: '$565', products: 5, status: 'Packing', date: '8 Dec, 2025' },
  { id: '59658', total: '$565', products: 5, status: 'Shipping', date: '8 Dec, 2025' },
  { id: '25885', total: '$565', products: 5, status: 'Packing', date: '8 Dec, 2025' },
  { id: '54885', total: '$565', products: 5, status: 'Cancelled', date: '8 Dec, 2025' },
  { id: '55545', total: '$565', products: 5, status: 'Pending', date: '8 Dec, 2025' },
  { id: '5552', total: '$565', products: 5, status: 'Cancel', date: '8 Dec, 2025' },
  { id: '5552', total: '$565', products: 5, status: 'Cancelled', date: '8 Dec, 2025' },
];

export default function OrderHistory() {
  return (
    <div className="max-w-full">
      <h1 className="mb-6 text-2xl font-bold">Order History:</h1>

      <div className="overflow-hidden rounded-lg bg-gray-100">
        <div className="grid grid-cols-5 bg-gray-200 p-4">
          <div className="font-medium">Order No</div>
          <div className="font-medium">Total</div>
          <div className="font-medium">Status</div>
          <div className="font-medium">Date</div>
          <div className="text-right font-medium"></div>
        </div>

        <div className="divide-y">
          {orders.map((order) => (
            <div key={order.id + order.status} className="grid grid-cols-5 items-center p-4">
              <div>#{order.id}</div>
              <div>
                {order.total} ({order.products} Products)
              </div>
              <div>
                <StatusBadge status={order.status} />
              </div>
              <div>{order.date}</div>
              <div className="text-right">
                <Link href={`/profile/order-history/${order.id}`}>
                  <Button variant="link" className="h-auto p-0 text-black">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status) {
      case 'Shipping':
        return 'bg-red-600 text-white';
      case 'Packing':
        return 'bg-black text-white';
      case 'Cancelled':
        return 'bg-green-600 text-white';
      case 'Pending':
        return 'bg-orange-400 text-white';
      case 'Cancel':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return <span className={`inline-block rounded-md px-3 py-1 text-sm ${getStatusColor()}`}>{status}</span>;
}
