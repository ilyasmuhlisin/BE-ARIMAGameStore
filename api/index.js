const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

dotenv.config();

const authRoutes = require("../routes/auth.routes");
const productRoutes = require("../routes/product.routes");
const categoryRoutes = require("../routes/category.routes");
const developerRoutes = require("../routes/developer.routes");
const orderRoutes = require("../routes/order.routes");
const reviewRoutes = require("../routes/review.routes");
const userRoutes = require("../routes/user.routes");
const adminRoutes = require("../routes/admin.routes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connect (cek env sudah diset di Vercel)
let isConnected = false;
async function connectMongo() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectMongo();

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec); // <-- ini dihasilkan secara otomatis oleh swagger-jsdoc
});

// ✅ Swagger setup
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game Store Arima API",
      version: "1.0.0",
      description: "API docs for Arima Game Store backend",
    },
    servers: [{ url: "https://be-arima-game-store.vercel.app" }],
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Optional health check route
app.get("/__health", (req, res) => {
  res.send("OK");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/developers", developerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Global error handler
app.use(errorHandler);

// ✅ Vercel will use `module.exports` instead of `app.listen()`
module.exports = app;
