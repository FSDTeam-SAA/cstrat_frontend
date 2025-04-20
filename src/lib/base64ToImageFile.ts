/**
 * Converts a base64 string to an image file with proper MIME type
 * @param base64String The base64 string to convert
 * @param fileName Optional file name for the resulting file
 * @returns A Promise that resolves to a File object
 */
export function base64ToImageFile(base64String: string, fileName: string = 'image.png'): Promise<File> {
  return new Promise((resolve, reject) => {
    try {
      // Handle both formats: with data URL prefix or just the base64 content
      let contentType = 'image/png'; // Default content type
      let base64Data = base64String;

      // If it's a data URL (starts with data:image/...)
      if (base64String.startsWith('data:')) {
        const parts = base64String.split(';base64,');
        contentType = parts[0].split(':')[1];
        base64Data = parts[1];

        // Validate that it's an allowed image type
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(contentType)) {
          contentType = 'image/png'; // Default to PNG if not one of the allowed types
        }
      }

      // Derive file extension from content type
      const extension = contentType.split('/')[1].replace('jpeg', 'jpg');
      const fileNameWithExt = fileName.includes('.') ? fileName : `${fileName}.${extension}`;

      // Convert base64 to binary
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      // Create a Blob and then convert to File
      const blob = new Blob(byteArrays, { type: contentType });
      const file = new File([blob], fileNameWithExt, { type: contentType });

      resolve(file);
    } catch (error) {
      reject(new Error(`Failed to convert base64 to image: ${error}`));
    }
  });
}
