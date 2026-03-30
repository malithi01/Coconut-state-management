const Revenue = require('../models/Revenue');

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

// Get total revenue
exports.getTotalRevenue = async (req, res) => {
  try {
    const { startDate, endDate, orderId } = req.query;
    let matchStage = {};

    // Filter by date range if provided
    if (startDate || endDate) {
      matchStage.date = {};
      if (startDate) matchStage.date.$gte = startDate;
      if (endDate) matchStage.date.$lte = endDate;
    }

    // Filter by orderId if provided
    if (orderId) {
      matchStage.orderId = orderId;
    }

    // Use aggregation pipeline for better performance
    const result = await Revenue.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const data = result.length > 0 ? result[0] : { totalRevenue: 0, count: 0, _id: null };

    res.status(200).json({
      success: true,
      message: 'Total revenue fetched successfully',
      data: {
        totalRevenue: data.totalRevenue,
        count: data.count,
        filters: {
          startDate: startDate || 'none',
          endDate: endDate || 'none',
          orderId: orderId || 'all',
        },
      },
    });
  } catch (error) {
    console.error('Error in getTotalRevenue:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching total revenue',
      error: error.message,
    });
  }
};
