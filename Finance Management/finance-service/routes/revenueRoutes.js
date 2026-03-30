const express = require('express');
const router = express.Router();
const { addRevenue, getAllRevenue, getTotalRevenue } = require('../controllers/revenueController');

/**
 * @swagger
 * /finance/revenue:
 *   post:
 *     summary: Add a new revenue entry
 *     tags: [Revenue]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *               - date
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "ORD123"
 *               amount:
 *                 type: number
 *                 example: 1000
 *               date:
 *                 type: string
 *                 example: "2026-03-27"
 *     responses:
 *       201:
 *         description: Revenue added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', addRevenue);

/**
 * @swagger
 * /finance/revenue/total:
 *   get:
 *     summary: Get total revenue with optional filters
 *     tags: [Revenue]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date for filtering (YYYY-MM-DD)
 *         example: "2026-03-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date for filtering (YYYY-MM-DD)
 *         example: "2026-03-31"
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         description: Order ID filter
 *         example: "ORD123"
 *     responses:
 *       200:
 *         description: Total revenue fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *                 count:
 *                   type: number
 *                 filters:
 *                   type: object
 *       500:
 *         description: Server error
 */
router.get('/total', getTotalRevenue);

/**
 * @swagger
 * /finance/revenue:
 *   get:
 *     summary: Get all revenue entries
 *     tags: [Revenue]
 *     responses:
 *       200:
 *         description: List of all revenues
 *       500:
 *         description: Server error
 */
router.get('/', getAllRevenue);

module.exports = router;
