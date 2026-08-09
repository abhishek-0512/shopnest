import React from "react";
import { FiShield, FiInfo } from "react-icons/fi";

const Disclaimer = () => {
  return (
    <div className="cart-page" style={{ maxWidth: "900px" }}>
      <div className="cart-header-title">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary-light)", marginBottom: "4px" }}>
          <FiInfo /> <span style={{ fontWeight: "800", fontSize: "0.85rem", textTransform: "uppercase" }}>Project Disclosure</span>
        </div>
        <h1>
          Platform <span className="gradient-text">Disclaimer & Notice</span>
        </h1>
        <p>Demonstration, test transactions, and educational project guidelines.</p>
      </div>

      <div className="glass-panel" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>1. Demonstration & Portfolio Purpose</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
            <strong>ShopNest</strong> is a high-performance, full-stack portfolio showcase engineered to demonstrate
            advanced modern web architectures, state management, checkout flows, and user interfaces.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>2. Test Payment Environments</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
            All payment features operate in simulation or sandbox environments (including Razorpay Test Mode and
            Instant Demo Checkout). No actual monetary charges are processed.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>3. Product Imagery & Trademarks</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
            All brand trademarks (Apple, Sony, Nike, Garmin, Omron, etc.) and high-resolution Unsplash photography
            are the property of their respective owners and used solely for design demonstration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;