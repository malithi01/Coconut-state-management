const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Service API',
      description: 'Order Service microservice API for the Coconut Trading & Supply Management System. This service handles selling coconut related products and managing customer orders.',
      version: '1.0.0',
      contact: {
        name: 'Support',
        email: 'support@coconutproduction.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development Server',
      },
    ],
    components: {
      schemas: {
        Order: {
          type: 'object',
          required: ['customerName', 'productName', 'quantity', 'price'],
          properties: {
            _id: {
              type: 'string',
              description: 'The unique identifier for the order',
              example: '60d5ec49c1234567890abcdef',
            },
            customerName: {
              type: 'string',
              description: 'Name of the customer',
              example: 'John Doe',
              maxLength: 100,
            },
            productName: {
              type: 'string',
              description: 'Name of the coconut product',
              example: 'Coconut Oil',
              maxLength: 100,
            },
            quantity: {
              type: 'number',
              description: 'Quantity ordered',
              example: 5,
              minimum: 1,
            },
            price: {
              type: 'number',
              description: 'Price per unit',
              example: 1200.50,
              minimum: 0,
            },
            orderDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the order was created',
              example: '2026-03-28T10:30:00Z',
            },
            status: {
              type: 'string',
              enum: ['Pending', 'Completed', 'Cancelled'],
              description: 'Status of the order',
              example: 'Pending',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the order was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the order was last updated',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation successful',
            },
            data: {
              $ref: '#/components/schemas/Order',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
