const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const swaggerSpec = require("./config/swagger");
const supplierRoutes = require("./routes/supplierRoutes");

dotenv.config();
connectDB().catch((err) => {
  console.error("Failed to connect to MongoDB:", err.message);
  console.log("Server will continue running. Database operations will fail until MongoDB is available.");
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/supplier", supplierRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "Supplier Management Service is running" });
});

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
