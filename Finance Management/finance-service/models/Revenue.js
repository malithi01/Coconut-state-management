const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      description: 'Additional metadata about the revenue (customer details, product info, etc.)'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Revenue', revenueSchema);
