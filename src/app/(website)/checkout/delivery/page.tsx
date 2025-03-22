import { PageHeader } from '@/components/shared/page-header';
import DeliveryForm from '@/components/checkout/delivery-form';
import CheckoutSummary from '@/components/checkout/checkout-summary';

export default function DeliveryPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Delivery Information"
        backgroundImage="/images/delivery-bg.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Checkout', href: '/checkout' },
          { label: 'Delivery Information', href: '/checkout/delivery' },
        ]}
      />

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DeliveryForm />
          </div>
          <div className="lg:col-span-1">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
