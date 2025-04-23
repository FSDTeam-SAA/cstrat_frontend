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
  const imgData = dataURLtoBlob(orderData.frontCustomizationPreview || '');
  console.log('Creating customized order with data:', imgData);

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
        const previewFile = await base64ToImageFile(orderData.frontCustomizationPreview, 'customization-preview.png');
        console.log('Preview file type:', previewFile.type);
        console.log('Preview file name:', previewFile.name);
        console.log('Preview file size:', previewFile.size, 'bytes');
        formData.append('frontCustomizationPreview', previewFile);
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
  return new Promise((resolve, reject) => {
    try {
      // Split the data URL to get the content type and base64 data
      const parts = dataURL.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      resolve(new Blob([uInt8Array], { type: contentType }));
    } catch (e) {
      reject(e);
    }
  });
}

// Create payment for an order
export async function createPayment(paymentData: {userId: string, orderId: string[]}): Promise<PaymentResponse> {
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
