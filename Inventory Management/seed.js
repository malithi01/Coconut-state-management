require('dotenv').config();
const mongoose = require('mongoose');
const Inventory = require('./models/Inventory');

const sampleData = [
  {
    productName: 'Coconut',
    quantity: 150,
    warehouseLocation: 'Warehouse A - Shelf 1',
    supplierId: 'SUP001',
    dateAdded: new Date('2024-01-15'),
  },
  {
    productName: 'King Coconut',
    quantity: 200,
    warehouseLocation: 'Warehouse A - Shelf 2',
    supplierId: 'SUP002',
    dateAdded: new Date('2024-02-10'),
  },
  {
    productName: 'Young Coconut',
    quantity: 300,
    warehouseLocation: 'Warehouse B - Shelf 1',
    supplierId: 'SUP001',
    dateAdded: new Date('2024-03-05'),
  },
  {
    productName: 'Coconut',
    quantity: 120,
    warehouseLocation: 'Warehouse B - Shelf 2',
    supplierId: 'SUP003',
    dateAdded: new Date('2024-03-20'),
  },
  {
    productName: 'King Coconut',
    quantity: 180,
    warehouseLocation: 'Warehouse C - Shelf 1',
    supplierId: 'SUP002',
    dateAdded: new Date('2024-04-01'),
  },
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inventory_db';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');

    // Clear existing data
    await Inventory.deleteMany({});
    console.log('Cleared existing inventory items');

    // Insert sample data
    const insertedData = await Inventory.insertMany(sampleData);
    console.log(`✓ Successfully seeded ${insertedData.length} inventory items`);

    // Display inserted data
    console.log('\nSeeded Data:');
    insertedData.forEach((item, index) => {
      console.log(`${index + 1}. ${item.productName} - Qty: ${item.quantity} - Location: ${item.warehouseLocation}`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
