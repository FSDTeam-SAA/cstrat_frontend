export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountParcentage: number;
  category: {
    _id: string;
    categoryName: string;
    description: string;
  };
  subcategory: {
    _id: string;
    subCategoryName: string;
    description: string;
  };
  media: {
    images: string[];
    videos: string[];
  };
  rating: number;
  reviewCount: number;
  quantity: number;
  inStock: boolean;
  sizes: string[];
  colors: {
    color: string;
    images: string[];
  }[];
  status: string;
  type: string;
  sustainability: string;
  popularity: number;
  isCustomizable: boolean;
  sku: string;
  createdAt: string;
  updatedAt: string;
}
