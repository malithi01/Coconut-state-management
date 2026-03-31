const Supplier = require("../models/Supplier");
const inventoryIntegrationService = require("../services/inventoryIntegrationService");
const financeIntegrationService = require("../services/financeIntegrationService");

const createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: supplier,
      id: supplier._id,
      _id: supplier._id
    });
  } catch (error) {
    console.error("Error creating supplier:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).json({
      success: true,
      message: `Found ${suppliers.length} suppliers`,
      count: suppliers.length,
      data: suppliers
    });
  } catch (error) {
    console.error("Error fetching suppliers:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Supplier ID is required"
      });
    }

    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
        id: id
      });
    }

    return res.status(200).json({
      success: true,
      data: supplier
    });
  } catch (error) {
    console.error("Error fetching supplier:", error.message);
    return res.status(400).json({
      success: false,
      message: `Invalid supplier ID: ${error.message}`
    });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    Object.assign(supplier, req.body);
    await supplier.save();

    const updatedSupplier = await Supplier.findById(req.params.id);

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({
      message: "Supplier updated successfully",
      supplier: updatedSupplier
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await Supplier.deleteOne({ _id: req.params.id });

    const deletedSupplier = supplier.toObject();

    if (!deletedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({
      message: "Supplier deleted successfully",
      deletedSupplier
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * Receive products from supplier and update inventory
 */
const receiveProducts = async (req, res) => {
  try {
    const { id: supplierId } = req.params;  // Get 'id' from route params and rename to supplierId
    const { productName, quantity, warehouseLocation, price } = req.body;

    // Validate required fields
    if (!productName || quantity === undefined || !warehouseLocation || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: productName, quantity, warehouseLocation, price"
      });
    }

    if (!supplierId) {
      return res.status(400).json({
        success: false,
        message: "Supplier ID is required"
      });
    }

    // Check if supplier exists
    let supplier;
    try {
      supplier = await Supplier.findById(supplierId);
    } catch (err) {
      // MongoDB validation error - invalid ObjectId format
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
        supplierId: supplierId,
        error: err.message
      });
    }

    if (!supplier) {
      // Try to provide helpful feedback
      const allSuppliers = await Supplier.find({}, { _id: 1, name: 1 });
      return res.status(404).json({
        success: false,
        message: "Supplier not found with the provided ID",
        supplierId: supplierId,
        availableSuppliers: allSuppliers.map(s => ({ id: s._id, name: s.name }))
      });
    }

    // Prepare inventory data
    const inventoryData = {
      productName,
      quantity,
      warehouseLocation,
      supplierId: supplierId,
      dateAdded: new Date()
    };

    // Add inventory through inventory service
    const inventoryResult = await inventoryIntegrationService.addInventoryFromSupplier(inventoryData);

    // Create expense in Finance Service
    const expenseData = {
      supplierId: supplierId,
      supplierName: supplier.name,
      productName,
      quantity,
      price,
      warehouseLocation
    };
    const financeResult = await financeIntegrationService.createSupplierExpense(expenseData);

    return res.status(201).json({
      success: true,
      message: "Products received successfully and inventory updated",
      supplier: {
        id: supplier._id,
        name: supplier.name,
        location: supplier.location
      },
      inventoryData: inventoryResult,
      financeData: financeResult,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error receiving products:", error.message);
    console.error("Stack:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Error receiving products",
      error: error.message
    });
  }
};

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  receiveProducts
};
