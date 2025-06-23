const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");
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

// Connect MongoDB
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

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Health check
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

// Error handler
app.use(errorHandler);

module.exports = app;
