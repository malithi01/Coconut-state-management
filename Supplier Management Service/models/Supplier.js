const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      enum: ["Coconut", "King Coconut", "Young Coconut"],
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    receivedDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  { _id: false }
);

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    products: {
      type: [productSchema]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Supplier", supplierSchema);
