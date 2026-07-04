import React from "react";

const ReturnPolicy = () => {
  return (
    <div style={container}>
      <h2 style={title}>Return & Refund Policy</h2>

      <p style={text}>
        At ShopNest, we value customer satisfaction. If you are not satisfied
        with your purchase, you may request a return within 30 days of
        receiving your order.
      </p>

      <h4 style={heading}>1. Eligibility for Returns</h4>
      <p style={text}>
        Items must be unused, in original condition, and returned with original
        packaging and proof of purchase to be eligible for a return.
      </p>

      <h4 style={heading}>2. Refund Process</h4>
      <p style={text}>
        Once your return is received and inspected, you will be notified via
        email. Approved refunds will be processed to your original payment
        method within 5–7 business days.
      </p>

      <h4 style={heading}>3. Non-Refundable Items</h4>
      <p style={text}>
        Certain items such as perishable goods, custom products, and digital
        downloads are not eligible for returns or refunds.
      </p>

      <h4 style={heading}>4. Shipping Costs</h4>
      <p style={text}>
        Customers are responsible for return shipping costs. Shipping fees are
        non-refundable unless the return is due to a defect or error from our
        side.
      </p>
    </div>
  );
};

/* STYLES */
const container = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "40px",
  background: "#18181b",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.05)",
  color: "#a1a1aa",
  lineHeight: "1.7",
};

const title = {
  color: "#fff",
  marginBottom: "20px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  paddingBottom: "10px",
};

const heading = {
  color: "#f97316",
  marginTop: "20px",
  marginBottom: "8px",
};

const text = {
  marginBottom: "15px",
};

export default ReturnPolicy;