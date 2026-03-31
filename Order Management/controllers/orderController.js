const Order = require('../models/orderModel');
const financeIntegrationService = require('../services/financeIntegrationService');

/**
 * Create a new order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createOrder = async (req, res) => {
  try {
    const { customerName, productName, quantity, price, status } = req.body;

    // Validate required fields
    if (!customerName || !productName || !quantity || price === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: customerName, productName, quantity, price',
      });
    }

    // Create new order
    const order = await Order.create({
      customerName,
      productName,
      quantity,
      price,
      status: status || 'Pending',
    });

    // Create revenue in Finance Service
    const revenueData = {
      orderId: order._id,
      customerName,
      productName,
      quantity,
      price,
    };
    const financeResult = await financeIntegrationService.createOrderRevenue(revenueData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
      financeData: financeResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Get all orders
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllOrders = async (req, res) => {
  try {
    // Optional: Add query filtering by status
    const { status } = req.query;
    const filter = status ? { status } : {};

    const orders = await Order.find(filter).sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Get order by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB Object ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid order ID format',
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Update order by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, productName, quantity, price, status } = req.body;

    // Validate MongoDB Object ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid order ID format',
      });
    }

    // Get the old order data first
    const oldOrder = await Order.findById(id);
    if (!oldOrder) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (customerName !== undefined) updateData.customerName = customerName;
    if (productName !== undefined) updateData.productName = productName;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (price !== undefined) updateData.price = price;
    if (status !== undefined) updateData.status = status;

    const order = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // If status was updated, notify Finance Service
    let financeResult = null;
    if (status !== undefined && status !== oldOrder.status) {
      const updateData = {
        orderId: id,
        oldStatus: oldOrder.status,
        newStatus: status,
      };
      financeResult = await financeIntegrationService.updateOrderRevenue(updateData);
    }

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: order,
      financeData: financeResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Delete order by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB Object ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid order ID format',
      });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
