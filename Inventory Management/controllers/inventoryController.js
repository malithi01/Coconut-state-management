const Inventory = require('../models/Inventory');

// Add new inventory item (POST)
exports.addInventory = async (req, res) => {
  try {
    const { productName, quantity, warehouseLocation, supplierId, dateAdded } = req.body;

    // Validate required fields
    if (!productName || quantity === undefined || !warehouseLocation || !supplierId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: productName, quantity, warehouseLocation, supplierId',
      });
    }

    const inventory = new Inventory({
      productName,
      quantity,
      warehouseLocation,
      supplierId,
      dateAdded: dateAdded || new Date(),
    });

    const savedInventory = await inventory.save();

    res.status(201).json({
      success: true,
      message: 'Inventory item added successfully',
      data: savedInventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding inventory item',
      error: error.message,
    });
  }
};

// Get all inventory items (GET)
exports.getAllInventory = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();

    res.status(200).json({
      success: true,
      message: 'All inventory items retrieved successfully',
      count: inventoryItems.length,
      data: inventoryItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving inventory items',
      error: error.message,
    });
  }
};

// Get inventory item by ID (GET)
exports.getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const inventoryItem = await Inventory.findById(id);

    if (!inventoryItem) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inventory item retrieved successfully',
      data: inventoryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving inventory item',
      error: error.message,
    });
  }
};

// Update inventory item by ID (PUT)
exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, quantity, warehouseLocation, supplierId, dateAdded } = req.body;

    const updateData = {
      ...(productName && { productName }),
      ...(quantity !== undefined && { quantity }),
      ...(warehouseLocation && { warehouseLocation }),
      ...(supplierId && { supplierId }),
      ...(dateAdded && { dateAdded }),
    };

    const updatedInventory = await Inventory.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedInventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inventory item updated successfully',
      data: updatedInventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating inventory item',
      error: error.message,
    });
  }
};

// Delete inventory item by ID (DELETE)
exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInventory = await Inventory.findByIdAndDelete(id);

    if (!deletedInventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inventory item deleted successfully',
      data: deletedInventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting inventory item',
      error: error.message,
    });
  }
};
