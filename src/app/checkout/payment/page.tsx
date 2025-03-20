import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import PaymentForm from "@/components/checkout/payment-form"
import CheckoutSummary from "@/components/checkout/checkout-summary"

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="relative h-[200px] md:h-[300px] w-full bg-cover bg-center flex flex-col items-center justify-center text-white z-20"
          style={{
            backgroundImage: "url('/images/payment-hero.jpg')",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Payment Details</h1>
        </div>
      </div>

      <div className="container py-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/checkout">Checkout</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/checkout/delivery">Delivery Information</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Payment Details</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaymentForm />
          </div>
          <div className="lg:col-span-1">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

