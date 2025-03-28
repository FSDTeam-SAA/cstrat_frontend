import { PageHeader } from '@/components/shared/page-header';
import PaymentForm from '@/components/checkout/payment-form';
// import CheckoutSummary from '@/components/checkout/checkout-summary';

export default function PaymentPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Payment Details"
        backgroundImage="/images/payment-hero.png"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Checkout', href: '/checkout' },
          { label: 'Delivery Information', href: '/checkout/delivery' },
          { label: 'Payment Details', href: '/checkout/payment' },
        ]}
      />

      <div className="container py-8">
        <div className='w-full'>
          <div className="lg:col-span-2">
            <PaymentForm />
          </div>
          <div className="lg:col-span-1">
            {/* <CheckoutSummary /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
