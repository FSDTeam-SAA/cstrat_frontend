// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
// }

// export default function BestSellers() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const products: Product[] = [
//     {
//       id: '1',
//       name: 'MEN SPORTS T-SHIRT',
//       category: 'men',
//       price: 25,
//       image: '/images/best-1.png',
//     },
//     {
//       id: '2',
//       name: 'WOMAN RUNNING KIT',
//       category: 'women',
//       price: 25,
//       image: '/images/best-2.png',
//     },
//     {
//       id: '3',
//       name: 'WOMEN HOODIE',
//       category: 'women',
//       price: 25,
//       image: '/images/best-3.png',
//     },
//     {
//       id: '4',
//       name: 'WOMEN HOODIE',
//       category: 'women',
//       price: 25,
//       image: '/images/best-1.png',
//     },
//     {
//       id: '5',
//       name: 'MEN JACKET',
//       category: 'men',
//       price: 35,
//       image: '/images/best-2.png',
//     },
//     {
//       id: '6',
//       name: 'UNISEX BACKPACK',
//       category: 'accessories',
//       price: 45,
//       image: '/images/best-3.png',
//     },
//   ];

//   // Calculate how many items to show based on screen size
//   const getVisibleItems = () => {
//     if (typeof window !== 'undefined') {
//       if (window.innerWidth < 640) return 1;
//       if (window.innerWidth < 1024) return 2;
//       return 4;
//     }
//     return 4; // Default for SSR
//   };

//   const [visibleItems, setVisibleItems] = useState(4);
//   const maxIndex = Math.max(0, products.length - visibleItems);

//   useEffect(() => {
//     const handleResize = () => {
//       setVisibleItems(getVisibleItems());
//     };

//     // Set initial value
//     handleResize();

//     // Add event listener
//     window.addEventListener('resize', handleResize);

//     // Clean up
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const scrollPrev = () => {
//     setCurrentIndex((prev) => Math.max(0, prev - 1));
//   };

//   const scrollNext = () => {
//     setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
//   };

//   useEffect(() => {
//     if (scrollContainerRef.current) {
//       const itemWidth = scrollContainerRef.current.scrollWidth / products.length;
//       scrollContainerRef.current.scrollTo({
//         left: currentIndex * itemWidth,
//         behavior: 'smooth',
//       });
//     }
//   }, [currentIndex, products.length]);

//   return (
//     <section className="w-full overflow-hidden py-12">
//       <div className="container px-4">
//         <h2 className="mb-8 border-b pb-2 text-2xl font-bold uppercase md:text-3xl">BEST SELLERS</h2>
//         <div className="relative">
//           <div ref={scrollContainerRef} className="flex gap-4 overflow-x-hidden">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="min-w-[calc(100%/1)] flex-shrink-0 px-1 sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/4)]"
//               >
//                 <div className="group relative overflow-hidden rounded-lg">
//                   <div className="relative aspect-square w-[270px] h-[330px]">
//                     <Image src={product.image || '/placeholder.svg'} alt={product.name} fill className="object-cover" />
//                   </div>
//                   <div className="flex items-center justify-between gap-2 pt-3">
//                     <div>
//                       <h3 className="text-[20px] font-[600] uppercase leading-[120%]">{product.name}</h3>
//                       <p className="text-[20px] font-[600]">${product.price}</p>
//                     </div>
//                     <Button
//                       size="icon"
//                       variant="secondary"
//                       className="rounded-lg bg-black text-white hover:bg-gray-800"
//                     >
//                       <Plus className="h-3 w-3" />
//                       <span className="sr-only">Add to cart</span>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <Button
//             variant="outline"
//             size="icon"
//             className={cn(
//               'absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white',
//               currentIndex === 0 && 'cursor-not-allowed opacity-50',
//             )}
//             onClick={scrollPrev}
//             disabled={currentIndex === 0}
//           >
//             <ChevronLeft className="h-4 w-4" />
//             <span className="sr-only">Previous</span>
//           </Button>
//           <Button
//             variant="outline"
//             size="icon"
//             className={cn(
//               'absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white',
//               currentIndex === maxIndex && 'cursor-not-allowed opacity-50',
//             )}
//             onClick={scrollNext}
//             disabled={currentIndex === maxIndex}
//           >
//             <ChevronRight className="h-4 w-4" />
//             <span className="sr-only">Next</span>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: '1',
      name: 'MEN SPORTS T-SHIRT',
      category: 'men',
      price: 25,
      image: '/images/best-1.png',
    },
    {
      id: '2',
      name: 'WOMAN RUNNING KIT',
      category: 'women',
      price: 25,
      image: '/images/best-2.png',
    },
    {
      id: '3',
      name: 'WOMEN HOODIE',
      category: 'women',
      price: 25,
      image: '/images/best-3.png',
    },
    {
      id: '4',
      name: 'WOMEN HOODIE',
      category: 'women',
      price: 25,
      image: '/images/best-1.png',
    },
    {
      id: '5',
      name: 'MEN JACKET',
      category: 'men',
      price: 35,
      image: '/images/best-2.png',
    },
    {
      id: '6',
      name: 'UNISEX BACKPACK',
      category: 'accessories',
      price: 45,
      image: '/images/best-3.png',
    },
  ];

  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }
    return 4;
  };

  const [visibleItems, setVisibleItems] = useState(4);
  const maxIndex = Math.max(0, products.length - visibleItems);

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.scrollWidth / products.length;
      scrollContainerRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, products.length]);

  const scrollPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="w-full overflow-hidden py-12">
      <div className="container px-4">
        <h2 className="mb-8 border-b pb-2 text-2xl font-bold uppercase md:text-3xl">BEST SELLERS</h2>
        <div className="relative">
          <div ref={scrollContainerRef} className="flex gap-4 overflow-x-hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className={`flex-shrink-0 px-1 w-full sm:w-1/2 lg:w-1/4`}
              >
                <div className="group relative overflow-hidden rounded-lg">
                  <div className="relative aspect-[270/330] w-full">
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-3">
                    <div>
                      <h3 className="md:text-[20px] text-lg font-[600] uppercase leading-[120%]">
                        {product.name}
                      </h3>
                      <p className="md:text-[20px] text-base font-[600]">${product.price}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-lg bg-black text-white hover:bg-gray-800"
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'absolute left-2 sm:-left-12 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white',
              currentIndex === 0 && 'cursor-not-allowed opacity-50'
            )}
            onClick={scrollPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'absolute right-2 sm:-right-12 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white',
              currentIndex === maxIndex && 'cursor-not-allowed opacity-50'
            )}
            onClick={scrollNext}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </section>
  );
}