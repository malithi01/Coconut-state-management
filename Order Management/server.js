require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Connect to MongoDB (non-blocking)
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  console.log('Server will continue running. Database operations will fail until MongoDB is available.');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/orders', orderRoutes);

// Swagger UI Documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, { explorer: true }));

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Order Service Microservice',
    version: '1.0.0',
    documentation: 'http://localhost:3002/api-docs',
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Order Service',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;
