const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      enum: ['Coconut', 'King Coconut', 'Young Coconut'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    warehouseLocation: {
      type: String,
      required: [true, 'Warehouse location is required'],
      trim: true,
    },
    supplierId: {
      type: String,
      required: [true, 'Supplier ID is required'],
      trim: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Inventory', inventorySchema);
