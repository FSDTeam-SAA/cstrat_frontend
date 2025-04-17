// API endpoints and helper functions
const API_BASE_URL = 'http://localhost:8001/api/v1';

// Category interfaces
export interface Category {
  _id: string;
  categoryName: string;
  description: string;
  categoryImage?: string;
  stock: number;
  sales: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoriesResponse {
  status: boolean;
  message: string;
  data: Category[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    nextPage: number | null;
    prevPage: number | null;
  };
  search: {
    term: string | null;
    results: number;
  };
}

// Subcategory interfaces
export interface Subcategory {
  _id: string;
  subCategoryName: string;
  category: Category;
  description: string;
  stock: number;
  sales: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubcategoriesResponse {
  status: boolean;
  message: string;
  currentPage: number;
  totalPages: number;
  totalSubCategories: number;
  count: number;
  subCategories: Subcategory[];
}

// Product interfaces
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  type: string;
  status: string;
  sustainability: string;
  rating: number;
  reviewCount: number;
  popularity: number;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  isCustomizable: boolean;
  media: {
    images: string[];
    videos: string[];
  };
  sizes: string[];
  colors: Array<{
    name: string;
    hex: string;
    images: string[];
    _id: string;
  }>;
  sku: string;
}

export interface ProductsResponse {
  status: boolean;
  message: string;
  data: {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  category?: string | null;
  subcategory?: string | null;
  status?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}

// Helper function to convert sortBy to API sort and order parameters
function getSortParams(sortBy: string): { sort?: string; order?: 'asc' | 'desc' } {
  switch (sortBy) {
    case 'price-low':
      return { sort: 'price', order: 'asc' };
    case 'price-high':
      return { sort: 'price', order: 'desc' };
    case 'newest':
      return { sort: 'createdAt', order: 'desc' };
    case 'popular':
      return { sort: 'popularity', order: 'desc' };
    default:
      return {};
  }
}

// Fetch categories with error handling
export async function fetchCategories(): Promise<CategoriesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      // Add cache control headers
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || 'Failed to fetch categories');
    }

    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

// Fetch subcategories with error handling
export async function fetchSubcategories(): Promise<SubcategoriesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/subcategories`, {
      // Add cache control headers
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || 'Failed to fetch subcategories');
    }

    return data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
}

// Fetch subcategories by category ID
export async function fetchSubcategoriesByCategory(categoryId: string): Promise<Subcategory[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/subcategories?category=${categoryId}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.status ? data.subCategories : [];
  } catch (error) {
    console.error(`Error fetching subcategories for category ${categoryId}:`, error);
    return [];
  }
}

// Fetch products with error handling
export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  try {
    const url = new URL(`${API_BASE_URL}/products/getallproducts`);

    // Add all filters to the URL
    if (filters.category) url.searchParams.append('category', filters.category);
    if (filters.subcategory) url.searchParams.append('subcategory', filters.subcategory);
    if (filters.status && filters.status !== 'all') url.searchParams.append('status', filters.status);
    if (filters.page) url.searchParams.append('page', filters.page.toString());
    if (filters.limit) url.searchParams.append('limit', filters.limit.toString());
    if (filters.minPrice !== undefined) url.searchParams.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) url.searchParams.append('maxPrice', filters.maxPrice.toString());

    // Handle sorting
    if (filters.sortBy && filters.sortBy !== 'all') {
      const { sort, order } = getSortParams(filters.sortBy);
      if (sort) url.searchParams.append('sort', sort);
      if (order) url.searchParams.append('order', order);
    }

    console.log('Fetching products with URL:', url.toString());

    const response = await fetch(url.toString(), {
      // Add cache control headers
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || 'Failed to fetch products');
    }

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Fetch product by ID with error handling
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      // Add cache control headers
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || 'Failed to fetch product');
    }

    return data.data.product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}
