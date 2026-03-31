const express = require('express');
const router = express.Router();
const supplierService = require('../services/supplierService');

/**
 * @swagger
 * /gateway/supplier:
 *   post:
 *     summary: Create a new supplier
 *     tags:
 *       - Gateway Supplier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contactNumber
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: Green Harvest Pvt Ltd
 *               contactNumber:
 *                 type: string
 *                 example: +94771234567
 *               location:
 *                 type: string
 *                 example: Kurunegala
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productName:
 *                       type: string
 *                       enum: ['Coconut', 'King Coconut', 'Young Coconut']
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                     receivedDate:
 *                       type: string
 *                       format: date-time
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const result = await supplierService.createSupplier(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating supplier',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/supplier:
 *   get:
 *     summary: Get all suppliers
 *     tags:
 *       - Gateway Supplier
 *     responses:
 *       200:
 *         description: List of all suppliers
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const result = await supplierService.getSuppliers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching suppliers',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/supplier/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags:
 *       - Gateway Supplier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supplier details
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await supplierService.getSupplierById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching supplier',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/supplier/{id}:
 *   put:
 *     summary: Update supplier by ID
 *     tags:
 *       - Gateway Supplier
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
 *               name:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               location:
 *                 type: string
 *               products:
 *                 type: array
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const result = await supplierService.updateSupplier(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating supplier',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/supplier/{id}:
 *   delete:
 *     summary: Delete supplier by ID
 *     tags:
 *       - Gateway Supplier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await supplierService.deleteSupplier(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting supplier',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/supplier/{id}/receive-products:
 *   post:
 *     summary: Receive products from supplier and update inventory
 *     tags:
 *       - Gateway Supplier Integration
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
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
 *               - price
 *             properties:
 *               productName:
 *                 type: string
 *                 enum: ['Coconut', 'King Coconut', 'Young Coconut']
 *                 example: Coconut
 *               quantity:
 *                 type: number
 *                 example: 500
 *               warehouseLocation:
 *                 type: string
 *                 example: Warehouse A - Room 1
 *               price:
 *                 type: number
 *                 example: 150
 *     responses:
 *       201:
 *         description: Products received successfully and inventory updated
 *       400:
 *         description: Bad request - missing required fields
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Error receiving products or updating inventory
 */
router.post('/:id/receive-products', async (req, res) => {
  try {
    const result = await supplierService.receiveProducts(req.params.id, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error receiving products',
      error: error.message,
    });
  }
});

module.exports = router;
