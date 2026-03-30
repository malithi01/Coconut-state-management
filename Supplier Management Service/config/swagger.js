const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Supplier Management Service API",
      version: "1.0.0",
      description: "API documentation for Supplier Management Microservice"
    },
    servers: [
      {
        url: "http://localhost:8083",
        description: "Local server"
      }
    ]
  },
  apis: [path.join(__dirname, "../routes/*.js")]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
