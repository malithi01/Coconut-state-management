const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coconut-order-db';
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB Connected Successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
