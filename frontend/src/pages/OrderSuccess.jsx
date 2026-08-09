import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiPackage, FiFileText, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import InvoiceModal from "../components/InvoiceModal";
import "../styles/ordersuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const orderId = order?._id || "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = order?.totalPrice || order?.totalAmount || 0;

  return (
    <div className="order-success-page">
      <div className="order-success-card glass-panel">
        <div className="success-icon-wrap">
          <FiCheckCircle className="check-icon-large" />
        </div>

        <span className="success-kicker">Payment Verified & Confirmed</span>
        <h1>Thank You For Your Order! 🎉</h1>

        <p className="success-subtitle">
          Your order <strong>#{orderId}</strong> has been placed successfully. A
          confirmation email with tax invoice details has been sent to your registered address.
        </p>

        {/* DETAILS PILL */}
        <div className="order-confirmed-summary glass-panel">
          <div className="summary-stat">
            <span>Order Reference</span>
            <strong>{orderId}</strong>
          </div>
          <div className="summary-stat">
            <span>Amount Paid</span>
            <strong className="text-emerald">₹{Number(totalAmount).toLocaleString("en-IN")}</strong>
          </div>
          <div className="summary-stat">
            <span>Est. Delivery</span>
            <strong>2 - 4 Business Days</strong>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="success-actions-row">
          <Link to="/myorders" className="btn-primary">
            <FiPackage /> Live Shipment Tracker <FiArrowRight />
          </Link>

          {order && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setInvoiceModalOpen(true)}
            >
              <FiFileText /> View Invoice
            </button>
          )}

          <Link to="/shop" className="btn-outline">
            <FiShoppingBag /> Continue Shopping
          </Link>
        </div>
      </div>

      {invoiceModalOpen && order && (
        <InvoiceModal
          order={order}
          onClose={() => setInvoiceModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderSuccess;