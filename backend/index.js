const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// Initialize Express
const app = express();

// Connect Database
connectDB();

// ==============================
// Middleware
// ==============================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://shopnest-tau-pink.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// Static Folder (Only if needed)
// ==============================

// Multer temporary uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==============================
// Health Check
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 ShopNest Backend Running Successfully",
  });
});

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ==============================
// Global Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=======================================");
  console.log(`🚀 ShopNest Backend Running`);
  console.log(`🌍 Server : http://localhost:${PORT}`);
  console.log(`📂 Uploads: http://localhost:${PORT}/uploads`);
  console.log("=======================================");
});