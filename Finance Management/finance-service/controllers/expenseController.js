const Expense = require('../models/Expense');

// Add expense
exports.addExpense = async (req, res) => {
  try {
    const { type, amount, date } = req.body;

    if (!type || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide type, amount, and date',
      });
    }

    const expense = new Expense({
      type,
      amount,
      date,
    });

    await expense.save();

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding expense',
      error: error.message,
    });
  }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.status(200).json({
      success: true,
      message: 'All expenses fetched successfully',
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses',
      error: error.message,
    });
  }
};

// Get total expenses
exports.getTotalExpenses = async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;
    let matchStage = {};

    // Filter by date range if provided
    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = startDate;
      if (endDate) matchStage.date.$lte = endDate;
    }

    // Filter by type if provided
    if (type) {
      matchStage.type = type;
    }

    // Use aggregation pipeline for better performance
    const result = await Expense.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const data = result.length > 0 ? result[0] : { totalExpenses: 0, count: 0, _id: null };

    res.status(200).json({
      success: true,
      message: 'Total expenses fetched successfully',
      data: {
        totalExpenses: data.totalExpenses,
        count: data.count,
        filters: {
          startDate: startDate || 'none',
          endDate: endDate || 'none',
          type: type || 'all',
        },
      },
    });
  } catch (error) {
    console.error('Error in getTotalExpenses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching total expenses',
      error: error.message,
    });
  }
};

// Get summary (total revenue, total expense, profit)
exports.getSummary = async (req, res) => {
  try {
    const Revenue = require('../models/Revenue');

    const revenues = await Revenue.find();
    const expenses = await Expense.find();

    const totalRevenue = revenues.reduce((sum, rev) => sum + rev.amount, 0);
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const profit = totalRevenue - totalExpense;

    res.status(200).json({
      success: true,
      message: 'Financial summary fetched successfully',
      data: {
        totalRevenue,
        totalExpense,
        profit,
        revenueCount: revenues.length,
        expenseCount: expenses.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching summary',
      error: error.message,
    });
  }
};
