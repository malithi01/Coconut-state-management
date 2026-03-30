require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const gatewayRoutes = require('./routes/gatewayRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const financeRoutes = require('./routes/financeRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Gateway is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Gateway Status endpoint
app.get('/status', async (req, res) => {
  try {
    const axios = require('axios');
    const serviceURLs = require('./config/serviceURLs');

    // Check inventory service
    let inventoryStatus = 'DOWN';
    try {
      await axios.get(`${serviceURLs.inventory.baseURL.replace('/api', '')}/health`, {
        timeout: 2000,
      });
      inventoryStatus = 'UP';
    } catch (err) {
      inventoryStatus = 'DOWN';
    }

    // Check order service
    let orderStatus = 'DOWN';
    try {
      await axios.get(`${serviceURLs.order.baseURL}/health`, {
        timeout: 2000,
      });
      orderStatus = 'UP';
    } catch (err) {
      orderStatus = 'DOWN';
    }

    // Check supplier service
    let supplierStatus = 'DOWN';
    try {
      await axios.get(`${serviceURLs.supplier.baseURL}/`, {
        timeout: 2000,
      });
      supplierStatus = 'UP';
    } catch (err) {
      supplierStatus = 'DOWN';
    }

    // Check finance service
    let financeStatus = 'DOWN';
    try {
      await axios.get(`${serviceURLs.finance.baseURL.replace('/finance', '')}/health`, {
        timeout: 2000,
      });
      financeStatus = 'UP';
    } catch (err) {
      financeStatus = 'DOWN';
    }

    res.status(200).json({
      success: true,
      gateway: 'UP',
      services: {
        inventory: inventoryStatus,
        order: orderStatus,
        supplier: supplierStatus,
        finance: financeStatus,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// API Gateway Routes
app.use('/', gatewayRoutes);
app.use('/gateway/inventory', inventoryRoutes);
app.use('/gateway/orders', orderRoutes);
app.use('/gateway/supplier', supplierRoutes);
app.use('/gateway/finance', financeRoutes);

// Swagger Documentation
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coconut State Management API Gateway',
      version: '1.0.0',
      description: 'API Gateway connecting Inventory Management and Order Management microservices',
    },
    servers: [
      {
        url: process.env.GATEWAY_URL || 'http://localhost:3000',
        description: 'Development Server',
      },
    ],
    components: {
      schemas: {
        Order: {
          type: 'object',
          required: ['customerName', 'productName', 'quantity', 'price'],
          properties: {
            customerName: { type: 'string' },
            productName: {
              type: 'string',
              enum: ['Coconut', 'King Coconut', 'Young Coconut'],
            },
            quantity: { type: 'number' },
            price: { type: 'number' },
            status: {
              type: 'string',
              enum: ['Pending', 'Completed', 'Cancelled'],
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, { explorer: true }));

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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n============================================`);
  console.log(`Coconut State Management API Gateway`);
  console.log(`============================================`);
  console.log(`Server running on port: ${PORT}`);
  console.log(`🌐 Gateway URL: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
  console.log(`📊 Service Status: http://localhost:${PORT}/status`);
  console.log(`============================================\n`);
  console.log(`Connected Microservices:`);
  console.log(`✓ Inventory Service: ${process.env.INVENTORY_SERVICE_URL || 'http://localhost:8082/api'}`);
  console.log(`✓ Order Service: ${process.env.ORDER_SERVICE_URL || 'http://localhost:3002'}`);
  console.log(`============================================\n`);
});

module.exports = app;
