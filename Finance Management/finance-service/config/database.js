const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongooseOptions = {
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
