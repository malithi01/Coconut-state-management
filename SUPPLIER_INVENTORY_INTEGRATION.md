# Supplier Management & Inventory Management Integration Guide

## Overview
This document describes the integration between the Supplier Management Service and the Inventory Management Service through the API Gateway. The integration enables automatic inventory updates when products are received from suppliers.

## Architecture

```
Supplier Management Service (Port 8083)
            |
            | (Supply Chain Flow)
            v
API Gateway (Port 3000)
            |
            v
Inventory Management Service (Port 8082)
```

## Integration Flow

### 1. Product Receiving Process

When a supplier sends products, the flow is as follows:

1. **API Request to Gateway**: Client sends a POST request to the API Gateway
2. **Gateway Routes to Supplier Service**: Gateway forwards to Supplier Service
3. **Supplier Service Validates**: Supplier Service validates supplier exists
4. **Inventory Update**: Supplier Service calls Inventory Service to register received products
5. **Response**: Confirmation is sent back to client

## API Endpoints

### Supplier Management Service Endpoints

#### 1. Create Supplier (Existing - Unchanged)
```
POST /supplier
```
Request Body:
```json
{
  "name": "Green Harvest Pvt Ltd",
  "contactNumber": "+94771234567",
  "location": "Kurunegala",
  "products": [
    {
      "productName": "Coconut",
      "price": 150.00,
      "quantity": 100,
      "receivedDate": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### 2. Get All Suppliers (Existing - Unchanged)
```
GET /supplier
```

#### 3. Get Supplier by ID (Existing - Unchanged)
```
GET /supplier/{id}
```

#### 4. Update Supplier (Existing - Unchanged)
```
PUT /supplier/{id}
```

#### 5. Delete Supplier (Existing - Unchanged)
```
DELETE /supplier/{id}
```

#### 6. **NEW** - Receive Products from Supplier (Integration Endpoint)
```
POST /supplier/{supplierId}/receive-products
```

Request Body:
```json
{
  "productName": "Coconut",
  "quantity": 500,
  "warehouseLocation": "Warehouse A - Room 1"
}
```

Response (201 Created):
```json
{
  "message": "Products received successfully and inventory updated",
  "supplier": {
    "_id": "66bc42fd0d1df2f6f4f8a173",
    "name": "Green Harvest Pvt Ltd",
    "contactNumber": "+94771234567",
    "location": "Kurunegala"
  },
  "inventoryData": {
    "success": true,
    "message": "Inventory item added successfully",
    "data": {
      "_id": "507f1f77bcf86cd799439011",
      "productName": "Coconut",
      "quantity": 500,
      "warehouseLocation": "Warehouse A - Room 1",
      "supplierId": "66bc42fd0d1df2f6f4f8a173",
      "dateAdded": "2024-01-15T10:00:00Z",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### API Gateway Endpoints (Supplier Routes)

#### 1. Create Supplier
```
POST /gateway/supplier
```

#### 2. Get All Suppliers
```
GET /gateway/supplier
```

#### 3. Get Supplier by ID
```
GET /gateway/supplier/{id}
```

#### 4. Update Supplier
```
PUT /gateway/supplier/{id}
```

#### 5. Delete Supplier
```
DELETE /gateway/supplier/{id}
```

#### 6. **NEW** - Receive Products from Supplier (Route Through Gateway)
```
POST /gateway/supplier/{id}/receive-products
```

## Service Architecture

### Supplier Management Service Files

#### New Files Created:
- `services/inventoryIntegrationService.js` - Handles communication with Inventory Service
  - `addInventoryFromSupplier()` - Adds inventory when products are received
  - `getInventoryBySupplier()` - Retrieves inventory by supplier ID
  - `updateInventoryQuantity()` - Updates product quantities

#### Modified Files:
- `controllers/supplierController.js` - Added `receiveProducts()` method
- `routes/supplierRoutes.js` - Added `/supplier/:id/receive-products` endpoint

### API Gateway Files

#### New Files Created:
- `routes/supplierRoutes.js` - Routes for supplier management endpoints
- `services/supplierService.js` - Service layer for Supplier API communication

#### Modified Files:
- `config/serviceURLs.js` - Added Supplier service URL configuration
- `server.js` - Added supplier routes and service status check

## Configuration

### Environment Variables

The integration uses the following environment variables:

#### API Gateway `.env`:
```
INVENTORY_SERVICE_URL=http://localhost:8082/api
SUPPLIER_SERVICE_URL=http://localhost:8083
ORDER_SERVICE_URL=http://localhost:3002
GATEWAY_URL=http://localhost:3000
```

#### Supplier Management Service `.env`:
```
INVENTORY_SERVICE_URL=http://localhost:8082/api
PORT=8083
MONGODB_URI=mongodb://localhost:27017/suppliers
```

#### Inventory Management Service `.env`:
```
MONGODB_URI=mongodb://localhost:27017/inventory
PORT=8082
```

## Testing the Integration

### Step 1: Start All Services

```bash
# Terminal 1 - Inventory Management Service
cd "Inventory Management"
npm install
npm start

# Terminal 2 - Supplier Management Service
cd "Supplier Management Service"
npm install
npm start

# Terminal 3 - API Gateway
cd "API Gateway"
npm install
npm start
```

### Step 2: Create a Supplier

Using Postman or curl:

```bash
curl -X POST http://localhost:3000/gateway/supplier \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Green Harvest Pvt Ltd",
    "contactNumber": "+94771234567",
    "location": "Kurunegala",
    "products": [
      {
        "productName": "Coconut",
        "price": 150.00,
        "quantity": 100,
        "receivedDate": "2024-01-15T10:00:00Z"
      }
    ]
  }'
```

Response:
```json
{
  "name": "Green Harvest Pvt Ltd",
  "_id": "66bc42fd0d1df2f6f4f8a173",
  "contactNumber": "+94771234567",
  "location": "Kurunegala",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

Save the `_id` for the next step.

### Step 3: Receive Products from Supplier (Integration Test)

```bash
curl -X POST http://localhost:3000/gateway/supplier/66bc42fd0d1df2f6f4f8a173/receive-products \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Coconut",
    "quantity": 500,
    "warehouseLocation": "Warehouse A - Room 1"
  }'
```

Response:
```json
{
  "message": "Products received successfully and inventory updated",
  "supplier": {
    "_id": "66bc42fd0d1df2f6f4f8a173",
    "name": "Green Harvest Pvt Ltd",
    "contactNumber": "+94771234567",
    "location": "Kurunegala"
  },
  "inventoryData": {
    "success": true,
    "message": "Inventory item added successfully",
    "data": {
      "_id": "507f1f77bcf86cd799439011",
      "productName": "Coconut",
      "quantity": 500,
      "warehouseLocation": "Warehouse A - Room 1",
      "supplierId": "66bc42fd0d1df2f6f4f8a173",
      "dateAdded": "2024-01-15T10:00:00Z"
    }
  }
}
```

### Step 4: Verify Inventory Was Updated

```bash
curl -X GET http://localhost:3000/gateway/inventory
```

You should see the inventory item with the supplier's product added.

## Existing APIs Preservation

All existing APIs remain unchanged and functional:

### Inventory Management Service (Unchanged)
- `POST /api/inventory` - Add inventory
- `GET /api/inventory` - Get all inventory
- `GET /api/inventory/:id` - Get inventory by ID
- `GET /api/inventory/product-count` - Get product count summary
- `PUT /api/inventory/:id` - Update inventory
- `DELETE /api/inventory/:id` - Delete inventory

### Supplier Management Service (Unchanged)
- `POST /supplier` - Create supplier
- `GET /supplier` - Get all suppliers
- `GET /supplier/:id` - Get supplier by ID
- `PUT /supplier/:id` - Update supplier
- `DELETE /supplier/:id` - Delete supplier

### API Gateway (Unchanged)
- `GET /` - Gateway welcome
- `GET /health` - Health check
- `GET /status` - Service status
- `GET /gateway/inventory` - All existing inventory routes
- `GET /gateway/orders` - All ordering routes
- **NEW**: `/gateway/supplier` - Supplier routes with integration endpoint

## Error Handling

The integration includes comprehensive error handling:

1. **Supplier Not Found**: Returns 404 when supplier doesn't exist
2. **Validation Errors**: Returns 400 for missing required fields
3. **Inventory Service Errors**: Returns 500 with error details if inventory service fails
4. **Service Connection Errors**: Returns 500 if connecting to microservices fails

## Benefits of This Integration

1. **Automated Inventory Management**: Products received from suppliers automatically update inventory
2. **Real-time Updates**: Inventory reflects supplier shipments in real-time
3. **Supplier Tracking**: Inventory items are linked to supplier IDs for traceability
4. **Microservice Communication**: Clean separation of concerns with defined integration points
5. **API Gateway Pattern**: All external requests go through the gateway for centralized management
6. **Backward Compatibility**: All existing APIs remain unchanged and fully functional

## Future Enhancements

Potential improvements to the integration:

1. Add authentication/authorization to integration endpoints
2. Implement batch product receiving (multiple products in one request)
3. Add inventory notifications/alerts for stock levels
4. Implement audit logging for all supplier-inventory transactions
5. Add product warranty tracking for received items
6. Implement automatic reorder point triggers based on supplier data
