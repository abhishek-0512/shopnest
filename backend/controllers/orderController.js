const Order = require("../model/Order");
const sendEmail = require("../utils/sendEmail");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      address,
      paymentId,
    });

    await order.save();

    const message = `Dear ${req.user.name},

Thank you for your order!

Your order has been placed successfully.

Order ID: ${order._id}
Total Amount: ₹${totalAmount}
Shipping Address: ${address}

We will notify you once your order is shipped.

Regards,
ShopNest Team`;

    await sendEmail(req.user.email, "Order Confirmation", message);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

// GET LOGGED-IN USER ORDERS
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("items.productId", "name price image");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// GET ALL ORDERS (ADMIN)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate(
      "user",
      "name email"
    );

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching all orders",
      error: error.message,
    });
  }
};

// UPDATE ORDER STATUS (ADMIN)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
};