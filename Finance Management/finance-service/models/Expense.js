const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    type: {
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
      description: 'Additional metadata about the expense (supplier details, product info, etc.)'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
