const axios = require('axios');

// Finance Service URL - Use API Gateway or direct service URL
const FINANCE_SERVICE_URL = process.env.FINANCE_SERVICE_URL || 'http://localhost:3000/gateway/finance';

/**
 * Create an expense in Finance Service when products are received from supplier
 * @param {Object} expenseData - Data for creating expense
 * @param {string} expenseData.supplierId - Supplier ID
 * @param {string} expenseData.supplierName - Supplier name
 * @param {string} expenseData.productName - Product name
 * @param {number} expenseData.quantity - Quantity received
 * @param {number} expenseData.price - Price per unit
 * @param {string} expenseData.warehouseLocation - Warehouse location
 * @returns {Promise} - Response from Finance Service
 */
const createSupplierExpense = async (expenseData) => {
  try {
    const { supplierId, supplierName, productName, quantity, price, warehouseLocation } = expenseData;

    // Calculate total expense amount
    const totalAmount = quantity * price;

    // Create expense object
    const expensePayload = {
      type: `Supplier Purchase - ${supplierName}`,
      amount: totalAmount,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      metadata: {
        supplierId,
        supplierName,
        productName,
        quantity,
        pricePerUnit: price,
        warehouseLocation,
        category: 'supplier-purchase'
      }
    };

    // Call Finance Service API through Gateway
    const response = await axios.post(
      `${FINANCE_SERVICE_URL}/expenses`,
      expensePayload,
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`[Finance Integration] Expense created successfully for supplier ${supplierName}`);
    return {
      success: true,
      message: 'Expense recorded in Finance Service',
      expenseId: response.data.data?._id,
      amount: totalAmount,
      expenseData: response.data.data
    };
  } catch (error) {
    console.error('[Finance Integration] Error creating expense:', error.message);
    
    // Return error but don't fail the supplier operation
    return {
      success: false,
      message: 'Failed to record expense in Finance Service',
      error: error.message,
      note: 'Supplier operation completed, but Finance recording failed'
    };
  }
};

module.exports = {
  createSupplierExpense
};
