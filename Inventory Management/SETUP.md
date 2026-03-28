# Setup and Running Guide

This guide will help you set up and run the Inventory Management Service.

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on your local machine:
```bash
mongod
```

### 3. Run the Server
```bash
npm start
```

The server will start on `http://localhost:8082`

### 4. Access Swagger UI
Open your browser and navigate to:
```
http://localhost:8082/api-docs
```

---

## Detailed Setup Instructions

### Step 1: Prerequisites
Ensure you have installed:
- Node.js (v14+) - [Download](https://nodejs.org/)
- MongoDB - [Download](https://www.mongodb.com/try/download/community)
- Git (optional)

### Step 2: Clone/Navigate to Project
```bash
cd inventory-management-service
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable management
- `cors` - Cross-origin resource sharing
- `swagger-ui-express` - Swagger UI
- `swagger-jsdoc` - API documentation generation
- `nodemon` - Development server (dev dependency)

### Step 4: Configure Environment
The project uses a `.env` file for configuration. The `.env` file is already configured to use MongoDB Atlas:

```bash
PORT=8082
MONGODB_URI=mongodb+srv://it22006370_db_user:malithi01@inventory.5ggkwst.mongodb.net/inventory_db
NODE_ENV=development
```

The connection string points to the shared MongoDB Atlas cluster with a dedicated `inventory_db` database for this microservice. No changes needed unless you want to use a different database.

### Step 5: MongoDB Configuration
This service uses **MongoDB Atlas** (Cloud) for the shared microservices cluster:

**Current Setup:** MongoDB Atlas Cloud Connection ✅
- Cluster: `inventory.5ggkwst.mongodb.net`
- Database: `inventory_db`
- Connection is already configured in `.env`

**No additional setup needed** - MongoDB Atlas handles the database hosting.

### Step 6: Run the Application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

You should see:
```
============================================
Inventory Management Service
Server running on port: 8082
http://localhost:8082
============================================
Swagger UI available at: http://localhost:8082/api-docs
Health check: http://localhost:8082/health
============================================
```

---

## Seed Sample Data (Optional)

To populate the database with sample inventory data:

```bash
node seed.js
```

This will insert 5 sample coconut inventory items into the database.

---

## Testing the API

### Using Swagger UI (Recommended)
1. Navigate to: `http://localhost:8082/api-docs`
2. Expand any endpoint
3. Click "Try it out"
4. Fill in the request body (for POST/PUT)
5. Click "Execute"

### Using cURL

**Health Check:**
```bash
curl http://localhost:8082/health
```

**Get All Inventory:**
```bash
curl http://localhost:8082/api/inventory
```

**Add Inventory Item:**
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

**Get Specific Item (replace {id} with actual MongoDB ID):**
```bash
curl http://localhost:8082/api/inventory/{id}
```

**Update Inventory Item:**
```bash
curl -X PUT http://localhost:8082/api/inventory/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 150
  }'
```

**Delete Inventory Item:**
```bash
curl -X DELETE http://localhost:8082/api/inventory/{id}
```

### Using Postman

1. Open Postman
2. Import the collection: `Inventory-Management-Postman.json`
3. Set the `base_url` variable to `http://localhost:8082` (if not already set)
4. Start making requests

---

## Project Structure Explanation

```
inventory-management-service/
│
├── app.js                      # Main Express application entry point
│                               # - Initializes app
│                               # - Sets up middleware
│                               # - Connects to MongoDB
│                               # - Mounts Swagger UI
│                               # - Error handling
│
├── config/
│   ├── database.js             # MongoDB connection configuration
│   │                            # - Uses Mongoose
│   │                            # - Reads connection string from .env
│   │
│   └── swagger.js              # Swagger/OpenAPI documentation config
│                                # - Defines API info
│                                # - Specifies servers
│                                # - Defines schemas
│
├── models/
│   └── Inventory.js            # Mongoose schema for Inventory
│                                # - productName (enum: Coconut, King Coconut, Young Coconut)
│                                # - quantity (min: 0)
│                                # - warehouseLocation
│                                # - supplierId
│                                # - dateAdded (default: now)
│                                # - Timestamps (createdAt, updatedAt)
│
├── controllers/
│   └── inventoryController.js  # Business logic for inventory operations
│                                # - addInventory (POST)
│                                # - getAllInventory (GET)
│                                # - getInventoryById (GET :id)
│                                # - updateInventory (PUT :id)
│                                # - deleteInventory (DELETE :id)
│
├── routes/
│   └── inventoryRoutes.js      # API route definitions
│                                # - POST /inventory
│                                # - GET /inventory
│                                # - GET /inventory/:id
│                                # - PUT /inventory/:id
│                                # - DELETE /inventory/:id
│                                # - JSDoc comments for Swagger
│
├── .env                        # Environment variables (local)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies and scripts
├── seed.js                     # Database seeding script
├── README.md                   # Project documentation
├── Inventory-Management-Postman.json  # Postman collection
└── SETUP.md                    # This file
```

---

## Common Issues & Solutions

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Issue: "MongoDB connection failed"
**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Check connection string in `.env`
3. Verify MongoDB is accessible at 127.0.0.1:27017

### Issue: "Port 8082 already in use"
**Solution:**
- Change PORT in `.env` to a different port (e.g., 8083)
- Or kill the process using port 8082

### Issue: "Swagger UI not loading"
**Solution:**
1. Ensure server is running
2. Navigate to `http://localhost:8082/api-docs`
3. Check browser console for errors

### Issue: "nodemon: command not found"
**Solution:**
```bash
npm install --save-dev nodemon
npm run dev
```

---

## Development Workflow

### During Development
```bash
npm run dev
```
This uses nodemon to auto-restart the server when files change.

### Before Production
```bash
npm install --production
npm start
```

### Debugging
1. Check console logs in terminal
2. Check MongoDB logs
3. Use Swagger UI to test endpoints
4. Monitor network requests in browser DevTools

---

## Project Features

✅ **RESTful API** - Standard HTTP methods for CRUD operations
✅ **MongoDB Integration** - NoSQL database with Mongoose ODM
✅ **Input Validation** - Schema-based validation
✅ **Error Handling** - Comprehensive error responses
✅ **CORS Support** - Cross-origin requests enabled
✅ **Swagger Documentation** - Interactive API docs at `/api-docs`
✅ **Environment Configuration** - Using dotenv
✅ **MVC Architecture** - Clean separation of concerns
✅ **Async/Await** - Modern JavaScript async handling
✅ **Sample Data** - Seed script for testing

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Start MongoDB
3. ✅ Run the application
4. ✅ Access Swagger UI
5. ✅ Test endpoints
6. ✅ Seed sample data (optional)
7. ✅ Deploy to production

---

## Support

For issues or questions:
1. Check the README.md
2. Review error messages in console
3. Check MongoDB connection
4. Verify environment variables

---

Happy coding! 🚀
