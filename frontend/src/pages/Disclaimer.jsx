import React from "react";

const Disclaimer = () => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Legal & Site Disclaimer</h2>

      <p style={text}>
        ShopNest is a portfolio / educational project built for learning modern
        full-stack development. It does not represent a real commercial
        e-commerce service.
      </p>

      <h4 style={heading}>1. Accuracy of Information</h4>
      <p style={text}>
        Product data, images, and content shown in this project may be dummy or
        sample data used for demonstration purposes only.
      </p>

      <h4 style={heading}>2. Payments</h4>
      <p style={text}>
        All payment features (if implemented) are intended for testing only
        using sandbox environments such as Razorpay test mode. No real
        transactions are processed.
      </p>

      <h4 style={heading}>3. External Links</h4>
      <p style={text}>
        This project may include external links. We are not responsible for the
        content or behavior of third-party websites.
      </p>

      <p style={note}>
        By using this application, you acknowledge that it is for educational
        purposes only.
      </p>
    </div>
  );
};

const containerStyle = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "40px",
  background: "#18181b",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.05)",
  color: "#a1a1aa",
  lineHeight: "1.7",
};

const titleStyle = {
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

const note = {
  marginTop: "25px",
  fontStyle: "italic",
  fontSize: "0.9rem",
  color: "#71717a",
};

export default Disclaimer;