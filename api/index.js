const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const authRoutes = require("../routes/auth.routes");
const productRoutes = require("../routes/product.routes");
const categoryRoutes = require("../routes/category.routes");
const developerRoutes = require("../routes/developer.routes");
const orderRoutes = require("../routes/order.routes");
const reviewRoutes = require("../routes/review.routes");
const userRoutes = require("../routes/user.routes");
const adminRoutes = require("../routes/admin.routes");
const errorHandler = require("../middlewares/errorHandler");

dotenv.config();

const app = express();

// CORS & JSON middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (hanya connect sekali di awal)
let isConnected = false;
async function connectMongo() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}
connectMongo();

const path = require("path");

// Swagger Setup
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game Store Arima API",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for the Game Store Arima application",
    },
    servers: [
      {
        url: "https://be-arima-game-store.vercel.app",
      },
    ],
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
  },
  apis: [path.resolve(__dirname, "../routes/*.js")],
});

swaggerSpec.paths = swaggerSpec.paths || {};
swaggerSpec.paths["/__health"] = {
  get: {
    summary: "Health check",
    tags: ["Health"],
    responses: {
      200: {
        description: "OK",
      },
    },
  },
};

console.log("✅ Swagger loaded paths:", Object.keys(swaggerSpec.paths || {})); // optional debug log

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/developers", developerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use(errorHandler);

// ✅ Penting: jangan app.listen() di Vercel
module.exports = app;
