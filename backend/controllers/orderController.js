const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

// =====================
// CREATE ORDER
// =====================
const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      totalAmount,
      paymentStatus,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items found",
      });
    }

    const itemsPrice = items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const shippingPrice = itemsPrice > 999 ? 0 : 99;

    const taxPrice = Math.round(itemsPrice * 0.18);

    const order = await Order.create({
      user: req.user._id,

      orderItems: items.map((item) => ({
        product: item.productId,
        name: item.name,
        image: item.imageUrl,
        price: item.price,
        qty: item.qty,
      })),

      shippingAddress,

      paymentResult: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },

      paymentStatus: paymentStatus || "Paid",

      orderStatus: "Processing",

      itemsPrice,

      shippingPrice,

      taxPrice,

      totalPrice: totalAmount,
    });

    try {
      await sendEmail(
        req.user.email,
        "Order Confirmation - ShopNest",
        `
Hello ${req.user.name},

Your order has been placed successfully.

Order ID: ${order._id}

Amount: ₹${order.totalPrice}

Thank you for shopping with ShopNest.
        `
      );
    } catch (emailError) {
      console.log("Email Error:", emailError.message);
    }

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// MY ORDERS
// =====================
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("orderItems.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};

// =====================
// GET ALL ORDERS (ADMIN)
// =====================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};

// =====================
// UPDATE ORDER STATUS
// =====================
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error updating order",
    });
  }
};

module.exports = {
  createOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
};