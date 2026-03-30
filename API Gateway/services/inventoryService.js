const axios = require('axios');
const serviceURLs = require('../config/serviceURLs');

// Create Inventory Service client
const inventoryClient = axios.create({
  baseURL: serviceURLs.inventory.baseURL,
  timeout: serviceURLs.inventory.timeout,
});

/**
 * Get all inventory items
 */
exports.getAllInventory = async () => {
  try {
    const response = await inventoryClient.get('/inventory');
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error.message);
    throw new Error(`Inventory service error: ${error.message}`);
  }
};

/**
 * Get inventory by ID
 */
exports.getInventoryById = async (id) => {
  try {
    const response = await inventoryClient.get(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory item:', error.message);
    throw new Error(`Inventory service error: ${error.message}`);
  }
};

/**
 * Get product counts
 */
exports.getProductCounts = async () => {
  try {
    const response = await inventoryClient.get('/inventory/product-count');
    return response.data;
  } catch (error) {
    console.error('Error fetching product counts:', error.message);
    throw new Error(`Inventory service error: ${error.message}`);
  }
};

/**
 * Add inventory item
 */
exports.addInventory = async (data) => {
  try {
    const response = await inventoryClient.post('/inventory', data);
    return response.data;
  } catch (error) {
    console.error('Error adding inventory:', error.message);
    throw new Error(`Inventory service error: ${error.message}`);
  }
};

/**
 * Update inventory quantity (decrease when order is placed)
 */
exports.updateInventoryQuantity = async (inventoryItems, productName, orderedQuantity) => {
  try {
    // Find inventory items matching the product name
    const matchingItems = inventoryItems.filter((item) => item.productName === productName);

    if (matchingItems.length === 0) {
      throw new Error(`No inventory found for product: ${productName}`);
    }

    let remainingQuantity = orderedQuantity;
    const updatePromises = [];

    // Decrease inventory from each matching item
    for (const item of matchingItems) {
      if (remainingQuantity <= 0) break;

      const quantityToDecrease = Math.min(item.quantity, remainingQuantity);
      const newQuantity = item.quantity - quantityToDecrease;

      const updateData = {
        productName: item.productName,
        quantity: newQuantity,
        warehouseLocation: item.warehouseLocation,
        supplierId: item.supplierId,
      };

      updatePromises.push(
        inventoryClient
          .put(`/inventory/${item._id}`, updateData)
          .catch((error) => {
            console.error(`Error updating inventory ${item._id}:`, error.message);
            throw error;
          })
      );

      remainingQuantity -= quantityToDecrease;
    }

    if (remainingQuantity > 0) {
      throw new Error(`Insufficient stock for product: ${productName}. Needed: ${orderedQuantity}, Available: ${orderedQuantity - remainingQuantity}`);
    }

    await Promise.all(updatePromises);
    return true;
  } catch (error) {
    console.error('Error updating inventory quantity:', error.message);
    throw error;
  }
};

/**
 * Check if sufficient inventory exists for order
 */
exports.checkInventoryAvailability = async (productName, requiredQuantity) => {
  try {
    const allInventory = await this.getAllInventory();
    const availableItems = allInventory.data.filter((item) => item.productName === productName);

    const totalAvailable = availableItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      available: totalAvailable >= requiredQuantity,
      totalAvailable,
      requiredQuantity,
      shortfall: totalAvailable < requiredQuantity ? requiredQuantity - totalAvailable : 0,
    };
  } catch (error) {
    console.error('Error checking inventory availability:', error.message);
    throw error;
  }
};

/**
 * Update inventory item by ID
 */
exports.updateInventory = async (id, data) => {
  try {
    const response = await inventoryClient.put(`/inventory/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating inventory:', error.message);
    throw new Error(`Inventory service error: ${error.message}`);
  }
};

/**
 * Delete inventory item by ID
 */
exports.deleteInventory = async (id) => {
  try {
    const response = await inventoryClient.delete(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting inventory:', error.message);
    throw new Error(`Inventory service error: ${error.message}`);
  }
};
