import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { orderService } from "../utils/api";
import InvoiceModal from "../components/InvoiceModal";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiXCircle,
  FiArrowRight,
  FiMapPin,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "../styles/cart.css";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await orderService.cancelOrder(orderId);
      if (res.success) {
        toast.success("Order cancelled successfully");
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, orderStatus: "Cancelled" } : o
          )
        );
      }
    } catch (err) {
      toast.error(err.message || "Failed to cancel order");
    }
  };

  const getStepIndex = (status) => {
    switch (status) {
      case "Placed":
      case "Pending":
        return 0;
      case "Confirmed":
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "Out for Delivery":
        return 3;
      case "Delivered":
        return 4;
      case "Cancelled":
        return -1;
      default:
        return 1;
    }
  };

  const trackingSteps = [
    { label: "Placed", icon: FiPackage },
    { label: "Confirmed", icon: FiCheckCircle },
    { label: "Shipped", icon: FiTruck },
    { label: "Out for Delivery", icon: FiClock },
    { label: "Delivered", icon: FiCheckCircle },
  ];

  return (
    <div className="orders-page-container">
      <div className="cart-header-title">
        <h1>
          Order <span className="gradient-text">History & Tracking</span>
        </h1>
        <p>Monitor live shipment milestones, download tax invoices, and manage past purchases.</p>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[1, 2].map((i) => (
            <div key={i} className="skeleton" style={{ height: "260px" }} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-cart-card glass-panel">
          <div className="empty-cart-icon">
            <FiPackage />
          </div>
          <h2>No Orders Placed Yet</h2>
          <p>When you complete a purchase, your order history and live shipment tracker will appear here.</p>
          <Link to="/shop" className="btn-primary">
            Explore Best Sellers <FiArrowRight />
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => {
            const currentStep = getStepIndex(order.orderStatus);
            const isCancelled = order.orderStatus === "Cancelled";
            const isDelivered = order.orderStatus === "Delivered";
            const progressPercent = isCancelled
              ? 0
              : Math.min(100, (currentStep / (trackingSteps.length - 1)) * 100);

            return (
              <div key={order._id} className="order-history-card glass-panel">
                {/* HEADER */}
                <div className="order-card-header">
                  <div className="order-id-group">
                    <h4>
                      Order #{order._id}
                    </h4>
                    <span className="order-date-text">
                      Placed on{" "}
                      {new Date(order.createdAt || Date.now()).toLocaleDateString(
                        "en-IN",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <div className="order-status-badge-group">
                    <span
                      className={`badge ${
                        order.paymentStatus === "Paid"
                          ? "badge-emerald"
                          : "badge-amber"
                      }`}
                    >
                      {order.paymentStatus || "PAID"}
                    </span>

                    <span
                      className={`badge ${
                        isDelivered
                          ? "badge-emerald"
                          : isCancelled
                          ? "badge-rose"
                          : "badge-primary"
                      }`}
                    >
                      {order.orderStatus || "Processing"}
                    </span>
                  </div>
                </div>

                {/* SHIPMENT PROGRESS TIMELINE */}
                {!isCancelled ? (
                  <div className="shipment-tracker-container">
                    <div className="tracker-timeline-bar">
                      <div className="tracker-line-track">
                        <div
                          className="tracker-line-progress"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      {trackingSteps.map((st, sIdx) => {
                        const isDone = currentStep >= sIdx;
                        const isCurrent = currentStep === sIdx;
                        const Icon = st.icon;

                        return (
                          <div key={st.label} className="tracker-step-node">
                            <div
                              className={`step-circle ${
                                isDone ? "active" : ""
                              }`}
                            >
                              <Icon />
                            </div>
                            <span
                              className={`step-label ${
                                isCurrent ? "active" : ""
                              }`}
                            >
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "12px 18px",
                      background: "rgba(244, 63, 94, 0.1)",
                      border: "1px solid rgba(244, 63, 94, 0.3)",
                      borderRadius: "8px",
                      color: "#fb7185",
                      fontSize: "0.88rem",
                    }}
                  >
                    ⚠️ This order was cancelled. Any debited amount will be refunded within 3-5 business days.
                  </div>
                )}

                {/* ITEMS */}
                <div className="order-items-table">
                  {(order.orderItems || []).map((item, idx) => (
                    <div key={idx} className="order-single-item">
                      <div className="order-single-item-left">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="order-item-image"
                          />
                        )}
                        <div>
                          <strong>{item.name}</strong>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            Qty: {item.qty} × ₹{Number(item.price).toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                      <div>
                        <strong>
                          ₹{(Number(item.price) * item.qty).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ADDRESS INFO */}
                {order.shippingAddress && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <FiMapPin style={{ color: "var(--primary-light)" }} />
                    <span>
                      Shipping to: {order.shippingAddress.fullName},{" "}
                      {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.postalCode}
                    </span>
                  </div>
                )}

                {/* FOOTER & ACTIONS */}
                <div className="order-card-footer">
                  <div className="order-footer-total">
                    Grand Total:
                    <strong>
                      ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="order-action-buttons">
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => setSelectedInvoiceOrder(order)}
                    >
                      <FiFileText /> View & Print Invoice
                    </button>

                    {!isDelivered && !isCancelled && (
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        <FiXCircle /> Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* INVOICE MODAL */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};

export default MyOrders;