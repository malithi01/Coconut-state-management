const axios = require('axios');
const serviceURLs = require('../config/serviceURLs');

// Create Order Service client
const orderClient = axios.create({
  baseURL: serviceURLs.order.baseURL,
  timeout: serviceURLs.order.timeout,
});

/**
 * Create a new order
 */
exports.createOrder = async (data) => {
  try {
    const response = await orderClient.post('/orders', data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.message);
    throw new Error(`Order service error: ${error.message}`);
  }
};

/**
 * Get all orders
 */
exports.getAllOrders = async (status = null) => {
  try {
    const config = status ? { params: { status } } : {};
    const response = await orderClient.get('/orders', config);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    throw new Error(`Order service error: ${error.message}`);
  }
};

/**
 * Get order by ID
 */
exports.getOrderById = async (id) => {
  try {
    const response = await orderClient.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error.message);
    throw new Error(`Order service error: ${error.message}`);
  }
};

/**
 * Update order
 */
exports.updateOrder = async (id, data) => {
  try {
    const response = await orderClient.put(`/orders/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error.message);
    throw new Error(`Order service error: ${error.message}`);
  }
};

/**
 * Delete order
 */
exports.deleteOrder = async (id) => {
  try {
    const response = await orderClient.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error.message);
    throw new Error(`Order service error: ${error.message}`);
  }
};
