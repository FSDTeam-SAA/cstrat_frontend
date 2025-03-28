// import { PageHeader } from '@/components/shared/page-header';
// import CheckoutForm from '@/components/checkout/checkout-form';
// // import CartItem from '@/components/cart/cart-item';
// // import CheckoutSummary from '@/components/checkout/checkout-summary';

// // const cartItems = [
// //   {
// //     id: '1',
// //     name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
// //     price: 25,
// //     quantity: 1,
// //     image: '/images/image 5.png',
// //     brandName: 'ABC',
// //     size: 'XL',
// //     color: 'Black',
// //   },
// //   {
// //     id: '2',
// //     name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
// //     price: 25,
// //     quantity: 2,
// //     image: '/images/image 5.png',
// //     brandName: 'AtoZ',
// //     size: 'XL',
// //     color: 'Red',
// //   },
// // ];

// export default function CheckoutPage() {
//   return (
//     <div className="flex w-full flex-col items-center">
//       <PageHeader
//         title="Checkout"
//         backgroundImage="/images/delivery-hero.jpg"
//         breadcrumbs={[
//           { label: 'Home', href: '/' },
//           { label: 'Checkout', href: '/checkout' },
//         ]}
//       />

//       <div className="container py-8">
//         <div className=" ">
//           <div className="w-full">
//             <CheckoutForm />
//           </div>
//           <div>

//             {/* <div className="mt-8 lg:col-span-2">
//               <div className="overflow-hidden rounded-lg border">
//                 <div className="border-b bg-gray-50 p-4">
//                   <h2 className="font-bold">
//                     Shopping Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
//                   </h2>
//                 </div>
//                 <div className="divide-y">
//                   {cartItems.map((item) => (
//                     <CartItem key={item.id} item={item} />
//                   ))}
//                 </div>
//               </div>
//             </div> */}

//           </div>
//           {/* <div className="lg:col-span-1">
//             <CheckoutSummary />
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

import { PageHeader } from '@/components/shared/page-header';
import CheckoutForm from '@/components/checkout/checkout-form';
// import Image from 'next/image';
// import { Trash } from 'lucide-react';
import OrderOption from './order-option/page';




// function CartItem({ item }) {
//   return (
//     <div className="flex items-start border-b border-gray-200 py-3">
//       <Image src={item.image} width={80} height={80} alt="Product Image" className="mr-3" />
//       <div className="ml-[50px] flex-1">
//         <p className="text-base font-semibold">{item.name}</p>
//         <p className="text-xs text-gray-600">
//           Brand Name, Size: {item.size}, Color: {item.color}
//         </p>
//       </div>
//       <div>
//         <p className="text-[18px] text-red-500 font-semibold">${item.price}</p>
//         <button className="cursor-pointer text-center border-none bg-none text-xl text-gray-600"><Trash /></button>
//       </div>
//       <div className="ml-[50px] flex flex-col items-end text-right">
//         <p className="text-[18px]">Qty: {item.quantity}</p>
//       </div>
//     </div>
//   );
// }

export default function CheckoutPage() {
  // const cartItems = [
  //   {
  //     id: '1',
  //     name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
  //     price: 50,
  //     quantity: 4,
  //     image: '/images/imagfe 5.png', // Replace with your image path
  //     brandName: 'Brand Name',
  //     size: 'XXL',
  //     color: 'Red',
  //   },
  //   {
  //     id: '2',
  //     name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
  //     price: 50,
  //     quantity: 4,
  //     image: '/images/imagfe 5.png', // Replace with your image path
  //     brandName: 'Brand Name',
  //     size: 'XXL',
  //     color: 'Red',
  //   },
  //   {
  //     id: '3',
  //     name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
  //     price: 50,
  //     quantity: 4,
  //     image: '/images/imagfe 5.png', // Replace with your image path
  //     brandName: 'Brand Name',
  //     size: 'XXL',
  //     color: 'Red',
  //   },
  //   {
  //     id: '4',
  //     name: 'Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt',
  //     price: 50,
  //     quantity: 4,
  //     image: '/images/imagfe 5.png', // Replace with your image path
  //     brandName: 'Brand Name',
  //     size: 'XXL',
  //     color: 'Red',
  //   },
  // ];

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Checkout"
        backgroundImage="/images/delivery-hero.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Checkout', href: '/checkout' },
        ]}
      />

      <div className="container py-8">
        <div className="flex flex-col">
          <div className="">
            <CheckoutForm />
          </div> 
          <div>
            <OrderOption />
          </div>
        </div>
      </div>
    </div>
  );
}
