const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const swaggerUiDist = require("swagger-ui-dist");

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

// ✅ MongoDB Connection
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

// ✅ Swagger JSDoc setup
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

// ✅ Serve swagger.json
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// ✅ Serve Swagger UI manually using swagger-ui-dist (fix Vercel)
app.get("/api-docs", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Swagger UI</title>
        <link href="/swagger-ui/swagger-ui.css" rel="stylesheet">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="/swagger-ui/swagger-ui-bundle.js"></script>
        <script src="/swagger-ui/swagger-ui-standalone-preset.js"></script>
        <script>
          window.onload = function () {
            SwaggerUIBundle({
              url: "/swagger.json",
              dom_id: "#swagger-ui",
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              layout: "BaseLayout"
            });
          };
        </script>
      </body>
    </html>
  `);
});

// ✅ Health check
app.get("/__health", (req, res) => {
  res.send("OK");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/developers", developerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Error handler
app.use(errorHandler);

module.exports = app;
