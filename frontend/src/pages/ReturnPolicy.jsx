import React from "react";
import { Link } from "react-router-dom";
import { FiRotateCcw, FiCheckCircle, FiShield, FiArrowRight } from "react-icons/fi";

const ReturnPolicy = () => {
  return (
    <div className="cart-page" style={{ maxWidth: "900px" }}>
      <div className="cart-header-title">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary-light)", marginBottom: "4px" }}>
          <FiRotateCcw /> <span style={{ fontWeight: "800", fontSize: "0.85rem", textTransform: "uppercase" }}>Customer Protection</span>
        </div>
        <h1>
          7-Day Hassle-Free <span className="gradient-text">Return Policy</span>
        </h1>
        <p>Transparent, fast, and 100% risk-free return and doorstep exchange policy.</p>
      </div>

      <div className="glass-panel" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>1. 7-Day Window for Returns</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
            At ShopNest, we strive for complete satisfaction. If your product is damaged,
            defective, or differs from its description, you can initiate a return or exchange
            within 7 days of delivery directly from your <strong>My Orders</strong> hub.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>2. Easy Doorstep Pickup</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Our verified courier partners will inspect and collect the item from your doorstep.
            Please ensure items are preserved in original packaging with manufacturer tags and warranty cards intact.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>3. Instant Refund Processing</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Once the package is picked up, refunds are initiated immediately to your original payment method
            (UPI, Card, Net Banking) within 24 to 48 hours.
          </p>
        </div>

        <div style={{ marginTop: "10px", padding: "16px 20px", background: "var(--primary-gradient-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-accent)" }}>
          <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>
            Need help with an ongoing order?
          </strong>
          <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
            Our 24/7 dedicated support team is available at support@shopnest.com or +91 1800-SHOPNEST.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;