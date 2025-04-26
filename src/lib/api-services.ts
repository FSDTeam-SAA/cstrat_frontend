import type { OrderResponse, PaymentResponse } from '@/types/cart';
import { base64ToImageFile } from './base64ToImageFile';

const API_BASE_URL = 'http://localhost:8001/api/v1';

// Create a customized order using FormData (multipart/form-data)
export async function createCustomizedOrder(orderData: {
  userId: string;
  productId: string;
  color: string | null;
  size: string;
  quantity: number;
  frontCustomizationPreview: string | null;
  logoImage: string | null;
}): Promise<OrderResponse> {
  console.log('Creating customized order with data:', orderData);

  try {
    // Create FormData object
    const formData = new FormData();

    // Add text fields
    formData.append('userId', orderData.userId);
    formData.append('productId', orderData.productId);
    formData.append('color', orderData.color === null ? 'null' : orderData.color);
    formData.append('size', orderData.size);
    formData.append('quantity', orderData.quantity.toString());

    // Add file fields if available
    if (orderData.frontCustomizationPreview) {
      try {
        const imgData = await dataURLtoBlob(orderData.frontCustomizationPreview);
        console.log('Successfully converted preview to blob');
        formData.append('frontCustomizationPreview', imgData, 'customization-preview.png');
      } catch (error) {
        console.error('Error converting frontCustomizationPreview:', error);
        // Continue without this file
      }
    }

    if (orderData.logoImage) {
      try {
        const logoFile = await base64ToImageFile(orderData.logoImage, 'logo-image.png');
        console.log('Logo file type:', logoFile.type);
        console.log('Logo file name:', logoFile.name);
        console.log('Logo file size:', logoFile.size, 'bytes');
        formData.append('logoImage', logoFile);
      } catch (error) {
        console.error('Error converting logoImage:', error);
        // Continue without this file
      }
    }

    console.log('Sending form data to API');

    const response = await fetch(`${API_BASE_URL}/orders/customize-and-order`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header, browser will set it with boundary
    });

    // Get the response as text first
    const responseText = await response.text();
    console.log('Raw API response:', responseText);

    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status} - ${responseData.message || response.statusText}`);
    }

    return responseData;
  } catch (error) {
    console.error('Error creating customized order:', error);
    throw error;
  }
}

// Helper function to convert data URL to Blob
async function dataURLtoBlob(dataURL: string): Promise<Blob> {
  return new Promise((resolve) => {
    try {
      // Check if dataURL is empty or invalid
      if (!dataURL || typeof dataURL !== 'string') {
        console.warn('Empty or invalid data URL provided');
        resolve(new Blob([])); // Return empty blob instead of throwing
        return;
      }

      // Validate data URL format
      if (!dataURL.startsWith('data:')) {
        console.warn('Invalid data URL format provided');
        resolve(new Blob([])); // Return empty blob instead of throwing
        return;
      }

      // Split the data URL to get the content type and base64 data
      const parts = dataURL.split(';base64,');
      if (parts.length !== 2) {
        console.warn('Invalid data URL format: missing base64 data');
        resolve(new Blob([])); // Return empty blob instead of throwing
        return;
      }

      const contentType = parts[0].split(':')[1];
      const base64Data = parts[1];

      if (!contentType || !base64Data) {
        console.warn('Invalid data URL format: missing content type or base64 data');
        resolve(new Blob([])); // Return empty blob instead of throwing
        return;
      }

      const raw = window.atob(base64Data.replace(/\s/g, ''));
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      resolve(new Blob([uInt8Array], { type: contentType }));
    } catch (e) {
      console.error('Error in dataURLtoBlob:', e);
      resolve(new Blob([])); // Return empty blob on any error
    }
  });
}

// Create payment for an order
export async function createPayment(paymentData: { userId: string; orderId: string[] }): Promise<PaymentResponse> {
  try {
    console.log('Creating payment with data:', paymentData);

    const response = await fetch(`${API_BASE_URL}/payments/createpayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    // Get the response as text first
    const responseText = await response.text();
    console.log('Raw payment API response:', responseText);

    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse payment response as JSON:', e);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    if (!response.ok) {
      throw new Error(`Failed to create payment: ${response.status} - ${responseData.message || response.statusText}`);
    }

    return responseData;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

// Verify payment status
export async function verifyPayment(sessionId: string) {
  try {
    console.log('Verifying payment with session ID:', sessionId);

    const response = await fetch(`${API_BASE_URL}/payments/verify/${sessionId}`);

    // Get the response as text first
    const responseText = await response.text();
    console.log('Raw verify payment API response:', responseText);

    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse verify payment response as JSON:', e);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    if (!response.ok) {
      throw new Error(`Failed to verify payment: ${response.status} - ${responseData.message || response.statusText}`);
    }

    return responseData;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
}
