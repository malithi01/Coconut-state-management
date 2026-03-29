# API Gateway - Coconut State Management

The **API Gateway** is the central entry point for the Coconut State Management microservices ecosystem. It orchestrates communication between the **Inventory Management** and **Order Management** microservices, enabling seamless inventory updates when orders are placed.

## 🎯 Features

- **Unified API Interface**: Single entry point for accessing both Inventory and Order Management services
- **Automatic Inventory Sync**: When an order is created, inventory quantities are automatically decreased
- **Service Discovery**: Check the status of all connected microservices
- **Request Routing**: Intelligent routing to appropriate microservices
- **Error Handling**: Comprehensive error handling and validation
- **API Documentation**: Swagger UI for interactive API exploration
- **Health Checks**: Monitor gateway and service health

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm
- Inventory Management Service running on port 8082
- Order Management Service running on port 3002

## 🚀 Installation

### 1. Install Dependencies

```bash
cd "API Gateway"
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the API Gateway directory (already provided) and update service URLs if needed:

```env
PORT=3000
NODE_ENV=development

# Microservices URLs
INVENTORY_SERVICE_URL=http://localhost:8082/api
ORDER_SERVICE_URL=http://localhost:3002

# Gateway settings
GATEWAY_URL=http://localhost:3000
```

### 3. Start the Gateway

```bash
npm start
```

The gateway will start on `http://localhost:3000`

## 📚 API Endpoints

### Inventory Management

```
GET  /gateway/inventory                    - Get all inventory items
GET  /gateway/inventory/:id                - Get inventory by ID
GET  /gateway/inventory/product-count      - Get product count summary
POST /gateway/inventory                    - Add new inventory item ⭐
PUT  /gateway/inventory/:id                - Update inventory item ⭐
DELETE /gateway/inventory/:id              - Delete inventory item ⭐
```

### Order Management

```
GET  /gateway/orders                       - Get all orders
GET  /gateway/orders?status=FILTER         - Get orders by status
GET  /gateway/orders/:id                   - Get order by ID
POST /gateway/orders                       - Create order (simple)
POST /gateway/orders/create-with-inventory - Create order with inventory sync ⭐⭐
PUT  /gateway/orders/:id                   - Update order ⭐
DELETE /gateway/orders/:id                 - Delete order ⭐
```

### Monitoring

```
GET /                                      - Gateway welcome
GET /health                                - Gateway health check
GET /status                                - All services status
GET /api-docs                              - Swagger documentation
```

**⭐ NEW:** Previously missing update and delete operations are now fully available!

---

## 📖 Comprehensive API Endpoints Reference

See [ENDPOINTS_REFERENCE.md](ENDPOINTS_REFERENCE.md) for complete endpoint details with examples.

### 🔄 Workflow: Create Order with Inventory Sync

The gateway provides a special endpoint (`/gateway/orders/create-with-inventory`) that automatically:

1. **Validates order data** - Checks required fields
2. **Checks inventory availability** - Verifies sufficient stock exists
3. **Creates the order** - Adds order to the Order Management service
4. **Updates inventory** - Decreases inventory quantities in Inventory Management service

### Request Example

```json
POST /gateway/orders/create-with-inventory
Content-Type: application/json

{
  "customerName": "John Doe",
  "productName": "Coconut",
  "quantity": 10,
  "price": 1200.50,
  "status": "Pending"
}
```

### Success Response (201)

```json
{
  "success": true,
  "message": "Order created and inventory updated successfully",
  "data": {
    "order": {
      "_id": "507f1f77bcf86cd799439011",
      "customerName": "John Doe",
      "productName": "Coconut",
      "quantity": 10,
      "price": 1200.50,
      "status": "Pending",
      "createdAt": "2024-03-29T10:30:00Z"
    },
    "inventoryUpdated": true,
    "message": "Inventory for Coconut decreased by 10 units"
  }
}
```

### Error Response (400) - Insufficient Inventory

