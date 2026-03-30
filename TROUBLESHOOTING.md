# Troubleshooting Guide - Supplier-Inventory Integration

## Issue: Error creating supplier (500 error)

### Root Causes & Solutions

#### 1. **Supplier Service Not Running** (Most Common)
The 500 error occurs because the API Gateway cannot connect to the Supplier Service.

**Check if services are running:**
```bash
# Check what's listening on port 8083 (Supplier Service)
netstat -ano | findstr :8083

# If nothing shows, start the service
```

**Solution:**
```bash
cd "c:\Users\malit\Documents\Malithi\SLIIT\Year 4 Semester 2\MTIT\Assignment 2\Project MTIT\Coconut-state-management\Supplier Management Service"
npm install
npm start
```

---

#### 2. **Missing axios Dependency**
The Supplier Service needs axios to communicate with Inventory Service.

**Solution:**
```bash
cd "Supplier Management Service"
npm install axios
npm start
```

---

#### 3. **Inventory Service Not Running**
Even if Supplier Service runs, if Inventory Service (port 8082) isn't running, product receiving will fail.

**Solution:**
```bash
cd "Inventory Management"
npm install
npm start
```

---

#### 4. **MongoDB Connection Issue**

If MongoDB isn't running, the services can't connect to the database.

**Solution:**
```bash
# Make sure MongoDB is running
mongod

# Or if using Docker:
docker run -d -p 27017:27017 --name mongodb mongo
```

---

## Complete Setup - Step by Step

### Step 1: Install Dependencies for All Services

```bash
# Terminal 1 - Install Inventory Management
cd "Inventory Management"
npm install
echo "✓ Inventory Management dependencies installed"

# Terminal 2 - Install Supplier Management
cd "Supplier Management Service"
npm install
echo "✓ Supplier Management dependencies installed"

# Terminal 3 - Install API Gateway
cd "API Gateway"
npm install
echo "✓ API Gateway dependencies installed"
```

### Step 2: Start Services in Order

```bash
# Terminal 1 - Start Inventory Service (Port 8082)
cd "Inventory Management"
npm start

# Terminal 2 - Start Supplier Service (Port 8083)
cd "Supplier Management Service"
npm start

# Terminal 3 - Start API Gateway (Port 3000)
cd "API Gateway"
npm start
```

### Step 3: Verify Services Are Running

Open another terminal and run these checks:

```bash
# Check Gateway
curl http://localhost:3000/health

# Check Supplier Service directly
curl http://localhost:8083/

# Check Inventory Service
curl http://localhost:8082/api/inventory

# Check Gateway Status (shows all services)
curl http://localhost:3000/status
```

Expected output for `/status`:
```json
{
  "success": true,
  "gateway": "UP",
  "services": {
    "inventory": "UP",
    "order": "UP",
    "supplier": "UP"
  }
}
```

---

## Testing the Integration

### Step 1: Create a Supplier

```bash
curl -X POST http://localhost:3000/gateway/supplier \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Green Harvest Pvt Ltd",
    "contactNumber": "+94771234567",
    "location": "Kurunegala"
  }'
```

**Expected Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Green Harvest Pvt Ltd",
  "contactNumber": "+94771234567",
  "location": "Kurunegala",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

**Save the `_id` from the response.**

### Step 2: Receive Products (Integration Test)

```bash
curl -X POST http://localhost:3000/gateway/supplier/507f1f77bcf86cd799439011/receive-products \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Coconut",
    "quantity": 500,
    "warehouseLocation": "Warehouse A - Room 1"
  }'
```

**Expected Response (201):**
```json
{
  "message": "Products received successfully and inventory updated",
  "supplier": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Green Harvest Pvt Ltd"
  },
  "inventoryData": {
    "success": true,
    "message": "Inventory item added successfully",
    "data": {
      "_id": "60d5ec49c1234567890ab123",
      "productName": "Coconut",
      "quantity": 500,
      "warehouseLocation": "Warehouse A - Room 1",
      "supplierId": "507f1f77bcf86cd799439011"
    }
  }
}
```

### Step 3: Verify Inventory Was Updated

```bash
curl http://localhost:3000/gateway/inventory
```

You should see the newly added inventory item in the response.

---

## Debugging Commands

### View Full Error Messages
```bash
# Check if axios is installed
cd "Supplier Management Service"
npm ls axios
```

### Reinstall Dependencies
```bash
cd "Supplier Management Service"
rm -r node_modules package-lock.json
npm install
```

### Test Supplier Service Directly
```bash
# Create supplier on Supplier Service (bypass gateway)
curl -X POST http://localhost:8083/supplier \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Supplier",
    "contactNumber": "1234567890",
    "location": "Test Location"
  }'
```

### Check Environment Variables
Create/verify `.env` files exist:

**Supplier Management Service/.env:**
```
PORT=8083
MONGODB_URI=mongodb://localhost:27017/suppliers
INVENTORY_SERVICE_URL=http://localhost:8082/api
```

**Inventory Management/.env:**
```
PORT=8082
MONGODB_URI=mongodb://localhost:27017/inventory
```

**API Gateway/.env:**
```
PORT=3000
INVENTORY_SERVICE_URL=http://localhost:8082/api
SUPPLIER_SERVICE_URL=http://localhost:8083
ORDER_SERVICE_URL=http://localhost:3002
GATEWAY_URL=http://localhost:3000
```

---

## Service Port Reference

| Service | Default Port | URL |
|---------|--------------|-----|
| Inventory Management | 8082 | http://localhost:8082 |
| Supplier Management | 8083 | http://localhost:8083 |
| Order Management | 3002 | http://localhost:3002 |
| API Gateway | 3000 | http://localhost:3000 |

---

## Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Error creating supplier: No response from server` | Supplier Service not running | Start Supplier Service on port 8083 |
| `Connection refused` | Service not listening on port | Check if service started successfully |
| `ECONNREFUSED 127.0.0.1:27017` | MongoDB not running | Start MongoDB |
| `Cannot find module 'axios'` | axios not installed | Run `npm install axios` |
| `Inventory service error:` | Inventory Service not responding | Start Inventory Service on port 8082 |

---

## Quick Restart All Services

Create a batch script to restart all services:

**restart-services.bat** (Windows):
```batch
@echo off
start cmd /k "cd Inventory Management && npm start"
start cmd /k "cd Supplier Management Service && npm start"
start cmd /k "cd API Gateway && npm start"
echo All services started
```

Run with: `restart-services.bat`
