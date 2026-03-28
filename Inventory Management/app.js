require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

// Import configuration and routes
const connectDB = require('./config/database');
const swaggerSpec = require('./config/swagger');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory Management Service is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api', inventoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  });
});

// Start server
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`============================================`);
  console.log(`Inventory Management Service`);
  console.log(`Server running on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`============================================`);
  console.log(`Swagger UI available at: http://localhost:${PORT}/api-docs`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`============================================`);
});

module.exports = app;
