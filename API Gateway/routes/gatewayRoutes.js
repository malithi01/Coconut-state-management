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
    message: 'Welcome to Coconut State Management API Gateway',
    version: '1.0.0',
    services: {
      inventory: '/gateway/inventory',
      orders: '/gateway/orders',
    },
    documentation: '/api-docs',
    health: '/health',
  });
});

module.exports = router;
