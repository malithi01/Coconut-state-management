const express = require('express');
const router = express.Router();
const financeService = require('../services/financeService');

/**
 * ============= REVENUE ENDPOINTS =============
 */

/**
 * @swagger
 * /gateway/finance/revenue:
 *   post:
 *     summary: Create a new revenue entry
 *     tags:
 *       - Gateway Finance Revenue
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
 *                 example: "507f1f77bcf86cd799439011"
 *               amount:
 *                 type: number
 *                 example: 50000
 *               date:
 *                 type: string
 *                 example: "2026-03-31"
 *               metadata:
 *                 type: object
 *                 description: Optional metadata about the revenue
 *     responses:
 *       201:
 *         description: Revenue created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/revenue', async (req, res) => {
  try {
    const result = await financeService.createRevenue(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating revenue',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/revenue:
 *   get:
 *     summary: Get all revenue entries
 *     tags:
 *       - Gateway Finance Revenue
 *     responses:
 *       200:
 *         description: List of all revenues
 *       500:
 *         description: Server error
 */
router.get('/revenue', async (req, res) => {
  try {
    const result = await financeService.getAllRevenue();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching revenue',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/revenue/total:
 *   get:
 *     summary: Get total revenue with optional filters
 *     tags:
 *       - Gateway Finance Revenue
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         description: Filter by order ID
 *     responses:
 *       200:
 *         description: Total revenue with filters applied
 *       500:
 *         description: Server error
 */
router.get('/revenue/total', async (req, res) => {
  try {
    const result = await financeService.getTotalRevenue(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching total revenue',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/revenue/{id}:
 *   get:
 *     summary: Get revenue by ID
 *     tags:
 *       - Gateway Finance Revenue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Revenue details
 *       404:
 *         description: Revenue not found
 *       500:
 *         description: Server error
 */
router.get('/revenue/:id', async (req, res) => {
  try {
    const result = await financeService.getRevenueById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching revenue',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/revenue/{id}:
 *   put:
 *     summary: Update revenue by ID
 *     tags:
 *       - Gateway Finance Revenue
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
router.put('/revenue/:id', async (req, res) => {
  try {
    const result = await financeService.updateRevenue(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating revenue',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/revenue/{id}:
 *   delete:
 *     summary: Delete revenue by ID
 *     tags:
 *       - Gateway Finance Revenue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Revenue deleted successfully
 *       404:
 *         description: Revenue not found
 *       500:
 *         description: Server error
 */
router.delete('/revenue/:id', async (req, res) => {
  try {
    const result = await financeService.deleteRevenue(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting revenue',
      error: error.message,
    });
  }
});

/**
 * ============= EXPENSE ENDPOINTS =============
 */

/**
 * @swagger
 * /gateway/finance/expenses:
 *   post:
 *     summary: Create a new expense entry
 *     tags:
 *       - Gateway Finance Expense
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
 *                 example: "Supplier Purchase - Green Harvest"
 *               amount:
 *                 type: number
 *                 example: 75000
 *               date:
 *                 type: string
 *                 example: "2026-03-31"
 *               metadata:
 *                 type: object
 *                 description: Optional metadata about the expense
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/expenses', async (req, res) => {
  try {
    const result = await financeService.createExpense(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating expense',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/expenses:
 *   get:
 *     summary: Get all expense entries
 *     tags:
 *       - Gateway Finance Expense
 *     responses:
 *       200:
 *         description: List of all expenses
 *       500:
 *         description: Server error
 */
router.get('/expenses', async (req, res) => {
  try {
    const result = await financeService.getAllExpenses();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/expenses/total:
 *   get:
 *     summary: Get total expenses with optional filters
 *     tags:
 *       - Gateway Finance Expense
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by expense type
 *     responses:
 *       200:
 *         description: Total expenses with filters applied
 *       500:
 *         description: Server error
 */
router.get('/expenses/total', async (req, res) => {
  try {
    const result = await financeService.getTotalExpenses(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching total expenses',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/expenses/{id}:
 *   get:
 *     summary: Get expense by ID
 *     tags:
 *       - Gateway Finance Expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense details
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.get('/expenses/:id', async (req, res) => {
  try {
    const result = await financeService.getExpenseById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expense',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/expenses/{id}:
 *   put:
 *     summary: Update expense by ID
 *     tags:
 *       - Gateway Finance Expense
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
router.put('/expenses/:id', async (req, res) => {
  try {
    const result = await financeService.updateExpense(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating expense',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /gateway/finance/expenses/{id}:
 *   delete:
 *     summary: Delete expense by ID
 *     tags:
 *       - Gateway Finance Expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.delete('/expenses/:id', async (req, res) => {
  try {
    const result = await financeService.deleteExpense(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting expense',
      error: error.message,
    });
  }
});

/**
 * ============= SUMMARY ENDPOINTS =============
 */

/**
 * @swagger
 * /gateway/finance/summary:
 *   get:
 *     summary: Get finance summary (total revenue vs expenses)
 *     tags:
 *       - Gateway Finance Summary
 *     responses:
 *       200:
 *         description: Finance summary with revenue and expense totals
 *       500:
 *         description: Server error
 */
router.get('/summary', async (req, res) => {
  try {
    const result = await financeService.getSummary();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching summary',
      error: error.message,
    });
  }
});

module.exports = router;
