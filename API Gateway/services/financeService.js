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

// Create Finance Service client
const financeClient = axios.create({
  baseURL: serviceURLs.finance.baseURL,
  timeout: serviceURLs.finance.timeout,
});

/**
 * ============= REVENUE ENDPOINTS =============
 */

/**
 * Create a new revenue entry
 */
exports.createRevenue = async (revenueData) => {
  try {
    const response = await financeClient.post('/revenue', revenueData);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error creating revenue:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Get all revenue entries
 */
exports.getAllRevenue = async () => {
  try {
    const response = await financeClient.get('/revenue');
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching revenue:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Get revenue by ID
 */
exports.getRevenueById = async (id) => {
  try {
    const response = await financeClient.get(`/revenue/${id}`);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching revenue:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Get total revenue with optional filters
 */
exports.getTotalRevenue = async (filters = {}) => {
  try {
    const response = await financeClient.get('/revenue/total', { params: filters });
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching total revenue:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Update revenue by ID
 */
exports.updateRevenue = async (id, updateData) => {
  try {
    const response = await financeClient.put(`/revenue/${id}`, updateData);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error updating revenue:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Delete revenue by ID
 */
exports.deleteRevenue = async (id) => {
  try {
    const response = await financeClient.delete(`/revenue/${id}`);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error deleting revenue:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * ============= EXPENSE ENDPOINTS =============
 */

/**
 * Create a new expense entry
 */
exports.createExpense = async (expenseData) => {
  try {
    const response = await financeClient.post('/expense', expenseData);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error creating expense:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Get all expense entries
 */
exports.getAllExpenses = async () => {
  try {
    const response = await financeClient.get('/expense');
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching expenses:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Get expense by ID
 */
exports.getExpenseById = async (id) => {
  try {
    const response = await financeClient.get(`/expense/${id}`);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching expense:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Get total expenses with optional filters
 */
exports.getTotalExpenses = async (filters = {}) => {
  try {
    const response = await financeClient.get('/expense/total', { params: filters });
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching total expenses:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Update expense by ID
 */
exports.updateExpense = async (id, updateData) => {
  try {
    const response = await financeClient.put(`/expense/${id}`, updateData);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error updating expense:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * Delete expense by ID
 */
exports.deleteExpense = async (id) => {
  try {
    const response = await financeClient.delete(`/expense/${id}`);
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error deleting expense:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};

/**
 * ============= SUMMARY ENDPOINTS =============
 */

/**
 * Get finance summary (revenue vs expenses)
 */
exports.getSummary = async () => {
  try {
    const response = await financeClient.get('/summary');
    return response.data;
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.error('Error fetching summary:', errorMsg);
    throw new Error(`Finance service error: ${errorMsg}`);
  }
};
