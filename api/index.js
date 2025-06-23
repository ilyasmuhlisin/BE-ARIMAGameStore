const express = require("express");
const cors = require("../config/cors"); // atau "../middlewares/cors" tergantung lokasi file
const errorHandler = require("../middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");

const authRoutes = require("../routes/auth.routes");
const productRoutes = require("../routes/product.routes");
const categoryRoutes = require("../routes/category.routes");
const developerRoutes = require("../routes/developer.routes");
const orderRoutes = require("../routes/order.routes");
const reviewRoutes = require("../routes/review.routes");
const userRoutes = require("../routes/user.routes");
const adminRoutes = require("../routes/admin.routes");

const app = express();

app.use(express.json());

// ✅ CORS hanya aktif saat tidak dijalankan oleh swagger-autogen
if (process.env.SWAGGER_AUTOGEN !== "true") {
  app.use(cors());
}

// ✅ Health check (optional)
app.get("/__health", (req, res) => {
  res.send("OK");
});

// ✅ All routes prefix /api
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/developers", developerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Swagger UI (dengan custom CSS dari CDN)
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

// ✅ Global error handler
app.use(errorHandler);

module.exports = app;
