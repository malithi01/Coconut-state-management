const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Add a new inventory item (coconut stock)
 *     tags:
 *       - Inventory
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
 *                 example: Coconut
 *               quantity:
 *                 type: number
 *                 example: 100
 *               warehouseLocation:
 *                 type: string
 *                 example: Warehouse A - Room 1
 *               supplierId:
 *                 type: string
 *                 example: SUP001
 *               dateAdded:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-09-15
 *     responses:
 *       201:
 *         description: Inventory item added successfully
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: Server error
 */
router.post('/inventory', inventoryController.addInventory);

/**
 * @swagger
 * /inventory/product-count:
 *   get:
 *     summary: Get count summary for each coconut product
 *     tags:
 *       - Inventory
 *     responses:
 *       200:
 *         description: Product count summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productName:
 *                         type: string
 *                       totalQuantity:
 *                         type: number
 *                       recordCount:
 *                         type: number
 *       500:
 *         description: Server error
 */
router.get('/inventory/product-count', inventoryController.getProductCount);

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags:
 *       - Inventory
 *     responses:
 *       200:
 *         description: List of all inventory items
 *       500:
 *         description: Server error
 */
router.get('/inventory', inventoryController.getAllInventory);

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     summary: Get inventory item by ID
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inventory item ID
 *     responses:
 *       200:
 *         description: Inventory item details
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
router.get('/inventory/:id', inventoryController.getInventoryById);

/**
 * @swagger
 * /inventory/{id}:
 *   put:
 *     summary: Update inventory item by ID
 *     tags:
 *       - Inventory
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
 *               dateAdded:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
router.put('/inventory/:id', inventoryController.updateInventory);

/**
 * @swagger
 * /inventory/{id}:
 *   delete:
 *     summary: Delete inventory item by ID
 *     tags:
 *       - Inventory
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
router.delete('/inventory/:id', inventoryController.deleteInventory);

module.exports = router;
