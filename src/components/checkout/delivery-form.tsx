import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function DeliveryForm() {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-lg border">
        <div className="border-b bg-gray-50 p-4">
          <h2 className="font-bold">Shipping Address</h2>
        </div>
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input id="address" placeholder="Enter your street address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input id="apartment" placeholder="Enter apartment or suite" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Select>
                <SelectTrigger id="state">
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
              <Label htmlFor="zip">ZIP / Postal Code</Label>
              <Input id="zip" placeholder="Enter ZIP code" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="border-b bg-gray-50 p-4">
          <h2 className="font-bold">Shipping Method</h2>
        </div>
        <div className="p-6">
          <RadioGroup defaultValue="standard">
            <div className="mb-2 flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">Standard Shipping (3-5 business days)</Label>
              </div>
              <span className="font-bold">Free</span>
            </div>
            <div className="mb-2 flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express">Express Shipping (1-2 business days)</Label>
              </div>
              <span className="font-bold">$15.00</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="overnight" id="overnight" />
                <Label htmlFor="overnight">Overnight Shipping (Next business day)</Label>
              </div>
              <span className="font-bold">$25.00</span>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/checkout">Return to Checkout</Link>
        </Button>
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/checkout/payment">Continue to Payment</Link>
        </Button>
      </div>
    </div>
  );
}
