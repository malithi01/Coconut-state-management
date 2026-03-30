const Revenue = require('../models/Revenue');
const Expense = require('../models/Expense');

// ============= REVENUE CRUD =============

// Add revenue
exports.addRevenue = async (req, res) => {
  try {
    const { orderId, amount, date } = req.body;

    if (!orderId || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide orderId, amount, and date',
      });
    }

    const revenue = new Revenue({
      orderId,
      amount,
      date,
    });

    await revenue.save();

    res.status(201).json({
      success: true,
      message: 'Revenue added successfully',
      data: revenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding revenue',
      error: error.message,
    });
  }
};

// Get all revenue
exports.getAllRevenue = async (req, res) => {
  try {
    const revenues = await Revenue.find();

    res.status(200).json({
      success: true,
      message: 'All revenues fetched successfully',
      data: revenues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching revenues',
      error: error.message,
    });
  }
};

// Get revenue by ID
exports.getRevenueById = async (req, res) => {
  try {
    const { id } = req.params;

    const revenue = await Revenue.findById(id);

    if (!revenue) {
      return res.status(404).json({
        success: false,
        message: 'Revenue not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Revenue fetched successfully',
      data: revenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching revenue',
      error: error.message,
    });
  }
};

// Update revenue
exports.updateRevenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, amount, date } = req.body;

    if (!orderId && !amount && !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one field to update (orderId, amount, or date)',
      });
    }

    const updateData = {};
    if (orderId) updateData.orderId = orderId;
    if (amount) updateData.amount = amount;
    if (date) updateData.date = date;

    const revenue = await Revenue.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!revenue) {
      return res.status(404).json({
        success: false,
        message: 'Revenue not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Revenue updated successfully',
      data: revenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating revenue',
      error: error.message,
    });
  }
};

// Delete revenue
exports.deleteRevenue = async (req, res) => {
  try {
    const { id } = req.params;

    const revenue = await Revenue.findByIdAndDelete(id);

    if (!revenue) {
      return res.status(404).json({
        success: false,
        message: 'Revenue not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Revenue deleted successfully',
      data: revenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting revenue',
      error: error.message,
    });
  }
};

// ============= EXPENSE CRUD =============

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

// Get expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense fetched successfully',
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expense',
      error: error.message,
    });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, date } = req.body;

    if (!type && !amount && !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one field to update (type, amount, or date)',
      });
    }

    const updateData = {};
    if (type) updateData.type = type;
    if (amount) updateData.amount = amount;
    if (date) updateData.date = date;

    const expense = await Expense.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating expense',
      error: error.message,
    });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting expense',
      error: error.message,
    });
  }
};

// Get financial summary
exports.getSummary = async (req, res) => {
  try {
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
