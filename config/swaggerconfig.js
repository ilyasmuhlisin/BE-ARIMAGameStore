const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game Store Arima API",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for the Game Store Arima application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // All route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
