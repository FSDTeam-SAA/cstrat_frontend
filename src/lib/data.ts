export const categories = [
  {
    name: 'Clothing',
    slug: 'clothing',
    productCount: 120,
    subcategories: ['T-Shirt', 'Polos', 'Sweatshirt', 'Jackets'],
  },
  {
    name: 'Bags',
    slug: 'bags',
    productCount: 85,
    subcategories: ['Totes', 'Backpacks', 'Coolers', 'Shopping Bags', 'Everyday Carry'],
  },
  {
    name: 'Writing Item',
    slug: 'writing-item',
    productCount: 64,
    subcategories: ['Pens', 'Stylus Pens', 'Pencils', 'Markers'],
  },
  {
    name: 'Tech Products',
    slug: 'tech-products',
    productCount: 93,
    subcategories: ['USB Drivers', 'Power Banks', 'Bluetooth Items', 'Speakers', 'Charging', 'Headphones'],
  },
  {
    name: 'Drinkware',
    slug: 'drinkware',
    productCount: 72,
    subcategories: ['Bottles', 'Tumblers', 'Mugs', 'Travel Mugs'],
  },
];

export const products = [
  {
    id: '1',
    name: 'One Life Graphic T-shirt',
    price: 260.0,
    category: 'clothing',
    subcategory: 't-shirt',
    image: '/ts/bf.png',
    inStock: true,
    quantity: 45,
    type: 'casual',
    sustainability: '1-for-planet',
    popularity: 8,
    createdAt: '2023-05-15T00:00:00Z',
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    rating: 4.5,
    reviewCount: 42,
    colors: [
      {
        name: 'Olive',
        value: '#5D4A1F',
        images: ['/ts/bf.png', '/ts/green.jpg', '/ts/green.jpg', '/ts/green.jpg'],
      },
      {
        name: 'Blue',
        value: '#1F3D8A',
        images: ['/ts/blue.jpg', '/ts/blue.jpg', '/ts/blue.jpg', '/ts/blue.jpg'],
      },
      {
        name: 'Orange',
        value: '#FF6B35',
        images: ['/images/orange-1.jpeg', '/images/orange-1.jpeg', '/images/orange-1.jpeg', '/images/orange-1.jpeg'],
      },
    ],
  },
  {
    id: '2',
    name: 'Black Solid T-Shirt',
    price: 70.0,
    category: 'clothing',
    subcategory: 't-shirt',
    image: '/ts/bf.png',
    inStock: true,
    quantity: 38,
    type: 'casual',
    sustainability: 'sustainable',
    popularity: 7,
    createdAt: '2023-06-20T00:00:00Z',
    rating: 4.2,
    reviewCount: 28,
  },
  {
    id: '3',
    name: 'Navy Blue Polo',
    price: 85.0,
    category: 'clothing',
    subcategory: 'polos',
    image: '/ts/polo.jpeg',
    inStock: true,
    quantity: 25,
    type: 'casual',
    sustainability: 'b-corp',
    popularity: 9,
    createdAt: '2023-04-10T00:00:00Z',
    rating: 4.7,
    reviewCount: 36,
  },
  {
    id: '4',
    name: 'Maroon SweatShirt',
    price: 95.0,
    category: 'clothing',
    subcategory: 'sweatshirt',
    image: '/ts/ss.jpeg',
    inStock: true,
    quantity: 15,
    type: 'fleece',
    sustainability: 'climate-neutral',
    popularity: 10,
    createdAt: '2023-07-05T00:00:00Z',
    rating: 4.8,
    reviewCount: 52,
  },
  {
    id: '5',
    name: 'Black Windbreaker',
    price: 120.0,
    category: 'clothing',
    subcategory: 'jackets',
    image: '/ts/green.jpg',
    inStock: true,
    quantity: 8,
    type: 'popular',
    sustainability: 'sustainable',
    popularity: 6,
    createdAt: '2023-08-15T00:00:00Z',
    rating: 4.3,
    reviewCount: 19,
  },
  {
    id: '6',
    name: 'Premium Solid Olive T-Shirt',
    price: 150.0,
    category: 'clothing',
    subcategory: 't-shirt',
    image: '/ts/green.jpg',
    inStock: true,
    quantity: 38,
    type: 'popular',
    sustainability: 'sustainable',
    popularity: 7,
    createdAt: '2023-06-20T00:00:00Z',
    rating: 4.2,
    reviewCount: 28,
  },
  {
    id: '10',
    name: 'Premium Solid Blue T-Shirt',
    price: 120.0,
    category: 'clothing',
    subcategory: 't-shirt',
    image: '/ts/blue.jpg',
    inStock: true,
    quantity: 38,
    type: 'popular',
    sustainability: 'sustainable',
    popularity: 7,
    createdAt: '2023-06-20T00:00:00Z',
    rating: 4.2,
    reviewCount: 28,
  },
  {
    id: '13',
    name: 'Premium Bottle',
    price: 30.0,
    category: 'drinkware',
    subcategory: 'bottles',
    image: '/ts/bt.avif',
    inStock: true,
    quantity: 38,
    type: 'fleece',
    sustainability: 'sustainable',
    popularity: 7,
    createdAt: '2023-06-20T00:00:00Z',
    rating: 4.2,
    reviewCount: 28,
  },
  {
    id: '14',
    name: 'Premium Mug',
    price: 80.0,
    category: 'drinkware',
    subcategory: 'mugs',
    image: '/ts/mug.webp',
    inStock: true,
    quantity: 38,
    type: 'fleece',
    sustainability: 'sustainable',
    popularity: 7,
    createdAt: '2023-06-20T00:00:00Z',
    rating: 4.2,
    reviewCount: 28,
  },
  
];
