/**
 * File Helper Utilities
 * 
 * Helper functions for file type detection and MIME type mapping.
 */

/**
 * Gets the MIME type from a filename based on its extension
 * 
 * @param {string} fileName - The filename to analyze
 * @returns {string} - The MIME type (e.g., 'application/pdf', 'image/jpeg')
 */
export const getMimeType = (fileName) => {
  if (!fileName) return 'image/jpeg';
  
  const ext = fileName.toLowerCase().split('.').pop();
  
  if (ext === 'pdf') return 'application/pdf';
  if (['jpg', 'jpeg'].includes(ext)) return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'webp') return 'image/webp';
  
  return 'image/jpeg'; // Default fallback
};

/**
 * Gets the file type category from a filename based on its extension
 * 
 * @param {string} fileName - The filename to analyze
 * @returns {string} - The file type ('pdf' or 'image')
 */
export const getFileType = (fileName) => {
  if (!fileName) return 'image';
  
  const ext = fileName.toLowerCase().split('.').pop();
  
  if (ext === 'pdf') return 'pdf';
  
  return 'image'; // Default to image for all other types
};
