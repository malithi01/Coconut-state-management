# Inventory Management Service

A microservice built with Node.js, Express, and MongoDB for managing coconut inventory in a microservices architecture.

## Features

- **REST API** for inventory management
- **MongoDB** for data persistence using Mongoose
- **Swagger UI** for API documentation
- **CORS** enabled for cross-origin requests
- **Error handling** and validation
- **MVC Architecture** with clean separation of concerns

## Project Structure

```
inventory-management-service/
├── config/
│   ├── database.js          # MongoDB connection configuration
│   └── swagger.js           # Swagger/OpenAPI configuration
├── models/
│   └── Inventory.js         # Inventory data model
├── controllers/
│   └── inventoryController.js # Business logic for inventory operations
├── routes/
│   └── inventoryRoutes.js   # API route definitions with Swagger docs
├── app.js                   # Main Express application
├── .env                     # Environment variables
├── .env.example             # Environment variables template
├── package.json             # Project dependencies
└── README.md                # This file
```

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB Atlas Account** (Cloud - already configured)
- **npm** or **yarn**

## Installation

### 1. Clone/Setup the project

```bash
cd inventory-management-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. MongoDB Configuration

This service is configured to use **MongoDB Atlas** (Cloud). The connection string in `.env` is:

```bash
MONGODB_URI=mongodb+srv://it22006370_db_user:malithi01@inventory.5ggkwst.mongodb.net/inventory_db
```

No local MongoDB installation required. The service connects directly to the cloud database.

### 4. Start the server

```bash
# Development mode (with auto-reload using nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:8082`

## API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Inventory Management

#### Add Inventory Item
- **POST** `/api/inventory`
- Request body:
```json
{
  "productName": "Coconut",
  "quantity": 100,
  "warehouseLocation": "Warehouse A - Room 1",
  "supplierId": "SUP001",
  "dateAdded": "2024-09-15"
}
```

#### Get All Inventory Items
- **GET** `/api/inventory`

#### Get Inventory Item by ID
- **GET** `/api/inventory/:id`

#### Update Inventory Item
- **PUT** `/api/inventory/:id`
- Request body: (partial update)
```json
{
  "quantity": 150,
  "warehouseLocation": "Warehouse B - Room 2"
}
```

#### Delete Inventory Item
- **DELETE** `/api/inventory/:id`

## Data Model

### Inventory Schema

```javascript
{
  productName: {
    type: String,
    enum: ['Coconut', 'King Coconut', 'Young Coconut'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  warehouseLocation: {
    type: String,
    required: true
  },
  supplierId: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Swagger Documentation

Access the interactive API documentation at:

```
http://localhost:8082/api-docs
```

Here you can:
- View all available endpoints
- See request/response schemas
- Test API endpoints directly

## Development

### Project Features

✅ MVC Architecture - Clean separation of concerns
✅ Async/Await - Modern async handling
✅ Input Validation - Mongoose schema validation
✅ Error Handling - Comprehensive error responses
✅ CORS - Cross-origin resource sharing enabled
✅ Swagger/OpenAPI - Auto-generated API documentation
✅ Environment Configuration - Using dotenv
✅ MongoDB Connection - Using Mongoose ODM

### Code Style

- Clean, readable code
- Proper error handling
- Meaningful variable names
- Comments for complex logic
- Proper use of async/await

## Testing with cURL or Postman

### Add Inventory
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

### Get All Inventory
```bash
curl http://localhost:8082/api/inventory
```

### Get by ID (replace {id} with actual MongoDB ID)
```bash
curl http://localhost:8082/api/inventory/{id}
```

### Update Inventory
```bash
curl -X PUT http://localhost:8082/api/inventory/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 150
  }'
```

### Delete Inventory
```bash
curl -X DELETE http://localhost:8082/api/inventory/{id}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 8082 |
| MONGODB_URI | MongoDB connection string | mongodb://127.0.0.1:27017/inventory_db |
| NODE_ENV | Environment mode | development |

## Technology Stack

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Swagger UI** - API documentation
- **Swagger JSDoc** - API documentation generation
- **Nodemon** - Development server auto-reload

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify MongoDB is accessible at 127.0.0.1:27017

### Port Already in Use
- Change PORT in .env file
- Or kill the process using the port

### Module Not Found
- Run `npm install`
- Clear node_modules: `rm -rf node_modules package-lock.json` then `npm install`

## Future Enhancements

- Authentication and authorization
- Request logging and monitoring
- Database indexing for performance
- Redis caching
- Unit and integration tests
- API rate limiting
- Input sanitization
- Pagination for GET all inventory

## Author

Malithi - MTIT Assignment 2

## License

ISC
