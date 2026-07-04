import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          background: "#18181b",
          padding: "50px",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "550px",
          textAlign: "center",
          border: "1px solid #27272a",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <FaCheckCircle
          size={90}
          color="#22c55e"
          style={{ marginBottom: "20px" }}
        />

        <h1
          style={{
            color: "#fff",
            marginBottom: "15px",
          }}
        >
          Payment Successful 🎉
        </h1>

        <p
          style={{
            color: "#a1a1aa",
            lineHeight: "1.8",
            marginBottom: "35px",
          }}
        >
          Thank you for shopping with <strong>ShopNest</strong>.
          <br />
          Your payment has been received successfully.
          <br />
          Your order is now being processed.
        </p>

        <Link
          to="/myorders"
          className="btn"
          style={{
            display: "block",
            marginBottom: "15px",
            padding: "14px",
            fontSize: "16px",
          }}
        >
          View My Orders
        </Link>

        <Link
          to="/shop"
          className="btn"
          style={{
            display: "block",
            padding: "14px",
            fontSize: "16px",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;