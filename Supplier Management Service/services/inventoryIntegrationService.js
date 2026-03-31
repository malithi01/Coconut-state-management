const axios = require('axios');

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

// Create Inventory Service client
const inventoryClient = axios.create({
  baseURL: process.env.INVENTORY_SERVICE_URL || 'http://localhost:8082/api',
  timeout: 5000,
});

/**
 * Add inventory items when products are received from a supplier
 * @param {Object} inventoryData - The inventory data to be added
 * @param {String} inventoryData.productName - Product name (Coconut, King Coconut, Young Coconut)
 * @param {Number} inventoryData.quantity - Quantity received
 * @param {String} inventoryData.warehouseLocation - Warehouse location where product is stored
 * @param {String} inventoryData.supplierId - Supplier ID
 * @returns {Promise<Object>} - Response from inventory service
 */
exports.addInventoryFromSupplier = async (inventoryData) => {
  try {
    const response = await inventoryClient.post('/inventory', inventoryData);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error adding inventory from supplier:', errorMsg);
    throw new Error(`Inventory service error: ${errorMsg}`);
  }
};

/**
 * Get inventory by supplier ID
 * @param {String} supplierId - Supplier ID
 * @returns {Promise<Array>} - Array of inventory items from this supplier
 */
exports.getInventoryBySupplier = async (supplierId) => {
  try {
    // Get all inventory and filter by supplier ID
    const response = await inventoryClient.get('/inventory');
    if (response.data && response.data.data) {
      const supplierInventory = response.data.data.filter(item => item.supplierId === supplierId);
      return {
        success: true,
        message: `Inventory items from supplier ${supplierId} retrieved successfully`,
        data: supplierInventory,
      };
    }
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching inventory by supplier:', errorMsg);
    throw new Error(`Inventory service error: ${errorMsg}`);
  }
};

/**
 * Update inventory quantity
 * @param {String} inventoryId - Inventory ID
 * @param {Number} quantity - New quantity
 * @returns {Promise<Object>} - Response from inventory service
 */
exports.updateInventoryQuantity = async (inventoryId, quantity) => {
  try {
    const response = await inventoryClient.put(`/inventory/${inventoryId}`, { quantity });
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error updating inventory quantity:', errorMsg);
    throw new Error(`Inventory service error: ${errorMsg}`);
  }
};
