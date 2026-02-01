/**
 * Backup Service
 * Handles backup creation, parsing, validation and import for FleetProTax
 * Version: 2.0.0
 */

import { Capacitor } from '@capacitor/core';
import JSZip from 'jszip';

// App version - should match package.json
const APP_VERSION = '1.0.0';
const BACKUP_VERSION = '2.0.0';
const BACKUP_FORMAT = 'fleetprotax-backup-v2';

/**
 * Get current platform
 * @returns {string} 'android' | 'ios' | 'web'
 */
const getPlatform = () => {
  const platform = Capacitor.getPlatform();
  return platform === 'android' ? 'android' : platform === 'ios' ? 'ios' : 'web';
};

/**
 * Generate backup filename with timestamp
 * Format: FleetProTax-Backup-YYYY-MM-DD-HH-mm.zip
 * @param {Date} date - Date object for timestamp
 * @returns {string} Formatted filename
 */
export const generateFileName = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `FleetProTax-Backup-${year}-${month}-${day}-${hours}-${minutes}.zip`;
};

/**
 * Calculate metadata from backup data
 * @param {Object} data - Backup data object
 * @returns {Object} Metadata object
 */
const calculateMetadata = (data) => {
  const trips = data.trips || [];
  const mileage = data.mileage || [];
  const equipment = data.equipment || [];
  const expenses = data.expenses || [];
  
  const totalEntries = trips.length + mileage.length + equipment.length + expenses.length;
  
  // Calculate date range from all entries with dates
  const allDates = [
    ...trips.map(t => t.date).filter(Boolean),
    ...trips.map(t => t.endDate).filter(Boolean),
    ...mileage.map(m => m.date).filter(Boolean),
    ...equipment.map(e => e.date).filter(Boolean),
    ...expenses.map(e => e.date).filter(Boolean)
  ].sort();
  
  const dateRange = allDates.length > 0 ? {
    start: allDates[0],
    end: allDates[allDates.length - 1]
  } : null;
  
  // Count receipts
  const receiptsCount = 
    equipment.filter(e => e.receiptFileName).length +
    expenses.filter(e => e.receiptFileName).length +
    mileage.filter(m => m.receiptFileName).length;
  
  return {
    totalEntries,
    dateRange,
    hasReceipts: receiptsCount > 0,
    receiptsCount
  };
};

/**
 * Create backup data structure (v2.0.0)
 * @param {Object} params - Backup parameters
 * @param {Array} params.trips - Trip entries (renamed from mealEntries)
 * @param {Array} params.mileage - Mileage entries
 * @param {Array} params.equipment - Equipment entries
 * @param {Array} params.expenses - Expense entries
 * @param {Object} params.settings - Settings object
 * @returns {Object} Backup data structure
 */
export const createBackupData = ({
  trips = [],
  mileage = [],
  equipment = [],
  expenses = [],
  settings = {}
}) => {
  const createdAt = new Date().toISOString();
  
  const backupData = {
    app: {
      name: 'FleetProTax',
      version: APP_VERSION,
      platform: getPlatform()
    },
    backup: {
      version: BACKUP_VERSION,
      createdAt,
      format: BACKUP_FORMAT
    },
    data: {
      trips,
      mileage,
      equipment,
      expenses,
      settings
    },
    metadata: calculateMetadata({ trips, mileage, equipment, expenses })
  };
  
  return backupData;
};

/**
 * Validate backup data structure
 * @param {Object} data - Parsed backup data
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateBackup = (data) => {
  const errors = [];
  
  if (!data) {
    errors.push('Backup-Daten sind leer oder ungültig');
    return { isValid: false, errors };
  }
  
  // Check for v2 structure
  if (!data.backup || !data.backup.version) {
    errors.push('Backup-Version fehlt');
  }
  
  // Check backup version
  const version = data.backup?.version;
  if (version !== BACKUP_VERSION) {
    errors.push(`Inkompatible Backup-Version: ${version} (erwartet: ${BACKUP_VERSION})`);
  }
  
  // Check format
  if (data.backup?.format !== BACKUP_FORMAT) {
    errors.push(`Ungültiges Backup-Format: ${data.backup?.format}`);
  }
  
  // Check app structure
  if (!data.app || !data.app.name) {
    errors.push('App-Informationen fehlen');
  }
  
  // Check data structure
  if (!data.data) {
    errors.push('Backup enthält keine Daten');
  }
  
  // Validate data fields exist (they can be empty arrays)
  if (data.data) {
    const requiredFields = ['trips', 'mileage', 'equipment', 'expenses', 'settings'];
    requiredFields.forEach(field => {
      if (!(field in data.data)) {
        errors.push(`Pflichtfeld fehlt: ${field}`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Parse and validate backup from JSON string
 * @param {string} jsonString - JSON backup string
 * @returns {Object} { isValid: boolean, data: Object, metadata: Object, errors: string[] }
 */
export const parseBackup = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    const validation = validateBackup(parsed);
    
    return {
      isValid: validation.isValid,
      data: parsed,
      metadata: parsed.metadata || null,
      errors: validation.errors
    };
  } catch (error) {
    return {
      isValid: false,
      data: null,
      metadata: null,
      errors: [`JSON-Parse-Fehler: ${error.message}`]
    };
  }
};

/**
 * Create backup blob for export
 * @param {Object} backupData - Backup data structure
 * @param {JSZip} [zipInstance] - Optional existing zip instance to add backup to
 * @returns {Promise<Blob>} Backup ZIP blob
 */
export const createBackupBlob = async (backupData, zipInstance = null) => {
  const zip = zipInstance || new JSZip();
  
  // Add backup.json
  zip.file('backup.json', JSON.stringify(backupData, null, 2));
  
  // Generate blob
  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
};

/**
 * Main service export
 */
const BackupService = {
  generateFileName,
  createBackupData,
  validateBackup,
  parseBackup,
  createBackupBlob,
  
  // Constants
  APP_VERSION,
  BACKUP_VERSION,
  BACKUP_FORMAT
};

export default BackupService;
