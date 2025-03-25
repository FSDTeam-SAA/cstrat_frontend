import { redirect } from 'next/navigation';

export default function ShopPage() {
  // Redirect to the clothing/t-shirt page by default
  redirect('/shop/clothing/t-shirt');
}
