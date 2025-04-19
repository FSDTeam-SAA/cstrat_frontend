// API client functions for products

/**
 * Fetch a single product by ID
 */
export async function getProduct(id: string) {
  try {
    const response = await fetch(`http://localhost:8001/api/v1/products/getallproducts/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

/**
 * Fetch all products
 */
export async function getAllProducts() {
  try {
    const response = await fetch(`http://localhost:8001/api/v1/products/getallproducts`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
}
