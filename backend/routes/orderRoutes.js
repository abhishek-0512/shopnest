const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  createOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  cancelOrder,
} = require("../controllers/orderController");

// Create Order & Get All Orders (Admin)
router
  .route("/")
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

// Get Logged-in User Orders
router
  .route("/myorders")
  .get(protect, myOrders);

// Cancel Order
router
  .route("/:id/cancel")
  .put(protect, cancelOrder);

// Update Order Status (Admin)
router
  .route("/:id/status")
  .put(protect, admin, updateOrderStatus);

// Get Order Details
router
  .route("/:id")
  .get(protect, getOrderById);

module.exports = router;