const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

// Import route dari dalam /api/routes/
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const developerRoutes = require("./routes/developer.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");

const errorHandler = require("../middlewares/errorHandler");

dotenv.config();
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
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
}
connectMongo();

// Swagger setup (gunakan path di dalam api/)
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game Store Arima API",
      version: "1.0.0",
      description: "Comprehensive API documentation",
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
  apis: [path.resolve(__dirname, "./routes/*.js")], // ✅ fix path ke dalam api/
});

// Tambahkan dummy /__health agar Swagger tidak kosong
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

app.get("/__health", (req, res) => {
  res.status(200).send("OK");
});

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

// Error handler
app.use(errorHandler);

// Untuk Vercel
module.exports = app;
