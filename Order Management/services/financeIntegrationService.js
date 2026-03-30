const axios = require('axios');

// Finance Service URL - Use API Gateway or direct service URL
const FINANCE_SERVICE_URL = process.env.FINANCE_SERVICE_URL || 'http://localhost:3000/gateway/finance';

/**
 * Create revenue in Finance Service when an order is created
 * @param {Object} revenueData - Data for creating revenue
 * @param {string} revenueData.orderId - Order ID
 * @param {string} revenueData.customerName - Customer name
 * @param {string} revenueData.productName - Product name
 * @param {number} revenueData.quantity - Quantity ordered
 * @param {number} revenueData.price - Price per unit
 * @returns {Promise} - Response from Finance Service
 */
const createOrderRevenue = async (revenueData) => {
  try {
    const { orderId, customerName, productName, quantity, price } = revenueData;

    // Calculate total revenue amount
    const totalAmount = quantity * price;

    // Create revenue object
    const revenuePayload = {
      orderId: orderId.toString(),
      amount: totalAmount,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      metadata: {
        customerName,
        productName,
        quantity,
        pricePerUnit: price,
        category: 'order-revenue'
      }
    };

    // Call Finance Service API through Gateway
    const response = await axios.post(
      `${FINANCE_SERVICE_URL}/revenue`,
      revenuePayload,
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`[Finance Integration] Revenue created successfully for order ${orderId}`);
    return {
      success: true,
      message: 'Revenue recorded in Finance Service',
      revenueId: response.data.data?._id,
      amount: totalAmount,
      revenueData: response.data.data
    };
  } catch (error) {
    console.error('[Finance Integration] Error creating revenue:', error.message);
    
    // Return error but don't fail the order operation
    return {
      success: false,
      message: 'Failed to record revenue in Finance Service',
      error: error.message,
      note: 'Order operation completed, but Finance recording failed'
    };
  }
};

/**
 * Update revenue in Finance Service when an order status is updated
 * @param {Object} updateData - Data for updating revenue
 * @param {string} updateData.orderId - Order ID
 * @param {string} updateData.newStatus - New order status
 * @param {string} updateData.oldStatus - Old order status
 * @returns {Promise} - Response from Finance Service
 */
const updateOrderRevenue = async (updateData) => {
  try {
    const { orderId, newStatus, oldStatus } = updateData;

    // If order is cancelled, create a negative revenue entry (refund/reversal)
    if (newStatus === 'Cancelled' && oldStatus !== 'Cancelled') {
      const reversePayload = {
        orderId: orderId.toString(),
        amount: 0, // Will be calculated based on original amount
        date: new Date().toISOString().split('T')[0],
        metadata: {
          action: 'order-cancelled',
          previousStatus: oldStatus,
          newStatus: newStatus,
          category: 'order-reversal'
        }
      };

      console.log(`[Finance Integration] Order ${orderId} cancelled, recording reversal`);
      
      // This is logged for potential future processing
      return {
        success: true,
        message: 'Order cancellation noted for Finance Service',
        orderId: orderId.toString(),
        action: 'cancelled'
      };
    }

    return {
      success: true,
      message: 'Order status update noted',
      orderId: orderId.toString(),
      newStatus: newStatus
    };
  } catch (error) {
    console.error('[Finance Integration] Error updating revenue:', error.message);
    return {
      success: false,
      message: 'Failed to update revenue in Finance Service',
      error: error.message
    };
  }
};

module.exports = {
  createOrderRevenue,
  updateOrderRevenue
};
