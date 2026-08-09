import React from "react";
import { FiX, FiPrinter, FiCheckCircle, FiPackage } from "react-icons/fi";

const InvoiceModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber =
    "INV-" +
    (order._id ? order._id.substring(order._id.length - 8).toUpperCase() : "2026-99");
  const invoiceDate = new Date(order.createdAt || Date.now()).toLocaleDateString(
    "en-IN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const subtotal = order.itemsPrice || order.totalPrice || 0;
  const tax = order.taxPrice || Math.round(subtotal * 0.18);
  const shipping = order.shippingPrice || (subtotal > 999 ? 0 : 99);
  const grandTotal = order.totalPrice || subtotal + tax + shipping;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="invoice-card glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="invoice-actions-bar no-print">
          <button className="btn-secondary" onClick={handlePrint}>
            <FiPrinter /> Print / Save PDF
          </button>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="invoice-printable-content">
          {/* HEADER */}
          <div className="invoice-header">
            <div>
              <h1 className="invoice-brand">
                Shop<span className="brand-highlight">Nest</span>
              </h1>
              <p className="invoice-subtext">Tax Invoice & Delivery Receipt</p>
              <p className="invoice-address-line">
                ShopNest Retail Tech Pvt. Ltd.
                <br />
                GSTIN: 07AAACS9988P1Z8
                <br />
                Cyber Hub, DLF Phase 2, Gurugram, India
              </p>
            </div>

            <div className="invoice-meta-block">
              <div className="invoice-badge-status">
                <FiCheckCircle /> {order.paymentStatus || "PAID"}
              </div>
              <p>
                <strong>Invoice No:</strong> {invoiceNumber}
              </p>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Date:</strong> {invoiceDate}
              </p>
            </div>
          </div>

          <hr className="invoice-hr" />

          {/* BILLED TO */}
          <div className="invoice-addresses-grid">
            <div className="address-col">
              <h4>Billed & Shipped To:</h4>
              <p className="customer-name">
                {order.shippingAddress?.fullName || "Customer"}
              </p>
              <p>{order.shippingAddress?.street}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                {order.shippingAddress?.postalCode}
              </p>
              <p>Phone: +91 {order.shippingAddress?.phone || "N/A"}</p>
            </div>

            <div className="address-col">
              <h4>Order Status:</h4>
              <p>
                Status:{" "}
                <span className="status-highlight">
                  {order.orderStatus || "Processing"}
                </span>
              </p>
              <p>
                Payment:{" "}
                {order.paymentResult?.razorpay_payment_id
                  ? "Razorpay Secure"
                  : "Online / Verified COD"}
              </p>
            </div>
          </div>

          {/* ITEMS TABLE */}
          <table className="invoice-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item Description</th>
                <th className="text-right">Price</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {(order.orderItems || []).map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="invoice-item-name">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="invoice-thumb"
                        />
                      )}
                      <div>
                        <strong>{item.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-right">
                    ₹{(Number(item.price) * item.qty).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* SUMMARY TOTALS */}
          <div className="invoice-totals-wrapper">
            <div className="invoice-summary-box">
              <div className="summary-row">
                <span>Items Subtotal:</span>
                <span>₹{Number(subtotal).toLocaleString("en-IN")}</span>
              </div>
              <div className="summary-row">
                <span>GST (18% inclusive):</span>
                <span>₹{Number(tax).toLocaleString("en-IN")}</span>
              </div>
              <div className="summary-row">
                <span>Shipping & Handling:</span>
                <span>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="summary-row grand-total-row">
                <span>Grand Total:</span>
                <span className="grand-total-amount">
                  ₹{Number(grandTotal).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="invoice-footer">
            <p>
              Thank you for choosing <strong>ShopNest</strong>. This is a computer-generated invoice.
            </p>
            <p>For support or returns, visit shopnest.com/support or email help@shopnest.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
