export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brandName: string;
  size: string;
  color: string;
  selected?: boolean;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}
