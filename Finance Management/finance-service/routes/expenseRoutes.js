const express = require('express');
const router = express.Router();
const { addExpense, getAllExpenses, getTotalExpenses, getSummary } = require('../controllers/expenseController');

/**
 * @swagger
 * /finance/expense:
 *   post:
 *     summary: Add a new expense entry
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
 *         description: Expense added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', addExpense);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalExpenses:
 *                   type: number
 *                 count:
 *                   type: number
 *                 filters:
 *                   type: object
 *       500:
 *         description: Server error
 */
router.get('/total', getTotalExpenses);

/**
 * @swagger
 * /finance/summary:
 *   get:
 *     summary: Get financial summary (total revenue, expense, and profit)
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Financial summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *                 totalExpense:
 *                   type: number
 *                 profit:
 *                   type: number
 *       500:
 *         description: Server error
 */
router.get('/summary', getSummary);

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
router.get('/', getAllExpenses);

module.exports = router;
