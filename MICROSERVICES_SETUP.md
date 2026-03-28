# Coconut State Management - Microservices Architecture Setup

## Database Configuration for All Microservices

All microservices share the same **MongoDB Atlas cluster** but use **separate databases** for data isolation and autonomy.

### Shared MongoDB Atlas Cluster
- **Connection Host:** `inventory.5ggkwst.mongodb.net`
- **Credentials:** `it22006370_db_user:malithi01`

---

## Microservices Configuration

Each service runs on a unique port and uses a dedicated database. Copy the `.env` template for your service.

### 1. **Inventory Management Service**
- **Status:** ✅ Configured
- **Port:** 8082
- **Database:** `inventory_db`
- **Location:** `./Inventory Management/.env`

```env
PORT=8082
MONGODB_URI=mongodb+srv://it22006370_db_user:malithi01@inventory.5ggkwst.mongodb.net/inventory_db
NODE_ENV=development
```

---

### 2. **Finance Management Service**
- **Port:** 8083
- **Database:** `finance_db`
- **Location:** `./Finance Management/.env`

```env
PORT=8083
MONGODB_URI=mongodb+srv://it22006370_db_user:malithi01@inventory.5ggkwst.mongodb.net/finance_db
NODE_ENV=development
```

**Setup Instructions:**
1. Create `.env` file in `Finance Management/` directory
2. Copy the env variables above
3. Run `npm install`
4. Run `npm start` or `npm run dev`

---

### 3. **Employee Management Service**
- **Port:** 8084
- **Database:** `employee_db`
- **Location:** `./Employee Management/.env`

```env
PORT=8084
MONGODB_URI=mongodb+srv://it22006370_db_user:malithi01@inventory.5ggkwst.mongodb.net/employee_db
NODE_ENV=development
```

**Setup Instructions:**
1. Create `.env` file in `Employee Management/` directory
2. Copy the env variables above
3. Run `npm install`
4. Run `npm start` or `npm run dev`

---

### 4. **Order Management Service**
- **Port:** 8085
- **Database:** `order_db`
- **Location:** `./Order Management/.env`

```env
PORT=8085
MONGODB_URI=mongodb+srv://it22006370_db_user:malithi01@inventory.5ggkwst.mongodb.net/order_db
NODE_ENV=development
```

**Setup Instructions:**
1. Create `.env` file in `Order Management/` directory
2. Copy the env variables above
3. Run `npm install`
4. Run `npm start` or `npm run dev`

---

## Architecture Benefits

| Aspect | Benefit |
|--------|---------|
| **Shared Cluster** | Single MongoDB Atlas subscription cost |
| **Separate Databases** | Each service is independent and scalable |
| **Data Isolation** | Services only access their own data |
| **Microservices Best Practice** | Database per service pattern |
| **Easy Deployment** | All services use same credentials |

---

## Accessing MongoDB Atlas Dashboard

Monitor all databases from:
- **URL:** https://cloud.mongodb.com
- **Organization:** Inventory Project
- **Cluster:** inventory

### View Data in Specific Database:
1. Login to MongoDB Atlas
2. Select Cluster → Collections
3. Choose database (inventory_db, finance_db, employee_db, order_db)
4. View/manage collections

---

## Testing All Services

Once all services are running on their respective ports:

### Health Checks
```bash
curl http://localhost:8082/health  # Inventory
curl http://localhost:8083/health  # Finance
curl http://localhost:8084/health  # Employee
curl http://localhost:8085/health  # Order
```

### Swagger Documentation
```
http://localhost:8082/api-docs     # Inventory
http://localhost:8083/api-docs     # Finance
http://localhost:8084/api-docs     # Employee
http://localhost:8085/api-docs     # Order
```

---

## Security Notes

- ✅ Credentials are environment-based (not hardcoded)
- ✅ Use `.env` files (add to `.gitignore`)
- ✅ Each service connects with same user (for simplicity)
- 🔒 For production: Create service-specific MongoDB Atlas users with role-based access

---

## Troubleshooting

**Issue:** Connection refused to MongoDB
- Check internet connection
- Verify MongoDB Atlas cluster is running
- Confirm `.env` has correct connection string

**Issue:** Database already exists
- MongoDB automatically creates databases on first write
- Safe to rerun services multiple times

**Issue:** Port already in use**
- Change PORT in `.env` for the conflicting service
- Or kill existing process on that port

---

**Last Updated:** March 28, 2026
**Maintained by:** Malithi
