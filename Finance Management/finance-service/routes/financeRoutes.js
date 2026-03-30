const express = require('express');
const router = express.Router();
const {
  // Revenue
  addRevenue,
  getAllRevenue,
  getRevenueById,
  updateRevenue,
  deleteRevenue,
  // Expense
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  // Summary
  getSummary,
} = require('../controllers/financeController');

// Import total functions from separate controllers
const { getTotalExpenses } = require('../controllers/expenseController');
const { getTotalRevenue } = require('../controllers/revenueController');

// ============= REVENUE ENDPOINTS =============

/**
 * @swagger
 * /finance/revenue:
 *   post:
 *     summary: Create a new revenue entry
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
 *         description: Revenue created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/revenue', addRevenue);

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
router.get('/revenue', getAllRevenue);

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
 *       500:
 *         description: Server error
 */
router.get('/revenue/total', getTotalRevenue);

/**
 * @swagger
 * /finance/revenue/{id}:
 *   get:
 *     summary: Get revenue by ID
 *     tags: [Revenue]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Revenue ID
 *     responses:
 *       200:
 *         description: Revenue fetched successfully
 *       404:
 *         description: Revenue not found
 *       500:
 *         description: Server error
 */
router.get('/revenue/:id', getRevenueById);

/**
 * @swagger
 * /finance/revenue/{id}:
 *   put:
 *     summary: Update revenue by ID
 *     tags: [Revenue]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Revenue ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Revenue updated successfully
 *       400:
 *         description: No fields to update
 *       404:
 *         description: Revenue not found
 *       500:
 *         description: Server error
 */
router.put('/revenue/:id', updateRevenue);

/**
 * @swagger
 * /finance/revenue/{id}:
 *   delete:
 *     summary: Delete revenue by ID
 *     tags: [Revenue]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Revenue ID
 *     responses:
 *       200:
 *         description: Revenue deleted successfully
 *       404:
 *         description: Revenue not found
 *       500:
 *         description: Server error
 */
router.delete('/revenue/:id', deleteRevenue);

// ============= EXPENSE ENDPOINTS =============

/**
 * @swagger
 * /finance/expense:
 *   post:
 *     summary: Create a new expense entry
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *               - date
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Supplies"
 *               amount:
 *                 type: number
 *                 example: 500
 *               date:
 *                 type: string
 *                 example: "2026-03-27"
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/expense', addExpense);

/**
 * @swagger
 * /finance/expense:
 *   get:
 *     summary: Get all expense entries
 *     tags: [Expense]
 *     responses:
 *       200:
 *         description: List of all expenses
 *       500:
 *         description: Server error
 */
router.get('/expense', getAllExpenses);

/**
 * @swagger
 * /finance/expense/total:
 *   get:
 *     summary: Get total expenses with optional filters
 *     tags: [Expense]
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
 *         name: type
 *         schema:
 *           type: string
 *         description: Expense type filter (e.g., Supplies, Utilities)
 *         example: "Supplies"
 *     responses:
 *       200:
 *         description: Total expenses fetched successfully
 *       500:
 *         description: Server error
 */
router.get('/expense/total', getTotalExpenses);

/**
 * @swagger
 * /finance/expense/{id}:
 *   get:
 *     summary: Get expense by ID
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense fetched successfully
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.get('/expense/:id', getExpenseById);

/**
 * @swagger
 * /finance/expense/{id}:
 *   put:
 *     summary: Update expense by ID
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       400:
 *         description: No fields to update
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.put('/expense/:id', updateExpense);

/**
 * @swagger
 * /finance/expense/{id}:
 *   delete:
 *     summary: Delete expense by ID
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.delete('/expense/:id', deleteExpense);

// ============= SUMMARY ENDPOINT =============

/**
 * @swagger
 * /finance/summary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Financial summary with total revenue, expense, and profit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *                   example: 5000
 *                 totalExpense:
 *                   type: number
 *                   example: 2000
 *                 profit:
 *                   type: number
 *                   example: 3000
 *                 revenueCount:
 *                   type: number
 *                 expenseCount:
 *                   type: number
 *       500:
 *         description: Server error
 */
router.get('/summary', getSummary);

module.exports = router;
