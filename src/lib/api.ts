// API functions for fetching product data

export async function getAllProducts(params?: Record<string, string>) {
  try {
    // Build query string from params
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';

    const response = await fetch(`http://localhost:8001/api/v1/products/getallproducts${queryString}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    console.log(`Fetching product with ID: ${id} from API`);
    const response = await fetch(`http://localhost:8001/api/v1/products/getallproducts/${id}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data);

    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function getAllCategories() {
  try {
    const response = await fetch('http://localhost:8001/api/v1/categories');

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getAllSubcategories() {
  try {
    const response = await fetch('http://localhost:8001/api/v1/subcategories');

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
}

// Function to manually filter subcategories by category
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterSubcategoriesByCategory(subcategories: any[], categoryId: string) {
  if (!subcategories || !categoryId) return [];

  return subcategories.filter((subcat) => subcat.category && subcat.category._id === categoryId);
}

// Function to manually filter products by category and subcategory
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterProducts(products: any[], category?: string, subcategory?: string) {
  if (!products || products.length === 0) return [];

  return products.filter((product) => {
    // If no filters are provided, return all products
    if (!category && !subcategory) return true;

    // Filter by category if provided
    if (category && product.category !== category) return false;

    // Filter by subcategory if provided
    if (subcategory && product.subcategory !== subcategory) return false;

    return true;
  });
}