```json
{
  "success": false,
  "message": "Insufficient inventory for product: Coconut",
  "details": {
    "requested": 100,
    "available": 50,
    "shortfall": 50
  }
}
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│         API Gateway (Port 3000)             │
├─────────────────────────────────────────────┤
│  Routes:                                    │
│  ├─ /gateway/inventory                      │
│  ├─ /gateway/orders                         │
│  └─ /gateway/orders/create-with-inventory   │
├─────────────────────────────────────────────┤
│  Services:                                  │
│  ├─ inventoryService.js                     │
│  └─ orderService.js                         │
└─────────────────────────────────────────────┘
         ↓                          ↓
    [Inventory Service]        [Order Service]
    (Port 8082)                (Port 3002)
    (MongoDB)                  (MongoDB)
```

## 📊 Service Integration Flow

```
1. Client sends order request to Gateway
   ↓
2. Gateway validates input
   ↓
3. Gateway checks Inventory Service
   ├─ If insufficient: Return error (400)
   └─ If available: Continue
   ↓
4. Gateway creates order in Order Service
   ↓
5. Gateway updates Inventory Service
   ├─ Decrease quantity
   └─ Update affected inventory records
   ↓
6. Return success response to client
```

## 🛠️ Configuration

### Service URLs Configuration

Edit `config/serviceURLs.js` to customize service endpoints:

```javascript
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
```

## 📖 Swagger Documentation

Access the interactive API documentation:

```
http://localhost:3000/api-docs
```

## ✅ Health Check

Monitor the status of all services:

```bash
# Gateway health
curl http://localhost:3000/health

# All services status
curl http://localhost:3000/status
```

Example status response:

```json
{
  "success": true,
  "gateway": "UP",
  "services": {
    "inventory": "UP",
    "order": "UP"
  },
  "timestamp": "2024-03-29T10:30:00Z"
}
```

## 🔍 Error Handling

The gateway handles various error scenarios:

- **Invalid request format** (400) - Missing required fields
- **Insufficient inventory** (400) - Not enough stock available
- **Service unavailable** (503) - Microservice is down
- **Database errors** (500) - Database connection issues
- **Internal server errors** (500) - Unexpected errors

## 📝 Example Usage

### Step 1: Add Inventory

```bash
curl -X POST http://localhost:8082/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Coconut",
    "quantity": 100,
    "warehouseLocation": "Warehouse A",
    "supplierId": "SUP001"
  }'
```

### Step 2: Create Order (with automatic inventory decrease)

```bash
curl -X POST http://localhost:3000/gateway/orders/create-with-inventory \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "productName": "Coconut",
    "quantity": 10,
    "price": 1200.50
  }'
```

### Step 3: Check Updated Inventory

```bash
curl http://localhost:3000/gateway/inventory/product-count
```

Response shows inventory decreased:

```json
{
  "success": true,
  "data": [
    {
      "productName": "Coconut",
      "totalQuantity": 90,
      "recordCount": 1
    }
  ]
}
```

## 🚨 Troubleshooting

### Gateway won't start
- Ensure all required dependencies are installed: `npm install`
- Check if port 3000 is available
- Verify `.env` file exists

### Cannot connect to Inventory Service
- Verify Inventory Service is running on port 8082
- Check `INVENTORY_SERVICE_URL` in `.env`
- Run `curl http://localhost:8082/health` to test

### Cannot connect to Order Service
- Verify Order Service is running on port 3002
- Check `ORDER_SERVICE_URL` in `.env`
- Run `curl http://localhost:3002/health` to test

### Inventory not updating after order
- Check gateway logs for error messages
- Verify both services are running
- Ensure MongoDB is accessible to both services
- Check inventory availability before placing order

## 📚 Additional Resources

- [Inventory Management Service](../Inventory%20Management/README.md)
- [Order Management Service](../Order%20Management/README.md)
- [Microservices Setup Guide](../MICROSERVICES_SETUP.md)

## 📧 Support

For issues or questions, check the logs or review the service-specific README files.

---

**Version**: 1.0.0  
**Last Updated**: 2024-03-29
