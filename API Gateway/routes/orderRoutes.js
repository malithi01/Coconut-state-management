const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');
const inventoryService = require('../services/inventoryService');

/**
 * @swagger
 * /gateway/orders/create-with-inventory:
 *   post:
 *     summary: Create order with automatic inventory reduction
 *     tags:
 *       - Gateway Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - productName
 *               - quantity
 *               - price
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: John Doe
 *               productName:
 *                 type: string
 *                 enum: ['Coconut', 'King Coconut', 'Young Coconut']
 *                 example: Coconut
 *               quantity:
 *                 type: number
 *                 example: 10
 *               price:
 *                 type: number
 *                 example: 1200.50
 *               status:
 *                 type: string
 *                 enum: ['Pending', 'Completed', 'Cancelled']
 *                 default: Pending
 *     responses:
 *       201:
 *         description: Order created and inventory updated successfully
 *       400:
 *         description: Insufficient inventory or invalid request
 *       500:
 *         description: Server error
 */
router.post('/create-with-inventory', async (req, res) => {
  try {
    const { customerName, productName, quantity, price, status } = req.body;

    // Validate required fields
    if (!customerName || !productName || !quantity || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: customerName, productName, quantity, price',
      });
    }

    // Check inventory availability
    console.log(`[Gateway] Checking inventory availability for ${productName}, quantity: ${quantity}`);
    const inventoryCheck = await inventoryService.checkInventoryAvailability(productName, quantity);

    if (!inventoryCheck.available) {
      return res.status(400).json({
        success: false,
        message: `Insufficient inventory for product: ${productName}`,
        details: {
          requested: inventoryCheck.requiredQuantity,
          available: inventoryCheck.totalAvailable,
          shortfall: inventoryCheck.shortfall,
        },
      });
    }

    // Create order
    console.log(`[Gateway] Creating order for ${customerName}: ${quantity} x ${productName}`);
    const orderData = {
      customerName,
      productName,
      quantity,
      price,
      status: status || 'Pending',
    };

    const orderResult = await orderService.createOrder(orderData);

    if (!orderResult.success) {
      throw new Error('Failed to create order');
    }

    // Update inventory
    console.log(`[Gateway] Decreasing inventory for ${productName} by ${quantity}`);
    const allInventory = await inventoryService.getAllInventory();
    await inventoryService.updateInventoryQuantity(allInventory.data, productName, quantity);

    res.status(201).json({
      success: true,
      message: 'Order created and inventory updated successfully',
      data: {
        order: orderResult.data,
        inventoryUpdated: true,
        message: `Inventory for ${productName} decreased by ${quantity} units`,
      },
    });
  } catch (error) {
    console.error('[Gateway] Error creating order with inventory:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Gateway Orders
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['Pending', 'Completed', 'Cancelled']
 *     responses:
 *       200:
 *         description: List of all orders
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const result = await orderService.getAllOrders(status);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags:
 *       - Gateway Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await orderService.getOrderById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/orders/{id}:
 *   put:
 *     summary: Update order by ID
 *     tags:
 *       - Gateway Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               productName:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: ['Pending', 'Completed', 'Cancelled']
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const result = await orderService.updateOrder(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/orders/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     tags:
 *       - Gateway Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await orderService.deleteOrder(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message,
    });
  }
});

module.exports = router;
