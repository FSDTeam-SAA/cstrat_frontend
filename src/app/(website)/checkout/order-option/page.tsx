const cartItems = [
  {
    id: '1',
    name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
    price: 50,
    quantity: 4,
    image: '/images/imagfe 5.png', // Replace with your image path
    brandName: 'Brand Name',
    size: 'XXL',
    color: 'Red',
  },
  {
    id: '2',
    name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
    price: 50,
    quantity: 4,
    image: '/images/imagfe 5.png', // Replace with your image path
    brandName: 'Brand Name',
    size: 'XXL',
    color: 'Red',
  },
  {
    id: '3',
    name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
    price: 50,
    quantity: 4,
    image: '/images/imagfe 5.png', // Replace with your image path
    brandName: 'Brand Name',
    size: 'XXL',
    color: 'Red',
  },
  {
    id: '4',
    name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
    price: 50,
    quantity: 4,
    image: '/images/imagfe 5.png', // Replace with your image path
    brandName: 'Brand Name',
    size: 'XXL',
    color: 'Red',
  },
];

// import CartItem from '@/components/cart/cart-item';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OrderOption = () => {
  return (
    <div className="mt-8 w-full">
      <div className="border border-gray-300 p-4 font-sans">
        <h2 className="mb-3 text-xl font-semibold">Delivery Option</h2>
        <div className="mb-4 flex w-[233px] gap-2 rounded-md border border-gray-200 p-3">
          <div className="">
            <Image src="/images/icon-image.png" alt="icon" width={20} height={10} />
          </div>
          <div>
            <p className="mb-1 text-lg font-bold">$120</p>
            <p className="text-sm">Standard Delivery</p>
            <p className="text-sm">Guaranteed by 5-10 Mar</p>
          </div>
        </div>

        {cartItems.map((item) => (
          <div key={item.id} className="flex items-start border-b border-gray-200 py-3">
            <Image src={item.image} width={80} height={80} alt="Product Image" className="mr-3" />
            <div className="ml-[50px] flex-1">
              <p className="text-base font-semibold">{item.name}</p>
              <p className="text-xs text-gray-600">
                Brand Name, Size: {item.size}, Color: {item.color}
              </p>
            </div>
            <div>
              <p className="text-[18px] font-semibold text-red-500">${item.price}</p>
              <button className="cursor-pointer border-none bg-none text-center text-xl text-gray-600">
                <Trash />
              </button>
            </div>
            <div className="ml-[50px] flex flex-col items-end text-right">
              <p className="text-[18px]">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}

        <Link href="/checkout/payment" className="mt-4 block w-full bg-gray-800 py-2 text-center text-white">
          Proceed to Payment
        </Link>
      </div>
    </div>
  );
};

export default OrderOption;
