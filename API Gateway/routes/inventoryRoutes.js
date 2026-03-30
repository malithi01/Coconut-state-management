const express = require('express');
const router = express.Router();
const inventoryService = require('../services/inventoryService');

/**
 * @swagger
 * /gateway/inventory:
 *   post:
 *     summary: Add a new inventory item
 *     tags:
 *       - Gateway Inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - quantity
 *               - warehouseLocation
 *               - supplierId
 *             properties:
 *               productName:
 *                 type: string
 *                 enum: ['Coconut', 'King Coconut', 'Young Coconut']
 *               quantity:
 *                 type: number
 *               warehouseLocation:
 *                 type: string
 *               supplierId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inventory item added successfully
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const result = await inventoryService.addInventory(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding inventory item',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags:
 *       - Gateway Inventory
 *     responses:
 *       200:
 *         description: List of all inventory items
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const result = await inventoryService.getAllInventory();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inventory',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/inventory/{id}:
 *   get:
 *     summary: Get inventory item by ID
 *     tags:
 *       - Gateway Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory item details
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await inventoryService.getInventoryById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inventory item',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/inventory/product-count:
 *   get:
 *     summary: Get product counts
 *     tags:
 *       - Gateway Inventory
 *     responses:
 *       200:
 *         description: Product count summary
 *       500:
 *         description: Server error
 */
router.get('/product-count', async (req, res) => {
  try {
    const result = await inventoryService.getProductCounts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product counts',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/inventory/{id}:
 *   put:
 *     summary: Update inventory item by ID
 *     tags:
 *       - Gateway Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inventory item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 enum: ['Coconut', 'King Coconut', 'Young Coconut']
 *               quantity:
 *                 type: number
 *               warehouseLocation:
 *                 type: string
 *               supplierId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const result = await inventoryService.updateInventory(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating inventory item',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/inventory/{id}:
 *   delete:
 *     summary: Delete inventory item by ID
 *     tags:
 *       - Gateway Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inventory item ID
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await inventoryService.deleteInventory(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting inventory item',
      error: error.message,
    });
  }
});

module.exports = router;
