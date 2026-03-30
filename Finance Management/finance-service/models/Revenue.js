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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Revenue', revenueSchema);
