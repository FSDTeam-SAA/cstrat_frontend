export interface CartCustomization {
  logoUrl: string | null;
  position: {
    x: number;
    y: number;
  };
  size: number;
  rotation: number;
  preview: string | null;
}

export interface CartItem {
  id?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  brandName?: string;
  size: string;
  color: string | null;
  selected?: boolean;
  frontCustomization?: CartCustomization;
  backCustomization?: CartCustomization;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}
