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
  id: string; // Add this new field
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

export interface DeliveryInformation {
  fullName: string;
  phoneNumber: string;
  houseNumber: string;
  colony: string;
  region: string;
  city: string;
  area: string;
  address: string;
}

export interface PaymentRequest {
  userId: string;
  orderId: string;
}

export interface PaymentResponse {
  status: boolean;
  message: string;
  url: string;
  sessionId: string;
  amount: number;
}

export interface OrderResponse {
  status: boolean;
  message: string;
  data: {
    _id: string;
    user: string;
    products: {
      customization?: {
        color: string | null;
        size: string;
        frontCustomizationPreview?: string;
        logoImage?: string;
      };
      product: {
        _id: string;
        name: string;
        price: number;
      };
      quantity: number;
      price: number;
      _id: string;
    }[];
    totalAmount: number;
    status: string;
    orderSlug: string;
    createdAt: string;
    updatedAt: string;
  };
}
