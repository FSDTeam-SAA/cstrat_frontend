import { PageHeader } from '@/components/shared/page-header';
import CheckoutForm from '@/components/checkout/checkout-form';
import CartItem from '@/components/cart/cart-item';
// import CheckoutSummary from '@/components/checkout/checkout-summary';


const cartItems = [
  {
    id: '1',
    name: "Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt",
    price: 25,
    quantity: 1,
    image: '/images/image 5.png',
    brandName: "ABC",
    size: 'XL',
    color: 'Black'
  },
  {
    id: '2',
    name: "Premium Quality - stylish new T shirt - Casual Exclusive half Sleeve T Shirt For Men - T Shirt",
    price: 25,
    quantity: 2,
    image: '/images/image 5.png',
    brandName: "AtoZ",
    size: 'XL',
    color: 'Red'
  },
];

export default function CheckoutPage() {
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
        <div className=" ">
          <div className="w-full">
            <CheckoutForm />
          </div>
          <div>
            <div className="lg:col-span-2 mt-8">
                          <div className="overflow-hidden rounded-lg border">
                            <div className="border-b bg-gray-50 p-4">
                              <h2 className="font-bold">
                                Shopping Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                              </h2>
                            </div>
                            <div className="divide-y">
                              {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                              ))}
                            </div>
                          </div>
                        </div>
          </div>
          {/* <div className="lg:col-span-1">
            <CheckoutSummary />
          </div> */}
        </div>
      </div>
    </div>
  );
}
