import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import CheckoutSummary from '@/components/checkout/checkout-summary';
import Image from 'next/image';

export default function PaymentForm() {
  return (
    <div className="space-y-8">
      <div className="container rounded-lg border">
        {/* <div className="border-b bg-gray-50 p-4">
          <h2 className="font-bold">Payment Method</h2>
        </div> */}
        <CheckoutSummary />

        <div className="p-4">
          <RadioGroup defaultValue="credit-card">
            <div className="mb-4 rounded-lg">
              <div className="mb-6 flex items-center justify-between rounded-md bg-[#b8bff0] px-4 py-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Credit / Debit Card
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="/images/Visa.png" width={50} height={20} alt="visa" />
                  <Image src="/images/Mastercard.png" width={50} height={20} alt="visa" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  {/* <Label htmlFor="card-number">Card Number</Label> */}
                  <Input className="h-12" id="card-number" placeholder="Cardholder Name" />
                </div>

                <div className="space-y-2">
                  {/* <Label htmlFor="card-number">Card Number</Label> */}
                  <Input className="h-12" id="card-number" placeholder="Card Number" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input className="h-12" id="card-number" placeholder="Exp.Date" />
                  </div>
                  <div className="space-y-2">
                    <Input className="h-12" id="card-number" placeholder="CVV" />
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between rounded-md border px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      {/* <CreditCard className="mr-2 h-5 w-5" /> */}
                      PayPal
                    </Label>
                  </div>
                  <div className="flex h-10 items-center">
                    <Image src="/images/payPal.png" width={50} height={20} alt="visa" />
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between rounded-md border px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      {/* <CreditCard className="mr-2 h-5 w-5" /> */}
                      Cash on delivery
                    </Label>
                  </div>
                  <div className="flex h-10 items-center">
                    <Image src="/images/cash.png" width={50} height={20} alt="visa" />
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <p className="mb-3">
                Available Coupon{' '}
                <span className="text-sm text-gray-400">(Select one if you want to have discount)</span>
              </p>
              <div className='flex gap-4'>
                <div className="w-[148px] rounded-md border p-4">
                  <p>Coupon #1255</p>
                </div>
                <div className="w-[148px] rounded-md border p-4">
                  <p>Coupon #1255</p>
                </div>
                <div className="w-[148px] rounded-md border p-4">
                  <p>Coupon #1255</p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* <div className="overflow-hidden rounded-lg border">
        <div className="border-b bg-gray-50 p-4">
          <h2 className="font-bold">Billing Address</h2>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="same-as-shipping" className="rounded" />
            <Label htmlFor="same-as-shipping">Same as shipping address</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-address">Street Address</Label>
            <Input id="billing-address" placeholder="Enter your street address" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="billing-city">City</Label>
              <Input id="billing-city" placeholder="Enter city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-state">State/Province</Label>
              <Select>
                <SelectTrigger id="billing-state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-zip">ZIP / Postal Code</Label>
              <Input id="billing-zip" placeholder="Enter ZIP code" />
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex justify-between ">
        <Button className="bg-black text-white hover:bg-gray-800 w-full h-[60px]">
          <Link href="/checkout/confirmation">Place Order</Link>
        </Button>
      </div>
    </div>
  );
}
