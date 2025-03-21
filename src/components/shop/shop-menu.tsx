import Link from 'next/link';
import Image from 'next/image';

export default function ShopMenuContent() {
  const categories = [
    {
      title: 'Clothing',
      items: [
        { name: 'T-Shirt', href: '/shop/clothing/t-shirt' },
        { name: 'Polos', href: '/shop/clothing/polos' },
        { name: 'Sweatshirt', href: '/shop/clothing/sweatshirt' },
        { name: 'Jackets', href: '/shop/clothing/jackets' },
      ],
    },
    {
      title: 'Bags',
      items: [
        { name: 'Totes', href: '/shop/bags/totes' },
        { name: 'Backpacks', href: '/shop/bags/backpacks' },
        { name: 'Coolers', href: '/shop/bags/coolers' },
        { name: 'Shopping Bags', href: '/shop/bags/shopping-bags' },
        { name: 'Everyday Carry', href: '/shop/bags/everyday-carry' },
      ],
    },
    {
      title: 'Writing Item',
      items: [
        { name: 'Pens', href: '/shop/writing/pens' },
        { name: 'Stylus Pens', href: '/shop/writing/stylus-pens' },
        { name: 'Pencils', href: '/shop/writing/pencils' },
        { name: 'Markers', href: '/shop/writing/markers' },
      ],
    },
    {
      title: 'Tech Products',
      items: [
        { name: 'USB Drivers', href: '/shop/tech/usb-drivers' },
        { name: 'Power Banks', href: '/shop/tech/power-banks' },
        { name: 'Bluetooth Items', href: '/shop/tech/bluetooth' },
        { name: 'Speakers', href: '/shop/tech/speakers' },
        { name: 'Charging', href: '/shop/tech/charging' },
        { name: 'Headphones', href: '/shop/tech/headphones' },
      ],
    },
    {
      title: 'Drinkware',
      items: [
        { name: 'Bottles', href: '/shop/drinkware/bottles' },
        { name: 'Tumblers', href: '/shop/drinkware/tumblers' },
        { name: 'Mugs', href: '/shop/drinkware/mugs' },
        { name: 'Travel Mugs', href: '/shop/drinkware/travel-mugs' },
      ],
    },
  ];

  return (
    <div className="container grid grid-cols-1 gap-4 py-6 md:grid-cols-6">
      {categories.map((category) => (
        <div key={category.title} className="space-y-3 border-r border-dashed border-gray-200 pr-4 last:border-r-0">
          <h3 className="font-bold">{category.title}</h3>
          <ul className="space-y-2">
            {category.items.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-sm hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="space-y-3">
        <h3 className="font-bold">Our Most Valuable Products</h3>
        <div className="relative h-32 w-full">
          <Image
            src="/placeholder.svg?height=128&width=200"
            alt="Featured products"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}
