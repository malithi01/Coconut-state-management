const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Gateway welcome endpoint
 *     tags:
 *       - Gateway
 *     responses:
 *       200:
 *         description: Welcome message with available services
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Coconut Trading & Supply Management System API Gateway',
    version: '1.0.0',
    services: {
      inventory: '/gateway/inventory',
      orders: '/gateway/orders',
      supplier: '/gateway/supplier',
      finance: '/gateway/finance',
    },
    documentation: '/api-docs',
    health: '/health',
    status: '/status',
  });
});

module.exports = router;
