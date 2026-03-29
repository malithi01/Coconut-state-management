// Service URLs configuration
module.exports = {
  inventory: {
    baseURL: process.env.INVENTORY_SERVICE_URL || 'http://localhost:8082/api',
    timeout: 5000,
  },
  order: {
    baseURL: process.env.ORDER_SERVICE_URL || 'http://localhost:3002',
    timeout: 5000,
  },
};
