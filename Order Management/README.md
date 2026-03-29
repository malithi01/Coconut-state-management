# Order Service Microservice

Order Service is a microservice for the Coconut Production System that handles selling coconut-related products and managing customer orders. Built with Node.js, Express, MongoDB, and Swagger/OpenAPI documentation.

## Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Swagger/OpenAPI** - API documentation
- **dotenv** - Environment variable management

## Project Structure

```
order-service/
├── controllers/
│   └── orderController.js      # Business logic for order operations
├── models/
│   └── orderModel.js           # Mongoose Order schema
├── routes/
│   └── orderRoutes.js          # API route definitions
├── config/
│   └── db.js                   # MongoDB connection configuration
├── swagger/
│   └── swagger.js              # Swagger/OpenAPI documentation
├── server.js                   # Main application entry point
├── package.json                # Project dependencies
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
└── README.md                   # Project documentation
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (running locally on port 27017 or accessible via connection string)

## Installation

### 1. Navigate to the project directory:

```bash
cd order-service
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Create a `.env` file:

Copy `.env.example` to `.env` and configure the variables:

```bash
cp .env.example .env
```

### 4. Configure environment variables in `.env`:

```env
PORT=3002
MONGODB_URI=mongodb://localhost:27017/coconut-order-db
NODE_ENV=development
```

**Note:** Ensure MongoDB is running before starting the server.

## Running the Application

### Development Mode (with auto-restart):

```bash
npm run dev
```

*Requires `nodemon` to be installed (included in devDependencies)*

### Production Mode:

```bash
npm start
```

The server will start on the configured port (default: **3002**).

```
Order Service is running on port 3002
API Documentation available at http://localhost:3002/api-docs
```

## API Endpoints

### Available Routes

All endpoints are prefixed with `/orders`

#### 1. Create Order
- **Method:** `POST`
- **URL:** `/orders`
- **Request Body:**
  ```json
  {
    "customerName": "John Doe",
    "productName": "Coconut Oil",
    "quantity": 5,
    "price": 1200.50,
    "status": "Pending"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Order created successfully",
    "data": {
      "_id": "60d5ec49c1234567890abcdef",
      "customerName": "John Doe",
      "productName": "Coconut Oil",
      "quantity": 5,
      "price": 1200.50,
      "orderDate": "2026-03-28T10:30:00Z",
      "status": "Pending",
      "createdAt": "2026-03-28T10:30:00Z",
      "updatedAt": "2026-03-28T10:30:00Z"
    }
  }
  ```

#### 2. Get All Orders
- **Method:** `GET`
- **URL:** `/orders`
- **Query Parameters (optional):**
  - `status` - Filter by order status (Pending, Completed, Cancelled)
- **Example:** `/orders?status=Pending`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "60d5ec49c1234567890abcdef",
        "customerName": "John Doe",
        "productName": "Coconut Oil",
        "quantity": 5,
        "price": 1200.50,
        "orderDate": "2026-03-28T10:30:00Z",
        "status": "Pending",
        "createdAt": "2026-03-28T10:30:00Z",
        "updatedAt": "2026-03-28T10:30:00Z"
      }
    ]
  }
  ```

#### 3. Get Order by ID
- **Method:** `GET`
- **URL:** `/orders/:id`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "60d5ec49c1234567890abcdef",
      "customerName": "John Doe",
      "productName": "Coconut Oil",
      "quantity": 5,
      "price": 1200.50,
      "orderDate": "2026-03-28T10:30:00Z",
      "status": "Pending",
      "createdAt": "2026-03-28T10:30:00Z",
      "updatedAt": "2026-03-28T10:30:00Z"
    }
  }
  ```

#### 4. Update Order
- **Method:** `PUT`
- **URL:** `/orders/:id`
- **Request Body (all fields optional):**
  ```json
  {
    "customerName": "Jane Doe",
    "productName": "Coconut Water",
    "quantity": 10,
    "price": 800.00,
    "status": "Completed"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Order updated successfully",
    "data": {
      "_id": "60d5ec49c1234567890abcdef",
      "customerName": "Jane Doe",
      "productName": "Coconut Water",
      "quantity": 10,
      "price": 800.00,
      "orderDate": "2026-03-28T10:30:00Z",
      "status": "Completed",
      "createdAt": "2026-03-28T10:30:00Z",
      "updatedAt": "2026-03-28T10:35:00Z"
    }
  }
  ```

