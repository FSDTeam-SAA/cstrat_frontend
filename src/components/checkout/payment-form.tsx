import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { CreditCard, ShoppingCartIcon as Paypal } from 'lucide-react';

export default function PaymentForm() {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-lg border">
        <div className="border-b bg-gray-50 p-4">
          <h2 className="font-bold">Payment Method</h2>
        </div>
        <div className="p-6">
          <RadioGroup defaultValue="credit-card">
            <div className="mb-4 rounded-lg border p-4">
              <div className="mb-4 flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Credit / Debit Card
                </Label>
              </div>
              <div className="space-y-4 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiration Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name-on-card">Name on Card</Label>
                  <Input id="name-on-card" placeholder="John Doe" />
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center">
                  <Paypal className="mr-2 h-5 w-5" />
                  PayPal
                </Label>
              </div>
              <p className="mt-2 pl-6 text-sm text-gray-500">
                You will be redirected to PayPal to complete your purchase securely.
              </p>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
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
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/checkout">Return to Shipping</Link>
        </Button>
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/checkout/confirmation">Place Order</Link>
        </Button>
      </div>
    </div>
  );
}
