// 'use client';

// import type React from 'react';

// import { useState } from 'react';
// import Image from 'next/image';
// import { Heart, Trash2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// interface CartItemProps {
//   item: {
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
//     image: string;
//   };
// }

// export default function CartItem({ item }: CartItemProps) {
//   const [quantity, setQuantity] = useState(item.quantity);

//   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number.parseInt(e.target.value);
//     if (!isNaN(value) && value > 0) {
//       setQuantity(value);
//     }
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="flex items-center justify-around gap-4 p-4">
//       <div className="relative h-20 w-20 flex-1">
//         <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className="rounded object-cover" />
//       </div>

//       <div className="flex-1">
//         <h3 className="font-medium">{item.name}</h3>
//         <p className="text-sm text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
//       </div>

//       <div className="min-w-[80px] text-right">
//         <p className="font-bold">${(item.price * quantity).toFixed(2)}</p>
//         <div className="flex items-center">
//           <Trash2 className="h-5 w-5" />
//           <Heart className="h-5 w-5" />
//         </div>
//       </div>

//       <div className="">
//         <div className="flex items-center">
//           <div className="flex items-center rounded-md border">
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               onClick={decrementQuantity}
//               disabled={quantity <= 1}
//               className="px-2"
//             >
//               -
//             </Button>
//             <Input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={handleQuantityChange}
//               className="h-8 w-12 border-0 p-0 text-center"
//             />
//             <Button type="button" variant="ghost" size="sm" onClick={incrementQuantity} className="px-2">
//               +
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* <Button variant="ghost" size="icon" className="text-red-500">
        
//         <span className="sr-only">Remove</span>
//       </Button> */}
//     </div>
//   );
// }




'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    brandName:string;
    size: string;
    color: string
  };
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-start gap-4 p-4 border-b">
     <div className='flex-1 flex items-center gap-2'>
     <Checkbox className="flex-shrink-0" /> {/* Add Checkbox */}
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className="rounded object-cover" />
      </div>
     </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 truncate">Band Name: {item.brandName}, Size: {item.size}, Color: {item.color}</p>
      </div>

     <div className='flex-1 flex items-center justify-end gap-6'>
     <div className="min-w-[80px] text-right flex-shrink-0">
        <p className="font-bold text-red-400">${(item.price * quantity).toFixed(2)}</p>
        <div className="flex items-center justify-end gap-2 mt-2">
          <Trash2 className="h-5 w-5 cursor-pointer" />
          <Heart className="h-5 w-5 cursor-pointer" />
        </div>
      </div>

      <div className="flex-shrink-0">
        <div className="flex items-center">
          <div className="flex items-center rounded-md border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="px-2"
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-12 border-0 p-0 text-center"
            />
            <Button type="button" variant="ghost" size="sm" onClick={incrementQuantity} className="px-2">
              +
            </Button>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
}