#### 5. Delete Order
- **Method:** `DELETE`
- **URL:** `/orders/:id`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Order deleted successfully",
    "data": {
      "_id": "60d5ec49c1234567890abcdef",
      "customerName": "John Doe",
      "productName": "Coconut Oil",
      "quantity": 5,
      "price": 1200.50,
      "orderDate": "2026-03-28T10:30:00Z",
      "status": "Pending",
      "createdAt": "2026-03-28T10:30:00Z",
      "updatedAt": "2026-03-28T10:30:00Z"
    }
  }
  ```

## API Documentation

### Swagger UI

Access the interactive API documentation at:

```
http://localhost:3002/api-docs
```

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Live API testing capabilities
- Example requests and responses

### Additional Endpoints

- **Welcome:** `GET http://localhost:3002/`
- **Health Check:** `GET http://localhost:3002/health`

## Order Status Values

Orders can have the following status values:

| Status | Description |
|--------|-------------|
| `Pending` | Order is waiting to be processed |
| `Completed` | Order has been fulfilled |
| `Cancelled` | Order has been cancelled |

## Order Schema

### Order Fields

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|-----------|
| _id | ObjectId | Auto | - | MongoDB generated |
| customerName | String | Yes | - | Max 100 characters |
| productName | String | Yes | - | Max 100 characters |
| quantity | Number | Yes | - | Minimum 1 |
| price | Number | Yes | - | Minimum 0 |
| orderDate | Date | No | Current date | - |
| status | String | No | "Pending" | Enum: Pending, Completed, Cancelled |
| createdAt | Date | Auto | Current date | - |
| updatedAt | Date | Auto | Current date | - |

## Error Handling

The API returns standardized error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Please provide all required fields: customerName, productName, quantity, price"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Order not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Error message"
}
```

## Testing the API

### Using cURL

**Create an order:**
```bash
curl -X POST http://localhost:3002/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "productName": "Coconut Oil",
    "quantity": 5,
    "price": 1200.50
  }'
```

**Get all orders:**
```bash
curl http://localhost:3002/orders
```

**Get order by ID:**
```bash
curl http://localhost:3002/orders/60d5ec49c1234567890abcdef
```

**Update an order:**
```bash
curl -X PUT http://localhost:3002/orders/60d5ec49c1234567890abcdef \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Completed"
  }'
```

**Delete an order:**
```bash
curl -X DELETE http://localhost:3002/orders/60d5ec49c1234567890abcdef
```

### Using Postman

1. Import the Swagger documentation:
   - Open Postman
   - Click "Import"
   - Enter `http://localhost:3002/api-docs`
   - The API collection will be auto-generated

2. Or manually create requests:
   - Open a new request
   - Set method and URL
   - Add headers: `Content-Type: application/json`
   - Add request body for POST/PUT operations
   - Click Send

## MongoDB Setup

### Local MongoDB

If you don't have MongoDB installed, follow these steps:

1. **Download MongoDB Community Edition** from https://www.mongodb.com/try/download/community
2. **Install MongoDB** on your system
3. **Start MongoDB service:**
   - **Windows:** MongoDB runs as a service by default
   - **macOS:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`

### MongoDB Atlas (Cloud)

Alternatively, use MongoDB Atlas for a cloud database:

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coconut-order-db
   ```

## Development

### Install Development Dependencies

```bash
npm install --save-dev nodemon
```

### Development Mode

```bash
npm run dev
```

This will auto-restart the server when you make changes to the code.

## Deployment

### Build for Production

```bash
npm install --production
```

### Environment Variables for Production

Create a `.env` file with production values:

```env
PORT=3002
MONGODB_URI=your_production_mongodb_uri
NODE_ENV=production
```

### Run Production Server

```bash
npm start
```

## Troubleshooting

### MongoDB Connection Error
- **Issue:** "MongoDB Connection Error"
- **Solution:** 
  - Ensure MongoDB is running
  - Check `MONGODB_URI` in `.env`
  - Verify MongoDB is accessible from your machine

### Port Already in Use
- **Issue:** "Error: listen EADDRINUSE :::3002"
- **Solution:** 
  - Change PORT in `.env`
  - Or kill the process using port 3002

### Swagger UI Not Loading
- **Issue:** 404 error at `/api-docs`
- **Solution:** 
  - Ensure server is running
  - Check browser network tab for errors
  - Clear browser cache and refresh

## Security Notes

⚠️ **For Production Use:**

1. Add authentication/authorization middleware
2. Implement request validation
3. Add rate limiting
4. Use HTTPS
5. Validate and sanitize all inputs
6. Add CORS configuration if needed
7. Implement logging and monitoring
8. Use secrets management for sensitive data

## Future Enhancements

- [ ] Add authentication (JWT)
- [ ] Add order notifications
- [ ] Implement pagination for list endpoints
- [ ] Add order filtering and sorting
- [ ] Add transaction management
- [ ] Integrate with payment service
- [ ] Add order tracking/history
- [ ] Implement caching (Redis)

## License

MIT

## Support

For issues or questions, please contact the development team or create an issue in the repository.

---

**Happy coding! 🚀**
