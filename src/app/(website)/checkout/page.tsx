import { PageHeader } from '@/components/shared/page-header';
import CheckoutForm from '@/components/checkout/checkout-form';
import CheckoutSummary from '@/components/checkout/checkout-summary';

export default function CheckoutPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Checkout"
        backgroundImage="/images/checkout-bg.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Checkout', href: '/checkout' },
        ]}
      />

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          <div className="lg:col-span-1">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
