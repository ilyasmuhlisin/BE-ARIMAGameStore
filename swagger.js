// swagger.js
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Game Store Arima API",
    description: "Auto-generated Swagger documentation",
    version: "1.0.0",
  },
  host: "be-arima-game-store.vercel.app",
  schemes: ["https"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./api/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
