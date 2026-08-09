const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});

    const orders = await Order.find({});

    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.totalPrice || order.itemsPrice || 0),
      0
    );

    // Calculate category breakdown
    const products = await Product.find({});
    const categoryCounts = products.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    // Recent orders
    const recentOrders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: Math.round(totalRevenue),
      categoryCounts,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminStats,
};