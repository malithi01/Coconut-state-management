const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management Service API',
      version: '1.0.0',
      description: 'Inventory Management Service for Coconut Trading & Supply Management System',
      contact: {
        name: 'Malithi',
        email: 'support@inventory-service.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8082/api',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Inventory: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the inventory item',
            },
            productName: {
              type: 'string',
              enum: ['Coconut', 'King Coconut', 'Young Coconut'],
              description: 'Name of the coconut product',
            },
            quantity: {
              type: 'number',
              description: 'Quantity of items in stock',
            },
            warehouseLocation: {
              type: 'string',
              description: 'Physical location of the inventory in the warehouse',
            },
            supplierId: {
              type: 'string',
              description: 'ID of the supplier',
            },
            dateAdded: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the item was added to inventory',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the record was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the record was last updated',
            },
          },
          required: [
            'productName',
            'quantity',
            'warehouseLocation',
            'supplierId',
          ],
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
