const axios = require('axios');
const serviceURLs = require('../config/serviceURLs');

// Helper function to extract error details
const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error status
    return `(${error.response.status}) ${error.response.data?.message || error.response.statusText}`;
  } else if (error.request) {
    // Request made but no response
    return `No response from server - ${error.message || 'Connection refused'}`;
  } else {
    // Error in request setup
    return error.message || 'Unknown error';
  }
};

// Create Supplier Service client
const supplierClient = axios.create({
  baseURL: serviceURLs.supplier.baseURL,
  timeout: serviceURLs.supplier.timeout,
});

/**
 * Create a new supplier
 */
exports.createSupplier = async (supplierData) => {
  try {
    const response = await supplierClient.post('/supplier', supplierData);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error creating supplier:', errorMsg);
    throw new Error(`Supplier service error: ${errorMsg}`);
  }
};

/**
 * Get all suppliers
 */
exports.getSuppliers = async () => {
  try {
    const response = await supplierClient.get('/supplier');
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching suppliers:', errorMsg);
    throw new Error(`Supplier service error: ${errorMsg}`);
  }
};

/**
 * Get supplier by ID
 */
exports.getSupplierById = async (id) => {
  try {
    const response = await supplierClient.get(`/supplier/${id}`);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching supplier:', errorMsg);
    throw new Error(`Supplier service error: ${errorMsg}`);
  }
};

/**
 * Update supplier by ID
 */
exports.updateSupplier = async (id, updateData) => {
  try {
    const response = await supplierClient.put(`/supplier/${id}`, updateData);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error updating supplier:', errorMsg);
    throw new Error(`Supplier service error: ${errorMsg}`);
  }
};

/**
 * Delete supplier by ID
 */
exports.deleteSupplier = async (id) => {
  try {
    const response = await supplierClient.delete(`/supplier/${id}`);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error deleting supplier:', errorMsg);
    throw new Error(`Supplier service error: ${errorMsg}`);
  }
};

/**
 * Receive products from supplier and update inventory
 * This endpoint handles the integration between Supplier Management and Inventory Management services
 */
exports.receiveProducts = async (supplierId, productsData) => {
  try {
    const response = await supplierClient.post(
      `/supplier/${supplierId}/receive-products`,
      productsData
    );
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error receiving products:', errorMsg);
    throw new Error(`Supplier service error: ${errorMsg}`);
  }
};
