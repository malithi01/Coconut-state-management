const mongoose = require('mongoose');

const productCountSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      enum: ['Coconut', 'King Coconut', 'Young Coconut'],
      unique: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Total quantity cannot be negative'],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProductCount', productCountSchema);
